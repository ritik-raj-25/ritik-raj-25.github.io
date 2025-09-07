const dayMode = document.getElementById('day-mode');
const nightMode = document.getElementById('night-mode');
const body = document.body;

// Initial dark mode
(function(){
    darkModeEnabled();
    typingEffect()
})();

function darkModeEnabled() {
    dayMode.style.display = 'block';
    nightMode.style.display = 'none';
    body.classList.add('dark');
    document.querySelector('#github').src = 'assets/icons/git-hub-dark.png';
    document.querySelector('#leetcode').src = 'assets/icons/LeetCode-dark.png';
}

function lightModeEnabled() {
    dayMode.style.display = 'none';
    nightMode.style.display = 'block';
    body.classList.remove('dark');
    document.querySelector('#github').src = 'assets/icons/git-hub-light.png';
    document.querySelector('#leetcode').src = 'assets/icons/LeetCode-light.png';
}

// Light mode
dayMode.addEventListener('click', lightModeEnabled);

// Dark mode
nightMode.addEventListener('click', darkModeEnabled);

// Humburger menu
const hamburger = document.querySelector('#hamburger');
const nav = document.querySelector('.nav');
const hamburgerClose = document.querySelector('#close-hamburger');

hamburger.addEventListener('click', () => {
    hamburger.style.display = 'none';
    hamburgerClose.style.display = 'flex';
    nav.style.display = 'flex';
});
hamburgerClose.addEventListener('click', () => {
    hamburger.style.display = 'flex';
    hamburgerClose.style.display = 'none';
    nav.style.display = 'none';
});

// Humburger close


// Typing animation
function typingEffect() {
    let typed = ['Problem Solver', 'Competitive Coder', 'Programmer', 'Web Developer', 'Learner', 'Tech Enthusiast'];
    
    let typing = document.querySelector('.typing');

    let index = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        let currentWord = typed[index % typed.length];

        if(isDeleting) {
            typing.textContent = currentWord.substring(0, charIndex--);
        }
        else {
            typing.textContent = currentWord.substring(0, charIndex++);
        }

        if(!isDeleting && charIndex === currentWord.length) {
            setTimeout(() => isDeleting = true, 1000);
        }
        else if(isDeleting && charIndex < 0){
            index++;
            charIndex = 0;
            isDeleting = false;
        }

        let speed = isDeleting ? 60 : 120;
        setTimeout(type, speed);
    }

    type();
}

// Footer contact icons functionality
document.querySelector('#emailIcon').addEventListener('click', () => {
    const email = 'ritikbunty2511@gmail.com';
    window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`,
        '_blank'
    );
});

const callIcon = document.querySelector('#callIcon');
callIcon.addEventListener('click', () => {
    window.location.href = 'tel:+919798058211';
});

// reader functionality
document.querySelector('.reader').addEventListener('click', () => {
    const readerControls = document.querySelector('#readerControls');
    const readerIcon = document.querySelector('.reader');
    readerIcon.style.display = 'none';
    readerControls.style.display = 'flex';
});
document.querySelector('#close-readControls').addEventListener('click', () => {
    const readerControls = document.querySelector('#readerControls');
    const readerIcon = document.querySelector('.reader');
    readerControls.style.display = 'none';
    readerIcon.style.display = 'block';
});

// Text-to-Speech functionality

let utterances = [];
let index = 0;
let paused = false;

function getVoice() {
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();
    return voices.find(v => v.lang === 'en-US') || voices[0];
}

document.querySelector('#playReader').addEventListener('click', () => {
    window.speechSynthesis.cancel(); // Cancel any ongoing speech
    
    utterances = [];
    index = 0;
    paused = false;

    const elements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li');
    let fullText = '';
    elements.forEach(ele => {
        if (ele.offsetParent !== null) { // only visible elements
            fullText += ele.innerText + '. ';
        }
    });

    if(fullText.trim() === '') {
        alert('No readable content found!');
        return;
    }

    const sentences = fullText.split('. ').filter(s => s.trim() !== '');

    sentences.forEach(sentence => {
        const u = new SpeechSynthesisUtterance(sentence + '.');
        u.voice = getVoice();
        u.rate = 0.9;
        u.pitch = 1;
        u.lang = 'en-US';
        u.onend = () => {
            if (!paused) {
                ++index;
                speakNext();
            }
        };
        utterances.push(u);
    });

    speakNext();
});

function speakNext() {
    if (index < utterances.length) {
        window.speechSynthesis.speak(utterances[index]);
    }
}

document.getElementById('pauseReader').addEventListener('click', () => {
    paused = true;
    window.speechSynthesis.cancel();
});
document.getElementById('resumeReader').addEventListener('click', () => {
    if (paused) {
        paused = false;
        speakNext();
    }
});