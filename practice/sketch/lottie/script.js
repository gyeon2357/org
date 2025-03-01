// Configura la animación Lottie
    const statueAnimation = lottie.loadAnimation({
      container: document.getElementById('statue-container'), // Contenedor donde se cargará la animación
      renderer: 'canvas', // Tipo de renderizado
      loop: false, // Desactiva el bucle
      autoplay: false, // No inicia automáticamente
      path: './ring.json' // Ruta del archivo JSON
    });

    // Sincroniza la animación con el scroll
    window.addEventListener('scroll', () => {
      // Calcula la posición del scroll como un porcentaje
      const scrollTop = window.scrollY; // Desplazamiento actual
      const docHeight = document.body.scrollHeight - window.innerHeight; // Altura total desplazable
      const scrollPercent = scrollTop / docHeight; // Porcentaje de scroll

      // Ajusta los fotogramas según el porcentaje de scroll
      const frame = scrollPercent * statueAnimation.totalFrames;
      statueAnimation.goToAndStop(frame, true);
    });