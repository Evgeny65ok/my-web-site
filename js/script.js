// =============================================
// 1. ТЁМНАЯ / СВЕТЛАЯ ТЕМА (localStorage)
// =============================================

const themeBtn = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'light';

if (currentTheme === 'dark') {
    document.body.classList.add('dark');
    themeBtn.textContent = '☀️';
}

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    themeBtn.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// =============================================
// 2. АНИМАЦИЯ ЦИФР (СТАТИСТИКА)
// =============================================

const statNumbers = document.querySelectorAll('.stat-number');

function animateNumbers() {
    statNumbers.forEach(el => {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 1500;
        const startTime = performance.now();

        function updateNumber(time) {
            const progress = Math.min((time - startTime) / duration, 1);
            el.textContent = Math.floor(progress * target);
            if (progress < 1) requestAnimationFrame(updateNumber);
        }
        requestAnimationFrame(updateNumber);
    });
}

// Запускаем анимацию при загрузке
animateNumbers();

// =============================================
// 3. ФОРМА КОНТАКТОВ (localStorage)
// =============================================

const form = document.getElementById('contactForm');
const statusEl = document.getElementById('form-status');

if (form) {
    // Восстанавливаем сохранённые данные формы
    const savedName = localStorage.getItem('contactName');
    const savedEmail = localStorage.getItem('contactEmail');
    const savedMessage = localStorage.getItem('contactMessage');

    if (savedName) document.getElementById('name').value = savedName;
    if (savedEmail) document.getElementById('email').value = savedEmail;
    if (savedMessage) document.getElementById('message').value = savedMessage;

    // Автосохранение при вводе
    document.getElementById('name').addEventListener('input', (e) => {
        localStorage.setItem('contactName', e.target.value);
    });
    document.getElementById('email').addEventListener('input', (e) => {
        localStorage.setItem('contactEmail', e.target.value);
    });
    document.getElementById('message').addEventListener('input', (e) => {
        localStorage.setItem('contactMessage', e.target.value);
    });

    // Отправка формы
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (name && email && message) {
            statusEl.textContent = '✅ Сообщение отправлено! (демо)';
            statusEl.style.color = '#4a6cf7';
            // Очищаем localStorage после "отправки"
            localStorage.removeItem('contactName');
            localStorage.removeItem('contactEmail');
            localStorage.removeItem('contactMessage');
            form.reset();
        } else {
            statusEl.textContent = '❌ Заполните все поля!';
            statusEl.style.color = '#e74c3c';
        }
    });
}

// =============================================
// 4. АКТИВНАЯ ССЫЛКА В МЕНЮ (подсветка)
// =============================================

const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
        link.classList.add('active');
    }
});