import { useEffect, useState, useRef } from "react";

export const useAnimation = (
  id: string,
  lineLength: number,
  onDeleteAttack: (attackId: string) => void
) => {
  const [progress, setProgress] = useState(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      frameRef.current && cancelAnimationFrame(frameRef.current);
    };
  }, []);

  useEffect(() => {
    //1.8 for keeping animation for few seconds after reaching its destination.
    if (progress >= 1.8) {
      frameRef.current && cancelAnimationFrame(frameRef.current);
      onDeleteAttack(id);
    }
  }, [progress]);

  const animate = () => {
    const progressAddition = lineLength > 120 ? lineLength / 80000 : 0.01;
    setProgress((prevProgress) => prevProgress + progressAddition);
    frameRef.current = requestAnimationFrame(animate);
  };

  return { animationProgress: progress * lineLength };
};
