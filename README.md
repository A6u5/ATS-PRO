<h1 align="center">
📄 ATS PRO - Harvard Style CV Generator
</h1>

<p align="center">
Aplicación web para crear currículums profesionales optimizados para sistemas ATS siguiendo estándares internacionales.
</p>

<p align="center">
💻 React Frontend · 🎨 Tailwind CSS v4 · 📥 PDF Generation
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-Frontend-61DAFB?logo=react" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?logo=tailwind-css" />
  <img src="https://img.shields.io/badge/Vite-Build-646CFF?logo=vite" />
  <img src="https://img.shields.io/badge/Lucide-Icons-F7B93E?logo=lucide" />
  <img src="https://img.shields.io/badge/license-MIT-blue"/>
</p>


<p align="center">
  <img src="./docs/screenshots/ATS-PRO.gif" width="900" alt="ATS PRO Demo Gameplay">
</p>


## 📝 Descripción

**ATS PRO** es una herramienta diseñada para ayudar a profesionales a superar los filtros automáticos de los **Sistemas de Seguimiento de Candidatos (ATS)**. 

El objetivo del proyecto es ofrecer una interfaz intuitiva donde el usuario pueda cargar su información y obtener un CV con el formato de la **Universidad de Harvard**, garantizando una estructura de datos limpia y legible para reclutadores y algoritmos.

---

## ✨ Funcionalidades

- **Generador de CV Harvard:** Formato profesional de una sola columna optimizado para ATS.
- **Multilenguaje:** Soporte completo para generar CVs en Español e Inglés.
- **Edición en Tiempo Real:** Previsualización instantánea de los cambios mientras escribes.
- **Persistencia Local:** Autoguardado de datos mediante LocalStorage para no perder el progreso.
- **Exportación a PDF:** Descarga directa de alta calidad lista para enviar a vacantes.
- **ATS Checker & Job Matcher:** Herramientas integradas para analizar la compatibilidad del perfil.
- **Gestión de Imagen:** Opción para cargar y visualizar fotografía profesional.

---

## 🛠️ Tecnologías utilizadas

### 🎨 Frontend

<p>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="40" title="React"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" width="40" title="Tailwind CSS"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" width="40" title="Vite"/>
</p>

### 📥 Librerías Principales

<p>
  <img src="https://cdn.simpleicons.org/lucide/ffffff" width="40" title="Lucide React"/>
  <img src="https://cdn.simpleicons.org/adobeacrobatreader/EC1C24" width="40" title="React PDF Renderer"/>
</p>

### 🔧 Otras herramientas

<p>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" width="40" title="Git"/>
  <img src="https://cdn.simpleicons.org/github/ffffff" width="40" title="GitHub"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" width="40" title="VS Code"/>
</p>

---

## 🏗️ Arquitectura del proyecto

El proyecto está construido de forma modular para facilitar la escalabilidad y el mantenimiento:

```text
src/
├── components/
│   ├── cv-forms/     # Formularios de edición (Personal, Exp, Edu, etc.)
│   ├── preview/      # Plantillas de diseño y motor de renderizado PDF
│   └── tools/        # Herramientas de análisis (ATS Checker, Job Matcher)
├── utils/
│   └── languajes.js  # Sistema de internacionalización y constantes
├── App.jsx           # Orquestador principal y gestión de estado global
├── index.css         # Configuración nativa de Tailwind CSS v4
└── main.jsx          # Punto de entrada de la aplicación


El flujo de la aplicación se encarga de:
- **Gestión del estado:** Sincronización entre el formulario y la vista previa.
- **Internacionalización:** Traducción dinámica de etiquetas y campos.
- **Compilación PDF:** Transformación de componentes React a formato vectorial imprimible.
```

---

## 📦 Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/A6u5/ATS-PRO.git
cd ATS-PRO
```
---

### 2. Ejecución
Para iniciar el entorno de desarrollo:
- ```npm run dev```

La aplicación estará disponible en:
- `http://localhost:5173`

---

## 📸 Capturas de pantalla

### 🖋️ Editor Multilenguaje
![Editor](https://via.placeholder.com/800x450?text=Editor+Interface+ES-EN)
---

### 📄 Previsualización de Plantilla
![Preview](https://via.placeholder.com/800x450?text=Harvard+Template+Preview)
---

### 📊 ATS Checker
![ATS Tool](https://via.placeholder.com/800x450?text=ATS+Checker+Tool)

---

## 🚀 Posibles mejoras futuras

- Incorporación de múltiples plantillas profesionales.
- Generación de cartas de presentación dinámicas.
- Extracción de datos mediante IA (Parsing de PDF).
- Sistema de login para guardar múltiples CVs en la nube.

---

## 👨‍💻 Autor

Desarrollado por **Agustín Torres**.

Proyecto realizado con el fin de modernizar la creación de CVs técnicos y optimizar procesos de reclutamiento.

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT.


Puedes consultar el archivo LICENSE para más información.
