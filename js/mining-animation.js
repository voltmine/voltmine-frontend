// Live Mining Visualization - Updates hash values periodically

function initMiningVisualization() {
    console.log('⛏️ Initializing live mining visualization...');

    // Function to generate random hash
    function generateHash(length = 64) {
        const chars = '0123456789abcdef';
        let hash = '';
        for (let i = 0; i < length; i++) {
            hash += chars[Math.floor(Math.random() * chars.length)];
        }
        return hash;
    }

    // Function to generate random number in range
    function randomNum(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Function to format large numbers with commas
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    // Update block hash periodically
    const hashLines = document.querySelectorAll('.hash-line');

    if (hashLines.length === 0) {
        console.warn('⚠️ No hash lines found');
        return;
    }

    console.log(`✅ Found ${hashLines.length} hash lines`);

    // Update block number and hash every 10 seconds
    setInterval(() => {
        const blockLine = hashLines[0];
        if (blockLine) {
            const currentBlock = 842156;
            const newBlock = currentBlock + randomNum(0, 3);
            const newHash = '000000000000000000' + generateHash(46);

            blockLine.innerHTML = `<span style="color: #10b981;">▶</span> Block #${formatNumber(newBlock)} | Hash: <span class="hash-value">${newHash}</span>`;
        }
    }, 10000);

    // Update miner stats every 5 seconds
    setInterval(() => {
        const miner1Line = hashLines[3];
        const miner2Line = hashLines[4];

        if (miner1Line) {
            const hashrate1 = (94.5 + Math.random() * 1.5).toFixed(1);
            const temp1 = randomNum(66, 72);
            const power1 = randomNum(3240, 3260);
            const shares1 = randomNum(1800, 1900);

            miner1Line.innerHTML = `<span style="color: #10b981;">▶</span> Miner S19-047: <span class="hash-value">${hashrate1} TH/s</span> | Temp: ${temp1}°C | Power: ${power1}W | Shares: ${formatNumber(shares1)}`;
        }

        if (miner2Line) {
            const hashrate2 = (94.0 + Math.random() * 1.5).toFixed(1);
            const temp2 = randomNum(68, 73);
            const power2 = randomNum(3245, 3265);
            const shares2 = randomNum(1750, 1850);

            miner2Line.innerHTML = `<span style="color: #10b981;">▶</span> Miner S19-048: <span class="hash-value">${hashrate2} TH/s</span> | Temp: ${temp2}°C | Power: ${power2}W | Shares: ${formatNumber(shares2)}`;
        }
    }, 5000);

    // Add random "Share Found" messages
    setInterval(() => {
        const shareLine = hashLines[5];
        if (shareLine) {
            const difficulty = [4096, 8192, 16384, 32768][randomNum(0, 3)];
            shareLine.innerHTML = `<span style="color: #f59e0b;">⚡</span> Share Found! <span class="hash-value">Difficulty: ${formatNumber(difficulty)}</span> | Accepted by pool`;

            // Flash effect
            shareLine.style.textShadow = '0 0 10px rgba(245, 158, 11, 0.8)';
            setTimeout(() => {
                shareLine.style.textShadow = 'none';
            }, 500);
        }
    }, 8000);

    // Update network difficulty every 15 seconds
    setInterval(() => {
        const diffLine = hashLines[2];
        if (diffLine) {
            const baseDiff = 79351228131136;
            const variation = randomNum(-1000000000, 1000000000);
            const newDiff = baseDiff + variation;
            const networkRate = (580 + Math.random() * 20).toFixed(0);

            diffLine.innerHTML = `<span style="color: #10b981;">▶</span> Difficulty: <span class="hash-value">${formatNumber(newDiff)}</span> | Network Rate: ${networkRate} EH/s`;
        }
    }, 15000);

    // Update payout queue every 30 seconds
    setInterval(() => {
        const payoutLine = hashLines[9];
        if (payoutLine) {
            const btcAmount = (0.08 + Math.random() * 0.01).toFixed(4);
            const hours = randomNum(5, 7);
            const minutes = randomNum(0, 59);

            payoutLine.innerHTML = `<span style="color: #10b981;">▶</span> Payout Queue: <span class="hash-value">${btcAmount} BTC</span> | Next payout in ${hours}h ${minutes}m`;
        }
    }, 30000);

    // Update latency every 3 seconds
    setInterval(() => {
        const statusLine = hashLines[11];
        if (statusLine) {
            const latency = randomNum(8, 18);
            statusLine.innerHTML = `<span style="color: #3b82f6;">●</span> System Status: <span class="hash-value">All systems operational</span> | Latency: ${latency}ms`;
        }
    }, 3000);

    console.log('✅ Mining visualization initialized and animating');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMiningVisualization);
} else {
    initMiningVisualization();
}

// Also run after page is fully loaded
window.addEventListener('load', () => {
    setTimeout(initMiningVisualization, 2000);
});
