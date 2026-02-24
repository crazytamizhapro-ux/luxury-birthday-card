// ==========================================
// LUXURY BIRTHDAY CARD - JAVASCRIPT
// Complete Interactive Functionality
// ==========================================

const CONFIG = {
    songs: [
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
    ],
    giftSounds: {
        sparkle: 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3',
        chime: 'https://assets.mixkit.co/active_storage/sfx/707/707-preview.mp3',
        pop: 'https://assets.mixkit.co/active_storage/sfx/2748/2748-preview.mp3'
    },
    particleCount: 50,
    heartCount: 15
};

let animationsEnabled = true;
let currentSongIndex = 0;
let isPlaying = false;
let textAnimationEnabled = false;
let currentImageIndex = 0;

// ============ INITIALIZATION ============
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        hideLoadingScreen();
    }, 2000);

    initializeElements();
    setupEventListeners();
    createParticles();
    createFloatingHearts();
    loadSettings();
    setupIntersectionObserver();
});

// ============ LOADING SCREEN ============
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.classList.add('hide');
    }
}

// ============ INITIALIZATION ============
function initializeElements() {
    const bgMusic = document.getElementById('bgMusic');
    if (bgMusic && CONFIG.songs.length > 0) {
        bgMusic.src = CONFIG.songs[0];
    }
}

function setupEventListeners() {
    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }

    // Theme Color
    const themeColorBtn = document.getElementById('themeColorBtn');
    if (themeColorBtn) {
        themeColorBtn.addEventListener('click', openThemeColorPicker);
    }

    // Settings
    const settingsBtn = document.getElementById('settingsBtn');
    const closeSettings = document.getElementById('closeSettings');
    if (settingsBtn) settingsBtn.addEventListener('click', toggleSettings);
    if (closeSettings) closeSettings.addEventListener('click', toggleSettings);

    // Animation Toggle
    const animationToggle = document.getElementById('animationToggle');
    if (animationToggle) {
        animationToggle.addEventListener('click', toggleAnimations);
    }

    // Music Box Events
    document.querySelectorAll('.song-btn').forEach(btn => {
        btn.addEventListener('click', selectSong);
    });

    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const volumeSlider = document.getElementById('volumeSlider');

    if (playBtn) playBtn.addEventListener('click', playSong);
    if (pauseBtn) pauseBtn.addEventListener('click', pauseSong);
    if (volumeSlider) volumeSlider.addEventListener('input', updateVolume);

    // Gallery Events
    const uploadArea = document.getElementById('uploadArea');
    const imageInput = document.getElementById('imageInput');

    if (uploadArea) {
        uploadArea.addEventListener('click', triggerFileInput);
        uploadArea.addEventListener('dragover', handleDragOver);
        uploadArea.addEventListener('drop', handleDrop);
    }

    if (imageInput) {
        imageInput.addEventListener('change', handleImageUpload);
    }

    // Gallery Items Click
    document.addEventListener('click', (e) => {
        if (e.target.closest('.gallery-item img')) {
            const img = e.target;
            openImageModal(img.src);
        }
    });

    // Message Events
    const saveMessageBtn = document.getElementById('saveMessageBtn');
    const previewMessageBtn = document.getElementById('previewMessageBtn');
    const messageText = document.getElementById('messageText');
    const textAnimToggle = document.getElementById('textAnimToggle');
    const lockMessage = document.getElementById('lockMessage');

    if (saveMessageBtn) saveMessageBtn.addEventListener('click', saveMessage);
    if (previewMessageBtn) previewMessageBtn.addEventListener('click', previewMessage);
    if (messageText) messageText.addEventListener('input', updateMessagePreview);
    if (textAnimToggle) textAnimToggle.addEventListener('click', toggleTextAnimation);
    if (lockMessage) lockMessage.addEventListener('change', toggleMessageLock);

    // Gift Events
    const openGiftBtn = document.getElementById('openGiftBtn');
    const closeGiftModal = document.getElementById('closeGiftModal');

    if (openGiftBtn) openGiftBtn.addEventListener('click', openGift);
    if (closeGiftModal) closeGiftModal.addEventListener('click', closeGift);

    // Settings Events
    const birthdayName = document.getElementById('birthdayName');
    const birthdayMessage = document.getElementById('birthdayMessage');
    const bgColor = document.getElementById('bgColor');
    const accentColor = document.getElementById('accentColor');
    const fontStyle = document.getElementById('fontStyle');

    if (birthdayName) birthdayName.addEventListener('input', updateBirthdayName);
    if (birthdayMessage) birthdayMessage.addEventListener('input', updateBirthdayMessage);
    if (bgColor) bgColor.addEventListener('input', updateBgColor);
    if (accentColor) accentColor.addEventListener('input', updateAccentColor);
    if (fontStyle) fontStyle.addEventListener('change', updateFontStyle);

    setupTouchFeedback();
}

