"use client";
import React, { useState } from "react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Student-focused FAQs
  const faqs = [
    {
      question: "What is Newcomers Canada Hub for students?",
      answer:
        "Newcomers Canada Hub is a comprehensive platform designed specifically for international students in Canada. We provide information about campus resources, student housing, academic support, student discounts, and essential services to help you thrive during your studies in Canada.",
    },
    {
      question: "How can I find student housing near my campus?",
      answer:
        "Our platform offers a dedicated student housing section where you can find on-campus residence options, off-campus apartments, roommate matching services, and temporary accommodations. You can filter by price range, distance from campus, and amenities to find the perfect student housing.",
    },
    {
      question: "What student discounts are available through your platform?",
      answer:
        "We maintain a comprehensive database of student discounts across Canada, including deals on textbooks, technology, food, entertainment, transportation, and more. Simply show your valid student ID at participating locations or use our exclusive discount codes online.",
    },
    {
      question: "How can I connect with other students from my country?",
      answer:
        "Our student community section allows you to find and join cultural associations, international student groups, and country-specific clubs at your university. You can also participate in virtual and in-person meetups organized through our events calendar.",
    },
    {
      question:
        "What academic resources are available for international students?",
      answer:
        "We provide information about tutoring services, writing centers, study groups, library resources, and academic workshops specifically designed for international students. Many of these resources offer specialized support for English language learners.",
    },
    {
      question: "How do I find on-campus jobs and internships?",
      answer:
        "Our career resources section includes listings for on-campus jobs, work-study positions, co-op placements, and internships suitable for international students. We also provide information about work permits, SIN applications, and employment regulations for students.",
    },
    {
      question: "Are there scholarships available for international students?",
      answer:
        "Yes! Our scholarship finder tool helps you discover scholarships, grants, bursaries, and financial aid opportunities specifically for international students. We provide application guidance, deadline reminders, and tips for writing successful scholarship essays.",
    },
    {
      question:
        "How can I navigate the Canadian healthcare system as a student?",
      answer:
        "We offer comprehensive guides to student health insurance plans, campus health services, walk-in clinics, hospitals, and pharmacies near major universities. Our resources explain how to access mental health support, emergency services, and specialized care.",
    },
    {
      question:
        "What support is available for students struggling with coursework?",
      answer:
        "Our platform connects you with academic advisors, tutoring services, study skills workshops, and peer mentors who can help with challenging courses. We also provide resources for time management, exam preparation, and addressing language barriers in academic settings.",
    },
    {
      question: "How can I get involved in campus activities and events?",
      answer:
        "Our events calendar features orientation activities, cultural celebrations, networking opportunities, workshops, and social gatherings happening on campuses across Canada. You can filter events by location, interest, and whether they're specifically for international students.",
    },
    {
      question:
        "What should I do if I'm experiencing culture shock or homesickness?",
      answer:
        "We provide resources for mental health support, cultural adjustment workshops, and community connections to help you navigate the challenges of studying abroad. Many campuses offer counseling services specifically for international students dealing with culture shock, homesickness, or adjustment difficulties.",
    },
    {
      question:
        "How can I prepare for post-graduation work and immigration options?",
      answer:
        "Our career development section includes information about post-graduation work permits, Canadian experience class immigration pathways, networking opportunities, and job search strategies for international graduates. We also connect students with immigration consultants and career advisors specializing in international student transitions.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-red-600 to-white text-white text-center pt-24 pb-32 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80')] bg-cover bg-center"></div>
        </div>

        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Student FAQs</h1>
          <p className="text-xl md:text-2xl mb-6">
            Answers to common questions from international students in Canada
          </p>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="w-full"
          >
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-12 px-4">
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-white border-2 rounded-lg overflow-hidden transition-all duration-300 ${
                activeIndex === index
                  ? "border-[#D52B1E] shadow-lg"
                  : "border-gray-200"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left px-6 py-4 focus:outline-none flex justify-between items-center"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {faq.question}
                </h3>
                <svg
                  className={`w-5 h-5 text-[#D52B1E] transform transition-transform ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              <div
                className={`px-6 transition-all duration-300 overflow-hidden ${
                  activeIndex === index ? "max-h-96 pb-6" : "max-h-0"
                }`}
              >
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-white border-2 border-[#D52B1E] rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-[#D52B1E] mb-4">
            Still Have Questions?
          </h2>
          <p className="text-gray-700 mb-6">
            Our student support team is ready to help with any questions about
            your Canadian education journey.
          </p>
          <a
            href="/contact_us"
            className="inline-block bg-[#D52B1E] text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold"
          >
            Contact Student Support
          </a>
        </div>
      </main>
    </div>
  );
};

export default FAQ;
