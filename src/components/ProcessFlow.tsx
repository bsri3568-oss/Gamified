import React from 'react';
import { Users, Brain, Gamepad2, Trophy, Database, BarChart3, RefreshCw, ArrowRight } from 'lucide-react';

const ProcessFlow: React.FC = () => {
  const steps = [
    {
      id: 1,
      title: 'User Login',
      subtitle: 'Student/Teacher/Parent',
      description: 'Secure login via web/mobile app',
      icon: Users,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      title: 'Personalized Dashboard',
      subtitle: 'AI Recommendations',
      description: 'AI recommends learning modules & games based on progress',
      icon: Brain,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 3,
      title: 'Interactive Gamified Learning',
      subtitle: 'Quizzes & Simulations',
      description: 'Quizzes, AR/VR simulations, challenges, and eco-missions',
      icon: Gamepad2,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 4,
      title: 'Reward System',
      subtitle: 'Points & Badges',
      description: 'Points, badges, and leaderboards motivate engagement',
      icon: Trophy,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 5,
      title: 'Progress Tracking',
      subtitle: 'Central Server',
      description: 'Data stored in central server (student performance, eco-actions)',
      icon: Database,
      color: 'from-indigo-500 to-purple-500'
    },
    {
      id: 6,
      title: 'Insights for Teachers & Parents',
      subtitle: 'Dashboard Analytics',
      description: 'Dashboard shows student progress, engagement, and eco-impact',
      icon: BarChart3,
      color: 'from-teal-500 to-cyan-500'
    },
    {
      id: 7,
      title: 'Continuous Learning Loop',
      subtitle: 'Ongoing Engagement',
      description: 'Students stay engaged via challenges & community events',
      icon: RefreshCw,
      color: 'from-rose-500 to-pink-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Gamified Environmental Education Platform
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A comprehensive learning ecosystem that transforms environmental education through 
            interactive games, AI-powered personalization, and community engagement
          </p>
        </div>

        {/* Process Flow */}
        <div className="relative">
          {/* Connection Lines for Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 opacity-30 -translate-y-1/2"></div>
          
          <div className="grid lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <div key={step.id} className="relative group">
                {/* Mobile Connection Line */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden absolute left-1/2 bottom-0 w-0.5 h-8 bg-gradient-to-b from-gray-600 to-transparent transform -translate-x-1/2 translate-y-full z-10"></div>
                )}
                
                {/* Desktop Arrow */}
                {index < steps.length - 1 && index % 4 !== 3 && (
                  <div className="hidden lg:block absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 z-20">
                    <ArrowRight className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors" />
                  </div>
                )}

                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 h-full hover:border-gray-600 transition-all duration-300 group-hover:scale-105">
                  {/* Step Number */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-500 text-sm font-medium">Step {step.id}</span>
                    <div className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-white text-lg font-bold mb-2">{step.title}</h3>
                    <h4 className={`text-sm font-semibold mb-3 bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}>
                      {step.subtitle}
                    </h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Platform Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-colors">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white font-bold">🌍</span>
              </div>
              <h3 className="text-white text-lg font-bold mb-2">Environmental Focus</h3>
              <p className="text-gray-400 text-sm">Comprehensive curriculum covering climate change, conservation, and sustainability topics.</p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-colors">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white font-bold">🎮</span>
              </div>
              <h3 className="text-white text-lg font-bold mb-2">Gamification</h3>
              <p className="text-gray-400 text-sm">Engaging game mechanics with points, levels, badges, and leaderboards to motivate learning.</p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-colors">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white font-bold">🤖</span>
              </div>
              <h3 className="text-white text-lg font-bold mb-2">AI Personalization</h3>
              <p className="text-gray-400 text-sm">Smart recommendations based on learning patterns, preferences, and performance data.</p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-colors">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white font-bold">📊</span>
              </div>
              <h3 className="text-white text-lg font-bold mb-2">Analytics Dashboard</h3>
              <p className="text-gray-400 text-sm">Detailed insights for teachers and parents to track progress and engagement levels.</p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-colors">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white font-bold">🥽</span>
              </div>
              <h3 className="text-white text-lg font-bold mb-2">AR/VR Integration</h3>
              <p className="text-gray-400 text-sm">Immersive experiences through augmented and virtual reality simulations.</p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-colors">
              <div className="w-12 h-12 bg-gradient-to-r from-rose-400 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white font-bold">👥</span>
              </div>
              <h3 className="text-white text-lg font-bold mb-2">Community Features</h3>
              <p className="text-gray-400 text-sm">Social learning with challenges, competitions, and collaborative eco-missions.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessFlow;