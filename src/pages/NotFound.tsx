import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from '@/components/ui/button';
import { Brain } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-4">
          <Brain className="h-16 w-16 text-study-primary animate-bounce" />
        </div>
        <h1 className="text-3xl font-bold mb-4">🚧 Feature Coming Soon!</h1>
        <p className="text-lg text-muted-foreground mb-4">
          This feature is currently under development and will be released in the next phase of StudySpark.
        </p>
        <p className="text-muted-foreground mb-4">
          <span className="font-medium">The Bro Code Team</span>, led by <span className="font-medium text-study-primary">Omkar Suryawanshi</span>, is actively working on this module to make it yours soon!
        </p>
        <p className="text-muted-foreground mb-8">
          Stay tuned for more updates and smarter tools to boost your learning journey.
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
