import React, { useState, useEffect, useRef } from "react";
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isDark, toggleTheme } = useTheme();

  const industries = [
    "e-commerce",
    "finance",
    "energy",
    "logistics",
    "technology",
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

  // Mouse tracking for background effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animated background canvas effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = (x: number, y: number) => {
      return {
        x,
        y,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        life: 0,
        maxLife: 100 + Math.random() * 100,
      };
    };

    const drawConnections = () => {
      ctx.strokeStyle = isDark
        ? `rgba(59, 130, 246, ${0.15})`
        : `rgba(59, 130, 246, ${0.08})`;
      ctx.lineWidth = 1;

      // Draw lines from cursor to nearby particles
      particles.forEach((particle) => {
        const dx = mousePosition.x - particle.x;
        const dy = mousePosition.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          const opacity = (1 - distance / 150) * 0.3;
          ctx.strokeStyle = isDark
            ? `rgba(59, 130, 246, ${opacity})`
            : `rgba(59, 130, 246, ${opacity * 0.5})`;

          ctx.beginPath();
          ctx.moveTo(mousePosition.x, mousePosition.y);
          ctx.lineTo(particle.x, particle.y);
          ctx.stroke();
        }
      });

      // Draw connections between particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const opacity = (1 - distance / 100) * 0.1;
            ctx.strokeStyle = isDark
              ? `rgba(148, 163, 184, ${opacity})`
              : `rgba(148, 163, 184, ${opacity * 0.5})`;

            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Add new particles occasionally
      if (Math.random() < 0.02 && particles.length < 50) {
        particles.push(
          createParticle(
            Math.random() * canvas.width,
            Math.random() * canvas.height
          )
        );
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life++;

        // Wrap around screen edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Remove old particles
        if (particle.life > particle.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        // Draw particle
        const opacity = Math.max(0, 1 - particle.life / particle.maxLife);
        ctx.fillStyle = isDark
          ? `rgba(148, 163, 184, ${opacity * 0.4})`
          : `rgba(148, 163, 184, ${opacity * 0.2})`;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 1, 0, Math.PI * 2);
        ctx.fill();
      }

      drawConnections();
      animationId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [mousePosition, isDark]);

  const projects = [
    {
      company: "VOXA",
      role: "Senior Vue.js Frontend Engineer",
      period: "May 2024 - June 2025",
      description: "Audio streaming platform featured in Forbes",
      highlights: [
        "Led Vue 2 to Vue 3 migration",
        "Expanded to 3 new markets",
        "99% uptime achieved",
      ],
      tech: ["Vue.js", "Nuxt", "TypeScript", "AWS"],
    },
    {
      company: "INNIO GROUP",
      role: "Senior Fullstack Engineer",
      period: "April 2023 - April 2024",
      description: "Power station management SaaS",
      highlights: [
        "26,000 power stations managed",
        "Real-time metrics dashboard",
        "Recommendation engine design",
      ],
      tech: ["React", "Java", "Spring Boot", "PostgreSQL"],
    },
    {
      company: "METRO.DIGITAL",
      role: "Senior Fullstack Engineer",
      period: "Dec 2022 - March 2023",
      description: "Wholesale IT solutions platform",
      highlights: [
        "3 countries integrated",
        "JSF to React migration",
        "Cloud migration to GCP",
      ],
      tech: ["React.js", "Java", "GCP", "Docker"],
    },
    {
      company: "NN GROUP",
      role: "Fullstack Engineer",
      period: "Jan - Nov 2022",
      description: "Financial services platform",
      highlights: [
        "18M users served",
        "Government system integration",
        "20% technical debt reduction",
      ],
      tech: ["Vue", "Node.js", "PostgreSQL", "AWS"],
    },
  ];

  const skills = {
    Frontend: ["React", "Vue.js", "TypeScript", "Next.js"],
    Backend: ["Java", "Spring Boot", "Node.js", "Python"],
    Cloud: ["AWS", "GCP", "Docker", "Kubernetes"],
    Database: ["PostgreSQL", "MongoDB", "Redis"],
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Animated Background Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ mixBlendMode: "multiply" }}
      />

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
              Claudiu H.
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
                onClick={toggleTheme}
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
        className="pt-24 pb-12 px-4 min-h-screen flex items-center"
      >
        <div className="max-w-4xl mx-auto w-full">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Hi, I'm Claudiu
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8">
              Senior Fullstack Developer
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
      <section id="about" className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">
            About Me
          </h2>

          <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              I'm a passionate fullstack developer with 9 years of experience
              building enterprise-level applications. I specialize in creating
              scalable, user-friendly solutions that drive business growth.
            </p>
            <p>
              Throughout my career, I've worked with companies across
              e-commerce, finance, and energy sectors, helping them modernize
              their tech stacks and improve operational efficiency.
            </p>
          </div>

          {/* Key Skills Grid */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(skills).map(([category, items]) => (
              <div
                key={category}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
              >
                <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100 mb-2">
                  {category}
                </h3>
                <ul className="space-y-1">
                  {items.map((skill) => (
                    <li
                      key={skill}
                      className="text-sm text-gray-600 dark:text-gray-300"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-4 text-center">
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
                Countries
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section - Card-Based Design */}
      <section id="projects" className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">
            Recent Projects
          </h2>

          <div className="space-y-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md dark:shadow-gray-700/20 transition-shadow p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                      {project.company}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {project.role}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-0 flex items-center gap-1">
                    <Calendar size={14} />
                    {project.period}
                  </p>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {project.description}
                </p>

                {/* Highlights */}
                <ul className="space-y-1 mb-4">
                  {project.highlights.map((highlight, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300"
                    >
                      <span className="text-green-500 dark:text-green-400 mt-0.5">
                        •
                      </span>
                      {highlight}
                    </li>
                  ))}
                </ul>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Simple and Direct */}
      <section id="contact" className="py-16 px-4 bg-white dark:bg-gray-800">
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
      <footer className="py-8 px-4 bg-gray-50 dark:bg-gray-900 text-center text-gray-500 dark:text-gray-400">
        <p className="text-sm">© 2025 Claudiu Harton. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Portfolio;
