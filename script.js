document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const yearMarkers = document.querySelectorAll('.year-markers span');
    const sliderHighlight = document.querySelector('.slider-highlight');
    const description = document.querySelector('.description');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');

    const data = {
        "1950s": {
            left: '0%',
            text: "<p>Description for the 1950s.</p>"
        },
        "1960s": {
            left: '25%',
            text: "<p>Description for the 1960s.</p>"
        },
        "1970": {
            left: '50%',
            text: "<p>Description for 1970.</p>"
        },
        "Early 1980s": {
            left: '75%',
            text: "<p>The Group acquired CEAT Tyres India in 1981.</p><p>In 1982, it went on to acquire KEC International, the transmission tower maker, and in 1983, the drug company, Searle India, now known as RPG Life Sciences.</p>"
        }
    };

    let currentIndex = 0;

    function updateCarousel(index) {
        const offset = index * -60;
        carousel.style.transform = `translateX(calc(${offset}% + 20%))`;

        items.forEach((item, i) => {
            item.style.filter = i === index ? 'blur(0)' : 'blur(2px)';
        });

        yearMarkers.forEach((marker, i) => {
            marker.classList.toggle('active', i === index);
        });

        const year = yearMarkers[index].getAttribute('data-year');
        const { left, text } = data[year];
        sliderHighlight.style.left = left;
        description.innerHTML = text;
    }

    function goToItem(index) {
        currentIndex = index;
        updateCarousel(index);
    }

    function goToPrevious() {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        goToItem(currentIndex);
    }

    function goToNext() {
        currentIndex = (currentIndex + 1) % items.length;
        goToItem(currentIndex);
    }

    yearMarkers.forEach((marker, index) => {
        marker.addEventListener('click', () => goToItem(index));
    });

    leftArrow.addEventListener('click', goToPrevious);
    rightArrow.addEventListener('click', goToNext);

    // Initialize
    goToItem(0);
});