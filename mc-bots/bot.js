const mineflayer = require('mineflayer')

// activar o desactivar sistemas
const AUTO_MENSAJE = true
const SISTEMA_AFK  = true

// tiempos en milisegundo
const MENSAJE_TIEMPO = 300000 // 5 minutos
const AFK_CADA = 180000 // 3 minutos
const AFK_DURACION = 5000 // 5 segundos

const bot = mineflayer.createBot({
  host: 'testeos.aternos.me',
  port: 25565,
  username: 'BotAFK',
  version: false
})

bot.on('spawn', () => {
  console.log('Bot conectado')

  // sistema de mensaje automatico
  if (AUTO_MENSAJE) {
    setInterval(() => {
      bot.chat('Bot AFK activo')
    }, MENSAJE_TIEMPO)
  }

  // sistema afk
  if (SISTEMA_AFK) {
    setInterval(() => {
      console.log('AFK iniciado')

      bot.setControlState('sneak', true)

      const jumpInterval = setInterval(() => {
        bot.setControlState('jump', true)
        setTimeout(() => {
          bot.setControlState('jump', false)
        }, 300)
      }, 800)

      setTimeout(() => {
        clearInterval(jumpInterval)
        bot.setControlState('sneak', false)
        console.log('AFK terminado')
      }, AFK_DURACION)

    }, AFK_CADA)
  }
})

bot.on('error', err => console.log('Error:', err))
bot.on('end', () => console.log('Bot desconectado'))