// ============ DARK MODE ============
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    updateFloatingHearts();
}

function loadDarkMode() {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
}

// ============ THEME COLOR PICKER ============
function openThemeColorPicker() {
    const accentColorInput = document.getElementById('accentColor');
    if (accentColorInput) {
        accentColorInput.click();
    }
}

// ============ SETTINGS PANEL ============
function toggleSettings() {
    const settingsPanel = document.getElementById('settingsPanel');
    if (settingsPanel) {
        settingsPanel.classList.toggle('active');
    }
}

function loadSettings() {
    loadDarkMode();
    
    const savedName = localStorage.getItem('birthdayName');
    const savedMessage = localStorage.getItem('birthdayMessage');
    const savedBgColor = localStorage.getItem('bgColor');
    const savedAccentColor = localStorage.getItem('accentColor');

    if (savedName) {
        const birthdayName = document.getElementById('birthdayName');
        if (birthdayName) birthdayName.value = savedName;
        updateBirthdayName();
    }

    if (savedMessage) {
        const birthdayMessage = document.getElementById('birthdayMessage');
        if (birthdayMessage) birthdayMessage.value = savedMessage;
        updateBirthdayMessage();
    }

    if (savedBgColor) {
        const bgColor = document.getElementById('bgColor');
        if (bgColor) bgColor.value = savedBgColor;
        updateBgColor();
    }

    if (savedAccentColor) {
        const accentColor = document.getElementById('accentColor');
        if (accentColor) accentColor.value = savedAccentColor;
        updateAccentColor();
    }
}

// ============ CUSTOMIZATION ============
function updateBirthdayName() {
    const name = document.getElementById('birthdayName')?.value || 'Beautiful Soul';
    const heroTitle = document.getElementById('heroTitle');
    if (heroTitle) heroTitle.textContent = `Happy Birthday, ${name}`;
    localStorage.setItem('birthdayName', name);
}

function updateBirthdayMessage() {
    const message = document.getElementById('birthdayMessage')?.value || '';
    const heroSubtitle = document.getElementById('heroSubtitle');
    if (heroSubtitle) heroSubtitle.textContent = message;
    localStorage.setItem('birthdayMessage', message);
}

function updateBgColor() {
    const color = document.getElementById('bgColor')?.value || '#e5d9f0';
    document.documentElement.style.setProperty('--secondary-color', color);
    localStorage.setItem('bgColor', color);
}

function updateAccentColor() {
    const color = document.getElementById('accentColor')?.value || '#b19cd9';
    document.documentElement.style.setProperty('--primary-color', color);
    localStorage.setItem('accentColor', color);
    updateFloatingHearts();
}

function updateFontStyle() {
    const fontStyle = document.getElementById('fontStyle')?.value || 'elegant';
    document.body.style.fontFamily = fontStyle === 'elegant' ? "'Playfair Display', serif" : 
                                     fontStyle === 'playful' ? "'Comic Sans MS', cursive" : 
                                     "'Poppins', sans-serif";
}

// ============ ANIMATIONS TOGGLE ============
function toggleAnimations() {
    animationsEnabled = !animationsEnabled;
    document.body.classList.toggle('no-animations', !animationsEnabled);
    localStorage.setItem('animationsEnabled', animationsEnabled);
}

