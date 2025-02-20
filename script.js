const songs = [
    { title: "On My Way", artist: "Allen Walker", duration: 334 },
    { title: "Ranjhna", artist: "B Park", duration: 334 },
    { title: "Barish", artist: "Barish", duration: 334
     }
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
        progressBar.value = duration; // לוודא שהסרגל יגיע בדיוק לסוף
        currentTimeDisplay.textContent = formatTime(duration); // עדכון הספירה לזמן הסופי
        playPauseBtn.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
        isPlaying = false;
    }
}


function playPause() {
    playPauseBtn.innerHTML = '';
    if (isPlaying) {
        clearInterval(interval);
        playPauseBtn.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
    } else {
        updateProgress();
        interval = setInterval(updateProgress, 1000);
        playPauseBtn.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
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
    console.log("ProgressBar Max Set To:", progressBar.max);
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

// לאחר טעינת הדף
document.addEventListener('DOMContentLoaded', () => {
    // מצא את כל כפתורי הלבבות
    const buttons = document.querySelectorAll('.heart-button');
    
    // הוסף את הפונקציונליות לכל כפתור
    buttons.forEach(button => {
        button.onclick = (e) => {
            e.stopPropagation();
            heart(button);
        };
    });
});
function heart(button) {
    if (button.innerHTML == '<i class="fas fa-heart" aria-hidden="true"></i>') {
        button.innerHTML = '<i class="far fa-heart" aria-hidden="true"></i>';
    } else {
        button.innerHTML = '<i class="fas fa-heart" aria-hidden="true"></i>';
    }
}
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

