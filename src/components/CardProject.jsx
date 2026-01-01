import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight } from 'lucide-react';

const isYouTubeUrl = (url) => {
  if (!url) return false;
  return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//i.test(url);
};

const isVimeoUrl = (url) => {
  if (!url) return false;
  return /^(https?:\/\/)?(www\.)?vimeo\.com\//i.test(url);
};

const isVideoFileUrl = (url) => {
  if (!url) return false;
  return /\.(mp4|webm|ogg)(\?.*)?$/i.test(url);
};

const CardProject = ({ Img, Title, Description, Link: ProjectLink, Video, id }) => {
  const [isOpen, setIsOpen] = useState(false);

  const videoType = useMemo(() => {
    if (!Video) return 'none';
    if (isVideoFileUrl(Video)) return 'file';
    if (isYouTubeUrl(Video)) return 'youtube';
    if (isVimeoUrl(Video)) return 'vimeo';
    return 'link';
  }, [Video]);

  const handleViewProject = (e) => {
    if (Video) {
      if (videoType === 'file' || videoType === 'youtube' || videoType === 'vimeo') {
        e.preventDefault();
        setIsOpen(true);
        return;
      }

      window.open(Video, '_blank', 'noopener,noreferrer');
      return;
    }

    if (ProjectLink) {
      window.open(ProjectLink, '_blank', 'noopener,noreferrer');
      return;
    }

    e.preventDefault();
    alert('Live demo link is not available');
  };
  
  const handleDetails = (e) => {
    if (!id) {
      console.log("ID kosong");
      e.preventDefault();
      alert("Project details are not available");
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (evt) => {
      if (evt.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);
  

  return (
    <div className="group relative w-full">
            
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-lg border border-white/10 shadow-2xl transition-all duration-300 hover:shadow-purple-500/20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
    
        <div className="relative p-5 z-10">
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={Img}
              alt={Title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          
          <div className="mt-4 space-y-3">
            <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
              {Title}
            </h3>
            
            <p className="text-gray-300/80 text-sm leading-relaxed line-clamp-2">
              {Description}
            </p>
            
            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={handleViewProject}
                className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
              >
                <span className="text-sm font-medium">View Project</span>
                <ExternalLink className="w-4 h-4" />
              </button>
              
     

              {id ? (
                <Link
                  to={`/project/${id}`}
                  onClick={handleDetails}
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
          
          <div className="absolute inset-0 border border-white/0 group-hover:border-purple-500/50 rounded-xl transition-colors duration-300 -z-50"></div>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          onMouseDown={() => setIsOpen(false)}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
          <div
            className="relative w-full max-w-4xl rounded-2xl bg-gradient-to-br from-slate-900/95 to-slate-800/95 border border-white/10 shadow-2xl overflow-hidden"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-white/10">
              <div className="min-w-0">
                <div className="text-sm sm:text-base font-semibold text-white/90 truncate">{Title}</div>
                <div className="text-xs text-white/50 truncate">Demo Preview</div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 transition-colors"
              >
                Close
              </button>
            </div>

            <div className="p-3 sm:p-4">
              {videoType === 'file' && (
                <video
                  src={Video}
                  controls
                  autoPlay
                  playsInline
                  className="w-full max-h-[70vh] rounded-xl bg-black"
                />
              )}

              {videoType === 'youtube' && (
                <div className="w-full aspect-video rounded-xl overflow-hidden bg-black">
                  <iframe
                    src={Video}
                    title={`${Title} demo video`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              )}

              {videoType === 'vimeo' && (
                <div className="w-full aspect-video rounded-xl overflow-hidden bg-black">
                  <iframe
                    src={Video}
                    title={`${Title} demo video`}
                    className="w-full h-full"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardProject;