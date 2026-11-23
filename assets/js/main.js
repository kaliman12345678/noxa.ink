/**
 * NOXA — Script Principal de Experiencia de Usuario
 * Sincronización Dinámica con Panel de Administración Local
 */

document.addEventListener("DOMContentLoaded", () => {
  // ==========================================================================
  // 0. SINCRONIZACIÓN CON EL PANEL DE ADMINISTRACIÓN (localStorage)
  // ==========================================================================
  let customSiteData = null;
  try {
    const raw = localStorage.getItem("noxa_site_data");
    if (raw) {
      customSiteData = JSON.parse(raw);
    }
  } catch (err) {}

  const activeTheme = customSiteData?.theme || localStorage.getItem("noxa_active_theme") || "onyx-sand";
  document.documentElement.setAttribute("data-theme", activeTheme);

  if (customSiteData) {
    applyAdminSiteData(customSiteData);
  }

  function applyAdminSiteData(data) {
    if (!data) return;

    // Aplicar Tema Visual
    if (data.theme) {
      document.documentElement.setAttribute("data-theme", data.theme);
    }

    // Actualizar Hero
    if (data.hero?.tag) {
      const heroTag = document.querySelector(".hero-badge");
      if (heroTag) heroTag.textContent = data.hero.tag;
    }
    if (data.hero?.title) {
      const heroTitle = document.querySelector(".hero-title");
      if (heroTitle) {
        const clean = String(data.hero.title)
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
          .replace(/on\w+="[^"]*"/gi, "")
          .replace(/javascript:/gi, "");
        heroTitle.innerHTML = clean;
      }
    }
    if (data.hero?.subtitle) {
      const heroSub = document.querySelector(".hero-subtitle");
      if (heroSub) heroSub.textContent = data.hero.subtitle;
    }

    // Actualizar Problema / Empatía
    if (data.problem?.title) {
      const probTitle = document.querySelector(".problem-title");
      if (probTitle) probTitle.textContent = data.problem.title;
    }
    if (data.problem?.text) {
      const probText = document.querySelector(".problem-desc");
      if (probText) probText.textContent = data.problem.text;
    }

    // Actualizar Prendas
    if (data.garments?.tshirt?.title) {
      const tTitle = document.querySelector("[data-garment='tshirt'] .garment-title");
      if (tTitle) tTitle.textContent = data.garments.tshirt.title;
    }
    if (data.garments?.tshirt?.desc) {
      const tDesc = document.querySelector("[data-garment='tshirt'] .garment-desc");
      if (tDesc) tDesc.textContent = data.garments.tshirt.desc;
    }
    if (data.garments?.boxer?.title) {
      const bTitle = document.querySelector("[data-garment='boxer'] .garment-title");
      if (bTitle) bTitle.textContent = data.garments.boxer.title;
    }
    if (data.garments?.boxer?.desc) {
      const bDesc = document.querySelector("[data-garment='boxer'] .garment-desc");
      if (bDesc) bDesc.textContent = data.garments.boxer.desc;
    }
    if (data.garments?.hoodie?.title) {
      const hTitle = document.querySelector("[data-garment='hoodie'] .garment-title");
      if (hTitle) hTitle.textContent = data.garments.hoodie.title;
    }
    if (data.garments?.hoodie?.desc) {
      const hDesc = document.querySelector("[data-garment='hoodie'] .garment-desc");
      if (hDesc) hDesc.textContent = data.garments.hoodie.desc;
    }

    // Actualizar Información Corporativa en Footer
    if (data.business?.legalName) {
      const fLegal = document.querySelectorAll(".footer-legal-name");
      fLegal.forEach(el => el.textContent = data.business.legalName);
    }
    if (data.business?.nit) {
      const fNit = document.querySelectorAll(".footer-nit");
      fNit.forEach(el => el.textContent = data.business.nit);
    }
    if (data.business?.matricula) {
      const fMat = document.querySelectorAll(".footer-matricula");
      fMat.forEach(el => el.textContent = data.business.matricula);
    }
    if (data.business?.address) {
      const fAddr = document.querySelectorAll(".footer-address");
      fAddr.forEach(el => el.textContent = data.business.address);
    }
    if (data.business?.email) {
      const fMail = document.querySelectorAll(".footer-email");
      fMail.forEach(el => {
        el.textContent = data.business.email;
        el.href = `mailto:${data.business.email}`;
      });
    }
    if (data.business?.phone) {
      const fPhone = document.querySelectorAll(".footer-phone");
      fPhone.forEach(el => el.textContent = data.business.phone);
    }

    // Actualizar enlaces de WhatsApp en Header y Botones
    if (data.business?.whatsappNumber) {
      const waNum = data.business.whatsappNumber.replace(/\D/g, "");
      const waBtns = document.querySelectorAll(".btn-wa-header");
      waBtns.forEach(btn => {
        btn.href = `https://wa.me/${waNum}?text=${encodeURIComponent("Hola NOXA, deseo solicitar asesoría sobre el fit anatómico de sus prendas.")}`;
      });
    }

    // Actualizar Fotos & Medios Dinámicamente
    if (data.media) {
      const m = data.media;
      if (m.hero) {
        const heroContainer = document.getElementById("hero-bg-container");
        const heroImg = document.getElementById("img-hero");
        const isVideo = m.hero.endsWith('.mp4') || m.hero.endsWith('.webm') || m.hero.startsWith('data:video');
        if (isVideo && heroContainer) {
          heroContainer.innerHTML = `
            <video autoplay muted loop playsinline class="hero-bg-img" style="object-fit: cover; width: 100%; height: 100%;">
              <source src="${m.hero}" type="video/mp4">
            </video>
            <div class="hero-overlay"></div>
          `;
        } else if (heroImg) {
          heroImg.src = m.hero;
        }
      }
      if (m.lookbook1) {
        const el = document.getElementById("img-lookbook-1");
        if (el) el.src = m.lookbook1;
      }
      if (m.lookbook2) {
        const el = document.getElementById("img-lookbook-2");
        if (el) el.src = m.lookbook2;
      }
      if (m.lookbook3) {
        const el = document.getElementById("img-lookbook-3");
        if (el) el.src = m.lookbook3;
      }
      if (m.garmentTshirt) {
        const el = document.getElementById("img-garment-tshirt");
        if (el) el.src = m.garmentTshirt;
      }
      if (m.garmentBoxer) {
        const el = document.getElementById("img-garment-boxer");
        if (el) el.src = m.garmentBoxer;
      }
      if (m.garmentUnboxing) {
        const el = document.getElementById("img-garment-unboxing");
        if (el) el.src = m.garmentUnboxing;
      }
      if (m.garmentHoodie) {
        const el = document.getElementById("img-garment-hoodie");
        if (el) el.src = m.garmentHoodie;
      }
      if (m.macroCotton) {
        const el = document.getElementById("img-macro-cotton");
        if (el) el.src = m.macroCotton;
      }
      if (m.macroCollar) {
        const el = document.getElementById("img-macro-collar");
        if (el) el.src = m.macroCollar;
      }
      if (m.logo) {
        document.querySelectorAll(".header-logo, .footer-logo").forEach(img => img.src = m.logo);
      }
    }
  }

  // ==========================================================================
  // ATAJOS DISCRETOS DE ACCESO AL PANEL DE ADMINISTRACIÓN
  // ==========================================================================
  // Atajo 1: Teclado (Ctrl + Shift + A o Cmd + Shift + A)
  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "A" || e.key === "a" || e.code === "KeyA")) {
      e.preventDefault();
      window.location.href = "admin.html";
    }
  });

  // Atajo 2: 5 clics rápidos consecutivos en el Logo del Header
  const headerLogo = document.querySelector(".header-logo");
  if (headerLogo) {
    let logoClicks = 0;
    let logoTimer = null;
    headerLogo.addEventListener("click", (e) => {
      logoClicks++;
      clearTimeout(logoTimer);
      if (logoClicks >= 5) {
        logoClicks = 0;
        window.location.href = "admin.html";
      } else {
        logoTimer = setTimeout(() => {
          logoClicks = 0;
        }, 2000);
      }
    });
  }

  // ==========================================================================
  // 1. STICKY HEADER & NAVEGACIÓN MÓVIL
  // ==========================================================================
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

  const mobileToggle = document.querySelector(".mobile-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener("click", () => {
      mobileNav.classList.toggle("open");
    });
    mobileNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("open");
      });
    });
  }

  // ==========================================================================
  // 2. DIAGNÓSTICO DE FIT INTERACTIVO
  // ==========================================================================
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

  // Paso 1: Selección de prenda
  document.querySelectorAll("[data-quiz-pref]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-quiz-pref]").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      quizData.preference = btn.getAttribute("data-quiz-pref");
    });
  });

  // Paso 2: Selección de talla habitual
  document.querySelectorAll("[data-quiz-size]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-quiz-size]").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      quizData.usualSize = btn.getAttribute("data-quiz-size");
    });
  });

  // Paso 3: Selección de ajuste
  document.querySelectorAll("[data-quiz-fit]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-quiz-fit]").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      quizData.fitStyle = btn.getAttribute("data-quiz-fit");
    });
  });

  // Algoritmo de cálculo de talla (con soporte para umbrales del admin)
  function calculateSize() {
    let rec = quizData.usualSize || "2XL";
    const weight = parseFloat(document.getElementById("quiz-weight")?.value || "");

    const thresh = customSiteData?.quiz?.thresholds || {
      maxL: 89,
      maxXL: 104,
      max2XL: 119,
      max3XL: 134
    };

    if (!isNaN(weight) && weight > 0) {
      if (weight <= thresh.maxL) rec = "L";
      else if (weight <= thresh.maxXL) rec = "XL";
      else if (weight <= thresh.max2XL) rec = "2XL";
      else if (weight <= thresh.max3XL) rec = "3XL";
      else rec = "4XL";
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

  // Navegación de pasos
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

  // Paso 4: Envío, registro en CRM local y apertura de WhatsApp
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

      // 1. Guardar en Bandeja de Leads Local (CRM)
      try {
        const stored = JSON.parse(localStorage.getItem("noxa_leads") || "[]");
        stored.unshift({ ...quizData, date: new Date().toISOString() });
        localStorage.setItem("noxa_leads", JSON.stringify(stored));
      } catch (err) {}

      // 2. Generar mensaje de WhatsApp dinámico
      const waNumber = (customSiteData?.quiz?.whatsappNumber || "573113743447").replace(/\D/g, "");
      let template = customSiteData?.quiz?.waTemplate || 
        "¡Hola equipo NOXA! Acabo de realizar el Diagnóstico de Fit en www.noxa.ink.\n\n👤 *Nombre:* {nombre}\n📍 *Ciudad:* {ciudad}\n👕 *Interés:* {prenda}\n📏 *Talla Habitual:* {tallaHabitual}\n🎯 *Talla Sugerida NOXA:* {tallaSugerida}\n✨ *Ajuste Deseado:* {ajuste}\n\nMe gustaría recibir su catálogo oficial de prendas y confirmar mi talla por este medio.";

      const text = template
        .replace(/{nombre}/g, name)
        .replace(/{ciudad}/g, city)
        .replace(/{prenda}/g, quizData.preference)
        .replace(/{tallaHabitual}/g, quizData.usualSize)
        .replace(/{tallaSugerida}/g, quizData.calculatedSize)
        .replace(/{ajuste}/g, quizData.fitStyle);

      const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;

      // 3. Mostrar pantalla de éxito
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

      // 4. Abrir WhatsApp automáticamente en pestaña nueva
      window.open(waUrl, "_blank");
    });
  }

  // Acceso directo al quiz al consultar prendas
  window.consultGarment = function(pref) {
    const quizEl = document.getElementById("diagnostico");
    if (quizEl) {
      quizEl.scrollIntoView({ behavior: "smooth" });
    }
  };
});
