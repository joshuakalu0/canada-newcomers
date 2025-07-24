"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const UserDashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [savedLocations, setSavedLocations] = useState([]);
  const [recentServices, setRecentServices] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const t = useTranslations("dashboard");
  const { locale } = useParams();

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
                {t("hero_title", {
                  name: session?.user?.name || t("hero_title_default"),
                })}
              </h1>
              <p className="text-lg text-white/90">{t("hero_description")}</p>
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
                  {t("quick_actions_title")}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Link
                    href={`${locale}/map`}
                    className="bg-red-50 hover:bg-red-100 transition-colors p-4 rounded-lg text-center"
                  >
                    <div className="text-3xl mb-2">🗺️</div>
                    <p className="font-medium text-gray-800">
                      {t("quick_action_map")}
                    </p>
                  </Link>
                  <Link
                    href={`${locale}/services`}
                    className="bg-blue-50 hover:bg-blue-100 transition-colors p-4 rounded-lg text-center"
                  >
                    <div className="text-3xl mb-2">🏛️</div>
                    <p className="font-medium text-gray-800">
                      {t("quick_action_services")}
                    </p>
                  </Link>
                  <Link
                    href={`${locale}/saved-locations`}
                    className="bg-green-50 hover:bg-green-100 transition-colors p-4 rounded-lg text-center"
                  >
                    <div className="text-3xl mb-2">⭐</div>
                    <p className="font-medium text-gray-800">
                      {t("quick_action_saved_places")}
                    </p>
                  </Link>
                  <Link
                    href={`${locale}/profile`}
                    className="bg-purple-50 hover:bg-purple-100 transition-colors p-4 rounded-lg text-center"
                  >
                    <div className="text-3xl mb-2">👤</div>
                    <p className="font-medium text-gray-800">
                      {t("quick_action_profile")}
                    </p>
                  </Link>
                </div>
              </div>

              {/* Essential Services */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {t("essential_services_title")}
                  </h2>
                  <Link
                    href={`${locale}/services`}
                    className="text-red-600 hover:text-red-700 font-medium"
                  >
                    {t("essential_services_view_all")}
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
                            {t("essential_services_learn_more")}
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
                  {t("recent_news_title")}
                </h2>
                <div className="space-y-4">
                  <div className="border-l-4 border-red-600 pl-4">
                    <h3 className="font-medium text-gray-800">
                      {t("news_item_1_title")}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">
                      {t("news_item_1_description")}
                    </p>
                    <p className="text-xs text-gray-500">
                      {t("news_item_1_date")}
                    </p>
                  </div>
                  <div className="border-l-4 border-red-600 pl-4">
                    <h3 className="font-medium text-gray-800">
                      {t("news_item_2_title")}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">
                      {t("news_item_2_description")}
                    </p>
                    <p className="text-xs text-gray-500">
                      {t("news_item_2_date")}
                    </p>
                  </div>
                  <div className="border-l-4 border-red-600 pl-4">
                    <h3 className="font-medium text-gray-800">
                      {t("news_item_3_title")}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">
                      {t("news_item_3_description")}
                    </p>
                    <p className="text-xs text-gray-500">
                      {t("news_item_3_date")}
                    </p>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <Link
                    href={`${locale}/news`}
                    className="text-red-600 hover:text-red-700 font-medium"
                  >
                    {t("recent_news_view_all")}
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
                    {t("saved_locations_title")}
                  </h2>
                  <Link
                    href={`${locale}/saved-locations`}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    {t("saved_locations_view_all")}
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
                            {t("saved_locations_view_on_map")}
                          </Link>
                          <button className="text-xs text-gray-500 hover:text-gray-700">
                            {t("saved_locations_remove")}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 text-center py-4">
                    {t("saved_locations_empty")}
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
                <h2 className="text-2xl font-bold mb-4">{t("cta_title")}</h2>
                <p className="mb-6">{t("cta_description")}</p>
                <Link
                  href={`${locale}/map`}
                  className="inline-block bg-white text-red-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                >
                  {t("cta_button")}
                </Link>
              </div>
              <div className="hidden md:block">
                <img
                  src="/images/map-preview.jpg"
                  alt={t("cta_image_alt")}
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
