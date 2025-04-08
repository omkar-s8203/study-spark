
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import Layout from '@/components/Layout';
import { toast } from 'sonner';

const defaultTimes = {
  focus: 25 * 60, // 25 minutes
  shortBreak: 5 * 60, // 5 minutes
  longBreak: 15 * 60, // 15 minutes
};

type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

const FocusTimer = () => {
  const [secondsLeft, setSecondsLeft] = useState(defaultTimes.focus);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<TimerMode>('focus');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [focusMode, setFocusMode] = useState(false);
  
  // Convert seconds to minutes and seconds for display
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  
  // Timer effect
  useEffect(() => {
    let interval: number | undefined;
    
    if (isActive && secondsLeft > 0) {
      interval = window.setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (isActive && secondsLeft === 0) {
      // Timer complete
      handleTimerComplete();
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, secondsLeft]);
  
  const handleTimerComplete = () => {
    setIsActive(false);
    
    // Play sound if enabled
    if (soundEnabled) {
      try {
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
        audio.play();
      } catch (error) {
        console.error('Error playing sound:', error);
      }
    }
    
    // Show notification
    toast.success(
      mode === 'focus'
        ? 'Focus session complete! Take a break.'
        : 'Break complete! Ready to focus?'
    );
    
    // Switch modes
    if (mode === 'focus') {
      setMode('shortBreak');
      setSecondsLeft(defaultTimes.shortBreak);
    } else {
      setMode('focus');
      setSecondsLeft(defaultTimes.focus);
    }
  };
  
  const toggleTimer = () => {
    setIsActive(!isActive);
  };
  
  const resetTimer = () => {
    setIsActive(false);
    setSecondsLeft(defaultTimes[mode]);
  };
  
  const changeMode = (newMode: TimerMode) => {
    setIsActive(false);
    setMode(newMode);
    setSecondsLeft(defaultTimes[newMode]);
  };
  
  const adjustTime = (value: number[]) => {
    setSecondsLeft(value[0] * 60);
    defaultTimes[mode] = value[0] * 60;
  };
  
  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };
  
  const toggleFocusMode = () => {
    setFocusMode(!focusMode);
  };
  
  if (focusMode) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="text-7xl font-bold mb-8 text-study-primary">
            {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
          </div>
          
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTimer}
              className="h-12 w-12 rounded-full"
            >
              {isActive ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              onClick={resetTimer}
              className="h-12 w-12 rounded-full"
            >
              <RotateCcw className="h-6 w-6" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              onClick={toggleFocusMode}
              className="h-12 w-12 rounded-full"
            >
              <VolumeX className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto max-w-2xl">
        <Card className="border-study-light shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Focus Timer</CardTitle>
            <CardDescription className="text-center">Stay productive with the Pomodoro technique</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="flex justify-center gap-2">
              <Button
                variant={mode === 'focus' ? 'default' : 'outline'}
                onClick={() => changeMode('focus')}
                className={mode === 'focus' ? 'bg-study-primary hover:bg-study-primary/90' : ''}
              >
                Focus
              </Button>
              <Button
                variant={mode === 'shortBreak' ? 'default' : 'outline'}
                onClick={() => changeMode('shortBreak')}
                className={mode === 'shortBreak' ? 'bg-study-primary hover:bg-study-primary/90' : ''}
              >
                Short Break
              </Button>
              <Button
                variant={mode === 'longBreak' ? 'default' : 'outline'}
                onClick={() => changeMode('longBreak')}
                className={mode === 'longBreak' ? 'bg-study-primary hover:bg-study-primary/90' : ''}
              >
                Long Break
              </Button>
            </div>
            
            <div className="text-center">
              <div className="text-8xl font-bold mb-8 text-study-primary">
                {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
              </div>
            </div>
            
            <div className="flex justify-center gap-4">
              <Button
                onClick={toggleTimer}
                size="lg"
                className={`gradient-bg hover:opacity-90 rounded-full w-16 h-16 flex items-center justify-center`}
              >
                {isActive ? (
                  <Pause className="h-8 w-8" />
                ) : (
                  <Play className="h-8 w-8" />
                )}
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                onClick={resetTimer}
                className="h-12 w-12 self-center rounded-full"
              >
                <RotateCcw className="h-5 w-5" />
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                onClick={toggleSound}
                className="h-12 w-12 self-center rounded-full"
              >
                {soundEnabled ? (
                  <Volume2 className="h-5 w-5" />
                ) : (
                  <VolumeX className="h-5 w-5" />
                )}
              </Button>
            </div>
            
            <div className="pt-6">
              <p className="text-sm text-muted-foreground mb-2">Adjust timer (minutes):</p>
              <Slider
                value={[Math.floor(secondsLeft / 60)]}
                min={1}
                max={60}
                step={1}
                onValueChange={adjustTime}
                disabled={isActive}
              />
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-center">
            <Button variant="outline" onClick={toggleFocusMode}>
              Enable Focus Mode
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default FocusTimer;
