const button = document.getElementById("analyseButton");
const result = document.getElementById("result");

button.addEventListener("click", function () {
  const heartRate = Number(document.getElementById("heartRate").value);
  const sleep = Number(document.getElementById("sleep").value);
  const activity = document.getElementById("activity").value;
  const selectedMood = document.getElementById("mood").value;

  let mood = "Steady";
  let message = "Try a balanced mix of familiar tracks.";
  let songs = ["Golden Hour — JVKE", "Sunflower — Post Malone & Swae Lee"];

  if (selectedMood === "calm") {
    mood = "Calm";
    message = "Keep the relaxed feeling going with gentle songs.";
    songs = ["Bloom — The Paper Kites", "Sunset Lover — Petit Biscuit"];
  } else if (selectedMood === "low") {
    mood = "A little low";
    message = "Here are some gentle, uplifting songs to try.";
    songs = ["Here Comes the Sun — The Beatles", "Put Your Records On — Corinne Bailey Rae"];
  } else if (selectedMood === "energetic") {
    mood = "Energetic";
    message = "Match your energy with upbeat tracks.";
    songs = ["Levitating — Dua Lipa", "Can't Stop the Feeling! — Justin Timberlake"];
  } else if (selectedMood === "stressed") {
    mood = "Stressed";
    message = "Try a calmer playlist and see how it feels.";
    songs = ["Weightless — Marconi Union", "Bloom — The Paper Kites"];
  } else if (sleep < 6 || heartRate > 100 || activity === "high") {
    mood = "可能 a bit low on energy";
    message = "Based on these sample inputs, try something gentle.";
    songs = ["Sunset Lover — Petit Biscuit", "Better Together — Jack Johnson"];
  }

  result.innerHTML = `
    <h2>Possible mood: ${mood}</h2>
    <p>${message}</p>
    <p><strong>Suggested songs</strong></p>
    <ul>${songs.map(song => `<li>${song}</li>`).join("")}</ul>
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

  document.getElementById("feedbackButton").addEventListener("click", updateFeedback);
});

function updateFeedback() {
  const feedback = document.getElementById("feedback").value;
  const songs = feedback === "calmer"
    ? ["Weightless — Marconi Union", "Bloom — The Paper Kites"]
    : feedback === "upbeat"
      ? ["Levitating — Dua Lipa", "Walking on Sunshine — Katrina and the Waves"]
      : ["Golden Hour — JVKE", "Sunflower — Post Malone & Swae Lee"];

  const list = result.querySelector("ul");
  const message = result.querySelector("ul").previousElementSibling;

  list.innerHTML = songs.map(song => `<li>${song}</li>`).join("");
  message.textContent = feedback === "keep"
    ? "Great — keeping suggestions in this demo."
    : "Updated based on your feedback.";
}