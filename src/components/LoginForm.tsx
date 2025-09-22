import React, { useState } from 'react';
import { User, Lock, Mail, ChevronRight, Leaf, Users, GraduationCap } from 'lucide-react';

interface LoginFormProps {
  onLogin: (role: 'student' | 'teacher' | 'parent', credentials: any) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState<'student' | 'teacher' | 'parent' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const roles = [
    {
      id: 'student' as const,
      name: 'Student',
      description: 'Explore, learn, and earn rewards',
      icon: GraduationCap,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'teacher' as const,
      name: 'Teacher',
      description: 'Guide students and track progress',
      icon: Users,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'parent' as const,
      name: 'Parent',
      description: 'Monitor your child\'s learning journey',
      icon: User,
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onLogin(selectedRole, { email, password });
      setIsLoading(false);
    }, 1000);
  };

  const handleDemoLogin = (role: 'student' | 'teacher' | 'parent') => {
    const demoCredentials = {
      student: { email: 'student@demo.com', name: 'Alex Chen' },
      teacher: { email: 'teacher@demo.com', name: 'Ms. Johnson' },
      parent: { email: 'parent@demo.com', name: 'Sarah Wilson' }
    };
    
    onLogin(role, demoCredentials[role]);
  };

  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center">
                <Leaf className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Gamified Environmental Education Platform
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Learn, play, and make a difference for our planet through interactive education and rewards
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className="group relative overflow-hidden bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 text-left hover:border-gray-600 transition-all duration-300 hover:scale-105"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${role.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <role.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{role.name}</h3>
                <p className="text-gray-400 mb-4">{role.description}</p>
                <div className="flex items-center text-green-400 font-semibold">
                  <span>Get Started</span>
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>

          <div className="text-center">
            <p className="text-gray-500 mb-4">Try demo accounts:</p>
            <div className="flex justify-center space-x-4 flex-wrap">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => handleDemoLogin(role.id)}
                  className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors text-sm"
                >
                  Demo {role.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentRole = roles.find(r => r.id === selectedRole)!;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <button
          onClick={() => setSelectedRole(null)}
          className="mb-6 text-gray-400 hover:text-white flex items-center space-x-2 transition-colors"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          <span>Back to role selection</span>
        </button>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
          <div className="text-center mb-8">
            <div className={`w-16 h-16 bg-gradient-to-r ${currentRole.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
              <currentRole.icon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Welcome {currentRole.name}</h2>
            <p className="text-gray-400">{currentRole.description}</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <div className="relative">
                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-900/50 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-900/50 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-gradient-to-r ${currentRole.color} text-white py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-700">
            <button
              onClick={() => handleDemoLogin(selectedRole)}
              className="w-full text-gray-400 hover:text-white transition-colors text-sm"
            >
              Use demo account instead
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;