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




// Countdown

const weddingDate =
new Date("2027-01-23T10:00:00").getTime();


function updateCountdown() {


    const now =
    new Date().getTime();


    const gap =
    weddingDate - now;



    const days =
    Math.floor(
        gap / (1000 * 60 * 60 * 24)
    );


    const hours =
    Math.floor(
        (gap % (1000 * 60 * 60 * 24))
        /
        (1000 * 60 * 60)
    );


    const mins =
    Math.floor(
        (gap % (1000 * 60 * 60))
        /
        (1000 * 60)
    );


    const secs =
    Math.floor(
        (gap % (1000 * 60))
        /
        1000
    );



    document.getElementById("days").innerHTML =
    days;


    document.getElementById("hours").innerHTML =
    hours;


    document.getElementById("mins").innerHTML =
    mins;


    document.getElementById("secs").innerHTML =
    secs.toString().padStart(2, "0");


}


// run immediately
updateCountdown();


// run every second
setInterval(
    updateCountdown,
    1000
);

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
