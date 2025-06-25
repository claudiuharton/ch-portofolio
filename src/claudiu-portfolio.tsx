import React, { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  MapPin,
  Calendar,
  ChevronDown,
  Menu,
  X,
  ExternalLink,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "./ThemeContext";

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const { isDark, toggleTheme } = useTheme();

  const industries = [
    "e-commerce",
    "finance",
    "energy",
    "logistics",
    "technology",
    "education",
  ];

  // Typing animation effect
  useEffect(() => {
    let currentIndex = 0;
    let currentText = "";
    let isTyping = true;
    let timeoutId: number;

    const animate = () => {
      const currentWord = industries[currentIndex];

      if (isTyping) {
        // Typing forward
        if (currentText.length < currentWord.length) {
          currentText = currentWord.slice(0, currentText.length + 1);
          setDisplayedText(currentText);
          timeoutId = window.setTimeout(animate, 100);
        } else {
          // Finished typing, wait then start erasing
          timeoutId = window.setTimeout(() => {
            isTyping = false;
            animate();
          }, 1000);
        }
      } else {
        // Erasing backward
        if (currentText.length > 0) {
          currentText = currentText.slice(0, -1);
          setDisplayedText(currentText);
          timeoutId = window.setTimeout(animate, 50);
        } else {
          // Finished erasing, move to next word
          currentIndex = (currentIndex + 1) % industries.length;
          isTyping = true;
          timeoutId = window.setTimeout(animate, 300);
        }
      }
    };

    // Start animation
    timeoutId = window.setTimeout(animate, 500);

    return () => clearTimeout(timeoutId);
  }, []);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500); // Cursor blink speed

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      const nav = document.querySelector("nav");

      if (isMobileMenuOpen && nav && !nav.contains(target)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isMobileMenuOpen]);

  const projects = [
    {
      company: "VOXA",
      role: "Senior Vue.js Frontend Engineer",
      period: "May 2024 - June 2025",
      description:
        "Audio streaming platform startup featured in Forbes, focused on European market expansion and platform modernization",
      highlights: [
        "Led Vue 2 to Vue 3 migration and Nuxt v3 transition",
        "Redesigned architecture with pricing strategy abstraction",
        "Expanded to Spanish, Italian and LATAM markets successfully",
        "Implemented Jest unit tests, Cypress E2E testing, and A/B testing with GrowthBook",
        "Separated business logic to backend following clean architecture principles",
      ],
      tech: [
        "Vue.js",
        "Nuxt.js",
        "Vuex",
        "Pinia",
        "TypeScript",
        "Jest",
        "Cypress",
        "GrowthBook",
        "Docker",
        "GCP",
        "AWS",
      ],
    },
    {
      company: "INNIO GROUP",
      role: "Senior React.js/Java Fullstack Engineer",
      period: "April 2023 - April 2024",
      description:
        "Austrian power station management SaaS platform serving Germany, Austria and Switzerland",
      highlights: [
        "Supported 26,000 power stations across Europe",
        "Achieved 99% uptime target for critical infrastructure",
        "Designed recommendation engine for spare parts optimization",
        "Developed real-time metrics dashboard for uptime, efficiency and audit logs",
        "Built modular customer-facing interface with comprehensive testing",
      ],
      tech: [
        "React",
        "Redux",
        "Java",
        "Spring Boot",
        "TypeScript",
        "GraphQL",
        "Cypress",
        "Mocha",
        "PostgreSQL",
        "AWS",
      ],
    },
    {
      company: "METRO.DIGITAL",
      role: "Senior React.js/Java Fullstack Engineer",
      period: "December 2022 - March 2023",
      description:
        "Wholesale IT solutions for Cash & Carry stores across Europe and Asia",
      highlights: [
        "Integrated 3 new countries in 6 months via robust voucher manager",
        "Migrated from JSF to React for improved front-end performance",
        "Optimized data pooling from JavaEE to REST microservices",
        "Enhanced UX with advanced error handling and multi-step forms",
        "Successfully migrated all services to Google Cloud Platform",
      ],
      tech: [
        "React.js",
        "Redux",
        "Java",
        "Spring Boot",
        "Material UI",
        "TypeScript",
        "PostgreSQL",
        "Oracle",
        "GCP",
      ],
    },
    {
      company: "NN GROUP",
      role: "Senior Vue.js/Node.js Fullstack Engineer",
      period: "January - November 2022",
      description:
        "Financial services platform for retirement packages, pensions, and insurance in the Netherlands",
      highlights: [
        "Served 18M end users with government system integration",
        "Integrated with 3rd-party pension providers using REST APIs",
        "Built forecast and prediction engine with XML to JSON transformation",
        "Reduced technical debt by 20% migrating Vue 2 to Vue 3",
        "Streamlined operations with enhanced UI/UX design",
      ],
      tech: [
        "Vue.js",
        "Node.js",
        "Vuex",
        "TypeScript",
        "Express",
        "PostgreSQL",
        "AWS Lambda",
        "Docker",
      ],
    },
    {
      company: "METRO SYSTEMS",
      role: "Senior Java Fullstack Engineer",
      period: "August 2020 - December 2021",
      description:
        "IT solutions modernization for wholesale Cash & Carry operations",
      highlights: [
        "Improved system efficiency with XML/CSV batch processing",
        "Increased application performance by 30%",
        "Rearchitected ORM and database optimization",
        "Processed approval, campaign and voucher documents at scale",
        "Enhanced UI interface based on JSF and Java",
      ],
      tech: [
        "Java",
        "JSF",
        "Spring Framework",
        "Spring Batch",
        "Hibernate",
        "Oracle DB",
        "IBM WebSphere",
      ],
    },
    {
      company: "FASHION E-COMMERCE",
      role: "Senior Vue.js/Node.js Fullstack Engineer",
      period: "January - July 2020",
      description:
        "Pandemic-driven digital transformation for brick and mortar fashion store",
      highlights: [
        "Built virtual try-on component for online clothing experience",
        "Integrated online and physical store inventory systems",
        "Developed PWA for mobile-first shopping experience",
        "Streamlined operations between physical and digital channels",
      ],
      tech: [
        "Vue.js",
        "Vuex",
        "Node.js",
        "Express",
        "Quasar.js",
        "PWA",
        "PostgreSQL",
        "Heroku",
      ],
    },
    {
      company: "BUCHAREST UNIVERSITY OF ECONOMICS",
      role: "Vue.js/Node.js Fullstack Engineer",
      period: "February 2018 - December 2019",
      description:
        "Modern CRM system for managing employees, students and academic schedules",
      highlights: [
        "Architected greenfield web application from scratch",
        "Increased student-teacher interaction by 25%",
        "Built interactive dashboard for homework and task management",
        "Enhanced user engagement with intuitive UI/UX design",
        "Provided structured global access to academic resources",
      ],
      tech: [
        "Vue.js",
        "Vuex",
        "Node.js",
        "Express",
        "TypeScript",
        "Bootstrap",
        "ElementUI",
        "Sequelize",
      ],
    },
    {
      company: "METRO SYSTEMS",
      role: "React.js/Java Fullstack Engineer",
      period: "February 2017 - January 2018",
      description:
        "Loan management platform for multinational cash and carry operations",
      highlights: [
        "Built greenfield React dashboard with Redux-Saga",
        "Improved operating performance by 50%",
        "Developed live loan status tracking system",
        "Created credit score evaluation system for loan allocation",
        "Implemented predictive analytics for client demand forecasting",
      ],
      tech: [
        "React.js",
        "Redux",
        "Java",
        "Spring Boot",
        "TypeScript",
        "Bootstrap",
        "Hibernate",
        "REST",
      ],
    },
  ];

  const skills = {
    Frontend: [
      "React.js",
      "Vue.js",
      "Next.js",
      "Nuxt.js",
      "TypeScript",
      "JavaScript",
      "Redux",
      "Vuex",
      "Pinia",
      "React Hooks",
      "React Query",
      "Material UI",
      "Tailwind CSS",
    ],
    Backend: [
      "Java",
      "Spring Boot",
      "Spring Framework",
      "Spring Security",
      "Node.js",
      "Express",
      "Python",
      "Django",
      "REST APIs",
      "GraphQL",
      "gRPC",
      "WebSocket",
    ],
    "Cloud & DevOps": [
      "AWS (EC2, S3, Lambda, RDS, DynamoDB)",
      "GCP (Cloud Functions, Compute Engine, Cloud SQL)",
      "Azure (AD, DevOps)",
      "Docker",
      "Kubernetes",
      "Terraform",
      "CI/CD",
      "GitHub Actions",
    ],
    Databases: [
      "PostgreSQL",
      "MongoDB",
      "MySQL",
      "Oracle",
      "Redis",
      "Apache Cassandra",
      "IBM DB2",
      "MariaDB",
    ],
    Architecture: [
      "Microservices",
      "Event-driven",
      "Hexagonal Architecture",
      "CQRS",
      "SOA",
      "MVC",
      "MVVM",
      "PWA",
      "Micro-frontends",
    ],
    "Testing & Quality": [
      "Jest",
      "Cypress",
      "Mocha",
      "JUnit",
      "Selenium",
      "Unit Testing",
      "E2E Testing",
      "TDD",
      "BDD",
    ],
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 relative">
      {/* Simple Abstract Tech Background */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-30 dark:opacity-20">
        {/* Tech Grid Pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Complex Circuit Lines */}
        <div className="absolute inset-0">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="tech-lines"
                x="0"
                y="0"
                width="300"
                height="300"
                patternUnits="userSpaceOnUse"
              >
                {/* Main circuit paths */}
                <path
                  d="M10 15 L45 15 L45 50 L80 50 L80 25 L120 25 M120 25 L120 65 L155 65 L155 35 L190 35 M190 35 L190 75 L225 75 M225 75 L260 75 L260 45 L290 45"
                  stroke={
                    isDark
                      ? "rgba(59, 130, 246, 0.25)"
                      : "rgba(59, 130, 246, 0.18)"
                  }
                  strokeWidth="1.5"
                  fill="none"
                />
                <path
                  d="M25 85 L60 85 L60 120 L95 120 M95 120 L135 120 L135 155 L170 155 M170 155 L205 155 L205 125 L240 125 L240 165 L275 165"
                  stroke={
                    isDark
                      ? "rgba(147, 51, 234, 0.22)"
                      : "rgba(147, 51, 234, 0.16)"
                  }
                  strokeWidth="1"
                  fill="none"
                />
                <path
                  d="M40 185 L75 185 L75 220 L110 220 L110 190 L145 190 L145 225 L180 225 M180 225 L215 225 L215 195 L250 195 L250 235 L285 235"
                  stroke={
                    isDark
                      ? "rgba(16, 185, 129, 0.22)"
                      : "rgba(16, 185, 129, 0.16)"
                  }
                  strokeWidth="1"
                  fill="none"
                />

                {/* Random connecting lines */}
                <path
                  d="M15 245 L50 245 M65 255 L100 255 L100 275 L135 275 M150 265 L185 265 M200 285 L235 285 L235 295 L270 295"
                  stroke={
                    isDark
                      ? "rgba(59, 130, 246, 0.18)"
                      : "rgba(59, 130, 246, 0.12)"
                  }
                  strokeWidth="0.8"
                  fill="none"
                />
                <path
                  d="M30 5 L30 40 M55 30 L90 30 M105 10 L105 45 M125 5 L160 5 M175 20 L175 55 M195 10 L230 10 M245 25 L280 25"
                  stroke={
                    isDark
                      ? "rgba(168, 85, 247, 0.18)"
                      : "rgba(168, 85, 247, 0.12)"
                  }
                  strokeWidth="0.8"
                  fill="none"
                />
                <path
                  d="M70 70 L70 105 M85 90 L115 90 M130 80 L165 80 M180 100 L180 135 M200 90 L235 90 M250 105 L285 105"
                  stroke={
                    isDark
                      ? "rgba(34, 197, 94, 0.18)"
                      : "rgba(34, 197, 94, 0.12)"
                  }
                  strokeWidth="0.8"
                  fill="none"
                />

                {/* Junction points */}
                <circle
                  cx="45"
                  cy="15"
                  r="2"
                  fill={
                    isDark
                      ? "rgba(59, 130, 246, 0.3)"
                      : "rgba(59, 130, 246, 0.22)"
                  }
                />
                <circle
                  cx="80"
                  cy="50"
                  r="2"
                  fill={
                    isDark
                      ? "rgba(59, 130, 246, 0.3)"
                      : "rgba(59, 130, 246, 0.22)"
                  }
                />
                <circle
                  cx="120"
                  cy="25"
                  r="2"
                  fill={
                    isDark
                      ? "rgba(59, 130, 246, 0.3)"
                      : "rgba(59, 130, 246, 0.22)"
                  }
                />
                <circle
                  cx="155"
                  cy="65"
                  r="2"
                  fill={
                    isDark
                      ? "rgba(59, 130, 246, 0.3)"
                      : "rgba(59, 130, 246, 0.22)"
                  }
                />
                <circle
                  cx="225"
                  cy="75"
                  r="2"
                  fill={
                    isDark
                      ? "rgba(59, 130, 246, 0.3)"
                      : "rgba(59, 130, 246, 0.22)"
                  }
                />
                <circle
                  cx="95"
                  cy="120"
                  r="1.5"
                  fill={
                    isDark
                      ? "rgba(147, 51, 234, 0.15)"
                      : "rgba(147, 51, 234, 0.12)"
                  }
                />
                <circle
                  cx="170"
                  cy="155"
                  r="1.5"
                  fill={
                    isDark
                      ? "rgba(147, 51, 234, 0.15)"
                      : "rgba(147, 51, 234, 0.12)"
                  }
                />
                <circle
                  cx="240"
                  cy="125"
                  r="1.5"
                  fill={
                    isDark
                      ? "rgba(147, 51, 234, 0.15)"
                      : "rgba(147, 51, 234, 0.12)"
                  }
                />
                <circle
                  cx="110"
                  cy="220"
                  r="1.5"
                  fill={
                    isDark
                      ? "rgba(16, 185, 129, 0.15)"
                      : "rgba(16, 185, 129, 0.12)"
                  }
                />
                <circle
                  cx="180"
                  cy="225"
                  r="1.5"
                  fill={
                    isDark
                      ? "rgba(16, 185, 129, 0.15)"
                      : "rgba(16, 185, 129, 0.12)"
                  }
                />
                <circle
                  cx="250"
                  cy="195"
                  r="1.5"
                  fill={
                    isDark
                      ? "rgba(16, 185, 129, 0.15)"
                      : "rgba(16, 185, 129, 0.12)"
                  }
                />

                {/* Small connector dots */}
                <circle
                  cx="30"
                  cy="30"
                  r="1"
                  fill={
                    isDark
                      ? "rgba(59, 130, 246, 0.12)"
                      : "rgba(59, 130, 246, 0.08)"
                  }
                />
                <circle
                  cx="105"
                  cy="45"
                  r="1"
                  fill={
                    isDark
                      ? "rgba(168, 85, 247, 0.12)"
                      : "rgba(168, 85, 247, 0.08)"
                  }
                />
                <circle
                  cx="175"
                  cy="55"
                  r="1"
                  fill={
                    isDark
                      ? "rgba(168, 85, 247, 0.12)"
                      : "rgba(168, 85, 247, 0.08)"
                  }
                />
                <circle
                  cx="85"
                  cy="90"
                  r="1"
                  fill={
                    isDark
                      ? "rgba(34, 197, 94, 0.12)"
                      : "rgba(34, 197, 94, 0.08)"
                  }
                />
                <circle
                  cx="165"
                  cy="80"
                  r="1"
                  fill={
                    isDark
                      ? "rgba(34, 197, 94, 0.12)"
                      : "rgba(34, 197, 94, 0.08)"
                  }
                />
                <circle
                  cx="235"
                  cy="90"
                  r="1"
                  fill={
                    isDark
                      ? "rgba(34, 197, 94, 0.12)"
                      : "rgba(34, 197, 94, 0.08)"
                  }
                />
                <circle
                  cx="100"
                  cy="275"
                  r="1"
                  fill={
                    isDark
                      ? "rgba(59, 130, 246, 0.12)"
                      : "rgba(59, 130, 246, 0.08)"
                  }
                />
                <circle
                  cx="185"
                  cy="265"
                  r="1"
                  fill={
                    isDark
                      ? "rgba(59, 130, 246, 0.12)"
                      : "rgba(59, 130, 246, 0.08)"
                  }
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#tech-lines)" />
          </svg>
        </div>

        {/* Geometric Accent Shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 opacity-20 dark:opacity-10">
          <div className="w-full h-full border border-blue-400 dark:border-blue-500 rotate-45 rounded-lg"></div>
        </div>
        <div className="absolute top-1/3 right-16 w-24 h-24 opacity-15 dark:opacity-8">
          <div className="w-full h-full border-2 border-purple-400 dark:border-purple-500 rounded-full"></div>
        </div>
        <div className="absolute bottom-1/4 left-1/4 w-20 h-20 opacity-20 dark:opacity-10">
          <div className="w-full h-full bg-gradient-to-br from-blue-400/20 to-cyan-400/20 dark:from-blue-500/15 dark:to-cyan-500/15 rotate-12 rounded"></div>
        </div>
        <div className="absolute bottom-20 right-1/3 w-16 h-16 opacity-15 dark:opacity-8">
          <div className="w-full h-full border border-green-400 dark:border-green-500 rotate-45"></div>
        </div>
      </div>
      {/* Navigation - Simplified and Mobile-First */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white dark:bg-gray-800 shadow-lg"
            : "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => scrollToSection("home")}
              className="font-bold text-xl text-gray-900 dark:text-gray-100"
            >
              Claudiu Harton
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {["Home", "About", "Projects", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === item.toLowerCase()
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                  }`}
                >
                  {item}
                </button>
              ))}

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 dark:text-gray-300"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
            <div className="px-4 py-4 space-y-1">
              {["Home", "About", "Projects", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    activeSection === item.toLowerCase()
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  {item}
                </button>
              ))}

              {/* Mobile Theme Toggle */}
              <button
                onClick={() => {
                  toggleTheme();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 w-full text-left px-4 py-3 rounded-lg text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
                {isDark ? "Light Mode" : "Dark Mode"}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section - Clean and Minimal */}
      <section
        id="home"
        className="relative z-20 pt-24 pb-12 px-4 min-h-screen flex items-center"
      >
        <div className="max-w-4xl mx-auto w-full">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Hi, I'm Claudiu
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8">
              Senior React Fullstack Engineer
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              9 years of experience building scalable web applications with
              modern technologies
            </p>

            {/* Animated Industries Text with Typing Effect */}
            <div className="mb-12 max-w-2xl mx-auto">
              <p className="text-base text-gray-500 dark:text-gray-400">
                Served industries like{" "}
                <span className="inline-block min-w-[130px] text-left font-mono">
                  <span className="text-blue-600 dark:text-blue-400 font-medium">
                    {displayedText}
                  </span>
                  <span
                    className={`text-blue-600 dark:text-blue-400 font-bold ml-0.5 ${
                      showCursor ? "opacity-100" : "opacity-0"
                    } transition-opacity duration-100`}
                  >
                    |
                  </span>
                </span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:claudiu@harton.digital"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-8 py-4 rounded-full transition-colors text-base font-medium"
              >
                <Mail size={20} />
                Get in Touch
              </a>
              <div className="flex gap-4 justify-center">
                <a
                  href="https://linkedin.com/in/claudiuharton"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="https://github.com/claudiuharton"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  aria-label="GitHub"
                >
                  <Github size={20} />
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center justify-center gap-2 mt-12 text-gray-500 dark:text-gray-400">
              <MapPin size={18} />
              <span>Bucharest, Romania</span>
            </div>

            {/* Scroll Indicator */}
            <div className="mt-16 animate-bounce">
              <ChevronDown
                className="mx-auto text-gray-400 dark:text-gray-500"
                size={32}
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Simplified */}
      <section
        id="about"
        className="relative z-20 py-16 px-4 bg-white dark:bg-gray-800"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">
            About Me
          </h2>

          {/* Hero Quote */}
          <div className="text-center mb-12">
            <blockquote className="text-2xl md:text-3xl font-light text-gray-800 dark:text-gray-200 italic leading-relaxed">
              "I'm a{" "}
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                software artist
              </span>{" "}
              who likes to explore technical software design by resolving
              critical problems for enterprise applications."
            </blockquote>
          </div>

          {/* Main About Content */}
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 border border-blue-100 dark:border-blue-800/30">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full"></span>
                Experience & Expertise
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                I'm a passionate{" "}
                <strong className="text-gray-900 dark:text-gray-100">
                  Senior React.js/Java Fullstack Engineer
                </strong>{" "}
                with{" "}
                <strong className="text-blue-600 dark:text-blue-400">
                  9 years of experience
                </strong>{" "}
                building enterprise-level applications. I specialize in creating
                scalable, user-friendly solutions that drive business growth
                across diverse industries.
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 border border-green-100 dark:border-green-800/30">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full"></span>
                Industry Impact
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Throughout my career, I've worked with companies across{" "}
                <strong className="text-gray-900 dark:text-gray-100">
                  e-commerce, finance, energy, and technology sectors
                </strong>
                , helping them modernize their tech stacks, improve operational
                efficiency, and achieve remarkable business outcomes including
                serving{" "}
                <strong className="text-green-600 dark:text-green-400">
                  18M+ users
                </strong>{" "}
                and managing{" "}
                <strong className="text-green-600 dark:text-green-400">
                  26K+ power stations
                </strong>
                .
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-2xl p-8 border border-purple-100 dark:border-purple-800/30">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 dark:bg-purple-400 rounded-full"></span>
                Technical Excellence
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                My expertise spans the full spectrum of modern web development,
                from architecting robust backend systems with{" "}
                <strong className="text-gray-900 dark:text-gray-100">
                  Java and Spring Boot
                </strong>{" "}
                to crafting intuitive user interfaces with{" "}
                <strong className="text-gray-900 dark:text-gray-100">
                  React and Vue.js
                </strong>
                . I have extensive experience with cloud platforms{" "}
                <strong className="text-purple-600 dark:text-purple-400">
                  (AWS, GCP, Azure)
                </strong>{" "}
                and have successfully led complex migrations and integrations
                for multinational companies.
              </p>
            </div>
          </div>

          {/* Leadership Skills */}
          <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Leadership Skills
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-blue-500 dark:text-blue-400 mt-1">•</span>
                Aligned with business roadmap and drove technical direction for
                e-commerce, finance and energy sectors
              </li>
              <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-blue-500 dark:text-blue-400 mt-1">•</span>
                3rd-party integration with 10 different applications by leading
                dev teams and collaborating with stakeholders
              </li>
              <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-blue-500 dark:text-blue-400 mt-1">•</span>
                Improved collaboration across 4 cross-functional teams, driving
                technical direction across all systems
              </li>
            </ul>
          </div>

          {/* Key Skills Grid */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(skills).map(([category, items]) => (
              <div
                key={category}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
              >
                <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100 mb-3">
                  {category}
                </h3>
                <div className="space-y-1">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="inline-block text-xs bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded mr-1 mb-1"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                26K+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Power Stations Managed
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                18M+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Users Served
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                9
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Years Experience
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                10+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Countries Served
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="mt-12 bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Education
            </h3>
            <div className="space-y-3">
              <div>
                <div className="font-medium text-gray-900 dark:text-gray-100">
                  MSc in E-Business
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  University of Economic Studies, Bucharest • 2020
                </div>
              </div>
              <div>
                <div className="font-medium text-gray-900 dark:text-gray-100">
                  BSc in Computer Science
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  University of Economic Studies, Bucharest • 2018
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section - Card-Based Design */}
      <section
        id="projects"
        className="relative z-20 py-16 px-4 bg-gray-50 dark:bg-gray-900"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">
            Professional Experience
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md dark:shadow-gray-700/20 transition-shadow p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                      {project.company}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 font-medium">
                      {project.role}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-0 flex items-center gap-1 sm:ml-4">
                    <Calendar size={14} />
                    {project.period}
                  </p>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
                  {project.description}
                </p>

                {/* Highlights */}
                <ul className="space-y-1 mb-4">
                  {project.highlights.slice(0, 3).map((highlight, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300"
                    >
                      <span className="text-green-500 dark:text-green-400 mt-0.5 text-xs">
                        ✓
                      </span>
                      {highlight}
                    </li>
                  ))}
                  {project.highlights.length > 3 && (
                    <li className="text-xs text-gray-500 dark:text-gray-400 italic">
                      +{project.highlights.length - 3} more achievements
                    </li>
                  )}
                </ul>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1">
                  {project.tech.slice(0, 6).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 6 && (
                    <span className="px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400 rounded text-xs">
                      +{project.tech.length - 6}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Simple and Direct */}
      <section
        id="contact"
        className="relative z-20 py-16 px-4 bg-white dark:bg-gray-800"
      >
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">
            Let's Connect
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
            I'm always interested in new opportunities and collaborations.
          </p>

          <div className="space-y-4">
            <a
              href="mailto:claudiu@harton.digital"
              className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-8 py-4 rounded-full transition-colors text-lg font-medium max-w-sm mx-auto"
            >
              <Mail size={20} />
              claudiu@harton.digital
            </a>

            <a
              href="tel:+40720543443"
              className="flex items-center justify-center gap-3 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors text-lg"
            >
              <Phone size={20} />
              +40 720 543 443
            </a>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4 mt-12">
            <a
              href="https://linkedin.com/in/claudiuharton"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              <Linkedin size={20} />
              <span>LinkedIn</span>
              <ExternalLink size={16} />
            </a>
            <a
              href="https://github.com/claudiuharton"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              <Github size={20} />
              <span>GitHub</span>
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-20 py-8 px-4 bg-gray-50 dark:bg-gray-900 text-center text-gray-500 dark:text-gray-400">
        <p className="text-sm">© 2025 Claudiu Harton. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Portfolio;
