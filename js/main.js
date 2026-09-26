document.addEventListener("DOMContentLoaded", () => {
  // ================= 1. Dark Mode Toggle =================
  const themeToggleBtn = document.getElementById("theme-toggle");

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");

      if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }
    });
  }

  // ================= 2. Atmosphere Slider (Carousel) =================
  const track = document.getElementById("carouselTrack");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  const slides = document.querySelectorAll(".carousel-slide");

  if (track && slides.length > 0) {
    let currentIndex = 0;

    function updateSlidePosition() {
      const slideWidth = slides[0].getBoundingClientRect().width + 24;
      track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (currentIndex < slides.length - 1) {
          currentIndex++;
          updateSlidePosition();
        }
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        if (currentIndex > 0) {
          currentIndex--;
          updateSlidePosition();
        }
      });
    }

    window.addEventListener("resize", updateSlidePosition);
  }

  // ================= 3. Menu Category Filtering =================
  const navLinks = document.querySelectorAll(".category-nav .cat-link");
  const sections = document.querySelectorAll(".menu-category");

  if (navLinks.length > 0 && sections.length > 0) {
    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();

        navLinks.forEach((e) => e.classList.remove("active"));
        this.classList.add("active");

        const targetId = this.getAttribute("href").replace("#", "").trim();

        // targetId;=pizza

        //if all
        if (targetId === "all") {
          sections.forEach((sec) => {
            sec.style.display = "block";
          });
          return;
        }

        // not all
        sections.forEach((sec) => {
          if (sec.id === targetId) {
            sec.style.display = "block";
          } else {
            sec.style.display = "none";
          }
        });
      });
    });
  }
});

// search

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("menuSearchInput");
  const clearBtn = document.getElementById("clearSearchBtn");
  const categories = document.querySelectorAll(".menu-category");
  const noResults = document.getElementById("noResultsBlock");

  function filterDishes() {
    const query = searchInput.value.trim().toLowerCase();
    let totalVisible = 0;

    if (clearBtn) {
      clearBtn.style.display = query.length > 0 ? "block" : "none";
    }

    categories.forEach((category) => {
      const cards = category.querySelectorAll(".food-card");
      let visibleInCat = 0;

      cards.forEach((card) => {
        const title =
          card.querySelector(".food-title")?.textContent.toLowerCase() || "";
        if (title.includes(query)) {
          card.style.display = "";
          visibleInCat++;
          totalVisible++;
        } else {
          card.style.display = "none";
        }
      });

      category.style.display = visibleInCat > 0 ? "" : "none";
    });

    if (noResults) {
      noResults.style.display = totalVisible === 0 ? "block" : "none";
    }
  }

  if (searchInput) {
    searchInput.addEventListener("input", filterDishes);
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      searchInput.value = "";
      clearBtn.style.display = "none";
      searchInput.focus();
      filterDishes();
    });
  }
});

//Reservation
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bookingForm");
  const modal = document.getElementById("bookingSuccessModal");
  const closeBtn = document.getElementById("modalCloseBtn");
  const dateInput = document.getElementById("resDate");

  if (dateInput) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.setAttribute("min", today);
  }

  if (form && modal) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let phoneInput = document.getElementById("phone");
      let phoneValue = phoneInput.value.trim();

      if (phoneValue.length !== 11) {
        window.alert("phone number shoud be 11 numbers");
        phoneInput.focus();
        return;
      }

      if (!phoneValue.startsWith("01")) {
        window.alert("phone number must start with 01");
        phoneInput.focus();
        return;
      }

      let onlyNumber = true;
      for (let i = 0; i < phoneValue.length; ++i) {
        let ch = phoneValue[i];
        if (ch < "0" || ch > "9") {
          onlyNumber = false;
          break;
        }
      }
      if (!onlyNumber) {
        window.alert(
          "Phone number should contain numbers only, no letters allowed",
        );
        phoneInput.focus();
        return;
      }

      modal.classList.add("show");
    });

    closeBtn.addEventListener("click", () => {
      modal.classList.remove("show");
      form.reset();
    });
  }
});
