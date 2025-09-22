document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === slides.length - 1;
    }

    nextBtn.addEventListener('click', () => {
        if (currentSlide < slides.length - 1) {
            currentSlide++;
            showSlide(currentSlide);
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            showSlide(currentSlide);
        }
    });
    

    const loadDataButton = document.getElementById('load-data-btn');
    const userList = document.getElementById('user-list');

    loadDataButton.addEventListener('click', async () => {
        try {
            const response = await fetch('users.json');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const users = await response.json();
            userList.innerHTML = ''; // Clear previous content
            users.forEach(user => {
                const listItem = document.createElement('li');
                listItem.textContent = `${user.name} (${user.email})`;
                userList.appendChild(listItem);
            });
        } catch (error) {
            console.error('Fetch error:', error);
            userList.innerHTML = `<li style="color: red;">Error: Could not load data.</li>`;
        }
    });
});
