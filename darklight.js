 document.getElementById("toggleMode").addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
    });

    // Hero Image Slider
  const heroSlider = document.getElementById("heroSlider");
  const sliderImages = [
    "bb.jpg",
    "shelby-cohron-Bl4f4OoeCQ0-unsplash.jpg",
    "ss.jpg",
    "oo.avif"
  ];

  let currentIndex = 0;

  setInterval(() => {
    currentIndex = (currentIndex + 1) % sliderImages.length;
    heroSlider.src = sliderImages[currentIndex];
  }, 2500); 