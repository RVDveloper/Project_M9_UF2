window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
    }
});


if (typeof AOS !== 'undefined') {
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});
}


if (document.querySelector('.mySwiper')) {
const swiper = new Swiper('.mySwiper', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    initialSlide: 2,
    coverflowEffect: {
        rotate: 20,
        stretch: 0,
        depth: 350,
        modifier: 1,
        slideShadows: true,
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }
});
}


window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const limit = hero.offsetTop + hero.offsetHeight;
    
    if (scrolled <= limit) {
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }
});


const backToTopButton = document.getElementById('backToTop');
if (backToTopButton) {
const updateBackToTop = () => {
    if (window.pageYOffset > 300) {
        if (!backToTopButton.classList.contains('visible')) {
            backToTopButton.classList.add('visible');
        }
    } else {
        if (backToTopButton.classList.contains('visible')) {
            backToTopButton.classList.remove('visible');
        }
    }
};

window.addEventListener('scroll', updateBackToTop);

backToTopButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
}


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        nom: document.getElementById('nom').value.trim(),
        email: document.getElementById('email').value.trim(),
        missatge: document.getElementById('missatge').value.trim()
    };

    const validations = {
        nom: {
            test: value => value.length >= 2,
            message: 'El nombre debe de tener al menos 2 caracteres'
        },
        email: {
            test: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            message: 'Por favor, introduce un email valido'
        },
        missatge: {
            test: value => value.length >= 10,
            message: 'El mensaje debe de tener al menos 10 caracteres'
        }
    };

    for (const [field, validation] of Object.entries(validations)) {
        if (!validation.test(formData[field])) {
            Swal.fire({
                title: 'Error de validacion',
                text: validation.message,
                icon: 'error',
                confirmButtonText: 'De acuerdo',
                confirmButtonColor: '#e94560'
            });
            return;
        }
    }

    try {
        // Mostrar alerta de carga
        Swal.fire({
            title: 'Enviando...',
            text: 'Espera un momento por favor',
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        // Simulamos el tiempo de envío
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Cerrar la alerta de carga y mostrar éxito
        Swal.close();
        
        await Swal.fire({
            title: 'Mensaje enviado!',
            text: 'Gracias por contactarnos. Te responderemos lo más antes posible.',
            icon: 'success',
            confirmButtonText: 'De acuerdo',
            confirmButtonColor: '#0f3460'
        });

        contactForm.reset();
    } catch (error) {
        Swal.close();
        await Swal.fire({
            title: 'Error!',
            text: 'Ha habido un problema enviando el mensaje. Inténtalo de nuevo más tarde.',
            icon: 'error',
            confirmButtonText: 'De acuerdo',
            confirmButtonColor: '#e94560'
        });
    }
});


document.querySelectorAll('video, audio').forEach(media => {
    media.addEventListener('play', () => {
        document.querySelectorAll('video, audio').forEach(otherMedia => {
            if (otherMedia !== media && !otherMedia.paused) {
                otherMedia.pause();
            }
        });
    });
});


const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

if (navbarToggler && navbarCollapse) {
const navLinks = document.querySelectorAll('.nav-link');
    const overlay = document.createElement('div');
    overlay.classList.add('navbar-overlay');
    document.body.appendChild(overlay);

    const toggleMenu = () => {
        const isExpanded = navbarToggler.getAttribute('aria-expanded') === 'true';
        navbarToggler.setAttribute('aria-expanded', !isExpanded);
        navbarCollapse.classList.toggle('show');
    document.body.classList.toggle('no-scroll');
        overlay.classList.toggle('show');
    };

    navbarToggler.addEventListener('click', toggleMenu);

    overlay.addEventListener('click', toggleMenu);

navLinks.forEach(link => {
    link.addEventListener('click', () => {
            navbarToggler.setAttribute('aria-expanded', 'false');
            navbarCollapse.classList.remove('show');
        document.body.classList.remove('no-scroll');
            overlay.classList.remove('show');
        });
    });

    
    window.addEventListener('resize', () => {
        if (window.innerWidth > 991) {
            navbarToggler.setAttribute('aria-expanded', 'false');
            navbarCollapse.classList.remove('show');
            document.body.classList.remove('no-scroll');
            overlay.classList.remove('show');
        }
    });
}

