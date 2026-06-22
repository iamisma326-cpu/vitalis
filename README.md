# Vitalis — Gestión Nutricional Inteligente para Diabetes

Plataforma frontend para la gestión nutricional de personas con diabetes. Combina inteligencia artificial, diseño responsive y una base de datos de índice glucémico para ofrecer planes de alimentación personalizados.

## Características

- **Planificación con IA** — Generación de menús semanales personalizados mediante Mistral AI, adaptados a cada perfil glucémico.
- **Buscador de índice glucémico** — Base de datos interactiva de alimentos con filtros por categoría IG (bajo, medio, alto) y sugerencias de intercambio saludable.
- **Demo interactiva** — Simulación del asistente IA para que los usuarios exploren la generación de planes de comidas.
- **Calculadora de raciones** — Conversión de alimentos a raciones de carbohidratos con estimación de IG.
- **Autenticación** — Flujo completo de inicio de sesión y registro con diseño visual.
- **Diseño responsive** — Maquetación moderna con CSS Grid, Flexbox y sistema de diseño en SCSS.
- **Sistema de diseño propio** — Variables de color, tipografía, sombras y radios definidos en SCSS con documentación completa.

## Tecnologías

- **HTML5** — Maquetación semántica
- **CSS3 / SCSS** — Estilos modulares con preprocesador Sass
- **JavaScript** — Funcionalidad interactiva (buscador IG, cálculos)
- **Font Awesome 6** — Iconografía
- **Mistral AI** — Motor de inteligencia artificial para planes alimenticios

## Estructura del proyecto

```
vitalis/
├── index.html                  # Página principal
├── paginas/
│   ├── demo.html               # Demo interactiva con IA
│   ├── beneficios.html         # Beneficios de la plataforma
│   ├── servicios.html          # Funcionalidades
│   ├── como-funciona.html      # Guía de uso
│   ├── glucosa.html            # Buscador de índice glucémico
│   ├── contacto.html           # Formulario de contacto
│   ├── login.html              # Inicio de sesión
│   ├── registro.html           # Crear cuenta
│   ├── privacidad.html         # Política de privacidad
│   └── terminos.html           # Términos de servicio
├── estilos/
│   ├── scss/                   # Fuentes SCSS
│   │   ├── variables.scss      # Paleta de colores, tipografía, bordes
│   │   ├── mixins.scss         # Mixins reutilizables
│   │   ├── componentes.scss    # Componentes base
│   │   └── estilos.scss        # Estilos de página
│   └── estilos.css             # CSS compilado
└── recursos/
    ├── imagenes/               # Recursos gráficos
    └── js/
        └── glucosa.js          # Lógica del buscador IG
```

## Cómo empezar

```bash
# Clonar el repositorio
git clone https://github.com/iamisma326-cpu/vitalis.git

# Abrir index.html en el navegador
# No requiere dependencias ni servidor

# Para compilar SCSS (opcional, si modificás estilos)
sass estilos/scss/estilos.scss estilos/estilos.css
```

## Licencia

MIT
