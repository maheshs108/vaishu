'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const birthdayWishes = [
  {
    title: "🎂 Birthday Blessings",
    wishes: [
      "May your special day be filled with happiness and joy",
      "Wishing you a year ahead filled with love and laughter",
      "May all your dreams come true this coming year",
      "You deserve all the happiness in the world",
      "Happy Birthday to someone who makes the world brighter"
    ]
  },
  {
    title: "💕 Friendship Wishes",
    wishes: [
      "Thank you for being the best friend anyone could ask for",
      "Your friendship is a gift I cherish every single day",
      "I'm so grateful to have you in my life",
      "You make every ordinary moment extraordinary",
      "Our friendship is the greatest treasure of my life"
    ]
  },
  {
    title: "✨ Dream Wishes",
    wishes: [
      "May your dreams take flight and reach new heights",
      "I dream of seeing you achieve everything you desire",
      "Your potential is limitless, don't ever forget that",
      "May the universe conspire to give you everything you want",
      "You're capable of amazing things, believe in yourself"
    ]
  },
  {
    title: "🌟 Success Wishes",
    wishes: [
      "May success follow you in everything you do",
      "You're destined for greatness, never doubt yourself",
      "I believe in you and your incredible abilities",
      "May all your hard work pay off beautifully",
      "You have what it takes to achieve anything"
    ]
  },
  {
    title: "💝 Love Wishes",
    wishes: [
      "May you always be surrounded by love and positivity",
      "You deserve all the love this world has to offer",
      "May love light up your path always",
      "You bring so much love to everyone around you",
      "May your heart always be full of joy and peace"
    ]
  }
];

export default function BirthdayWishes() {
  const [currentWishSet, setCurrentWishSet] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.6;
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

  const nextWishSet = () => {
    if (currentWishSet < birthdayWishes.length - 1) {
      setCurrentWishSet(currentWishSet + 1);
    }
  };

  const prevWishSet = () => {
    if (currentWishSet > 0) {
      setCurrentWishSet(currentWishSet - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-purple-100 overflow-hidden">
      {/* Background Music */}
      <audio ref={audioRef} src="/music.mp3" className="hidden" />

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/21.jpg"
          alt="Birthday Wishes Background"
          fill
          className="object-cover blur-sm"
          priority
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Header */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-purple-800 mb-4">
              Birthday Wishes for Vaishu 💫
            </h1>
            <p className="text-lg md:text-xl text-purple-600">
              Special wishes from the heart
            </p>
          </motion.div>

          {/* Wish Categories */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl max-h-96 overflow-y-auto"
          >
            <motion.h2
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-2xl md:text-3xl font-bold text-purple-800 mb-6"
            >
              {birthdayWishes[currentWishSet].title}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="space-y-4"
            >
              {birthdayWishes[currentWishSet].wishes.map((wish, index) => (
                <motion.p
                  key={index}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.2 + index * 0.1, duration: 0.4 }}
                  className="text-lg md:text-xl text-purple-700 leading-relaxed text-left"
                >
                  {wish}
                </motion.p>
              ))}
            </motion.div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="flex gap-4 justify-center mt-8"
          >
            {currentWishSet > 0 && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={prevWishSet}
                className="bg-gradient-to-r from-purple-400 to-pink-400 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                ← Previous
              </motion.button>
            )}

            {currentWishSet < birthdayWishes.length - 1 && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextWishSet}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Next Wishes →
              </motion.button>
            )}
          </motion.div>

          {/* Back to Main */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.6 }}
            className="mt-8"
          >
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                🏠 Back to Birthday Journey
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
