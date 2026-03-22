"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { uploadPaymentScreenshot } from "@/lib/api";
import { toast } from "sonner";

interface UploadScreenshotProps {
  bookingReference: string;
  onSuccess?: () => void;
  className?: string;
}

export function UploadScreenshot({
  bookingReference,
  onSuccess,
  className,
}: UploadScreenshotProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setError(null);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a screenshot first.");
      return;
    }

    try {
      setUploading(true);
      setError(null);

      const formData = new FormData();
      formData.append("payment_screenshot", file);

      await uploadPaymentScreenshot(bookingReference, formData);

      toast.success("Payment screenshot uploaded successfully.");

      setFile(null);
      setPreview(null);

      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError("Failed to upload screenshot. Please try again.");
      toast.error(err?.message || "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={`border rounded-lg p-4 space-y-3 ${className}`}>
      <p className="text-xs text-muted-foreground">
        Upload payment screenshot to confirm your booking
      </p>

      {error && <p className="text-xs text-destructive">{error}</p>}

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="text-xs cursor-pointer"
      />

      {preview && (
        <img
          src={preview}
          alt="preview"
          className="w-full max-h-40 object-contain border rounded"
        />
      )}

      <Button
        size="sm"
        onClick={handleUpload}
        disabled={!file || uploading}
        className="text-xs bg-amber-600 hover:bg-amber-700 text-white w-full"
      >
        {uploading ? "Uploading..." : "Upload Screenshot"}
      </Button>
    </div>
  );
}
