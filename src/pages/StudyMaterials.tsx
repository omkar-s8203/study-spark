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
import { BookOpen, Download, FileText, Search, Video, Plus, Star, StarOff } from 'lucide-react';
import Layout from '@/components/Layout';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectItem, SelectValue, SelectContent } from '@/components/ui/select';

// Updated types

const subjects = ['All', 'Computer Science'];
const tags = ['All', 'DSA', 'Frontend', 'Backend', 'ML', 'System Design'];

type MaterialType = 'article' | 'video' | 'document';

interface StudyMaterial {
  id: string;
  title: string;
  description: string;
  subject: string;
  type: MaterialType;
  url: string;
  tags: string[];
  dateAdded: Date;
  favorite: boolean;
}

const initialMaterials: StudyMaterial[] = [
  {
    id: '1',
    title: 'Introduction to Algorithms',
    description: 'Explore basic algorithmic techniques and problem-solving approaches.',
    subject: 'Computer Science',
    type: 'article',
    url: 'https://www.geeksforgeeks.org/fundamentals-of-algorithms/',
    tags: ['DSA'],
    favorite: false,
    dateAdded: new Date(2025, 3, 1),
  },
  {
    id: '2',
    title: 'Frontend HTML, CSS, JS Course',
    description: 'Complete Frontend crash course.',
    subject: 'Computer Science',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=zJSY8tbf_ys',
    tags: ['Frontend'],
    favorite: true,
    dateAdded: new Date(2025, 3, 2),
  },
  {
    id: '3',
    title: 'System Design Basics',
    description: 'Learn system design with real-world examples.',
    subject: 'Computer Science',
    type: 'article',
    url: 'https://www.educative.io/blog/crack-system-design-interview',
    tags: ['System Design'],
    favorite: false,
    dateAdded: new Date(2025, 3, 5),
  },
  {
    id: '4',
    title: 'React Full Course 2024',
    description: 'Beginner to advanced React concepts explained.',
    subject: 'Computer Science',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=bMknfKXIFA8',
    tags: ['Frontend'],
    favorite: true,
    dateAdded: new Date(2025, 3, 6),
  },
  {
    id: '5',
    title: 'Machine Learning Crash Course by Google',
    description: 'Hands-on ML exercises and concepts.',
    subject: 'Computer Science',
    type: 'article',
    url: 'https://developers.google.com/machine-learning/crash-course',
    tags: ['ML'],
    favorite: false,
    dateAdded: new Date(2025, 3, 6),
  },
  {
    id: '6',
    title: 'Clean Code - Book Summary',
    description: 'Summary and key points from Clean Code by Robert C. Martin.',
    subject: 'Computer Science',
    type: 'document',
    url: 'https://drive.google.com/file/d/clean-code-summary',
    tags: ['Backend'],
    favorite: false,
    dateAdded: new Date(2025, 3, 7),
  },
  {
    id: '7',
    title: 'Node.js Crash Course',
    description: 'Quick guide to Node.js for backend development.',
    subject: 'Computer Science',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=fBNz5xF-Kx4',
    tags: ['Backend'],
    favorite: true,
    dateAdded: new Date(2025, 3, 8),
  },
  {
    id: '8',
    title: 'Git & GitHub for Beginners',
    description: 'Learn version control with Git and GitHub.',
    subject: 'Computer Science',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=RGOj5yH7evk',
    tags: ['System Design'],
    favorite: false,
    dateAdded: new Date(2025, 3, 9),
  },
  {
    id: '9',
    title: 'MongoDB Basics',
    description: 'Introduction to MongoDB NoSQL database.',
    subject: 'Computer Science',
    type: 'article',
    url: 'https://www.mongodb.com/basics',
    tags: ['Backend'],
    favorite: false,
    dateAdded: new Date(2025, 3, 10),
  },
  {
    id: '10',
    title: 'Flexbox Cheatsheet',
    description: 'Quick reference for using Flexbox in CSS.',
    subject: 'Computer Science',
    type: 'document',
    url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/',
    tags: ['Frontend'],
    favorite: false,
    dateAdded: new Date(2025, 3, 10),
  },
  {
    id: '11',
    title: 'Java OOP Concepts',
    description: 'Understand object-oriented programming in Java.',
    subject: 'Computer Science',
    type: 'article',
    url: 'https://www.javatpoint.com/java-oops-concepts',
    tags: ['Backend'],
    favorite: false,
    dateAdded: new Date(2025, 3, 11),
  },
  {
    id: '12',
    title: 'REST API Design Best Practices',
    description: 'Learn how to structure and secure your REST APIs.',
    subject: 'Computer Science',
    type: 'article',
    url: 'https://www.freecodecamp.org/news/rest-api-best-practices/',
    tags: ['Backend'],
    favorite: true,
    dateAdded: new Date(2025, 3, 12),
  },
  {
    id: '13',
    title: 'TensorFlow Getting Started',
    description: 'Introduction to building ML models using TensorFlow.',
    subject: 'Computer Science',
    type: 'article',
    url: 'https://www.tensorflow.org/tutorials',
    tags: ['ML'],
    favorite: false,
    dateAdded: new Date(2025, 3, 13),
  },
  {
    id: '14',
    title: 'Data Structures PDF Notes',
    description: 'Detailed notes on common data structures.',
    subject: 'Computer Science',
    type: 'document',
    url: 'https://example.com/data-structures-pdf',
    tags: ['DSA'],
    favorite: true,
    dateAdded: new Date(2025, 3, 14),
  },
  {
    id: '15',
    title: 'Firebase Authentication Guide',
    description: 'Implementing authentication using Firebase.',
    subject: 'Computer Science',
    type: 'article',
    url: 'https://firebase.google.com/docs/auth',
    tags: ['Backend'],
    favorite: false,
    dateAdded: new Date(2025, 3, 15),
  },
  {
    id: '16',
    title: 'Redux Toolkit in React',
    description: 'Managing state efficiently in React with Redux Toolkit.',
    subject: 'Computer Science',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=9zySeP5vH9c',
    tags: ['Frontend'],
    favorite: false,
    dateAdded: new Date(2025, 3, 15),
  },
  {
    id: '17',
    title: 'PostgreSQL Beginner Guide',
    description: 'Getting started with relational databases using PostgreSQL.',
    subject: 'Computer Science',
    type: 'article',
    url: 'https://www.postgresql.org/docs/',
    tags: ['Backend'],
    favorite: true,
    dateAdded: new Date(2025, 3, 16),
  },
  {
    id: '18',
    title: 'Responsive Web Design Principles',
    description: 'Make your websites look good on all devices.',
    subject: 'Computer Science',
    type: 'article',
    url: 'https://web.dev/responsive-web-design-basics/',
    tags: ['Frontend'],
    favorite: false,
    dateAdded: new Date(2025, 3, 17),
  },
  {
    id: '19',
    title: 'Authentication vs Authorization',
    description: 'Understand the difference between auth concepts.',
    subject: 'Computer Science',
    type: 'document',
    url: 'https://auth0.com/docs/get-started/identity-fundamentals',
    tags: ['System Design'],
    favorite: false,
    dateAdded: new Date(2025, 3, 18),
  },
  {
    id: '20',
    title: 'Python for Data Science',
    description: 'Introduction to Python libraries used in data science.',
    subject: 'Computer Science',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=LHBE6Q9XlzI',
    tags: ['ML'],
    favorite: true,
    dateAdded: new Date(2025, 3, 19),
  },
];


