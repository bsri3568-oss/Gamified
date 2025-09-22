import React, { useState } from 'react';
import { Users, TrendingUp, Award, BookOpen, AlertCircle, Calendar, BarChart3, Target } from 'lucide-react';

const TeacherDashboard: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');

  const classStats = {
    totalStudents: 28,
    activeToday: 24,
    averageScore: 87,
    modulesAssigned: 12,
    completionRate: 78
  };

  const studentProgress = [
    { id: '1', name: 'Alex Chen', level: 12, points: 2850, weeklyActivity: 95, status: 'excellent' },
    { id: '2', name: 'Emma Rodriguez', level: 11, points: 2720, weeklyActivity: 88, status: 'good' },
    { id: '3', name: 'Jake Morrison', level: 10, points: 2580, weeklyActivity: 92, status: 'good' },
    { id: '4', name: 'Sophie Turner', level: 9, points: 2150, weeklyActivity: 65, status: 'needs attention' },
    { id: '5', name: 'Marcus Johnson', level: 8, points: 1980, weeklyActivity: 45, status: 'needs attention' }
  ];

  const recentAchievements = [
    { student: 'Alex Chen', badge: 'Water Guardian', time: '2 hours ago' },
    { student: 'Emma Rodriguez', badge: 'Quiz Master', time: '4 hours ago' },
    { student: 'Jake Morrison', badge: 'Green Warrior', time: '1 day ago' }
  ];

  const modulePerformance = [
    { name: 'Ocean Pollution', completion: 92, avgScore: 89, difficulty: 'intermediate' },
    { name: 'Renewable Energy', completion: 85, avgScore: 91, difficulty: 'beginner' },
    { name: 'Climate Change', completion: 67, avgScore: 82, difficulty: 'advanced' },
    { name: 'Waste Management', completion: 78, avgScore: 86, difficulty: 'intermediate' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-400 bg-green-400/20';
      case 'good': return 'text-blue-400 bg-blue-400/20';
      case 'needs attention': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-400 bg-green-400/20';
      case 'intermediate': return 'text-yellow-400 bg-yellow-400/20';
      case 'advanced': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Teacher Dashboard</h1>
          <p className="text-gray-400">Monitor your students' progress and engagement</p>
        </div>

        {/* Class Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-blue-500/30 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <Users className="w-8 h-8 text-blue-400" />
              <div>
                <p className="text-blue-400 text-2xl font-bold">{classStats.totalStudents}</p>
                <p className="text-gray-400 text-sm">Students</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-500/30 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-green-400 text-2xl font-bold">{classStats.activeToday}</p>
                <p className="text-gray-400 text-sm">Active Today</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-500/30 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <Award className="w-8 h-8 text-purple-400" />
              <div>
                <p className="text-purple-400 text-2xl font-bold">{classStats.averageScore}%</p>
                <p className="text-gray-400 text-sm">Avg Score</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm border border-orange-500/30 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-8 h-8 text-orange-400" />
              <div>
                <p className="text-orange-400 text-2xl font-bold">{classStats.modulesAssigned}</p>
                <p className="text-gray-400 text-sm">Modules</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-500/20 to-amber-500/20 backdrop-blur-sm border border-yellow-500/30 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <Target className="w-8 h-8 text-yellow-400" />
              <div>
                <p className="text-yellow-400 text-2xl font-bold">{classStats.completionRate}%</p>
                <p className="text-gray-400 text-sm">Completion</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Student Progress Table */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-blue-400" />
                  Student Progress
                </h2>
                <select 
                  value={selectedTimeframe}
                  onChange={(e) => setSelectedTimeframe(e.target.value)}
                  className="bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 text-sm"
                >
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="semester">Semester</option>
                </select>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-gray-400 text-sm">
                      <th className="text-left pb-3">Student</th>
                      <th className="text-left pb-3">Level</th>
                      <th className="text-left pb-3">Points</th>
                      <th className="text-left pb-3">Activity</th>
                      <th className="text-left pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="space-y-2">
                    {studentProgress.map((student) => (
                      <tr key={student.id} className="border-b border-gray-700 hover:bg-gray-700/30">
                        <td className="py-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="text-white font-medium">{student.name}</span>
                          </div>
                        </td>
                        <td className="py-3 text-green-400 font-semibold">{student.level}</td>
                        <td className="py-3 text-yellow-400 font-semibold">{student.points}</td>
                        <td className="py-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-20 bg-gray-700 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full"
                                style={{ width: `${student.weeklyActivity}%` }}
                              ></div>
                            </div>
                            <span className="text-gray-400 text-sm">{student.weeklyActivity}%</span>
                          </div>
                        </td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
                            {student.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Module Performance */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-green-400" />
                Module Performance
              </h2>
              <div className="space-y-4">
                {modulePerformance.map((module, index) => (
                  <div key={index} className="bg-gray-900/50 border border-gray-600 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-white font-semibold">{module.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(module.difficulty)}`}>
                          {module.difficulty}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-400 text-sm">Completion: <span className="text-green-400 font-semibold">{module.completion}%</span></p>
                        <p className="text-gray-400 text-sm">Avg Score: <span className="text-blue-400 font-semibold">{module.avgScore}%</span></p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-400">Completion Rate</span>
                          <span className="text-green-400">{module.completion}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full"
                            style={{ width: `${module.completion}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-400">Average Score</span>
                          <span className="text-blue-400">{module.avgScore}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-400 to-cyan-500 h-2 rounded-full"
                            style={{ width: `${module.avgScore}%` }}
                          ></div>
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
            {/* Alerts */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-red-400" />
                Alerts
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                  <p className="text-red-400 font-medium text-sm">Low Engagement</p>
                  <p className="text-gray-300 text-xs">Marcus Johnson hasn't completed any modules this week</p>
                </div>
                <div className="p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
                  <p className="text-yellow-400 font-medium text-sm">Deadline Approaching</p>
                  <p className="text-gray-300 text-xs">Climate Change module due in 2 days</p>
                </div>
              </div>
            </div>

            {/* Recent Achievements */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2 text-purple-400" />
                Recent Achievements
              </h3>
              <div className="space-y-3">
                {recentAchievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-900/50 rounded-lg">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">{achievement.student}</p>
                      <p className="text-gray-400 text-xs">Earned "{achievement.badge}" badge</p>
                    </div>
                    <span className="text-gray-500 text-xs">{achievement.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                  Assign New Module
                </button>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                  Create Quiz
                </button>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                  Send Message
                </button>
                <button className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                  Export Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;