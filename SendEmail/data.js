// Configuracion de EmailJS
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'iq61hPNTy4yHmDecn', // tu llave publica
    SERVICE_ID: 'notificacion', // tu id de servicio
    TEMPLATE_ID: 'template_zjod8mg' // tu id de plantilla
};

const APP_CONFIG = {
    NOTIFICATION_DURATION: 3000,
    MIN_IMAGE_SIZE: 50,
    MAX_EDITOR_HEIGHT: 600,
    MIN_EDITOR_HEIGHT: 200,
    DEFAULT_EDITOR_HEIGHT: 200
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EMAILJS_CONFIG, APP_CONFIG };
}
