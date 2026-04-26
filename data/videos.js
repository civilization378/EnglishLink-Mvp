const testVideoUrl = "https://www.w3schools.com/html/mov_bbb.mp4"

const videos = [
  {
    id: 1,
    title: "Ordering at Starbucks",
    scene: "daily",
    sceneName: "点餐场景",
    level: "A2",
    videoOrientation: "landscape",
    videoFileID: "cloud://cloud1-d7ggr3wm24f29c9c2.636c-cloud1-d7ggr3wm24f29c9c2-1426183876/videos/coffee-01.mp4",
    videoUrl: "http://127.0.0.1:8080/coffee-01.mp4",
    subtitle: "I'd like a tall white chocolate mocha. Hot, please. And then may I have the banana nut bread? Yes, warmed up, please. Thank you.",
    subtitleLines: [
      "I'd like a tall white chocolate mocha.",
      "Hot, please.",
      "And then may I have the banana nut bread?",
      "Yes, warmed up, please. Thank you."
    ],
    glossary: [
      {
        word: "tall",
        meaning: "a Starbucks size for drinks",
        chineseHint: "星巴克饮品规格"
      },
      {
        word: "mocha",
        meaning: "a coffee drink with chocolate",
        chineseHint: "摩卡咖啡"
      },
      {
        word: "banana nut bread",
        meaning: "a sweet bread with banana and nuts",
        chineseHint: "香蕉坚果面包"
      },
      {
        word: "warmed up",
        meaning: "heated before serving",
        chineseHint: "加热"
      }
    ],
    question: {
      text: "What drink does the speaker order?",
      options: ["A small coffee", "A tall white chocolate mocha", "A cup of tea"],
      answerIndex: 1,
      explanation: "The speaker says: I'd like a tall white chocolate mocha."
    }
  },
  {
    id: 2,
    title: "Checking in at the Airport",
    scene: "travel",
    sceneName: "机场值机",
    level: "A2",
    videoOrientation: "portrait",
    videoFileID: "cloud://cloud1-d7ggr3wm24f29c9c2.636c-cloud1-d7ggr3wm24f29c9c2-1426183876/videos/airport-01.mp4",
    videoUrl: "http://127.0.0.1:8080/airport-01.mp4",
    subtitle: "Do you have any check-in luggage? No, just one carry-on bag. Okay, here's your boarding pass. Your boarding time is at 2:15 p.m. And your gate number is T27.",
    subtitleLines: [
      "Do you have any check-in luggage?",
      "No, just one carry-on bag.",
      "Okay, here's your boarding pass.",
      "Your boarding time is at 2:15 p.m.",
      "And your gate number is T27."
    ],
    glossary: [
      {
        word: "check-in luggage",
        meaning: "bags that are stored under the plane",
        chineseHint: "托运行李"
      },
      {
        word: "carry-on bag",
        meaning: "a small bag you take onto the plane",
        chineseHint: "随身行李"
      },
      {
        word: "boarding pass",
        meaning: "a document that lets you get on the plane",
        chineseHint: "登机牌"
      },
      {
        word: "gate number",
        meaning: "the place number where you board the plane",
        chineseHint: "登机口号码"
      }
    ],
    question: {
      text: "What is the gate number?",
      options: ["T17", "T27", "T15"],
      answerIndex: 1,
      explanation: "The staff says: Your gate number is T27."
    }
  },
  {
    id: 3,
    title: "Meeting a Friend",
    scene: "social",
    sceneName: "社交场景",
    level: "A1",
    videoOrientation: "landscape",
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
    videoOrientation: "landscape",
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
    videoOrientation: "landscape",
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