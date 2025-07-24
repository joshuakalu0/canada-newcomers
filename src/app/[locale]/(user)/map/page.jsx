"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import MapComponent from "../../../../components/MapComponent";
import { useTranslations } from "next-intl";
import { Link } from "next/link";

const MapPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showSidebar, setShowSidebar] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState({});
  const [savedLocations, setSavedLocations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredServices, setFilteredServices] = useState({});
  const t = useTranslations("map");
  const { locale } = useParams();

  // Check authentication
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      fetchServices();
      fetchSavedLocations();
    }
  }, [status, router]);

  // Fetch services data
  const fetchServices = async () => {
    // In a real app, this would be an API call
    // For now, we'll use mock data
    setTimeout(() => {
      const mockServices = {
        government: [
          {
            id: "gov1",
            name: "Service Canada",
            lat: 43.6532,
            lng: -79.3832,
            url: "https://www.canada.ca/en/employment-social-development/corporate/portfolio/service-canada.html",
            type: "government",
            city: "Toronto, ON",
            address: "25 St. Clair Ave E, Toronto, ON M4T 3A4",
            phone: "1-800-622-6232",
          },
          {
            id: "gov2",
            name: "Service Ontario",
            lat: 43.648,
            lng: -79.3849,
            url: "https://www.ontario.ca/page/serviceontario",
            type: "government",
            city: "Toronto, ON",
            address: "777 Bay St, Toronto, ON M5G 2C8",
            phone: "1-800-267-8097",
          },
          {
            id: "gov3",
            name: "Immigration, Refugees and Citizenship Canada",
            lat: 43.6426,
            lng: -79.3871,
            url: "https://www.canada.ca/en/immigration-refugees-citizenship.html",
            type: "government",
            city: "Toronto, ON",
            address: "5343 Dundas St W #400, Toronto, ON M9B 6K5",
            phone: "1-888-242-2100",
          },
        ],
        banks: [
          {
            id: "bank1",
            name: "TD Bank",
            lat: 43.6426,
            lng: -79.3871,
            url: "https://www.td.com",
            type: "bank",
            city: "Toronto, ON",
            address: "55 King St W, Toronto, ON M5H 3C2",
            phone: "1-866-222-3456",
          },
          {
            id: "bank2",
            name: "RBC Royal Bank",
            lat: 43.648,
            lng: -79.3849,
            url: "https://www.rbcroyalbank.com",
            type: "bank",
            city: "Toronto, ON",
            address: "200 Bay St, Toronto, ON M5J 2J5",
            phone: "1-800-769-2511",
          },
          {
            id: "bank3",
            name: "Scotiabank",
            lat: 43.6505,
            lng: -79.3822,
            url: "https://www.scotiabank.com",
            type: "bank",
            city: "Toronto, ON",
            address: "44 King St W, Toronto, ON M5H 1H1",
            phone: "1-800-472-6842",
          },
        ],
        shopping: [
          {
            id: "shop1",
            name: "Toronto Eaton Centre",
            lat: 43.6544,
            lng: -79.3807,
            url: "https://www.cfshops.com/toronto-eaton-centre.html",
            type: "shopping",
            city: "Toronto, ON",
            address: "220 Yonge St, Toronto, ON M5B 2H1",
            phone: "416-598-8560",
          },
          {
            id: "shop2",
            name: "Yorkdale Shopping Centre",
            lat: 43.7246,
            lng: -79.4521,
            url: "https://yorkdale.com",
            type: "shopping",
            city: "Toronto, ON",
            address: "3401 Dufferin St, Toronto, ON M6A 2T9",
            phone: "416-789-3261",
          },
        ],
        groceries: [
          {
            id: "groc1",
            name: "Loblaws",
            lat: 43.6488,
            lng: -79.385,
            url: "https://www.loblaws.ca",
            type: "grocery",
            city: "Toronto, ON",
            address: "60 Carlton St, Toronto, ON M5B 1L1",
            phone: "416-979-8210",
          },
          {
            id: "groc2",
            name: "Metro",
            lat: 43.6475,
            lng: -79.3825,
            url: "https://www.metro.ca",
            type: "grocery",
            city: "Toronto, ON",
            address: "444 Yonge St, Toronto, ON M5B 2H4",
            phone: "416-598-8778",
          },
        ],
        transport: [
          {
            id: "trans1",
            name: "Union Station",
            lat: 43.6453,
            lng: -79.3806,
            url: "https://www.torontounion.ca",
            type: "transport",
            city: "Toronto, ON",
            address: "65 Front St W, Toronto, ON M5J 1E6",
            phone: "416-366-7788",
          },
          {
            id: "trans2",
            name: "Toronto Pearson Airport",
            lat: 43.6777,
            lng: -79.6248,
            url: "https://www.torontopearson.com",
            type: "transport",
            city: "Mississauga, ON",
            address: "6301 Silver Dart Dr, Mississauga, ON L5P 1B2",
            phone: "416-247-7678",
          },
        ],
        telecom: [
          {
            id: "tel1",
            name: "Rogers",
            lat: 43.648,
            lng: -79.385,
            url: "https://www.rogers.com",
            type: "telecom",
            city: "Toronto, ON",
            address: "333 Bloor St E, Toronto, ON M4W 1G9",
            phone: "1-888-764-3771",
          },
          {
            id: "tel2",
            name: "Bell",
            lat: 43.647,
            lng: -79.383,
            url: "https://www.bell.ca",
            type: "telecom",
            city: "Toronto, ON",
            address: "2 Queen St E, Toronto, ON M5C 3G7",
            phone: "1-800-668-6878",
          },
        ],
        healthcare: [
          {
            id: "health1",
            name: "Toronto General Hospital",
            lat: 43.6591,
            lng: -79.3872,
            url: "https://www.uhn.ca/OurHospitals/TGH",
            type: "healthcare",
            city: "Toronto, ON",
            address: "200 Elizabeth St, Toronto, ON M5G 2C4",
            phone: "416-340-3111",
          },
          {
            id: "health2",
            name: "St. Michael's Hospital",
            lat: 43.6532,
            lng: -79.3765,
            url: "https://www.stmichaelshospital.com",
            type: "healthcare",
            city: "Toronto, ON",
            address: "30 Bond St, Toronto, ON M5B 1W8",
            phone: "416-360-4000",
          },
        ],
        education: [
          {
            id: "edu1",
            name: "University of Toronto",
            lat: 43.6629,
            lng: -79.3957,
            url: "https://www.utoronto.ca",
            type: "education",
            city: "Toronto, ON",
            address: "27 King's College Cir, Toronto, ON M5S 1A1",
            phone: "416-978-2011",
          },
          {
            id: "edu2",
            name: "Ryerson University",
            lat: 43.6577,
            lng: -79.3788,
            url: "https://www.ryerson.ca",
            type: "education",
            city: "Toronto, ON",
            address: "350 Victoria St, Toronto, ON M5B 2K3",
            phone: "416-979-5000",
          },
        ],
      };

      setServices(mockServices);
      setFilteredServices(mockServices);
      setIsLoading(false);
    }, 1000);
  };

  // Fetch saved locations
  const fetchSavedLocations = async () => {
    // In a real app, this would be an API call
    // For now, we'll use mock data
    setTimeout(() => {
      setSavedLocations([
        {
          id: "gov1",
          name: "Service Canada",
          lat: 43.6532,
          lng: -79.3832,
          type: "government",
        },
        {
          id: "bank1",
          name: "TD Bank",
          lat: 43.6426,
          lng: -79.3871,
          type: "bank",
        },
      ]);
    }, 1000);
  };

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Handle search
  useEffect(() => {
    if (Object.keys(services).length === 0) return;

    if (searchQuery.trim() === "") {
      setFilteredServices(services);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = {};

    Object.keys(services).forEach((category) => {
      filtered[category] = services[category].filter(
        (service) =>
          service.name.toLowerCase().includes(query) ||
          service.city?.toLowerCase().includes(query) ||
          service.address?.toLowerCase().includes(query)
      );
    });

    setFilteredServices(filtered);
  }, [searchQuery, services]);

  // Handle save location
  const handleSaveLocation = (location) => {
    // In a real app, this would be an API call
    // For now, we'll just update the state
    const isAlreadySaved = savedLocations.some(
      (saved) => saved.id === location.id
    );

    if (isAlreadySaved) {
      setSavedLocations(
        savedLocations.filter((saved) => saved.id !== location.id)
      );
    } else {
      setSavedLocations([...savedLocations, location]);
    }
  };

  // Check if a location is saved
  const isLocationSaved = (locationId) => {
    return savedLocations.some((location) => location.id === locationId);
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
              Loading map and services...
            </p>
          </div>
        </main>
      </div>
    );
  }

  // Service categories
  const categories = [
    { key: "all", label: t("category_all"), icon: "🔍" },
    { key: "government", label: t("category_government"), icon: "🏛️" },
    { key: "banks", label: t("category_banks"), icon: "🏦" },
    { key: "shopping", label: t("category_shopping"), icon: "🛍️" },
    { key: "groceries", label: t("category_groceries"), icon: "🛒" },
    { key: "transport", label: t("category_transport"), icon: "🚌" },
    { key: "telecom", label: t("category_telecom"), icon: "📱" },
    { key: "healthcare", label: t("category_healthcare"), icon: "🏥" },
    { key: "education", label: t("category_education"), icon: "🎓" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Main Content */}
      <main className="flex-grow pt-16">
        {/* Map Header */}
        <section className="bg-gradient-to-r from-[#D52B1E] to-[#b91c1c] text-white py-8 px-4">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h1 className="text-3xl font-bold mb-2">{t("hero_title")}</h1>
                <p className="text-white/90">{t("hero_description")}</p>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowSidebar(!showSidebar)}
                  className="bg-white text-red-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center"
                >
                  {showSidebar ? (
                    <>
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      {t("filter_button_hide")}
                    </>
                  ) : (
                    <>
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
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                      {t("filter_button_show")}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Map Container */}
        <div className="relative min-h-[calc(100vh-16rem)]">
          {/* Sidebar */}
          {showSidebar && (
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute left-0 top-0 w-72 h-full bg-white shadow-lg z-10 overflow-y-auto"
            >
              <div className="p-4">
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-gray-800 mb-2">
                    {t("search_title")}
                  </h2>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder={t("search_placeholder")}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600"
                    />
                    <svg
                      className="absolute right-3 top-2.5 w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="text-lg font-bold text-gray-800 mb-2">
                    {t("categories_title")}
                  </h2>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.key}
                        onClick={() => handleCategoryChange(category.key)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center ${
                          selectedCategory === category.key
                            ? "bg-red-100 text-red-600"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        <span className="mr-2">{category.icon}</span>
                        {category.label}
                        <span className="ml-auto text-xs text-gray-500">
                          {category.key === "all"
                            ? Object.values(filteredServices).flat().length
                            : filteredServices[category.key]?.length || 0}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="text-lg font-bold text-gray-800 mb-2">
                    {t("saved_locations_title")}
                  </h2>
                  {savedLocations.length > 0 ? (
                    <div className="space-y-3">
                      {savedLocations.map((location) => (
                        <div
                          key={location.id}
                          className="p-3 border border-gray-200 rounded-lg hover:border-red-600 transition-colors"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-gray-800">
                                {location.name}
                              </h3>
                              <p className="text-xs text-gray-600">
                                {location.type}
                              </p>
                            </div>
                            <button
                              onClick={() => handleSaveLocation(location)}
                              className="text-red-600 hover:text-red-700"
                              aria-label={t(
                                "saved_locations_remove_aria_label"
                              )}
                            >
                              <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600 text-sm">
                      {t("saved_locations_empty")}
                    </p>
                  )}
                </div>

                <div>
                  <h2 className="text-lg font-bold text-gray-800 mb-2">
                    {t("legend_title")}
                  </h2>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-600 rounded-full mr-2"></div>
                      <span>{t("legend_government")}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-600 rounded-full mr-2"></div>
                      <span>{t("legend_banks")}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-purple-600 rounded-full mr-2"></div>
                      <span>{t("legend_shopping")}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-yellow-600 rounded-full mr-2"></div>
                      <span>{t("legend_groceries")}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
                      <span>{t("legend_transport")}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-teal-600 rounded-full mr-2"></div>
                      <span>{t("legend_telecom")}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-pink-600 rounded-full mr-2"></div>
                      <span>{t("legend_healthcare")}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-indigo-600 rounded-full mr-2"></div>
                      <span>{t("legend_education")}</span>
                    </div>
                    <div className="flex items-center mt-2 pt-2 border-t border-gray-200">
                      <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white mr-2"></div>
                      <span>{t("legend_your_location")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Map */}
          <div
            className={`${
              showSidebar ? "ml-0 md:ml-72" : "ml-0"
            } transition-all duration-300 h-[calc(100vh-16rem)]`}
          >
            <MapComponent
              services={filteredServices}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              savedLocations={savedLocations}
              onSaveLocation={handleSaveLocation}
              isLocationSaved={isLocationSaved}
            />
          </div>
        </div>

        {/* Call to Action */}
        <section className="bg-gray-100 py-8 px-4">
          <div className="container mx-auto">
            <div className="bg-white border-2 border-red-600 rounded-lg p-6 shadow-md">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {t("cta_title")}
                  </h2>
                  <p className="text-gray-600">{t("cta_description")}</p>
                </div>
                <div className="flex space-x-4">
                  <Link
                    href={`${locale}/contact_us`}
                    className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    {t("cta_contact_button")}
                  </Link>
                  <Link
                    href={`${locale}/services`}
                    className="bg-white border-2 border-red-600 text-red-600 px-6 py-3 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    {t("cta_services_button")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MapPage;
