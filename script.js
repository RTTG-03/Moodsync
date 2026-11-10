const button = document.getElementById("analyseButton");
const result = document.getElementById("result");

const songs = {
  english: {
    calm: ["Bloom — The Paper Kites", "Sunset Lover — Petit Biscuit"],
    energetic: ["Levitating — Dua Lipa", "Can't Stop the Feeling! — Justin Timberlake"],
    moreCalm: ["Weightless — Marconi Union", "Bloom — The Paper Kites"],
    moreEnergetic: ["Walking on Sunshine — Katrina and the Waves", "Levitating — Dua Lipa"],
    steady: ["Golden Hour — JVKE", "Sunflower — Post Malone & Swae Lee"]
  },
  hindi: {
    calm: [
      "Khuda Jaane — Vishal-Shekhar",
      "Bairan — Banjaare",
      "Arz Kiya Hai — Anuv Jain"
    ],
    energetic: [
      "Hookah Bar — Himesh Reshammiya",
      "Sooraj Dooba Hai — Amaal Mallik",
      "Dil Chori — Yo Yo Honey Singh"
    ],
    moreCalm: [
      "Kabira — Pritam",
      "Hale Dil — Harshit Saxena",
      "Tera Ghata — Gajendra Verma"
    ],
    moreEnergetic: [
      "Gallan Goodiyan — Yashita Sharma",
      "Character Dheela — Pritam",
      "Love Dose — Yo Yo Honey Singh"
    ],
    steady: [
      "Khuda Jaane — Vishal-Shekhar",
      "Sooraj Dooba Hai — Amaal Mallik"
    ]
  }
};

button.addEventListener("click", function () {
  const heartRate = Number(document.getElementById("heartRate").value);
  const sleep = Number(document.getElementById("sleep").value);
  const activity = document.getElementById("activity").value;
  const selectedMood = document.getElementById("mood").value;
  const language = document.getElementById("musicLanguage").value;

  const chosenSongs = songs[language] || songs.english;
  let moodType = "steady";
  let moodLabel = "Steady";
  let message = "Try a balanced mix of familiar tracks.";

  if (selectedMood === "calm") {
    moodType = "calm";
    moodLabel = "Calm";
    message = "Keep the relaxed feeling going with gentle songs.";
  } else if (selectedMood === "low" || selectedMood === "stressed") {
    moodType = "calm";
    moodLabel = selectedMood === "low" ? "A little low" : "Stressed";
    message = "Here are some gentle songs you can try.";
  } else if (selectedMood === "energetic") {
    moodType = "energetic";
    moodLabel = "Energetic";
    message = "Match your energy with upbeat tracks.";
  } else if (sleep < 6 || heartRate > 100) {
    moodType = "calm";
    moodLabel = "Possibly low on energy";
    message = "Based on these sample inputs, try something gentle.";
  } else if (activity === "high") {
    moodType = "energetic";
    moodLabel = "Active";
    message = "Your activity input is high; try some upbeat tracks.";
  }

  showResult(moodType, moodLabel, message, chosenSongs[moodType]);
});

function showResult(moodType, moodLabel, message, songList) {
  result.innerHTML = `
    <h2>Possible mood: ${moodLabel}</h2>
    <p>${message}</p>
    <p><strong>Suggested songs</strong></p>
    <ul>${songList.map(song => `<li>${song}</li>`).join("")}</ul>
    <p>This is a simple demo estimate from your inputs, not a medical or emotion diagnosis.</p>
    <label for="feedback">Would you like different suggestions?</label>
    <select id="feedback">
      <option value="">Choose one</option>
      <option value="calmer">Something calmer</option>
      <option value="upbeat">Something more upbeat</option>
      <option value="keep">These suggestions work for me</option>
    </select>
    <button id="feedbackButton">Update suggestions</button>
  `;
    playRecommendedSong(songList[0]);

  document.getElementById("feedbackButton").addEventListener("click", function () {
    updateFeedback(moodType, moodLabel);
  });
}

function updateFeedback(moodType, moodLabel) {
  const feedback = document.getElementById("feedback").value;
  const language = document.getElementById("musicLanguage").value;
  const chosenSongs = songs[language] || songs.english;
  let newSongs = chosenSongs.steady;
  let message = "Updated based on your feedback.";

  if (feedback === "calmer") {
    newSongs = chosenSongs.moreCalm;
  } else if (feedback === "upbeat") {
    newSongs = chosenSongs.moreEnergetic;
  } else if (feedback === "keep") {
    newSongs = chosenSongs[moodType];
    message = "Great — keeping these suggestions.";
  } else {
    message = "Choose a feedback option first.";
  }

  const list = result.querySelector("ul");
  list.innerHTML = newSongs.map(song => `<li>${song}</li>`).join("");
    playRecommendedSong(newSongs[0]);
  result.querySelector("ul").previousElementSibling.textContent = message;
}
const youtubeVideoIds = {
  "Khuda Jaane — Vishal-Shekhar": "cmMiyZaSELo",
  "Bairan — Banjaare": "oafxkMv4xnc",
  "Arz Kiya Hai — Anuv Jain": "Kg8_ADYhYWE",
  "Hookah Bar — Himesh Reshammiya": "b4b1cMVZOUU",
  "Sooraj Dooba Hai — Amaal Mallik": "nJZcbidTutE",
  "Kabira — Pritam": "jHNNMj5bNQw",
  "Hale Dil — Harshit Saxena": "asahn7x2KG4",
  "Tera Ghata — Gajendra Verma": "0KNk-Joi-NM",
  "Gallan Goodiyan — Yashita Sharma": "jCEdTq3j-0U",
  "Character Dheela — Pritam": "EHwlNAFzMso",
  "Love Dose — Yo Yo Honey Singh": "TvngY4unjn4",

  "Sunset Lover — Petit Biscuit": "4fQeaM62mOY",
  "Levitating — Dua Lipa": "TUVcZfQe-Kw",
  "Can't Stop the Feeling! — Justin Timberlake": "ru0K8uYEZWw",
  "Walking on Sunshine — Katrina and the Waves": "iPUmE-tne5U",
  "Golden Hour — JVKE": "PEM0Vs8jf1w",
  "Sunflower — Post Malone & Swae Lee": "ApXoWvfEYVU",
    "Bloom — The Paper Kites": "8inJtTG_DuU",
  "Weightless — Marconi Union": "UfcAVejslrU",
  "Dil Chori — Yo Yo Honey Singh": "f0D-JYNIDCc",
};

function playRecommendedSong(songName) {
  const videoId = youtubeVideoIds[songName];
  const playerCard = document.getElementById("playerCard");
  const musicPlayer = document.getElementById("musicPlayer");
  const nowPlaying = document.getElementById("nowPlaying");

  if (!videoId) {
    playerCard.hidden = true;
    return;
  }

  playerCard.hidden = false;
  nowPlaying.textContent = "Suggested song: " + songName;
  musicPlayer.src = "https://www.youtube.com/embed/" + videoId;
}