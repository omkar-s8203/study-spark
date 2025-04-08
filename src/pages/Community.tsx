
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, Send, Heart, Share, MessageSquare, Calendar, User, Book, ThumbsUp } from 'lucide-react';
import Layout from '@/components/Layout';
import { toast } from 'sonner';

type Post = {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  likes: number;
  comments: number;
  createdAt: Date;
  topic: string;
};

// Mock data for community posts
const initialPosts: Post[] = [
  {
    id: '1',
    content: 'Just finished my calculus exam! Any tips for preparing for the advanced course next semester?',
    author: {
      id: 'user-1',
      name: 'Alex Johnson',
    },
    likes: 15,
    comments: 7,
    createdAt: new Date(2023, 6, 15, 10, 30),
    topic: 'Mathematics',
  },
  {
    id: '2',
    content: 'I created a study guide for Biology 101. Would anyone like me to share it?',
    author: {
      id: 'user-2',
      name: 'Samantha Lee',
    },
    likes: 32,
    comments: 12,
    createdAt: new Date(2023, 6, 14, 15, 45),
    topic: 'Biology',
  },
  {
    id: '3',
    content: 'Looking for study partners for Physics. I struggle with mechanics and could use some help!',
    author: {
      id: 'user-3',
      name: 'Marcus Chen',
    },
    likes: 8,
    comments: 4,
    createdAt: new Date(2023, 6, 13, 9, 15),
    topic: 'Physics',
  },
];

// Topic options
const topics = [
  'All',
  'Mathematics',
  'Biology',
  'Chemistry',
  'Physics',
  'History',
  'Literature',
  'Computer Science',
];

const formSchema = z.object({
  content: z.string().min(1, { message: 'Post content is required' }).max(500),
  topic: z.string().min(1, { message: 'Please select a topic' }),
});

type FormData = z.infer<typeof formSchema>;

const Community = () => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedTab, setSelectedTab] = useState('feed');
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
      topic: 'Mathematics',
    },
  });

  const filteredPosts = posts.filter((post) => {
    return selectedTopic === 'All' || post.topic === selectedTopic;
  });

  const onSubmit = (data: FormData) => {
    const newPost: Post = {
      id: Date.now().toString(),
      content: data.content,
      author: {
        id: 'current-user',
        name: 'You',
      },
      likes: 0,
      comments: 0,
      createdAt: new Date(),
      topic: data.topic,
    };
    
    setPosts((prev) => [newPost, ...prev]);
    form.reset();
    toast.success('Post published successfully!');
  };

  const handleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) {
      return 'Just now';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 24 * 60) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <Layout>
      <div className="container mx-auto max-w-4xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <MessageCircle className="h-8 w-8 text-study-primary" />
            Student Community
          </h1>
          <p className="text-muted-foreground">Connect with fellow students and share your insights</p>
        </div>

        <div className="mb-6">
          <Tabs defaultValue="feed" value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList>
              <TabsTrigger value="feed">Feed</TabsTrigger>
              <TabsTrigger value="discussions">Study Groups</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Topics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {topics.map((topic) => (
                  <Button
                    key={topic}
                    variant={selectedTopic === topic ? 'default' : 'ghost'}
                    className={`w-full justify-start ${selectedTopic === topic ? 'bg-study-primary hover:bg-study-primary/90' : ''}`}
                    onClick={() => setSelectedTopic(topic)}
                  >
                    {topic === 'All' ? (
                      <MessageSquare className="h-4 w-4 mr-2" />
                    ) : topic === 'Mathematics' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                    ) : topic === 'Biology' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><path d="M12 17h.01"></path></svg>
                    ) : (
                      <Book className="h-4 w-4 mr-2" />
                    )}
                    {topic}
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  <User className="h-4 w-4 mr-2" />
                  Find Study Partners
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Upcoming Events
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Book className="h-4 w-4 mr-2" />
                  Study Resources
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main content */}
          <div className="md:col-span-3">
            <TabsContent value="feed" className="mt-0">
              <Card className="mb-6">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Create Post</CardTitle>
                  <CardDescription>Share your thoughts or questions with the community</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea
                                placeholder="What's on your mind about studying?"
                                className="min-h-[120px]"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <div className="flex items-center justify-between">
                        <FormField
                          control={form.control}
                          name="topic"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <select
                                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                  {...field}
                                >
                                  {topics.filter(topic => topic !== 'All').map((topic) => (
                                    <option key={topic} value={topic}>
                                      {topic}
                                    </option>
                                  ))}
                                </select>
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <Button type="submit" className="gradient-bg hover:opacity-90">
                          <Send className="h-4 w-4 mr-2" />
                          Post
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>

              {filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No posts found for this topic</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredPosts.map((post) => (
                    <Card key={post.id} className="border-study-light">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            <Avatar>
                              <User className="h-5 w-5" />
                            </Avatar>
                            <div>
                              <CardTitle className="text-base">{post.author.name}</CardTitle>
                              <CardDescription className="text-xs">
                                {formatTime(post.createdAt)} · {post.topic}
                              </CardDescription>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">{post.content}</p>
                      </CardContent>
                      <CardFooter className="flex justify-between border-t pt-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-muted-foreground flex gap-1 hover:text-study-primary"
                          onClick={() => handleLike(post.id)}
                        >
                          <ThumbsUp className="h-4 w-4" />
                          <span>{post.likes}</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-muted-foreground flex gap-1"
                        >
                          <MessageSquare className="h-4 w-4" />
                          <span>{post.comments}</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-muted-foreground"
                        >
                          <Share className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="discussions">
              <Card>
                <CardHeader>
                  <CardTitle>Study Groups</CardTitle>
                  <CardDescription>Find and join study groups based on your interests</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Study groups content will be available soon.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="events">
              <Card>
                <CardHeader>
                  <CardTitle>Events</CardTitle>
                  <CardDescription>Upcoming study sessions and educational events</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Events calendar will be available soon.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Community;
