document.addEventListener("DOMContentLoaded", () => {
            
            // 1. HIGH-PERFORMANCE INTERACTIVE CANVAS BACKGROUND GRID
            const canvas = document.getElementById("grid-canvas");
            const ctx = canvas.getContext("2d");
            let width = canvas.width = window.innerWidth;
            let height = canvas.height = window.innerHeight;

            window.addEventListener("resize", () => {
                width = canvas.width = window.innerWidth;
                height = canvas.height = window.innerHeight;
            });

            let mouseX = 0, mouseY = 0;
            window.addEventListener("mousemove", (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
            });

            // Smooth mouse tracking interpolation
            let currentX = 0, currentY = 0;

            function renderBackgroundGrid() {
                ctx.clearRect(0, 0, width, height);
                
                // Linear Interpolation for smooth mouse lag effect without lowering frame rates
                currentX += (mouseX - currentX) * 0.08;
                currentY += (mouseY - currentY) * 0.08;

                const gridSize = 60;
                ctx.strokeStyle = "rgba(255, 255, 255, 0.015)";
                ctx.lineWidth = 1;

                for (let x = 0; x < width; x += gridSize) {
                    ctx.beginPath();
                    ctx.moveTo(x, 0);
                    ctx.lineTo(x, height);
                    ctx.stroke();
                }

                for (let y = 0; y < height; y += gridSize) {
                    ctx.beginPath();
                    ctx.moveTo(0, y);
                    ctx.lineTo(width, y);
                    ctx.stroke();
                }

                // Create local interactive lighting dot at mouse position
                if(currentX > 0 && currentY > 0) {
                    let gradient = ctx.createRadialGradient(currentX, currentY, 0, currentX, currentY, 180);
                    gradient.addColorStop(0, "rgba(99, 102, 241, 0.04)");
                    gradient.addColorStop(1, "transparent");
                    ctx.fillStyle = gradient;
                    ctx.fillRect(0, 0, width, height);
                }

                requestAnimationFrame(renderBackgroundGrid);
            }
            renderBackgroundGrid();

            // 2. 60FPS SMOOTH MOUSE 3D CARD PARALLAX EFFECT FOR HERO
            const heroCard = document.getElementById("hero-interactive-card");
            if(heroCard) {
                window.addEventListener("mousemove", (e) => {
                    const rect = heroCard.getBoundingClientRect();
                    const cardX = rect.left + rect.width / 2;
                    const cardY = rect.top + rect.height / 2;
                    
                    const angleX = (cardY - e.clientY) / 25; 
                    const angleY = (e.clientX - cardX) / 25;

                    heroCard.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.02)`;
                });

                heroCard.addEventListener("mouseleave", () => {
                    heroCard.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
                });
            }

            // 3. ULTRA-FAST INTERSECTION OBSERVER FOR CONTENT REVEALS
            const revealElements = document.querySelectorAll(".reveal");
            const observerOptions = {
                root: null,
                threshold: 0.1,
                rootMargin: "0px 0px -40px 0px"
            };

            const revealObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        
                        // Trigger numerical counters if visible inside entry
                        const counters = entry.target.querySelectorAll(".counter");
                        counters.forEach(counter => {
                            if(!counter.classList.contains('counted')) {
                                counter.classList.add('counted');
                                animateCounter(counter);
                            }
                        });
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            revealElements.forEach(el => revealObserver.observe(el));

            // Fast numerical layout statistics incrementation
            function animateCounter(counterEl) {
                const target = parseInt(counterEl.getAttribute("data-target"));
                let current = 0;
                const duration = 2000; // 2 seconds animation
                const stepTime = Math.max(Math.floor(duration / target), 15);
                
                const timer = setInterval(() => {
                    current += Math.ceil(target / (duration / stepTime));
                    if (current >= target) {
                        counterEl.innerText = target + "+";
                        clearInterval(timer);
                    } else {
                        counterEl.innerText = current;
                    }
                }, stepTime);
            }

            // 4. CLIENT-SIDE LIGHTWEIGHT FILTERING MECHANICAL ARCHITECTURE
            const filterButtons = document.querySelectorAll(".filter-btn");
            const artCards = document.querySelectorAll(".art-card");

            filterButtons.forEach(btn => {
                btn.addEventListener("click", () => {
                    filterButtons.forEach(b => b.classList.remove("active"));
                    btn.classList.add("active");

                    const targetFilter = btn.getAttribute("data-filter");

                    artCards.forEach(card => {
                        const cat = card.getAttribute("data-category");
                        if(targetFilter === "all" || cat === targetFilter) {
                            card.style.display = "flex";
                            // Micro stagger animation trigger
                            setTimeout(() => { card.style.opacity = "1"; card.style.transform = "scale(1)"; }, 20);
                        } else {
                            card.style.opacity = "0";
                            card.style.transform = "scale(0.95)";
                            setTimeout(() => { card.style.display = "none"; }, 250);
                        }
                    });
                });
            });

            // 5. ACTIVE NAVIGATION SCROLL SNAPPING INDICATOR
            const sections = document.querySelectorAll("section[id]");
            const navLinks = document.querySelectorAll("nav ul li a");

            window.addEventListener("scroll", () => {
                let currentSectionId = "";
                const scrollPos = window.scrollY + 160;

                sections.forEach(sec => {
                    const top = sec.offsetTop;
                    const height = sec.offsetHeight;
                    if(scrollPos >= top && scrollPos < top + height) {
                        currentSectionId = sec.getAttribute("id");
                    }
                });

                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if(link.getAttribute("href") === `#${currentSectionId}`) {
                        link.classList.add("active");
                    }
                });
            });
        });



function openLightbox(imgId) {
    const img = document.getElementById(imgId);
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    lightboxImg.src = img.src;
    lightbox.classList.add('active'); 
  }

  function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
  }


  document.addEventListener('keydown', function(e) {
    if(e.key === "Escape") closeLightbox();
  });


  document.getElementById('lightbox').addEventListener('click', function(e) {
    if(e.target.id === 'lightbox') closeLightbox();
  });