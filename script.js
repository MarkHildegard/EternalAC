document.addEventListener("DOMContentLoaded", () => {
    const followers = document.getElementById("followers");
    const likes = document.getElementById("likes");
    const views = document.getElementById("views");
    const refreshBtn = document.getElementById("refresh-btn");

    function updateStats() {
        // Fake-Stats für Test (ersetzen mit echter API)
        const fakeStats = {
            followers: Math.floor(Math.random() * 1000000),
            likes: Math.floor(Math.random() * 5000000),
            views: Math.floor(Math.random() * 10000000)
        };

        gsap.to(followers, { duration: 0.5, textContent: fakeStats.followers, ease: "power2.out" });
        gsap.to(likes, { duration: 0.5, textContent: fakeStats.likes, ease: "power2.out" });
        gsap.to(views, { duration: 0.5, textContent: fakeStats.views, ease: "power2.out" });
    }

    refreshBtn.addEventListener("click", updateStats);

    // Animationen beim Start
    gsap.from(".glitch", { opacity: 0, y: -50, duration: 1.2, ease: "bounce.out" });
    gsap.from(".stat-box", { opacity: 0, scale: 0.8, duration: 1, delay: 0.5, stagger: 0.3 });

    updateStats();
});
