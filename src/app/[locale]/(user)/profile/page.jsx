"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    country: "",
    language: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    language: "",
  });
  const [savedLocations, setSavedLocations] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch user data
  useEffect(() => {
    if (status === "authenticated") {
      // In a real app, this would be an API call
      // For now, we'll use mock data
      setTimeout(() => {
        const mockUser = {
          id: session.user.id,
          name: session.user.name || "User",
          email: session.user.email || "user@example.com",
          country: "Canada",
          language: "English",
        };

        setUserData(mockUser);
        setFormData({
          name: mockUser.name,
          country: mockUser.country,
          language: mockUser.language,
        });

        // Mock saved locations
        setSavedLocations([
          {
            id: "1",
            name: "Service Canada",
            address: "25 St. Clair Ave E, Toronto, ON M4T 3A4",
            type: "government",
          },
          {
            id: "2",
            name: "TD Bank",
            address: "55 King St W, Toronto, ON M5H 3C2",
            type: "bank",
          },
        ]);

        // Mock feedback
        setFeedback([
          {
            id: "1",
            subject: "Map Issue",
            message: "The map is not showing all locations correctly.",
            createdAt: "2023-06-01T09:30:00Z",
            status: "PENDING",
          },
          {
            id: "2",
            subject: "Thank You",
            message:
              "This platform has been very helpful for my transition to Canada.",
            createdAt: "2023-06-03T16:45:00Z",
            status: "RESOLVED",
          },
        ]);

        setIsLoading(false);
      }, 1000);
    }
  }, [status, session]);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // In a real app, this would be an API call
    // For now, we'll simulate an update
    setIsLoading(true);

    setTimeout(() => {
      setUserData({
        ...userData,
        name: formData.name,
        country: formData.country,
        language: formData.language,
      });

      setIsEditing(false);
      setSuccessMessage("Profile updated successfully!");
      setIsLoading(false);

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }, 1000);
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setFormData({
      name: userData.name,
      country: userData.country,
      language: userData.language,
    });
    setIsEditing(false);
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
            <p className="text-gray-600 font-medium">Loading your profile...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Profile Header */}

      <section className="bg-gradient-to-r from-[#D52B1E] to-[#b91c1c] text-white pt-24 pb-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold mr-4">
                {userData.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">
                  {userData.name}
                </h1>
                <p className="text-white/90">{userData.email}</p>
              </div>
            </div>
            <div>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-white text-red-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center"
                >
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
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-grow py-8 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Profile Info */}
            <div className="lg:col-span-2">
              {/* Success Message */}
              {successMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-100 border-l-4 border-green-600 text-green-700 p-4 mb-6"
                >
                  <div className="flex">
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <p>{successMessage}</p>
                  </div>
                </motion.div>
              )}

              {/* Error Message */}
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-100 border-l-4 border-red-600 text-red-700 p-4 mb-6"
                >
                  <div className="flex">
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
                        d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p>{errorMessage}</p>
                  </div>
                </motion.div>
              )}

              {/* Profile Card */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Profile Information
                </h2>

                {isEditing ? (
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-gray-700 mb-2 font-medium"
                        >
                          Full Name
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600"
                          required
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-gray-700 mb-2 font-medium"
                        >
                          Email Address
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={userData.email}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
                          disabled
                        />
                        <p className="text-sm text-gray-500 mt-1">
                          Email cannot be changed
                        </p>
                      </div>

                      <div>
                        <label
                          htmlFor="country"
                          className="block text-gray-700 mb-2 font-medium"
                        >
                          Country of Origin
                        </label>
                        <select
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600"
                        >
                          <option value="">Select your country</option>
                          <option value="Canada">Canada</option>
                          <option value="India">India</option>
                          <option value="China">China</option>
                          <option value="Nigeria">Nigeria</option>
                          <option value="Philippines">Philippines</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="United States">United States</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="language"
                          className="block text-gray-700 mb-2 font-medium"
                        >
                          Preferred Language
                        </label>
                        <select
                          id="language"
                          name="language"
                          value={formData.language}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600"
                        >
                          <option value="">
                            Select your preferred language
                          </option>
                          <option value="English">English</option>
                          <option value="French">French</option>
                          <option value="Spanish">Spanish</option>
                          <option value="Chinese">Chinese</option>
                          <option value="Arabic">Arabic</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div className="flex justify-end space-x-4">
                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">
                          Full Name
                        </h3>
                        <p className="mt-1 text-lg text-gray-800">
                          {userData.name}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">
                          Email Address
                        </h3>
                        <p className="mt-1 text-lg text-gray-800">
                          {userData.email}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">
                          Country of Origin
                        </h3>
                        <p className="mt-1 text-lg text-gray-800">
                          {userData.country || "Not specified"}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">
                          Preferred Language
                        </h3>
                        <p className="mt-1 text-lg text-gray-800">
                          {userData.language || "Not specified"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Account Security */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Account Security
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">
                      Change Password
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Update your password to keep your account secure.
                    </p>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Saved Locations & Feedback */}
            <div>
              {/* Saved Locations */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800">
                    Saved Locations
                  </h2>
                  <a
                    href="/saved-locations"
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    View All
                  </a>
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
                          <a
                            href={`/map?location=${location.id}`}
                            className="text-xs text-red-600 hover:underline mr-4"
                          >
                            View on Map
                          </a>
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
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
