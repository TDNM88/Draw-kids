// In your MyComponent.jsx file
import React, { useState } from 'react';
import { GroqClient } from '@groq/client';

const MyComponent = () => {
  const [subject, setSubject] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCanvasEnabled, setIsCanvasEnabled] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [brushSize, setBrushSize] = useState(5);
  const [isDrawing, setIsDrawing] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const canvasRef = React.useRef(null);

  const playAudioFromText = async (text) => {
    const encodedText = encodeURIComponent(text);
    const audioSrc = `https://www.create.xyz/integrations/text-to-speech/speech?text=${encodedText}`;
    const audio = new Audio(audioSrc);
    audio.play();
  };

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
    const backgroundMusic = new Audio('fun_background_music.mp3');
    backgroundMusic.loop = true;
    backgroundMusic.play();
  }, []);

  return (
    <div>
      {/* Your component code goes here */}
    </div>
  );
}