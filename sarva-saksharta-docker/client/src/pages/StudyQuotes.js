import React, { useEffect, useState } from 'react';

const StudyQuotes = () => {
  const [quote, setQuote] = useState('');

  const quotes = [
    "Dare to dream big, study hard, and never give up.",
"Every small study session brings you one step closer to greatness.",
"Success is the sum of small efforts repeated day in and day out.",
"Achieving success is the harmonious melody of consistent small efforts played day after day.",
"Dreams don't work unless you do, let your study sessions be the blueprint for your ambitions.",
"Every page turned is a victory, and each victory brings you closer to the triumph of knowledge.",
"Study with tenacity, for in the quiet hours of concentration, greatness is quietly forged.",
"Your academic journey is a canvas; with each stroke of study, you paint the masterpiece of success.",
"In the library of life, every book conquered is a step forward in your educational adventure.",
"Let the rhythm of your study sessions be the heartbeat propelling you towards your academic goals.",
"Seeds of knowledge planted today blossom into the gardens of success tomorrow.",
"As you study, envision the future you're crafting with each chapter absorbed and each concept understood.",
"Study not just to remember but to understand, for comprehension is the bridge to mastery.",
"Every equation solved, every theorem understood, is a triumph over the challenges of learning.",
"Hard work is the sculptor of dreams; let your study sessions be the chisel carving your path to success.",
"Education is the treasure chest; open it with curiosity, and you'll find the gems of wisdom within.",
"In the journey of learning, each step forward is a leap towards a brighter and more knowledgeable future.",
"Let your study sessions be the compass guiding you through the vast landscape of academia.",
"Embrace the struggle of learning, for it is the forge where the steel of knowledge is tempered.",
"Success is the result of dedication; let your study sessions be a testament to your commitment.",
"As you study, imagine each piece of information as a puzzle; piece by piece, you construct the picture of success.",
"Your study sessions are the rehearsals for the grand performance of your academic achievements.",
"Every concept grasped is a beacon lighting the way through the intricate maze of education.",
"In the symphony of education, your study sessions are the notes that compose the melody of success.",
"Study with resilience; let challenges be the stepping stones that elevate you to greater heights of understanding.",
"Knowledge is the currency of success; invest in your education, and the dividends will be limitless.",
"Consider each study session as a journey; with every step, you move closer to the destination of expertise.",
"Your mind is a garden; nurture it with the seeds of knowledge, and a bountiful harvest of success will follow.",
"Let your study sessions be the construction site of your intellectual skyscraper, reaching new heights with every brick laid.",
"Study with purpose, for every lesson learned is a brick in the foundation of your academic fortress.",
"Success is not a sprint but a marathon; pace yourself in your studies and celebrate each mile conquered.",
"Imagine your knowledge as a beacon in the darkness; with each study session, you brighten the path to success.",
"Your study sessions are the chapters in the book of your educational journey; write them with intention and purpose.",
"In the mosaic of learning, every piece contributes to the masterpiece of your intellectual growth.",
"Study with passion, for enthusiasm is the fuel that propels you forward on the road to success.",
"Every book you read is a voyage to new lands; let your study sessions be the ships that carry you there.",
"Success is the reward for consistency; let your study sessions be the daily deposits in the bank of achievement.",
"Study not just for grades but for the profound understanding that transforms information into wisdom.",
"Your study sessions are the foundation upon which the skyscraper of your knowledge is built.",
"Learning is a treasure that accompanies you everywhere; let your study sessions be the map to its discovery.",
"Every concept grasped is a key unlocking the door to greater intellectual possibilities.",
"Study with determination, for it is the engine that drives the locomotive of success.",
"Success is not a destination but a journey; let your study sessions be the steps that pave the way.",
"As you study, envision the tapestry of your education unfolding, each thread weaving a story of accomplishment.",
"Let your study sessions be the rehearsals for the symphony of success that awaits you in the future.",
"Education is the cornerstone of success; let your study sessions be the bricks that build your path.",
"Every assignment completed is a victory flag planted on the mountain of achievement.",
"Your study sessions are the constellations guiding you through the vast universe of knowledge.",
"In the laboratory of learning, every experiment is a discovery that adds to the treasure trove of your education.",
"Study with curiosity, for it is the spark that ignites the fire of understanding.",
"Success is not a solo act; let your study sessions be the collaboration between your efforts and your ambitions.",
  ];

  useEffect(() => {
    const getRandomQuote = () => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[randomIndex]);
    };

    getRandomQuote();
    const intervalId = setInterval(getRandomQuote, 600000); 

    return () => clearInterval(intervalId); 
  }, []);

  return (
    <div>
      <p className="text-justify p-12 text-2xl mt-12 font-mono">{quote}</p>
    </div>
  );
};

export default StudyQuotes;
