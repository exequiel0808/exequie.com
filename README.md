# 💅 Glam Nails Studio — Proyecto Web

## 📁 Estructura de archivos

```
glam-nails/
├── index.html       → Página principal (lo que ven tus clientes)
├── admin.html       → Panel de administración (solo tú)
├── styles.css       → Todos los estilos visuales
├── data.js          → Almacenamiento compartido (localStorage)
├── app.js           → Lógica de la página principal
├── admin.js         → Lógica del panel admin
└── README.md        → Este archivo
```

## 🔒 Contraseña del admin

La contraseña por defecto es: **`glam2025`**

Para cambiarla, abre `admin.js` y busca esta línea:
```js
const ADMIN_PASSWORD = 'glam2025';
```
Cámbiala por tu propia contraseña.

## 🚀 Cómo usarlo

1. Abre `index.html` en tu navegador para ver el sitio
2. Ve a `admin.html` para administrar el contenido
3. Todos los cambios se guardan automáticamente en el navegador

## 📱 Qué puedes hacer desde el Admin

- **Galería** → Subir/eliminar fotos de trabajos (arrastra o haz clic)
- **Catálogo** → Agregar diseños con foto, nombre, precio y categoría
- **Servicios** → Editar nombre, precio y descripción de cada servicio
- **Citas** → Ver, confirmar o eliminar reservas de clientes
- **Mi Negocio** → Cambiar nombre, WhatsApp, slogan, estadísticas

## 🤖 Conectar con n8n (automatización)

Para recibir WhatsApp automático cuando llegue una cita:

1. Instala n8n (`npm install -g n8n`)
2. Corre n8n (`n8n start`)
3. Crea un workflow con nodo **Webhook**
4. Copia la URL del webhook
5. Abre `app.js` y cambia esta línea:
   ```js
   const N8N_WEBHOOK_URL = 'https://TU-N8N.com/webhook/glam-nails-cita';
   ```

## 💡 Notas

- Los datos se guardan en el **localStorage** del navegador
- Si limpias el navegador, se borran los datos
- Para backup, exporta los datos desde las herramientas de desarrollador
