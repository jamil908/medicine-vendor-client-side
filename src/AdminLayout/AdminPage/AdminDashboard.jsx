import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import useAdmin from '../../Hooks/isAdmin/useAdmin';
import { 
  Users, 
  FolderOpen, 
  CreditCard, 
  BarChart3, 
  Home,
  Menu,
  X,
  Shield,
  ChevronRight
} from 'lucide-react';

const AdminDashboard = () => {
  const [isAdmin] = useAdmin();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    {
      path: "/admin",
      label: "Admin Chart",
      icon: Users,
      description: "Admin accounts & permissions"
    },
    {
      path: "/admin/users",
      label: "Manage Users",
      icon: Users,
      description: "User accounts & permissions"
    },
    {
      path: "/admin/categories",
      label: "Manage Categories",
      icon: FolderOpen,
      description: "Product categories & organization"
    },
    {
      path: "/admin/payments",
      label: "Payment Management",
      icon: CreditCard,
      description: "Payment processing & history"
    },
    {
      path: "/admin/salesReport",
      label: "Sales Report",
      icon: BarChart3,
      description: "Analytics & reporting"
    }
  ];

  const AdminNavLink = ({ to, icon: Icon, children, description, onClick }) => (
    <Link
      to={to}
      onClick={onClick}
      className="group flex items-center w-full px-4 py-3 mb-2 text-left text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 border border-transparent hover:border-white/20"
    >
      <Icon className="w-5 h-5 mr-3 text-blue-300 group-hover:text-white transition-colors duration-200" />
      <div className="flex-1">
        <div className="font-medium">{children}</div>
        <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-200">
          {description}
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-200" />
    </Link>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-80 lg:w-72 
        bg-gradient-to-b from-slate-800 via-slate-900 to-slate-800 
        text-white transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        shadow-2xl lg:shadow-lg
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Admin Panel</h2>
                  <p className="text-sm text-gray-300">Management Dashboard</p>
                </div>
              </div>
              <button
                className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6 overflow-y-auto">
            {isAdmin ? (
              <div className="space-y-2">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                  Administration
                </div>
                {menuItems.map((item) => (
                  <AdminNavLink
                    key={item.path}
                    to={item.path}
                    icon={item.icon}
                    description={item.description}
                    onClick={() => setSidebarOpen(false)}
                  >
                    {item.label}
                  </AdminNavLink>
                ))}
                
                <div className="border-t border-white/10 pt-4 mt-6">
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                    Navigation
                  </div>
                  <AdminNavLink
                    to="/"
                    icon={Home}
                    description="Return to main site"
                    onClick={() => setSidebarOpen(false)}
                  >
                    Back to Home
                  </AdminNavLink>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-300 mb-2">Access Denied</h3>
                <p className="text-sm text-gray-400 mb-6">
                  You don't have admin privileges to access this dashboard.
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                  onClick={() => setSidebarOpen(false)}
                >
                  <Home className="w-4 h-4 mr-2" />
                  Return Home
                </Link>
              </div>
            )}
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">A</span>
              </div>
              <div>
                <div className="text-sm font-medium text-white">Admin User</div>
                <div className="text-xs text-gray-400">System Administrator</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-4 lg:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
              <div className="ml-2 lg:ml-0">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome to the admin panel</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 px-3 py-1 bg-green-100 text-green-800 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs font-medium">Online</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-4 py-6 lg:px-6">
            {isAdmin ? (
              <div className="min-h-full">
                <Outlet />
              </div>
            ) : (
              <div className="flex items-center justify-center min-h-full">
                <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-md mx-auto">
                  <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Shield className="w-10 h-10 text-red-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Restricted</h2>
                  <p className="text-gray-600 mb-6">
                    This area is restricted to administrators only. Please contact your system administrator if you believe you should have access.
                  </p>
                  <Link
                    to="/"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
                  >
                    <Home className="w-5 h-5 mr-2" />
                    Return to Home
                  </Link>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;