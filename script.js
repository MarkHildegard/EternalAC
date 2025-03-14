// Fügt beim Scrollen eine Fade-in-Animation hinzu
document.addEventListener("DOMContentLoaded", function() {
  const faders = document.querySelectorAll(".fade");

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });
});
