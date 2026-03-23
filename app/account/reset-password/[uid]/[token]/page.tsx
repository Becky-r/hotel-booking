"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resetPassword } from "@/lib/api";

export default function ResetPasswordPage() {
  const params = useParams();
  const router = useRouter();

  const uid = params.uid as string;
  const token = params.token as string;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const response =await resetPassword({
        uid,
        token,
        new_password: password,
      });

      setSuccess("Password reset successful. Redirecting to login...");

      setTimeout(() => {
        router.push("/account/login");
      }, 1200); // Redirect after 1.2 seconds
    } catch (err: any) {
      setError(err.message || "Reset failed or link expired");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex m-6 justify-center bg-background ">
      <div className="w-full max-w-md rounded-lg border bg-card p-8 shadow-lg">
        <h1 className="font-serif text-2xl text-foreground">
          Reset Password
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Enter your new password below
        </p>

        <form
          onSubmit={handleReset}
          className="mt-6 flex flex-col gap-5"
        >
          {error && (
            <div className="rounded-md bg-destructive/10 p-3">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {success && (
            <div className="rounded-md bg-green-500/10 p-3">
              <p className="text-sm text-green-600">{success}</p>
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <Label>New Password</Label>
            <Input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Confirm Password</Label>
            <Input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              placeholder="Confirm new password"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="bg-gold text-charcoal hover:bg-gold-dark"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </div>
    </main>
  );
}