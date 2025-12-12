import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [large, setLarge] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    
    const enterInteractive = () => setLarge(true);
    const leaveInteractive = () => setLarge(false);
    
    const hideCursor = () => setHidden(true);
    const showCursor = () => setHidden(false);

    // Mouse move
    window.addEventListener('mousemove', move);
    
    // Interactive elements
    const interactiveElements = document.querySelectorAll('button, a, input, textarea, select, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', enterInteractive);
      el.addEventListener('mouseleave', leaveInteractive);
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', hideCursor);
    document.addEventListener('mouseenter', showCursor);

    return () => {
      window.removeEventListener('mousemove', move);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', enterInteractive);
        el.removeEventListener('mouseleave', leaveInteractive);
      });
      document.removeEventListener('mouseleave', hideCursor);
      document.removeEventListener('mouseenter', showCursor);
    };
  }, []);

  // Don't render on mobile devices
  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) setHidden(true);
  }, []);

  if (hidden) return null;

  return (
    <div
      className={`cursor-dot ${large ? 'cursor-dot--large' : ''}`}
      style={{ 
        left: pos.x, 
        top: pos.y,
        opacity: hidden ? 0 : 1
      }}
      aria-hidden="true"
    />
  );
}