"use client";
import { Button } from "@/app/components/ui/button";
import { FileQuestion, Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-secondary rounded-xl p-6 text-center space-y-4">
        <div className="flex justify-center">
          <FileQuestion className="h-12 w-12 text-white/60" />
        </div>
        <h2 className="text-2xl font-bold text-white">Page Not Found</h2>
        <p className="text-white/70">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <ul className="text-white/60 text-sm space-y-1 text-left">
          <li>• Check the URL for typos</li>
          <li>• The page may have been removed</li>
          <li>• You may not have permission to access it</li>
          <li>• The link may be outdated</li>
        </ul>
        <div className="flex gap-2 justify-center">
          <Link href="/vault">
            <Button className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Go to Dashboard
            </Button>
          </Link>
          <Button
            onClick={() => window.history.back()}
            className="bg-transparent border border-white/30 text-white/70 hover:bg-white/10"
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
