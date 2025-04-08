
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Brain, Send, User } from 'lucide-react';
import Layout from '@/components/Layout';
import { toast } from 'sonner';

const formSchema = z.object({
  message: z.string().min(1, { message: 'Message cannot be empty' }),
});

type FormData = z.infer<typeof formSchema>;

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

const initialMessages: Message[] = [
  {
    id: '1',
    content: "Hello! I'm your AI study assistant. How can I help you today?",
    sender: 'ai',
    timestamp: new Date(),
  },
];

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: '',
    },
  });

  const mockAIResponse = (userMessage: string): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simple keyword-based responses
        if (userMessage.toLowerCase().includes('math')) {
          resolve('For math topics, I recommend checking out Khan Academy or our math study materials section. What specific math concept are you studying?');
        } else if (userMessage.toLowerCase().includes('physics')) {
          resolve('Physics can be challenging! The key is understanding the fundamental principles. Our physics resources include video explanations and practice problems. Would you like me to find some resources for you?');
        } else if (userMessage.toLowerCase().includes('exam') || userMessage.toLowerCase().includes('test')) {
          resolve('Preparing for an exam? Make sure to create a study schedule, use active recall techniques, and take practice tests. I can help you create a study plan if you tell me more about your upcoming exam.');
        } else if (userMessage.toLowerCase().includes('help')) {
          resolve("I'm here to help! I can recommend study materials, answer questions about subjects you're learning, help you create study plans, or just chat about academic topics. What would you like assistance with?");
        } else {
          resolve("That's an interesting topic! I can help you find study materials or explain concepts related to this. Would you like me to recommend some resources?");
        }
      }, 1000);
    });
  };

  const onSubmit = async (data: FormData) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content: data.message,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    form.reset();
    setIsLoading(true);

    try {
      const aiResponse = await mockAIResponse(data.message);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      toast.error('Unable to get a response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto max-w-4xl">
        <Card className="border-study-light shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-study-primary" />
              AI Study Assistant
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="h-[60vh] overflow-y-auto space-y-4 p-2">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${
                    message.sender === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <Avatar className={message.sender === 'ai' ? 'bg-study-primary' : 'bg-muted'}>
                    {message.sender === 'ai' ? (
                      <Brain className="h-5 w-5 text-white" />
                    ) : (
                      <User className="h-5 w-5" />
                    )}
                  </Avatar>
                  <div
                    className={`rounded-lg px-4 py-2 max-w-[80%] ${
                      message.sender === 'ai'
                        ? 'bg-background border border-border'
                        : 'bg-study-primary text-white'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-3">
                  <Avatar className="bg-study-primary">
                    <Brain className="h-5 w-5 text-white" />
                  </Avatar>
                  <div className="bg-background border border-border rounded-lg px-4 py-2">
                    <div className="flex space-x-2">
                      <div className="h-2 w-2 rounded-full bg-study-primary animate-pulse"></div>
                      <div className="h-2 w-2 rounded-full bg-study-primary animate-pulse delay-150"></div>
                      <div className="h-2 w-2 rounded-full bg-study-primary animate-pulse delay-300"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="border-t p-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex w-full items-center space-x-2"
              >
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          placeholder="Ask me anything about your studies..."
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="gradient-bg hover:opacity-90"
                  disabled={isLoading}
                >
                  <Send className="h-5 w-5" />
                  <span className="sr-only">Send</span>
                </Button>
              </form>
            </Form>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default AIChat;
