async function autoplayRandomTrack() {
  try {
    const res = await fetch("tracks.json");
    const tracks = await res.json();

    const track = tracks[Math.floor(Math.random() * tracks.length)];

    const audio = new Audio(track.file);
    audio.autoplay = true;
    audio.volume = 1.0;

    // WRITE TO HTML
    const nowPlaying = document.getElementById("now-playing");
    nowPlaying.textContent = `Now playing: ${track.title} — ${track.artist}`;

    audio.play().catch(() => {});
  } catch (err) {
    document.getElementById("now-playing").textContent =
      "Failed to load tracks.";
  }
}

window.addEventListener("load", autoplayRandomTrack);