"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const LandingPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [userLocation, setUserLocation] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef(null);
  const map = useRef(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [isMapReady, setIsMapReady] = useState(false);
  const [activeFeature, setActiveFeature] = useState(null);
  const t = useTranslations("HomePage");
  const { locale } = useParams();

  // Services data
  const services = {
    all: [
      {
        name: "Service Canada",
        lat: 43.6532,
        lng: -79.3832,
        type: "government",
        icon: "🏛️",
      },
      {
        name: "Service Ontario",
        lat: 43.648,
        lng: -79.3849,
        type: "government",
        icon: "🏛️",
      },
      {
        name: "TD Bank",
        lat: 43.6426,
        lng: -79.3871,
        type: "bank",
        icon: "🏦",
      },
      { name: "LEMFI", lat: 43.6532, lng: -79.3832, type: "bank", icon: "🏦" },
      {
        name: "Toronto Eaton Centre",
        lat: 43.6478,
        lng: -79.3888,
        type: "shopping",
        icon: "🛍️",
      },
      {
        name: "Loblaws",
        lat: 43.6488,
        lng: -79.385,
        type: "grocery",
        icon: "🛒",
      },
      {
        name: "Union Station",
        lat: 43.6448,
        lng: -79.3835,
        type: "transport",
        icon: "🚌",
      },
      {
        name: "Rogers",
        lat: 43.648,
        lng: -79.385,
        type: "telecom",
        icon: "📱",
      },
      {
        name: "DriveTest Centre",
        lat: 43.7957,
        lng: -79.5378,
        type: "drivetest",
        icon: "🚗",
      },
      {
        name: "Kijiji",
        lat: 43.6532,
        lng: -79.3832,
        type: "other",
        icon: "🔍",
      },
    ],
    government: [
      {
        name: "Service Canada",
        lat: 43.6532,
        lng: -79.3832,
        type: "government",
        icon: "🏛️",
      },
      {
        name: "Service Ontario",
        lat: 43.648,
        lng: -79.3849,
        type: "government",
        icon: "🏛️",
      },
    ],
    banks: [
      {
        name: "TD Bank",
        lat: 43.6426,
        lng: -79.3871,
        type: "bank",
        icon: "🏦",
      },
      { name: "LEMFI", lat: 43.6532, lng: -79.3832, type: "bank", icon: "🏦" },
    ],
    shopping: [
      {
        name: "Toronto Eaton Centre",
        lat: 43.6478,
        lng: -79.3888,
        type: "shopping",
        icon: "🛍️",
      },
      {
        name: "Yorkdale Shopping Centre",
        lat: 43.7072,
        lng: -79.4398,
        type: "shopping",
        icon: "🛍️",
      },
    ],
    groceries: [
      {
        name: "Loblaws",
        lat: 43.6488,
        lng: -79.385,
        type: "grocery",
        icon: "🛒",
      },
      {
        name: "Metro",
        lat: 43.6475,
        lng: -79.3825,
        type: "grocery",
        icon: "🛒",
      },
    ],
    transport: [
      {
        name: "Union Station",
        lat: 43.6448,
        lng: -79.3835,
        type: "transport",
        icon: "🚌",
      },
      {
        name: "Toronto Pearson Airport",
        lat: 43.6777,
        lng: -79.6248,
        type: "transport",
        icon: "✈️",
      },
    ],
    telecom: [
      {
        name: "Rogers",
        lat: 43.648,
        lng: -79.385,
        type: "telecom",
        icon: "📱",
      },
      { name: "Bell", lat: 43.647, lng: -79.383, type: "telecom", icon: "📱" },
    ],
    drivetest: [
      {
        name: "DriveTest Centre",
        lat: 43.7957,
        lng: -79.5378,
        type: "drivetest",
        icon: "🚗",
      },
    ],
    other: [
      {
        name: "Kijiji",
        lat: 43.6532,
        lng: -79.3832,
        type: "other",
        icon: "🔍",
      },
    ],
  };

  // Student Testimonials
  const testimonials = [
    {
      name: "Aisha Mohammed",
      country: "Nigeria",
      university: "University of Toronto",
      text: "This platform helped me find student housing, campus resources, and connect with other Nigerian students. The interactive map made navigating campus so much easier!",
      rating: 5,
    },
    {
      name: "Raj Patel",
      country: "India",
      university: "McGill University",
      text: "The student discounts and events calendar are amazing! I've saved so much money and made friends from all over the world through the events listed here.",
      rating: 5,
    },
    {
      name: "Li Chen",
      country: "China",
      university: "University of British Columbia",
      text: "As an international student, finding affordable groceries and setting up a phone plan was challenging until I found this site. The student guides are incredibly helpful!",
      rating: 5,
    },
  ];

  // Student Blog posts
  const blogPosts = [
    {
      title: "Student Banking: Best Accounts with No Fees",
      excerpt:
        "Compare student-friendly bank accounts with no monthly fees, free transactions, and international transfer benefits.",
      image:
        "https://images.unsplash.com/photo-1616514197671-15d99ce7a6f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Campus Transit Guide: Student Discounts & Routes",
      excerpt:
        "Everything you need to know about student transit passes, campus shuttles, and getting around your university area.",
      image:
        "https://images.unsplash.com/photo-1517486808906-6ca8b3f8e1c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "International Student Guide: Work Permits & Jobs",
      excerpt:
        "Learn about on-campus jobs, co-op opportunities, and how to navigate work permits as an international student.",
      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
  ];

  // Service categories
  const serviceCategories = [
    { key: "all", label: "All Services", icon: "🔍" },
    { key: "government", label: "Government Agencies", icon: "🏛️" },
    { key: "banks", label: "Banks & Money Transfer", icon: "🏦" },
    { key: "shopping", label: "Shopping Malls", icon: "🛍️" },
    { key: "groceries", label: "Grocery Stores", icon: "🛒" },
    { key: "transport", label: "Transport", icon: "🚌" },
    { key: "telecom", label: "Telecom", icon: "📱" },
    { key: "drivetest", label: "Drive Test Centers", icon: "🚗" },
    { key: "other", label: "Other Services", icon: "🔍" },
  ];

  // Initialize map
  useEffect(() => {
    // Only run on the client side
    if (typeof window !== "undefined" && !map.current && mapRef.current) {
      // Dynamically load MapTiler CSS
      const cssLink = document.createElement("link");
      cssLink.rel = "stylesheet";
      cssLink.href =
        " https://cdn.maptiler.com/maptiler-sdk-js/v3.5.0/maptiler-sdk.css ";
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

          // Initialize the map
          map.current = new window.maplibregl.Map({
            container: "map-container",
            style:
              "https://api.maptiler.com/maps/streets/style.json?key=PsXAK1A5fuBeV3zEMetq",
            center: [-79.3832, 43.6532], // Toronto coordinates [lng, lat]
            zoom: 11,
          });

          // Add navigation control
          map.current.addControl(new window.maplibregl.NavigationControl());

          // Add scale control
          map.current.addControl(new window.maplibregl.ScaleControl());

          // Add all markers
          updateMapMarkers(services.all);

          // Try to get user's current location
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const userLatLng = [
                  position.coords.longitude,
                  position.coords.latitude,
                ];
                setUserLocation(userLatLng);

                // Add user location marker
                new window.maplibregl.Marker({ color: "#3B82F6" })
                  .setLngLat(userLatLng)
                  .setPopup(
                    new window.maplibregl.Popup().setHTML(
                      "<strong>Your Location</strong>"
                    )
                  )
                  .addTo(map.current);

                // Center map on user location
                map.current.setCenter(userLatLng);
                map.current.setZoom(12);
              },
              (error) => {
                console.log("Error getting location:", error);
                // Default to Toronto if location access is denied
                setUserLocation([-79.3832, 43.6532]);
                updateMapMarkers(services.all);
              }
            );
          } else {
            setUserLocation([-79.3832, 43.6532]);
            updateMapMarkers(services.all);
          }

          // Set map ready
          map.current.on("load", () => {
            setIsMapReady(true);
          });
        } catch (error) {
          console.error("Map initialization error:", error);
          setMapLoaded(false);
        }
      };

      script.onerror = () => {
        console.error("Failed to load MapTiler SDK");
        setMapLoaded(false);
      };

      document.head.appendChild(script);

      // Cleanup function
      return () => {
        if (map.current) {
          map.current.remove();
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

  // Update map markers based on selected category
  useEffect(() => {
    if (map.current && isMapReady) {
      // Clear existing markers
      if (window.markersGroup) {
        window.markersGroup.forEach((marker) => marker.remove());
      }
      window.markersGroup = [];

      const servicesToDisplay =
        activeCategory === "all" ? services.all : services[activeCategory];

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
                <div class="text-sm text-gray-600 mt-1">Category: ${service.type}</div>
                <a href="#" target="_blank" rel="noopener noreferrer"
                   class="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-block">
                   Learn More →
                </a>
              `)
            )
            .addTo(map.current);

          window.markersGroup.push(marker);
        });

        // Fit bounds to show all markers
        if (servicesToDisplay.length > 0) {
          const bounds = new window.maplibregl.LngLatBounds();
          servicesToDisplay.forEach((s) => bounds.extend([s.lng, s.lat]));
          map.current.fitBounds(bounds, { padding: 50 });
        }
      }
    }
  }, [activeCategory, isMapReady]);

  // Update map markers
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
              <div class="text-sm text-gray-600 mt-1">Category: ${service.type}</div>
              <a href="#" target="_blank" rel="noopener noreferrer"
                 class="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-block">
                 Learn More →
              </a>
            `)
          )
          .addTo(map.current);

        window.markersGroup.push(marker);
      });

      // Fit bounds to show all markers
      if (servicesToDisplay.length > 0) {
        const bounds = new window.maplibregl.LngLatBounds();
        servicesToDisplay.forEach((s) => bounds.extend([s.lng, s.lat]));
        map.current.fitBounds(bounds, { padding: 50 });
      }
    }
  };

  // Testimonial carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Newsletter subscription
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    // Simulate subscription
    setIsSubscribed(true);
    setTimeout(() => {
      setIsSubscribed(false);
    }, 3000);
  };

  // Handle category change
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  // Toggle mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [isMapInitialized, setIsMapInitialized] = useState(false);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initialize map
  useEffect(() => {
    if (typeof window !== "undefined" && !map.current && mapRef.current) {
      // Load MapTiler SDK
      const script = document.createElement("script");
      script.src =
        " https://cdn.maptiler.com/maptiler-sdk-js/v3.5.0/maptiler-sdk.umd.min.js ";
      script.async = true;
      script.onload = () => {
        try {
          // Initialize the map
          map.current = new window.maplibregl.Map({
            container: "map-container",
            style:
              "https://api.maptiler.com/maps/streets/style.json?key=PsXAK1A5fuBeV3zEMetq",
            center: [-79.3832, 43.6532],
            zoom: 11,
          });

          // Add navigation control
          map.current.addControl(new window.maplibregl.NavigationControl());

          // Add scale control
          map.current.addControl(new window.maplibregl.ScaleControl());

          // Add user location marker if available
          if (userLocation) {
            new window.maplibregl.Marker({ color: "#3B82F6" })
              .setLngLat(userLocation)
              .setPopup(
                new window.maplibregl.Popup().setHTML(
                  "<strong>Your Location</strong>"
                )
              )
              .addTo(map.current);

            map.current.setCenter(userLocation);
            map.current.setZoom(12);
          }

          // Set map as initialized
          setIsMapReady(true);
        } catch (error) {
          console.error("Map initialization error:", error);
        }
      };
      script.onerror = () => {
        console.error("Failed to load MapTiler SDK");
      };
      document.head.appendChild(script);

      return () => {
        if (map.current) {
          map.current.remove();
          map.current = null;
        }
        const existingScript = document.querySelector(
          'script[src*="maptiler-sdk"]'
        );
        if (existingScript) {
          existingScript.remove();
        }
      };
    }
  }, [userLocation]);

  // FAQ toggle
  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  // Initialize map markers
  useEffect(() => {
    if (isMapReady && map.current) {
      updateMapMarkers(services.all);
    }
  }, [isMapReady]);

  // Testimonial animation
  useEffect(() => {
    if (typeof window !== "undefined" && window.gsap) {
      window.gsap.from(".animate-faq", {
        opacity: 0,
        y: 30,
        duration: 1.2,
        stagger: 0.2,
        delay: 0.5,
      });
    }
  }, []);

  // Student FAQ data
  const faqs = [
    {
      question: t("faq1_question"),
      answer: t("faq1_answer"),
    },
    {
      question: t("faq2_question"),
      answer: t("faq2_answer"),
    },
    {
      question: t("faq3_question"),
      answer: t("faq3_answer"),
    },
    {
      question: t("faq4_question"),
      answer: t("faq4_answer"),
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* <Header /> */}

      {/* Hero Section - Student Focused */}
      <section className="bg-red-600 text-white pt-16 md:pt-0 min-h-[85vh] flex items-center relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80')] bg-cover bg-center"></div>
        </div>

        <div className="container mx-auto px-4 py-12 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-up">
                {t("hero_title")}
              </h1>
              <p
                className="text-lg md:text-xl mb-8 animate-fade-up"
                style={{ animationDelay: "300ms" }}
              >
                {t("hero_description")}
              </p>
              <div
                className="flex flex-col sm:flex-row gap-4 animate-fade-up"
                style={{ animationDelay: "500ms" }}
              >
                <button
                  onClick={() =>
                    document
                      .getElementById("services-section")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                  className="bg-white text-red-600 px-6 py-3 rounded-md hover:bg-gray-100 transition-colors font-semibold"
                >
                  {t("hero_explore_button")}
                </button>
                <button
                  onClick={() => (window.location.href = `${locale}/register`)}
                  className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md hover:bg-white/10 transition-colors font-semibold"
                >
                  {t("hero_join_button")}
                </button>
              </div>
            </div>

            <div className="hidden lg:block relative">
              <div className="relative rounded-lg overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                  alt={t("hero_image_alt")}
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-red-900/90 to-transparent p-6">
                  <p className="text-white text-xl font-medium">
                    {t("hero_image_caption")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="w-full"
          >
            {/* SVG path unchanged */}
          </svg>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-red-600 mb-2">100+</div>
              <p className="text-gray-600">{t("stats_universities")}</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-red-600 mb-2">50K+</div>
              <p className="text-gray-600">{t("stats_students")}</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-red-600 mb-2">200+</div>
              <p className="text-gray-600">{t("stats_resources")}</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-red-600 mb-2">24/7</div>
              <p className="text-gray-600">{t("stats_support")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview - Student Resources */}
      <section id="services-section" className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">
              {t("services_title")}
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              {t("services_description")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceCategories.map((category, index) => (
              <div
                key={index}
                className="bg-white border-2 border-red-600 rounded-lg p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl mb-4 text-red-600">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {category.label}
                </h3>
                <p className="text-gray-600 mb-4">
                  {t(`service_${category.key}`)}
                </p>
                <button
                  onClick={() => (window.location.href = `${locale}/services`)}
                  className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold flex items-center mx-auto"
                >
                  <span>{t("service_explore_button")}</span>
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {/* SVG path unchanged */}
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Map - Campus Explorer */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">
              {t("map_title")}
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              {t("map_description")}
            </p>
          </div>

          <div
            id="map-container"
            ref={mapRef}
            className="w-full rounded-lg border-2 border-red-600 shadow-lg mb-6"
            style={{ height: "600px" }}
          >
            {!isMapReady && (
              <div className="flex items-center justify-center h-full bg-gray-100">
                <div className="text-center">
                  <svg
                    className="w-16 h-16 text-gray-400 mx-auto mb-4 animate-spin"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {/* SVG path unchanged */}
                  </svg>
                  <p className="text-gray-600">{t("map_loading")}</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
            <select
              className="px-4 py-2 border-2 border-red-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              <option value="all">{t("map_category_all")}</option>
              <option value="government">{t("map_category_government")}</option>
              <option value="banks">{t("map_category_banks")}</option>
              <option value="shopping">{t("map_category_shopping")}</option>
              <option value="groceries">{t("map_category_groceries")}</option>
              <option value="transport">{t("map_category_transport")}</option>
              <option value="telecom">{t("map_category_telecom")}</option>
              <option value="drivetest">{t("map_category_drivetest")}</option>
              <option value="other">{t("map_category_other")}</option>
            </select>

            <button
              onClick={() => {
                if (userLocation && map.current) {
                  map.current.setCenter(userLocation);
                  map.current.setZoom(14);
                }
              }}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {/* SVG paths unchanged */}
                </svg>
                {t("map_location_button")}
              </div>
            </button>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-2">
              {t("map_legend_title")}
            </h3>
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="flex items-center">
                <div className="w-3 h-3 bg-red-600 rounded-full mr-2"></div>{" "}
                {t("map_legend_government")}
              </span>
              <span className="flex items-center">
                <div className="w-3 h-3 bg-green-600 rounded-full mr-2"></div>{" "}
                {t("map_legend_banks")}
              </span>
              <span className="flex items-center">
                <div className="w-3 h-3 bg-purple-600 rounded-full mr-2"></div>{" "}
                {t("map_legend_shopping")}
              </span>
              <span className="flex items-center">
                <div className="w-3 h-3 bg-orange-600 rounded-full mr-2"></div>{" "}
                {t("map_legend_groceries")}
              </span>
              <span className="flex items-center">
                <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>{" "}
                {t("map_legend_transport")}
              </span>
              <span className="flex items-center">
                <div className="w-3 h-3 bg-teal-600 rounded-full mr-2"></div>{" "}
                {t("map_legend_telecom")}
              </span>
              <span className="flex items-center">
                <div className="w-3 h-3 bg-yellow-600 rounded-full mr-2"></div>{" "}
                {t("map_legend_drivetest")}
              </span>
              <span className="flex items-center">
                <div className="w-3 h-3 bg-gray-600 rounded-full mr-2"></div>{" "}
                {t("map_legend_other")}
              </span>
              <span className="flex items-center">
                <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white mr-2"></div>{" "}
                {t("map_legend_user_location")}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Student Journey */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">
              {t("journey_title")}
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              {t("journey_description")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white p-8 shadow-md hover:shadow-lg transition-all border-t-4 border-red-600">
              <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center text-white text-2xl font-bold mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {t("journey_step1_title")}
              </h3>
              <p className="text-gray-600">{t("journey_step1_description")}</p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-8 shadow-md hover:shadow-lg transition-all border-t-4 border-red-600">
              <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center text-white text-2xl font-bold mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {t("journey_step2_title")}
              </h3>
              <p className="text-gray-600">{t("journey_step2_description")}</p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-8 shadow-md hover:shadow-lg transition-all border-t-4 border-red-600">
              <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center text-white text-2xl font-bold mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {t("journey_step3_title")}
              </h3>
              <p className="text-gray-600">{t("journey_step3_description")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Student Stories */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">
              {t("testimonials_title")}
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto mb-8">
              {t("testimonials_description")}
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500"
                style={{
                  transform: `translateX(-${currentTestimonial * 100}%)`,
                }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="bg-gray-50 border-2 border-red-600 rounded-lg p-8 shadow-lg">
                      <p className="text-gray-700 mb-6 italic">
                        {testimonial.text}
                      </p>
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold text-lg mr-4">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {testimonial.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {testimonial.university}, {testimonial.country}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Navigation */}
            <div className="flex justify-center mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 mx-2 rounded-full ${
                    currentTestimonial === index ? "bg-red-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action - Student Sign-up */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="bg-red-600 rounded-lg p-10 shadow-lg relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mb-32"></div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
                {t("cta_title")}
              </h2>
              <p className="text-center text-white/90 mb-8 max-w-2xl mx-auto">
                {t("cta_description")}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href={`${locale}/register`}
                  className="bg-white text-red-600 px-8 py-4 rounded-md hover:bg-gray-100 transition-colors font-semibold text-center"
                >
                  {t("cta_join_button")}
                </Link>
                <button
                  onClick={() =>
                    document
                      .getElementById("services-section")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-md hover:bg-white/10 transition-colors font-semibold text-center"
                >
                  {t("cta_explore_button")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ - Student Questions */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">
              {t("faq_title")}
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto mb-8">
              {t("faq_description")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`bg-white border-2 border-red-600 rounded-lg p-6 shadow-md ${
                  activeFAQ === index ? "border-l-4 border-l-red-600" : ""
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left"
                  aria-expanded={activeFAQ === index}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-800">
                      {faq.question}
                    </h3>
                    <svg
                      className={`w-5 h-5 text-red-600 transform ${
                        activeFAQ === index ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {/* SVG path unchanged */}
                    </svg>
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    activeFAQ === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <p className="mt-4 text-gray-600">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup - Student Updates */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="bg-white border-2 border-red-600 rounded-lg p-8 shadow-md relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-100 rounded-full opacity-50"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-red-100 rounded-full opacity-50"></div>

            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-red-600 mb-4">
                {t("newsletter_title")}
              </h2>
              <p className="text-gray-700 mb-6">
                {t("newsletter_description")}
              </p>

              <form
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col sm:flex-row gap-4"
              >
                <input
                  type="email"
                  placeholder={t("newsletter_email_placeholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow px-4 py-3 border-2 border-red-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                />
                <button
                  type="submit"
                  className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
                >
                  {t("newsletter_subscribe_button")}
                </button>
              </form>

              {isSubscribed && (
                <div className="mt-4 p-3 bg-green-50 border-l-4 border-green-500 text-green-600">
                  <p>{t("newsletter_success")}</p>
                </div>
              )}

              {emailError && (
                <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-600 text-red-600">
                  <p>
                    {t("newsletter_error").replace("{emailError}", emailError)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* <Footer /> */}
    </div>
  );
};
export default LandingPage;
