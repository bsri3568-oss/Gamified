import React, { useState } from 'react';
import { Trophy, Target, Zap, BookOpen, Star, TrendingUp, Play, Award, Flame } from 'lucide-react';

const StudentDashboard: React.FC = () => {
  const [activeModule, setActiveModule] = useState<string | null>(null);

  const stats = {
    points: 2850,
    level: 12,
    streak: 7,
    modulesCompleted: 23,
    weeklyGoal: 5,
    weeklyProgress: 3
  };

  const recentBadges = [
    { id: '1', name: 'Water Guardian', icon: '💧', description: 'Completed water conservation module' },
    { id: '2', name: 'Green Warrior', icon: '🌱', description: 'Planted virtual trees in game' },
    { id: '3', name: 'Quiz Master', icon: '🧠', description: 'Perfect score on climate quiz' }
  ];

  const recommendedModules = [
    {
      id: '1',
      title: 'Ocean Pollution Crisis',
      description: 'Discover the impact of plastic waste on marine life',
      difficulty: 'intermediate',
      points: 150,
      estimatedTime: '25 min',
      progress: 0,
      category: 'Marine Biology',
      icon: '🌊'
    },
    {
      id: '2',
      title: 'Renewable Energy Heroes',
      description: 'Learn about solar, wind, and hydro power solutions',
      difficulty: 'beginner',
      points: 120,
      estimatedTime: '20 min',
      progress: 60,
      category: 'Energy',
      icon: '⚡'
    },
    {
      id: '3',
      title: 'Climate Change Detective',
      description: 'Investigate the causes and effects of global warming',
      difficulty: 'advanced',
      points: 200,
      estimatedTime: '35 min',
      progress: 0,
      category: 'Climate Science',
      icon: '🔍'
    }
  ];

  const ecoActions = [
    { id: '1', title: 'Take shorter showers', points: 10, completed: true },
    { id: '2', title: 'Use reusable water bottle', points: 15, completed: true },
    { id: '3', title: 'Plant a tree (virtually)', points: 25, completed: false },
    { id: '4', title: 'Reduce food waste', points: 20, completed: false }
  ];

  const difficultyColors = {
    beginner: 'text-green-400 bg-green-400/20',
    intermediate: 'text-yellow-400 bg-yellow-400/20',
    advanced: 'text-red-400 bg-red-400/20'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, Alex! 🌟</h1>
          <p className="text-gray-400">Ready to continue your environmental adventure?</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm border border-yellow-500/30 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <Trophy className="w-8 h-8 text-yellow-400" />
              <div>
                <p className="text-yellow-400 text-2xl font-bold">{stats.points}</p>
                <p className="text-gray-400 text-sm">Points</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-500/30 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <Target className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-green-400 text-2xl font-bold">{stats.level}</p>
                <p className="text-gray-400 text-sm">Level</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm border border-orange-500/30 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <Flame className="w-8 h-8 text-orange-400" />
              <div>
                <p className="text-orange-400 text-2xl font-bold">{stats.streak}</p>
                <p className="text-gray-400 text-sm">Day Streak</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-500/30 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-8 h-8 text-blue-400" />
              <div>
                <p className="text-blue-400 text-2xl font-bold">{stats.modulesCompleted}</p>
                <p className="text-gray-400 text-sm">Completed</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Weekly Progress */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                Weekly Goal Progress
              </h2>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Modules completed this week</span>
                  <span className="text-white">{stats.weeklyProgress}/{stats.weeklyGoal}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${(stats.weeklyProgress / stats.weeklyGoal) * 100}%` }}
                  ></div>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Great job! Complete {stats.weeklyGoal - stats.weeklyProgress} more modules to reach your weekly goal.
              </p>
            </div>

            {/* Recommended Learning Modules */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                AI Recommended for You
              </h2>
              <div className="space-y-4">
                {recommendedModules.map((module) => (
                  <div
                    key={module.id}
                    className="group bg-gray-900/50 border border-gray-600 rounded-lg p-4 hover:border-gray-500 transition-all duration-200 cursor-pointer"
                    onClick={() => setActiveModule(activeModule === module.id ? null : module.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="text-2xl">{module.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-white font-semibold group-hover:text-green-400 transition-colors">
                              {module.title}
                            </h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[module.difficulty as keyof typeof difficultyColors]}`}>
                              {module.difficulty}
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm mb-3">{module.description}</p>
                          
                          {module.progress > 0 && (
                            <div className="mb-3">
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-gray-400">Progress</span>
                                <span className="text-green-400">{module.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-700 rounded-full h-2">
                                <div 
                                  className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full"
                                  style={{ width: `${module.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          )}
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-gray-400">
                              <span>{module.estimatedTime}</span>
                              <span className="flex items-center">
                                <Trophy className="w-4 h-4 mr-1 text-yellow-400" />
                                {module.points} pts
                              </span>
                            </div>
                            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 transition-colors">
                              <Play className="w-4 h-4" />
                              <span>{module.progress > 0 ? 'Continue' : 'Start'}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Badges */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2 text-purple-400" />
                Recent Badges
              </h3>
              <div className="space-y-3">
                {recentBadges.map((badge) => (
                  <div key={badge.id} className="flex items-center space-x-3 p-3 bg-gray-900/50 rounded-lg">
                    <span className="text-2xl">{badge.icon}</span>
                    <div>
                      <p className="text-white font-medium text-sm">{badge.name}</p>
                      <p className="text-gray-400 text-xs">{badge.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Eco Actions */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <Star className="w-5 h-5 mr-2 text-green-400" />
                Today's Eco Actions
              </h3>
              <div className="space-y-2">
                {ecoActions.map((action) => (
                  <div key={action.id} className="flex items-center justify-between p-2">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full border-2 ${action.completed ? 'bg-green-500 border-green-500' : 'border-gray-500'}`}>
                        {action.completed && <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>}
                      </div>
                      <span className={`text-sm ${action.completed ? 'text-gray-400 line-through' : 'text-white'}`}>
                        {action.title}
                      </span>
                    </div>
                    <span className="text-yellow-400 text-xs font-medium">+{action.points}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Leaderboard Preview */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
                Class Leaderboard
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-yellow-500/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-400 font-bold text-sm">1</span>
                    <span className="text-white text-sm font-medium">You</span>
                  </div>
                  <span className="text-yellow-400 text-sm font-bold">{stats.points}</span>
                </div>
                <div className="flex items-center justify-between p-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400 font-bold text-sm">2</span>
                    <span className="text-gray-300 text-sm">Emma K.</span>
                  </div>
                  <span className="text-gray-400 text-sm">2,720</span>
                </div>
                <div className="flex items-center justify-between p-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400 font-bold text-sm">3</span>
                    <span className="text-gray-300 text-sm">Jake M.</span>
                  </div>
                  <span className="text-gray-400 text-sm">2,580</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;