const testVideoUrl = "https://www.w3schools.com/html/mov_bbb.mp4"

const videos = [
  {
    id: 1,
    title: "Ordering Coffee",
    scene: "daily",
    level: "A1",
    videoUrl: testVideoUrl,
    subtitle: "I'd like a small coffee, please.",
    glossary: [
      { word: "small", meaning: "not large" },
      { word: "coffee", meaning: "a hot drink" }
    ],
    question: "What does the speaker want?",
    options: ["Tea", "Coffee", "Water"],
    answer: 1,
    explanation: "The speaker says: I'd like a small coffee, please."
  },
  {
    id: 2,
    title: "At the Airport",
    scene: "travel",
    level: "A1",
    videoUrl: testVideoUrl,
    subtitle: "Where is the boarding gate?",
    glossary: [
      { word: "boarding", meaning: "getting on a plane" },
      { word: "gate", meaning: "the place where passengers board" }
    ],
    question: "Where is the speaker probably?",
    options: ["At school", "At the airport", "At home"],
    answer: 1,
    explanation: "The words 'boarding gate' usually appear at the airport."
  },
  {
    id: 3,
    title: "Meeting a Friend",
    scene: "social",
    level: "A1",
    videoUrl: testVideoUrl,
    subtitle: "Long time no see!",
    glossary: [
      { word: "long time", meaning: "a long period" },
      { word: "see", meaning: "meet or look at someone" }
    ],
    question: "What does the speaker mean?",
    options: ["They meet often", "They haven't met for a long time", "They are saying goodbye"],
    answer: 1,
    explanation: "'Long time no see' means they haven't met for a long time."
  }
]

module.exports = {
  videos
}