// ============ PARTICLES ============
function createParticles() {
    const container = document.getElementById('particlesContainer');
    if (!container) return;

    for (let i = 0; i < CONFIG.particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.background = `rgba(177, 156, 217, ${Math.random() * 0.5 + 0.2})`;
        particle.style.borderRadius = '50%';
        particle.style.boxShadow = `0 0 ${Math.random() * 10 + 5}px rgba(177, 156, 217, 0.3)`;
        particle.style.animation = `float ${Math.random() * 20 + 20}s linear infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(particle);
    }
}

// ============ FLOATING HEARTS ============
function createFloatingHearts() {
    const container = document.getElementById('floatingHeartsContainer');
    if (!container) return;

    const hearts = ['❤️', '🤍', '🖤', '💜', '💖'];
    
    for (let i = 0; i < CONFIG.heartCount; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = 100 + '%';
        heart.style.setProperty('--drift', (Math.random() * 200 - 100) + 'px');
        heart.style.animationDuration = (Math.random() * 8 + 8) + 's';
        heart.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(heart);
    }
}

function updateFloatingHearts() {
    const container = document.getElementById('floatingHeartsContainer');
    if (!container) return;
    container.innerHTML = '';
    createFloatingHearts();
}

// ============ MUSIC BOX ============
function selectSong(e) {
    const btn = e.currentTarget;
    currentSongIndex = parseInt(btn.dataset.songIndex);
    
    document.querySelectorAll('.song-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const bgMusic = document.getElementById('bgMusic');
    if (bgMusic) {
        bgMusic.src = CONFIG.songs[currentSongIndex];
        if (isPlaying) {
            bgMusic.play();
        }
    }
}

function playSong() {
    const bgMusic = document.getElementById('bgMusic');
    if (bgMusic) {
        bgMusic.play();
        isPlaying = true;
        
        const playBtn = document.getElementById('playBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        if (playBtn) playBtn.style.display = 'none';
        if (pauseBtn) pauseBtn.style.display = 'block';
        
        const vinylDisc = document.getElementById('vinylDisc');
        if (vinylDisc) vinylDisc.classList.add('playing');
        
        const equalizer = document.getElementById('equalizer');
        if (equalizer) equalizer.classList.add('active');
    }
}

function pauseSong() {
    const bgMusic = document.getElementById('bgMusic');
    if (bgMusic) {
        bgMusic.pause();
        isPlaying = false;
        
        const playBtn = document.getElementById('playBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        if (playBtn) playBtn.style.display = 'block';
        if (pauseBtn) pauseBtn.style.display = 'none';
        
        const vinylDisc = document.getElementById('vinylDisc');
        if (vinylDisc) vinylDisc.classList.remove('playing');
        
        const equalizer = document.getElementById('equalizer');
        if (equalizer) equalizer.classList.remove('active');
    }
}

function updateVolume(e) {
    const volume = e.target.value / 100;
    const bgMusic = document.getElementById('bgMusic');
    if (bgMusic) bgMusic.volume = volume;
    
    const volumeValue = document.getElementById('volumeValue');
    if (volumeValue) volumeValue.textContent = e.target.value;
}

// ============ GALLERY ============
function triggerFileInput() {
    document.getElementById('imageInput').click();
}

function handleDragOver(e) {
    e.preventDefault();
    e.currentTarget.style.background = 'rgba(177, 156, 217, 0.1)';
}

function handleDrop(e) {
    e.preventDefault();
    e.currentTarget.style.background = '';
    const files = e.dataTransfer.files;
    handleFiles(files);
}

function handleImageUpload(e) {
    const files = e.target.files;
    handleFiles(files);
}

function handleFiles(files) {
    const gallery = document.getElementById('galleryGrid');
    if (!gallery) return;

    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.innerHTML = `
                <img src="${e.target.result}" alt="Gallery image">
                <div class="gallery-overlay">
                    <button class="delete-btn" onclick="deleteImage(this)">✕</button>
                </div>
            `;
            gallery.appendChild(item);
        };
        reader.readAsDataURL(file);
    });
}

function deleteImage(btn) {
    btn.closest('.gallery-item').remove();
}

function openImageModal(src) {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content">
            <img src="${src}" class="modal-image" alt="Full image">
            <button class="modal-close" onclick="closeImageModal()">✕</button>
        </div>
    `;
    document.body.appendChild(modal);
}

function closeImageModal() {
    const modal = document.querySelector('.modal.active');
    if (modal) modal.remove();
}

// ============ MESSAGE SECTION ============
function saveMessage() {
    const messageText = document.getElementById('messageText')?.value || '';
    localStorage.setItem('birthdayMessage', messageText);
    alert('Message saved! 💾');
}

function previewMessage() {
    const preview = document.getElementById('messagePreview');
    if (preview) {
        preview.classList.toggle('active');
    }
}

function updateMessagePreview() {
    const text = document.getElementById('messageText')?.value || '';
    const preview = document.getElementById('messagePreview');
    if (preview) {
        preview.textContent = text;
    }
}

function toggleTextAnimation() {
    textAnimationEnabled = !textAnimationEnabled;
    const btn = document.getElementById('textAnimToggle');
    if (btn) {
        btn.style.opacity = textAnimationEnabled ? '1' : '0.6';
    }
}

function toggleMessageLock() {
    const lockCheckbox = document.getElementById('lockMessage');
    const passwordInput = document.getElementById('messageLockPassword');
    if (passwordInput) {
        passwordInput.style.display = lockCheckbox?.checked ? 'block' : 'none';
    }
}

// ============ GIFT SECTION ============
function openGift() {
    const modal = document.getElementById('giftModal');
    if (!modal) return;

    createConfetti();

    const hearts = document.querySelectorAll('.floating-heart');
    hearts.forEach(heart => {
        heart.style.animationDuration = '3s';
    });

    const giftMessage = document.getElementById('giftMessage')?.value || 'You are amazing! 🌟';
    const giftImageUrl = document.getElementById('giftImageUrl')?.value || '';
    const giftSound = document.getElementById('giftSound')?.value || 'sparkle';

    let content = `
        <h2 style="font-family: 'Playfair Display', serif; margin-bottom: 20px;">🎁 Your Gift</h2>
        ${giftImageUrl ? `<img src="${giftImageUrl}" style="max-width: 300px; border-radius: 20px; margin: 20px 0;" alt="Gift">` : ''}
        <p style="font-size: 18px; line-height: 1.8; color: var(--text-dark);">${giftMessage}</p>
    `;

    const revealContent = document.getElementById('giftRevealContent');
    if (revealContent) {
        revealContent.innerHTML = content;
    }

    modal.classList.add('active');

    if (giftSound !== 'none' && CONFIG.giftSounds[giftSound]) {
        const giftAudio = document.getElementById('giftSound');
        if (giftAudio) {
            giftAudio.src = CONFIG.giftSounds[giftSound];
            giftAudio.play();
        }
    }

    if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100, 50, 200]);
    }
}

