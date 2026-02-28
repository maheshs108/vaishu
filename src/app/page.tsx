'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const wishes = [
  "Hi Vaishu 💫 A tiny surprise is waiting for you…",
  "This is not just a birthday wish... It's something made… just for you ❤️",
  "You are not loud, but you are unforgettable. Not dramatic, but deeply important. Not everywhere, but always where it matters.",
  "Some people enter life and stay like peace. No noise. No show. Just comfort.",
  "You are not just a best friend… You are that one person who makes ordinary days feel okay. Stay the same, Vaishu ❤️",
  "Today we celebrate the amazing person you are! The friend who always understands, The person who always cares, The soul who always shines!",
  "Friendship with you is like having a rainbow in every storm, a light in every darkness, a smile in every tear!",
  "May all your dreams come true, May all your wishes be granted, May all your days be filled with joy, May all your nights be filled with peace!",
  "Today you're the queen of hearts, The princess of kindness, The goddess of friendship, The star of our universe!",
  "Happy Birthday to the most amazing person! Thank you for being you! Thank you for everything! Thank you for being my friend!",
  "You're like an angel sent from above, Bringing light and love to everyone, Making the world a better place, Just by being you!",
  "Sweeter than chocolate, Purer than vanilla, More precious than diamonds, That's what you are to me!",
  "Every moment with you is magical, Every memory is precious, Every laugh is contagious, Every tear is worth wiping!",
  "You bring colors to my black and white world, You paint rainbows in my stormy skies, You create sunshine in my cloudy days, You are my rainbow!",
  "Your hugs are warmer than sunshine, Your smile is brighter than stars, Your love is deeper than oceans, Your friendship is forever!",
  "Today you're not just celebrating a birthday, You're celebrating being amazing, You're celebrating being loved, You're celebrating being YOU!",
  "Remember all the times we laughed, Remember all the secrets we shared, Remember all the dreams we made, Let's make more memories!",
  "I dream of our future adventures, I dream of our continued friendship, I dream of your success and happiness, I dream of all your dreams coming true!",
  "Friends forever, that's what we are, Through thick and thin, near and far, No matter what life brings our way, Our friendship will always stay!",
  "Happy Birthday to the most wonderful person! May your life be filled with endless joy, May your dreams take flight and soar high, May you always smile and never cry! Thank you for being my best friend, Thank you for being my everything, Thank you for just being YOU! Happy Birthday, Vaishu! ❤️🎂🌟💫"
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.7;
      audio.loop = true;
      
      const playMusic = () => {
        audio.play().then(() => {
          setIsPlaying(true);
          console.log('Music playing successfully');
        }).catch(error => {
          console.log('Music play failed:', error);
        });
      };

      const handleFirstInteraction = () => {
        playMusic();
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('touchstart', handleFirstInteraction);
      };

      document.addEventListener('click', handleFirstInteraction);
      document.addEventListener('touchstart', handleFirstInteraction);
    }
  }, []);

  const nextSlide = () => {
    if (currentSlide < 19) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handleFinalVideoEnd = () => {
    setShowFinalMessage(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-purple-100 overflow-hidden relative">
      {/* Background Music */}
      <audio ref={audioRef} src="/music.mp3" className="hidden" />

      {/* Floating Hearts Animation */}
      <div className="absolute inset-0 pointer-events-none z-5">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: -50,
              opacity: 0
            }}
            animate={{ 
              y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 50,
              opacity: [0, 1, 0.3, 1, 0.3, 1, 0.3][i % 6],
              scale: [1, 1.2, 0.8, 1.2, 0.8, 1.2][i % 6],
              rotate: [0, 360, 0]
            }}
            transition={{ 
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
            className="absolute text-4xl"
            style={{
              filter: 'blur(1px)',
              color: ['#FF1493', '#FF69B4', '#FFB6C1', '#C71585', '#E91E63', '#FFC0CB'][i % 6]
            }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="min-h-screen flex items-center justify-center p-4 relative"
        >
          {/* Background Image */}
          <motion.div
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 0.25, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute inset-0 z-0"
          >
            <Image
              src={currentSlide === 0 ? "/images/image-1.jpg" : 
                   currentSlide === 1 ? "/images/image-2.jpg" :
                   currentSlide === 19 ? "/images/image-3.jpg" :
                   `/images/slide-${currentSlide + 1}.jpg`}
              alt={currentSlide === 0 ? "Beautiful Vaishu" : 
                   currentSlide === 1 ? "Special moment" :
                   currentSlide === 19 ? "Celebration time" :
                   `Background ${currentSlide + 1}`}
              fill
              className="object-cover blur-md"
              priority
              style={{
                objectFit: 'cover',
                objectPosition: 'center'
              }}
              onError={(e: any) => {
                console.log('Image failed to load:', e);
                // Fallback: try to load a default gradient
                const parent = e.target.parentElement;
                if (parent) {
                  parent.style.background = 'linear-gradient(135deg, #e6d7ff 0%, #f3e7ff 50%, #ffeaf0 100%)';
                }
              }}
              onLoad={() => {
                console.log('Image loaded successfully:', 
                  currentSlide === 0 ? "/images/image-1.jpg" : 
                  currentSlide === 1 ? "/images/image-2.jpg" :
                  currentSlide === 19 ? "/images/image-3.jpg" :
                  `/images/slide-${currentSlide + 1}.jpg`);
              }}
            />
          </motion.div>

          {/* Content Container */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative z-10 max-w-4xl mx-auto text-center"
          >
            {/* Gift Unwrap Animation */}
            <motion.div
              initial={{ rotateY: 0 }}
              animate={{ rotateY: 360 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="mb-8"
            >
              <div className="text-6xl">🎁</div>
            </motion.div>

            {/* Wishes Text */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 max-h-96 overflow-y-auto shadow-2xl border border-white/30"
            >
              {/* Additional Image for Slide 2 */}
              {currentSlide === 1 && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="mb-6 flex justify-center"
                >
                  <Image
                    src="/images/image-2.jpg"
                    alt="Special moment with Vaishu"
                    width={250}
                    height={180}
                    className="rounded-3xl shadow-2xl object-cover border-4 border-white/50"
                    onError={(e: any) => {
                      console.log('Additional image failed to load:', e);
                      e.target.style.display = 'none';
                    }}
                    onLoad={() => {
                      console.log('Additional image loaded successfully: /images/image-2.jpg');
                    }}
                  />
                </motion.div>
              )}

              <motion.h1
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: currentSlide === 1 ? 1.8 : 1.2, duration: 0.6 }}
                className="text-3xl md:text-5xl font-bold text-purple-800 mb-6"
              >
                {currentSlide === 2 ? "This is not just a birthday wish..." : 
                 currentSlide === 19 ? "Grand Celebration 🎊🎂" : 
                 currentSlide === 9 ? "Final Celebration 🎊" :
                 currentSlide === 8 ? "Birthday Queen 👑" :
                 currentSlide === 7 ? "Best Friend Goals 🌈" :
                 currentSlide === 6 ? "Party Time 🎉" :
                 currentSlide === 5 ? "Final Message 💌" :
                 currentSlide === 4 ? "Peaceful Thoughts 🕊️" :
                 currentSlide === 3 ? "Happy Birthday Vaishu 🎂" :
                 currentSlide === 1 ? "A Beautiful Surprise Just for You 💝" :
                 currentSlide === 0 ? "Welcome to Your Special Day 💫" : 
                 `Chapter ${currentSlide + 1}`}
              </motion.h1>

              <motion.p
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                className="text-lg md:text-xl text-purple-700 leading-relaxed whitespace-pre-wrap"
              >
                {wishes[currentSlide]}
              </motion.p>
            </motion.div>

            {/* Navigation Button */}
            {currentSlide < 19 && (
              <motion.div className="flex gap-4 justify-center mt-8">
                <motion.button
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.6, duration: 0.6 }}
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(147, 51, 234, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextSlide}
                  className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 text-white px-10 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20"
                >
                  👉 Open Next 🎁
                </motion.button>

                {/* Progress Indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.8, duration: 0.6 }}
                  className="text-purple-700 font-medium bg-white/80 px-4 py-2 rounded-full shadow-lg"
                >
                  {currentSlide + 1} / 20
                </motion.div>
              </motion.div>
            )}

            {/* Final Slide Special Content */}
            {currentSlide === 19 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="mt-8"
              >
                {!showFinalMessage ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl font-bold text-purple-800"
                  >
                    Made with ❤️ for you
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="text-2xl font-semibold text-purple-700"
                  >
                    Wait… One last thing 🎁
                  </motion.div>
                )}

                {/* Final Video */}
                <motion.video
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 1 }}
                  autoPlay
                  muted
                  onEnded={handleFinalVideoEnd}
                  className="w-full max-w-2xl mx-auto rounded-2xl shadow-2xl mt-6"
                  controls={false}
                >
                  <source src="/final.mp4" type="video/mp4" />
                </motion.video>
              </motion.div>
            )}

            {/* Confetti for Final Slides */}
            {(currentSlide === 9 || currentSlide === 19) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 pointer-events-none z-20"
              >
                {[...Array(50)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ 
                      x: Math.random() * window.innerWidth - window.innerWidth/2,
                      y: -50,
                      rotate: 0,
                      opacity: 1
                    }}
                    animate={{ 
                      y: window.innerHeight + 50,
                      rotate: Math.random() * 360,
                      opacity: 0
                    }}
                    transition={{ 
                      duration: 3 + Math.random() * 2,
                      delay: Math.random() * 2,
                      ease: "linear"
                    }}
                    className="absolute w-3 h-3"
                    style={{
                      backgroundColor: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'][Math.floor(Math.random() * 6)]
                    }}
                  />
                ))}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
