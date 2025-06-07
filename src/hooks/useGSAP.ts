import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const useGSAP = () => {
  const timelineRef = useRef<gsap.core.Timeline>();

  useEffect(() => {
    timelineRef.current = gsap.timeline();
    return () => {
      timelineRef.current?.kill();
    };
  }, []);

  const animateIn = (element: HTMLElement | string, options?: gsap.TweenVars) => {
    return gsap.fromTo(element, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", ...options }
    );
  };

  const animateOut = (element: HTMLElement | string, options?: gsap.TweenVars) => {
    return gsap.to(element, 
      { opacity: 0, y: -30, duration: 0.4, ease: "power2.in", ...options }
    );
  };

  const staggerIn = (elements: HTMLElement[] | string, options?: gsap.TweenVars) => {
    return gsap.fromTo(elements,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out", ...options }
    );
  };

  const scaleIn = (element: HTMLElement | string, options?: gsap.TweenVars) => {
    return gsap.fromTo(element,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)", ...options }
    );
  };

  const slideIn = (element: HTMLElement | string, direction: 'left' | 'right' = 'left', options?: gsap.TweenVars) => {
    const x = direction === 'left' ? -100 : 100;
    return gsap.fromTo(element,
      { x, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, ease: "power2.out", ...options }
    );
  };

  return {
    timeline: timelineRef.current,
    animateIn,
    animateOut,
    staggerIn,
    scaleIn,
    slideIn
  };
};