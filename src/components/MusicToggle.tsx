import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { soundCtrl } from '../utils/audio.ts';

export const MusicToggle: React.FC = () => {
  const [isMuted, setIsMuted] = useState(soundCtrl.getIsMuted());

  useEffect(() => {
    const unsubscribe = soundCtrl.subscribe((muted) => {
      setIsMuted(muted);
    });
    return unsubscribe;
  }, []);

  const handleToggle = () => {
    soundCtrl.toggleMute();
  };

  return (
    <button
      id="music-toggle-btn"
      type="button"
      onClick={handleToggle}
      className="fixed top-5 right-5 sm:top-6 sm:right-8 z-50 flex items-center gap-2.5 group cursor-pointer"
      aria-label={isMuted ? 'Turn on background music' : 'Mute background music'}
      title={isMuted ? 'Play background music' : 'Mute background music'}
    >
      <div
        className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-pink-200 flex items-center justify-center backdrop-blur-md transition-all duration-300 shadow-sm ${
          !isMuted
            ? 'bg-white/70 text-pink-500 shadow-[0_4px_14px_rgba(244,114,182,0.35)] ring-2 ring-pink-300/40'
            : 'bg-white/50 text-pink-400 hover:bg-white/80'
        }`}
      >
        {!isMuted ? (
          <Volume2 className="w-5 h-5 text-pink-500 transition-transform group-hover:scale-110" />
        ) : (
          <VolumeX className="w-5 h-5 text-pink-400/80 transition-transform group-hover:scale-110" />
        )}
      </div>
      <span className="hidden sm:inline-block text-pink-400 font-bold text-xs tracking-widest uppercase select-none">
        {isMuted ? 'Play Music' : 'Mute Music'}
      </span>
    </button>
  );
};
