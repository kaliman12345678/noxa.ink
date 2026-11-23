document.addEventListener("DOMContentLoaded", () => {
  // 1. Sticky Header scroll effect
  const header = document.querySelector(".site-header");
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 30) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }

  // 2. Mobile Nav Toggle
  const mobileToggle = document.querySelector(".mobile-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener("click", () => {
      mobileNav.classList.toggle("open");
    });
    // Close on link click
    mobileNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("open");
      });
    });
  }

  // 3. Diagnostic Fit Quiz Logic
  let currentStep = 1;
  let quizData = {
    preference: "Camisetas y Bóxers",
    usualSize: "2XL",
    heightCm: "",
    weightKg: "",
    fitStyle: "Estructurado y Firme",
    calculatedSize: "2XL",
    fullName: "",
    city: "",
    phone: ""
  };

  const step1 = document.getElementById("quiz-step-1");
  const step2 = document.getElementById("quiz-step-2");
  const step3 = document.getElementById("quiz-step-3");
  const step4 = document.getElementById("quiz-step-4");
  const progressFill = document.getElementById("quiz-progress-fill");
  const progressLabel = document.getElementById("quiz-step-label");

  function updateStepUI() {
    [step1, step2, step3, step4].forEach((el, index) => {
      if (el) {
        if (index + 1 === currentStep) {
          el.classList.add("active");
        } else {
          el.classList.remove("active");
        }
      }
    });

    if (progressFill) {
      progressFill.style.width = `${currentStep * 25}%`;
    }
    if (progressLabel) {
      progressLabel.textContent = `Paso 0${currentStep} de 04`;
    }
  }

  // Step 1: Prenda selection
  document.querySelectorAll("[data-quiz-pref]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-quiz-pref]").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      quizData.preference = btn.getAttribute("data-quiz-pref");
    });
  });

  // Step 2: Size selection
  document.querySelectorAll("[data-quiz-size]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-quiz-size]").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      quizData.usualSize = btn.getAttribute("data-quiz-size");
    });
  });

  // Step 3: Fit style selection
  document.querySelectorAll("[data-quiz-fit]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-quiz-fit]").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      quizData.fitStyle = btn.getAttribute("data-quiz-fit");
    });
  });

  // Size calculation algorithm
  function calculateSize() {
    let rec = quizData.usualSize || "2XL";
    const weight = parseFloat(document.getElementById("quiz-weight")?.value || "");

    if (!isNaN(weight) && weight > 0) {
      if (weight >= 125) rec = "4XL";
      else if (weight >= 110) rec = "3XL";
      else if (weight >= 95) rec = "2XL";
      else if (weight >= 84) rec = "XL";
      else rec = "L";
    }

    if (quizData.fitStyle === "Más Suelto y Relajado") {
      if (rec === "L") rec = "XL";
      else if (rec === "XL") rec = "2XL";
      else if (rec === "2XL") rec = "3XL";
      else if (rec === "3XL") rec = "4XL";
    }

    quizData.calculatedSize = rec;
    const recDisplay = document.getElementById("quiz-rec-display");
    if (recDisplay) recDisplay.textContent = rec;
    return rec;
  }

  // Navigation handlers
  window.nextQuizStep = function(fromStep) {
    if (fromStep === 1) {
      currentStep = 2;
    } else if (fromStep === 2) {
      quizData.heightCm = document.getElementById("quiz-height")?.value || "";
      quizData.weightKg = document.getElementById("quiz-weight")?.value || "";
      currentStep = 3;
    } else if (fromStep === 3) {
      calculateSize();
      currentStep = 4;
    }
    updateStepUI();
  };

  window.prevQuizStep = function(fromStep) {
    if (fromStep > 1) {
      currentStep = fromStep - 1;
      updateStepUI();
    }
  };

  // Step 4: Submission & WhatsApp link generation
  const leadForm = document.getElementById("quiz-lead-form");
  if (leadForm) {
    leadForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("quiz-name")?.value || "";
      const city = document.getElementById("quiz-city")?.value || "";
      const phone = document.getElementById("quiz-phone")?.value || "";

      if (!name || !city || !phone) return;

      quizData.fullName = name;
      quizData.city = city;
      quizData.phone = phone;

      // Save locally to localStorage as backup
      try {
        const stored = JSON.parse(localStorage.getItem("noxa_leads") || "[]");
        stored.push({ ...quizData, date: new Date().toISOString() });
        localStorage.setItem("noxa_leads", JSON.stringify(stored));
      } catch (err) {}

      // Format WhatsApp Deep Link (+57 311 374 3447)
      const text = `¡Hola equipo NOXA! Acabo de realizar el Diagnóstico de Fit en www.noxa.ink.\n\n👤 *Nombre:* ${name}\n📍 *Ciudad:* ${city}\n👕 *Interés:* ${quizData.preference}\n📏 *Talla Habitual:* ${quizData.usualSize}\n🎯 *Talla Sugerida NOXA:* ${quizData.calculatedSize}\n✨ *Ajuste Deseado:* ${quizData.fitStyle}\n\nMe gustaría recibir su catálogo oficial de prendas y confirmar mi talla por este medio.`;

      const waUrl = `https://wa.me/573113743447?text=${encodeURIComponent(text)}`;

      // Show completed state
      const formContainer = document.getElementById("quiz-form-container");
      const successContainer = document.getElementById("quiz-success-container");
      const waActionBtn = document.getElementById("quiz-wa-action");

      if (formContainer && successContainer) {
        formContainer.style.display = "none";
        successContainer.style.display = "block";
      }
      if (waActionBtn) {
        waActionBtn.href = waUrl;
      }

      // Automatically open WhatsApp in new tab
      window.open(waUrl, "_blank");
    });
  }

  // Consult garment shortcut: scroll and select
  window.consultGarment = function(pref) {
    const quizEl = document.getElementById("diagnostico");
    if (quizEl) {
      quizEl.scrollIntoView({ behavior: "smooth" });
    }
  };
});
