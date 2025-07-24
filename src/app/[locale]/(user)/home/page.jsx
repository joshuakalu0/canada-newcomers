"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

const UserDashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [savedLocations, setSavedLocations] = useState([]);
  const [recentServices, setRecentServices] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      setIsLoading(false);
      // In a real app, fetch user data here
      fetchUserData();
    }
  }, [status, router]);

  // Fetch user data
  const fetchUserData = async () => {
    // This would be an API call in a real app
    // For now, we'll use mock data
    setTimeout(() => {
      setSavedLocations([
        {
          id: "1",
          name: "Service Canada - Toronto",
          type: "government",
          address: "25 St. Clair Ave E, Toronto, ON M4T 3A4",
        },
        {
          id: "2",
          name: "TD Bank - Downtown Branch",
          type: "bank",
          address: "55 King St W, Toronto, ON M5H 3C2",
        },
        {
          id: "3",
          name: "Toronto Eaton Centre",
          type: "shopping",
          address: "220 Yonge St, Toronto, ON M5B 2H1",
        },
      ]);

      setRecentServices([
        {
          id: "1",
          name: "Apply for SIN Number",
          category: "Government",
          url: "/services/sin-application",
          icon: "🏛️",
        },
        {
          id: "2",
          name: "Open a Bank Account",
          category: "Banking",
          url: "/services/banking",
          icon: "🏦",
        },
        {
          id: "3",
          name: "Find Housing",
          category: "Housing",
          url: "/services/housing",
          icon: "🏠",
        },
        {
          id: "4",
          name: "Public Transportation",
          category: "Transport",
          url: "/services/transportation",
          icon: "🚌",
        },
      ]);

      // Get user location for weather
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
            fetchWeatherData(
              position.coords.latitude,
              position.coords.longitude
            );
          },
          (error) => {
            console.error("Error getting location:", error);
            // Default to Toronto
            fetchWeatherData(43.6532, -79.3832);
          }
        );
      } else {
        // Default to Toronto
        fetchWeatherData(43.6532, -79.3832);
      }
    }, 1000);
  };

  // Fetch weather data
  const fetchWeatherData = async (lat, lng) => {
    // In a real app, this would be an API call to a weather service
    // For now, we'll use mock data
    setTimeout(() => {
      setWeatherData({
        location: "Toronto, ON",
        temperature: 22,
        condition: "Sunny",
        icon: "☀️",
      });
    }, 500);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
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
              Loading your dashboard...
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#D52B1E] to-[#b91c1c] text-white pt-24 pb-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 md:mb-0"
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Welcome, {session?.user?.name || "Newcomer"}!
              </h1>
              <p className="text-lg text-white/90">
                Your Canadian journey starts here. Explore resources tailored
                for you.
              </p>
            </motion.div>

            {weatherData && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center space-x-4"
              >
                <div className="text-4xl">{weatherData.icon}</div>
                <div>
                  <p className="text-sm font-medium">{weatherData.location}</p>
                  <p className="text-2xl font-bold">
                    {weatherData.temperature}°C
                  </p>
                  <p className="text-sm">{weatherData.condition}</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-grow py-8 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Quick Actions
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Link
                    href="/map"
                    className="bg-red-50 hover:bg-red-100 transition-colors p-4 rounded-lg text-center"
                  >
                    <div className="text-3xl mb-2">🗺️</div>
                    <p className="font-medium text-gray-800">Explore Map</p>
                  </Link>
                  <Link
                    href="/services"
                    className="bg-blue-50 hover:bg-blue-100 transition-colors p-4 rounded-lg text-center"
                  >
                    <div className="text-3xl mb-2">🏛️</div>
                    <p className="font-medium text-gray-800">Find Services</p>
                  </Link>
                  <Link
                    href="/saved-locations"
                    className="bg-green-50 hover:bg-green-100 transition-colors p-4 rounded-lg text-center"
                  >
                    <div className="text-3xl mb-2">⭐</div>
                    <p className="font-medium text-gray-800">Saved Places</p>
                  </Link>
                  <Link
                    href="/profile"
                    className="bg-purple-50 hover:bg-purple-100 transition-colors p-4 rounded-lg text-center"
                  >
                    <div className="text-3xl mb-2">👤</div>
                    <p className="font-medium text-gray-800">My Profile</p>
                  </Link>
                </div>
              </div>

              {/* Essential Services */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Essential Services
                  </h2>
                  <Link
                    href="/services"
                    className="text-red-600 hover:text-red-700 font-medium"
                  >
                    View All
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recentServices.map((service, index) => (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      className="border border-gray-200 rounded-lg p-4 hover:border-red-600 transition-colors"
                    >
                      <div className="flex items-start">
                        <div className="text-3xl mr-4">{service.icon}</div>
                        <div>
                          <h3 className="font-medium text-gray-800">
                            {service.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {service.category}
                          </p>
                          <Link
                            href={service.url}
                            className="text-sm text-red-600 hover:underline mt-2 inline-block"
                          >
                            Learn More →
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Recent News */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Recent News
                </h2>
                <div className="space-y-4">
                  <div className="border-l-4 border-red-600 pl-4">
                    <h3 className="font-medium text-gray-800">
                      New Immigration Pathways Announced
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">
                      The Canadian government has announced new pathways for
                      permanent residency.
                    </p>
                    <p className="text-xs text-gray-500">June 15, 2023</p>
                  </div>
                  <div className="border-l-4 border-red-600 pl-4">
                    <h3 className="font-medium text-gray-800">
                      Student Visa Processing Times Improved
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">
                      Processing times for student visas have been reduced by
                      30%.
                    </p>
                    <p className="text-xs text-gray-500">May 28, 2023</p>
                  </div>
                  <div className="border-l-4 border-red-600 pl-4">
                    <h3 className="font-medium text-gray-800">
                      Healthcare Coverage for Newcomers
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">
                      New healthcare coverage options available for recent
                      immigrants.
                    </p>
                    <p className="text-xs text-gray-500">May 12, 2023</p>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <Link
                    href="/news"
                    className="text-red-600 hover:text-red-700 font-medium"
                  >
                    View All News
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Saved Locations & Upcoming Events */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {/* Saved Locations */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800">
                    Saved Locations
                  </h2>
                  <Link
                    href="/saved-locations"
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    View All
                  </Link>
                </div>
                {savedLocations.length > 0 ? (
                  <div className="space-y-4">
                    {savedLocations.map((location) => (
                      <div
                        key={location.id}
                        className="border-b border-gray-200 pb-3 last:border-b-0"
                      >
                        <h3 className="font-medium text-gray-800">
                          {location.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {location.address}
                        </p>
                        <div className="flex mt-2">
                          <Link
                            href={`/map?location=${location.id}`}
                            className="text-xs text-red-600 hover:underline mr-4"
                          >
                            View on Map
                          </Link>
                          <button className="text-xs text-gray-500 hover:text-gray-700">
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 text-center py-4">
                    No saved locations yet. Explore the map to save your
                    favorite places.
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Call to Action */}
      <section className="bg-gray-100 py-12 px-4">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-8 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  Need Help Finding Resources?
                </h2>
                <p className="mb-6">
                  Our interactive map helps you locate essential services near
                  you. Find government offices, banks, healthcare facilities,
                  and more.
                </p>
                <Link
                  href="/map"
                  className="inline-block bg-white text-red-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                >
                  Explore the Map
                </Link>
              </div>
              <div className="hidden md:block">
                <img
                  src="/images/map-preview.jpg"
                  alt="Interactive Map Preview"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserDashboard;
