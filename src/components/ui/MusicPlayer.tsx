import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Volume2, VolumeX, Disc3, ExternalLink } from 'lucide-react';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const audioSrc = '/audio/earrings-malcolm-todd.m4a';

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.7;

    const handleTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleEnded = () => {
      // Loop track
      audio.currentTime = 0;
      audio.play().catch(() => setIsPlaying(false));
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    // Global event listeners for Terminal & HUD triggers
    const handleToggle = () => togglePlay();
    const handlePlay = () => playAudio();
    const handlePause = () => pauseAudio();

    window.addEventListener('toggle-music', handleToggle);
    window.addEventListener('play-music', handlePlay);
    window.addEventListener('pause-music', handlePause);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      window.removeEventListener('toggle-music', handleToggle);
      window.removeEventListener('play-music', handlePlay);
      window.removeEventListener('pause-music', handlePause);
    };
  }, []);

  const playAudio = () => {
    if (!audioRef.current) return;
    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch((err) => {
        console.warn('Audio playback blocked or failed:', err);
        setIsPlaying(false);
      });
  };

  const pauseAudio = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <>
      <audio ref={audioRef} src={audioSrc} preload="metadata" />

      {/* Floating Bottom-Left Audio Widget */}
      <div className="fixed bottom-4 left-3 sm:bottom-5 sm:left-5 z-40 select-none">
        <div className="relative">
          {/* Main Floating Capsule */}
          <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className={`flex items-center gap-2 sm:gap-3 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[var(--border-hairline)] bg-[var(--surface)]/90 backdrop-blur-md shadow-xl transition-all duration-300 ${
              isPlaying
                ? 'border-[#FF6B35]/50 shadow-[#FF6B35]/10'
                : 'hover:border-[#FF6B35]/40 hover:bg-[var(--surface-hover)]'
            }`}
          >
            {/* Spinning Disc / Play-Pause Button */}
            <button
              onClick={togglePlay}
              data-hoverable="true"
              aria-label={isPlaying ? 'Pause Music' : 'Play earrings by Malcolm Todd'}
              title={isPlaying ? 'Pause' : 'Play "earrings" — Malcolm Todd'}
              className="relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FF6B35]/15 text-[#FF6B35] hover:scale-110 active:scale-95 transition-all flex-shrink-0"
            >
              {isPlaying ? (
                <div className="relative flex items-center justify-center group/btn">
                  <Disc3 className="w-4 h-4 animate-spin text-[#FF6B35]" style={{ animationDuration: '4s' }} />
                </div>
              ) : (
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              )}
            </button>

            {/* Track Info */}
            <div
              onClick={() => setIsExpanded((prev) => !prev)}
              className="cursor-pointer flex flex-col justify-center min-w-0 pr-0.5 sm:pr-1"
            >
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-[11px] sm:text-xs font-display font-semibold text-[var(--text-primary)] truncate max-w-[65px] sm:max-w-[160px]">
                  earrings
                </span>
                {/* Animated Equalizer Wave Bars when playing */}
                {isPlaying && (
                  <div className="flex items-end gap-0.5 h-2.5 sm:h-3">
                    <span className="w-0.5 bg-[#FF6B35] rounded-full animate-pulse h-2.5 sm:h-3" />
                    <span
                      className="w-0.5 bg-[#FF6B35] rounded-full animate-pulse h-1.5 sm:h-2"
                      style={{ animationDelay: '0.15s' }}
                    />
                    <span
                      className="w-0.5 bg-[#FF6B35] rounded-full animate-pulse h-2 sm:h-3.5"
                      style={{ animationDelay: '0.3s' }}
                    />
                    <span
                      className="w-0.5 bg-[#FF6B35] rounded-full animate-pulse h-1 sm:h-1.5"
                      style={{ animationDelay: '0.45s' }}
                    />
                  </div>
                )}
              </div>
              <span className="text-[9px] sm:text-[10px] font-mono text-[var(--text-secondary)] truncate hidden sm:inline-block">
                Malcolm Todd
              </span>
            </div>

            {/* Quick Mute Button */}
            <button
              onClick={toggleMute}
              data-hoverable="true"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
              className="p-1 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex-shrink-0"
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5 text-red-400" />
              ) : (
                <Volume2 className="w-3.5 h-3.5" />
              )}
            </button>

            {/* Subtle Progress Arc / Line at bottom of pill */}
            {isPlaying && (
              <div className="absolute bottom-0 left-4 right-4 h-[2px] bg-[var(--border-hairline)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#FF6B35] transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
          </motion.div>

          {/* Expandable Track Card */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-14 left-0 w-64 max-w-[calc(100vw-24px)] p-4 rounded-2xl border border-[var(--border-hairline)] bg-[var(--surface)] shadow-2xl z-50 backdrop-blur-md"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-[#1c1c20] border border-[var(--border-hairline)] overflow-hidden flex items-center justify-center flex-shrink-0">
                    <Disc3 className={`w-6 h-6 text-[#FF6B35] ${isPlaying ? 'animate-spin' : ''}`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-display font-bold text-[var(--text-primary)] truncate">
                      Earrings
                    </div>
                    <div className="text-xs font-mono text-[var(--text-secondary)] truncate">
                      Malcolm Todd · Sweet Boy
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[var(--border-hairline)] text-[11px] font-mono">
                  <button
                    onClick={togglePlay}
                    className="text-[#FF6B35] font-semibold hover:underline"
                  >
                    {isPlaying ? 'Pause Track' : 'Play Track'}
                  </button>
                  <a
                    href="https://open.spotify.com/track/6ZpZgV0GjNkVQZ8U0p2nUu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  >
                    <span>Spotify</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};
