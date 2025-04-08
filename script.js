const hamburgerMenu = document.getElementById('hamburgerMenu');
const navbarLinks = document.getElementById('navbarLinks');

// Toggle the navbar visibility when the hamburger icon is clicked
hamburgerMenu.addEventListener('click', () => {
    navbarLinks.classList.toggle('active');
    hamburgerMenu.classList.toggle('activelogo');

});
function navclickhandle(){
    navbarLinks.classList.toggle('active');
    hamburgerMenu.classList.toggle('activelogo');
}


// Setting Up the Dots
// First, the code selects the <div> with the ID container, which will hold all the dots.

// The number of dots depends on the screen size:

// 100 dots for small screens (< 768px width)

// 150 dots for larger screens
const container = document.getElementById("container");
const numDots = window.innerWidth < 768 ? 100 : 150; 
let dots = [];

// 2. Creating Dots (createDots function)
// The function clears any existing dots and then creates new ones.

// For each dot:

// A <div> element is created and given a class of "dot".

// The dot is randomly placed anywhere on the screen (x and y positions).

// The dot is stored in an array along with its position (x, y) and velocity (vx, vy), which will control movement.

function createDots() {
    container.innerHTML = "";
    dots = [];
    for (let i = 0; i < numDots; i++) {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        dot.style.left = `${x}px`;
        dot.style.top = `${y}px`;
        container.appendChild(dot);
        dots.push({ element: dot, x, y, vx: 0, vy: 0 });
    }
}

// 3. Moving the Dots (updateDots function)
// This function runs continuously using requestAnimationFrame, making the dots move.

// Each dot:

// Moves based on its velocity (vx, vy).

// Slows down over time (vx *= 0.9, vy *= 0.9), creating a natural-looking motion.

// Bounces back if it hits the edges of the screen.


function updateDots() {
    dots.forEach((dot) => {
        dot.x += dot.vx;
        dot.y += dot.vy;

        dot.vx *= 0.9;
        dot.vy *= 0.9;

        if (dot.x <= 0 || dot.x >= window.innerWidth - 10) {
            dot.vx *= -1;
            dot.x = Math.max(1, Math.min(window.innerWidth - 11, dot.x));
        }
        if (dot.y <= 0 || dot.y >= window.innerHeight - 10) {
            dot.vy *= -1;
            dot.y = Math.max(1, Math.min(window.innerHeight - 11, dot.y));
        }

        dot.element.style.left = `${dot.x}px`;
        dot.element.style.top = `${dot.y}px`;
    });
    requestAnimationFrame(updateDots);
}


// 4. Mouse Interaction
// When the user moves the mouse (mousemove event), the dots react:

// If a dot is close to the mouse (< 50 pixels distance), it is "pushed away."

// The push force is calculated based on the angle between the dot and the mouse.


document.addEventListener("mousemove", (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    dots.forEach((dot) => {
        const dx = dot.x - mouseX;
        const dy = dot.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 50) {
            const angle = Math.atan2(dy, dx);
            dot.vx += Math.cos(angle) * 6;
            dot.vy += Math.sin(angle) * 6;
        }
    });
});


// 5. Collision Detection (checkCollisions function)
// The code checks if any two dots are too close (less than 10 pixels apart).

// If so, they "bounce" off each other by changing their velocities.


function checkCollisions() {
    for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
            const dx = dots[i].x - dots[j].x;
            const dy = dots[i].y - dots[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 10) {
                const angle = Math.atan2(dy, dx);
                const speed = 3;
                dots[i].vx += Math.cos(angle) * speed;
                dots[i].vy += Math.sin(angle) * speed;
                dots[j].vx -= Math.cos(angle) * speed;
                dots[j].vy -= Math.sin(angle) * speed;
            }
        }
    }
    requestAnimationFrame(checkCollisions);
}

// 6. Responsive Behavior
// If the screen is resized, the dots are recreated to adjust to the new screen size.

window.addEventListener("resize", () => {
    createDots();
});


// 7. Running the Code
// createDots() initializes the dots.

// updateDots() starts the animation.

// checkCollisions() keeps checking for dot collisions.

createDots();
updateDots();
checkCollisions();




document.addEventListener("DOMContentLoaded", () => {
    const skillSection = document.getElementById("skills");
    const skills = document.querySelectorAll(".skill");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillSection.classList.add("visible");
                skills.forEach(skill => {
                    const percentage = skill.getAttribute("data-skill");
                    skill.querySelector(".skill-fill").style.width = percentage + "%";
                });
                observer.disconnect(); // Prevents repeated animation
            }
        });
    }, { threshold: 0.5 });

    observer.observe(skillSection);
});


function openLightbox(imageSrc) {
    document.getElementById("lightbox-img").src = imageSrc;
    document.getElementById("lightbox").style.display = "flex";
}

function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}

