
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Book, Brain, Calendar, Clock, Home, ListTodo, MessageCircle, Settings, User, Menu, X } from 'lucide-react';

type SidebarItem = {
  name: string;
  href: string;
  icon: React.ReactNode;
}

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const sidebarItems: SidebarItem[] = [
    { name: 'Home', href: '/', icon: <Home className="h-5 w-5" /> },
    { name: 'Study Materials', href: '/study-materials', icon: <Book className="h-5 w-5" /> },
    { name: 'AI Assistant', href: '/ai-chat', icon: <Brain className="h-5 w-5" /> },
    { name: 'Calendar', href: '/calendar', icon: <Calendar className="h-5 w-5" /> },
    { name: 'Todo', href: '/todo', icon: <ListTodo className="h-5 w-5" /> },
    { name: 'Focus Timer', href: '/focus', icon: <Clock className="h-5 w-5" /> },
    { name: 'Community', href: '/community', icon: <MessageCircle className="h-5 w-5" /> },
    { name: 'Profile', href: '/profile', icon: <User className="h-5 w-5" /> },
    { name: 'Settings', href: '/settings', icon: <Settings className="h-5 w-5" /> },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-40">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="shadow-md"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Sidebar - Desktop */}
      <div className="hidden lg:flex flex-col w-64 bg-card border-r shadow-sm animate-fade-in">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold text-study-primary flex items-center gap-2">
            <Brain className="h-6 w-6" />
            StudySpark
          </h1>
        </div>

        <nav className="flex-grow p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.name}>
                <Button
                  variant={isActive(item.href) ? "secondary" : "ghost"}
                  className={`w-full justify-start ${isActive(item.href) ? 'bg-secondary text-study-primary font-medium' : ''}`}
                  onClick={() => navigate(item.href)}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Sidebar - Mobile */}
      {isSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-30">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={closeSidebar}
          ></div>
          
          {/* Sidebar */}
          <div className="absolute left-0 top-0 h-full w-64 bg-card shadow-lg animate-fade-in">
            <div className="p-4 border-b flex items-center justify-between">
              <h1 className="text-xl font-bold text-study-primary flex items-center gap-2">
                <Brain className="h-5 w-5" />
                StudySpark
              </h1>
              <Button variant="ghost" size="icon" onClick={closeSidebar}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <nav className="p-4">
              <ul className="space-y-2">
                {sidebarItems.map((item) => (
                  <li key={item.name}>
                    <Button
                      variant={isActive(item.href) ? "secondary" : "ghost"}
                      className={`w-full justify-start ${isActive(item.href) ? 'bg-secondary text-study-primary font-medium' : ''}`}
                      onClick={() => {
                        navigate(item.href);
                        closeSidebar();
                      }}
                    >
                      {item.icon}
                      <span className="ml-3">{item.name}</span>
                    </Button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
      
      {/* Main content */}
      <div className="flex-1 overflow-auto p-4 lg:p-8">
        {children}
      </div>
    </div>
  );
};

export default Layout;
