import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Briefcase, ChevronRight, MapPin, CalendarDays, Building2 } from "lucide-react";

const ExperienceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [experience, setExperience] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const stored = JSON.parse(localStorage.getItem("experience")) || [];
    const selected = stored.find((e) => String(e.id) === String(id));
    setExperience(selected || null);
  }, [id]);

  const heroImg = useMemo(() => {
    if (!experience) return null;
    return experience.Img || experience.image || experience.certificateImg || "/Salesforce.png";
  }, [experience]);

  if (!experience) {
    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center">
        <div className="text-center space-y-6 animate-fadeIn">
          <div className="w-16 h-16 md:w-24 md:h-24 mx-auto border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
          <h2 className="text-xl md:text-3xl font-bold text-white">Loading Experience...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030014] px-[2%] sm:px-0 relative overflow-hidden">
      <div className="fixed inset-0">
        <div className="absolute -inset-[10px] opacity-20">
          <div className="absolute top-0 -left-4 w-72 md:w-96 h-72 md:h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
          <div className="absolute top-0 -right-4 w-72 md:w-96 h-72 md:h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 md:w-96 h-72 md:h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
        </div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
      </div>

      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16">
          <div className="flex items-center space-x-2 md:space-x-4 mb-8 md:mb-12 animate-fadeIn">
            <button
              onClick={() => navigate(-1)}
              className="group inline-flex items-center space-x-1.5 md:space-x-2 px-3 md:px-5 py-2 md:py-2.5 bg-white/5 backdrop-blur-xl rounded-xl text-white/90 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20 text-sm md:text-base"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back</span>
            </button>
            <div className="flex items-center space-x-1 md:space-x-2 text-sm md:text-base text-white/50">
              <span>Experience</span>
              <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
              <span className="text-white/90 truncate">{experience.role}</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-16">
            <div className="space-y-6 md:space-y-10 animate-slideInLeft">
              <div className="space-y-4 md:space-y-6">
                <h1 className="text-3xl md:text-6xl font-bold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
                  {experience.role}
                </h1>
                <div className="relative h-1 w-16 md:w-24">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-sm" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                <div className="flex items-center gap-3 p-3 md:p-4 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10">
                  <Building2 className="w-5 h-5 text-blue-300" />
                  <div>
                    <div className="text-xs text-white/50">Company</div>
                    <div className="text-sm md:text-base text-white/90">{experience.company}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 md:p-4 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10">
                  <MapPin className="w-5 h-5 text-purple-300" />
                  <div>
                    <div className="text-xs text-white/50">Location</div>
                    <div className="text-sm md:text-base text-white/90">{experience.location}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 md:p-4 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10">
                  <CalendarDays className="w-5 h-5 text-pink-300" />
                  <div>
                    <div className="text-xs text-white/50">Period</div>
                    <div className="text-sm md:text-base text-white/90">{experience.period}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 md:p-4 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10">
                  <Briefcase className="w-5 h-5 text-indigo-300" />
                  <div>
                    <div className="text-xs text-white/50">Type</div>
                    <div className="text-sm md:text-base text-white/90">{experience.type}</div>
                  </div>
                </div>
              </div>

              {Array.isArray(experience.tech) && experience.tech.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg md:text-xl font-semibold text-white/90">Tech Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {experience.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 text-xs font-medium text-slate-200 bg-black/30 border border-white/10 rounded-full"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {Array.isArray(experience.highlights) && experience.highlights.length > 0 && (
                <div className="bg-white/[0.02] backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-white/10 space-y-4 hover:border-white/20 transition-colors duration-300">
                  <h3 className="text-xl font-semibold text-white/90">Key Responsibilities</h3>
                  <ul className="list-none space-y-2">
                    {experience.highlights.map((h, i) => (
                      <li key={i} className="flex gap-2 text-slate-300 text-sm md:text-base">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] shrink-0" />
                        <span className="leading-relaxed">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="space-y-6 md:space-y-10 animate-slideInRight">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src={heroImg}
                  alt={experience.role}
                  className="w-full object-cover transform transition-transform duration-700 will-change-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/10 transition-colors duration-300 rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 10s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-fadeIn {
          animation: fadeIn 0.7s ease-out;
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.7s ease-out;
        }
        .animate-slideInRight {
          animation: slideInRight 0.7s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ExperienceDetail;
