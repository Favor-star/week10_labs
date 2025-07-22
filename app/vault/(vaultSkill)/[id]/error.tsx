"use client";
import { useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { AlertCircle, RefreshCw, ArrowLeft } from "lucide-react";

export default function SkillDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-secondary rounded-xl p-6 text-center space-y-4">
        <div className="flex justify-center">
          <AlertCircle className="h-12 w-12 text-red" />
        </div>
        <h2 className="text-2xl font-bold text-white">Skill Details Error</h2>
        <p className="text-white/70">
          We couldn't load the skill details. This could be because:
        </p>
        <ul className="text-white/60 text-sm space-y-1 text-left">
          <li>• The skill data is corrupted</li>
          <li>• Network connection issues</li>
          <li>• Server temporarily unavailable</li>
          <li>• Database synchronization problems</li>
        </ul>
        <div className="flex gap-2 justify-center">
          <Button onClick={reset} className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Try again
          </Button>
          <Button
            onClick={() => window.history.back()}
            className="bg-transparent border border-white/30 text-white/70 hover:bg-white/10 flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
        </div>
        {error.digest && (
          <p className="text-xs text-white/40 mt-4">Error ID: {error.digest}</p>
        )}
      </div>
    </div>
  );
}
