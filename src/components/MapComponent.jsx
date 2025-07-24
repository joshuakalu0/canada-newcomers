"use client";
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { motion } from 'framer-motion';

const containerStyle = {
  width: '100%',
  height: '600px',
  borderRadius: '0.5rem',
  border: '2px solid #D52B1E'
};

const center = {
  lat: 43.6532,
  lng: -79.3832 // Toronto coordinates
};

const libraries = ['places'];

const MapComponent = ({ services, onCategoryChange, selectedCategory }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries
  });

  const [map, setMap] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const mapRef = useRef(null);

  // Get marker icon based on type
  const getMarkerIcon = (type) => {
    const iconColors = {
      government: '#D52B1E',
      bank: '#10B981',
      shopping: '#8B5CF6',
      grocery: '#F59E0B',
      transport: '#3B82F6',
      telecom: '#14B8A6',
      drivetest: '#F59E0B',
      other: '#6B7280',
    };

    const color = iconColors[type] || '#6B7280';
    
    return {
      path: 'M12,2C8.13,2,5,5.13,5,9c0,5.25,7,13,7,13s7-7.75,7-13C19,5.13,15.87,2,12,2z M12,11.5c-1.38,0-2.5-1.12-2.5-2.5s1.12-2.5,2.5-2.5s2.5,1.12,2.5,2.5S13.38,11.5,12,11.5z',
      fillColor: color,
      fillOpacity: 1,
      strokeWeight: 1,
      strokeColor: '#FFFFFF',
      scale: 1.5,
      anchor: { x: 12, y: 23 },
    };
  };

  const onLoad = useCallback(function callback(map) {
    mapRef.current = map;
    setMap(map);
    
    // Try to get user's location
    getUserLocation();
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  // Get user's location
  const getUserLocation = () => {
    setIsLocating(true);
    setLocationError(null);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(userPos);
          if (map) {
            map.setCenter(userPos);
            map.setZoom(13);
          }
          setIsLocating(false);
        },
        (error) => {
          // Handle geolocation error
          setLocationError("Could not access your location. Please check your browser permissions.");
          setUserLocation(center);
          setIsLocating(false);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      setLocationError("Geolocation is not supported by your browser.");
      setUserLocation(center);
      setIsLocating(false);
    }
  };

  // Update markers when category changes
  useEffect(() => {
    if (isLoaded && map) {
      const servicesToDisplay = 
        selectedCategory === 'all' 
          ? Object.values(services).flat() 
          : services[selectedCategory] || [];
      
      setMarkers(servicesToDisplay);
      
      // Fit bounds to show all markers
      if (servicesToDisplay.length > 0) {
        const bounds = new google.maps.LatLngBounds();
        servicesToDisplay.forEach((service) => {
          bounds.extend(new google.maps.LatLng(service.lat, service.lng));
        });
        map.fitBounds(bounds);
        
        // Don't zoom in too far
        const listener = google.maps.event.addListener(map, "idle", () => {
          if (map.getZoom() > 15) map.setZoom(15);
          google.maps.event.removeListener(listener);
        });
      }
    }
  }, [isLoaded, map, selectedCategory, services]);

  // Show user location
  const showUserLocation = () => {
    if (userLocation && map) {
      map.panTo(userLocation);
      map.setZoom(14);
    } else {
      getUserLocation();
    }
  };

  // Custom map styles with Canadian theme
  const mapStyles = [
    {
      featureType: "all",
      elementType: "labels.text.fill",
      stylers: [{ color: "#333333" }]
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#e9e9e9" }]
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#c8e6c9" }]
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [{ color: "#ffffff" }]
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#f5f5f5" }]
    },
    {
      featureType: "poi",
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }]
    }
  ];

  return isLoaded ? (
    <div className="relative">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={11}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          styles: mapStyles,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          zoomControl: true,
          scrollwheel: true,
          gestureHandling: "cooperative",
          disableDefaultUI: false
        }}
      >
        {/* User location marker */}
        {userLocation && (
          <Marker
            position={userLocation}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: "#3B82F6",
              fillOpacity: 1,
              strokeColor: "#FFFFFF",
              strokeWeight: 2,
            }}
            title="Your Location"
            animation={google.maps.Animation.DROP}
          />
        )}

        {/* Service markers */}
        {markers.map((service, index) => (
          <Marker
            key={`${service.name}-${index}`}
            position={{ lat: service.lat, lng: service.lng }}
            icon={getMarkerIcon(service.type)}
            onClick={() => setSelectedPlace(service)}
            animation={google.maps.Animation.DROP}
          />
        ))}

        {/* Info window for selected place */}
        {selectedPlace && (
          <InfoWindow
            position={{ lat: selectedPlace.lat, lng: selectedPlace.lng }}
            onCloseClick={() => setSelectedPlace(null)}
          >
            <div className="info-window">
              <h3 className="text-lg font-semibold text-red-600">{selectedPlace.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{selectedPlace.city || 'Toronto, ON'}</p>
              {selectedPlace.address && (
                <p className="text-sm text-gray-600 mt-1">{selectedPlace.address}</p>
              )}
              {selectedPlace.phone && (
                <p className="text-sm text-gray-600 mt-1">
                  <a href={`tel:${selectedPlace.phone}`} className="hover:underline">
                    {selectedPlace.phone}
                  </a>
                </p>
              )}
              {selectedPlace.url && (
                <a 
                  href={selectedPlace.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-block"
                >
                  Visit Website →
                </a>
              )}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>

      {/* Location Button */}
      <motion.button
        onClick={showUserLocation}
        className="absolute bottom-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-red-700 transition-colors z-10 flex items-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={isLocating}
      >
        {isLocating ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Locating...
          </>
        ) : (
          <>
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            My Location
          </>
        )}
      </motion.button>

      {/* Location Error Message */}
      {locationError && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md shadow-md z-20">
          <p className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {locationError}
          </p>
        </div>
      )}

      {/* Category Filter */}
      <div className="absolute top-4 left-4 z-10">
        <motion.div 
          className="bg-white shadow-lg rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-2 bg-red-600 text-white font-semibold text-center">
            Filter Services
          </div>
          <div className="p-2 max-h-60 overflow-y-auto">
            {Object.keys(services).map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${selectedCategory === category ? 'bg-red-100 text-red-600 font-medium' : 'hover:bg-gray-100'}`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
                <span className="ml-2 text-xs text-gray-500">
                  ({services[category].length})
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-[600px] bg-gray-100 rounded-lg border-2 border-red-600">
      <div className="text-center">
        <svg
          className="w-16 h-16 text-red-600 mx-auto mb-4 animate-spin"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-gray-600 font-medium">Loading map...</p>
        <p className="text-gray-500 text-sm mt-2">Please wait while we prepare your interactive map</p>
      </div>
    </div>
  );
};

export default MapComponent;