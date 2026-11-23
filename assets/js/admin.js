/**
 * NOXA — LÓGICA DEL PANEL DE ADMINISTRACIÓN OFICIAL
 * Seguridad con Hashes Criptográficos SHA-256 (Nativo)
 * Sincronización Local / Sin servidor externo
 */

// 1. Prevención Anti-Clickjacking (Frame Buster)
if (window.top !== window.self) {
  window.top.location = window.self.location;
}

const STORAGE_KEY = 'noxa_site_data';
const EMAIL_HASH_KEY = 'noxa_admin_emailhash';
const PASS_HASH_KEY = 'noxa_admin_passhash';
const LEADS_KEY = 'noxa_leads';

// HASHES SHA-256 PREDETERMINADOS (Credenciales protegidas)
// admin@noxa.ink -> eaf12543384c2970d46d73a88a06e09cd7cb83bcd5b9a8f4c0e821b810326683
// talento@noxa.lat -> ece4861bcce84a88bf2947599ea58ca5994a01b572b5696669c4c2d87dc80bda
const DEFAULT_EMAIL_HASHES = [
  'eaf12543384c2970d46d73a88a06e09cd7cb83bcd5b9a8f4c0e821b810326683',
  'ece4861bcce84a88bf2947599ea58ca5994a01b572b5696669c4c2d87dc80bda'
];
// Contraseña por defecto: Noxa2026!*
const DEFAULT_PASS_HASH = '4d851eab6202cf26ef58c0348812673745347287294f82bd938f1e168ae53189';

const ATTEMPTS_KEY = 'noxa_login_attempts';
const LOCKOUT_KEY = 'noxa_lockout_until';
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutos
const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutos

// Función nativa SHA-256
async function computeSHA256(text) {
  const msgBuffer = new TextEncoder().encode(text.trim());
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Datos predeterminados de fábrica de NOXA
const DEFAULT_SITE_DATA = {
  business: {
    legalName: "NOXA",
    nit: "890900266-3",
    matricula: "812832-16",
    chamber: "Cámara de Comercio de Medellín para Antioquia",
    address: "CALLE 47 D # 78A - 15, Medellín – Antioquia, Colombia",
    phone: "+57 311 374 3447",
    whatsappNumber: "573113743447",
    email: "servicioalcliente@noxa.ink",
    website: "www.noxa.ink",
    hours: "Lunes a Sábado: 8:00 AM – 6:00 PM"
  },
  hero: {
    tag: "TALLAS REALES DESDE LA L HASTA LA 4XL",
    title: "LA TALLA CAMBIA, LA ACTITUD NO.",
    subtitle: "En NOXA creamos prendas diseñadas para personas que buscan comodidad de verdad. Sin apretar, sin perder la forma, sin tener que encajar en un molde.",
    ctaText: "DESCUBRE TU FIT IDEAL →"
  },
  problem: {
    tag: "El Problema Real",
    title: "NO ERA TU CUERPO. ERA LA ROPA MAL DISEÑADA.",
    text: "Durante años la industria de la moda ha escalado patrones de forma errónea: haciendo la ropa más ancha pero no más armónica. En NOXA rediseñamos cada curva, costura y tiro para que la tela caiga con presencia y no se pegue ni se deforme."
  },
  quiz: {
    whatsappNumber: "573113743447",
    thresholds: {
      maxL: 89,
      maxXL: 104,
      max2XL: 119,
      max3XL: 134
    },
    waTemplate: "¡Hola equipo NOXA! Acabo de realizar el Diagnóstico de Fit en www.noxa.ink.\n\n👤 *Nombre:* {nombre}\n📍 *Ciudad:* {ciudad}\n👕 *Interés:* {prenda}\n📏 *Talla Habitual:* {tallaHabitual}\n🎯 *Talla Sugerida NOXA:* {tallaSugerida}\n✨ *Ajuste Deseado:* {ajuste}\n\nMe gustaría recibir su catálogo oficial de prendas y confirmar mi talla por este medio."
  },
  garments: {
    tshirt: {
      title: "Camisetas de Alto Gramaje (L a 4XL)",
      desc: "Confeccionadas en algodón pesado de densidad premium. Caída arquitectónica estructurada que no se transparenta, no se pega al abdomen y conserva su cuello intacto postura tras postura."
    },
    boxer: {
      title: "Bóxers Ergonómicos (L a 4XL)",
      desc: "Diseñados para anatomías reales. Pretina elástica ancha ultra suave que no se dobla, tiros amplios que evitan roces al caminar y tejido elástico que jamás se enrolla en las piernas."
    },
    hoodie: {
      title: "Busos & Hoodies NOXA (Próxima Cápsula)",
      desc: "Prendas exteriores de corte limpio y silueta relajada pensadas para dar calidez y presencia sin agregar volumen innecesario."
    }
  },
  media: {
    hero: "assets/editorial/personaje-1-hero.jpg",
    lookbook1: "assets/editorial/personaje-1-hero.jpg",
    lookbook2: "assets/editorial/personaje-2-lookbook.jpg",
    lookbook3: "assets/editorial/personaje-3-lookbook.jpg",
    garmentTshirt: "assets/brand/colores.png",
    garmentBoxer: "assets/brand/boxer-mockup-1.png",
    garmentUnboxing: "assets/editorial/unboxing-boxers-rigido.jpg",
    garmentHoodie: "assets/brand/buso-noxa.png",
    macroCotton: "assets/editorial/macro-textil-algodon.jpg",
    macroCollar: "assets/editorial/macro-cuello-reforzado.jpg",
    logo: "assets/brand/logo.png"
  }
};

// Cargar o inicializar datos
function getSiteData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SITE_DATA;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_SITE_DATA, ...parsed };
  } catch (e) {
    return DEFAULT_SITE_DATA;
  }
}

