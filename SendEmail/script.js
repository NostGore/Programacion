// configuracion de EmailJS
const PUBLIC_KEY = EMAILJS_CONFIG.PUBLIC_KEY;
const TEMPLATE_ID = EMAILJS_CONFIG.TEMPLATE_ID;
const SERVICE_ID = EMAILJS_CONFIG.SERVICE_ID;

// configuracion de la aplicacion
const NOTIFICATION_DURATION = APP_CONFIG.NOTIFICATION_DURATION;
const MIN_IMAGE_SIZE = APP_CONFIG.MIN_IMAGE_SIZE;
const MAX_EDITOR_HEIGHT = APP_CONFIG.MAX_EDITOR_HEIGHT;
const MIN_EDITOR_HEIGHT = APP_CONFIG.MIN_EDITOR_HEIGHT;
const DEFAULT_EDITOR_HEIGHT = APP_CONFIG.DEFAULT_EDITOR_HEIGHT;

// Inicializar EmailJS
(function() {
    emailjs.init(PUBLIC_KEY);
})();

let emails = JSON.parse(localStorage.getItem('emails')) || [];
let emailsSent = parseInt(localStorage.getItem('emailsSent')) || 0;
let quillEditor;

const emailForm = document.getElementById('email-form');
const newEmailInput = document.getElementById('new-email');
const saveEmailBtn = document.getElementById('save-email-btn');
const emailList = document.getElementById('email-list');
const emptyState = document.getElementById('empty-state');
const totalEmailsSpan = document.getElementById('total-emails');
const emailsSentSpan = document.getElementById('emails-sent');
const notification = document.getElementById('notification');

document.addEventListener('DOMContentLoaded', function() {
    // cambiar de tema
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const html = document.documentElement;
    
    // Cargar el tema guardado
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    // Toggle del tema
    themeToggle.addEventListener('click', function() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
    
    quillEditor = new Quill('#editor', {
        theme: 'snow',
        placeholder: 'Escribe tu mensaje aquí...',
        modules: {
            toolbar: [
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote', 'code-block'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'header': [1, 2, 3, false] }],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'align': [] }],
                ['link', 'image'],
                ['clean']
            ]
        }
    });
    
    quillEditor.on('text-change', function() {
        setTimeout(() => {
            enableImageResize();
        }, 100);
    });
    
    quillEditor.on('text-change', function() {
        const messageInput = document.getElementById('message');
        const htmlContent = quillEditor.root.innerHTML;
        const cleanHtml = htmlContent.replace(/<span class="ql-cursor">﻿<\/span>/g, '');
        messageInput.value = cleanHtml;
    });
    
    updateStats();
    renderEmails();
    
    // funcion de expandir/colapsar editor
    const toggleBtn = document.getElementById('toggle-editor-size');
    const sizeSlider = document.getElementById('editor-size-slider');
    const sizeText = document.getElementById('size-text');
    const editor = document.getElementById('editor');
    
    let isExpanded = false;
    
    toggleBtn.addEventListener('click', function() {
        isExpanded = !isExpanded;
        
        if (isExpanded) {
            sizeSlider.style.display = 'block';
            toggleBtn.innerHTML = '<i class="fas fa-compress"></i> <span id="size-text">Colapsar</span>';
            editor.style.height = '400px';
        } else {
            sizeSlider.style.display = 'none';
            toggleBtn.innerHTML = '<i class="fas fa-expand"></i> <span id="size-text">Expandir</span>';
            editor.style.height = '200px';
            sizeSlider.value = 200;
        }
    });
    
    sizeSlider.addEventListener('input', function() {
        editor.style.height = this.value + 'px';
    });
});

saveEmailBtn.addEventListener('click', function() {
    const email = newEmailInput.value.trim();
    
    if (!email) {
        showNotification('Por favor ingresa un correo electrónico', 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        showNotification('Por favor ingresa un correo válido', 'error');
        return;
    }
    
    if (emails.includes(email)) {
        showNotification('Este correo ya está guardado', 'error');
        return;
    }
    
    emails.push(email);
    localStorage.setItem('emails', JSON.stringify(emails));
    
    newEmailInput.value = '';
    renderEmails();
    updateStats();
    showNotification('Correo guardado exitosamente', 'success');
});

emailForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const message = document.getElementById('message').value.trim();
    
    if (!message) {
        showNotification('Por favor escribe un mensaje', 'error');
        return;
    }
    
    if (emails.length === 0) {
        showNotification('No hay correos guardados para enviar', 'error');
        return;
    }
    
    sendEmailsToAll('Nuevo mensaje', message);
});

