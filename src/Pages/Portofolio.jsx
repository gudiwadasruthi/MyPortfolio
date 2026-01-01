import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import Certificate from "../components/Certificate";
import { Link } from "react-router-dom";
import { Code, Award, Boxes, Briefcase, ArrowRight } from "lucide-react";

// Static Projects Data
const projectsData = [
  {
    id: "emotion-music-player",
    Title: "Emotion based music player",
    Description: "An innovative music player that uses facial recognition to detect emotions and play matching music. Built with modern technologies for a personalized music experience.",
    Img: "/ebm.jpg",  // Fallback image
    Video: "https://github.com/gudiwadasruthi/Emotion-Based-Music-Player.git",  // Add your video file here
    Link: "https://github.com/gudiwadasruthi/Emotion-Based-Music-Player.git",  // Replace with your actual project URL
    TechStack: [
      "Flask",
      "TensorFlow",
      "DeepFace",
      "OpenCV(cv2)",
      "HTML",
      "CSS",
      "Selenium",
      "Chrome WebDriver",
      "YouTube Music API",
      "Threading",
      "WebDriverManager"
    ],
    Features: [
      "Real-time emotion recognition system using DeepFace and OpenCV, capable of detecting 6 distinct emotional states (happy, sad, angry, neutral, surprise, fear)",
      "Multi-language music support with specialized playlists for Hindi, Telugu, and English songs",
      "Automated YouTube Music integration using Selenium WebDriver for seamless music playback",
      "Interactive web interface built with Flask, featuring real-time video feed and playback controls",
      "Dynamic playlist generation based on both emotion and language preference"
    ],
    Github: "https://github.com/gudiwadasruthi/Emotion-Based-Music-Player.git"  // Replace with your actual GitHub URL
  },
  {
    id: "ReadWise AI",
    Title: "ReadWise AI",
    Description: "An AI-powered web app to upload PDFs, analyze them with AI, and ask questions about their content. Built for the Adobe Hackathon 2025 with a fast, containerized backend and interactive frontend.",
    Img: "/ReadWiseAI.jpeg",  // Fallback image
    Video: "https://pdf-chatbot-chi.vercel.app/",  // Add your demo video file here
    Link: "https://pdf-chatbot-chi.vercel.app/",  // Live demo link
    TechStack: [
      "FastAPI",
      "Python",
      "PyMuPDF",
      "pdfplumber",
      "pytesseract",
      "Sentence-Transformers",
      "Torch",
      "scikit-learn",
      "NLTK",
      "HTML",
      "CSS",
      "Vanilla JavaScript",
      "Docker",
      "Vercel (Frontend)",
      "Render (Backend)"
    ],
    Features: [
      "Multi-PDF Uploads – Easily drag, drop, and analyze multiple PDF files at once.",
      "AI-Powered Insights – Get smart summaries, key points, and explanations powered by NLP.",
      "Persona & Task Based Analysis – Tailor document insights to specific roles or use cases.",
      "Semantic Search – Instantly find the most relevant sections using transformer-based ranking.",
      "Quick Summaries – Generate concise takeaways for faster reading and understanding.",
      "Modern Frontend – Animated, responsive UI with progress tracking and interactive modals.",
      "Dockerized Backend – Portable, secure, and deployment-ready with full containerization.",
      "Privacy First – Files processed securely with no in-browser embedding or chat history storage."
    ],
    Github: "https://github.com/gudiwadasruthi/PDF_CHATBOT.git"  // Replace if different
  },  
  
  {
    
  id: "nexoff-offline-ai-chatbot",
  Title: "NEX_OFF – Offline AI Chatbot with Document Intelligence",
  Description:
    "An offline-first AI-powered desktop chatbot that enables intelligent document-based question answering, speech interaction, and secure local processing without relying on constant internet connectivity.",
  Img: "/nexoff.jpeg", // Fallback image (replace with your banner or screenshot)
  Video: "https://github.com/gudiwadasruthi/NEX_OFF", // Demo or repo link
  Link: "https://github.com/gudiwadasruthi/NEX_OFF",
  TechStack: [
    "Python",
    "Flask",
    "Electron.js",
    "HTML",
    "CSS",
    "JavaScript",
    "Bootstrap 5",
    "SQLite",
    "RAG (Retrieval-Augmented Generation)",
    "Vosk Speech Recognition",
    "PDF.js",
    "Docker"
  ],
  Features: [
    "Offline-first AI chatbot capable of running fully on local systems without internet dependency",
    "Document Intelligence system that allows users to upload PDFs and ask contextual questions using RAG",
    "Hybrid AI architecture supporting both local processing and optional cloud-based LLM integration",
    "Built-in offline speech-to-text functionality using Vosk for voice-based interaction",
    "Cross-platform desktop application developed with Electron.js for Windows, macOS, and Linux",
    "Secure local data storage using SQLite ensuring complete data privacy",
    "Modern and responsive user interface with Light and Dark mode support",
    "Dockerized backend for easy deployment and environment consistency"
  ],
  Github: "https://github.com/gudiwadasruthi/NEX_OFF"

  },
  {
  id: "showbuzz-movie-ticket-booking",
  Title: "ShowBuzz – Online Movie Ticket Booking System",
  Description:
    "A full-stack web application for online movie ticket booking that allows users to browse movies, select theaters and showtimes, choose seats interactively, and book tickets instantly through a user-friendly interface.",
  Img: "/showbuzz.jpeg", // Fallback image (use banner or screenshot)
  Video: "https://github.com/gudiwadasruthi/Movie-ticket-booking", // Demo or repo link
  Link: "https://github.com/gudiwadasruthi/Movie-ticket-booking",
  TechStack: [
    "HTML5",
    "CSS3",
    "Bootstrap 5",
    "JavaScript (ES6)",
    "PHP",
    "MySQL",
    "REST-style APIs",
    "XAMPP / WAMP",
    "VS Code"
  ],
  Features: [
    "User-friendly online movie ticket booking system inspired by real-world platforms like BookMyShow",
    "Secure login system with role-based access for users and administrators",
    "Browse movies with details such as language, duration, ratings, and showtimes",
    "Interactive seat selection interface showing available, selected, and booked seats",
    "Real-time ticket booking and confirmation stored in a MySQL database",
    "Admin dashboard to manage movies, theaters, showtimes, and bookings",
    "Well-structured backend APIs for frontend–database communication",
    "Responsive UI built using Bootstrap for seamless experience across devices"
  ],
  Github: "https://github.com/gudiwadasruthi/Movie-ticket-booking"
},
{
  id: "smart-crime-reporting-system",
  Title: "Smart Crime Reporting System",
  Description:
    "A web-based platform that enables citizens to report crimes anonymously, share real-time location, and upload photo or video evidence to ensure faster and safer incident reporting.",
  Img: "/smart-crime.jpeg", // Fallback image (use banner or screenshot)
  Video: "https://smart-crime-reporting.onrender.com/",
  Link: "https://smart-crime-reporting.onrender.com/",
  TechStack: [
    "HTML5",
    "CSS3",
    "JavaScript",
    "Node.js",
    "Express.js",
    "REST APIs",
    "Geolocation API",
    "Media Capture API",
    "Multer",
    "File System Storage",
    "Render (Deployment)"
  ],
  Features: [
    "Anonymous crime reporting system to reduce fear of retaliation and encourage public participation",
    "Real-time GPS location detection for faster and accurate emergency response",
    "Photo and video evidence capture directly from the browser using Media APIs",
    "Emergency SOS feature for immediate help during critical situations",
    "Responsive user interface optimized for both mobile and desktop devices",
    "RESTful backend APIs built with Node.js and Express for efficient data handling",
    "Secure file upload and organized report storage using server-side validation",
    "Deployed on Render with HTTPS support enabling camera and location permissions"
  ],
  Github: "https://github.com/gudiwadasruthi/Smart-Crime-Reporting"
},


];

