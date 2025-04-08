
import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from '@/components/ui/button';
import { Brain } from 'lucide-react';
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-4">
          <Brain className="h-16 w-16 text-study-primary" />
        </div>
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Oops! We couldn't find the page you're looking for.
        </p>
        <p className="text-muted-foreground mb-8">
          The page might have been moved, deleted, or maybe never existed.
        </p>
        <Button
          onClick={() => navigate('/')}
          className="gradient-bg hover:opacity-90"
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
