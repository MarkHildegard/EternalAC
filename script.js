document.addEventListener("DOMContentLoaded", () => {
    const logContainer = document.getElementById("log");
    const startBtn = document.getElementById("start-mining");
    const stopBtn = document.getElementById("stop-mining");

    let mining = false;
    let miningInterval;

    function logMessage(message, type = "success") {
        const msg = document.createElement("div");
        msg.textContent = message;
        msg.style.color = type === "success" ? "#00ff00" : "#ff0000";
        logContainer.appendChild(msg);
        logContainer.scrollTop = logContainer.scrollHeight;
    }

    function startMining() {
        if (mining) return;
        mining = true;
        logMessage("🚀 Starting Crypto Mining...", "success");

        miningInterval = setInterval(() => {
            let foundBlock = Math.random() > 0.6; // 40% Chance auf "Fehlgeschlagen"
            if (foundBlock) {
                logMessage(`✅ Block #${Math.floor(Math.random() * 1000000)} mined successfully!`, "success");
            } else {
                logMessage(`❌ Block verification failed. Retrying...`, "error");
            }
        }, 1000);
    }

    function stopMining() {
        if (!mining) return;
        mining = false;
        clearInterval(miningInterval);
        logMessage("🛑 Mining stopped.", "error");
    }

    startBtn.addEventListener("click", startMining);
    stopBtn.addEventListener("click", stopMining);
});
