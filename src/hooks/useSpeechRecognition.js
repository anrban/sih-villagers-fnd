import { useState, useEffect, useRef } from 'react';

// Check for browser support
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

if (recognition) {
  recognition.continuous = true;
  recognition.lang = 'en-IN'; // Set to Indian English, can be changed
  recognition.interimResults = true;
}

export const useSpeechRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!recognition) {
      setError("Speech recognition is not supported in this browser.");
      return;
    }

    recognition.onresult = (event) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      setTranscript(prev => prev + finalTranscript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setError(event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

  }, []);

  const startListening = () => {
    if (isListening || !recognition) return;
    setTranscript(''); // Clear previous transcript
    recognition.start();
    setIsListening(true);
  };

  const stopListening = () => {
    if (!isListening || !recognition) return;
    recognition.stop();
    setIsListening(false);
  };
  
  return {
    isListening,
    transcript,
    error,
    startListening,
    stopListening,
    hasRecognitionSupport: !!recognition
  };
};