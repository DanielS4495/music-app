const songs = [
    { title: "On My Way", artist: "Allen Walker", duration: 334 },
    { title: "Ranjhna", artist: "B Park", duration: 200 },
    { title: "Barish", artist: "Barish", duration: 230 }
];

const heartButton = document.getElementById("heart-button");
// const heartIcon = heartButton.querySelector("i");
let currentSongIndex = 0;
const playPauseBtn = document.getElementById('play');
const progressBar = document.getElementById('progress');
const currentTimeDisplay = document.getElementById('current-time');
const totalTimeDisplay = document.getElementById('total-time');
const songTitle = document.getElementById('song-title');
const artistName = document.getElementById('artist-name');
const nextBtn = document.getElementById('next');
let isPlaying = false;
let currentTime = 0;
let duration = songs[currentSongIndex].duration;
let interval;


function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function updateProgress() {
    if (currentTime < duration) {
        currentTime++;
        progressBar.value = currentTime;
        currentTimeDisplay.textContent = formatTime(currentTime);
    } else {
        clearInterval(interval);
        playPauseBtn.textContent =  "Play";
        isPlaying = false;
    }
}

function playPause() {
    if (isPlaying) {
        clearInterval(interval);
        playPauseBtn.textContent =  "Play";
    } else {
        updateProgress();
        interval = setInterval(updateProgress, 1000);
        playPauseBtn.textContent =  "Pause";
    }
    isPlaying = !isPlaying;
}

function loadSong(index) {
    currentSongIndex = index;
    songTitle.textContent = songs[index].title;
    artistName.textContent = songs[index].artist;
    duration = songs[index].duration;
    totalTimeDisplay.textContent = formatTime(duration);
    
    currentTime = 0;
    progressBar.value = 0;
    progressBar.max = duration;
    progressBar.setAttribute("max", duration);

    currentTimeDisplay.textContent = "0:00";
}

nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    if (isPlaying) {
        clearInterval(interval);
        interval = setInterval(updateProgress, 1000);
    }
});

playPauseBtn.addEventListener('click', playPause);

progressBar.addEventListener('input', (event) => {
    currentTime = parseInt(event.target.value);
    currentTimeDisplay.textContent = formatTime(currentTime);
});

document.querySelectorAll(".heart").forEach(button => {
    button.addEventListener("click", () => {
        const heartIcon = button.querySelector("i");

        if (heartIcon.classList.contains("far")) {
            heartIcon.classList.remove("far");
            heartIcon.classList.add("fas");
        } else {
            heartIcon.classList.remove("fas");
            heartIcon.classList.add("far");
        }
    });
});

class MenuSystem {
    constructor() {
        this.menu = document.createElement('div');
        this.menu.className = 'menu';
        document.body.appendChild(this.menu);
        
        // סגירת התפריט בלחיצה מחוץ אליו
        document.addEventListener('click', (e) => {
            if (!this.menu.contains(e.target) && !e.target.matches('.three-dots-button')) {
                this.hide();
            }
        });
    }

    show(items, button) {
        // ניקוי התפריט
        this.menu.innerHTML = '';
        
        // יצירת פריטי התפריט
        items.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.className = 'menu-item';
            menuItem.innerText = item.label;
            menuItem.onclick = () => {
                item.action();
                this.hide();
            };
            this.menu.appendChild(menuItem);
        });

        // מיקום התפריט
        const buttonRect = button.getBoundingClientRect();
        this.menu.style.top = `${buttonRect.top}px`;
        this.menu.style.left = `${buttonRect.left - 120}px`; // התפריט יופיע משמאל לכפתור
        
        // הצגת התפריט
        this.menu.style.display = 'block';
    }

    hide() {
        this.menu.style.display = 'none';
    }
}

// יצירת מופע יחיד של מערכת התפריטים
const menuSystem = new MenuSystem();

// פריטי תפריט לדוגמה
const menuItems = [
    { label: 'Play Next', action: () => console.log('Play Next') },
    { label: 'Add to playlist', action: () => console.log('Add to playlist') },
    { label: 'Go to lyrics', action: () => console.log('Go to lyrics') },
    { label: 'Download', action: () => console.log('Download') },
    { label: 'Share', action: () => console.log('Share') }
];

// פונקציה ליצירת כפתור שלוש נקודות
function createThreeDotsButton(items) {
    const button = document.createElement('button');
    button.className = 'three-dots-button';
    button.innerHTML = '⋮';
    
    button.onclick = (e) => {
        e.stopPropagation();
        menuSystem.show(items, button);
    };
    
    return button;
}

// שימוש:
// const button = createThreeDotsButton(menuItems);
// songElement.appendChild(button);




// Heart Animation
// const heartContainer = document.querySelector('.heart-container');
// const heart = heartContainer.querySelector('.heart');
// const emptyHeart = heart.querySelector('.far');
// const fullHeart = heart.querySelector('.fas');

// heartContainer.addEventListener('click', () => {
//   emptyHeart.classList.toggle('active');
//   fullHeart.classList.toggle('active');
// });
//


// console.log("Duration Set:", duration);
// console.log("Progress Max:", progressBar.max);
// לאחר טעינת הדף
document.addEventListener('DOMContentLoaded', () => {
    // מצא את כל כפתורי שלוש הנקודות
    const buttons = document.querySelectorAll('.three-dots-button');
    
    // הוסף את הפונקציונליות לכל כפתור
    buttons.forEach(button => {
        button.onclick = (e) => {
            e.stopPropagation();
            menuSystem.show(menuItems, button);
        };
    });
});
loadSong(currentSongIndex);

