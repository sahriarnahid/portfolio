import { useEffect, useState, RefObject } from 'react';

export interface EyeCoordinates {
  leftX: number;
  leftY: number;
  rightX: number;
  rightY: number;
}

export function useEyeTracking(avatarRef: RefObject<HTMLDivElement | null>): EyeCoordinates {
  const [coords, setCoords] = useState<EyeCoordinates>({
    leftX: 108,
    leftY: 89,
    rightX: 145,
    rightY: 89,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const avatar = avatarRef.current;
      if (!avatar) return;
      const rect = avatar.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
      const dist = Math.min(2.8, Math.hypot(e.clientX - centerX, e.clientY - centerY) / 45);
      const dx = Math.cos(angle) * dist;
      const dy = Math.sin(angle) * dist;

      setCoords({
        leftX: Number((108 + dx).toFixed(2)),
        leftY: Number((89 + dy).toFixed(2)),
        rightX: Number((145 + dx).toFixed(2)),
        rightY: Number((89 + dy).toFixed(2)),
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [avatarRef]);

  return coords;
}

