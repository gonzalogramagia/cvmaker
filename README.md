# CVMaker 📄

Una aplicación web moderna para crear CVs profesionales de forma rápida y sencilla.

## 🚀 Stack Tecnológico

- **Framework**: Next.js 15 (App Router) + TypeScript
- **Estilos**: Tailwind CSS 4
- **Formularios**: React Hook Form + Zod
- **Estado**: Zustand (con persistencia)
- **UI Components**: Componentes custom con Radix UI patterns
- **Iconos**: Lucide React
- **Exportación PDF**: @react-pdf/renderer (próximamente)
- **Package Manager**: Yarn

## ✨ Características

- ✅ Editor de CV con vista previa en tiempo real
- ✅ Múltiples plantillas profesionales
- ✅ Validación de formularios con Zod
- ✅ Guardado automático en localStorage
- ✅ Exportar/Importar datos en JSON
- 🚧 Exportación a PDF (próximamente)
- 🚧 Múltiples secciones: Experiencia, Educación, Proyectos, Habilidades
- 🚧 Modo oscuro
- 🚧 Autenticación y guardado en la nube

## 🛠️ Instalación

```bash
# Instalar dependencias
yarn install

# Ejecutar en desarrollo
yarn dev

# Build para producción
yarn build

# Iniciar servidor de producción
yarn start
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
cvmaker/
├── app/                    # App Router de Next.js
│   ├── builder/           # Página del editor de CV
│   ├── api/               # API Routes
│   └── page.tsx           # Página principal
├── components/
│   ├── ui/                # Componentes UI reutilizables
│   ├── forms/             # Formularios del CV
│   └── resume/            # Componentes de vista previa
├── lib/
│   ├── store/             # Zustand stores
│   ├── validators/        # Schemas de Zod
│   ├── utils/             # Utilidades
│   └── pdf/               # Generación de PDF
└── public/                # Assets estáticos
```

## 🎨 Plantillas Disponibles

- **Modern**: Diseño limpio y moderno con acentos de color
- **Classic**: Estilo tradicional y profesional (próximamente)
- **Minimal**: Diseño minimalista y elegante (próximamente)

## 🌐 Despliegue

El dominio configurado es: **cvmaker.gonza.gr**

Para desplegar en Vercel:

```bash
vercel deploy
```

## 📝 Uso

1. Accede a la página principal
2. Haz clic en "Crear CV" o "Comenzar Gratis"
3. Completa la información en el editor
4. Ve la vista previa en tiempo real
5. Exporta tu CV a PDF o guarda como JSON

## 🔄 Roadmap

- [x] Setup inicial del proyecto
- [x] Página principal con landing
- [x] Editor básico con información personal
- [x] Vista previa en tiempo real
- [x] Guardado en localStorage
- [x] Exportar/Importar JSON
- [ ] Sección de Experiencia Laboral
- [ ] Sección de Educación
- [ ] Sección de Proyectos
- [ ] Sección de Habilidades
- [ ] Exportación a PDF
- [ ] Múltiples plantillas
- [ ] Modo oscuro
- [ ] Autenticación
- [ ] Compartir CV con link público

## 👨‍💻 Autor

Creado con ❤️ por Gonza

## 📄 Licencia

MIT