const StudyMaterials = () => {
  const [materials, setMaterials] = useState<StudyMaterial[]>(initialMaterials);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedType, setSelectedType] = useState<'all' | MaterialType>('all');
  const [selectedTag, setSelectedTag] = useState('All');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');
  const [showForm, setShowForm] = useState(false);

  const [newMaterial, setNewMaterial] = useState<Omit<StudyMaterial, 'id' | 'dateAdded' | 'favorite'>>({
    title: '',
    description: '',
    subject: 'Computer Science',
    type: 'article',
    url: '',
    tags: [],
  });

  const filteredMaterials = materials
    .filter((material) => {
      const matchSearch =
        material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        material.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchSubject = selectedSubject === 'All' || material.subject === selectedSubject;
      const matchType = selectedType === 'all' || material.type === selectedType;
      const matchTag = selectedTag === 'All' || material.tags.includes(selectedTag);
      return matchSearch && matchSubject && matchType && matchTag;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return b.dateAdded.getTime() - a.dateAdded.getTime();
      else return a.dateAdded.getTime() - b.dateAdded.getTime();
    });

  const handleAddMaterial = () => {
    const newEntry: StudyMaterial = {
      ...newMaterial,
      id: Date.now().toString(),
      dateAdded: new Date(),
      favorite: false,
    };
    setMaterials([newEntry, ...materials]);
    setShowForm(false);
    setNewMaterial({
      title: '',
      description: '',
      subject: 'Computer Science',
      type: 'article',
      url: '',
      tags: [],
    });
  };

  const toggleFavorite = (id: string) => {
    setMaterials((prev) =>
      prev.map((m) => (m.id === id ? { ...m, favorite: !m.favorite } : m))
    );
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

  return (
    <Layout>
      <div className="container mx-auto">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Study Materials</h1>
            <p className="text-muted-foreground">Smart filtering, sorting, and favorites.</p>
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Search materials..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
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
                  onChange={(e) => setNewMaterial({ ...newMaterial, description: e.target.value })}
                />
              </div>
              <div>
                <Label>Tags (comma separated)</Label>
                <Input
                  placeholder="DSA, Frontend"
                  onChange={(e) =>
                    setNewMaterial({
                      ...newMaterial,
                      tags: e.target.value.split(',').map((tag) => tag.trim()),
                    })
                  }
                />
              </div>
              <div>
                <Label>Type</Label>
                <Select
                  value={newMaterial.type}
                  onValueChange={(val) => setNewMaterial({ ...newMaterial, type: val as MaterialType })}
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

        <div className="mb-4 flex flex-wrap gap-2">
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

          <Select value={sortBy} onValueChange={(val) => setSortBy(val as 'newest' | 'oldest')}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
            </SelectContent>
          </Select>

          <Tabs value={selectedType} onValueChange={(value) => setSelectedType(value as MaterialType | 'all')}>
            <TabsList>
              <TabsTrigger value="all">All Types</TabsTrigger>
              <TabsTrigger value="article">Articles</TabsTrigger>
              <TabsTrigger value="video">Videos</TabsTrigger>
              <TabsTrigger value="document">Documents</TabsTrigger>
            </TabsList>
          </Tabs>

          {tags.map((tag) => (
            <Button
              key={tag}
              variant={selectedTag === tag ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </Button>
          ))}
        </div>

        {filteredMaterials.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No materials found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMaterials.map((material) => (
              <Card key={material.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-2 items-center">
                      {getTypeIcon(material.type)}
                      <CardTitle className="text-lg">{material.title}</CardTitle>
                    </div>
                    <Button size="icon" variant="ghost" onClick={() => toggleFavorite(material.id)}>
                      {material.favorite ? (
                        <Star className="w-4 h-4 text-yellow-400" />
                      ) : (
                        <StarOff className="w-4 h-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                  <CardDescription className="text-xs">
                    {material.subject} • {material.type} • {material.dateAdded.toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">{material.description}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {material.tags.map((tag, index) => (
                      <span key={index} className="text-xs bg-muted px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
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