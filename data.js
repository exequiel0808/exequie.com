// ============================================================
// data.js — Almacenamiento compartido (localStorage)
// Usado tanto por index.html como por admin.html
// ============================================================

const GlamData = {
  // ---- GALERÍA ----
  getGallery() {
    return JSON.parse(localStorage.getItem('glamGallery') || '[]');
  },
  setGallery(data) {
    localStorage.setItem('glamGallery', JSON.stringify(data));
  },
  addGalleryPhoto(src, name) {
    const gallery = this.getGallery();
    gallery.unshift({ id: Date.now(), src, name, ts: Date.now() });
    this.setGallery(gallery);
    return gallery;
  },
  deleteGalleryPhoto(id) {
    const gallery = this.getGallery().filter(g => g.id !== id);
    this.setGallery(gallery);
    return gallery;
  },

  // ---- CATÁLOGO ----
  getCatalog() {
    return JSON.parse(localStorage.getItem('glamCatalog') || '[]');
  },
  setCatalog(data) {
    localStorage.setItem('glamCatalog', JSON.stringify(data));
  },
  addCatalogItem(item) {
    const catalog = this.getCatalog();
    catalog.unshift({ ...item, id: Date.now(), ts: Date.now() });
    this.setCatalog(catalog);
    return catalog;
  },
  deleteCatalogItem(id) {
    const catalog = this.getCatalog().filter(c => c.id !== id);
    this.setCatalog(catalog);
    return catalog;
  },

  // ---- SERVICIOS (editables desde admin) ----
  getServices() {
    const defaults = [
      { id: 1, icon: '💅', name: 'Uñas Acrílicas', desc: 'Extensión y modelado de uñas acrílicas de larga duración.', price: '45', unit: '/ sesión', features: ['Diseño personalizado incluido', 'Duración 3-4 semanas', 'Materiales de primera calidad'] },
      { id: 2, icon: '✨', name: 'Uñas en Gel', desc: 'Acabado brillante y natural con gel de alta calidad.', price: '38', unit: '/ sesión', features: ['Brillo duradero y sin astillas', 'Duración 2-3 semanas', 'Curado con lámpara LED'] },
      { id: 3, icon: '🎨', name: 'Nail Art', desc: 'Diseños artísticos únicos: flores, geométricos, degradados y más.', price: '25', unit: '+ base', features: ['Diseños exclusivos y únicos', 'Piedras y accesorios premium', 'Inspiración de tendencias actuales'] },
    ];
    return JSON.parse(localStorage.getItem('glamServices') || JSON.stringify(defaults));
  },
  setServices(data) {
    localStorage.setItem('glamServices', JSON.stringify(data));
  },

  // ---- CITAS ----
  getAppointments() {
    return JSON.parse(localStorage.getItem('glamAppointments') || '[]');
  },
  setAppointments(data) {
    localStorage.setItem('glamAppointments', JSON.stringify(data));
  },
  addAppointment(apt) {
    const appointments = this.getAppointments();
    const newApt = { ...apt, id: Date.now(), ts: Date.now(), status: 'nueva' };
    appointments.unshift(newApt);
    this.setAppointments(appointments);
    return newApt;
  },
  updateAppointmentStatus(id, status) {
    const appointments = this.getAppointments().map(a => a.id === id ? { ...a, status } : a);
    this.setAppointments(appointments);
  },
  deleteAppointment(id) {
    const appointments = this.getAppointments().filter(a => a.id !== id);
    this.setAppointments(appointments);
  },

  // ---- INFO DEL NEGOCIO ----
  getBusinessInfo() {
    const defaults = {
      name: 'Glam Nails Studio',
      phone: '50300000000',
      tagline: 'Arte en tus manos, belleza real.',
      instagram: '',
      address: '',
      stats: { clients: '500+', years: '3+', quality: '100%' }
    };
    return JSON.parse(localStorage.getItem('glamBusiness') || JSON.stringify(defaults));
  },
  setBusinessInfo(data) {
    localStorage.setItem('glamBusiness', JSON.stringify(data));
  },

  // ---- CATÁLOGO DEFAULT ----
  getDefaultCatalog() {
    return [
      { id: -1, name: 'French Glam', type: 'acrilicas', desc: 'Clásico french con detalles dorados', img: null, emoji: '✨', price: '45' },
      { id: -2, name: 'Rosa Pastel', type: 'gel', desc: 'Degradado rosa suave y luminoso', img: null, emoji: '🌸', price: '38' },
      { id: -3, name: 'Floral Dreams', type: 'nailart', desc: 'Flores pintadas a mano en cada uña', img: null, emoji: '🌺', price: '25' },
      { id: -4, name: 'Marble Luxe', type: 'acrilicas', desc: 'Efecto mármol en blanco y dorado', img: null, emoji: '💎', price: '50' },
      { id: -5, name: 'Glitter Night', type: 'gel', desc: 'Destellos que brillan en la oscuridad', img: null, emoji: '🌟', price: '42' },
      { id: -6, name: 'Geometric Art', type: 'nailart', desc: 'Líneas y formas geométricas minimalistas', img: null, emoji: '🎨', price: '30' },
    ];
  },

  getAllCatalog() {
    return [...this.getDefaultCatalog(), ...this.getCatalog()];
  }
};
