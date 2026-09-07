// Countdown Timer
const weddingDate = new Date("October 10, 2026 11:00:00 GMT-0500").getTime();

setInterval(() => {
    const now = new Date().getTime();
    const difference = weddingDate - now;

    if (difference <= 0) {
        document.getElementById("timer").innerHTML = "¡Hora de celebrar! 🎉";
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Actualiza solo los elementos correspondientes
    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
}, 1000);

const video = document.getElementById("introVideo")
const preview = document.getElementById("videoPreview")
const overlay = document.getElementById("clickOverlay")
const text = document.getElementById("clickText")
const mano = document.getElementById("mano")
const intro = document.getElementById("intro")
const contenido = document.getElementById("contenido")
const bgMusic = document.getElementById("bgMusic")
const musicBtn = document.getElementById("musicBtn")
const musicIcon = musicBtn.querySelector("i")

video.load()

overlay.addEventListener("click", () => {
    overlay.style.pointerEvents = "none"
    mano.style.opacity = "0"
    text.textContent = "Cargando..."

    bgMusic.volume = 0;

    bgMusic.play()

        .then(() => {
            bgMusic.pause();
            bgMusic.currentTime = 0;
            bgMusic.volume = 1;
        })

        .catch((error) => {

            console.log("Audio pendiente de autorización:", error);

        })

    const playVideo = () => {
        preview.style.display = "none"
        text.style.display = "none"
        video.play()
    }

    video.readyState >= 3
        ? playVideo()
        : video.addEventListener("canplay", playVideo, { once: true })
})

video.addEventListener("ended", () => {
    // 🔥 Esperamos un poco antes de iniciar el fade,
    // así se alcanza a ver bien el último frame
    setTimeout(() => {
        intro.classList.add("fade-out")

        intro.addEventListener("transitionend", () => {
            intro.style.display = "none"
            contenido.style.display = "block"
            contenido.scrollIntoView({ behavior: "smooth" })

            // 🔥 Mostrar botón de música y reproducir
            musicBtn.style.display = "flex"
            bgMusic.play()
                .then(() => {
                    musicIcon.classList.remove("fa-play")
                    musicIcon.classList.add("fa-pause")
                })
                .catch(() => {
                    // Si el navegador bloquea el autoplay,
                    // queda listo para que el usuario le dé play manual
                    musicIcon.classList.add("fa-play")
                })

        }, { once: true })
    }, 1200) // 🔥 ajusta este valor a los ms que quieras que se vea el último frame
})

// Botón de música: reproducir/pausar manualmente
musicBtn.addEventListener("click", () => {
    if (bgMusic.paused) {
        bgMusic.play()
        musicIcon.classList.remove("fa-play")
        musicIcon.classList.add("fa-pause")
    } else {
        bgMusic.pause()
        musicIcon.classList.remove("fa-pause")
        musicIcon.classList.add("fa-play")
    }
})

function toggleMenu() {
    const overlay = document.querySelector(".overlay");
    let menu = document.getElementById("nav-menu");
    menu.classList.toggle("active");
    overlay.classList.toggle("active");
}
  
// Obtener parámetros de la URL
function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return {
      familia: params.get("familia") || "Familia invitada",
      pases: parseInt(params.get("pases")) || 1
  };
}

// Guardar valores
const { familia, pases } = getQueryParams();

// Mostrar mensaje inicial
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("guestInfo").innerHTML =
  `<span class="nombre-familia">${familia}</span><span class="texto-invitacion">Hemos reservado en ${pases === 1 ? 'tu' : 'su'} honor 
  <span class="numero-pases">${pases}</span> 
  ${pases === 1 ? 'pase' : 'pases'} para este evento especial.</span>`;
});

function openAttendanceModal() {
  document.getElementById("attendanceModal").style.display = "flex";
}

