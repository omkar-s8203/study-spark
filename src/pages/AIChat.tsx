import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Brain, Send, User, Volume2, Mic, FileText } from 'lucide-react';
import Layout from '@/components/Layout';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { GoogleGenerativeAI } from '@google/generative-ai';

// ✅ PDF.js updated import
import * as pdfjsLib from 'pdfjs-dist';
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

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
  const [pdfText, setPdfText] = useState('');

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: '',
    },
  });

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  const speakText = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error('Speech recognition is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.start();

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      form.setValue('message', transcript);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event);
      toast.error('Speech recognition error.');
    };
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
      const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-pro-latest' });

      // If there's uploaded PDF text, append it as context
      const prompt = pdfText ? `Based on this document content:\n${pdfText}\n\nUser question: ${data.message}` : data.message;

      const result = await model.generateContent(prompt);
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

  const handlePdfUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const typedarray = new Uint8Array(reader.result as ArrayBuffer);
      const pdf = await pdfjsLib.getDocument(typedarray).promise;
      let textContent = '';

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const text = await page.getTextContent();
        const pageText = text.items.map((item: any) => item.str).join(' ');
        textContent += ` ${pageText}`;
      }

      setPdfText(textContent);
      toast.success('PDF uploaded and processed successfully!');
    };

    reader.readAsArrayBuffer(file);
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
                  <div className="flex flex-col max-w-[80%]">
                    <div
                      className={`rounded-lg px-4 py-2 ${
                        message.sender === 'ai'
                          ? 'bg-background border border-border'
                          : 'bg-study-primary text-white'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                    {message.sender === 'ai' && (
                      <button
                        onClick={() => speakText(message.content)}
                        className="flex items-center gap-1 mt-1 text-xs text-study-primary hover:underline"
                      >
                        <Volume2 className="h-4 w-4" />
                        Listen
                      </button>
                    )}
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
                <input type="file" accept="application/pdf" onChange={handlePdfUpload} className="hidden" id="pdfUpload" />
                <label htmlFor="pdfUpload">
                  <Button type="button" className="p-2" disabled={isLoading}>
                    <FileText className="h-5 w-5" />
                  </Button>
                </label>
                <Button type="button" onClick={handleVoiceInput} className="p-2" disabled={isLoading}>
                  <Mic className="h-5 w-5" />
                </Button>
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
