const nowPlaying = document.getElementById("i85g-2");

const audio = new Audio();
audio.volume = 1.0;
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
    nowPlaying.textContent = "Failed to start audio.";
  }

  document.removeEventListener("touchstart", startAudio);
  document.removeEventListener("click", startAudio);
}

// FIRST interaction starts audio
document.addEventListener("touchstart", startAudio, { once: true });
document.addEventListener("click", startAudio, { once: true });