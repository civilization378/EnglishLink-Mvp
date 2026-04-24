const testVideoUrl = "https://www.w3schools.com/html/mov_bbb.mp4"

const videos = [
  {
    id: 1,
    title: "Ordering Coffee",
    scene: "daily",
    sceneName: "日常生活",
    level: "A1",
    videoUrl: testVideoUrl,
    subtitle: "I'd like a small coffee, please.",
    glossary: [
      {
        word: "small",
        meaning: "not large",
        chineseHint: "小的"
      },
      {
        word: "coffee",
        meaning: "a hot drink",
        chineseHint: "咖啡"
      }
    ],
    question: {
      text: "What does the speaker want?",
      options: ["Tea", "Coffee", "Water"],
      answerIndex: 1,
      explanation: "The speaker says: I'd like a small coffee, please."
    }
  },
  {
    id: 2,
    title: "At the Airport",
    scene: "travel",
    sceneName: "出行场景",
    level: "A1",
    videoUrl: testVideoUrl,
    subtitle: "Where is the boarding gate?",
    glossary: [
      {
        word: "boarding",
        meaning: "getting on a plane",
        chineseHint: "登机"
      },
      {
        word: "gate",
        meaning: "the place where passengers board",
        chineseHint: "登机口"
      }
    ],
    question: {
      text: "Where is the speaker probably?",
      options: ["At school", "At the airport", "At home"],
      answerIndex: 1,
      explanation: "The words 'boarding gate' usually appear at the airport."
    }
  },
  {
    id: 3,
    title: "Meeting a Friend",
    scene: "social",
    sceneName: "社交场景",
    level: "A1",
    videoUrl: testVideoUrl,
    subtitle: "Long time no see!",
    glossary: [
      {
        word: "long time",
        meaning: "a long period",
        chineseHint: "很长时间"
      },
      {
        word: "see",
        meaning: "meet or look at someone",
        chineseHint: "见到"
      }
    ],
    question: {
      text: "What does the speaker mean?",
      options: [
        "They meet often",
        "They haven't met for a long time",
        "They are saying goodbye"
      ],
      answerIndex: 1,
      explanation: "'Long time no see' means they haven't met for a long time."
    }
  }
]

module.exports = {
  videos
}