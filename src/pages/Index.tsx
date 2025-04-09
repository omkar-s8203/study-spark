
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Book, MessageCircle, Clock, ListTodo, CalendarCheck } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';

const features = [
  {
    title: 'AI Study Assistant',
    description: 'Get personalized study recommendations and answers to your questions',
    icon: <Brain className="h-12 w-12 text-study-primary" />,
    link: '/ai-chat',
  },
  {
    title: 'Study Materials',
    description: 'Access curated study resources organized by subject and topic',
    icon: <Book className="h-12 w-12 text-study-primary" />,
    link: '/study-materials',
  },
  {
    title: 'Community',
    description: 'Connect with fellow students, share resources, and collaborate',
    icon: <MessageCircle className="h-12 w-12 text-study-primary" />,
    link: '/community',
  },
  {
    title: 'Focus Timer',
    description: 'Stay productive with our customizable Pomodoro-style timer',
    icon: <Clock className="h-12 w-12 text-study-primary" />,
    link: '/focus',
  },
  {
    title: 'Todo List',
    description: 'Track your assignments and study tasks with our smart todo list',
    icon: <ListTodo className="h-12 w-12 text-study-primary" />,
    link: '/todo',
  },
  {
    title: 'Calendar',
    description: 'Plan your study schedule and never miss important deadlines',
    icon: <CalendarCheck className="h-12 w-12 text-study-primary" />,
    link: '/calendar',
  },
];

// Landing page for non-authenticated users
const Landing = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-background">
      {/* Hero section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-study-light via-background to-background"></div>
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-4">
              <Brain className="h-16 w-16 text-study-primary animate-pulse-light" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              StudySpark
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Your AI-powered study companion that adapts to your learning style
              and helps you achieve your academic goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate('/register')}
                size="lg"
                className="gradient-bg hover:opacity-90 text-white"
              >
                Get Started - It's Free
              </Button>
              <Button
                onClick={() => navigate('/login')}
                size="lg"
                variant="outline"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Everything You Need to Excel</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive platform combines AI technology with proven study methods
            to help you learn more effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border border-study-light hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-center h-16">
                  {feature.icon}
                </div>
                <CardTitle className="text-center">{feature.title}</CardTitle>
                <CardDescription className="text-center">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-study-light rounded-lg p-8 md:p-12">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to transform your learning experience?
            </h2>
            <p className="text-lg mb-8">
              Join thousands of students who are already using StudySpark to achieve their academic goals.
            </p>
            <Button
              onClick={() => navigate('/register')}
              size="lg"
              className="gradient-bg hover:opacity-90"
            >
              Get Started Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Dashboard for authenticated users
const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Welcome back, {user?.name}!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card 
            key={index} 
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => navigate(feature.link)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                {feature.icon}
                <CardTitle>{feature.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>{feature.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button variant="link" className="p-0 text-study-primary">
                Open {feature.title}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

const Index = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Landing />;
  }

  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
};



export default Index;