function saveSiteData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Cargar leads
function getLeads() {
  try {
    return JSON.parse(localStorage.getItem(LEADS_KEY) || '[]');
  } catch (e) {
    return [];
  }
}

// ==========================================================================
// CICLO DE VIDA Y SESIÓN
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  const loginScreen = document.getElementById('loginScreen');
  const loginForm = document.getElementById('loginForm');
  const loginError = document.getElementById('loginError');
  const loginLockout = document.getElementById('loginLockout');
  const loginErrorMsg = document.getElementById('loginErrorMsg');
  const btnLogout = document.getElementById('btnLogout');
  const toast = document.getElementById('adminToast');

  // Notificación flotante (Toast)
  window.showToast = function(msg) {
    if (!toast) return;
    toast.querySelector('.toast-msg').textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  };

  // Verificar Bloqueo por Fuerza Bruta
  function checkLockout() {
    const lockoutUntil = parseInt(localStorage.getItem(LOCKOUT_KEY) || '0', 10);
    const now = Date.now();
    if (lockoutUntil && now < lockoutUntil) {
      const remainingMin = Math.ceil((lockoutUntil - now) / 60000);
      loginError.style.display = 'none';
      loginLockout.style.display = 'block';
      loginLockout.innerHTML = `<i class="fa-solid fa-shield-halved"></i> <strong>Acceso bloqueado</strong> temporalmente. Intenta de nuevo en ${remainingMin} minuto(s).`;
      return true;
    } else if (lockoutUntil && now >= lockoutUntil) {
      localStorage.removeItem(LOCKOUT_KEY);
      localStorage.removeItem(ATTEMPTS_KEY);
      loginLockout.style.display = 'none';
    }
    return false;
  }

  // Verificar Sesión Activa
  function checkSession() {
    const sessionToken = sessionStorage.getItem('noxa_admin_auth');
    const sessionTime = parseInt(sessionStorage.getItem('noxa_admin_time') || '0', 10);
    const now = Date.now();

    if (sessionToken === 'authenticated' && (now - sessionTime < SESSION_TIMEOUT_MS)) {
      sessionStorage.setItem('noxa_admin_time', now.toString());
      if (loginScreen) loginScreen.style.display = 'none';
      initDashboard();
    } else {
      sessionStorage.removeItem('noxa_admin_auth');
      sessionStorage.removeItem('noxa_admin_time');
      if (loginScreen) loginScreen.style.display = 'flex';
      checkLockout();
    }
  }

  // Enviar formulario de Login
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (checkLockout()) return;

      const emailInput = document.getElementById('loginEmail').value.trim().toLowerCase();
      const passInput = document.getElementById('loginPassword').value;

      const emailHash = await computeSHA256(emailInput);
      const passHash = await computeSHA256(passInput);

      const customEmailHash = localStorage.getItem(EMAIL_HASH_KEY);
      const customPassHash = localStorage.getItem(PASS_HASH_KEY);

      const emailValid = customEmailHash 
        ? (emailHash === customEmailHash) 
        : DEFAULT_EMAIL_HASHES.includes(emailHash);

      const passValid = customPassHash 
        ? (passHash === customPassHash) 
        : (passHash === DEFAULT_PASS_HASH);

      if (emailValid && passValid) {
        // Login exitoso
        localStorage.removeItem(ATTEMPTS_KEY);
        localStorage.removeItem(LOCKOUT_KEY);
        sessionStorage.setItem('noxa_admin_auth', 'authenticated');
        sessionStorage.setItem('noxa_admin_time', Date.now().toString());

        loginScreen.style.display = 'none';
        loginError.style.display = 'none';
        initDashboard();
        showToast('¡Bienvenido al Panel Oficial de NOXA!');
      } else {
        // Login fallido
        let attempts = parseInt(localStorage.getItem(ATTEMPTS_KEY) || '0', 10) + 1;
        localStorage.setItem(ATTEMPTS_KEY, attempts.toString());

        if (attempts >= MAX_ATTEMPTS) {
          localStorage.setItem(LOCKOUT_KEY, (Date.now() + LOCKOUT_DURATION_MS).toString());
          checkLockout();
        } else {
          loginError.style.display = 'block';
          loginErrorMsg.textContent = `Correo o contraseña incorrectos. Quedan ${MAX_ATTEMPTS - attempts} intento(s).`;
        }
      }
    });
  }

  // Cerrar Sesión
  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      sessionStorage.removeItem('noxa_admin_auth');
      sessionStorage.removeItem('noxa_admin_time');
      window.location.reload();
    });
  }

  // Toggle de visualización de contraseña
  const togglePassBtn = document.getElementById('togglePasswordVisibility');
  const passInput = document.getElementById('loginPassword');
  if (togglePassBtn && passInput) {
    togglePassBtn.addEventListener('click', () => {
      const isPass = passInput.type === 'password';
      passInput.type = isPass ? 'text' : 'password';
      togglePassBtn.innerHTML = isPass ? '<i class="fa-regular fa-eye-slash"></i>' : '<i class="fa-regular fa-eye"></i>';
    });
  }

  // Pestañas del Sidebar
  const navBtns = document.querySelectorAll('.nav-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  const navItems = document.querySelectorAll('.nav-item');

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');
      navItems.forEach(i => i.classList.remove('active'));
      btn.parentElement.classList.add('active');

      tabPanes.forEach(pane => {
        pane.classList.remove('active');
        if (pane.id === targetId) {
          pane.classList.add('active');
        }
      });
    });
  });

  checkSession();
});

