// ============================================================
// admin.js — Lógica del panel de administración (admin.html)
// ============================================================

// ---- CONTRASEÑA ----
// 🔒 Cambia esta contraseña antes de publicar
const ADMIN_PASSWORD = 'glam2025';

// ---- ESTADO ----
let pendingCatalogImg = null;
let pendingGalleryImg = null;
let editingServiceId = null;

// ---- LOGIN ----
function checkLogin() {
  const input = document.getElementById('adminPass').value;
  if (input === ADMIN_PASSWORD) {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'block';
    initAdmin();
  } else {
    document.getElementById('loginError').style.display = 'flex';
    document.getElementById('adminPass').value = '';
    document.getElementById('adminPass').focus();
    setTimeout(() => document.getElementById('loginError').style.display = 'none', 3000);
  }
}

document.getElementById('adminPass').addEventListener('keydown', e => {
  if (e.key === 'Enter') checkLogin();
});

// ---- TABS ----
function showTab(tabId, btn) {
  document.querySelectorAll('.tab-pane').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
  btn.classList.add('active');
}

// ============================
// TAB: GALERÍA
// ============================
function initGallery() {
  renderAdminGallery();
  const dropZone = document.getElementById('galleryDropZone');
  const fileInput = document.getElementById('galleryFileInput');

  dropZone.addEventListener('dragover', e => { e.preventDefault(); dropZone.classList.add('drag-over'); });
  dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
  dropZone.addEventListener('drop', e => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
    files.forEach(uploadGalleryFile);
  });
  dropZone.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', () => {
    Array.from(fileInput.files).forEach(uploadGalleryFile);
    fileInput.value = '';
  });
}

function uploadGalleryFile(file) {
  const reader = new FileReader();
  reader.onload = e => {
    GlamData.addGalleryPhoto(e.target.result, file.name);
    renderAdminGallery();
    showToast('Foto agregada a la galería 🌸');
  };
  reader.readAsDataURL(file);
}

function renderAdminGallery() {
  const imgs = GlamData.getGallery();
  const grid = document.getElementById('adminGalleryGrid');
  const empty = document.getElementById('galleryEmpty');
  if (imgs.length === 0) {
    grid.innerHTML = '';
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';
  grid.innerHTML = imgs.map(img => `
    <div class="admin-img-card">
      <img src="${img.src}" alt="${img.name}">
      <div class="admin-img-overlay">
        <button class="img-delete-btn" onclick="deleteGalleryPhoto(${img.id})" title="Eliminar">🗑️</button>
      </div>
      <p class="img-name">${img.name || 'Sin nombre'}</p>
    </div>
  `).join('');
}

function deleteGalleryPhoto(id) {
  if (!confirm('¿Eliminar esta foto?')) return;
  GlamData.deleteGalleryPhoto(id);
  renderAdminGallery();
  showToast('Foto eliminada');
}

// ============================
// TAB: CATÁLOGO
// ============================
function initCatalog() {
  renderAdminCatalog();
  const fileInput = document.getElementById('catalogFileInput');
  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      pendingCatalogImg = e.target.result;
      document.getElementById('catalogImgPreview').src = e.target.result;
      document.getElementById('catalogImgPreviewWrap').style.display = 'block';
    };
    reader.readAsDataURL(file);
    fileInput.value = '';
  });
}