async function sendEmailsToAll(subject, message) {
    const sendButton = emailForm.querySelector('button[type="submit"]');
    sendButton.disabled = true;
    sendButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    
    let successCount = 0;
    let errorCount = 0;
    
    for (const email of emails) {
        try {
            const templateParams = {
                to_email: email,
                subject: subject,
                message: message
            };
            
            await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);
            successCount++;
        } catch (error) {
            console.error('Error sending email to', email, error);
            errorCount++;
        }
    }
    
    sendButton.disabled = false;
    sendButton.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Correo';
    
    emailsSent += successCount;
    localStorage.setItem('emailsSent', emailsSent);
    updateStats();
    
    quillEditor.setText('');
    document.getElementById('message').value = '';
    
    if (successCount > 0) {
        showNotification(`Correos enviados: ${successCount} exitosos, ${errorCount} con error`, 'success');
    } else {
        showNotification('No se pudieron enviar los correos', 'error');
    }
}

function renderEmails() {
    emailList.innerHTML = '';
    
    if (emails.length === 0) {
        emptyState.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';
    
    emails.forEach((email, index) => {
        const li = document.createElement('li');
        li.className = 'email-item';
        li.innerHTML = `
            <span>${email}</span>
            <div class="email-actions">
                <button class="btn btn-danger btn-small" onclick="deleteEmail(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        emailList.appendChild(li);
    });
}

function deleteEmail(index) {
    const email = emails[index];
    emails.splice(index, 1);
    localStorage.setItem('emails', JSON.stringify(emails));
    renderEmails();
    updateStats();
    showNotification(`Correo ${email} eliminado`, 'success');
}

function updateStats() {
    totalEmailsSpan.textContent = emails.length;
    emailsSentSpan.textContent = emailsSent;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showNotification(message, type) {
    notification.textContent = message;
    notification.className = `notification ${type} show`;
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, NOTIFICATION_DURATION);
}

function enableImageResize() {
    const images = document.querySelectorAll('#editor img');
    
    images.forEach(img => {
        if (img.dataset.resizable === 'true') return;
        
        img.dataset.resizable = 'true';
        img.style.cursor = 'se-resize';
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
        
        let isResizing = false;
        let startX, startY, startWidth, startHeight;
        
        img.addEventListener('mousedown', function(e) {
            isResizing = true;
            startX = e.clientX;
            startY = e.clientY;
            startWidth = img.offsetWidth;
            startHeight = img.offsetHeight;
            
            document.addEventListener('mousemove', handleResize);
            document.addEventListener('mouseup', stopResize);
            
            e.preventDefault();
        });
        
        function handleResize(e) {
            if (!isResizing) return;
            
            const newWidth = startWidth + (e.clientX - startX);
            const newHeight = startHeight + (e.clientY - startY);
            
            if (e.shiftKey) {
                const ratio = startWidth / startHeight;
                img.style.width = newWidth + 'px';
                img.style.height = (newWidth / ratio) + 'px';
                img.setAttribute('width', newWidth);
                img.setAttribute('height', Math.round(newWidth / ratio));
            } else {
                img.style.width = Math.max(MIN_IMAGE_SIZE, newWidth) + 'px';
                img.style.height = Math.max(MIN_IMAGE_SIZE, newHeight) + 'px';
                img.setAttribute('width', Math.max(MIN_IMAGE_SIZE, newWidth));
                img.setAttribute('height', Math.max(MIN_IMAGE_SIZE, newHeight));
            }
            
            quillEditor.update();
        }
        
        function stopResize() {
            isResizing = false;
            document.removeEventListener('mousemove', handleResize);
            document.removeEventListener('mouseup', stopResize);
        }
        
        img.title = 'Arrastra para redimensionar. Mantén Shift para mantener proporción.';
    });
}