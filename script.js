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



// open button

function openInvitation() {

    window.scrollTo({

        top: window.innerHeight,

        behavior: "smooth"

    });


}



// vinyl music control

function openInvitation() {

    const music = document.getElementById("music");

    music.volume = 0.5;

    music.play();


    window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth"
    });

}