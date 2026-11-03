
document.addEventListener("DOMContentLoaded", function () {

    const navLinks = document.querySelectorAll(".nav-menu a");

    navLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            const href = link.getAttribute("href");

            if (!href || !href.startsWith("#")) return;

            const target = document.getElementById(
                href.substring(1)
            );

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                history.replaceState(null, "", href);
            }
        });
    });


    const animatedElements = document.querySelectorAll(
        ".hero-content, .section-title, .TK, .SD, .SMP, " +
        ".SMK, .projek, .item"
    );

    const animationObserver = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1
        }
    );

    animatedElements.forEach(function (element) {
        element.classList.add("reveal");
        animationObserver.observe(element);
    });


    // 3. PROGRESS BAR KEAHLIAN
    const progressBars = document.querySelectorAll(
        ".progress-bar .progress"
    );

    const progressObserver = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const bar = entry.target;

                    const targetWidth = getComputedStyle(bar)
                        .getPropertyValue("--target")
                        .trim();

                    bar.style.width = targetWidth || "0%";

                    observer.unobserve(bar);
                }
            });
        },
        {
            threshold: 0.2
        }
    );

    progressBars.forEach(function (bar) {
        progressObserver.observe(bar);
    });


    // 4. MENU AKTIF SAAT SCROLL
    const sections = document.querySelectorAll(
        "#beranda, #Tentang, #Pendidikan, " +
        "#Keahlian, #portofolio, #kontak"
    );

    const sectionObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    navLinks.forEach(function (link) {
                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") ===
                            "#" + entry.target.id
                        );
                    });
                }
            });
        },
        {
            rootMargin: "-20% 0px -65% 0px"
        }
    );

    sections.forEach(function (section) {
        sectionObserver.observe(section);
    });

});