// ==========================================================================
// INICIALIZACIÓN DEL DASHBOARD Y FORMULARIOS
// ==========================================================================
function initDashboard() {
  const data = getSiteData();

  // 1. Llenar Tab 1: Información & Contacto
  document.getElementById('bizLegalName').value = data.business?.legalName || '';
  document.getElementById('bizNit').value = data.business?.nit || '';
  document.getElementById('bizMatricula').value = data.business?.matricula || '';
  document.getElementById('bizChamber').value = data.business?.chamber || '';
  document.getElementById('bizAddress').value = data.business?.address || '';
  document.getElementById('bizPhone').value = data.business?.phone || '';
  document.getElementById('bizWhatsapp').value = data.business?.whatsappNumber || '';
  document.getElementById('bizEmail').value = data.business?.email || '';

  // 2. Llenar Tab 2: Portada & Manifiesto
  document.getElementById('heroTag').value = data.hero?.tag || '';
  document.getElementById('heroTitle').value = data.hero?.title || '';
  document.getElementById('heroSubtitle').value = data.hero?.subtitle || '';
  document.getElementById('problemTitle').value = data.problem?.title || '';
  document.getElementById('problemText').value = data.problem?.text || '';

  // 3. Llenar Tab 3: Colección de Prendas
  document.getElementById('tshirtTitle').value = data.garments?.tshirt?.title || '';
  document.getElementById('tshirtDesc').value = data.garments?.tshirt?.desc || '';
  document.getElementById('boxerTitle').value = data.garments?.boxer?.title || '';
  document.getElementById('boxerDesc').value = data.garments?.boxer?.desc || '';
  document.getElementById('hoodieTitle').value = data.garments?.hoodie?.title || '';
  document.getElementById('hoodieDesc').value = data.garments?.hoodie?.desc || '';

  // 4. Llenar Tab 4: Diagnóstico & WhatsApp
  document.getElementById('quizWhatsapp').value = data.quiz?.whatsappNumber || '';
  document.getElementById('threshL').value = data.quiz?.thresholds?.maxL || 89;
  document.getElementById('threshXL').value = data.quiz?.thresholds?.maxXL || 104;
  document.getElementById('thresh2XL').value = data.quiz?.thresholds?.max2XL || 119;
  document.getElementById('thresh3XL').value = data.quiz?.thresholds?.max3XL || 134;
  document.getElementById('quizWaTemplate').value = data.quiz?.waTemplate || '';

  // 5. Cargar Leads
  renderLeadsTable();

  // 6. Resaltar Tema Activo
  const currentTheme = data.theme || localStorage.getItem('noxa_active_theme') || 'onyx-sand';
  updateThemeUI(currentTheme);

  // 7. Cargar Fotos y Medios
  loadMediaUI(data.media || DEFAULT_SITE_DATA.media);

  // Escuchadores de Guardado
  setupSaveHandlers();
}

