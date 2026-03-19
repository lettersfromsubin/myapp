const questions = [
  {
    question: "At a party or social event, you usually...",
    answers: [
      { text: "Talk to many people and enjoy the energy in the room", dimension: "E" },
      { text: "Stay with a few people and get tired after a while", dimension: "I" }
    ]
  },
  {
    question: "When making weekend plans, you prefer...",
    answers: [
      { text: "Something spontaneous and exciting", dimension: "P" },
      { text: "A plan with structure and clear timing", dimension: "J" }
    ]
  },
  {
    question: "When you make decisions, you trust more...",
    answers: [
      { text: "Logic, fairness, and rational analysis", dimension: "T" },
      { text: "Feelings, values, and how people are affected", dimension: "F" }
    ]
  },
  {
    question: "You are usually more interested in...",
    answers: [
      { text: "Big ideas, possibilities, and future potential", dimension: "N" },
      { text: "Facts, details, and what is realistic right now", dimension: "S" }
    ]
  },
  {
    question: "When working on a group project, you tend to...",
    answers: [
      { text: "Speak up quickly and share ideas out loud", dimension: "E" },
      { text: "Think first and talk after forming your thoughts", dimension: "I" }
    ]
  },
  {
    question: "Your room, desk, or schedule is usually...",
    answers: [
      { text: "Organized, planned, or at least controlled", dimension: "J" },
      { text: "Flexible, changing, and a little unpredictable", dimension: "P" }
    ]
  },
  {
    question: "When someone asks you for advice, you often...",
    answers: [
      { text: "Tell them the honest truth and practical solution", dimension: "T" },
      { text: "Focus on empathy and emotional support first", dimension: "F" }
    ]
  },
  {
    question: "Which sounds more like you?",
    answers: [
      { text: "I enjoy imagination, symbolism, and hidden meaning", dimension: "N" },
      { text: "I trust direct experience and concrete evidence", dimension: "S" }
    ]
  }
];

const personalityResults = {
  ENFP: {
    title: "The Spark",
    code: "ENFP-style",
    emoji: "🔥",
    description:
      "You are energetic, expressive, and full of curiosity. You love new ideas, meaningful conversations, and the feeling that life is full of possibilities.",
    message:
      "You bring warmth, imagination, and momentum into the room. People may see you as inspiring, spontaneous, and emotionally alive."
  },
  ENTP: {
    title: "The Challenger",
    code: "ENTP-style",
    emoji: "⚡",
    description:
      "You are quick-minded, playful, and intellectually adventurous. You enjoy debate, fresh ideas, and pushing beyond ordinary thinking.",
    message:
      "You often light up conversations with originality and confidence. You are the kind of person who asks, 'But what if we try this instead?'"
  },
  ENFJ: {
    title: "The Motivator",
    code: "ENFJ-style",
    emoji: "🌟",
    description:
      "You are charismatic, caring, and naturally tuned into people. You like helping others grow and building a positive group spirit.",
    message:
      "You often inspire people with encouragement and direction. Others may trust your ability to lead with empathy and vision."
  },
  ENTJ: {
    title: "The Commander",
    code: "ENTJ-style",
    emoji: "🏁",
    description:
      "You are strategic, driven, and confident in decision-making. You enjoy setting goals, organizing resources, and moving fast toward results.",
    message:
      "People may see you as bold and capable under pressure. You bring focus and momentum when clear leadership is needed."
  },
  INFJ: {
    title: "The Insightful Guide",
    code: "INFJ-style",
    emoji: "🌙",
    description:
      "You are thoughtful, intuitive, and deeply aware of meaning. You notice emotional layers, hidden patterns, and what truly matters to people.",
    message:
      "You may seem calm on the outside, but your inner world is rich, idealistic, and full of depth. You are often drawn to purpose and authenticity."
  },
  INFP: {
    title: "The Dreamer",
    code: "INFP-style",
    emoji: "🌿",
    description:
      "You are idealistic, thoughtful, and guided by values. You care deeply about authenticity, creativity, and meaningful connections.",
    message:
      "You may be quiet, but your inner voice is strong. Others often appreciate your empathy and your sincere perspective."
  },
  INTP: {
    title: "The Analyst",
    code: "INTP-style",
    emoji: "🧩",
    description:
      "You are curious, logical, and independent in thought. You enjoy understanding complex systems and exploring ideas from many angles.",
    message:
      "You tend to question assumptions and search for elegant explanations. People may notice your originality and depth of thinking."
  },
  INTJ: {
    title: "The Strategist",
    code: "INTJ-style",
    emoji: "🧠",
    description:
      "You are independent, future-focused, and highly analytical. You like systems, long-term thinking, and building efficient paths toward your goals.",
    message:
      "You tend to see structure where others see chaos. People may view you as sharp, self-contained, and quietly powerful."
  },
  ESFP: {
    title: "The Performer",
    code: "ESFP-style",
    emoji: "🎉",
    description:
      "You are lively, warm, and fully present in the moment. You enjoy people, experience, and bringing fun energy into everyday life.",
    message:
      "You have a natural social sparkle. Others may feel comfortable around you because you make life feel more vivid and real."
  },
  ESFJ: {
    title: "The Supporter",
    code: "ESFJ-style",
    emoji: "🤝",
    description:
      "You are friendly, dependable, and people-focused. You enjoy harmony, shared values, and creating a welcoming environment.",
    message:
      "You are often the one who checks in, remembers details, and keeps everyone connected. Your care helps groups feel stable and seen."
  },
  ESTP: {
    title: "The Dynamo",
    code: "ESTP-style",
    emoji: "🚀",
    description:
      "You are action-oriented, bold, and adaptable. You enjoy hands-on problem solving, fast decisions, and turning ideas into immediate results.",
    message:
      "You stay cool in changing situations and move quickly when opportunities appear. Others may admire your practical confidence."
  },
  ESTJ: {
    title: "The Organizer",
    code: "ESTJ-style",
    emoji: "📋",
    description:
      "You are practical, decisive, and reliable. You believe in responsibility, clear structure, and getting things done effectively.",
    message:
      "You are someone who can take charge, create order, and move a group forward when things become messy or unclear."
  },
  ISFP: {
    title: "The Gentle Creator",
    code: "ISFP-style",
    emoji: "🎨",
    description:
      "You are quiet, sensitive, and driven by inner values. You appreciate beauty, authenticity, and emotional honesty.",
    message:
      "Your energy is soft but meaningful. People may see you as genuine, artistic, and quietly strong in your own way."
  },
  ISFJ: {
    title: "The Caretaker",
    code: "ISFJ-style",
    emoji: "🫶",
    description:
      "You are attentive, loyal, and quietly compassionate. You value trust, consistency, and helping people through practical support.",
    message:
      "You often notice what others need before they ask. People may rely on your patience, kindness, and steady presence."
  },
  ISTP: {
    title: "The Craftsperson",
    code: "ISTP-style",
    emoji: "🛠️",
    description:
      "You are calm, observant, and skilled at figuring things out. You like practical challenges, freedom, and learning by doing.",
    message:
      "You usually stay composed and solution-focused in difficult moments. Others may trust your ability to fix what is broken."
  },
  ISTJ: {
    title: "The Reliable Builder",
    code: "ISTJ-style",
    emoji: "🛡️",
    description:
      "You are steady, responsible, and grounded in reality. You trust consistency, facts, and doing what needs to be done well.",
    message:
      "Others may rely on you because you bring stability, discipline, and a calm sense of responsibility."
  }
};

