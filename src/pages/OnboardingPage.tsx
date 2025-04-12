import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, CheckCircle, ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase, db } from "@/lib/supabase";
import { useSupabase } from "@/contexts/SupabaseContext";

const OnboardingPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [socialMedia, setSocialMedia] = useState({
        x_username: '',
        instagram_username: '',
        linkedin_url: '',
    });
    const [isRecording, setIsRecording] = useState(false);
    const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const videoRef = useRef<HTMLVideoElement>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
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

    const handleSocialMediaChange = (platform: keyof typeof socialMedia, value: string) => {
        setSocialMedia(prev => ({ ...prev, [platform]: value }));
    };

    const handleNextStep = () => {
        setCurrentStep(prev => prev + 1);
    };

    const startVideoRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            streamRef.current = stream;

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }

            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;

            const chunks: BlobPart[] = [];
            mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
            mediaRecorder.onstop = () => {
                const blob = new Blob(chunks, { type: 'video/webm' });
                setVideoBlob(blob);
            };

            mediaRecorder.start();
            setIsRecording(true);
        } catch (err) {
            console.error("Error accessing camera:", err);
            toast({
                title: "Camera access denied",
                description: "Please allow camera access to continue with verification.",
                variant: "destructive"
            });
        }
    };

    const stopVideoRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }

        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
        }
    };

    const extractFrameFromVideo = async (): Promise<Blob | null> => {
        if (!videoRef.current || !videoBlob) return null;

        return new Promise((resolve) => {
            const video = document.createElement('video');
            video.src = URL.createObjectURL(videoBlob);

            video.onloadeddata = () => {
                video.currentTime = 1; // Get frame at 1 second mark
            };

            video.onseeked = () => {
                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;

                const ctx = canvas.getContext('2d');
                ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

                canvas.toBlob(blob => {
                    resolve(blob);
                }, 'image/jpeg', 0.95);
            };

            video.load();
        });
    };

    const uploadToSupabase = async () => {
        if (!user || !videoBlob) {
            toast({
                title: "Missing information",
                description: "Please complete all required fields",
                variant: "destructive"
            });
            return;
        }

        setIsSubmitting(true);

        try {
            // Extract a frame from the video for the face image
            const imageBlob = await extractFrameFromVideo();
            if (!imageBlob) {
                throw new Error("Could not extract image from video");
            }

            // Upload the image to the storage bucket
            const fileName = `face_${user.id}_${Date.now()}.jpg`;
            const { data: imageData, error: imageError } = await supabase.storage
                .from('users')
                .upload(fileName, imageBlob, {
                    contentType: 'image/jpeg',
                    upsert: true
                });

            if (imageError) {
                throw new Error(`Error uploading image: ${imageError.message}`);
            }

            // Get the public URL for the uploaded image
            const { data: urlData } = supabase.storage
                .from('users')
                .getPublicUrl(fileName);

            const imageUrl = urlData.publicUrl;
            setImageUrl(imageUrl);

            // Store user profile data in the database
            const { error: dbError } = await db.update('users', user.id, {
                x_username: socialMedia.x_username,
                instagram_username: socialMedia.instagram_username,
                linkedin_url: socialMedia.linkedin_url,
                face_image_url: imageUrl
            }, 'uid');

            if (dbError) {
                throw new Error(`Error updating user profile: ${dbError.message}`);
            }

            toast({
                title: "Profile complete!",
                description: "Your verification process is complete. Redirecting to dashboard...",
            });

            // Redirect to dashboard after successful submission
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);
        } catch (error: any) {
            toast({
                title: "Error saving profile",
                description: error.message || "Something went wrong. Please try again.",
                variant: "destructive"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Show loading indicator if authentication state is still loading
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    // If no user is authenticated, the ProtectedRoute will redirect, so we don't need extra handling here

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <Shield className="h-12 w-12 text-primary" />
                    </div>
                    <CardTitle>Complete Your Profile</CardTitle>
                    <CardDescription className="mt-2">
                        {currentStep === 1 ? "Please verify your identity with social media" : "Please record a short verification video"}
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    {currentStep === 1 && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Label>Social Media Verification</Label>
                                <div className="text-xs text-muted-foreground">(helps us confirm your identity)</div>
                            </div>
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
                        <div className="space-y-2 pt-2">
                            <div className="flex items-center gap-2">
                                <Label>Biometric Verification</Label>
                                <div className="text-xs text-muted-foreground">(quick video to prevent fraud)</div>
                            </div>
                            <div className="border rounded-md p-3 bg-gray-50 dark:bg-gray-800">
                                <div className="flex justify-center">
                                    {videoBlob ? (
                                        <div className="text-center">
                                            <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                                            <p className="text-sm text-green-600 dark:text-green-400">Video recorded successfully!</p>
                                        </div>
                                    ) : (
                                        <video
                                            ref={videoRef}
                                            className="w-full max-h-[200px] bg-gray-200 rounded-md"
                                            autoPlay
                                            muted
                                            playsInline
                                        />
                                    )}
                                </div>
                                <div className="flex justify-center mt-3 space-x-2">
                                    {!isRecording && !videoBlob && (
                                        <Button
                                            type="button"
                                            onClick={startVideoRecording}
                                            className="bg-blue-600 hover:bg-blue-700"
                                        >
                                            Record Quick Video
                                        </Button>
                                    )}
                                    {isRecording && (
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            onClick={stopVideoRecording}
                                        >
                                            Stop Recording
                                        </Button>
                                    )}
                                    {videoBlob && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={startVideoRecording}
                                        >
                                            Record Again
                                        </Button>
                                    )}
                                </div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                                This helps us verify you're a real person and protect our payment system.
                            </p>
                        </div>
                    )}
                </CardContent>

                <CardFooter className="flex-col gap-2">
                    {currentStep === 1 && (
                        <Button onClick={handleNextStep} className="w-full">
                            Continue <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    )}

                    {currentStep === 2 && (
                        <Button
                            onClick={uploadToSupabase}
                            className="w-full"
                            disabled={!videoBlob || isSubmitting}
                        >
                            {isSubmitting ? "Saving profile..." : "Complete Verification"}
                        </Button>
                    )}

                    <p className="text-xs text-center text-muted-foreground">
                        Your information is encrypted and only used for identity verification purposes.
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default OnboardingPage; 