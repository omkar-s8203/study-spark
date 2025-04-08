
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Check, Clock, ListTodo, Plus, Trash } from 'lucide-react';
import Layout from '@/components/Layout';
import { toast } from 'sonner';

const formSchema = z.object({
  title: z.string().min(1, { message: 'Task title is required' }).max(100),
  priority: z.enum(['low', 'medium', 'high']),
});

type FormData = z.infer<typeof formSchema>;

type Todo = {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
};

const priorityColors = {
  low: 'bg-green-100 text-green-700 border-green-200',
  medium: 'bg-amber-100 text-amber-700 border-amber-200',
  high: 'bg-rose-100 text-rose-700 border-rose-200',
};

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: '1',
      title: 'Complete math homework',
      completed: false,
      priority: 'high',
      createdAt: new Date(),
    },
    {
      id: '2',
      title: 'Read chapter 5 for history class',
      completed: false,
      priority: 'medium',
      createdAt: new Date(),
    },
    {
      id: '3',
      title: 'Research topics for science project',
      completed: true,
      priority: 'low',
      createdAt: new Date(),
    },
  ]);

  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      priority: 'medium',
    },
  });

  const onSubmit = (data: FormData) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title: data.title,
      completed: false,
      priority: data.priority,
      createdAt: new Date(),
    };
    
    setTodos((prev) => [...prev, newTodo]);
    form.reset();
    toast.success('Task added successfully!');
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    toast.success('Task removed!');
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'all') return true;
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const completedCount = todos.filter((todo) => todo.completed).length;
  const progressPercentage = todos.length > 0 ? (completedCount / todos.length) * 100 : 0;

  return (
    <Layout>
      <div className="container mx-auto max-w-3xl">
        <Card className="border-study-light shadow-md">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <ListTodo className="h-6 w-6 text-study-primary" />
                  Todo List
                </CardTitle>
                <CardDescription>Manage your study tasks</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Select
                  value={filter}
                  onValueChange={(value) => setFilter(value as 'all' | 'active' | 'completed')}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Progress: {completedCount} of {todos.length} tasks completed
                </span>
                <span className="font-medium">{Math.round(progressPercentage)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Add a new task..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div>
                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-[120px]">
                              <SelectValue placeholder="Priority" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <Button type="submit" size="icon" className="gradient-bg hover:opacity-90">
                  <Plus className="h-5 w-5" />
                </Button>
              </form>
            </Form>
            
            <div className="space-y-2 mt-6">
              {filteredTodos.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No tasks found</p>
                </div>
              ) : (
                filteredTodos.map((todo) => (
                  <div
                    key={todo.id}
                    className={`flex items-center justify-between p-3 border rounded-md ${
                      todo.completed ? 'bg-muted border-muted' : 'bg-card'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={todo.completed}
                        onCheckedChange={() => toggleTodo(todo.id)}
                        className={todo.completed ? 'text-study-primary' : ''}
                      />
                      <div>
                        <p className={`${todo.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {todo.title}
                        </p>
                        <div className="flex items-center mt-1">
                          <span className={`text-xs px-2 py-0.5 rounded border ${priorityColors[todo.priority]}`}>
                            {todo.priority}
                          </span>
                          <span className="text-xs text-muted-foreground ml-2 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {todo.createdAt.toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteTodo(todo.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <p className="text-sm text-muted-foreground">
              {completedCount} completed · {todos.length - completedCount} remaining
            </p>
            {todos.some(todo => todo.completed) && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTodos(todos.filter(todo => !todo.completed))}
              >
                Clear completed
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default TodoList;
