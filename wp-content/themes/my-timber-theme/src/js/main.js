const body = document.querySelector("body");
const header = document.querySelector('.header');
const container = document.querySelector('.header .container');
const navMain = document.querySelector('.header .nav-main');
let scrollPosition = 0;

document.querySelector('.hamburger input').addEventListener('change', function () {
    if (this.checked) {
        header.classList.add('open');
        animateHeight(container, 0, 100, 500, () => {
            scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
            body.classList.add("overflow");
            body.style.position = "fixed";
            body.style.top = `-${scrollPosition}px`;
            body.style.width = "100%";
            navMain.classList.add('visible');

        });
    } else {
        body.classList.remove("overflow");
        body.style.position = "";
        body.style.top = "";
        body.style.width = "";
        window.scrollTo(0, scrollPosition);
        navMain.classList.remove('visible');
        animateHeight(container, 100, 0, 500, () => {
            header.classList.remove('open');
        });
    }
});

function animateHeight(element, start, end, duration, callback) {
    let startTime;

    function step(time) {
        if (!startTime) startTime = time;
        const progress = (time - startTime) / duration;
        const currentHeight = start + (end - start) * Math.min(progress, 1);
        element.style.height = currentHeight + '%';

        if (progress < 1) {
            requestAnimationFrame(step);
        } else if (typeof callback === 'function') {
            callback(); // Викликаємо колбек після завершення анімації
        }
    }

    requestAnimationFrame(step);
}

const anchors = document.querySelectorAll('a[href*="#"]')

const smoothLinks = document.querySelectorAll('a[href^="#"], a[href^="/#"]');
for (let smoothLink of smoothLinks) {
    smoothLink.addEventListener('click', function (e) {
        e.preventDefault();
        let id = smoothLink.getAttribute('href');

        if (id.startsWith('/#')) {
            id = id.slice(1);
        }

        // Прокрутка до елемента
        const targetElement = document.querySelector(id);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}
