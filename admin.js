<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Admin — Glam Nails Studio</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,400&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
:root {
  --rose: #c2185b;
  --rose-light: #e91e8c;
  --gold: #c9a96e;
  --bg: #0f0508;
  --sidebar-w: 240px;
}
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Jost', sans-serif; background: var(--bg); color: #e8d5dc; min-height: 100vh; }

/* LOGIN */
#loginScreen { min-height:100vh; display:flex; align-items:center; justify-content:center;
  background: radial-gradient(ellipse at 60% 30%, rgba(194,24,91,.12) 0%, transparent 60%), var(--bg); }
.login-box { background:rgba(255,255,255,.04); border:1px solid rgba(194,24,91,.2); border-radius:28px;
  padding:52px 44px; width:100%; max-width:420px; text-align:center;
  backdrop-filter:blur(20px); box-shadow:0 32px 80px rgba(0,0,0,.4); }
.login-logo { font-family:'Cormorant Garamond',serif; font-size:30px; color:var(--rose); margin-bottom:6px; }
.login-logo span { color:var(--gold); font-style:italic; }
.login-subtitle { font-size:13px; color:rgba(255,255,255,.3); letter-spacing:1.5px; text-transform:uppercase; margin-bottom:36px; }
.login-icon { font-size:52px; margin-bottom:20px; }
.login-box h2 { font-family:'Cormorant Garamond',serif; font-size:26px; color:#fff; margin-bottom:8px; }
.login-box > p { font-size:14px; color:rgba(255,255,255,.4); margin-bottom:28px; }
.login-input-wrap { margin-bottom:16px; }
.login-input-wrap input { width:100%; padding:14px 18px; background:rgba(255,255,255,.06);
  border:1.5px solid rgba(194,24,91,.25); border-radius:14px; font-family:'Jost',sans-serif;
  font-size:15px; color:#fff; outline:none; letter-spacing:3px; text-align:center; transition:border-color .3s; }
.login-input-wrap input:focus { border-color:var(--rose); box-shadow:0 0 0 4px rgba(194,24,91,.12); }
.login-input-wrap input::placeholder { letter-spacing:1px; color:rgba(255,255,255,.25); }
.login-btn { width:100%; padding:14px; background:linear-gradient(135deg,var(--rose),var(--rose-light));
  color:#fff; border:none; border-radius:40px; font-size:13px; letter-spacing:2px;
  text-transform:uppercase; font-weight:700; cursor:pointer; font-family:'Jost',sans-serif;
  transition:all .3s; box-shadow:0 8px 30px rgba(194,24,91,.3); }
.login-btn:hover { transform:translateY(-2px); }
.login-error { display:none; align-items:center; gap:8px; background:rgba(239,68,68,.1);
  border:1px solid rgba(239,68,68,.3); color:#fca5a5; padding:10px 16px; border-radius:10px;
  font-size:13px; margin-top:14px; }
.back-link { display:inline-block; margin-top:20px; color:rgba(255,255,255,.25); font-size:13px; text-decoration:none; }
.back-link:hover { color:var(--rose); }

/* PANEL */
#adminPanel { display:none; min-height:100vh; }
.admin-layout { display:flex; min-height:100vh; }

/* SIDEBAR */
.sidebar { width:var(--sidebar-w); background:rgba(255,255,255,.03);
  border-right:1px solid rgba(194,24,91,.12); display:flex; flex-direction:column;
  position:fixed; top:0; left:0; bottom:0; z-index:100; }
.sidebar-brand { padding:28px 24px 20px; border-bottom:1px solid rgba(194,24,91,.1); }
.sidebar-brand .logo { font-family:'Cormorant Garamond',serif; font-size:20px; color:var(--rose); }
.sidebar-brand .logo span { color:var(--gold); font-style:italic; }
.sidebar-brand p { font-size:11px; color:rgba(255,255,255,.25); letter-spacing:1.5px; text-transform:uppercase; margin-top:2px; }
.sidebar-nav { flex:1; padding:16px 12px; }
.sidebar-section { font-size:10px; letter-spacing:2px; text-transform:uppercase; color:rgba(255,255,255,.2); padding:12px 12px 6px; }
.tab-btn { width:100%; display:flex; align-items:center; gap:10px; padding:10px 12px;
  background:none; border:none; color:rgba(255,255,255,.45); font-family:'Jost',sans-serif;
  font-size:14px; font-weight:500; cursor:pointer; border-radius:10px; transition:all .2s;
  text-align:left; margin-bottom:2px; position:relative; }
.tab-btn:hover { background:rgba(194,24,91,.08); color:rgba(255,255,255,.75); }
.tab-btn.active { background:rgba(194,24,91,.15); color:#fff; }
.tab-btn.active::before { content:''; position:absolute; left:0; top:25%; bottom:25%;
  width:3px; background:var(--rose); border-radius:0 3px 3px 0; }
.tab-badge { margin-left:auto; background:var(--rose); color:#fff; font-size:10px;
  font-weight:700; padding:2px 7px; border-radius:20px; min-width:20px; text-align:center; }
.sidebar-footer { padding:16px 12px; border-top:1px solid rgba(194,24,91,.1); }
.back-to-site { display:flex; align-items:center; gap:8px; color:rgba(255,255,255,.3);
  font-size:13px; text-decoration:none; padding:8px 12px; border-radius:8px; transition:all .2s; }
.back-to-site:hover { color:rgba(255,255,255,.6); background:rgba(255,255,255,.04); }

/* MAIN */
.admin-main { margin-left:var(--sidebar-w); flex:1; padding:36px 40px; }
.admin-topbar { margin-bottom:32px; }
.admin-topbar h1 { font-family:'Cormorant Garamond',serif; font-size:30px; font-weight:600; color:#fff; }
.admin-topbar p { font-size:13px; color:rgba(255,255,255,.3); margin-top:2px; }

.tab-pane { display:none; }
.tab-pane.active { display:block; }

/* CARD */
.admin-card { background:rgba(255,255,255,.04); border:1px solid rgba(194,24,91,.12);
  border-radius:18px; padding:28px; margin-bottom:24px; }
.admin-card h3 { font-family:'Cormorant Garamond',serif; font-size:22px; color:#fff; margin-bottom:6px; }
.card-sub { font-size:13px; color:rgba(255,255,255,.3); margin-bottom:20px; }
.card-header { display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:20px; gap:12px; flex-wrap:wrap; }
.card-header h3 { margin-bottom:4px; }
.card-header .card-sub { margin-bottom:0; }

/* DROP ZONE */
.drop-zone { border:2px dashed rgba(194,24,91,.3); border-radius:14px; padding:36px;
  text-align:center; cursor:pointer; transition:all .3s; position:relative; background:rgba(194,24,91,.03); }
.drop-zone:hover, .drop-zone.drag-over { border-color:var(--rose); background:rgba(194,24,91,.07); }
.drop-zone input[type=file] { position:absolute; inset:0; opacity:0; cursor:pointer; width:100%; height:100%; }
.drop-icon { font-size:38px; margin-bottom:10px; }
.drop-zone strong { color:rgba(255,255,255,.7); font-size:15px; display:block; margin-bottom:4px; }
.drop-zone p { color:rgba(255,255,255,.3); font-size:13px; }

/* GALLERY GRID */
.admin-gallery-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(140px,1fr)); gap:12px; margin-top:20px; }
.admin-img-card { border-radius:12px; overflow:hidden; aspect-ratio:1; position:relative;
  background:rgba(255,255,255,.05); border:1px solid rgba(194,24,91,.1); }
.admin-img-card img { width:100%; height:100%; object-fit:cover; display:block; }
.admin-img-overlay { position:absolute; inset:0; background:rgba(26,10,15,.6);
  display:flex; align-items:center; justify-content:center; opacity:0; transition:opacity .2s; }
.admin-img-card:hover .admin-img-overlay { opacity:1; }
.img-delete-btn { background:rgba(239,68,68,.9); border:none; border-radius:50%;
  width:36px; height:36px; font-size:16px; cursor:pointer; display:flex; align-items:center; justify-content:center; }
.img-name { position:absolute; bottom:0; left:0; right:0;
  background:linear-gradient(to top,rgba(0,0,0,.7),transparent);
  color:rgba(255,255,255,.7); font-size:10px; padding:8px 8px 6px;
  white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }

/* CATALOG LIST */
.catalog-admin-row { display:flex; align-items:center; gap:14px; padding:14px 0; border-bottom:1px solid rgba(194,24,91,.08); }
.catalog-admin-row:last-child { border-bottom:none; }
.catalog-admin-img { width:54px; height:54px; border-radius:10px; overflow:hidden;
  background:rgba(194,24,91,.1); display:flex; align-items:center; justify-content:center; font-size:28px; flex-shrink:0; }
.catalog-admin-img img { width:100%; height:100%; object-fit:cover; }
.catalog-admin-info { flex:1; min-width:0; }
.catalog-admin-info strong { color:#fff; font-size:15px; display:block; }
.catalog-admin-info p { font-size:13px; color:rgba(255,255,255,.3); margin-top:2px; }
.cat-type-badge { display:inline-block; background:rgba(194,24,91,.15); color:#f48fb1;
  font-size:10px; letter-spacing:1px; text-transform:uppercase; font-weight:600; padding:2px 9px; border-radius:20px; margin:3px 0; }
.cat-price-label { color:var(--gold); font-size:14px; font-weight:600; }

/* CATALOG FORM */
#catalogForm { background:rgba(194,24,91,.05); border:1px solid rgba(194,24,91,.2);
  border-radius:14px; padding:24px; margin-bottom:20px; }
#catalogForm h4 { color:#fff; font-size:16px; margin-bottom:16px; }
#catalogImgPreviewWrap { display:none; margin-bottom:14px; }
#catalogImgPreview { width:100%; max-height:180px; object-fit:cover; border-radius:10px; display:block; }
.img-picker-label { display:inline-flex; align-items:center; gap:8px; background:rgba(194,24,91,.1);
  border:1.5px dashed rgba(194,24,91,.4); border-radius:10px; padding:10px 24px; cursor:pointer;
  color:rgba(255,255,255,.6); font-size:13px; transition:all .2s; margin-bottom:14px; }
.img-picker-label:hover { background:rgba(194,24,91,.2); color:#fff; }

/* FORM ELEMENTS */
.form-group-a { margin-bottom:14px; }
.form-group-a label { display:block; font-size:11px; letter-spacing:1.5px; text-transform:uppercase;
  color:rgba(255,255,255,.35); font-weight:600; margin-bottom:6px; }
.form-group-a input, .form-group-a select, .form-group-a textarea {
  width:100%; padding:11px 14px; background:rgba(255,255,255,.06);
  border:1.5px solid rgba(194,24,91,.25); border-radius:10px; font-family:'Jost',sans-serif;
  font-size:14px; color:rgba(255,255,255,.9); outline:none; transition:border-color .3s, box-shadow .3s; }
.form-group-a input:focus, .form-group-a select:focus, .form-group-a textarea:focus
  { border-color:var(--rose); box-shadow:0 0 0 3px rgba(194,24,91,.1); }
.form-group-a select option { background:#1a0a0f; color:#fff; }
.form-group-a textarea { resize:vertical; }
.form-row-2 { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
.form-actions { display:flex; gap:10px; margin-top:10px; flex-wrap:wrap; }

/* BUTTONS */
.action-btn { padding:9px 18px; border-radius:30px; font-family:'Jost',sans-serif;
  font-size:12px; letter-spacing:1px; text-transform:uppercase; font-weight:600;
  cursor:pointer; border:none; transition:all .2s; display:inline-flex; align-items:center; gap:6px; }
.action-btn.primary { background:linear-gradient(135deg,var(--rose),var(--rose-light)); color:#fff; }
.action-btn.primary:hover { transform:translateY(-1px); box-shadow:0 6px 20px rgba(194,24,91,.3); }
.action-btn.secondary { background:rgba(255,255,255,.07); color:rgba(255,255,255,.6); border:1px solid rgba(255,255,255,.12); }
.action-btn.secondary:hover { background:rgba(255,255,255,.1); color:#fff; }
.action-btn.danger { background:rgba(239,68,68,.1); color:#fca5a5; border:1px solid rgba(239,68,68,.2); }
.action-btn.danger:hover { background:rgba(239,68,68,.2); }
.action-btn.success { background:rgba(34,197,94,.12); color:#86efac; border:1px solid rgba(34,197,94,.2); }
.action-btn.success:hover { background:rgba(34,197,94,.2); }
.action-btn.small { padding:6px 13px; font-size:11px; }

/* SERVICES */
.service-admin-card { background:rgba(255,255,255,.03); border:1px solid rgba(194,24,91,.1);
  border-radius:14px; padding:20px; margin-bottom:14px; }
.service-admin-head { display:flex; align-items:center; gap:14px; }
.svc-icon-big { font-size:32px; flex-shrink:0; }
.service-admin-head > div:nth-child(2) { flex:1; }
.service-admin-head strong { color:#fff; font-size:16px; display:block; }
.svc-price-display { font-size:13px; color:var(--gold); }
.service-edit-form { margin-top:18px; padding-top:18px; border-top:1px solid rgba(194,24,91,.1); }

/* APPOINTMENTS */
.apt-filter-tabs { display:flex; gap:8px; margin-bottom:18px; flex-wrap:wrap; }
.apt-filter-btn { padding:7px 18px; border-radius:20px; border:1px solid rgba(194,24,91,.2);
  background:none; color:rgba(255,255,255,.4); font-size:12px; font-weight:600;
  letter-spacing:1px; text-transform:uppercase; cursor:pointer; font-family:'Jost',sans-serif; transition:all .2s; }
.apt-filter-btn.active, .apt-filter-btn:hover { background:rgba(194,24,91,.15); color:#fff; border-color:rgba(194,24,91,.4); }
.apt-card { background:rgba(255,255,255,.03); border:1px solid rgba(194,24,91,.1);
  border-left:3px solid rgba(194,24,91,.5); border-radius:12px; padding:16px 18px; margin-bottom:10px; }
.apt-card.status-confirmada { border-left-color:#22c55e; }
.apt-head { display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:8px; gap:12px; }
.apt-head strong { color:#fff; font-size:15px; }
.apt-badge { display:inline-block; font-size:10px; font-weight:700; padding:2px 10px;
  border-radius:20px; text-transform:uppercase; letter-spacing:1px; margin-left:8px; }
.apt-badge.nueva { background:rgba(194,24,91,.15); color:#f48fb1; }
.apt-badge.confirmada { background:rgba(34,197,94,.12); color:#86efac; }
.apt-actions { display:flex; gap:6px; flex-shrink:0; flex-wrap:wrap; }
.apt-details { display:flex; flex-wrap:wrap; gap:14px; font-size:13px; color:rgba(255,255,255,.4); }
.apt-notes { font-size:13px; color:rgba(255,255,255,.35); margin-top:8px; font-style:italic; }

/* STATS */
.stats-bar { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin-bottom:28px; }
.stat-box { background:rgba(255,255,255,.04); border:1px solid rgba(194,24,91,.1); border-radius:14px; padding:18px 20px; }
.stat-box .stat-val { font-family:'Cormorant Garamond',serif; font-size:32px; color:var(--rose); font-weight:700; }
.stat-box .stat-lbl { font-size:12px; color:rgba(255,255,255,.3); letter-spacing:1px; text-transform:uppercase; margin-top:4px; }

/* BUSINESS */
.biz-sep { color:rgba(255,255,255,.4); font-size:11px; letter-spacing:2px; text-transform:uppercase;
  font-weight:600; margin:22px 0 14px; padding-top:22px; border-top:1px solid rgba(194,24,91,.08); display:block; }

/* EMPTY */
.empty-state { text-align:center; padding:40px; color:rgba(255,255,255,.25); }
.empty-state .empty-icon { font-size:40px; margin-bottom:12px; }
.empty-state p { font-size:14px; }

/* TOAST */
#toast { position:fixed; bottom:28px; left:50%; transform:translateX(-50%) translateY(20px);
  background:rgba(34,197,94,.92); color:#fff; padding:12px 28px; border-radius:30px;
  font-size:14px; font-weight:600; pointer-events:none; opacity:0; transition:all .35s;
  z-index:9999; white-space:nowrap; box-shadow:0 8px 30px rgba(0,0,0,.3); }
#toast.show { opacity:1; transform:translateX(-50%) translateY(0); }

@media(max-width:768px) {
  .sidebar { display:none; }
  .admin-main { margin-left:0; padding:20px; }
  .stats-bar, .form-row-2 { grid-template-columns:1fr; }
}
</style>
</head>
<body>

<!-- ======== LOGIN ======== -->
<div id="loginScreen">
  <div class="login-box">
    <div class="login-logo">Glam <span>Nails</span></div>
    <div class="login-subtitle">Panel de Administración</div>
    <div class="login-icon">🔒</div>
    <h2>Acceso restringido</h2>
    <p>Ingresa la contraseña para continuar.</p>
    <div class="login-input-wrap">
      <input type="password" id="adminPass" placeholder="Contraseña">
    </div>
    <button class="login-btn" onclick="checkLogin()">Ingresar al Panel</button>
    <div class="login-error" id="loginError">
      <span>❌</span>&nbsp; Contraseña incorrecta. Intenta de nuevo.
    </div>
    <a href="index.html" class="back-link">← Volver al sitio</a>
  </div>
</div>

<!-- ======== ADMIN PANEL ======== -->
<div id="adminPanel">
  <div class="admin-layout">

    <!-- SIDEBAR -->
    <aside class="sidebar">
      <div class="sidebar-brand">
        <div class="logo">Glam <span>Nails</span></div>
        <p>Panel Admin</p>
      </div>
      <nav class="sidebar-nav">
        <div class="sidebar-section">Contenido</div>
        <button class="tab-btn active" onclick="showTab('tabGaleria',this)">
          <span>📸</span> Galería
        </button>
        <button class="tab-btn" onclick="showTab('tabCatalogo',this)">
          <span>💅</span> Catálogo
        </button>
        <button class="tab-btn" onclick="showTab('tabServicios',this)">
          <span>✨</span> Servicios &amp; Precios
        </button>
        <div class="sidebar-section">Gestión</div>
        <button class="tab-btn" onclick="showTab('tabCitas',this)">
          <span>📅</span> Citas
          <span class="tab-badge" id="aptsBadge">0</span>
        </button>
        <button class="tab-btn" onclick="showTab('tabNegocio',this)">
          <span>⚙️</span> Mi Negocio
        </button>
      </nav>
      <div class="sidebar-footer">
        <a href="index.html" class="back-to-site">← Ver sitio web</a>
      </div>
    </aside>

    <!-- MAIN CONTENT -->
    <main class="admin-main">
      <div class="admin-topbar">
        <h1 id="pageTitle">Galería de Fotos</h1>
        <p id="pageSubtitle">Administra las fotos que aparecen en la galería del sitio</p>
      </div>

      <!-- Stats (solo citas) -->
      <div class="stats-bar" id="statsBar" style="display:none;">
        <div class="stat-box"><div class="stat-val" id="statApts">0</div><div class="stat-lbl">Citas totales</div></div>
        <div class="stat-box"><div class="stat-val" id="statNew">0</div><div class="stat-lbl">Nuevas</div></div>
        <div class="stat-box"><div class="stat-val" id="statConfirmed">0</div><div class="stat-lbl">Confirmadas</div></div>
      </div>

      <!-- ===== GALERÍA ===== -->
      <div class="tab-pane active" id="tabGaleria">
        <div class="admin-card">
          <h3>Subir fotos</h3>
          <p class="card-sub">Arrastra imágenes o haz clic para seleccionarlas. Puedes subir varias a la vez.</p>
          <div class="drop-zone" id="galleryDropZone">
            <div class="drop-icon">📤</div>
            <strong>Haz clic o arrastra fotos aquí</strong>
            <p>JPG, PNG, WEBP</p>
            <input type="file" id="galleryFileInput" accept="image/*" multiple>
          </div>
        </div>
        <div class="admin-card">
          <h3>Fotos actuales</h3>
          <p class="card-sub">Pasa el cursor sobre una foto y presiona 🗑️ para eliminarla.</p>
          <div class="admin-gallery-grid" id="adminGalleryGrid"></div>
          <div class="empty-state" id="galleryEmpty">
            <div class="empty-icon">🌸</div>
            <p>No hay fotos todavía. ¡Sube la primera!</p>
          </div>
        </div>
      </div>

      <!-- ===== CATÁLOGO ===== -->
      <div class="tab-pane" id="tabCatalogo">
        <div class="admin-card">
          <div class="card-header">
            <div>
              <h3>Diseños del catálogo</h3>
              <p class="card-sub">Agrega tus diseños con foto, nombre, precio y categoría.</p>
            </div>
            <button class="action-btn primary" onclick="toggleCatalogForm()">+ Agregar diseño</button>
          </div>

          <!-- FORMULARIO AGREGAR -->
          <div id="catalogForm" style="display:none;">
            <h4>✦ Nuevo diseño</h4>
            <div id="catalogImgPreviewWrap">
              <img id="catalogImgPreview" src="" alt="Vista previa">
            </div>
            <div style="text-align:center;">
              <label class="img-picker-label">
                📷 Seleccionar imagen (opcional)
                <input type="file" id="catalogFileInput" accept="image/*" style="display:none;">
              </label>
            </div>
            <div class="form-row-2">
              <div class="form-group-a">
                <label>Nombre del diseño *</label>
                <input type="text" id="catName" placeholder="Ej: French Glam">
              </div>
              <div class="form-group-a">
                <label>Categoría</label>
                <select id="catType">
                  <option value="acrilicas">Uñas Acrílicas</option>
                  <option value="gel">Uñas en Gel</option>
                  <option value="nailart">Nail Art</option>
                </select>
              </div>
            </div>
            <div class="form-row-2">
              <div class="form-group-a">
                <label>Precio ($)</label>
                <input type="text" id="catPrice" placeholder="45">
              </div>
              <div class="form-group-a">
                <label>Emoji (si no hay foto)</label>
                <input type="text" id="catEmoji" placeholder="💅" maxlength="4">
              </div>
            </div>
            <div class="form-group-a">
              <label>Descripción</label>
              <input type="text" id="catDesc" placeholder="Ej: Diseño clásico con detalles dorados">
            </div>
            <div class="form-actions">
              <button class="action-btn primary" onclick="saveCatalogItem()">💾 Guardar diseño</button>
              <button class="action-btn secondary" onclick="toggleCatalogForm()">Cancelar</button>
            </div>
          </div>

          <!-- LISTA DE DISEÑOS -->
          <div id="adminCatalogList"></div>
          <div class="empty-state" id="catalogEmpty">
            <div class="empty-icon">💅</div>
            <p>No hay diseños personalizados todavía.</p>
          </div>
        </div>
      </div>

      <!-- ===== SERVICIOS ===== -->
      <div class="tab-pane" id="tabServicios">
        <div class="admin-card">
          <div class="card-header">
            <div>
              <h3>Servicios y Precios</h3>
              <p class="card-sub">Edita nombre, precio y descripción de cada servicio.</p>
            </div>
            <button class="action-btn primary" onclick="addNewService()">+ Nuevo servicio</button>
          </div>
          <div id="servicesAdminList"></div>
        </div>
      </div>

      <!-- ===== CITAS ===== -->
      <div class="tab-pane" id="tabCitas">
        <div class="admin-card">
          <div class="card-header">
            <div>
              <h3>Citas recibidas</h3>
              <p class="card-sub">Gestiona y confirma las reservas.</p>
            </div>
            <button class="action-btn danger small" onclick="clearAllAppointments()">🗑️ Limpiar todo</button>
          </div>
          <div class="apt-filter-tabs">
            <button class="apt-filter-btn active" onclick="filterApts(this,'todas')">Todas</button>
            <button class="apt-filter-btn" onclick="filterApts(this,'nueva')">Nuevas</button>
            <button class="apt-filter-btn" onclick="filterApts(this,'confirmada')">Confirmadas</button>
          </div>
          <div id="appointmentsList"></div>
          <div class="empty-state" id="appointmentsEmpty">
            <div class="empty-icon">📅</div>
            <p>No hay citas registradas todavía.</p>
          </div>
        </div>
      </div>

      <!-- ===== NEGOCIO ===== -->
      <div class="tab-pane" id="tabNegocio">
        <div class="admin-card">
          <h3>Información del negocio</h3>
          <p class="card-sub">Esta información se refleja en toda la página web.</p>
          <span class="biz-sep">Datos principales</span>
          <div class="form-row-2">
            <div class="form-group-a">
              <label>Nombre del negocio</label>
              <input type="text" id="bizName" placeholder="Glam Nails Studio">
            </div>
            <div class="form-group-a">
              <label>Teléfono WhatsApp (solo números)</label>
              <input type="tel" id="bizPhone" placeholder="50312345678">
            </div>
          </div>
          <div class="form-group-a">
            <label>Slogan / tagline</label>
            <input type="text" id="bizTagline" placeholder="Arte en tus manos, belleza real.">
          </div>
          <div class="form-row-2">
            <div class="form-group-a">
              <label>Instagram (usuario)</label>
              <input type="text" id="bizInstagram" placeholder="@glamNailsStudio">
            </div>
            <div class="form-group-a">
              <label>Dirección (opcional)</label>
              <input type="text" id="bizAddress" placeholder="Tu ciudad, país">
            </div>
          </div>
          <span class="biz-sep">Estadísticas del inicio</span>
          <div class="form-row-2">
            <div class="form-group-a">
              <label>Clientas felices</label>
              <input type="text" id="bizStatClients" placeholder="500+">
            </div>
            <div class="form-group-a">
              <label>Años de experiencia</label>
              <input type="text" id="bizStatYears" placeholder="3+">
            </div>
          </div>
          <div class="form-group-a" style="max-width:260px;">
            <label>Tercer stat (ej: 100% productos premium)</label>
            <input type="text" id="bizStatQuality" placeholder="100%">
          </div>
          <div style="margin-top:22px;">
            <button class="action-btn primary" onclick="saveBusinessInfo()">💾 Guardar información</button>
          </div>
        </div>
      </div>

    </main>
  </div>
</div>

<div id="toast"></div>

<script>
// ============================================================
// ALMACENAMIENTO (localStorage)
// ============================================================
const GlamData = {
  getGallery()      { return JSON.parse(localStorage.getItem('glamGallery')      || '[]'); },
  setGallery(d)     { localStorage.setItem('glamGallery',      JSON.stringify(d)); },
  getCatalog()      { return JSON.parse(localStorage.getItem('glamCatalog')      || '[]'); },
  setCatalog(d)     { localStorage.setItem('glamCatalog',      JSON.stringify(d)); },
  getAppointments() { return JSON.parse(localStorage.getItem('glamAppointments') || '[]'); },
  setAppointments(d){ localStorage.setItem('glamAppointments', JSON.stringify(d)); },

  getServices() {
    const def = [
      { id:1, icon:'💅', name:'Uñas Acrílicas', desc:'Extensión y modelado de uñas acrílicas de larga duración.', price:'45', unit:'/ sesión', features:['Diseño personalizado incluido','Duración 3-4 semanas','Materiales de primera calidad'] },
      { id:2, icon:'✨', name:'Uñas en Gel',    desc:'Acabado brillante y natural con gel de alta calidad.',       price:'38', unit:'/ sesión', features:['Brillo duradero y sin astillas','Duración 2-3 semanas','Curado con lámpara LED'] },
      { id:3, icon:'🎨', name:'Nail Art',       desc:'Diseños artísticos únicos: flores, geométricos, degradados.', price:'25', unit:'+ base',  features:['Diseños exclusivos y únicos','Piedras y accesorios premium','Tendencias actuales'] },
    ];
    return JSON.parse(localStorage.getItem('glamServices') || JSON.stringify(def));
  },
  setServices(d) { localStorage.setItem('glamServices', JSON.stringify(d)); },

  getBusinessInfo() {
    const def = { name:'Glam Nails Studio', phone:'50300000000', tagline:'Arte en tus manos, belleza real.', instagram:'', address:'', stats:{ clients:'500+', years:'3+', quality:'100%' } };
    return JSON.parse(localStorage.getItem('glamBusiness') || JSON.stringify(def));
  },
  setBusinessInfo(d) { localStorage.setItem('glamBusiness', JSON.stringify(d)); },

  addGalleryPhoto(src, name) {
    const g = this.getGallery();
    g.unshift({ id: Date.now(), src, name });
    this.setGallery(g);
  },
  deleteGalleryPhoto(id) {
    this.setGallery(this.getGallery().filter(x => x.id !== id));
  },
  addCatalogItem(item) {
    const c = this.getCatalog();
    c.unshift({ ...item, id: Date.now() });
    this.setCatalog(c);
  },
  deleteCatalogItem(id) {
    this.setCatalog(this.getCatalog().filter(x => x.id !== id));
  },
  updateAppointmentStatus(id, status) {
    this.setAppointments(this.getAppointments().map(x => x.id === id ? { ...x, status } : x));
  },
  deleteAppointment(id) {
    this.setAppointments(this.getAppointments().filter(x => x.id !== id));
  },
};

// ============================================================
// LOGIN
// ============================================================
const ADMIN_PASSWORD = 'glam2025'; // 🔒 Cambia aquí tu contraseña

function checkLogin() {
  if (document.getElementById('adminPass').value === ADMIN_PASSWORD) {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminPanel').style.display  = 'block';
    initAdmin();
  } else {
    const err = document.getElementById('loginError');
    err.style.display = 'flex';
    document.getElementById('adminPass').value = '';
    document.getElementById('adminPass').focus();
    setTimeout(() => err.style.display = 'none', 3000);
  }
}
document.getElementById('adminPass').addEventListener('keydown', e => { if (e.key === 'Enter') checkLogin(); });

// ============================================================
// TABS
// ============================================================
const TAB_INFO = {
  tabGaleria:   ['Galería de Fotos',     'Administra las fotos de la galería del sitio'],
  tabCatalogo:  ['Catálogo de Diseños',  'Agrega diseños con foto, nombre y precio'],
  tabServicios: ['Servicios & Precios',  'Edita precio y descripción de cada servicio'],
  tabCitas:     ['Citas Recibidas',      'Gestiona y confirma las reservas de clientas'],
  tabNegocio:   ['Mi Negocio',           'Nombre, WhatsApp, redes sociales y estadísticas'],
};

function showTab(id, btn) {
  document.querySelectorAll('.tab-pane').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  btn.classList.add('active');
  const [title, sub] = TAB_INFO[id] || ['', ''];
  document.getElementById('pageTitle').textContent    = title;
  document.getElementById('pageSubtitle').textContent = sub;
  document.getElementById('statsBar').style.display   = id === 'tabCitas' ? 'grid' : 'none';
  if (id === 'tabCitas') updateCitasStats();
}

// ============================================================
// GALERÍA
// ============================================================
function initGallery() {
  renderAdminGallery();
  const dz  = document.getElementById('galleryDropZone');
  const inp = document.getElementById('galleryFileInput');
  dz.addEventListener('dragover',  e => { e.preventDefault(); dz.classList.add('drag-over'); });
  dz.addEventListener('dragleave', () => dz.classList.remove('drag-over'));
  dz.addEventListener('drop', e => {
    e.preventDefault(); dz.classList.remove('drag-over');
    Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/')).forEach(uploadGalleryFile);
  });
  dz.addEventListener('click', () => inp.click());
  inp.addEventListener('change', () => { Array.from(inp.files).forEach(uploadGalleryFile); inp.value = ''; });
}

function uploadGalleryFile(file) {
  const r = new FileReader();
  r.onload = e => { GlamData.addGalleryPhoto(e.target.result, file.name); renderAdminGallery(); showToast('Foto agregada 🌸'); };
  r.readAsDataURL(file);
}

function renderAdminGallery() {
  const imgs  = GlamData.getGallery();
  const grid  = document.getElementById('adminGalleryGrid');
  const empty = document.getElementById('galleryEmpty');
  if (!imgs.length) { grid.innerHTML = ''; empty.style.display = 'block'; return; }
  empty.style.display = 'none';
  grid.innerHTML = imgs.map(img => `
    <div class="admin-img-card">
      <img src="${img.src}" alt="">
      <div class="admin-img-overlay">
        <button class="img-delete-btn" onclick="deleteGalleryPhoto(${img.id})">🗑️</button>
      </div>
      <p class="img-name">${img.name || ''}</p>
    </div>`).join('');
}

function deleteGalleryPhoto(id) {
  if (!confirm('¿Eliminar esta foto?')) return;
  GlamData.deleteGalleryPhoto(id); renderAdminGallery(); showToast('Foto eliminada');
}

// ============================================================
// CATÁLOGO
// ============================================================
let pendingCatalogImg = null;

function initCatalog() {
  renderAdminCatalog();
  document.getElementById('catalogFileInput').addEventListener('change', function() {
    const file = this.files[0];
    if (!file) return;
    const r = new FileReader();
    r.onload = e => {
      pendingCatalogImg = e.target.result;
      document.getElementById('catalogImgPreview').src = e.target.result;
      document.getElementById('catalogImgPreviewWrap').style.display = 'block';
    };
    r.readAsDataURL(file);
    this.value = '';
  });
}

function toggleCatalogForm() {
  const f = document.getElementById('catalogForm');
  const isHidden = f.style.display === 'none' || f.style.display === '';
  f.style.display = isHidden ? 'block' : 'none';
  if (isHidden) document.getElementById('catName').focus();
}

function saveCatalogItem() {
  const name = document.getElementById('catName').value.trim();
  if (!name) { alert('⚠️ El nombre del diseño es obligatorio.'); document.getElementById('catName').focus(); return; }

  GlamData.addCatalogItem({
    name,
    type:  document.getElementById('catType').value,
    price: document.getElementById('catPrice').value.trim(),
    emoji: document.getElementById('catEmoji').value.trim() || '💅',
    desc:  document.getElementById('catDesc').value.trim()  || 'Diseño exclusivo',
    img:   pendingCatalogImg,
  });

  // Reset form
  ['catName','catPrice','catDesc','catEmoji'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('catalogImgPreviewWrap').style.display = 'none';
  document.getElementById('catalogForm').style.display = 'none';
  pendingCatalogImg = null;

  renderAdminCatalog();
  showToast('¡Diseño guardado en el catálogo! 💅');
}

function renderAdminCatalog() {
  const items = GlamData.getCatalog();
  const list  = document.getElementById('adminCatalogList');
  const empty = document.getElementById('catalogEmpty');
  if (!items.length) { list.innerHTML = ''; empty.style.display = 'block'; return; }
  empty.style.display = 'none';
  const typeLabel = { acrilicas: 'Acrílicas', gel: 'Gel', nailart: 'Nail Art' };
  list.innerHTML = items.map(item => `
    <div class="catalog-admin-row">
      <div class="catalog-admin-img">
        ${item.img ? `<img src="${item.img}" alt="">` : `<span>${item.emoji || '💅'}</span>`}
      </div>
      <div class="catalog-admin-info">
        <strong>${item.name}</strong>
        <span class="cat-type-badge">${typeLabel[item.type] || item.type}</span>
        <p>${item.desc}</p>
        <span class="cat-price-label">${item.price ? '$' + item.price : ''}</span>
      </div>
      <div class="catalog-admin-actions">
        <button class="action-btn danger small" onclick="deleteCatalogItem(${item.id})">🗑️ Eliminar</button>
      </div>
    </div>`).join('');
}

function deleteCatalogItem(id) {
  if (!confirm('¿Eliminar este diseño?')) return;
  GlamData.deleteCatalogItem(id); renderAdminCatalog(); showToast('Diseño eliminado');
}

// ============================================================
// SERVICIOS
// ============================================================
function initServices() { renderServicesAdmin(); }

function renderServicesAdmin() {
  document.getElementById('servicesAdminList').innerHTML = GlamData.getServices().map(s => `
    <div class="service-admin-card">
      <div class="service-admin-head">
        <span class="svc-icon-big">${s.icon}</span>
        <div>
          <strong>${s.name}</strong>
          <div class="svc-price-display">$${s.price} <em>${s.unit}</em></div>
        </div>
        <button class="action-btn secondary small" onclick="toggleEditService(${s.id})">✏️ Editar</button>
      </div>
      <div class="service-edit-form" id="sedit-${s.id}" style="display:none;">
        <div class="form-row-2">
          <div class="form-group-a"><label>Ícono</label>
            <input type="text" id="sicon-${s.id}" value="${s.icon}" maxlength="4" style="font-size:22px;text-align:center;"></div>
          <div class="form-group-a"><label>Nombre</label>
            <input type="text" id="sname-${s.id}" value="${s.name}"></div>
        </div>
        <div class="form-row-2">
          <div class="form-group-a"><label>Precio ($)</label>
            <input type="text" id="sprice-${s.id}" value="${s.price}"></div>
          <div class="form-group-a"><label>Unidad</label>
            <input type="text" id="sunit-${s.id}" value="${s.unit}"></div>
        </div>
        <div class="form-group-a"><label>Descripción</label>
          <textarea id="sdesc-${s.id}" rows="2">${s.desc}</textarea></div>
        <div class="form-group-a"><label>Características (una por línea)</label>
          <textarea id="sfeats-${s.id}" rows="3">${s.features.join('\n')}</textarea></div>
        <div class="form-actions">
          <button class="action-btn primary"   onclick="saveService(${s.id})">💾 Guardar</button>
          <button class="action-btn secondary" onclick="toggleEditService(${s.id})">Cancelar</button>
          <button class="action-btn danger"    onclick="deleteService(${s.id})">🗑️ Eliminar</button>
        </div>
      </div>
    </div>`).join('');
}

function toggleEditService(id) {
  const el = document.getElementById('sedit-' + id);
  el.style.display = el.style.display === 'none' || !el.style.display ? 'block' : 'none';
}

function saveService(id) {
  const svcs = GlamData.getServices();
  const i = svcs.findIndex(s => s.id === id);
  if (i === -1) return;
  svcs[i] = { ...svcs[i],
    icon:     document.getElementById('sicon-'  + id).value.trim() || svcs[i].icon,
    name:     document.getElementById('sname-'  + id).value.trim(),
    price:    document.getElementById('sprice-' + id).value.trim(),
    unit:     document.getElementById('sunit-'  + id).value.trim(),
    desc:     document.getElementById('sdesc-'  + id).value.trim(),
    features: document.getElementById('sfeats-' + id).value.trim().split('\n').filter(Boolean),
  };
  GlamData.setServices(svcs); renderServicesAdmin(); showToast('Servicio actualizado ✨');
}

function addNewService() {
  const svcs = GlamData.getServices();
  const newId = Date.now();
  svcs.push({ id:newId, icon:'💅', name:'Nuevo Servicio', desc:'Descripción del servicio', price:'0', unit:'/ sesión', features:['Característica 1','Característica 2'] });
  GlamData.setServices(svcs);
  renderServicesAdmin();
  setTimeout(() => toggleEditService(newId), 60);
}

function deleteService(id) {
  if (!confirm('¿Eliminar este servicio?')) return;
  GlamData.setServices(GlamData.getServices().filter(s => s.id !== id));
  renderServicesAdmin(); showToast('Servicio eliminado');
}

// ============================================================
// CITAS
// ============================================================
function initAppointments() { renderAppointments(); }

function renderAppointments(filter = 'todas') {
  let apts = GlamData.getAppointments();
  if (filter !== 'todas') apts = apts.filter(a => (a.status || 'nueva') === filter);
  const list  = document.getElementById('appointmentsList');
  const empty = document.getElementById('appointmentsEmpty');
  if (!apts.length) { list.innerHTML = ''; empty.style.display = 'block'; return; }
  empty.style.display = 'none';
  list.innerHTML = apts.map(a => `
    <div class="apt-card status-${a.status || 'nueva'}">
      <div class="apt-head">
        <div>
          <strong>${a.name}</strong>
          <span class="apt-badge ${a.status || 'nueva'}">${a.status === 'confirmada' ? '✅ Confirmada' : '🆕 Nueva'}</span>
        </div>
        <div class="apt-actions">
          <button class="action-btn small success" onclick="updateAptStatus(${a.id},'confirmada')">✅ Confirmar</button>
          <button class="action-btn small danger"  onclick="deleteApt(${a.id})">🗑️</button>
        </div>
      </div>
      <div class="apt-details">
        <span>📞 ${a.phone}</span><span>📅 ${a.date}</span><span>⏰ ${a.time}</span><span>💅 ${a.service}</span>
      </div>
      ${a.notes ? `<p class="apt-notes">📝 ${a.notes}</p>` : ''}
    </div>`).join('');
}

function filterApts(btn, filter) {
  document.querySelectorAll('.apt-filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderAppointments(filter);
}

function updateAptStatus(id, status) {
  GlamData.updateAppointmentStatus(id, status); renderAppointments(); updateCitasStats(); showToast('Estado actualizado ✅');
}
function deleteApt(id) {
  if (!confirm('¿Eliminar esta cita?')) return;
  GlamData.deleteAppointment(id); renderAppointments(); updateCitasStats(); showToast('Cita eliminada');
}
function clearAllAppointments() {
  if (!confirm('¿Eliminar TODAS las citas? No se puede deshacer.')) return;
  GlamData.setAppointments([]); renderAppointments(); updateCitasStats(); showToast('Citas eliminadas');
}
function updateCitasStats() {
  const apts = GlamData.getAppointments();
  const newC = apts.filter(a => (a.status || 'nueva') === 'nueva').length;
  document.getElementById('statApts').textContent      = apts.length;
  document.getElementById('statNew').textContent       = newC;
  document.getElementById('statConfirmed').textContent = apts.filter(a => a.status === 'confirmada').length;
  document.getElementById('aptsBadge').textContent     = newC;
}

// ============================================================
// NEGOCIO
// ============================================================
function initBusiness() {
  const i = GlamData.getBusinessInfo();
  document.getElementById('bizName').value        = i.name        || '';
  document.getElementById('bizPhone').value       = i.phone       || '';
  document.getElementById('bizTagline').value     = i.tagline     || '';
  document.getElementById('bizInstagram').value   = i.instagram   || '';
  document.getElementById('bizAddress').value     = i.address     || '';
  document.getElementById('bizStatClients').value = i.stats?.clients  || '500+';
  document.getElementById('bizStatYears').value   = i.stats?.years    || '3+';
  document.getElementById('bizStatQuality').value = i.stats?.quality  || '100%';
}

function saveBusinessInfo() {
  GlamData.setBusinessInfo({
    name:      document.getElementById('bizName').value.trim(),
    phone:     document.getElementById('bizPhone').value.trim(),
    tagline:   document.getElementById('bizTagline').value.trim(),
    instagram: document.getElementById('bizInstagram').value.trim(),
    address:   document.getElementById('bizAddress').value.trim(),
    stats: {
      clients: document.getElementById('bizStatClients').value.trim(),
      years:   document.getElementById('bizStatYears').value.trim(),
      quality: document.getElementById('bizStatQuality').value.trim(),
    }
  });
  showToast('Información guardada 🌸');
}

// ============================================================
// TOAST
// ============================================================
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

// ============================================================
// INIT
// ============================================================
function initAdmin() {
  initGallery();
  initCatalog();
  initServices();
  initAppointments();
  initBusiness();
  updateCitasStats();
}
</script>
</body>
</html>