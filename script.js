document.addEventListener('DOMContentLoaded', () => {
    // Плавная прокрутка
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Анимация появления элементов
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.grid-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(item);
    });

    // Анимация плавающих элементов
    document.querySelectorAll('.floating-element').forEach(element => {
        element.style.animation = `float ${3 + Math.random() * 2}s ease-in-out infinite`;
    });

    // Параллакс эффект для hero секции
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        document.querySelectorAll('.floating-element').forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
    });

    // Анимация заполнения прогресс-бара при наведении
    document.querySelectorAll('.button').forEach(button => {
        button.addEventListener('mouseenter', (e) => {
            const progressBar = document.createElement('div');
            progressBar.style.position = 'absolute';
            progressBar.style.bottom = '0';
            progressBar.style.left = '0';
            progressBar.style.height = '3px';
            progressBar.style.backgroundColor = '#fff';
            progressBar.style.width = '0';
            progressBar.style.transition = 'width 0.3s ease';
            e.target.appendChild(progressBar);
            setTimeout(() => {
                progressBar.style.width = '100%';
            }, 50);
        });

        button.addEventListener('mouseleave', (e) => {
            const progressBar = e.target.querySelector('div');
            if (progressBar) {
                progressBar.remove();
            }
        });
    });
});