function closeGift() {
    const modal = document.getElementById('giftModal');
    if (modal) {
        modal.classList.remove('active');
    }

    const hearts = document.querySelectorAll('.floating-heart');
    hearts.forEach(heart => {
        heart.style.animationDuration = (Math.random() * 8 + 8) + 's';
    });
}

// ============ CONFETTI ============
function createConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d');
    const particles = [];

    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: -10,
            vx: Math.random() * 4 - 2,
            vy: Math.random() * 3 + 3,
            size: Math.random() * 6 + 2,
            color: `hsl(${Math.random() * 60 + 280}, 100%, 50%)`,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: Math.random() * 0.2 - 0.1
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p, i) => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.1;
            p.rotation += p.rotationSpeed;

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            ctx.restore();

            if (p.y > canvas.height) {
                particles.splice(i, 1);
            }
        });

        if (particles.length > 0) {
            requestAnimationFrame(animate);
        } else {
            canvas.style.display = 'none';
        }
    }

    canvas.style.display = 'block';
    animate();
}

// ============ INTERSECTION OBSERVER ============
function setupIntersectionObserver() {
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fade-in-up 0.6s ease';
            }
        });
    }, options);

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// ============ TOUCH FEEDBACK ============
function setupTouchFeedback() {
    document.addEventListener('touchstart', function(e) {
        if (e.target.closest('button')) {
            if (navigator.vibrate) {
                navigator.vibrate(10);
            }
        }
    });
}

// ============ RESPONSIVE CANVAS ============
window.addEventListener('resize', () => {
    const canvas = document.getElementById('confettiCanvas');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});

// ============ PAGE VISIBILITY ============
document.addEventListener('visibilitychange', () => {
    const bgMusic = document.getElementById('bgMusic');
    if (bgMusic) {
        if (document.hidden && isPlaying) {
            bgMusic.pause();
        }
    }
});

// Initialize
loadDarkMode();