// ==========================================================================
// GESTIÓN DE FOTOS & MULTIMEDIA
// ==========================================================================
function loadMediaUI(media) {
  if (!media) return;
  for (const key in media) {
    const input = document.getElementById(`input-media-${key}`);
    const preview = document.getElementById(`preview-${key}`);
    if (input) input.value = media[key];
    if (preview) preview.src = media[key];
  }
}

window.handleMediaUpload = function(inputEl, key) {
  const file = inputEl.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const dataUrl = e.target.result;
    const input = document.getElementById(`input-media-${key}`);
    const preview = document.getElementById(`preview-${key}`);
    if (input) input.value = dataUrl;
    if (preview) preview.src = dataUrl;

    const data = getSiteData();
    if (!data.media) data.media = { ...DEFAULT_SITE_DATA.media };
    data.media[key] = dataUrl;
    saveSiteData(data);
    showToast('✓ Imagen cargada y guardada correctamente.');
  };
  reader.readAsDataURL(file);
};

window.resetMediaDefault = function(key, defaultUrl) {
  const input = document.getElementById(`input-media-${key}`);
  const preview = document.getElementById(`preview-${key}`);
  if (input) input.value = defaultUrl;
  if (preview) preview.src = defaultUrl;

  const data = getSiteData();
  if (!data.media) data.media = { ...DEFAULT_SITE_DATA.media };
  data.media[key] = defaultUrl;
  saveSiteData(data);
  showToast('✓ Imagen restablecida al valor original.');
};

function saveAllMedia() {
  const data = getSiteData();
  if (!data.media) data.media = { ...DEFAULT_SITE_DATA.media };
  const keys = ['hero', 'lookbook1', 'lookbook2', 'lookbook3', 'garmentTshirt', 'garmentBoxer', 'garmentUnboxing', 'garmentHoodie', 'macroCotton', 'macroCollar', 'logo'];
  keys.forEach(k => {
    const input = document.getElementById(`input-media-${k}`);
    if (input && input.value) {
      data.media[k] = input.value.trim();
    }
  });
  saveSiteData(data);
  showToast('✓ Todas las fotos han sido guardadas con éxito.');
}

// ==========================================================================
// GESTIÓN DE TEMAS VISUALES
// ==========================================================================
const THEME_NAMES = {
  'onyx-sand': 'Onyx & Arena Cálida',
  'obsidian-gold': 'Obsidiana & Oro Viejo',
  'titanium-slate': 'Titanio & Monolito',
  'midnight-navy': 'Azul Marino & Lino',
  'olive-stone': 'Oliva Drab & Piedra',
  'editorial-bone': 'Blanco Hueso & Carbón'
};

function updateThemeUI(activeTheme) {
  const cards = document.querySelectorAll('.theme-card');
  cards.forEach(card => {
    const id = card.getAttribute('data-theme-id');
    const btn = card.querySelector('button');
    if (id === activeTheme) {
      card.classList.add('active');
      if (btn) {
        btn.className = 'btn-admin btn-admin-accent';
        btn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Tema Activo';
      }
    } else {
      card.classList.remove('active');
      if (btn) {
        btn.className = 'btn-admin btn-admin-outline';
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Activar Tema';
      }
    }
  });
}

window.applyThemeSelection = function(themeId) {
  const data = getSiteData();
  data.theme = themeId;
  saveSiteData(data);
  localStorage.setItem('noxa_active_theme', themeId);
  updateThemeUI(themeId);
  const themeName = THEME_NAMES[themeId] || themeId;
  showToast(`✓ Tema "${themeName}" activado en noxa.ink`);
};

