import React, { useState } from 'react';
import { Star, Book, Search, Plus, BarChart3, User, Home, BookOpen, Calendar, Clock } from 'lucide-react';

const BookTrackerMockups = () => {
  const [currentScreen, setCurrentScreen] = useState('dashboard');

  const mockBooks = [
    { 
      id: 1, 
      title: "The Midnight Library", 
      author: "Matt Haig", 
      progress: 75, 
      totalPages: 320,
      currentPage: 240,
      rating: 0,
      status: "reading"
    },
    { 
      id: 2, 
      title: "Atomic Habits", 
      author: "James Clear", 
      progress: 100, 
      totalPages: 320,
      currentPage: 320,
      rating: 5,
      status: "completed"
    },
    { 
      id: 3, 
      title: "Dune", 
      author: "Frank Herbert", 
      progress: 0, 
      totalPages: 688,
      currentPage: 0,
      rating: 0,
      status: "want_to_read"
    }
  ];

  const renderStars = (rating, size = 16) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star 
        key={index} 
        size={size} 
        className={index < rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'} 
      />
    ));
  };

  const renderProgressBar = (progress) => (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div 
        className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
        style={{ width: `${progress}%` }}
      />
    </div>
  );

  const DashboardScreen = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 rounded-t-lg">
        <h1 className="text-xl font-bold">Reading Dashboard</h1>
        <p className="text-blue-100 text-sm">Track your reading journey</p>
      </div>
      
      {/* Stats Cards */}
      <div className="p-4 grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 text-green-600 mb-1">
            <BookOpen size={20} />
            <span className="font-medium">Currently Reading</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">1</p>
        </div>
        
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 text-blue-600 mb-1">
            <Book size={20} />
            <span className="font-medium">Books Completed</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">12</p>
        </div>
      </div>

      {/* Currently Reading Section */}
      <div className="px-4 mb-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Currently Reading</h2>
        {mockBooks.filter(book => book.status === 'reading').map(book => (
          <div key={book.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{book.title}</h3>
                <p className="text-sm text-gray-600">{book.author}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-blue-600">{book.progress}%</p>
                <p className="text-xs text-gray-500">{book.currentPage}/{book.totalPages} pages</p>
              </div>
            </div>
            {renderProgressBar(book.progress)}
            <div className="flex justify-between items-center mt-3">
              <div className="flex items-center gap-1">
                <Clock size={14} className="text-gray-400" />
                <span className="text-xs text-gray-500">Est. 2 hours left</span>
              </div>
              <button className="bg-blue-500 text-white px-3 py-1 rounded text-xs font-medium">
                Update Progress
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="px-4 flex-1">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Recent Activity</h2>
        <div className="space-y-2">
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <Book size={16} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">Finished "Atomic Habits"</p>
              <p className="text-xs text-gray-500">2 days ago</p>
            </div>
            <div className="flex">{renderStars(5, 14)}</div>
          </div>
        </div>
      </div>
    </div>
  );

  const BookListScreen = () => (
    <div className="flex flex-col h-full">
      {/* Header with Search */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-xl font-bold text-gray-800 flex-1">My Books</h1>
          <button className="bg-blue-500 text-white p-2 rounded-full">
            <Plus size={20} />
          </button>
        </div>
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search books..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex bg-white border-b border-gray-200">
        {['All', 'Reading', 'Completed', 'Want to Read'].map((tab, index) => (
          <button 
            key={tab}
            className={`flex-1 py-3 px-4 text-sm font-medium ${
              index === 0 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Books List */}
      <div className="flex-1 overflow-y-auto">
        {mockBooks.map(book => (
          <div key={book.id} className="border-b border-gray-100 p-4">
            <div className="flex gap-3">
              <div className="w-16 h-20 bg-gray-200 rounded flex items-center justify-center">
                <Book size={24} className="text-gray-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-1">{book.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{book.author}</p>
                
                {book.status === 'reading' && (
                  <div className="mb-2">
                    {renderProgressBar(book.progress)}
                    <p className="text-xs text-gray-500 mt-1">{book.currentPage}/{book.totalPages} pages</p>
                  </div>
                )}
                
                {book.status === 'completed' && (
                  <div className="flex items-center gap-2">
                    <div className="flex">{renderStars(book.rating, 14)}</div>
                    <span className="text-xs text-gray-500">Completed</span>
                  </div>
                )}

                {book.status === 'want_to_read' && (
                  <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                    Want to Read
                  </span>
                )}
              </div>
              
              <div className="flex flex-col gap-2">
                <button className="text-blue-500 text-xs">Edit</button>
                {book.status === 'reading' && (
                  <button className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                    Mark Complete
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const AddBookScreen = () => (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <h1 className="text-xl font-bold text-gray-800">Add New Book</h1>
        <p className="text-sm text-gray-600">Track a new book in your collection</p>
      </div>

      <div className="flex-1 p-4 space-y-4">
        {/* Manual Entry Card */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <h2 className="font-semibold text-gray-800 mb-3">Manual Entry</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Book Title</label>
              <input 
                type="text" 
                placeholder="Enter book title"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
              <input 
                type="text" 
                placeholder="Enter author name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pages</label>
                <input 
                  type="number" 
                  placeholder="320"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Fiction</option>
                  <option>Non-fiction</option>
                  <option>Biography</option>
                  <option>Self-help</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Want to Read</option>
                <option>Currently Reading</option>
                <option>Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Scan ISBN Card */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <h2 className="font-semibold text-gray-800 mb-3">Scan ISBN</h2>
          <button className="w-full bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg p-6 text-center hover:bg-blue-100 transition-colors">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <Search size={24} className="text-white" />
              </div>
              <p className="font-medium text-blue-600">Scan Book Barcode</p>
              <p className="text-sm text-gray-500">Automatically fill book details</p>
            </div>
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 bg-white border-t border-gray-200 space-y-3">
        <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors">
          Add Book
        </button>
        <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
          Cancel
        </button>
      </div>
    </div>
  );

  const StatisticsScreen = () => (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <h1 className="text-xl font-bold text-gray-800">Reading Statistics</h1>
        <p className="text-sm text-gray-600">Track your reading progress and habits</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Overview Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 text-blue-600 mb-2">
              <Book size={20} />
              <span className="text-sm font-medium">This Year</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">12</p>
            <p className="text-xs text-gray-500">of 15 goal</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 text-green-600 mb-2">
              <Calendar size={20} />
              <span className="text-sm font-medium">This Month</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">3</p>
            <p className="text-xs text-gray-500">books completed</p>
          </div>
        </div>

        {/* Reading Goal Progress */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-3">2024 Reading Goal</h3>
          <div className="mb-2">
            {renderProgressBar(80)}
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">12 of 15 books</span>
            <span className="text-blue-600 font-medium">80% complete</span>
          </div>
        </div>

        {/* Reading Streak */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-3">Reading Streak</h3>
          <div className="text-center">
            <p className="text-3xl font-bold text-orange-500 mb-1">7</p>
            <p className="text-sm text-gray-600">days in a row</p>
            <p className="text-xs text-gray-500 mt-2">Keep it up! Your longest streak: 14 days</p>
          </div>
        </div>

        {/* Favorite Genres */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-3">Favorite Genres</h3>
          <div className="space-y-3">
            {[
              { genre: 'Fiction', count: 5, percentage: 42 },
              { genre: 'Self-help', count: 3, percentage: 25 },
              { genre: 'Biography', count: 2, percentage: 17 },
              { genre: 'Science', count: 2, percentage: 16 }
            ].map(item => (
              <div key={item.genre} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{item.genre}</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 w-8 text-right">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const BottomNavigation = () => (
    <div className="bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around">
        {[
          { id: 'dashboard', icon: Home, label: 'Dashboard' },
          { id: 'books', icon: Book, label: 'My Books' },
          { id: 'add', icon: Plus, label: 'Add Book' },
          { id: 'stats', icon: BarChart3, label: 'Statistics' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentScreen(item.id)}
            className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${
              currentScreen === item.id 
                ? 'text-blue-600 bg-blue-50' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <item.icon size={20} />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'dashboard': return <DashboardScreen />;
      case 'books': return <BookListScreen />;
      case 'add': return <AddBookScreen />;
      case 'stats': return <StatisticsScreen />;
      default: return <DashboardScreen />;
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-gray-100 min-h-screen flex flex-col">
      {/* Status Bar Simulation */}
      <div className="bg-black text-white text-xs p-1 text-center">
        9:41 AM • Book Tracker App Mockup
      </div>
      
      {/* Main Content */}
      <div className="flex-1 bg-white overflow-hidden">
        {renderCurrentScreen()}
      </div>
      
      {/* Bottom Navigation */}
      <BottomNavigation />
      
      {/* Technical Implementation Notes */}
      <div className="bg-gray-800 text-white p-4 text-xs">
        <h4 className="font-semibold mb-2">Jetpack Compose Implementation Notes:</h4>
        <ul className="space-y-1 text-gray-300">
          <li>• LazyColumn for book lists with efficient scrolling</li>
          <li>• Material 3 components (Card, Button, TextField)</li>
          <li>• Bottom navigation using NavigationBar</li>
          <li>• State management with remember and mutableStateOf</li>
          <li>• Custom progress bars using Canvas or LinearProgressIndicator</li>
        </ul>
      </div>
    </div>
  );
};

export default BookTrackerMockups;