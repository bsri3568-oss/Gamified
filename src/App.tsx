import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import StudentDashboard from './components/StudentDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import ParentDashboard from './components/ParentDashboard';
import ProcessFlow from './components/ProcessFlow';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'parent';
  points?: number;
  level?: number;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<'flow' | 'dashboard'>('flow');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('ecolearn_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
        setCurrentView('dashboard');
      } catch (error) {
        localStorage.removeItem('ecolearn_user');
      }
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (role: 'student' | 'teacher' | 'parent', credentials: any) => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: credentials.name || `Demo ${role.charAt(0).toUpperCase() + role.slice(1)}`,
      email: credentials.email,
      role,
      points: role === 'student' ? 2850 : undefined,
      level: role === 'student' ? 12 : undefined
    };
    
    setUser(newUser);
    setCurrentView('dashboard');
    localStorage.setItem('ecolearn_user', JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('flow');
    localStorage.removeItem('ecolearn_user');
  };

  const toggleView = () => {
    setCurrentView(currentView === 'flow' ? 'dashboard' : 'flow');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mb-4 mx-auto animate-pulse">
            <span className="text-white font-bold text-xl">E</span>
          </div>
          <p className="text-gray-400">Loading EcoLearn...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  const renderDashboard = () => {
    switch (user.role) {
      case 'student':
        return <StudentDashboard />;
      case 'teacher':
        return <TeacherDashboard />;
      case 'parent':
        return <ParentDashboard />;
      default:
        return <StudentDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Header 
        user={user} 
        onLogout={handleLogout}
        currentPoints={user.points}
        currentLevel={user.level}
      />
      
      {/* View Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleView}
          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2"
        >
          <span>{currentView === 'flow' ? 'View Dashboard' : 'View Process Flow'}</span>
        </button>
      </div>

      {currentView === 'flow' ? <ProcessFlow /> : renderDashboard()}
    </div>
  );
}

export default App;