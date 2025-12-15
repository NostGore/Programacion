# SendEmail - Aplicación de Envío Masivo de Correos

SendEmail es una aplicación web que permite gestionar y enviar correos electrónicos de forma masiva a una lista de contactos. La aplicación incluye un editor de texto enriquecido y almacena los correos localmente en el navegador.

## Características

- 1. Envío masivo de correos electrónicos
- 2. Editor de texto enriquecido con formato
- 3. Modo claro/oscuro
- 4. Almacenamiento local de contactos
- 5. Estadísticas de envíos
- 6. Validación de correos electrónicos
- 7. Diseño responsivo

## Requisitos Previos

- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- Cuenta en [EmailJS](https://www.emailjs.com/) para el envío de correos

## Configuración

1. **Crear una cuenta en EmailJS**
   - Regístrate en [EmailJS](https://www.emailjs.com/)
   - Crea un nuevo servicio de correo (puedes usar Gmail, Outlook, etc.)
   - Crea una plantilla de correo electrónico

2. **Configurar las credenciales**
   Abre el archivo `data.js` y actualiza las siguientes variables con tus credenciales de EmailJS:
   ```javascript
   const EMAILJS_CONFIG = {
       PUBLIC_KEY: 'tu_llave_publica',
       SERVICE_ID: 'tu_id_de_servicio',
       TEMPLATE_ID: 'tu_id_de_plantilla'
   };
   ```

3. **Configurar la plantilla de correo**
   Asegúrate de que tu plantilla en EmailJS incluya las siguientes variables:
   - `to_email`: Para el destinatario
   - `message`: Para el contenido del mensaje
   - `subject`: Para el asunto del correo

## Instalación

1. Descarga el proyecto
2. Abre el archivo `index.html` en tu navegador
   - También puedes usar un servidor local como Live Server de VS Code

## Uso

### Añadir Correos Electrónicos
1. Ingresa un correo electrónico en el campo "Ingresa un correo electrónico"
2. Haz clic en "Guardar Correo" o presiona Enter

### Escribir un Mensaje
1. Usa el editor de texto enriquecido para escribir tu mensaje
2. Personaliza el formato con las opciones de la barra de herramientas
3. Usa el botón de expandir/colapsar para ajustar el tamaño del editor

### Enviar Correos
1. Escribe tu mensaje en el editor
2. Haz clic en "Enviar Correo"
3. Confirma el envío cuando se te solicite

### Gestionar Contactos
- Para eliminar un correo, haz clic en el ícono de papelera junto al correo
- Los correos se guardan automáticamente en el almacenamiento local del navegador

## Personalización

Puedes personalizar la aplicación modificando el archivo `style.css` para cambiar los colores, fuentes y diseño general.

## Seguridad

- Las credenciales de EmailJS se almacenan en el lado del cliente
- Los correos se almacenan localmente en el navegador
- No se recomienda usar esta aplicación para enviar correos a listas muy grandes desde el navegador

## Solución de Problemas

- **Los correos no se envían**: Verifica tu conexión a internet y las credenciales de EmailJS
- **Los correos no se guardan**: Asegúrate de que tu navegador acepte cookies y almacenamiento local
- **Problemas de formato**: Usa el editor de texto enriquecido para un formato consistente

## Derechos

Este proyecto está creado por mi y es completamente gratis, no use o robe mi proyecto para ventas..
