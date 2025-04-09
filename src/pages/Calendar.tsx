import React, { useState } from 'react';
import { CalendarCheck, CalendarDays, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Layout from '@/components/Layout';

interface Event {
  date: string;
  title: string;
  description: string;
}

const Calendar: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([
    { date: '2025-04-12', title: 'Math Assignment Due', description: '' },
    { date: '2025-04-15', title: 'Group Discussion', description: '' },
    { date: '2025-04-18', title: 'Midterm Exam Starts', description: '' },
  ]);

  const [newEvent, setNewEvent] = useState<Event>({ date: '', title: '', description: '' });

  const handleAddEvent = () => {
    if (newEvent.date && newEvent.title) {
      setEvents([...events, newEvent]);
      setNewEvent({ date: '', title: '', description: '' });
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background py-10 px-4">
        {/* Page Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <CalendarCheck className="h-12 w-12 text-study-primary animate-pulse" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Study Calendar</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Organize your academic schedule, plan tasks, and stay on top of deadlines with your personal study calendar.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Active Calendar Events */}
          <Card className="shadow-md">
            <CardHeader>
              <div className="flex items-center gap-3">
                <CalendarDays className="h-10 w-10 text-study-primary" />
                <CardTitle>Upcoming Events</CardTitle>
              </div>
              <CardDescription>
                Stay updated with your upcoming assignments, exams, and reminders.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-muted-foreground">
              {events.map((event, index) => (
                <div key={index} className="p-2 border border-muted rounded">
                  <p className="font-semibold">📅 {event.date} - {event.title}</p>
                  {event.description && <p className="text-sm">{event.description}</p>}
                </div>
              ))}
              <p className="text-sm mt-4 italic text-muted-foreground">
                * AI-powered scheduling will be added soon.
              </p>
            </CardContent>
          </Card>

          {/* Add Event Form */}
          <Card className="shadow-md border-study-light">
            <CardHeader>
              <CardTitle className="text-xl text-center">Add New Event</CardTitle>
              <CardDescription className="text-center">
                Quickly add important dates to your calendar.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                placeholder="Event Date"
              />
              <Input
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                placeholder="Event Title"
              />
              <Textarea
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                placeholder="Optional Description"
              />
              <Button onClick={handleAddEvent} className="w-full gradient-bg">
                <Plus className="mr-2 h-4 w-4" /> Add Event
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Coming Soon Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <Card className="bg-muted/40 border-dashed border-2 border-study-light">
            <CardHeader>
              <CardTitle className="text-xl text-center">Smart Calendar Integration</CardTitle>
              <CardDescription className="text-center">
                This feature is being built by <span className="font-semibold text-study-primary">The Bro Code Team</span>, led by <span className="font-semibold">Omkar Suryawanshi</span>.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">
                Soon you’ll be able to sync with Google Calendar, get AI-based suggestions, and enjoy auto-reminder magic!
              </p>
              <div className="flex justify-center mt-6">
                <Button disabled variant="outline">
                  Coming Soon 🚀
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Calendar;