function renderAdminCatalog() {
  const custom = GlamData.getCatalog();
  const el = document.getElementById('adminCatalogList');
  const empty = document.getElementById('catalogEmpty');
  if (custom.length === 0) {
    el.innerHTML = '';
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';
  el.innerHTML = custom.map(item => `
    <div class="catalog-admin-row">
      <div class="catalog-admin-img">
        ${item.img ? `<img src="${item.img}" alt="">` : `<span>${item.emoji || '💅'}</span>`}
      </div>
      <div class="catalog-admin-info">
        <strong>${item.name}</strong>
        <span class="cat-type-badge">${item.type === 'acrilicas' ? 'Acrílicas' : item.type === 'gel' ? 'Gel' : 'Nail Art'}</span>
        <p>${item.desc}</p>
        <span class="cat-price-label">$${item.price || '—'}</span>
      </div>
      <div class="catalog-admin-actions">
        <button class="action-btn danger" onclick="deleteCatalogItem(${item.id})">🗑️ Eliminar</button>
      </div>
    </div>
  `).join('');
}

function saveCatalogItem() {
  const name = document.getElementById('catName').value.trim();
  const type = document.getElementById('catType').value;
  const price = document.getElementById('catPrice').value.trim();
  const desc = document.getElementById('catDesc').value.trim();
  const emoji = document.getElementById('catEmoji').value.trim();

  if (!name) { alert('Escribe el nombre del diseño'); return; }

  GlamData.addCatalogItem({
    name, type, price, emoji: emoji || '💅',
    desc: desc || 'Diseño exclusivo', img: pendingCatalogImg
  });

  // Reset form
  document.getElementById('catName').value = '';
  document.getElementById('catPrice').value = '';
  document.getElementById('catDesc').value = '';
  document.getElementById('catEmoji').value = '';
  document.getElementById('catalogImgPreviewWrap').style.display = 'none';
  pendingCatalogImg = null;
  document.getElementById('catalogForm').style.display = 'none';

  renderAdminCatalog();
  showToast('Diseño agregado al catálogo 💅');
}

function deleteCatalogItem(id) {
  if (!confirm('¿Eliminar este diseño?')) return;
  GlamData.deleteCatalogItem(id);
  renderAdminCatalog();
  showToast('Diseño eliminado');
}

function toggleCatalogForm() {
  const f = document.getElementById('catalogForm');
  f.style.display = f.style.display === 'none' ? 'block' : 'none';
}

// ============================
// TAB: SERVICIOS
// ============================
function initServices() {
  renderServicesAdmin();
}

function renderServicesAdmin() {
  const services = GlamData.getServices();
  const list = document.getElementById('servicesAdminList');
  list.innerHTML = services.map(s => `
    <div class="service-admin-card" id="scard-${s.id}">
      <div class="service-admin-head">
        <span class="svc-icon-big">${s.icon}</span>
        <div>
          <strong>${s.name}</strong>
          <span class="svc-price-display">$${s.price} <em>${s.unit}</em></span>
        </div>
        <button class="action-btn secondary small" onclick="toggleEditService(${s.id})">✏️ Editar</button>
      </div>
      <div class="service-edit-form" id="sedit-${s.id}" style="display:none;">
        <div class="form-row-2">
          <div class="form-group-a">
            <label>Ícono (emoji)</label>
            <input type="text" id="sicon-${s.id}" value="${s.icon}" maxlength="4" style="font-size:24px;text-align:center;">
          </div>
          <div class="form-group-a">
            <label>Nombre</label>
            <input type="text" id="sname-${s.id}" value="${s.name}">
          </div>
        </div>
        <div class="form-row-2">
          <div class="form-group-a">
            <label>Precio ($)</label>
            <input type="text" id="sprice-${s.id}" value="${s.price}" placeholder="45">
          </div>
          <div class="form-group-a">
            <label>Unidad</label>
            <input type="text" id="sunit-${s.id}" value="${s.unit}" placeholder="/ sesión">
          </div>
        </div>
        <div class="form-group-a">
          <label>Descripción</label>
          <textarea id="sdesc-${s.id}" rows="2">${s.desc}</textarea>
        </div>
        <div class="form-group-a">
          <label>Características (una por línea)</label>
          <textarea id="sfeats-${s.id}" rows="3">${s.features.join('\n')}</textarea>
        </div>
        <div class="form-actions">
          <button class="action-btn primary" onclick="saveService(${s.id})">💾 Guardar cambios</button>
          <button class="action-btn secondary" onclick="toggleEditService(${s.id})">Cancelar</button>
        </div>
      </div>
    </div>
  `).join('');
}

function toggleEditService(id) {
  const el = document.getElementById(`sedit-${id}`);
  el.style.display = el.style.display === 'none' ? 'block' : 'none';
}

function saveService(id) {
  const services = GlamData.getServices();
  const idx = services.findIndex(s => s.id === id);
  if (idx === -1) return;
  services[idx] = {
    ...services[idx],
    icon: document.getElementById(`sicon-${id}`).value.trim() || services[idx].icon,
    name: document.getElementById(`sname-${id}`).value.trim(),
    price: document.getElementById(`sprice-${id}`).value.trim(),
    unit: document.getElementById(`sunit-${id}`).value.trim(),
    desc: document.getElementById(`sdesc-${id}`).value.trim(),
    features: document.getElementById(`sfeats-${id}`).value.trim().split('\n').filter(Boolean),
  };
  GlamData.setServices(services);
  renderServicesAdmin();
  showToast('Servicio actualizado ✨');
}

function addNewService() {
  const services = GlamData.getServices();
  services.push({
    id: Date.now(), icon: '💅', name: 'Nuevo Servicio',
    desc: 'Descripción del servicio', price: '0', unit: '/ sesión',
    features: ['Característica 1', 'Característica 2']
  });
  GlamData.setServices(services);
  renderServicesAdmin();
  // Auto-open edit for new
  const newId = services[services.length - 1].id;
  setTimeout(() => toggleEditService(newId), 50);
}

function deleteService(id) {
  if (!confirm('¿Eliminar este servicio?')) return;
  const services = GlamData.getServices().filter(s => s.id !== id);
  GlamData.setServices(services);
  renderServicesAdmin();
  showToast('Servicio eliminado');
}

// ============================
// TAB: CITAS
// ============================
function initAppointments() {
  renderAppointments();
}

function renderAppointments(filter = 'todas') {
  let apts = GlamData.getAppointments();
  if (filter !== 'todas') apts = apts.filter(a => a.status === filter);
  const list = document.getElementById('appointmentsList');
  const empty = document.getElementById('appointmentsEmpty');

  if (apts.length === 0) {
    list.innerHTML = '';
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';
  list.innerHTML = apts.map(a => `
    <div class="apt-card status-${a.status || 'nueva'}">
      <div class="apt-head">
        <div>
          <strong>${a.name}</strong>
          <span class="apt-badge ${a.status || 'nueva'}">${
            a.status === 'confirmada' ? '✅ Confirmada' :
            a.status === 'cancelada' ? '❌ Cancelada' : '🆕 Nueva'
          }</span>
        </div>
        <div class="apt-actions">
          <button class="action-btn small success" onclick="updateAptStatus(${a.id},'confirmada')">Confirmar</button>
          <button class="action-btn small danger" onclick="deleteApt(${a.id})">Eliminar</button>
        </div>
      </div>
      <div class="apt-details">
        <span>📞 ${a.phone}</span>
        <span>📅 ${a.date}</span>
        <span>⏰ ${a.time}</span>
        <span>💅 ${a.service}</span>
      </div>
      ${a.notes ? `<p class="apt-notes">📝 ${a.notes}</p>` : ''}
    </div>
  `).join('');
}

function updateAptStatus(id, status) {
  GlamData.updateAppointmentStatus(id, status);
  renderAppointments();
  showToast('Estado actualizado');
}

function deleteApt(id) {
  if (!confirm('¿Eliminar esta cita?')) return;
  GlamData.deleteAppointment(id);
  renderAppointments();
  showToast('Cita eliminada');
}

function clearAllAppointments() {
  if (!confirm('¿Eliminar TODAS las citas? Esta acción no se puede deshacer.')) return;
  GlamData.setAppointments([]);
  renderAppointments();
  showToast('Citas eliminadas');
}

// ============================
// TAB: NEGOCIO
// ============================
function initBusiness() {
  const info = GlamData.getBusinessInfo();
  document.getElementById('bizName').value = info.name;
  document.getElementById('bizPhone').value = info.phone;
  document.getElementById('bizTagline').value = info.tagline;
  document.getElementById('bizInstagram').value = info.instagram || '';
  document.getElementById('bizAddress').value = info.address || '';
  document.getElementById('bizStatClients').value = info.stats?.clients || '500+';
  document.getElementById('bizStatYears').value = info.stats?.years || '3+';
  document.getElementById('bizStatQuality').value = info.stats?.quality || '100%';
}

function saveBusinessInfo() {
  GlamData.setBusinessInfo({
    name: document.getElementById('bizName').value.trim(),
    phone: document.getElementById('bizPhone').value.trim(),
    tagline: document.getElementById('bizTagline').value.trim(),
    instagram: document.getElementById('bizInstagram').value.trim(),
    address: document.getElementById('bizAddress').value.trim(),
    stats: {
      clients: document.getElementById('bizStatClients').value.trim(),
      years: document.getElementById('bizStatYears').value.trim(),
      quality: document.getElementById('bizStatQuality').value.trim(),
    }
  });
  showToast('Información del negocio guardada 🌸');
}

// ============================
// TOAST NOTIFICATION
// ============================
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

// ============================
// INIT
// ============================
function initAdmin() {
  initGallery();
  initCatalog();
  initServices();
  initAppointments();
  initBusiness();
}
