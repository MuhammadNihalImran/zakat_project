"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Alert } from "@/components/ui";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalErrorPage({ reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log unexpected errors silently on server/console without rendering stack trace to client
  }, []);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-6 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 text-amber-800 text-3xl mb-2">
          ⚠️
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Something Went Wrong
          </h1>
          <p className="text-slate-600 text-sm">
            An unexpected error occurred while processing your request. Please try again or return to the calculator home page.
          </p>
        </div>

        <Alert variant="warning" title="Notice">
          Your entered calculation data is safe in your active session. You can retry the action or navigate back to the home page.
        </Alert>

        <Card variant="bordered" className="bg-white text-left">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
              Recommended Actions
            </CardTitle>
            <CardDescription className="text-xs">
              Select one of the recovery options below:
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="primary"
              size="md"
              onClick={() => reset()}
              className="w-full justify-center"
            >
              🔄 Try Again
            </Button>

            <Link href="/" className="block w-full">
              <Button
                variant="outline"
                size="md"
                className="w-full justify-center"
              >
                🏠 Return to Home Page
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