function closeAttendanceModal() {
  document.getElementById("attendanceModal").style.display = "none";
}
//https://script.google.com/macros/s/AKfycbw_M2TrBze7XoZgq1aAouJ7ob7PV7QLNy3Mrr4qZ_Gsepm_8fgtSFGwESd9nOIofzuC/exec->
// Mostrar detalles grupales solo si se elige "grupal"
const attendanceScriptURL = "https://script.google.com/macros/s/1WwXaVz4Y0lPGqhzUwm_aTLdOEMA3khLL6PFieqpB4bM"; // URL de tu script de Google Apps
const attendanceForm = document.getElementById("attendanceForm");
const loadingMessage1 = document.getElementById("loadingMessage1");

attendanceForm.addEventListener("submit", (e) => {
e.preventDefault();

// Mostrar el mensaje de carga
loadingMessage1.style.display = "block";

// Crear objeto FormData
const formData = new FormData();

// Obtener valores
const mainGuest = document.getElementById("mainGuest").value;
const contactNumber = document.getElementById("contactNumber").value;
const attendanceConfirmation = document.getElementById("attendanceConfirmation").value;
const asadoConfirmation = document.getElementById("asadoConfirmation").value;
const guestGroup = document.getElementById("guestGroup").value;
const relationship = document.getElementById("relationship").value;
const ageGroup = document.getElementById("ageGroup").value;
const dietaryRestrictions = document.getElementById("dietaryRestrictions").value;
const designatedDriver = document.getElementById("designatedDriver").value;
const lodging = document.getElementById("lodging").value;
const specialNeeds = document.getElementById("specialNeeds").value || "Ninguna";
const foreignGuest = document.getElementById("foreignGuest").value || "No aplica";
const playlist = document.getElementById("playlist").value || "Ninguna";
const wishes = document.getElementById("wishes").value || "¡Felicidades!";

// Asignar etiquetas descriptivas para el registro
formData.append("Nombre Principal", mainGuest);
formData.append("Número de Contacto", contactNumber);
formData.append("Confirmación Asistencia", attendanceConfirmation);
formData.append("Confirmación día después", asadoConfirmation);
formData.append("Grupo", guestGroup);
formData.append("Vínculo", relationship);
formData.append("Edad", ageGroup);
formData.append("Restricciones Alimentarias", dietaryRestrictions);
formData.append("Conductor Elegido", designatedDriver);
formData.append("Hospedaje", lodging);
formData.append("Necesidades Especiales", specialNeeds);
formData.append("Invitado Extranjero", foreignGuest);
formData.append("Canción", playlist);
formData.append("Mensaje", wishes);

fetch(attendanceScriptURL, {
  method: "POST",
  body: formData
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor.");
    }

    attendanceForm.reset();
    loadingMessage1.style.display = "none"; // Ocultar "Cargando..."

    alert("¡Hecho! Confirmación enviada con éxito.");

    closeAttendanceModal();
  })
  .catch((error) => {
    loadingMessage1.style.display = "none"; // Ocultar "Cargando..." también en caso de error

    console.error("Error en el envío:", error);
    alert("Ocurrió un error al enviar la confirmación. Inténtalo nuevamente.");
  });
});

// Animación frase de entrada - Efecto deslizar por caracteres 
document.addEventListener("DOMContentLoaded", function() {
    const textosAnimados = document.querySelectorAll('.contenedor-texto'); // selecciona todos los contenedores
    
    textosAnimados.forEach(textoAnimado => {
        const textoOriginal = textoAnimado.innerHTML;
        textoAnimado.innerHTML = '';
        
        const lineas = textoOriginal.split('<br>');
        let delayTotal = 0;
        const delayIncremento = 0.04;
    
        lineas.forEach(linea => {
            const divLinea = document.createElement('div');
            divLinea.classList.add('linea-texto');
    
            const caracteres = linea.trim().split('');
            let htmlLinea = '';
    
            caracteres.forEach(char => {
                const charHtml = (char === ' ') ? '&nbsp;' : char;
                htmlLinea += `<span style="--delay: ${delayTotal}s">${charHtml}</span>`;
                delayTotal += delayIncremento;
            });
    
            divLinea.innerHTML = htmlLinea;
            textoAnimado.appendChild(divLinea);
        });
    
        // Observer para activar al entrar en pantalla
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });
    
        observer.observe(textoAnimado);
    });
  });
  
  // Animación de títulos
  const reveals = document.querySelectorAll('.reveal');
  
  const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      // Si quieres que la animación solo se ejecute una vez:
      observer.unobserve(entry.target);
    }
  });
  }, { threshold: 0.8 }); // 30% visible activa la animación
  
  reveals.forEach(el => observer.observe(el));
  
  // Animación de botones
  const botones = document.querySelectorAll('.btn-animado');
  
  const buttonObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
  if (entry.isIntersecting) {
    entry.target.classList.add('active1');
    buttonObserver.unobserve(entry.target); // Solo una vez
  }
  });
  }, { threshold: 0.8 });
  
  botones.forEach(btn => buttonObserver.observe(btn));
  
  // Animación de los párrafos
  // Intersection Observer
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visible');
      }
    });
  }, { threshold: 0.8 }); // se activa cuando el 20% del elemento está en pantalla
  
  // Seleccionamos todos los párrafos con efecto
  document.querySelectorAll('.efecto-parrafo').forEach(el => observador.observe(el));