let currentQuestionIndex = 0;

let scores = {
  E: 0,
  I: 0,
  N: 0,
  S: 0,
  T: 0,
  F: 0,
  J: 0,
  P: 0
};

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const progressTextEl = document.getElementById("progressText");
const progressFillEl = document.getElementById("progressFill");

const quizScreenEl = document.getElementById("quizScreen");
const resultScreenEl = document.getElementById("resultScreen");

const resultEmojiEl = document.getElementById("resultEmoji");
const resultTypeEl = document.getElementById("resultType");
const resultCodeEl = document.getElementById("resultCode");
const resultDescriptionEl = document.getElementById("resultDescription");
const resultMessageEl = document.getElementById("resultMessage");
const restartBtn = document.getElementById("restartBtn");

function updateProgress() {
  progressTextEl.textContent = `Question ${currentQuestionIndex + 1} / ${questions.length}`;
  progressFillEl.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;
}

function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  updateProgress();

  questionEl.textContent = currentQuestion.question;
  answersEl.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.classList.add("answer-btn");
    button.textContent = answer.text;

    button.addEventListener("click", () => {
      scores[answer.dimension]++;

      currentQuestionIndex++;

      if (currentQuestionIndex < questions.length) {
        showQuestion();
      } else {
        showResult();
      }
    });

    answersEl.appendChild(button);
  });
}

function getFinalType() {
  const first = scores.E >= scores.I ? "E" : "I";
  const second = scores.N >= scores.S ? "N" : "S";
  const third = scores.T >= scores.F ? "T" : "F";
  const fourth = scores.J >= scores.P ? "J" : "P";

  return first + second + third + fourth;
}

function showResult() {
  const finalType = getFinalType();
  const result = personalityResults[finalType] || {
    title: "Balanced Explorer",
    code: `${finalType}-style`,
    emoji: "✨",
    description:
      "You show a balanced mix of personality traits across different situations.",
    message:
      "Your answers suggest flexibility, so your type may shift based on context and goals."
  };

  quizScreenEl.classList.add("hidden");
  resultScreenEl.classList.remove("hidden");

  resultEmojiEl.textContent = result.emoji;
  resultTypeEl.textContent = result.title;
  resultCodeEl.textContent = result.code;
  resultDescriptionEl.textContent = result.description;
  resultMessageEl.textContent = result.message;
}

function restartQuiz() {
  currentQuestionIndex = 0;

  scores = {
    E: 0,
    I: 0,
    N: 0,
    S: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0
  };

  resultScreenEl.classList.add("hidden");
  quizScreenEl.classList.remove("hidden");

  showQuestion();
}

restartBtn.addEventListener("click", restartQuiz);

showQuestion();
