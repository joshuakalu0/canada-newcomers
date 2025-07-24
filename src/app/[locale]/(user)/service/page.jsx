"use client";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const ServicesPage = () => {
  const mapRef = useRef(null);
  const maptilerMap = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredServices, setFilteredServices] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);
  const t = useTranslations("services");

  // Comprehensive list of services and locations with real coordinates and descriptions
  const services = {
    government: [
      {
        name: "Service Canada",
        lat: 43.6532,
        lng: -79.3832,
        url: "https://www.canada.ca ",
        type: "government",
        city: "Toronto, ON",
        description:
          "Federal government services including immigration, tax, and employment information",
      },
      {
        name: "Service Ontario",
        lat: 43.648,
        lng: -79.3849,
        url: "https://www.ontario.ca ",
        type: "government",
        city: "Toronto, ON",
        description:
          "Provincial government services including healthcare, education, and driver licensing",
      },
    ],
    banks: [
      {
        name: "TD Bank",
        lat: 43.6426,
        lng: -79.3871,
        url: "https://www.td.com ",
        type: "bank",
        city: "Toronto, ON",
        description:
          "Major Canadian bank offering services for newcomers including no-fee chequing accounts",
      },
      {
        name: "RBC",
        lat: 43.648,
        lng: -79.3849,
        url: "https://www.rbcroyalbank.com ",
        type: "bank",
        city: "Toronto, ON",
        description:
          "Royal Bank of Canada offers specialized newcomer banking packages and international money transfers",
      },
      {
        name: "LEMFI",
        lat: 43.6532,
        lng: -79.3832,
        url: "https://www.lemfi.com ",
        type: "bank",
        city: "Toronto, ON",
        description:
          "International money transfer service specifically for African-Canadian communities",
      },
      {
        name: "Africhange",
        lat: 43.6532,
        lng: -79.3832,
        url: "https://www.africhange.com ",
        type: "bank",
        city: "Toronto, ON",
        description:
          "International money transfer service connecting Canada with African countries",
      },
    ],
    shopping: [
      {
        name: "Toronto Eaton Centre",
        lat: 43.6478,
        lng: -79.3888,
        url: "https://www.torontoeatoncentre.com ",
        type: "shopping",
        city: "Toronto, ON",
        description: "Largest shopping mall in Toronto with over 250 stores",
      },
      {
        name: "Yorkdale Shopping Centre",
        lat: 43.7072,
        lng: -79.4398,
        url: "https://www.yorkdale.com ",
        type: "shopping",
        city: "Toronto, ON",
        description:
          "Upscale shopping center with luxury brands and major retailers",
      },
      {
        name: "Square One Shopping Centre",
        lat: 43.5833,
        lng: -79.6584,
        url: "https://www.squareone.com ",
        type: "shopping",
        city: "Mississauga, ON",
        description:
          "Largest mall in Ontario with over 360 stores and services",
      },
    ],
    groceries: [
      {
        name: "Loblaws",
        lat: 43.6488,
        lng: -79.385,
        url: "https://www.loblaws.ca ",
        type: "grocery",
        city: "Toronto, ON",
        description:
          "National grocery chain with diverse food options and pharmacy services",
      },
      {
        name: "Metro",
        lat: 43.6475,
        lng: -79.3825,
        url: "https://www.metro.ca ",
        type: "grocery",
        city: "Toronto, ON",
        description:
          "Grocery chain with locations across Canada and pharmacy services",
      },
    ],
    transport: [
      {
        name: "Union Station",
        lat: 43.6448,
        lng: -79.3835,
        url: "https://www.metrolinx.com/en/stations/union ",
        type: "transport",
        city: "Toronto, ON",
        description:
          "Toronto’s main railway station with connections to GO Transit, VIA Rail, and subway",
      },
      {
        name: "Toronto Pearson Airport",
        lat: 43.6777,
        lng: -79.6248,
        url: "https://www.torontopearson.com ",
        type: "transport",
        city: "Mississauga, ON",
        description:
          "Canada’s busiest airport with international connections and transit access",
      },
    ],
    telecom: [
      {
        name: "Rogers",
        lat: 43.648,
        lng: -79.385,
        url: "https://www.rogers.com ",
        type: "telecom",
        city: "Toronto, ON",
        description:
          "Major Canadian telecommunications company offering mobile and internet services",
      },
      {
        name: "Bell",
        lat: 43.647,
        lng: -79.383,
        url: "https://www.bell.ca ",
        type: "telecom",
        city: "Toronto, ON",
        description:
          "Leading communications provider with mobile, internet, and TV services",
      },
    ],
    drivetest: [
      {
        name: "DriveTest Centre",
        lat: 43.7957,
        lng: -79.5378,
        url: "https://www.drivetest.ca ",
        type: "drivetest",
        city: "Vaughan, ON",
        description: "Official driver licensing and testing center for Ontario",
      },
    ],
    other: [
      {
        name: "Kijiji",
        lat: 43.6532,
        lng: -79.3832,
        url: "https://www.kijiji.ca ",
        type: "other",
        city: "Available Online",
        description:
          "Popular Canadian online marketplace for local classifieds and local search",
      },
    ],
  };

  // Flatten all services for easier filtering
  const allServices = Object.values(services).flat();

  // Service categories
  const categories = [
    { key: "all", label: "All Services", icon: "🏛️" },
    { key: "government", label: "Government Agencies", icon: "🏛️" },
    { key: "banks", label: "Banks & Money Transfer", icon: "🏦" },
    { key: "shopping", label: "Shopping Malls", icon: "🛍️" },
    { key: "groceries", label: "Grocery Stores", icon: "🛒" },
    { key: "transport", label: "Transport", icon: "🚌" },
    { key: "telecom", label: "Telecom", icon: "📱" },
    { key: "drivetest", label: "Drive Test Centers", icon: "🚗" },
    { key: "other", label: "Other Services", icon: "🔍" },
  ];

  // Handle service link click - show location on map and open link
  const handleServiceClick = (service) => {
    if (maptilerMap.current && service.lat && service.lng) {
      // Center the map on the service location
      maptilerMap.current.setCenter([service.lng, service.lat]);
      maptilerMap.current.setZoom(14);

      // Remove previous active marker
      if (activeMarker) {
        activeMarker.remove();
      }

      // Add new active marker
      const marker = new window.maplibregl.Marker({ color: "#EF4444" })
        .setLngLat([service.lng, service.lat])
        .setPopup(
          new window.maplibregl.Popup().setHTML(`
            <div class="font-semibold text-gray-800">${service.name}</div>
            <div class="text-sm text-gray-600 mt-1">${service.city}</div>
            <a href="${service.url}" target="_blank" rel="noopener noreferrer"
               class="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-block">
               Visit Website →
            </a>
          `)
        )
        .addTo(maptilerMap.current);

      setActiveMarker(marker);
    }

    // Open the service website in a new window
    window.open(service.url, "_blank");
  };

  // Initialize map
  useEffect(() => {
    // Only run on the client side
    if (typeof window !== "undefined") {
      // Dynamically load MapTiler CSS
      const cssLink = document.createElement("link");
      cssLink.rel = "stylesheet";
      cssLink.href =
        "https://cdn.maptiler.com/maptiler-sdk-js/v3.5.0/maptiler-sdk.css ";
      document.head.appendChild(cssLink);

      // Load MapTiler SDK script
      const script = document.createElement("script");
      script.src =
        "https://cdn.maptiler.com/maptiler-sdk-js/v3.5.0/maptiler-sdk.umd.min.js ";

      script.onload = () => {
        try {
          // Set the MapTiler API key
          if (window.MaptilerClient) {
            window.MaptilerClient.config.apiKey = "PsXAK1A5fuBeV3zEMetq";
          }

          // Initialize the map with a default view
          maptilerMap.current = new window.maplibregl.Map({
            container: "map-container",
            style:
              "https://api.maptiler.com/maps/streets/style.json?key=PsXAK1A5fuBeV3zEMetq",
            center: [-79.3832, 43.6532], // Toronto coordinates [lng, lat]
            zoom: 11,
          });

          // Add navigation control
          maptilerMap.current.addControl(
            new window.maplibregl.NavigationControl()
          );

          // Add scale control
          maptilerMap.current.addControl(new window.maplibregl.ScaleControl());

          // Initialize with all markers
          updateMapMarkers(allServices);
        } catch (error) {
          console.error("Error initializing map:", error);
        }
      };

      script.onerror = () => {
        console.error("Failed to load MapTiler SDK");
        const mapContainer = document.getElementById("map-container");
        if (mapContainer) {
          mapContainer.innerHTML = `
            <div class="flex items-center justify-center h-full bg-gray-100">
              <div class="text-center">
                <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h3 class="text-lg font-medium text-gray-900 mb-2">Map Service Unavailable</h3>
                <p class="text-sm text-gray-500">Please check your internet connection and try again.</p>
              </div>
            </div>
          `;
        }
      };

      document.head.appendChild(script);

      // Cleanup function
      return () => {
        if (maptilerMap.current) {
          maptilerMap.current.remove();
        }
        if (cssLink && document.head.contains(cssLink)) {
          document.head.removeChild(cssLink);
        }
        if (script && document.head.contains(script)) {
          document.head.removeChild(script);
        }
      };
    }
  }, []);

  // Update markers when category changes or search is performed
  useEffect(() => {
    if (maptilerMap.current) {
      updateMapMarkers(
        filteredServices.length > 0 ? filteredServices : allServices
      );
    }
  }, [filteredServices]);

  // Update map markers based on services
  const updateMapMarkers = (servicesToDisplay) => {
    // Clear existing markers
    if (window.markersGroup) {
      window.markersGroup.forEach((marker) => marker.remove());
    }
    window.markersGroup = [];

    if (servicesToDisplay && servicesToDisplay.length > 0) {
      servicesToDisplay.forEach((service) => {
        // Create custom marker based on service type
        const iconColors = {
          government: "#EF4444",
          bank: "#10B981",
          shopping: "#8B5CF6",
          grocery: "#F59E0B",
          transport: "#3B82F6",
          telecom: "#14B8A6",
          drivetest: "#F59E0B",
          other: "#6B7280",
        };

        const color = iconColors[service.type] || "#6B7280";

        const marker = new window.maplibregl.Marker({ color: color })
          .setLngLat([service.lng, service.lat])
          .setPopup(
            new window.maplibregl.Popup().setHTML(`
              <div class="font-semibold text-gray-800">${service.name}</div>
              <div class="text-sm text-gray-600 mt-1">${service.city}</div>
              <a href="${service.url}" target="_blank" rel="noopener noreferrer"
                 class="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-block">
                 Visit Website →
              </a>
            `)
          )
          .addTo(maptilerMap.current);

        window.markersGroup.push(marker);
      });

      // Fit bounds to show all markers
      const bounds = new window.maplibregl.LngLatBounds();
      servicesToDisplay.forEach((s) => bounds.extend([s.lng, s.lat]));
      maptilerMap.current.fitBounds(bounds, { padding: 50 });
    }
  };

  // Handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    const servicesToDisplay =
      category === "all" ? allServices : services[category];
    setFilteredServices([]);
  };

  // Handle search input
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredServices([]);
      return;
    }

    const results = allServices.filter(
      (service) =>
        service.name.toLowerCase().includes(query) ||
        service.city.toLowerCase().includes(query) ||
        service.description.toLowerCase().includes(query)
    );

    setFilteredServices(results);
  };

  //  const categories = [
  //    { key: "all", label: t("category_all"), icon: "🔍" },
  //    { key: "government", label: t("category_government"), icon: "🏛️" },
  //    { key: "banks", label: t("category_banks"), icon: "🏦" },
  //    { key: "shopping", label: t("category_shopping"), icon: "🛍️" },
  //    { key: "groceries", label: t("category_groceries"), icon: "🛒" },
  //    { key: "transport", label: t("category_transport"), icon: "🚌" },
  //    { key: "telecom", label: t("category_telecom"), icon: "📱" },
  //    { key: "healthcare", label: t("category_healthcare"), icon: "🏥" },
  //    { key: "education", label: t("category_education"), icon: "🎓" },
  //  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 to-white text-white text-center py-12">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          {t("header_title")}
        </h1>
        <p className="text-xl md:text-2xl mb-6">{t("header_description")}</p>
      </header>

      {/* Services Section */}
      <section id="services" className="max-w-7xl mx-auto py-12 px-4">
        <h2 className="text-4xl font-bold text-red-600 text-center mb-12">
          {t("all_services_title")}
        </h2>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder={t("search_placeholder")}
              value={searchQuery}
              onChange={handleSearch}
              className="w-full px-4 py-3 pl-10 border-2 border-red-600 rounded-full focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 text-gray-800"
            />
            <svg
              className="absolute left-3 top-3 w-5 h-5 text-gray-400"
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
          {searchQuery && (
            <p className="text-sm text-gray-500 mt-2 text-center">
              {t("search_results", {
                count: filteredServices.length,
                query: searchQuery,
              })}
            </p>
          )}
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => handleCategoryChange(category.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.key
                  ? "bg-red-600 text-white transform scale-105"
                  : "bg-white text-gray-800 border-2 border-red-600 hover:bg-red-50"
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.label}
            </button>
          ))}
        </div>

        {/* Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {Object.entries(services).map(([categoryKey, categoryServices]) => {
            const servicesToDisplay =
              selectedCategory === "all" && !searchQuery
                ? categoryServices
                : selectedCategory === categoryKey
                ? searchQuery
                  ? filteredServices.filter((s) => s.type === categoryKey)
                  : categoryServices
                : selectedCategory === "all" && searchQuery
                ? filteredServices.filter((s) => s.type === categoryKey)
                : [];

            if (
              servicesToDisplay.length === 0 &&
              (selectedCategory === "all" ||
                selectedCategory === categoryKey) &&
              (!searchQuery ||
                filteredServices.some((s) => s.type === categoryKey))
            ) {
              return (
                <div
                  key={categoryKey}
                  className="bg-white border-2 border-red-600 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <h3 className="text-2xl font-semibold text-red-600 mb-4 flex items-center">
                    <span className="mr-2">
                      {categories.find((c) => c.key === categoryKey)?.icon ||
                        "📌"}
                    </span>
                    {t(`category_${categoryKey}`) || categoryKey}
                  </h3>

                  <div className="space-y-4">
                    {servicesToDisplay.map((service, index) => (
                      <div
                        key={index}
                        className="border-b border-gray-100 pb-4 last:border-0"
                      >
                        <button
                          onClick={() => handleServiceClick(service)}
                          className="text-left w-full"
                        >
                          <div className="font-semibold text-gray-800 flex justify-between items-start">
                            {service.name}
                            <span className="text-sm text-red-600">
                              {service.city}
                            </span>
                          </div>
                          <div className="text-gray-600 text-sm mt-1">
                            {service.description}
                          </div>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </section>

      {/* Map Section */}
      <section id="map" className="max-w-7xl mx-auto py-12 px-4">
        <h2 className="text-4xl font-bold text-red-600 text-center mb-8">
          {t("map_title")}
        </h2>
        <p className="text-lg text-center mb-6">{t("map_description")}</p>
        <div
          id="map-container"
          ref={mapRef}
          className="w-full rounded-lg border-2 border-red-600 shadow-lg"
          style={{ height: "600px", minHeight: "400px" }}
        >
          <div className="flex items-center justify-center h-full bg-gray-100">
            <div className="text-center">
              <svg
                className="w-16 h-16 text-gray-400 mx-auto mb-4 animate-spin"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                ></path>
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {t("map_loading_title")}
              </h3>
              <p className="text-gray-600">{t("map_loading_description")}</p>
            </div>
          </div>
        </div>
        <div className="mt-6 bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-800 mb-2">
            {t("map_legend_title")}
          </h3>
          <div className="flex flex-wrap text-gray-900 gap-4 text-sm">
            <span className="flex items-center">
              <div className="w-3 h-3 bg-red-600 rounded-full mr-2"></div>
              {t("legend_government")}
            </span>
            <span className="flex items-center">
              <div className="w-3 h-3 bg-green-600 rounded-full mr-2"></div>
              {t("legend_banks")}
            </span>
            <span className="flex items-center">
              <div className="w-3 h-3 bg-purple-600 rounded-full mr-2"></div>
              {t("legend_shopping")}
            </span>
            <span className="flex items-center">
              <div className="w-3 h-3 bg-orange-600 rounded-full mr-2"></div>
              {t("legend_groceries")}
            </span>
            <span className="flex items-center">
              <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
              {t("legend_transport")}
            </span>
            <span className="flex items-center">
              <div className="w-3 h-3 bg-teal-600 rounded-full mr-2"></div>
              {t("legend_telecom")}
            </span>
            <span className="flex items-center">
              <div className="w-3 h-3 bg-yellow-600 rounded-full mr-2"></div>
              {t("legend_drive_test")}
            </span>
            <span className="flex items-center">
              <div className="w-3 h-3 bg-gray-600 rounded-full mr-2"></div>
              {t("legend_other")}
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-red-600 to-white text-white text-center py-6">
        <p>{t("footer_copyright")}</p>
        <p className="text-sm mt-2">{t("footer_description")}</p>
      </footer>
    </div>
  );
};

export default ServicesPage;