const experienceData = [
  {
    id: "exp1",
    role: "Salesforce Developer Intern",
    company: "Salesforce",
    location: "Remote",
    period: "June 2025 – July 2025",
    type: "Internship",
    certificateImg: "/Salesforce.png",
    highlights: [
      "Worked on Salesforce backend development using Apex and SOQL",
      "Developed and maintained Apex Triggers, Handler classes, and Batch jobs",
      "Implemented scheduled automation for order processing and stock updates",
      "Debugged and fixed compile-time and logic errors to improve system reliability",
    ],
    tech: ["Salesforce", "Apex", "SOQL", "Triggers", "Batch Apex"],
  },
];

// Static Certificates Data
const certificatesData = [
  {
    id: "cert1",
    title: "Hackathon participation certificate",
    issuer: "SRM University AP",
    date: "29th May 2025",
    image: "/hackthon certificate.jpg"  // Fixed filename to match actual file
  },
  {
    id: "cert2",
    title: "Hackathon participation certificate",
    issuer: "SRM University AP",
    date: "29th May 2025",
    image: "Salesforce.png"  // Fixed filename to match actual file
  },
  {
    id: "cert3",
    title: "Hackathon participation certificate",
    issuer: "SRM University AP",
    date: "29th May 2025",
    image: "AdobeHackthon.png"  // Fixed filename to match actual file
  },

  {
    id: "cert4",
    title: "Google Agentic AI Day",
    issuer: "Google AI",
    date: "June 2025",
    image: "Google_Agentic_AI.png"
  },

  {
    id: "cert5",
    title: "Machine Learning Basics - Infosis Springboard",
    issuer: "Infosis",
    date: "July 2025",
    image: "Infosis_ML_Basics.png"
  }

];

