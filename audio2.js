const nowPlaying = document.getElementById("i85g-2");

let audio = new Audio();
audio.volume = 1.0;
audio.muted = true;        // REQUIRED for autoplay
audio.preload = "auto";

async function autoplayRandomTrack() {
  try {
    const res = await fetch("tracks.json");
    const tracks = await res.json();

    const track = tracks[Math.floor(Math.random() * tracks.length)];

    audio.src = track.file;

    nowPlaying.textContent = `Now playing: ${track.title} — ${track.artist}\n(click on the site to play)`;

    await audio.play(); // WILL autoplay (muted)
  } catch (err) {
    console.error(err);
    nowPlaying.textContent = "Failed to load tracks.";
  }
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

window.addEventListener("load", autoplayRandomTrack);