// ==========================================================================
// GUARDAR CAMBIOS POR SECCIÓN
// ==========================================================================
function setupSaveHandlers() {
  // Guardar Fotos y Medios
  document.getElementById('btnSaveMediaAll')?.addEventListener('click', saveAllMedia);

  // Form 1: Información & Contacto
  document.getElementById('formBusiness')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = getSiteData();
    data.business = {
      ...data.business,
      legalName: document.getElementById('bizLegalName').value.trim(),
      nit: document.getElementById('bizNit').value.trim(),
      matricula: document.getElementById('bizMatricula').value.trim(),
      chamber: document.getElementById('bizChamber').value.trim(),
      address: document.getElementById('bizAddress').value.trim(),
      phone: document.getElementById('bizPhone').value.trim(),
      whatsappNumber: document.getElementById('bizWhatsapp').value.trim().replace(/\D/g, ''),
      email: document.getElementById('bizEmail').value.trim()
    };
    saveSiteData(data);
    showToast('✓ Información corporativa guardada correctamente.');
  });

  // Form 2: Portada & Manifiesto
  document.getElementById('formHero')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = getSiteData();
    data.hero = {
      ...data.hero,
      tag: document.getElementById('heroTag').value.trim(),
      title: document.getElementById('heroTitle').value.trim(),
      subtitle: document.getElementById('heroSubtitle').value.trim()
    };
    data.problem = {
      ...data.problem,
      title: document.getElementById('problemTitle').value.trim(),
      text: document.getElementById('problemText').value.trim()
    };
    saveSiteData(data);
    showToast('✓ Textos de portada y manifiesto actualizados.');
  });

  // Form 3: Colección de Prendas
  document.getElementById('formGarments')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = getSiteData();
    data.garments = {
      tshirt: {
        title: document.getElementById('tshirtTitle').value.trim(),
        desc: document.getElementById('tshirtDesc').value.trim()
      },
      boxer: {
        title: document.getElementById('boxerTitle').value.trim(),
        desc: document.getElementById('boxerDesc').value.trim()
      },
      hoodie: {
        title: document.getElementById('hoodieTitle').value.trim(),
        desc: document.getElementById('hoodieDesc').value.trim()
      }
    };
    saveSiteData(data);
    showToast('✓ Catálogo de prendas actualizado.');
  });

  // Form 4: Diagnóstico & WhatsApp
  document.getElementById('formQuiz')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = getSiteData();
    data.quiz = {
      whatsappNumber: document.getElementById('quizWhatsapp').value.trim().replace(/\D/g, ''),
      thresholds: {
        maxL: parseInt(document.getElementById('threshL').value, 10) || 89,
        maxXL: parseInt(document.getElementById('threshXL').value, 10) || 104,
        max2XL: parseInt(document.getElementById('thresh2XL').value, 10) || 119,
        max3XL: parseInt(document.getElementById('thresh3XL').value, 10) || 134
      },
      waTemplate: document.getElementById('quizWaTemplate').value
    };
    saveSiteData(data);
    showToast('✓ Parámetros del Diagnóstico y WhatsApp guardados.');
  });

  // Form 6: Seguridad & Contraseña
  document.getElementById('formSecurity')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newEmail = document.getElementById('newAdminEmail').value.trim().toLowerCase();
    const newPass = document.getElementById('newAdminPassword').value;
    const confirmPass = document.getElementById('confirmAdminPassword').value;

    if (newPass && newPass !== confirmPass) {
      alert('La confirmación de la contraseña no coincide.');
      return;
    }

    if (newEmail) {
      const emailHash = await computeSHA256(newEmail);
      localStorage.setItem(EMAIL_HASH_KEY, emailHash);
    }
    if (newPass) {
      if (newPass.length < 6) {
        alert('La contraseña debe tener al menos 6 caracteres.');
        return;
      }
      const passHash = await computeSHA256(newPass);
      localStorage.setItem(PASS_HASH_KEY, passHash);
    }

    showToast('✓ Credenciales de acceso actualizadas con éxito.');
    document.getElementById('formSecurity').reset();
  });

  // Exportar a CSV
  document.getElementById('btnExportCsv')?.addEventListener('click', () => {
    exportLeadsToCsv();
  });

  // Borrar todos los leads
  document.getElementById('btnClearLeads')?.addEventListener('click', () => {
    if (confirm('¿Estás seguro de que deseas eliminar todo el historial de clientes registrados? Esta acción no se puede deshacer.')) {
      localStorage.removeItem(LEADS_KEY);
      renderLeadsTable();
      showToast('✓ Historial de prospectos borrado.');
    }
  });

  // Descargar Copia de Seguridad JSON
  document.getElementById('btnDownloadBackup')?.addEventListener('click', () => {
    const backup = {
      siteData: getSiteData(),
      leads: getLeads(),
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `noxa-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('✓ Copia de seguridad descargada.');
  });

  // Restaurar Copia de Seguridad JSON
  document.getElementById('backupFileInput')?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        if (json.siteData) {
          saveSiteData(json.siteData);
        }
        if (json.leads) {
          localStorage.setItem(LEADS_KEY, JSON.stringify(json.leads));
        }
        showToast('✓ Respaldo restaurado con éxito. Actualizando...');
        setTimeout(() => window.location.reload(), 1500);
      } catch (err) {
        alert('El archivo no tiene un formato JSON válido.');
      }
    };
    reader.readAsText(file);
  });

  // Restablecer a fábrica
  document.getElementById('btnResetDefaults')?.addEventListener('click', () => {
    if (confirm('¿Restablecer todos los textos y datos de NOXA a sus valores originales de fábrica?')) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(EMAIL_HASH_KEY);
      localStorage.removeItem(PASS_HASH_KEY);
      showToast('✓ Valores originales restaurados.');
      setTimeout(() => window.location.reload(), 1200);
    }
  });
}

// ==========================================================================
// TABLA DE PROSPECTOS (CRM LEADS)
// ==========================================================================
function renderLeadsTable() {
  const leads = getLeads();
  const tbody = document.getElementById('leadsTableBody');
  const countEl = document.getElementById('leadsCountBadge');

  if (countEl) countEl.textContent = `${leads.length} Registros`;
  if (!tbody) return;

  if (leads.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; padding: 3rem; color: var(--admin-text-muted);">
          <i class="fa-regular fa-folder-open" style="font-size: 2rem; margin-bottom: 0.5rem; display: block;"></i>
          No hay prospectos registrados aún. Cuando los clientes completen el Diagnóstico de Fit, aparecerán aquí.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = leads.map((lead, idx) => {
    const formattedDate = lead.date ? new Date(lead.date).toLocaleDateString('es-CO', {
      day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
    }) : 'Reciente';

    const cleanPhone = (lead.phone || '').replace(/\D/g, '');
    const waLink = `https://wa.me/57${cleanPhone}?text=${encodeURIComponent(`Hola ${lead.fullName || ''}, te saludamos de NOXA respecto a tu diagnóstico de fit para talla ${lead.calculatedSize || ''}.`)}`;

    return `
      <tr>
        <td style="color: var(--admin-text-muted); font-size: 0.78rem;">${formattedDate}</td>
        <td><strong>${escapeHtml(lead.fullName || 'Anónimo')}</strong></td>
        <td>${escapeHtml(lead.city || 'No especificada')}</td>
        <td>${escapeHtml(lead.phone || '')}</td>
        <td>${escapeHtml(lead.preference || 'Camisetas')}</td>
        <td><span class="pill-size">${escapeHtml(lead.calculatedSize || 'L')}</span></td>
        <td>
          <div class="action-btns">
            ${cleanPhone ? `
              <a href="${waLink}" target="_blank" class="btn-icon" title="Abrir Chat WhatsApp">
                <i class="fa-brands fa-whatsapp" style="color: #25D366;"></i>
              </a>
            ` : ''}
            <button class="btn-icon btn-icon-danger" onclick="deleteLead(${idx})" title="Eliminar registro">
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

window.deleteLead = function(idx) {
  const leads = getLeads();
  leads.splice(idx, 1);
  localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
  renderLeadsTable();
  showToast('Registro eliminado.');
};

function exportLeadsToCsv() {
  const leads = getLeads();
  if (leads.length === 0) {
    alert('No hay prospectos para exportar.');
    return;
  }

  let csv = 'Fecha,Nombre,Ciudad,Telefono,Interes,Talla_Habitual,Talla_Recomendada,Ajuste\n';
  leads.forEach(l => {
    csv += `"${l.date || ''}","${l.fullName || ''}","${l.city || ''}","${l.phone || ''}","${l.preference || ''}","${l.usualSize || ''}","${l.calculatedSize || ''}","${l.fitStyle || ''}"\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `leads-noxa-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('✓ Archivo CSV descargado.');
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, m => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[m]);
}
