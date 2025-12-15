# Bot AFK para Minecraft

Un bot simple para mantenerte activo en servidores de Minecraft, especialmente útil para servidores Aternos que cierran por inactividad.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 14 o superior)

## Instalación

1. Descarga este proyecto
2. Abre una terminal en la carpeta del proyecto
3. Ejecuta los siguientes comandos:

```bash
npm init -y
npm install mineflayer
```

## ⚙️ Configuración

Abre el archivo `bot.js` y modifica las siguientes variables según tus necesidades:

```javascript
// Configuración del servidor
const bot = mineflayer.createBot({
  host: 'testeos.aternos.me',  // Cambia por la IP de tu servidor
  port: 25565,                // Puerto del servidor
  username: 'BotAFK',         // Nombre del bot en el juego
  version: false
})

// Configuración de tiempos en milisegundos
const MENSAJE_TIEMPO = 300000  // 5 minutos entre mensajes
const AFK_CADA = 180000        // 3 minutos entre acciones AFK
const AFK_DURACION = 5000      // 5 segundos de duración de la acción AFK
```

## 🎮 Características

### Sistema de Mensajes Automáticos
- El bot envía un mensaje cada 5 minutos para mantener la sesión activa.
- Se puede activar/desactivar modificando `AUTO_MENSAJE` a `true` o `false`.

### Sistema AFK
- Realiza acciones cada 3 minutos para evitar ser expulsado por inactividad.
- Las acciones incluyen agacharse y saltar.
- Se puede activar/desactivar modificando `SISTEMA_AFK` a `true` o `false`.

## ▶️ Uso

1. Configura las opciones en `bot.js` según tus necesidades.
2. Inicia el bot con el siguiente comando:

```bash
node bot.js
```

3. El bot se conectará al servidor y comenzará a funcionar automáticamente.
4. Verás mensajes en la consola indicando el estado del bot.

## Notas

- Asegúrate de que el servidor permita la conexión de bots.
- Algunos servidores pueden tener protecciones contra bots.
- Usa este bot de manera responsable y respetando las reglas del servidor.