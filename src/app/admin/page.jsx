"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const AdminDashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);
  const [locations, setLocations] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalServices: 0,
    totalLocations: 0,
    pendingFeedback: 0,
  });

  // Check if user is admin
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      if (session?.user?.role !== "ADMIN") {
        router.push("/home");
      } else {
        fetchAdminData();
      }
    }
  }, [status, session, router]);

  // Fetch admin data
  const fetchAdminData = async () => {
    // In a real app, this would be API calls
    // For now, we'll use mock data
    setTimeout(() => {
      // Mock users
      setUsers([
        {
          id: "1",
          name: "John Doe",
          email: "john@example.com",
          country: "India",
          language: "English",
          role: "USER",
          createdAt: "2023-05-15T10:30:00Z",
        },
        {
          id: "2",
          name: "Jane Smith",
          email: "jane@example.com",
          country: "China",
          language: "Chinese",
          role: "USER",
          createdAt: "2023-05-20T14:45:00Z",
        },
        {
          id: "3",
          name: "Admin User",
          email: "admin@example.com",
          country: "Canada",
          language: "English",
          role: "ADMIN",
          createdAt: "2023-04-10T09:15:00Z",
        },
      ]);

      // Mock services
      setServices([
        {
          id: "1",
          name: "Government Services",
          type: "government",
          description: "Official government services for newcomers",
          createdAt: "2023-04-05T08:30:00Z",
        },
        {
          id: "2",
          name: "Banking Services",
          type: "banking",
          description: "Banking and financial services",
          createdAt: "2023-04-06T10:15:00Z",
        },
        {
          id: "3",
          name: "Healthcare Services",
          type: "healthcare",
          description: "Healthcare providers and facilities",
          createdAt: "2023-04-07T11:45:00Z",
        },
      ]);

      // Mock locations
      setLocations([
        {
          id: "1",
          name: "Service Canada",
          address: "25 St. Clair Ave E, Toronto, ON M4T 3A4",
          city: "Toronto",
          province: "Ontario",
          serviceId: "1",
          serviceName: "Government Services",
        },
        {
          id: "2",
          name: "TD Bank",
          address: "55 King St W, Toronto, ON M5H 3C2",
          city: "Toronto",
          province: "Ontario",
          serviceId: "2",
          serviceName: "Banking Services",
        },
        {
          id: "3",
          name: "Toronto General Hospital",
          address: "200 Elizabeth St, Toronto, ON M5G 2C4",
          city: "Toronto",
          province: "Ontario",
          serviceId: "3",
          serviceName: "Healthcare Services",
        },
      ]);

      // Mock feedback
      setFeedback([
        {
          id: "1",
          subject: "Map Issue",
          message: "The map is not showing all locations correctly.",
          userId: "1",
          userName: "John Doe",
          createdAt: "2023-06-01T09:30:00Z",
          status: "PENDING",
        },
        {
          id: "2",
          subject: "Service Suggestion",
          message: "Could you add more educational resources?",
          userId: "2",
          userName: "Jane Smith",
          createdAt: "2023-06-02T14:15:00Z",
          status: "REVIEWED",
        },
        {
          id: "3",
          subject: "Thank You",
          message:
            "This platform has been very helpful for my transition to Canada.",
          userId: "1",
          userName: "John Doe",
          createdAt: "2023-06-03T16:45:00Z",
          status: "RESOLVED",
        },
      ]);

      // Set stats
      setStats({
        totalUsers: 3,
        totalServices: 3,
        totalLocations: 3,
        pendingFeedback: 1,
      });

      setIsLoading(false);
    }, 1000);
  };

  // Handle feedback status change
  const handleFeedbackStatusChange = (id, newStatus) => {
    setFeedback(
      feedback.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <svg
              className="w-16 h-16 text-red-600 mx-auto mb-4 animate-spin"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p className="text-gray-600 font-medium">
              Loading admin dashboard...
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      {/* Admin Header */}
      <section className="bg-gradient-to-r from-[#D52B1E] to-[#b91c1c] text-white pt-24 pb-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Admin Dashboard
              </h1>
              <p className="text-white/90">
                Manage users, services, locations, and feedback
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-sm font-medium">Users</p>
                    <p className="text-2xl font-bold">{stats.totalUsers}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Services</p>
                    <p className="text-2xl font-bold">{stats.totalServices}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Locations</p>
                    <p className="text-2xl font-bold">{stats.totalLocations}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Pending Feedback</p>
                    <p className="text-2xl font-bold">
                      {stats.pendingFeedback}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Admin Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`py-4 px-6 font-medium border-b-2 transition-colors ${
                activeTab === "dashboard"
                  ? "border-red-600 text-red-600"
                  : "border-transparent text-gray-600 hover:text-red-600"
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`py-4 px-6 font-medium border-b-2 transition-colors ${
                activeTab === "users"
                  ? "border-red-600 text-red-600"
                  : "border-transparent text-gray-600 hover:text-red-600"
              }`}
            >
              Users
            </button>
            <button
              onClick={() => setActiveTab("services")}
              className={`py-4 px-6 font-medium border-b-2 transition-colors ${
                activeTab === "services"
                  ? "border-red-600 text-red-600"
                  : "border-transparent text-gray-600 hover:text-red-600"
              }`}
            >
              Services
            </button>
            <button
              onClick={() => setActiveTab("locations")}
              className={`py-4 px-6 font-medium border-b-2 transition-colors ${
                activeTab === "locations"
                  ? "border-red-600 text-red-600"
                  : "border-transparent text-gray-600 hover:text-red-600"
              }`}
            >
              Locations
            </button>
            <button
              onClick={() => setActiveTab("feedback")}
              className={`py-4 px-6 font-medium border-b-2 transition-colors ${
                activeTab === "feedback"
                  ? "border-red-600 text-red-600"
                  : "border-transparent text-gray-600 hover:text-red-600"
              }`}
            >
              Feedback
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow py-8 px-4">
        <div className="container mx-auto">
          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Recent Users */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">
                      Recent Users
                    </h2>
                    <button
                      onClick={() => setActiveTab("users")}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      View All
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="py-2 text-left text-sm font-medium text-gray-500">
                            Name
                          </th>
                          <th className="py-2 text-left text-sm font-medium text-gray-500">
                            Email
                          </th>
                          <th className="py-2 text-left text-sm font-medium text-gray-500">
                            Country
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.slice(0, 3).map((user) => (
                          <tr
                            key={user.id}
                            className="border-b border-gray-200"
                          >
                            <td className="py-3 text-sm text-gray-800">
                              {user.name}
                            </td>
                            <td className="py-3 text-sm text-gray-800">
                              {user.email}
                            </td>
                            <td className="py-3 text-sm text-gray-800">
                              {user.country}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Recent Feedback */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">
                      Recent Feedback
                    </h2>
                    <button
                      onClick={() => setActiveTab("feedback")}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      View All
                    </button>
                  </div>
                  <div className="space-y-4">
                    {feedback.slice(0, 3).map((item) => (
                      <div
                        key={item.id}
                        className="border-b border-gray-200 pb-4 last:border-b-0"
                      >
                        <div className="flex justify-between">
                          <h3 className="font-medium text-gray-800">
                            {item.subject}
                          </h3>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              item.status === "PENDING"
                                ? "bg-yellow-100 text-yellow-800"
                                : item.status === "REVIEWED"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {item.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          From: {item.userName} •{" "}
                          {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Quick Actions
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button
                      onClick={() => setActiveTab("users")}
                      className="bg-red-50 hover:bg-red-100 transition-colors p-4 rounded-lg text-center"
                    >
                      <svg
                        className="w-8 h-8 text-red-600 mx-auto mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                      <p className="font-medium text-gray-800">Add User</p>
                    </button>
                    <button
                      onClick={() => setActiveTab("services")}
                      className="bg-blue-50 hover:bg-blue-100 transition-colors p-4 rounded-lg text-center"
                    >
                      <svg
                        className="w-8 h-8 text-blue-600 mx-auto mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="font-medium text-gray-800">Add Service</p>
                    </button>
                    <button
                      onClick={() => setActiveTab("locations")}
                      className="bg-green-50 hover:bg-green-100 transition-colors p-4 rounded-lg text-center"
                    >
                      <svg
                        className="w-8 h-8 text-green-600 mx-auto mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <p className="font-medium text-gray-800">Add Location</p>
                    </button>
                    <button
                      onClick={() => setActiveTab("feedback")}
                      className="bg-purple-50 hover:bg-purple-100 transition-colors p-4 rounded-lg text-center"
                    >
                      <svg
                        className="w-8 h-8 text-purple-600 mx-auto mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                        />
                      </svg>
                      <p className="font-medium text-gray-800">
                        Review Feedback
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Users</h2>
                  <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    Add User
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">
                          Name
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">
                          Email
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">
                          Country
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">
                          Language
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">
                          Role
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">
                          Created
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-b border-gray-200">
                          <td className="py-3 px-4 text-sm text-gray-800">
                            {user.name}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-800">
                            {user.email}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-800">
                            {user.country || "-"}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-800">
                            {user.language || "-"}
                          </td>
                          <td className="py-3 px-4 text-sm">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                user.role === "ADMIN"
                                  ? "bg-purple-100 text-purple-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {user.role}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-800">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4 text-sm">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-800">
                                <svg
                                  className="w-5 h-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                  />
                                </svg>
                              </button>
                              <button className="text-red-600 hover:text-red-800">
                                <svg
                                  className="w-5 h-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Services Tab */}
          {activeTab === "services" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Services</h2>
                  <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    Add Service
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">
                          Name
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">
                          Type
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">
                          Description
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">
                          Created
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {services.map((service) => (
                        <tr
                          key={service.id}
                          className="border-b border-gray-200"
                        >
                          <td className="py-3 px-4 text-sm text-gray-800">
                            {service.name}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-800">
                            <span className="capitalize">{service.type}</span>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-800">
                            {service.description}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-800">
                            {new Date(service.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4 text-sm">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-800">
                                <svg
                                  className="w-5 h-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                  />
                                </svg>
                              </button>
                              <button className="text-red-600 hover:text-red-800">
                                <svg
                                  className="w-5 h-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Locations Tab */}
          {activeTab === "locations" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Locations
                  </h2>
                  <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    Add Location
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">
                          Name
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">
                          Address
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">
                          City
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">
                          Province
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">
                          Service
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {locations.map((location) => (
                        <tr
                          key={location.id}
                          className="border-b border-gray-200"
                        >
                          <td className="py-3 px-4 text-sm text-gray-800">
                            {location.name}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-800">
                            {location.address}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-800">
                            {location.city}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-800">
                            {location.province}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-800">
                            {location.serviceName}
                          </td>
                          <td className="py-3 px-4 text-sm">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-800">
                                <svg
                                  className="w-5 h-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                  />
                                </svg>
                              </button>
                              <button className="text-red-600 hover:text-red-800">
                                <svg
                                  className="w-5 h-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Feedback Tab */}
          {activeTab === "feedback" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    User Feedback
                  </h2>
                  <div className="flex space-x-2">
                    <button className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                      Pending:{" "}
                      {feedback.filter((f) => f.status === "PENDING").length}
                    </button>
                    <button className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      Reviewed:{" "}
                      {feedback.filter((f) => f.status === "REVIEWED").length}
                    </button>
                    <button className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      Resolved:{" "}
                      {feedback.filter((f) => f.status === "RESOLVED").length}
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  {feedback.map((item) => (
                    <div
                      key={item.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-red-600 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-800 text-lg">
                            {item.subject}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {item.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-2">
                            From: {item.userName} •{" "}
                            {new Date(item.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            item.status === "PENDING"
                              ? "bg-yellow-100 text-yellow-800"
                              : item.status === "REVIEWED"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <div className="mt-4 flex justify-end space-x-2">
                        {item.status === "PENDING" && (
                          <button
                            onClick={() =>
                              handleFeedbackStatusChange(item.id, "REVIEWED")
                            }
                            className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition-colors"
                          >
                            Mark as Reviewed
                          </button>
                        )}
                        {(item.status === "PENDING" ||
                          item.status === "REVIEWED") && (
                          <button
                            onClick={() =>
                              handleFeedbackStatusChange(item.id, "RESOLVED")
                            }
                            className="bg-green-600 text-white px-3 py-1 rounded-md text-sm hover:bg-green-700 transition-colors"
                          >
                            Mark as Resolved
                          </button>
                        )}
                        <button className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md text-sm hover:bg-gray-300 transition-colors">
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