// Observer solo para imágenes
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        imageObserver.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.1
  });
  
  document.querySelectorAll('.efecto-img')
    .forEach(img => imageObserver.observe(img));

// Itinerario

const progress = document.getElementById('progress');
const circles = document.querySelectorAll('.circle');
const timeline = document.querySelector('.timeline');

function updateProgress() {
    const timelineRect = timeline.getBoundingClientRect();
    const timelineTop = timelineRect.top + window.scrollY; // Posición absoluta del inicio del timeline

    // Lógica para rellenar los círculos
    circles.forEach(circle => {
        const circleRect = circle.getBoundingClientRect();
        const circleCenterY = circleRect.top + (circleRect.height / 2);
        const viewportHeight = window.innerHeight;

        const isVisible = circleCenterY <= viewportHeight / 2;

        if (isVisible) {
            circle.classList.add('filled');
        } else {
            circle.classList.remove('filled');
        }
    });

    // Nueva lógica para la línea de progreso
    let lastFilledCircle = null;
    circles.forEach(circle => {
        if (circle.classList.contains('filled')) {
            lastFilledCircle = circle;
        }
    });

    if (lastFilledCircle) {
        // La altura de la línea de progreso será la distancia desde el inicio del timeline
        // hasta el centro del último círculo que se ha rellenado.
        const lastCircleRect = lastFilledCircle.getBoundingClientRect();
        const lineEndPosition = (lastCircleRect.top + lastCircleRect.height / 2) - (timelineRect.top + 68);
        progress.style.height = `${lineEndPosition}px`;
    } else {
        progress.style.height = '0px';
    }
}

// Escuchadores de eventos
window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', updateProgress);
document.addEventListener('DOMContentLoaded', updateProgress);

(function () {
  const section = document.getElementById('itinerary');
  const derecha = document.querySelector('.cortina-wrap-derecha');
  const izquierda = document.querySelector('.cortina-wrap-izquierda');

  // Cuánto se "abren" las cortinas (en puntos porcentuales extra)
  const APERTURA_MAX = 25; // pruébalo y ajusta a gusto

  let ticking = false;

  function actualizarCortinas() {
    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight;

    // progreso 0→1 mientras la sección atraviesa el viewport
    let progreso = (vh - rect.top) / (vh + rect.height);
    progreso = Math.min(Math.max(progreso, 0), 1);

    // se abren al entrar (primer 20%), quedan abiertas,
    // y se cierran al salir (último 20%)
    let apertura;
    if (progreso < 0.2) {
      apertura = progreso / 0.2;
    } else if (progreso > 0.8) {
      apertura = (1 - progreso) / 0.2;
    } else {
      apertura = 1;
    }
    apertura = Math.min(Math.max(apertura, 0), 1);

    const extra = apertura * APERTURA_MAX;

    derecha.style.setProperty('--open-x', `${15 + extra}%`);
    izquierda.style.setProperty('--open-x', `${-15 - extra}%`);

    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(actualizarCortinas);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll(); // estado inicial
})();
