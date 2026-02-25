// ============================================================
// app.js — Lógica de la página principal (index.html)
// ============================================================

// ---- CURSOR ----
const cur = document.getElementById('cursor');
const curRing = document.getElementById('cursorRing');
document.addEventListener('mousemove', e => {
  cur.style.left = e.clientX + 'px';
  cur.style.top = e.clientY + 'px';
  setTimeout(() => {
    curRing.style.left = e.clientX + 'px';
    curRing.style.top = e.clientY + 'px';
  }, 60);
});

// ---- NAV SCROLL ----
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', scrollY > 80);
});

// ---- SCROLL REVEAL ----
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ---- RENDER SERVICES ----
function renderServices() {
  const services = GlamData.getServices();
  const grid = document.getElementById('servicesGrid');
  grid.innerHTML = services.map(s => `
    <div class="service-card reveal">
      <span class="service-icon">${s.icon}</span>
      <h3>${s.name}</h3>
      <p>${s.desc}</p>
      <div class="service-price">$${s.price} <span>${s.unit}</span></div>
      <ul class="service-features">
        ${s.features.map(f => `<li>${f}</li>`).join('')}
      </ul>
    </div>
  `).join('');
  grid.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ---- RENDER CATALOG ----
function renderCatalog(filter = 'todos') {
  const all = GlamData.getAllCatalog();
  const filtered = filter === 'todos' ? all : all.filter(i => i.type === filter);
  const grid = document.getElementById('catalogGrid');
  grid.innerHTML = filtered.map(item => `
    <div class="catalog-item reveal" data-type="${item.type}">
      <div class="catalog-img">
        ${item.img ? `<img src="${item.img}" alt="${item.name}">` : `<span style="font-size:56px">${item.emoji || '💅'}</span>`}
        <div class="catalog-overlay"><span class="catalog-overlay-text">Ver diseño ✦</span></div>
      </div>
      <div class="catalog-info">
        <h4>${item.name}</h4>
        <p>${item.desc}</p>
        <span class="catalog-tag">${item.type === 'acrilicas' ? 'Acrílicas' : item.type === 'gel' ? 'Gel' : 'Nail Art'}</span>
        ${item.price ? `<div class="catalog-price">$${item.price}</div>` : ''}
      </div>
    </div>
  `).join('');
  grid.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function filterCatalog(btn, type) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderCatalog(type);
}

// ---- RENDER GALLERY ----
function renderGallery() {
  const imgs = GlamData.getGallery();
  const grid = document.getElementById('galleryGrid');
  const placeholders = [
    { emoji: '💅', classes: 'tall' }, { emoji: '✨', classes: '' },
    { emoji: '🌸', classes: '' }, { emoji: '🎨', classes: 'wide' },
    { emoji: '💎', classes: '' }, { emoji: '🌟', classes: '' },
  ];
  if (imgs.length === 0) {
    grid.innerHTML = placeholders.map(p => `
      <div class="gallery-item ${p.classes}">
        <div class="gallery-placeholder">${p.emoji}</div>
        <span class="gallery-empty-hint">Agrega fotos desde admin</span>
      </div>
    `).join('');
  } else {
    grid.innerHTML = imgs.map((img, i) => {
      const cls = i === 0 ? 'tall' : i === 3 ? 'wide' : '';
      return `<div class="gallery-item ${cls}" onclick="openLightbox('${img.src}')">
        <img src="${img.src}" alt="Trabajo ${i+1}">
      </div>`;
    }).join('');
  }
}

// ---- RENDER BUSINESS INFO ----
function renderBusinessInfo() {
  const info = GlamData.getBusinessInfo();
  // WA button
  const waBtn = document.getElementById('waBtn');
  if (waBtn) waBtn.href = `https://wa.me/${info.phone}`;
  // Stats
  const s = info.stats || {};
  if (document.getElementById('statClients')) document.getElementById('statClients').textContent = s.clients || '500+';
  if (document.getElementById('statYears')) document.getElementById('statYears').textContent = s.years || '3+';
  if (document.getElementById('statQuality')) document.getElementById('statQuality').textContent = s.quality || '100%';
  // Service select options
  const sel = document.getElementById('bookService');
  if (sel) {
    const services = GlamData.getServices();
    sel.innerHTML = '<option value="">Elige un servicio...</option>' +
      services.map(s => `<option>${s.name} — $${s.price}</option>`).join('') +
      '<option>Acrílicas + Nail Art</option><option>Gel + Nail Art</option>';
  }
}

// ---- N8N WEBHOOK ----
// 👇 Cambia por tu URL de n8n cuando lo tengas
const N8N_WEBHOOK_URL = 'https://TU-N8N.com/webhook/glam-nails-cita';

// ---- BOOKING ----
async function submitBooking() {
  const name = document.getElementById('bookName').value.trim();
  const phone = document.getElementById('bookPhone').value.trim();
  const service = document.getElementById('bookService').value;
  const date = document.getElementById('bookDate').value;
  const time = document.getElementById('bookTime').value;
  const notes = document.getElementById('bookNotes').value.trim();

  if (!name || !phone || !service || !date || !time) {
    alert('Por favor completa todos los campos requeridos 🌸');
    return;
  }

  GlamData.addAppointment({ name, phone, service, date, time, notes });

  const btn = document.querySelector('.btn-submit');
  btn.textContent = '⏳ Enviando...';
  btn.disabled = true;

  try {
    const info = GlamData.getBusinessInfo();
    await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      mode: 'no-cors',
      body: JSON.stringify({
        nombre: name, telefono: phone, servicio: service,
        fecha: date, hora: time, notas: notes,
        negocio: info.name,
        fecha_registro: new Date().toLocaleString('es-SV'),
        mensaje_whatsapp: `✦ NUEVA CITA ✦\n\n👤 ${name}\n📞 ${phone}\n💅 ${service}\n📅 ${date} · ⏰ ${time}${notes ? `\n📝 ${notes}` : ''}`
      })
    });
  } catch(e) {
    console.log('n8n no disponible, cita guardada localmente.');
  }

  document.getElementById('bookingForm').style.display = 'none';
  document.getElementById('bookingSuccess').style.display = 'block';
}

// ---- LIGHTBOX ----
function openLightbox(src) {
  document.getElementById('lightboxImg').src = src;
  document.getElementById('lightbox').classList.add('open');
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  renderBusinessInfo();
  renderServices();
  renderCatalog();
  renderGallery();
  document.getElementById('bookDate').min = new Date().toISOString().split('T')[0];
});
