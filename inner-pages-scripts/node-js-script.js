// Mobile Menu Toggle Logic
const openBtn = document.querySelector('.sidebar-trigger.open');
const closeBtn = document.querySelector('.sidebar-trigger.close');
const sidebar = document.getElementById('sidebar-area');
const backdrop = document.getElementById('backdrop');

function openSidebar() {
    sidebar.classList.add('active');
    backdrop.classList.add('show');
    document.body.classList.add('no-scroll');

    // a11y
    openBtn?.setAttribute('aria-expanded', 'true');
}

function closeSidebar() {
    sidebar.classList.remove('active');
    backdrop.classList.remove('show');
    document.body.classList.remove('no-scroll');

    openBtn?.setAttribute('aria-expanded', 'false');
}

openBtn?.addEventListener('click', openSidebar);
closeBtn?.addEventListener('click', closeSidebar);
backdrop?.addEventListener('click', closeSidebar);

// Optional: close on Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('active')) {
        closeSidebar();
    }
});

// Inner Navigation Display Logic
const innerNav = document.getElementById("inner-nav");
const expandBtn = document.getElementById("expand-btn");

expandBtn.addEventListener("click", () => {
    if (innerNav.style.display == "none") {
        innerNav.style.display = "block";
        expandBtn.innerHTML = `<span>-</span>`
        expandBtn.style.backgroundColor = "#11151C";
    } else {
        innerNav.style.display = "none";
        expandBtn.innerHTML = `<span>+</span>`
        expandBtn.style.backgroundColor = "#ba0df4";
    }
})

// Scroll Event Logic
const header = document.querySelector(".header");
const darklogo = document.querySelector(".logo-dark")
const lightLogo = document.querySelector(".logo-light")

window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
        darklogo.style.display = "inline";
        lightLogo.style.display = "none";
    } else {
        header.classList.remove("scrolled");
        darklogo.style.display = "none";
        lightLogo.style.display = "inline";
    }
});

// iOS App Section JS Logic 
document.addEventListener("DOMContentLoaded", function () {
    const tabSection = document.querySelector(".ios-multi-platforms-section");

    if (!tabSection) return;

    const tabs = tabSection.querySelectorAll(".ios-tabs-tab");
    const innerPanels = tabSection.querySelectorAll(".inner-tab-panel");
    const outerPanels = tabSection.querySelectorAll(".ios-tabs-panel");

    function isMobileLayout() {
        return window.innerWidth <= 768;
    }

    function switchTab(clickedTab) {
        const targetPanel = clickedTab.getAttribute("data-target");
        const innerPanel = clickedTab.getAttribute("data-inner");

        // Remove active class from all tabs
        tabs.forEach(tab => {
            tab.classList.remove("ios-tabs-tab--active");
            tab.setAttribute("aria-selected", "false");
        });

        // Hide all outer panels
        outerPanels.forEach(panel => {
            panel.classList.remove("ios-tabs-panel--active");
        });

        // Hide all inner panels
        innerPanels.forEach(panel => {
            panel.classList.remove("inner-panel-active");
        });

        // Activate clicked tab
        clickedTab.classList.add("ios-tabs-tab--active");
        clickedTab.setAttribute("aria-selected", "true");

        if (isMobileLayout()) {
            // Show inner panel on mobile
            const activeInnerPanel = tabSection.querySelector(`#${innerPanel}`);
            if (activeInnerPanel) {
                activeInnerPanel.classList.add("inner-panel-active");
            }
        } else {
            // Show outer panel on desktop
            const activeOuterPanel = tabSection.querySelector(`#${targetPanel}`);
            if (activeOuterPanel) {
                activeOuterPanel.classList.add("ios-tabs-panel--active");
            }
        }
    }

    // Add click event listeners to all tabs
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            switchTab(tab);
        });
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Re-trigger the active tab to ensure proper display
            const activeTab = tabSection.querySelector(".ios-tabs-tab--active");
            if (activeTab) {
                switchTab(activeTab);
            }
        }, 250);
    });

    // Initialize the first tab as active
    if (tabs.length > 0) {
        switchTab(tabs[0]);
    }
});


// Techstack tab logic 
document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".nodejs-tab");
    const panels = document.querySelectorAll(".nodejs-tab-panel");

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const targetPanelId = tab.getAttribute("aria-controls");

            // Remove active states from all tabs and panels
            tabs.forEach((t) => {
                t.classList.remove("tab-active");
                t.setAttribute("aria-selected", "false");
            });

            panels.forEach((panel) => {
                panel.classList.remove("panel-active");
                panel.setAttribute("hidden", true);
            });

            // Activate clicked tab
            tab.classList.add("tab-active");
            tab.setAttribute("aria-selected", "true");

            // Show corresponding panel
            const targetPanel = document.getElementById(targetPanelId);
            targetPanel.classList.add("panel-active");
            targetPanel.removeAttribute("hidden");
        });
    });
});

// Location Section Script

const boxes = document.querySelectorAll(".box");

boxes.forEach(box => {
    box.addEventListener("click", () => {
        boxes.forEach(b => b.classList.remove("active"));
        box.classList.add("active");
    });
});


// GSAP Horizontal Scroll Code
gsap.registerPlugin(ScrollTrigger);

const container = document.querySelector(".scroll-container");
const lineFill = document.querySelector(".line-fill");
const wrapper = document.querySelector(".horizontal-scroll-wrapper");

let totalScroll;

function setScroll() {
    totalScroll = container.scrollWidth - window.innerWidth;

    gsap.to(container, {
        x: () => `-${totalScroll}px`,
        ease: "none",
        scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: () => `+=${totalScroll}`,
            scrub: true,
            pin: true,
            anticipatePin: 1,
            onUpdate: self => {
                const progress = self.progress * 100;
                lineFill.style.width = `${progress}%`;
            },
        },
    });
}

window.addEventListener('load', setScroll);
window.addEventListener('resize', () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    setScroll();
});