// Tech Stack Icons
const techStacks = [
  // Core Programming
  { icon: "c.svg.png", language: "C" },
  { icon: "cpp.svg", language: "C++" },
  { icon: "python.svg", language: "Python" },
  { icon: "sql.svg", language: "SQL" },

  // Web Development
  { icon: "html.svg", language: "HTML" },
  { icon: "css.svg", language: "CSS" },
  { icon: "javascript.svg", language: "JavaScript" },
  { icon: "bootstrap.svg", language: "Bootstrap" },
  { icon: "flask.svg", language: "Flask" },
  { icon: "fastapi.svg", language: "FastAPI" },

  // AI / ML
  { icon: "opencv.svg", language: "OpenCV" },
  { icon: "tensorflow.svg", language: "TensorFlow" },
  { icon: "pytorch.svg", language: "PyTorch" },
  { icon: "nltk.svg", language: "NLTK" },

  // Tools & DevOps
  { icon: "git.svg", language: "Git" },
  { icon: "docker.svg", language: "Docker" },
  { icon: "selenium.svg", language: "Selenium" },

  // Deployment / Hosting
  { icon: "vercel.svg", language: "Vercel" },
  { icon: "render.svg", language: "Render" }
];



// Separate ShowMore/ShowLess button component
const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="
      px-3 py-1.5
      text-slate-300 
      hover:text-white 
      text-sm 
      font-medium 
      transition-all 
      duration-300 
      ease-in-out
      flex 
      items-center 
      gap-2
      bg-white/5 
      hover:bg-white/10
      rounded-md
      border 
      border-white/10
      hover:border-white/20
      backdrop-blur-sm
      group
      relative
      overflow-hidden
    "
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`
          transition-transform 
          duration-300 
          ${isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"}
        `}
      >
        <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full"></span>
  </button>
);

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  useEffect(() => {
    AOS.init({
      once: false,
    });
    // Store in localStorage for other components to use
    localStorage.setItem("projects", JSON.stringify(projectsData));
    localStorage.setItem("certificates", JSON.stringify(certificatesData));
    localStorage.setItem("experience", JSON.stringify(experienceData));
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleShowMore = useCallback((type) => {
    if (type === 'projects') {
      setShowAllProjects(prev => !prev);
    } else {
      setShowAllCertificates(prev => !prev);
    }
  }, []);

  const displayedProjects = showAllProjects ? projectsData : projectsData.slice(0, initialItems);
  const displayedCertificates = showAllCertificates ? certificatesData : certificatesData.slice(0, initialItems);

  return (
    <div className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden" id="Portofolio">
      {/* Header section - unchanged */}
      <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          <span style={{
            color: '#6366f1',
            backgroundImage: 'linear-gradient(45deg, #6366f1 10%, #a855f7 93%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Portfolio Showcase
          </span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Explore my journey through projects, certifications, and technical expertise. 
          Each section represents a milestone in my continuous learning path.
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        {/* AppBar and Tabs section - unchanged */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(180deg, rgba(139, 92, 246, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)",
              backdropFilter: "blur(10px)",
              zIndex: 0,
            },
          }}
          className="md:px-4"
        >
          {/* Tabs remain unchanged */}
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            sx={{
              // Existing styles remain unchanged
              minHeight: "70px",
              "& .MuiTab-root": {
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: "600",
                color: "#94a3b8",
                textTransform: "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                padding: "20px 0",
                zIndex: 1,
                margin: "8px",
                borderRadius: "12px",
                "&:hover": {
                  color: "#ffffff",
                  backgroundColor: "rgba(139, 92, 246, 0.1)",
                  transform: "translateY(-2px)",
                  "& .lucide": {
                    transform: "scale(1.1) rotate(5deg)",
                  },
                },
                "&.Mui-selected": {
                  color: "#fff",
                  background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))",
                  boxShadow: "0 4px 15px -3px rgba(139, 92, 246, 0.2)",
                  "& .lucide": {
                    color: "#a78bfa",
                  },
                },
              },
              "& .MuiTabs-indicator": {
                height: 0,
              },
              "& .MuiTabs-flexContainer": {
                gap: "8px",
              },
            }}
          >
            <Tab
              icon={<Code className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Projects"
              {...a11yProps(0)}
            />
            <Tab
              icon={<Award className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Certificates"
              {...a11yProps(1)}
            />
            <Tab
              icon={<Boxes className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Tech Stack"
              {...a11yProps(2)}
            />
            <Tab
              icon={<Briefcase className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Experience"
              {...a11yProps(3)}
            />
          </Tabs>
        </AppBar>

        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={setValue}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
                {displayedProjects.map((project, index) => (
                  <div
                    key={project.id || index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <CardProject
                      Img={project.Img}
                      Video={project.Video}
                      Title={project.Title}
                      Description={project.Description}
                      Link={project.Link}
                      id={project.id}
                    />
                  </div>
                ))}
              </div>
            </div>
            {projectsData.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore('projects')}
                  isShowingMore={showAllProjects}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={1} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 gap-4">
                {displayedCertificates.map((certificate, index) => (
                  <div
                    key={index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <Certificate ImgSertif={certificate.image} />
                  </div>
                ))}
              </div>
            </div>
            {certificatesData.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore('certificates')}
                  isShowingMore={showAllCertificates}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={2} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-8 gap-5">
                {techStacks.map((stack, index) => (
                  <div
                    key={index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <TechStackIcon TechStackIcon={stack.icon} Language={stack.language} />
                  </div>
                ))}
              </div>
            </div>
          </TabPanel>

          <TabPanel value={value} index={3} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5 w-full">
                {experienceData.map((exp, index) => (
                  <div
                    key={exp.id || index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                    className="relative"
                  >
                    <div className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden h-full">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1]/10 to-[#a855f7]/10" />

                      <div className="relative p-6 space-y-4">
                        <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/20">
                          <img
                            src={exp.certificateImg || "/Salesforce.png"}
                            alt={exp.role}
                            className="w-full h-44 object-cover transform transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>

                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-1">
                            <h3 className="text-white font-semibold text-lg leading-snug">{exp.role}</h3>
                            <p className="text-slate-300 text-sm">
                              {exp.company}
                              {exp.location ? ` • ${exp.location}` : ""}
                            </p>
                          </div>

                          <div className="text-right">
                            <p className="text-slate-400 text-xs whitespace-nowrap">{exp.period}</p>
                            <p className="text-slate-400 text-xs whitespace-nowrap">{exp.type}</p>
                          </div>
                        </div>

                        {Array.isArray(exp.highlights) && exp.highlights.length > 0 && (
                          <p className="text-gray-300/80 text-sm leading-relaxed line-clamp-2">
                            {exp.highlights[0]}
                          </p>
                        )}

                        <div className="pt-2 flex items-center justify-end">
                          {exp.id ? (
                            <Link
                              to={`/experience/${exp.id}`}
                              className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/90 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                            >
                              <span className="text-sm font-medium">Details</span>
                              <ArrowRight className="w-4 h-4" />
                            </Link>
                          ) : (
                            <span className="text-gray-500 text-sm">Details Not Available</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabPanel>
        </SwipeableViews>
      </Box>
    </div>
  );
}