// Audio Player
const audioPlayer = document.querySelector('.audio-player');
if (audioPlayer) {
    const audio = document.getElementById('mainAudio');
const playPauseBtn = audioPlayer.querySelector('.play-pause');
const prevBtn = audioPlayer.querySelector('.prev-track');
const nextBtn = audioPlayer.querySelector('.next-track');
const volumeSlider = audioPlayer.querySelector('.volume-slider');
const timeline = audioPlayer.querySelector('.audio-timeline');
const progress = audioPlayer.querySelector('.audio-progress');
    const volumeDownBtn = audioPlayer.querySelector('.volume-down');
    const volumeUpBtn = audioPlayer.querySelector('.volume-up');
    const stopBtn = audioPlayer.querySelector('.stop');
    const timeDisplay = audioPlayer.querySelector('#currentTime');
const playlistItems = audioPlayer.querySelectorAll('.playlist-item');
    
    let currentTrackIndex = 0;
    let isDragging = false;

    // Función para actualizar la interfaz de usuario
    const updateUI = () => {
        const currentTime = audio.currentTime;
        const duration = audio.duration;
        
        if (!isDragging && !isNaN(duration)) {
            const percent = (currentTime / duration) * 100;
            progress.style.width = `${percent}%`;
            timeDisplay.textContent = `${formatTime(currentTime)} / ${formatTime(duration)}`;
        }
    };

    // Función para formatear el tiempo
const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec.toString().padStart(2, '0')}`;
};

    // Función para cambiar la pista activa
    const setActiveTrack = (index) => {
        playlistItems.forEach(item => item.classList.remove('active'));
        playlistItems[index].classList.add('active');
        
        const track = playlistItems[index].dataset.track;
        audio.src = track;
        
        audio.load();
        audio.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    };

    // Event Listeners para los items de la playlist
    playlistItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentTrackIndex = index;
            setActiveTrack(currentTrackIndex);
        });
    });

// Controles de reproducción
playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        audio.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
});

    stopBtn.addEventListener('click', () => {
        audio.pause();
        audio.currentTime = 0;
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        updateUI();
    });

    prevBtn.addEventListener('click', () => {
        audio.currentTime = Math.max(audio.currentTime - 10, 0);
        updateUI();
    });

    nextBtn.addEventListener('click', () => {
        audio.currentTime = Math.min(audio.currentTime + 10, audio.duration);
        updateUI();
});

// Control de volumen
    volumeSlider.addEventListener('input', () => {
        audio.volume = volumeSlider.value / 100;
    });

    volumeDownBtn.addEventListener('click', () => {
        audio.volume = Math.max(0, audio.volume - 0.1);
        volumeSlider.value = audio.volume * 100;
    });

    volumeUpBtn.addEventListener('click', () => {
        audio.volume = Math.min(1, audio.volume + 0.1);
    volumeSlider.value = audio.volume * 100;
    });

    // Control de la línea de tiempo
    timeline.addEventListener('mousedown', (e) => {
        isDragging = true;
        const rect = timeline.getBoundingClientRect();
        const percent = Math.min(Math.max(0, e.clientX - rect.left), rect.width) / rect.width;
        audio.currentTime = percent * audio.duration;
        updateUI();
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
    const rect = timeline.getBoundingClientRect();
            const percent = Math.min(Math.max(0, e.clientX - rect.left), rect.width) / rect.width;
            audio.currentTime = percent * audio.duration;
            updateUI();
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    // Event listeners para actualizar la UI
    audio.addEventListener('timeupdate', updateUI);
    audio.addEventListener('loadedmetadata', updateUI);
    audio.addEventListener('play', () => {
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    });
    audio.addEventListener('pause', () => {
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    });
    
    // Reproducir siguiente pista cuando termine la actual
audio.addEventListener('ended', () => {
        currentTrackIndex = (currentTrackIndex + 1) % playlistItems.length;
        setActiveTrack(currentTrackIndex);
    });
}

// Video Player
const videoPlayer = document.querySelector('.video-player');
if (videoPlayer) {
    const video = videoPlayer.querySelector('video');
    const playPauseBtn = videoPlayer.querySelector('.play-pause');
    const skipBackward = videoPlayer.querySelector('.skip-backward');
    const skipForward = videoPlayer.querySelector('.skip-forward');
    const timeline = videoPlayer.querySelector('.timeline');
    const progress = videoPlayer.querySelector('.timeline-progress');
    const timeDisplay = videoPlayer.querySelector('.video-time');
    const volumeBtn = videoPlayer.querySelector('.volume-btn');
    const volumeSlider = videoPlayer.querySelector('.video-volume-slider');
    const fullscreenBtn = videoPlayer.querySelector('.fullscreen');
    
    let isTimelineDragging = false;

    
    const formatVideoTime = (seconds) => {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min}:${sec.toString().padStart(2, '0')}`;
    };

    
    const updateVideoUI = () => {
        const currentTime = video.currentTime;
        const duration = video.duration;
        
        if (!isTimelineDragging && !isNaN(duration)) {
            const percent = (currentTime / duration) * 100;
            progress.style.width = `${percent}%`;
            timeDisplay.textContent = `${formatVideoTime(currentTime)} / ${formatVideoTime(duration)}`;
        }
    };

    
    playPauseBtn.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            video.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    });

    
    skipBackward.addEventListener('click', () => {
        video.currentTime = Math.max(video.currentTime - 10, 0);
    });

    
    skipForward.addEventListener('click', () => {
        video.currentTime = Math.min(video.currentTime + 10, video.duration);
    });

    
    timeline.addEventListener('mousedown', (e) => {
        isTimelineDragging = true;
        const rect = timeline.getBoundingClientRect();
        const percent = Math.min(Math.max(0, e.clientX - rect.left), rect.width) / rect.width;
        video.currentTime = percent * video.duration;
        updateVideoUI();
    });

    document.addEventListener('mousemove', (e) => {
        if (isTimelineDragging) {
            const rect = timeline.getBoundingClientRect();
            const percent = Math.min(Math.max(0, e.clientX - rect.left), rect.width) / rect.width;
            video.currentTime = percent * video.duration;
            updateVideoUI();
        }
    });

    document.addEventListener('mouseup', () => {
        isTimelineDragging = false;
    });

    
    volumeBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        volumeBtn.innerHTML = video.muted ? 
            '<i class="fas fa-volume-mute"></i>' : 
            '<i class="fas fa-volume-up"></i>';
        volumeSlider.value = video.muted ? 0 : video.volume * 100;
    });

    volumeSlider.addEventListener('input', () => {
        video.volume = volumeSlider.value / 100;
        video.muted = video.volume === 0;
        volumeBtn.innerHTML = video.volume === 0 ? 
            '<i class="fas fa-volume-mute"></i>' : 
            '<i class="fas fa-volume-up"></i>';
    });

    
    fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            videoPlayer.requestFullscreen();
            fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
        } else {
            document.exitFullscreen();
            fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
        }
    });

    
    video.addEventListener('timeupdate', updateVideoUI);
    video.addEventListener('loadedmetadata', updateVideoUI);
    video.addEventListener('play', () => {
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    });
    video.addEventListener('pause', () => {
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    });
    video.addEventListener('ended', () => {
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    });
} 