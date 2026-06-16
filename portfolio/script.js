document.addEventListener('DOMContentLoaded', () => {

    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navLinks.classList.toggle("active");
    });

    document.querySelectorAll(".nav-links a").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
    }));

    // --- Typing Animation ---
    const roles = [
        "Python Programming Trainer",
        "AI & Automation",
        "Web Developer",
        "Robotics & Hardware project Builder",
        "CSE Student"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElement = document.querySelector('.typing-animation');
    const typingSpeed = 100;
    const erasingSpeed = 50;
    const delayBetweenRoles = 2000;

    function type() {
        const currentRole = roles[roleIndex];
        let displayText = '';

        if (isDeleting) {
            displayText = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            displayText = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        typingElement.textContent = displayText;

        let typeSpeed = isDeleting ? erasingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = delayBetweenRoles;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }

        setTimeout(type, typeSpeed);
    }
    if(typingElement) type();


    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    });

    revealElements.forEach(elem => {
        revealObserver.observe(elem);
    });

    // --- Dynamic Project Loading ---
    const softwareProjects = [
        {
            name: "Python OpenCV Object Detection Project",
            description: "This project uses OpenCV to detect various real-world objects through a live camera feed. It is capable of identifying objects such as people, books, mobile phones, televisions, pens, and more, demonstrating practical computer vision implementation in Python.",
            repoLink: "https://github.com/UTSHO2628/Python-Open-CV-Project1"
        },
        {
            name: "Educational Query & Resource Management System (EduQuery)",
            description: "EduQuery is a web-based Educational Query & Resource Management System designed to streamline communication and resource sharing among students, teachers, and administrators within academic institutions. The system improves information accessibility, reduces response time, and enhances academic collaboration.",
            repoLink: "https://github.com/UTSHO2628/Eduquery-SD1_Project-"
        },
        {
            name: "NUBTK Campus Bot v1.0",
            description: "Campus Assistant Bot is an intelligent, Python-based application developed to simplify student interaction with campus services. By automating responses to frequently asked questions, the bot reduces administrative workload and provides students with instant access to essential campus-related information.",
            repoLink: "https://github.com/UTSHO2628/NUBTK_Campus_Bot_v1.0"
        },
        {
            name: "GreenLife Project v1.0",
            description: "GreenLife is a carbon footprint calculator application that allows users to input various values related to daily activities and instantly calculate their environmental impact. The project aims to promote environmental awareness and sustainable living through technology.",
            repoLink: "https://github.com/UTSHO2628/GreenLife_Project_V1.0"
        }
    ];

    const hardwareProjects = [
        {
            title: "Multi-Protocol Wireless Security Toolkit",
            purpose: "MPWST V1 is a portable ESP32-powered hardware platform capable of scanning, analyzing, and visualizing WiFi, BLE, and RF signals in real time.",
            image: "Hd1.png"
        },
        {
            title: "Obstacle-Avoiding Rover",
            purpose: "An intelligent rover designed to autonomously navigate complex environments, featuring real-time obstacle detection and avoidance using a custom ultrasonic sensor array.",
            image: "Hd2.png"
        }
    ];

    const softwareContainer = document.getElementById('software-projects-container');
    const hardwareContainer = document.getElementById('hardware-projects-container');

    function createProjectCard(project, isHardware = false) {
        const card = document.createElement('div');
        card.className = 'project-card interactive-card';

        if (isHardware) {
            if (project.image) {
                const img = document.createElement('img');
                img.src = project.image;
                img.alt = project.title;
                img.className = 'project-image';
                card.appendChild(img);
            } else {
                const placeholder = document.createElement('div');
                placeholder.className = 'hardware-placeholder';
                placeholder.textContent = 'Image Coming Soon';
                card.appendChild(placeholder);
            }
            const title = document.createElement('h4');
            title.textContent = project.title;
            card.appendChild(title);
            const purpose = document.createElement('p');
            purpose.textContent = project.purpose;
            card.appendChild(purpose);
        } else {
            const title = document.createElement('h4');
            title.textContent = project.name;
            card.appendChild(title);
            const description = document.createElement('p');
            description.textContent = project.description;
            card.appendChild(description);
            const link = document.createElement('a');
            link.href = project.repoLink;
            link.target = '_blank';
            link.className = 'repo-link';
            link.textContent = 'View on GitHub';
            card.appendChild(link);
        }
        
        return card;
    }

    if(softwareContainer) {
        softwareProjects.forEach(project => {
            softwareContainer.appendChild(createProjectCard(project));
        });
    }

    if(hardwareContainer) {
        hardwareProjects.forEach(project => {
            hardwareContainer.appendChild(createProjectCard(project, true));
        });
    }

    // --- WOW EFFECT: 3D Card Tilt ---
    const interactiveCards = document.querySelectorAll('.interactive-card, .skill-card, .achievement-item');
    interactiveCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (e.target.classList.contains('repo-link')) {
                return;
            }
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20; // Adjust divisor for sensitivity
            const rotateY = (centerX - x) / 20; // Adjust divisor for sensitivity

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });


    // --- WOW EFFECT: Particle Animation ---
    const canvas = document.getElementById('particle-canvas');
    if(canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particlesArray;

        const mouse = {
            x: null,
            y: null,
            radius: (canvas.height / 120) * (canvas.width / 120)
        };

        window.addEventListener('mousemove', (event) => {
            mouse.x = event.x;
            mouse.y = event.y;
        });

        class Particle {
            constructor(x, y, directionX, directionY, size, color) {
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
                this.color = color;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = 'rgba(0, 240, 255, 0.5)';
                ctx.fill();
            }

            update() {
                if (this.x > canvas.width || this.x < 0) {
                    this.directionX = -this.directionX;
                }
                if (this.y > canvas.height || this.y < 0) {
                    this.directionY = -this.directionY;
                }
                this.x += this.directionX;
                this.y += this.directionY;
                this.draw();
            }
        }

        function init() {
            particlesArray = [];
            let numberOfParticles = (canvas.height * canvas.width) / 9000;
            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2) + 1;
                let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
                let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
                let directionX = (Math.random() * .4) - .2;
                let directionY = (Math.random() * .4) - .2;
                let color = 'rgba(0, 240, 255, 0.8)';
                particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
            }
        }

        function connect() {
            let opacityValue = 1;
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                                   ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                    if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                        opacityValue = 1 - (distance / 20000);
                        ctx.strokeStyle = `rgba(0, 240, 255, ${opacityValue})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, innerWidth, innerHeight);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
            connect();
        }

        window.addEventListener('resize', () => {
            canvas.width = innerWidth;
            canvas.height = innerHeight;
            mouse.radius = ((canvas.height/80) * (canvas.width/80));
            init();
        });

        window.addEventListener('mouseout', () => {
            mouse.x = undefined;
            mouse.y = undefined;
        });

        init();
        animate();
    }
});
