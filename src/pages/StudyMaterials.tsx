
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { BookOpen, Download, FileText, Search, Video } from 'lucide-react';
import Layout from '@/components/Layout';

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

// Mock data for study materials
const initialMaterials: StudyMaterial[] = [
  {
    id: '1',
    title: 'Introduction to Calculus',
    description: 'A comprehensive introduction to differential calculus and its applications.',
    subject: 'Mathematics',
    type: 'article',
    url: '#',
    dateAdded: new Date(2023, 5, 15),
  },
  {
    id: '2',
    title: 'Cell Biology Fundamentals',
    description: 'Learn about cell structure, function, and basic processes of cellular biology.',
    subject: 'Biology',
    type: 'video',
    url: '#',
    dateAdded: new Date(2023, 6, 2),
  },
  {
    id: '3',
    title: 'World History: Ancient Civilizations',
    description: 'Explore the rise and fall of major ancient civilizations around the world.',
    subject: 'History',
    type: 'document',
    url: '#',
    dateAdded: new Date(2023, 4, 10),
  },
  {
    id: '4',
    title: 'Organic Chemistry Basics',
    description: 'Introduction to organic compounds, reactions, and nomenclature.',
    subject: 'Chemistry',
    type: 'video',
    url: '#',
    dateAdded: new Date(2023, 6, 20),
  },
  {
    id: '5',
    title: 'Classical Mechanics',
    description: 'Study of physical principles governing the motion of bodies under the action of forces.',
    subject: 'Physics',
    type: 'document',
    url: '#',
    dateAdded: new Date(2023, 7, 5),
  },
  {
    id: '6',
    title: 'Literary Analysis Techniques',
    description: 'Methods and approaches for analyzing and interpreting literature.',
    subject: 'Literature',
    type: 'article',
    url: '#',
    dateAdded: new Date(2023, 5, 28),
  },
];

// Subject options
const subjects = [
  'All',
  'Mathematics',
  'Biology',
  'Chemistry',
  'Physics',
  'History',
  'Literature',
];

const StudyMaterials = () => {
  const [materials] = useState<StudyMaterial[]>(initialMaterials);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedType, setSelectedType] = useState<MaterialType | 'all'>('all');

  const filteredMaterials = materials.filter((material) => {
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          material.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSubject = selectedSubject === 'All' || material.subject === selectedSubject;
    
    const matchesType = selectedType === 'all' || material.type === selectedType;
    
    return matchesSearch && matchesSubject && matchesType;
  });

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
            <p className="text-muted-foreground">Browse our collection of curated study resources</p>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search materials..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-6">
          <Tabs defaultValue="all" value={selectedType} onValueChange={(value) => setSelectedType(value as MaterialType | 'all')}>
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
              className={selectedSubject === subject ? 'bg-study-primary hover:bg-study-primary/90' : ''}
            >
              {subject}
            </Button>
          ))}
        </div>

        {filteredMaterials.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No study materials found matching your criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMaterials.map((material) => (
              <Card key={material.id} className="overflow-hidden border-study-light hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(material.type)}
                      <CardTitle className="text-lg">{material.title}</CardTitle>
                    </div>
                  </div>
                  <CardDescription className="text-xs flex items-center gap-1">
                    <span className="bg-secondary text-secondary-foreground rounded px-2 py-0.5">
                      {material.subject}
                    </span>
                    <span>•</span>
                    <span>{getTypeLabel(material.type)}</span>
                    <span>•</span>
                    <span>Added {material.dateAdded.toLocaleDateString()}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {material.description}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button variant="outline" size="sm" className="text-study-primary">
                    <Download className="h-4 w-4 mr-1" /> Download
                  </Button>
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
