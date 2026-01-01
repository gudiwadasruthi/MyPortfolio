import React, { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
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

const isGoogleDriveUrl = (url) => {
  if (!url) return false;
  return /^(https?:\/\/)?(www\.)?drive\.google\.com\//i.test(url);
};

const toGoogleDrivePreviewUrl = (url) => {
  if (!isGoogleDriveUrl(url)) return url;
  // Match /file/d/<ID>/
  const matchFile = url.match(/drive\.google\.com\/file\/d\/([^/]+)\//i);
  if (matchFile && matchFile[1]) return `https://drive.google.com/file/d/${matchFile[1]}/preview`;
  // Match id=<ID>
  const matchId = url.match(/[?&]id=([^&]+)/i);
  if (matchId && matchId[1]) return `https://drive.google.com/file/d/${matchId[1]}/preview`;
  return url;
};

const toGoogleDriveDownloadUrl = (url) => {
  if (!isGoogleDriveUrl(url)) return url;
  const matchFile = url.match(/drive\.google\.com\/file\/d\/([^/]+)\//i);
  const id = matchFile && matchFile[1] ? matchFile[1] : (url.match(/[?&]id=([^&]+)/i)?.[1] || null);
  return id ? `https://drive.google.com/uc?export=download&id=${id}` : url;
};

const toYouTubeEmbedUrl = (url) => {
  if (!url) return url;
  // youtu.be/<id>
  let m = url.match(/youtu\.be\/([\w-]{11})/i);
  if (m) return `https://www.youtube.com/embed/${m[1]}`;
  // youtube.com/watch?v=<id>
  m = url.match(/[?&]v=([\w-]{11})/i);
  if (m) return `https://www.youtube.com/embed/${m[1]}`;
  // already embed
  if (/youtube\.com\/embed\//i.test(url)) return url;
  return url;
};

const toVimeoEmbedUrl = (url) => {
  if (!url) return url;
  const m = url.match(/vimeo\.com\/(\d+)/i);
  if (m) return `https://player.vimeo.com/video/${m[1]}`;
  return url;
};

const resolvePublicAssetUrl = (url) => {
  if (!url) return url;
  if (/^https?:\/\//i.test(url)) return url;

  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;

  if (url.startsWith('/')) return `${normalizedBase}${url.slice(1)}`;
  return `${normalizedBase}${url}`;
};

const CardProject = ({ Img, Title, Description, Link: ProjectLink, Video, id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timedOut, setTimedOut] = useState(false);

  const videoType = useMemo(() => {
    if (!Video) return 'none';
    if (isVideoFileUrl(Video)) return 'file';
    if (isYouTubeUrl(Video)) return 'youtube';
    if (isVimeoUrl(Video)) return 'vimeo';
    if (isGoogleDriveUrl(Video)) return 'gdrive';
    return 'link';
  }, [Video]);

  const resolvedVideoUrl = useMemo(() => {
    if (!Video) return Video;
    if (videoType === 'file') return resolvePublicAssetUrl(Video);
    return Video;
  }, [Video, videoType]);

  const handleViewProject = (e) => {
    if (Video) {
      if (videoType === 'file' || videoType === 'youtube' || videoType === 'vimeo' || videoType === 'gdrive') {
        e.preventDefault();
        setTimedOut(false);
        setIsLoading(true);
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
    const t = window.setTimeout(() => setTimedOut(true), 8000);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.clearTimeout(t);
    };
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

      {isOpen && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center px-3 sm:px-4 py-4"
          role="dialog"
          aria-modal="true"
          onMouseDown={() => setIsOpen(false)}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
          <div
            className="relative w-full sm:w-[90vw] md:w-[75vw] md:h-[75vh] max-w-4xl max-h-[85vh] rounded-2xl bg-gradient-to-br from-slate-900/95 to-slate-800/95 border border-white/10 shadow-2xl overflow-hidden flex flex-col"
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

            <div className="flex-1 min-h-0 p-3 sm:p-4">
              {videoType === 'file' && (
                <video
                  src={resolvedVideoUrl}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full rounded-xl bg-black object-contain"
                />
              )}

              {videoType === 'youtube' && (
                <div className="w-full h-full rounded-xl overflow-hidden bg-black">
                  <iframe
                    src={toYouTubeEmbedUrl(Video)}
                    title={`${Title} demo video`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    onLoad={() => setIsLoading(false)}
                  />
                </div>
              )}

              {videoType === 'vimeo' && (
                <div className="w-full h-full rounded-xl overflow-hidden bg-black">
                  <iframe
                    src={toVimeoEmbedUrl(Video)}
                    title={`${Title} demo video`}
                    className="w-full h-full"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    onLoad={() => setIsLoading(false)}
                  />
                </div>
              )}

              {videoType === 'gdrive' && (
                <div className="w-full h-full rounded-xl overflow-hidden bg-black">
                  <iframe
                    src={toGoogleDrivePreviewUrl(Video)}
                    title={`${Title} demo video`}
                    className="w-full h-full"
                    allow="autoplay"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    onLoad={() => setIsLoading(false)}
                  />
                </div>
              )}
            </div>
            {isLoading && !timedOut && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <div className="h-10 w-10 rounded-full border-2 border-white/20 border-t-white animate-spin"></div>
              </div>
            )}

            {(timedOut) && (
              <div className="px-4 pb-4 text-center text-white/80">
                <div className="text-sm mb-3">The embedded player is taking longer than usual.</div>
                <div className="flex items-center justify-center gap-3">
                  <a
                    href={videoType === 'gdrive' ? toGoogleDrivePreviewUrl(Video) : (videoType === 'file' ? resolvedVideoUrl : Video)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    Open in new tab
                  </a>
                  {videoType === 'gdrive' && (
                    <a
                      href={toGoogleDriveDownloadUrl(Video)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      Download
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default CardProject;