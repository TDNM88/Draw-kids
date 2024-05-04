import React, { useState, useClientEffect } from 'react';
import { GroqClient } from '@groq/client';

function MyComponent() {
  const [data, setData] = useState(null);

  useClientEffect(() => {
const groqClient = new GroqClient(process.env.GROQ_API_KEY);

function MainComponent() {
  const [subject, setSubject] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCanvasEnabled, setIsCanvasEnabled] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [brushSize, setBrushSize] = useState(5);
  const [isDrawing, setIsDrawing] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const canvasRef = React.createRef();

  const playAudioFromText = async (text) => {
    const encodedText = encodeURIComponent(text);
    const audioSrc = `https://www.create.xyz/integrations/text-to-speech/speech?text=${encodedText}`;
    const audio = new Audio(audioSrc);
    audio.play();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
    const backgroundMusic = new Audio("fun_background_music.mp3");
    backgroundMusic.loop = true;
    backgroundMusic.play();
    return () => {
      backgroundMusic.pause();
    };
  }, []);

  const getSubject = async () => {
    setIsLoading(true);
    const query = `query { dictionary { randomWord } }`;
    const response = await groqClient.query(query);
    const randomWord = response.data.dictionary.randomWord;
    setSubject(randomWord);
    setIsLoading(false);
    setIsCanvasEnabled(true);
    playAudioFromText(randomWord);
  };

  const requestReview = async () => {
    setIsLoading(true);
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL("image/png").split(",")[1];
    const textContent =
      parseInt(age) < 6
        ? "Easy criteria for children under 6 years old.\n"
        : "";
    const query = `query { gptVision { evaluate(image: "${dataURL}") } }`;
    const response = await groqClient.query(query);
    const result = response.data.gptVision.evaluate;
    setEvaluationResult(result);
    setIsLoading(false);
    playAudioFromText(result);
  };

  const handleRetry = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
    setSubject("");
    setIsCanvasEnabled(false);
    setEvaluationResult(null);
  };

  const handlePenClick = () => setBrushSize(5);
  const handleEraserClick = () => setBrushSize(30);

  const adjustPosition = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scale = {
      x: canvas.width / rect.width,
      y: canvas.height / rect.height,
    };
    let x, y;
    if (e.touches) {
      x = (e.touches[0].clientX - rect.left) * scale.x;
      y = (e.touches[0].clientY - rect.top) * scale.y;
    } else {
      x = (e.clientX - rect.left) * scale.x;
      y = (e.clientY - rect.top) * scale.y;
    }
    return { x, y };
  };

  const startDrawing = (e) => {
    e.preventDefault();
    if (!isCanvasEnabled) return;
    setIsDrawing(true);
    const { x, y } = adjustPosition(e);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.lineWidth = brushSize;
        ctx.lineCap = "round";
        ctx.strokeStyle = brushSize === 30 ? "#FFFFFF" : "#000000";
        ctx.beginPath();
        ctx.moveTo(x, y);
      }
    }
  };

  const draw = (e) => {
    e.preventDefault();
    if (!isDrawing) return;
    const { x, y } = adjustPosition(e);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.lineTo(x, y);
        ctx.stroke();
      }
    }
  };

  const stopDrawing = (e) => {
    e.preventDefault();
    setIsDrawing(false);
  };

  return (
    <div className="min-h-screen bg-[#e0f7fa] font-roboto">
      <h1 className="text-[28px] font-bold text-center pt-[32px] pb-4 text-[#34495e]">
        TẬP VẼ CÙNG AI
      </h1>
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-6">
        {name === "" || age === "" ? (
          <div>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập tên"
              className="border-2 border-gray-300 p-2 rounded mr-4 w-1/2"
            />
            <input
              type="number"
              name="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Nhập tuổi"
              className="border-2 border-gray-300 p-2 rounded w-1/4"
            />
          </div>
        ) : (
          <>
            {subject ? (
              <p className="text-xl mb-4 text-[#16a085]">
                Chủ đề: {subject.split(" / ")[0]} / Subject: {subject.split(" / ")[1]}
              </p>
            ) : (
              <button
                className={
                  "bg-[#3498db] hover:bg-[#2980b9] text-white px-4 py-2 rounded-full " +
                  (isLoading ? "opacity-50 cursor-not-allowed" : "")
                }
                onClick={getSubject}
                disabled={isLoading}
              >
                Lấy chủ đề
              </button>
            )}
            <canvas
              ref={canvasRef}
              className="border-2 border-gray-200 rounded mt-4 w-full"
              style={{ touchAction: "none", backgroundColor: "#ecf0f1" }}
              width="1024"
              height="768"
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
            />
            <div className="mt-4 flex justify-center space-x-6">
              <button
                className="text-[#8e44ad] hover:text-[#9b59b6] px-2 py-1 rounded"
                onClick={handlePenClick}
              >
                <i className="fas fa-pen text-xl"></i>
              </button>
              <button
                className="text-[#c0392b] hover:text-[#e74c3c] px-2 py-1 rounded"
                onClick={handleEraserClick}
              >
                <i className="fas fa-eraser text-2xl"></i>
              </button>
            </div>
            {evaluationResult && (
              <div className="mt-6 bg-white p-4 shadow-md rounded-lg">
                <p className="text-lg mb-2 font-bold text-[#e74c3c] whitespace-pre-wrap">
                  {evaluationResult}
                </p>
              </div>
            )}
            <div className="mt-6 space-x-6">
              {subject && (
                <>
                  <button
                    className={
                      "bg-[#3498db] hover:bg-[#2980b9] text-white px-4 py-2 rounded-full " +
                      (isLoading ? "opacity-50 cursor-not-allowed" : "")
                    }
                    onClick={requestReview}
                  >
                    Yêu cầu đánh giá
                  </button>
                  <button
                    className="bg-[#8e44ad] hover:bg-[#9b59b6] text-white px-4 py-2 rounded-full"
                    onClick={handleRetry}
                  >
                    Thử lại
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </div>
      <div className="w-full bg-[#16a085] p-4 text-center text-white font-sans">
        Ứng dụng giáo dục do TDN-M phát triển
      </div>
    </div>
  );
}

export default MainComponent;
  
    console.log('This will only run on the client-side');
  }, [data]);

  return (
    <div>
      {data && <div>Data: {data}</div>}
    </div>
  );
}  
