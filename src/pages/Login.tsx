import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});

type FormData = z.infer<typeof formSchema>;

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    await login(data.email, data.password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-md"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center">
            <Brain className="h-12 w-12 text-study-primary" />
          </div>
          <h1 className="mt-4 text-3xl font-bold text-foreground">StudySpark</h1>
          <p className="mt-2 text-muted-foreground">Your AI-powered study companion</p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5, ease: 'easeOut' }}
        >
          <Card className="border-study-light shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Welcome back</CardTitle>
              <CardDescription>Please sign in to your account</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full gradient-bg hover:opacity-90">
                    Sign In
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex flex-col items-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/register" className="text-study-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
