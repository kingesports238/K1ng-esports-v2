document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       MOBILE NAVIGATION
    ========================================= */

    const mobileMenu =
        document.getElementById("mobileMenu");

    const mainNav =
        document.getElementById("mainNav");


    if (mobileMenu && mainNav) {

        mobileMenu.addEventListener("click", () => {

            mainNav.classList.toggle("open");

            mobileMenu.classList.toggle("open");

        });


        document.querySelectorAll("#mainNav a")
            .forEach(link => {

                link.addEventListener("click", () => {

                    mainNav.classList.remove("open");

                    mobileMenu.classList.remove("open");

                });

            });

    }


    /* =========================================
       SCROLL REVEAL
    ========================================= */

    const revealElements =
        document.querySelectorAll(".reveal");


    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* =========================================
       NUMBER COUNTERS
    ========================================= */

    const counters =
        document.querySelectorAll("[data-count]");


    const counterObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    const counter =
                        entry.target;

                    const target =
                        Number(counter.dataset.count);


                    let current = 0;

                    const duration = 1200;

                    const startTime =
                        performance.now();


                    function updateCounter(time) {

                        const progress =
                            Math.min(
                                (time - startTime) / duration,
                                1
                            );


                        current =
                            Math.floor(
                                progress * target
                            );


                        counter.textContent =
                            current;


                        if (progress < 1) {

                            requestAnimationFrame(
                                updateCounter
                            );

                        } else {

                            counter.textContent =
                                target;

                        }

                    }


                    requestAnimationFrame(
                        updateCounter
                    );


                    counterObserver.unobserve(counter);

                });

            },
            {
                threshold: .6
            }
        );


    counters.forEach(counter => {

        counterObserver.observe(counter);

    });


    /* =========================================
       APPLICATION FORM
    ========================================= */

    const form =
        document.getElementById("applicationForm");

    const formMessage =
        document.getElementById("formMessage");


    if (form && formMessage) {

        form.addEventListener("submit", event => {

            event.preventDefault();


            const formData =
                new FormData(form);


            const name =
                formData.get("name");


            formMessage.innerHTML = `
                <strong>APPLICATION RECEIVED.</strong><br>
                Thanks ${escapeHTML(name)}.
                Your application has been prepared successfully.
            `;


            formMessage.style.padding =
                "15px";

            formMessage.style.border =
                "1px solid rgba(117,188,255,.25)";

            formMessage.style.background =
                "rgba(117,188,255,.05)";


            form.reset();

        });

    }


    /* =========================================
       SAFE HTML
    ========================================= */

    function escapeHTML(value) {

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    /* =========================================
       ACTIVE PAGE
    ========================================= */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    document.querySelectorAll("#mainNav a")
        .forEach(link => {

            const href =
                link.getAttribute("href");


            if (!href) {
                return;
            }


            const linkPage =
                href.split("/")
                    .pop()
                    .toLowerCase();


            if (
                linkPage === currentPage &&
                currentPage !== ""
            ) {

                link.classList.add("active");

            }

        });


    /* =========================================
       HEADER SCROLL EFFECT
    ========================================= */

    const navbar =
        document.querySelector(".navbar");


    window.addEventListener(
        "scroll",
        () => {

            if (!navbar) {
                return;
            }


            if (window.scrollY > 30) {

                navbar.style.background =
                    "rgba(5,6,8,.97)";

            } else {

                navbar.style.background =
                    "rgba(5,6,8,.86)";

            }

        },
        {
            passive: true
        }
    );


});
