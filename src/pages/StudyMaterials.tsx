import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { BookOpen, Download, FileText, Search, Video, Plus } from 'lucide-react';
import Layout from '@/components/Layout';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectItem, SelectValue, SelectContent } from '@/components/ui/select';

type MaterialType = 'article' | 'video' | 'document';

type StudyMaterial = {
  id: string;
  title: string;
  description: string;
  subject: string;
  type: MaterialType;
  url: string;
  dateAdded: Date;
};

const initialMaterials: StudyMaterial[] = [
  {
    id: '1',
    title: 'Introduction to Algorithms',
    description: 'Explore basic algorithmic techniques and problem-solving approaches.',
    subject: 'Computer Science',
    type: 'article',
    url: 'https://www.geeksforgeeks.org/fundamentals-of-algorithms/',
    dateAdded: new Date(2025, 3, 1),
  },
  {
    id: '2',
    title: 'Operating System Fundamentals',
    description: 'Learn the principles of modern operating systems and their components.',
    subject: 'Computer Science',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=26QPDBe-NB8',
    dateAdded: new Date(2025, 3, 3),
  },
  {
    id: '3',
    title: 'Computer Networks Basics',
    description: 'Understand the concepts of computer networks, protocols, and architecture.',
    subject: 'Computer Science',
    type: 'document',
    url: 'https://www.tutorialspoint.com/data_communication_computer_network/index.htm',
    dateAdded: new Date(2025, 3, 5),
  },
  {
    id: '4',
    title: 'DBMS Crash Course',
    description: 'Database Management System full crash course video.',
    subject: 'Computer Science',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=2XjvKkY9U4s',
    dateAdded: new Date(2025, 3, 7),
  },
  {
    id: '5',
    title: 'Learn SQL with W3Schools',
    description: 'W3Schools SQL tutorial with interactive examples.',
    subject: 'Computer Science',
    type: 'article',
    url: 'https://www.w3schools.com/sql/',
    dateAdded: new Date(2025, 3, 9),
  },
  {
    id: '6',
    title: 'Machine Learning Crash Course - Google',
    description: 'Google’s ML crash course with exercises and videos.',
    subject: 'Computer Science',
    type: 'article',
    url: 'https://developers.google.com/machine-learning/crash-course',
    dateAdded: new Date(2025, 3, 11),
  },
  {
    id: '7',
    title: 'HTML, CSS, JS Full Course',
    description: 'Full front-end development video course from freeCodeCamp.',
    subject: 'Computer Science',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=zJSY8tbf_ys',
    dateAdded: new Date(2025, 3, 13),
  },
  {
    id: '8',
    title: 'Git & GitHub for Beginners',
    description: 'A beginner-friendly introduction to version control with Git and GitHub.',
    subject: 'Computer Science',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=RGOj5yH7evk',
    dateAdded: new Date(2025, 3, 15),
  },
  {
    id: '9',
    title: 'System Design Basics',
    description: 'An article to help you start with system design fundamentals.',
    subject: 'Computer Science',
    type: 'article',
    url: 'https://www.educative.io/blog/crack-system-design-interview',
    dateAdded: new Date(2025, 3, 17),
  },
];



const subjects = ['All', 'Computer Science'];

const StudyMaterials = () => {
  const [materials, setMaterials] = useState<StudyMaterial[]>(initialMaterials);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedType, setSelectedType] = useState<MaterialType | 'all'>('all');
  const [showForm, setShowForm] = useState(false);

  const [newMaterial, setNewMaterial] = useState<Omit<StudyMaterial, 'id' | 'dateAdded'>>({
    title: '',
    description: '',
    subject: 'Computer Science',
    type: 'article',
    url: '',
  });

  const filteredMaterials = materials.filter((material) => {
    const matchesSearch =
      material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSubject =
      selectedSubject === 'All' || material.subject === selectedSubject;

    const matchesType = selectedType === 'all' || material.type === selectedType;

    return matchesSearch && matchesSubject && matchesType;
  });

  const handleAddMaterial = () => {
    const newEntry: StudyMaterial = {
      ...newMaterial,
      id: Date.now().toString(),
      dateAdded: new Date(),
    };
    setMaterials([newEntry, ...materials]);
    setShowForm(false);
    setNewMaterial({
      title: '',
      description: '',
      subject: 'Computer Science',
      type: 'article',
      url: '',
    });
  };

  const getTypeIcon = (type: MaterialType) => {
    switch (type) {
      case 'article':
        return <BookOpen className="h-5 w-5 text-blue-500" />;
      case 'video':
        return <Video className="h-5 w-5 text-red-500" />;
      case 'document':
        return <FileText className="h-5 w-5 text-amber-500" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getTypeLabel = (type: MaterialType) => {
    switch (type) {
      case 'article':
        return 'Article';
      case 'video':
        return 'Video';
      case 'document':
        return 'Document';
      default:
        return 'Unknown';
    }
  };

  return (
    <Layout>
      <div className="container mx-auto">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Study Materials</h1>
            <p className="text-muted-foreground">
              Browse or add study resources for your learning journey.
            </p>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search materials..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button onClick={() => setShowForm(!showForm)}>
              <Plus className="mr-1 h-4 w-4" /> Add
            </Button>
          </div>
        </div>

        {showForm && (
          <div className="mb-6 border rounded-lg p-4 shadow-sm bg-muted/10">
            <h2 className="text-xl font-semibold mb-4">Add Study Material</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Title</Label>
                <Input
                  value={newMaterial.title}
                  onChange={(e) => setNewMaterial({ ...newMaterial, title: e.target.value })}
                />
              </div>
              <div>
                <Label>URL</Label>
                <Input
                  value={newMaterial.url}
                  onChange={(e) => setNewMaterial({ ...newMaterial, url: e.target.value })}
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={newMaterial.description}
                  onChange={(e) =>
                    setNewMaterial({ ...newMaterial, description: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Type</Label>
                <Select
                  value={newMaterial.type}
                  onValueChange={(val) =>
                    setNewMaterial({ ...newMaterial, type: val as MaterialType })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="article">Article</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="document">Document</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-4">
              <Button onClick={handleAddMaterial}>Submit</Button>
            </div>
          </div>
        )}

        <div className="mb-6">
          <Tabs
            defaultValue="all"
            value={selectedType}
            onValueChange={(value) => setSelectedType(value as MaterialType | 'all')}
          >
            <TabsList>
              <TabsTrigger value="all">All Types</TabsTrigger>
              <TabsTrigger value="article">Articles</TabsTrigger>
              <TabsTrigger value="video">Videos</TabsTrigger>
              <TabsTrigger value="document">Documents</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {subjects.map((subject) => (
            <Button
              key={subject}
              variant={selectedSubject === subject ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedSubject(subject)}
            >
              {subject}
            </Button>
          ))}
        </div>

        {filteredMaterials.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No study materials found matching your criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMaterials.map((material) => (
              <Card key={material.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(material.type)}
                      <CardTitle className="text-lg">{material.title}</CardTitle>
                    </div>
                  </div>
                  <CardDescription className="text-xs flex items-center gap-1">
                    <span>{material.subject}</span>
                    <span>•</span>
                    <span>{getTypeLabel(material.type)}</span>
                    <span>•</span>
                    <span>{material.dateAdded.toLocaleDateString()}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {material.description}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <a href={material.url} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" /> View
                    </Button>
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default StudyMaterials;
