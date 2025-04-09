import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Brain, Send, User } from 'lucide-react';
import Layout from '@/components/Layout';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { GoogleGenerativeAI } from '@google/generative-ai';

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
    content: "Hi there! I'm your AI Study Assistant powered by Google Gemini. How can I help you today?",
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

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

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
      const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-pro-latest' });

      const result = await model.generateContent(data.message);
      const response = await result.response;
      const text = response.text();

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: text,
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong. Please try again.');
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
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
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
                <Button type="submit" className="gradient-bg hover:opacity-90" disabled={isLoading}>
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
