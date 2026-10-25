// scroll animation

const reveal =
document.querySelectorAll(".reveal");


window.addEventListener(
"scroll",
() => {


    reveal.forEach(item=> {


        let top =
        item.getBoundingClientRect().top;


        if (top < window.innerHeight - 100) {


            item.classList.add("active");


        }


    });


});




// Countdown to the wedding ceremony: 23 January 2027 at 10:00 AM (Malaysia local time).
// JavaScript Date(year, monthIndex, day, hour, minute, second) uses the visitor's local timezone.
const weddingDate = new Date(2027, 0, 23, 10, 0, 0).getTime();

function updateCountdown() {
    const now = Date.now();
    const gap = Math.max(0, weddingDate - now);

    const days = Math.floor(gap / (1000 * 60 * 60 * 24));
    const hours = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((gap % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = String(days).padStart(2, "0");
    document.getElementById("hours").textContent = String(hours).padStart(2, "0");
    document.getElementById("mins").textContent = String(mins).padStart(2, "0");
    document.getElementById("secs").textContent = String(secs).padStart(2, "0");
}

// Update immediately and then every second.
updateCountdown();
setInterval(updateCountdown, 1000);

// Wedding music autoplay: try on page load, then retry on scroll or first interaction.
// Browsers may still require a user gesture before allowing audible playback.
(function () {
    function setupWeddingMusic() {
        var music = document.getElementById("music");
        if (!music) return;

        music.loop = true;
        music.volume = 0.5;

        var hasStarted = false;

        function tryPlayMusic() {
            if (!music || !music.paused) {
                if (music && !music.paused) hasStarted = true;
                return;
            }

            var result = music.play();
            if (result && typeof result.then === "function") {
                result.then(function () {
                    hasStarted = true;
                }).catch(function () {
                    // Browser may block audible autoplay until a user gesture.
                });
            }
        }

        // Initial attempt when the invitation opens.
        tryPlayMusic();

        // Retry when the visitor scrolls. Scrolling is a user interaction in many browsers.
        function onScroll() {
            if (!hasStarted && music.paused) tryPlayMusic();
            if (hasStarted) {
                window.removeEventListener("scroll", onScroll);
            }
        }
        window.addEventListener("scroll", onScroll, { passive: true });

        // Also retry on touch/click/key interaction, since this is the most reliable fallback.
        function onFirstInteraction() {
            if (!hasStarted && music.paused) tryPlayMusic();
            if (hasStarted) {
                window.removeEventListener("scroll", onScroll);
                document.removeEventListener("pointerdown", onFirstInteraction);
                document.removeEventListener("keydown", onFirstInteraction);
                document.removeEventListener("touchstart", onFirstInteraction);
            }
        }
        document.addEventListener("pointerdown", onFirstInteraction);
        document.addEventListener("keydown", onFirstInteraction);
        document.addEventListener("touchstart", onFirstInteraction, { passive: true });

        window.addEventListener("pageshow", tryPlayMusic);
        document.addEventListener("visibilitychange", function () {
            if (!document.hidden && music.paused) tryPlayMusic();
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", setupWeddingMusic);
    } else {
        setupWeddingMusic();
    }
})();
