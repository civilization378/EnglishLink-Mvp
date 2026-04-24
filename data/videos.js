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
  },
  {
    id: 4,
    title: "Paying at a Store",
    scene: "shopping",
    sceneName: "购物场景",
    level: "A1",
    videoUrl: testVideoUrl,
    subtitle: "Can I pay by card?",
    glossary: [
      {
        word: "pay",
        meaning: "give money for something",
        chineseHint: "支付"
      },
      {
        word: "card",
        meaning: "a bank card or credit card",
        chineseHint: "银行卡"
      }
    ],
    question: {
      text: "What does the speaker want to do?",
      options: ["Pay with cash", "Pay by card", "Return the item"],
      answerIndex: 1,
      explanation: "The speaker asks: Can I pay by card? So they want to use a card."
    }
  },
  {
    id: 5,
    title: "Asking for Directions",
    scene: "daily",
    sceneName: "日常交流",
    level: "A1",
    videoUrl: testVideoUrl,
    subtitle: "How can I get to the station?",
    glossary: [
      {
        word: "get to",
        meaning: "arrive at a place",
        chineseHint: "到达"
      },
      {
        word: "station",
        meaning: "a place for trains or buses",
        chineseHint: "车站"
      }
    ],
    question: {
      text: "Where does the speaker want to go?",
      options: ["The station", "The hotel", "The store"],
      answerIndex: 0,
      explanation: "The speaker asks how to get to the station."
    }
  }
]

module.exports = {
  videos
}