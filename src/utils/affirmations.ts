const affirmationsByMood: Record<string, string[]> = {
  Hopeful: [
    "Your hope is a beautiful light guiding your way forward.",
    "Every step you take brings you closer to your brightest days.",
    "Hold onto this feeling; it is the seed of wonderful things to come.",
    "The future is open, and you are ready to embrace it.",
    "Your heart knows the way. Trust its gentle direction.",
  ],
  Anxious: [
    "It is okay to feel unsteady. You are safe here in this moment.",
    "Take a deep breath. You don't have to have it all figured out right now.",
    "Your feelings are valid, but they do not define your destination.",
    "Be gentle with yourself today. You are doing the best you can.",
    "This moment will pass, and you will find your calm again.",
  ],
  Lost: [
    "Wandering is just another way of finding yourself. Take your time.",
    "You don't need a map right now, just the courage to take one small step.",
    "It's okay not to know. The path will reveal itself when you are ready.",
    "You are not behind. You are exactly where you need to be to learn.",
    "Even the stars look scattered until you connect them into constellations.",
  ],
  Grateful: [
    "Your gratitude shines and makes the world around you a little warmer.",
    "Appreciating the small things invites more joy into your life.",
    "This beautiful feeling is a reflection of your own open heart.",
    "May this sense of thankfulness stay with you throughout your day.",
    "You have a wonderful way of seeing the good in the world.",
  ],
  Sad: [
    "It is perfectly okay to rest and let yourself feel this right now.",
    "Your tears are a testament to how deeply you can care and love.",
    "Wrap yourself in kindness today. You deserve your own comfort.",
    "Healing takes time. Allow yourself the space to just be.",
    "Even the heaviest clouds eventually run out of rain.",
  ],
  Angry: [
    "Your feelings are a natural response. Let them flow through safely.",
    "Beneath this storm is a deep desire for peace. You will find it again.",
    "It's okay to feel this way. Breathe out the fire, little by little.",
    "You have the power to channel this energy into something that heals you.",
    "Take space. Your peace of mind is the most important thing right now.",
  ],
  Excited: [
    "Your energy is contagious! Enjoy every second of this wonderful feeling.",
    "You are stepping into a vibrant new chapter. Embrace the joy.",
    "This excitement is a sign that you are moving toward what you love.",
    "Let this bright spark light up your whole day.",
    "You deserve to celebrate this moment fully and completely.",
  ],
  Calm: [
    "Your peace is a sanctuary. Rest in this quiet space you've created.",
    "This stillness is a gift to your mind and body. Cherish it.",
    "You carry a gentle strength within you that anchors you.",
    "In this quiet moment, everything is exactly as it should be.",
    "Let this calm center you as you move through the rest of your day.",
  ]
};

const defaultAffirmations = [
  "You are capable of amazing things.",
  "Your journey is uniquely yours, and it is beautiful.",
  "Take things one gentle step at a time.",
  "You have a well of strength within you.",
  "Today is a new opportunity to be kind to yourself.",
];

export function generateAffirmation(mood: string | null): string {
  if (!mood || !affirmationsByMood[mood]) {
    const randomIndex = Math.floor(Math.random() * defaultAffirmations.length);
    return defaultAffirmations[randomIndex];
  }

  const moodAffirmations = affirmationsByMood[mood];
  const randomIndex = Math.floor(Math.random() * moodAffirmations.length);
  return moodAffirmations[randomIndex];
}
