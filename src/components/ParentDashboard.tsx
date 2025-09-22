import React, { useState } from 'react';
import { User, TrendingUp, Award, Clock, Target, Calendar, BookOpen, Star, AlertTriangle } from 'lucide-react';

const ParentDashboard: React.FC = () => {
  const [selectedChild, setSelectedChild] = useState('1');
  const [timeframe, setTimeframe] = useState('week');

  const children = [
    { id: '1', name: 'Alex Chen', age: 12, grade: '7th Grade', avatar: 'AC' },
    { id: '2', name: 'Emma Chen', age: 10, grade: '5th Grade', avatar: 'EC' }
  ];

  const childData = {
    '1': {
      level: 12,
      points: 2850,
      streak: 7,
      weeklyGoal: 5,
      weeklyProgress: 3,
      totalTime: '12h 30m',
      modulesCompleted: 23,
      averageScore: 89,
      recentBadges: [
        { name: 'Water Guardian', icon: '💧', earnedDate: '2 days ago' },
        { name: 'Green Warrior', icon: '🌱', earnedDate: '1 week ago' },
        { name: 'Quiz Master', icon: '🧠', earnedDate: '1 week ago' }
      ],
      weeklyActivity: [65, 80, 45, 90, 75, 85, 60],
      recentModules: [
        { name: 'Ocean Pollution Crisis', score: 95, completedDate: '2 days ago', timeSpent: '25 min' },
        { name: 'Renewable Energy Heroes', score: 87, completedDate: '4 days ago', timeSpent: '20 min' },
        { name: 'Forest Conservation', score: 92, completedDate: '1 week ago', timeSpent: '30 min' }
      ],
      ecoActions: [
        { action: 'Used reusable water bottle', points: 15, date: 'Today' },
        { action: 'Took shorter shower', points: 10, date: 'Yesterday' },
        { action: 'Recycled plastic bottles', points: 20, date: '2 days ago' }
      ],
      concerns: [
        { type: 'info', message: 'Alex is performing excellently in all modules!' },
        { type: 'suggestion', message: 'Consider challenging Alex with advanced climate science modules.' }
      ]
    },
    '2': {
      level: 8,
      points: 1640,
      streak: 4,
      weeklyGoal: 3,
      weeklyProgress: 2,
      totalTime: '8h 15m',
      modulesCompleted: 14,
      averageScore: 84,
      recentBadges: [
        { name: 'Animal Friend', icon: '🐾', earnedDate: '3 days ago' },
        { name: 'Nature Explorer', icon: '🌳', earnedDate: '1 week ago' }
      ],
      weeklyActivity: [40, 60, 35, 70, 55, 50, 45],
      recentModules: [
        { name: 'Animal Habitats', score: 88, completedDate: '3 days ago', timeSpent: '18 min' },
        { name: 'Water Cycle Adventure', score: 82, completedDate: '5 days ago', timeSpent: '22 min' }
      ],
      ecoActions: [
        { action: 'Fed birds in backyard', points: 10, date: 'Today' },
        { action: 'Helped with garden', points: 15, date: '2 days ago' }
      ],
      concerns: [
        { type: 'info', message: 'Emma is making steady progress in age-appropriate modules.' },
        { type: 'suggestion', message: 'Encourage Emma to complete her weekly learning goal.' }
      ]
    }
  };

  const currentChild = childData[selectedChild as keyof typeof childData];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Parent Dashboard</h1>
          <p className="text-gray-400">Monitor your children's environmental learning journey</p>
        </div>

        {/* Child Selector */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            {children.map((child) => (
              <button
                key={child.id}
                onClick={() => setSelectedChild(child.id)}
                className={`flex items-center space-x-3 p-4 rounded-xl border transition-all duration-200 ${
                  selectedChild === child.id
                    ? 'bg-blue-500/20 border-blue-500 text-white'
                    : 'bg-gray-800/50 border-gray-700 text-gray-400 hover:border-gray-600'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                  selectedChild === child.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                    : 'bg-gray-700 text-gray-300'
                }`}>
                  {child.avatar}
                </div>
                <div className="text-left">
                  <p className="font-semibold">{child.name}</p>
                  <p className="text-sm opacity-75">{child.grade} • Age {child.age}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-blue-500/30 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <Target className="w-8 h-8 text-blue-400" />
              <div>
                <p className="text-blue-400 text-2xl font-bold">{currentChild.level}</p>
                <p className="text-gray-400 text-sm">Level</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm border border-yellow-500/30 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <Star className="w-8 h-8 text-yellow-400" />
              <div>
                <p className="text-yellow-400 text-2xl font-bold">{currentChild.points}</p>
                <p className="text-gray-400 text-sm">Points</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-500/30 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-green-400 text-2xl font-bold">{currentChild.modulesCompleted}</p>
                <p className="text-gray-400 text-sm">Modules</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-500/30 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <Clock className="w-8 h-8 text-purple-400" />
              <div>
                <p className="text-purple-400 text-2xl font-bold">{currentChild.totalTime}</p>
                <p className="text-gray-400 text-sm">Total Time</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Weekly Progress */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                  Learning Progress
                </h2>
                <select 
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                  className="bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 text-sm"
                >
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="semester">This Semester</option>
                </select>
              </div>

              {/* Weekly Goal Progress */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Weekly Learning Goal</span>
                  <span className="text-white font-semibold">{currentChild.weeklyProgress}/{currentChild.weeklyGoal} modules</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${(currentChild.weeklyProgress / currentChild.weeklyGoal) * 100}%` }}
                  ></div>
                </div>
                <p className="text-gray-400 text-sm mt-2">
                  {currentChild.weeklyProgress >= currentChild.weeklyGoal 
                    ? '🎉 Weekly goal achieved!' 
                    : `${currentChild.weeklyGoal - currentChild.weeklyProgress} more modules to reach goal`}
                </p>
              </div>

              {/* Activity Chart */}
              <div>
                <h3 className="text-white font-semibold mb-3">Daily Activity (Minutes)</h3>
                <div className="flex items-end space-x-2 h-32">
                  {currentChild.weeklyActivity.map((minutes, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-full bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t-lg transition-all duration-300 hover:from-blue-600 hover:to-cyan-500"
                        style={{ height: `${(minutes / 100) * 100}%`, minHeight: '4px' }}
                      ></div>
                      <span className="text-gray-400 text-xs mt-2">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Modules */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-blue-400" />
                Recent Learning Activities
              </h2>
              <div className="space-y-4">
                {currentChild.recentModules.map((module, index) => (
                  <div key={index} className="bg-gray-900/50 border border-gray-600 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-white font-semibold">{module.name}</h3>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          module.score >= 90 
                            ? 'text-green-400 bg-green-400/20' 
                            : module.score >= 80 
                            ? 'text-yellow-400 bg-yellow-400/20' 
                            : 'text-red-400 bg-red-400/20'
                        }`}>
                          {module.score}%
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>Completed {module.completedDate}</span>
                      <span>Time spent: {module.timeSpent}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Achievement Overview */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2 text-purple-400" />
                Recent Achievements
              </h3>
              <div className="space-y-3">
                {currentChild.recentBadges.map((badge, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-900/50 rounded-lg">
                    <span className="text-2xl">{badge.icon}</span>
                    <div>
                      <p className="text-white font-medium text-sm">{badge.name}</p>
                      <p className="text-gray-400 text-xs">Earned {badge.earnedDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Eco Actions */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <Star className="w-5 h-5 mr-2 text-green-400" />
                Recent Eco Actions
              </h3>
              <div className="space-y-3">
                {currentChild.ecoActions.map((action, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                    <div>
                      <p className="text-white text-sm font-medium">{action.action}</p>
                      <p className="text-gray-400 text-xs">{action.date}</p>
                    </div>
                    <span className="text-yellow-400 text-sm font-semibold">+{action.points}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Insights */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-blue-400" />
                Performance Insights
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Average Score</span>
                  <span className="text-green-400 font-semibold">{currentChild.averageScore}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Current Streak</span>
                  <span className="text-orange-400 font-semibold">{currentChild.streak} days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Learning Time/Week</span>
                  <span className="text-blue-400 font-semibold">{currentChild.totalTime}</span>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-yellow-400" />
                Recommendations
              </h3>
              <div className="space-y-3">
                {currentChild.concerns.map((concern, index) => (
                  <div key={index} className={`p-3 rounded-lg border ${
                    concern.type === 'info' 
                      ? 'bg-blue-500/20 border-blue-500/30' 
                      : 'bg-yellow-500/20 border-yellow-500/30'
                  }`}>
                    <p className={`text-sm ${
                      concern.type === 'info' ? 'text-blue-400' : 'text-yellow-400'
                    }`}>
                      {concern.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;