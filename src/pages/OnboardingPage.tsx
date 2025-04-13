import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, CheckCircle, ArrowRight, Camera, Info, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase, db } from "@/lib/supabase";
import { useSupabase } from "@/contexts/SupabaseContext";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

const OnboardingPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [socialMedia, setSocialMedia] = useState({
        x_username: '',
        instagram_username: '',
        linkedin_url: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [cameraStatus, setCameraStatus] = useState<'idle' | 'initializing' | 'ready' | 'error'>('idle');
    const [cameraError, setCameraError] = useState<string | null>(null);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);

    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const { toast } = useToast();
    const navigate = useNavigate();
    const { user, isLoading } = useSupabase();

    useEffect(() => {
        // Redirect to login if not authenticated
        if (!isLoading && !user) {
            navigate('/login', { replace: true });
        }
    }, [user, isLoading, navigate]);

    // Cleanup function for camera
    useEffect(() => {
        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const handleSocialMediaChange = (platform: keyof typeof socialMedia, value: string) => {
        setSocialMedia(prev => ({ ...prev, [platform]: value }));
    };

    const handleNextStep = () => {
        setCurrentStep(2);
    };

    const initializeCamera = async () => {
        try {
            setCameraStatus('initializing');
            setCameraError(null);

            console.log('Attempting to access camera...');

            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "user" },
                audio: false
            });

            console.log('Camera access granted');

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.onloadedmetadata = () => {
                    console.log('Video metadata loaded');
                    videoRef.current?.play().catch(e => {
                        console.error('Error playing video:', e);
                    });
                };

                videoRef.current.onplaying = () => {
                    console.log('Video is now playing');
                    setCameraStatus('ready');
                };
            }

            streamRef.current = stream;
            return stream;
        } catch (err: any) {
            console.error('Camera initialization error:', err);
            setCameraStatus('error');

            let errorMessage = "Could not access camera.";
            if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
                errorMessage = "Camera access denied. Please allow camera access in your browser settings.";
            } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
                errorMessage = "No camera found on your device.";
            } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
                errorMessage = "Camera is being used by another application.";
            }

            setCameraError(errorMessage);
            toast({
                title: "Camera Error",
                description: errorMessage,
                variant: "destructive"
            });

            return null;
        }
    };

    useEffect(() => {
        let stream: MediaStream | null = null;

        if (currentStep === 2 && !capturedImage) {
            (async () => {
                if (streamRef.current) {
                    streamRef.current.getTracks().forEach(track => track.stop());
                    streamRef.current = null;
                }

                stream = await initializeCamera();
                if (stream) {
                    streamRef.current = stream;
                }
            })();
        }

        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [currentStep, capturedImage]);

    const capturePhoto = () => {
        if (!videoRef.current || !canvasRef.current || cameraStatus !== 'ready') return;

        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        if (!context) return;

        // Set canvas size to match video dimensions
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Draw the current frame from video to canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert canvas to data URL
        const imageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
        setCapturedImage(imageDataUrl);

        // Stop the camera stream
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
    };

    const retakePhoto = () => {
        setCapturedImage(null);
        initializeCamera();
    };

    const uploadToSupabase = async () => {
        if (!user) {
            toast({
                title: "Not signed in",
                description: "You need to be signed in to complete verification",
                variant: "destructive"
            });
            return;
        }

        if (!capturedImage) {
            toast({
                title: "Missing photo",
                description: "Please take a photo to continue",
                variant: "destructive"
            });
            return;
        }

        setIsSubmitting(true);
        setUploadProgress(0);

        try {
            // Convert data URL to blob
            const response = await fetch(capturedImage);
            const blob = await response.blob();

            setUploadProgress(20);

            // Create a unique file path
            const timestamp = Date.now();
            const filePath = `${timestamp}.jpg`;

            console.log('Attempting to upload file:', {
                bucket: 'users',
                filePath,
                contentType: 'image/jpeg',
                userId: user?.id // Optional user ID
            });

            // Upload without session check
            const { data: uploadData, error: imageError } = await supabase.storage
                .from('users')
                .upload(filePath, blob, {
                    contentType: 'image/jpeg',
                    upsert: true
                });

            if (imageError) {
                console.error('Storage upload error:', {
                    message: imageError.message,
                    name: imageError.name,
                    stack: imageError.stack
                });
                throw new Error(`Error uploading image: ${imageError.message}`);
            }

            console.log('Upload successful:', uploadData);
            setUploadProgress(60);

            // Get the public URL
            const { data: imageUrlData } = supabase.storage
                .from('users')
                .getPublicUrl(filePath);

            if (!imageUrlData?.publicUrl) {
                throw new Error('Failed to get public URL for uploaded image');
            }

            console.log('Generated public URL:', imageUrlData.publicUrl);

            const faceImageUrl = imageUrlData.publicUrl;
            setImageUrl(faceImageUrl);
            setUploadProgress(80);

            // Store user profile data
            const { error: dbError } = await db.update('users', user.id, {
                x_username: socialMedia.x_username,
                instagram_username: socialMedia.instagram_username,
                linkedin_url: socialMedia.linkedin_url,
                face_image_url: faceImageUrl
            }, 'uid');

            if (dbError) {
                console.error('Database update error:', dbError);
                throw new Error(`Error updating user profile: ${dbError.message}`);
            }
            setUploadProgress(100);

            toast({
                title: "Verification complete!",
                description: "Your identity has been verified. Redirecting to dashboard...",
            });

            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);
        } catch (error: any) {
            console.error("Profile upload error:", error);
            console.error("Full error object:", {
                message: error.message,
                name: error.name,
                stack: error.stack
            });
            toast({
                title: "Error saving profile",
                description: error.message || "Something went wrong. Please try again.",
                variant: "destructive"
            });
            setUploadProgress(0);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <Shield className="h-12 w-12 text-primary" />
                    </div>
                    <CardTitle>Complete Your Profile</CardTitle>
                    <CardDescription className="mt-2">
                        {currentStep === 1 ?
                            "Step 1: Verify your identity with social media" :
                            "Step 2: Take a photo for verification"}
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Step indicator */}
                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                        <div
                            className="bg-primary h-full transition-all duration-300 ease-in-out"
                            style={{ width: currentStep === 1 ? "50%" : "100%" }}
                        />
                    </div>

                    {currentStep === 1 && (
                        <div className="space-y-4">
                            <Alert>
                                <Info className="h-4 w-4" />
                                <AlertTitle>Why we need this information</AlertTitle>
                                <AlertDescription>
                                    Your social media profiles help us verify your identity and protect against fraud.
                                    At least one profile is recommended.
                                </AlertDescription>
                            </Alert>

                            <div className="space-y-3">
                                <div className="space-y-1">
                                    <Label htmlFor="twitter">Twitter/X Username</Label>
                                    <Input
                                        id="twitter"
                                        placeholder="username (without @)"
                                        value={socialMedia.x_username}
                                        onChange={(e) => handleSocialMediaChange('x_username', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="instagram">Instagram Username</Label>
                                    <Input
                                        id="instagram"
                                        placeholder="username"
                                        value={socialMedia.instagram_username}
                                        onChange={(e) => handleSocialMediaChange('instagram_username', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="linkedin">LinkedIn Profile URL</Label>
                                    <Input
                                        id="linkedin"
                                        placeholder="https://linkedin.com/in/yourprofile"
                                        value={socialMedia.linkedin_url}
                                        onChange={(e) => handleSocialMediaChange('linkedin_url', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="space-y-4">
                            <Alert>
                                <Camera className="h-4 w-4" />
                                <AlertTitle>Photo Verification</AlertTitle>
                                <AlertDescription>
                                    Please take a clear photo of your face looking directly at the camera.
                                    Ensure good lighting and that your face is clearly visible.
                                </AlertDescription>
                            </Alert>

                            <div className="border rounded-md p-4 bg-gray-50 dark:bg-gray-800">
                                {/* Camera status indicator */}
                                {!capturedImage && cameraStatus !== 'idle' && (
                                    <div className="mb-2 text-sm flex items-center justify-center">
                                        {cameraStatus === 'initializing' && (
                                            <div className="flex items-center text-amber-600">
                                                <div className="mr-2 h-2 w-2 rounded-full animate-pulse bg-amber-600"></div>
                                                Initializing camera...
                                            </div>
                                        )}
                                        {cameraStatus === 'ready' && (
                                            <div className="flex items-center text-green-600">
                                                <div className="mr-2 h-2 w-2 rounded-full bg-green-600"></div>
                                                Camera ready
                                            </div>
                                        )}
                                        {cameraStatus === 'error' && (
                                            <div className="flex items-center text-red-600">
                                                <AlertCircle className="h-4 w-4 mr-1" />
                                                {cameraError || 'Camera error'}
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div className="flex justify-center mb-3">
                                    {!capturedImage ? (
                                        <div className="w-full">
                                            <video
                                                ref={videoRef}
                                                className="w-full h-[240px] object-cover bg-gray-800 rounded-md"
                                                autoPlay
                                                playsInline
                                                muted
                                            />
                                        </div>
                                    ) : (
                                        <div className="text-center w-full">
                                            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                                            <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-2">
                                                Photo captured successfully!
                                            </p>
                                            <img
                                                src={capturedImage}
                                                alt="Captured"
                                                className="w-full h-[240px] object-cover bg-gray-800 rounded-md mx-auto"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-center space-x-2">
                                    {!capturedImage && (
                                        <Button
                                            type="button"
                                            onClick={capturePhoto}
                                            className="bg-blue-600 hover:bg-blue-700"
                                            disabled={cameraStatus !== 'ready'}
                                        >
                                            <Camera className="h-4 w-4 mr-2" />
                                            Take Photo
                                        </Button>
                                    )}
                                    {capturedImage && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={retakePhoto}
                                        >
                                            Take Another Photo
                                        </Button>
                                    )}
                                </div>

                                {cameraStatus === 'error' && (
                                    <Alert className="mt-3" variant="destructive">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertTitle>Camera Issue</AlertTitle>
                                        <AlertDescription>
                                            There was a problem accessing your camera. Please check your camera permissions
                                            or try using a different browser (Chrome works best).
                                        </AlertDescription>
                                    </Alert>
                                )}
                            </div>

                            <div className="text-xs text-muted-foreground space-y-1">
                                <p className="flex items-start">
                                    <Info className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" />
                                    Your photo is securely stored and only used for identity verification.
                                </p>
                                <p className="flex items-start">
                                    <Info className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" />
                                    This verification helps us protect against payment fraud.
                                </p>
                            </div>

                            {isSubmitting && (
                                <div className="space-y-1">
                                    <div className="flex justify-between text-xs">
                                        <span>Uploading verification data...</span>
                                        <span>{uploadProgress}%</span>
                                    </div>
                                    <Progress value={uploadProgress} className="h-2" />
                                </div>
                            )}
                        </div>
                    )}
                </CardContent>

                <CardFooter className="flex-col gap-3">
                    {currentStep === 1 && (
                        <Button onClick={handleNextStep} className="w-full">
                            Continue to Verification <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    )}

                    {currentStep === 2 && (
                        <>
                            <Button
                                onClick={uploadToSupabase}
                                className="w-full"
                                disabled={!capturedImage || isSubmitting}
                            >
                                {isSubmitting ? "Processing..." : "Complete Verification"}
                            </Button>

                            <Button
                                variant="ghost"
                                onClick={() => setCurrentStep(1)}
                                disabled={isSubmitting}
                                className="text-sm"
                            >
                                Back to Social Media
                            </Button>
                        </>
                    )}

                    <p className="text-xs text-center text-muted-foreground">
                        Your information is encrypted and only used for identity verification purposes.
                    </p>
                </CardFooter>
            </Card>
            <canvas
                ref={canvasRef}
                className="hidden"
            />
        </div>
    );
};

export default OnboardingPage; 