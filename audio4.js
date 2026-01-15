const nowPlaying = document.getElementById("i85g-2");

let audio = new Audio();
audio.volume = 1.0;
audio.muted = true;        // REQUIRED for autoplay
audio.preload = "auto";

async function startAudio() {
  try {
    const res = await fetch("tracks.json");
    const tracks = await res.json();
    const track = tracks[Math.floor(Math.random() * tracks.length)];

    audio.src = track.file;
    audio.muted = false;

    await audio.play();

    nowPlaying.textContent =
      `Now playing: ${track.title} — ${track.artist}`;
  } catch (e) {
    console.error(e);
  }

  document.removeEventListener("touchstart", startAudio);
  document.removeEventListener("click", startAudio);
}

// Unmute permanently after first interaction
function unlockAudio() {
  audio.muted = false;
  document.removeEventListener("click", unlockAudio);
  document.removeEventListener("keydown", unlockAudio);
  document.removeEventListener("touchstart", unlockAudio);
}

// One interaction = full autoplay unlocked
document.addEventListener("click", unlockAudio);
document.addEventListener("keydown", unlockAudio);
document.addEventListener("touchstart", unlockAudio);