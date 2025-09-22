import React from 'react';
import { User, Bell, Settings, LogOut, Trophy } from 'lucide-react';

interface HeaderProps {
  user: any;
  onLogout: () => void;
  currentPoints?: number;
  currentLevel?: number;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, currentPoints = 0, currentLevel = 1 }) => {
  return (
    <header className="bg-black/90 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-sm">E</span>
              </div>
              <h1 className="text-xl font-bold text-white">EcoLearn</h1>
            </div>
            
            {user?.role === 'student' && (
              <div className="hidden md:flex items-center space-x-4 ml-8">
                <div className="flex items-center space-x-2 bg-gray-800/50 px-3 py-1.5 rounded-full">
                  <Trophy className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-400 font-semibold">{currentPoints}</span>
                  <span className="text-gray-400 text-sm">pts</span>
                </div>
                <div className="flex items-center space-x-2 bg-gray-800/50 px-3 py-1.5 rounded-full">
                  <span className="text-green-400 font-semibold">Level {currentLevel}</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="hidden sm:block text-right">
                <p className="text-white font-medium">{user?.name}</p>
                <p className="text-gray-400 text-sm capitalize">{user?.role}</p>
              </div>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <button 
                onClick={onLogout}
                className="p-2 text-gray-400 hover:text-red-400 transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;