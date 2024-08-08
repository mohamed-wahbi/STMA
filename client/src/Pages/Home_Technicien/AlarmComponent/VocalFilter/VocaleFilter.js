// import React from 'react'

// const VocaleFilter = () => {
//   return (
//     <div>
//       Vocale
//     </div>
//   )
// }

// export default VocaleFilter



// src/components/VoiceCommandValue.js
import React, { useState, useEffect } from 'react';

const VocaleFilter = ({ onCommand }) => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'fr-FR';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript.toLowerCase();
      setTranscript(speechToText);
      onCommand(speechToText); // Passes the entire transcript to the parent component
    };

    recognition.onerror = (event) => {
      console.error('Error occurred in recognition: ' + event.error);
    };

    if (listening) {
      recognition.start();
    }

    return () => {
      if (listening) {
        recognition.stop();
      }
    };
  }, [listening, onCommand]);

  const startListening = () => {
    setListening(true);
  };

  return (
    <div>
      <button className={listening ? 'pulse-animation' : 'recordBtn'} onClick={startListening} disabled={listening}>
        {listening ?<> Écoute en cours  <i class="bi bi-mic"></i>...</>: <>Démarrer la commande vocale <i class="bi bi-mic-mute"></i></> }
      </button>

    </div>
  );
};

export default VocaleFilter;
