// src/components/ui/CustomCursor.tsx
// Cursor magnético minimalista com estados contextual
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Dot segue imediatamente
      gsap.set(dot, { x: mouseX, y: mouseY });
    };

    // Animação suave do ring com lag
    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      gsap.set(ring, { x: ringX, y: ringY });
      requestAnimationFrame(animate);
    };
    const rafId = requestAnimationFrame(animate);

    // Estados contextuais por tipo de elemento
    const onEnterLink = () => ring.classList.add('hovering-link');
    const onLeaveLink = () => ring.classList.remove('hovering-link');
    const onEnterText = () => ring.classList.add('hovering-text');
    const onLeaveText = () => ring.classList.remove('hovering-text');
    const onEnterImage = () => ring.classList.add('hovering-image');
    const onLeaveImage = () => ring.classList.remove('hovering-image');

    // Delegação de eventos via document
    document.addEventListener('mousemove', onMouseMove);

    const linkEls = document.querySelectorAll('a, button, [data-cursor="link"]');
    const textEls = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, [data-cursor="text"]');
    const imgEls = document.querySelectorAll('img, [data-cursor="image"]');

    linkEls.forEach(el => {
      el.addEventListener('mouseenter', onEnterLink);
      el.addEventListener('mouseleave', onLeaveLink);
    });
    textEls.forEach(el => {
      el.addEventListener('mouseenter', onEnterText);
      el.addEventListener('mouseleave', onLeaveText);
    });
    imgEls.forEach(el => {
      el.addEventListener('mouseenter', onEnterImage);
      el.addEventListener('mouseleave', onLeaveImage);
    });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div id="cursor-dot" ref={dotRef} aria-hidden="true" />
      <div id="cursor-ring" ref={ringRef} aria-hidden="true" />
    </>
  );
}
