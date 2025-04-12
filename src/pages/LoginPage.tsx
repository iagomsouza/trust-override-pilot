import React, { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, CheckCircle } from "lucide-react";

const LoginPage: React.FC = () => {
  const [name, setName] = useState('');
  const [socialMedia, setSocialMedia] = useState({
    twitter: '',
    instagram: '',
    linkedin: '',
  });
  const [isRecording, setIsRecording] = useState(false);
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const handleSocialMediaChange = (platform: keyof typeof socialMedia, value: string) => {
    setSocialMedia(prev => ({ ...prev, [platform]: value }));
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data:", { name, socialMedia, hasVideo: !!videoBlob });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Shield className="h-12 w-12 text-primary" />
            </div>
            <CardTitle>Verify Your Identity</CardTitle>
            <CardDescription className="mt-2">
              We need a few details to confirm it's really you and protect against payment fraud.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-1">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Label>Social Media Verification</Label>
                <div className="text-xs text-muted-foreground">(helps us confirm your identity)</div>
              </div>
              <div className="space-y-2">
                <Input
                  placeholder="Twitter/X username (without @)"
                  value={socialMedia.twitter}
                  onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
                />
                <Input
                  placeholder="Instagram username"
                  value={socialMedia.instagram}
                  onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
                />
                <Input
                  placeholder="LinkedIn profile URL"
                  value={socialMedia.linkedin}
                  onChange={(e) => handleSocialMediaChange('linkedin', e.target.value)}
                />
              </div>
            </div>

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
                    <Button type="button" onClick={startVideoRecording} className="bg-blue-600 hover:bg-blue-700">
                      Record Quick Video
                    </Button>
                  )}
                  {isRecording && (
                    <Button type="button" variant="destructive" onClick={stopVideoRecording}>
                      Stop Recording
                    </Button>
                  )}
                  {videoBlob && (
                    <Button type="button" variant="outline" onClick={startVideoRecording}>
                      Record Again
                    </Button>
                  )}
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                This helps us verify you're a real person and protect our payment system.
              </p>
            </div>
          </CardContent>

          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              Complete Verification
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Your information is encrypted and only used for identity verification purposes.
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
