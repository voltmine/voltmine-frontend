// Live Bitcoin Price Ticker & Real-Time Data

// Bitcoin Price Ticker
async function updateBitcoinPrice() {
    try {
        const response = await fetch('https://api.coinbase.com/v2/prices/BTC-USD/spot');
        const data = await response.json();
        const price = parseFloat(data.data.amount);

        const priceElement = document.getElementById('btc-price-live');
        if (priceElement) {
            priceElement.textContent = `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

            // Add pulse animation on update
            priceElement.style.animation = 'none';
            setTimeout(() => {
                priceElement.style.animation = 'pulse 0.5s ease';
            }, 10);
        }

        // Update all earnings estimates on page
        updateEarningsEstimates(price);
    } catch (error) {
        console.log('Using fallback BTC price');
        const priceElement = document.getElementById('btc-price-live');
        if (priceElement) {
            priceElement.textContent = '$67,500.00';
        }
    }
}

// Update earnings calculations based on current BTC price
function updateEarningsEstimates(btcPrice) {
    const estimates = document.querySelectorAll('[data-btc-amount]');

    estimates.forEach(estimate => {
        const btcAmount = parseFloat(estimate.getAttribute('data-btc-amount'));
        const usdValue = btcAmount * btcPrice;
        estimate.textContent = `$${usdValue.toFixed(2)}`;
    });
}

// Create live ticker banner
function createLiveTicker() {
    const ticker = document.createElement('div');
    ticker.id = 'live-ticker';
    ticker.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background: rgba(212, 175, 55, 0.1);
        backdrop-filter: blur(10px);
        border-bottom: 1px solid var(--accent-gold);
        padding: 8px 0;
        z-index: 999;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 40px;
        font-size: 14px;
        font-weight: 600;
        transform: translateY(-100%);
        transition: transform 0.3s ease;
    `;

    ticker.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
            <span style="color: var(--accent-gold);">₿</span>
            <span style="color: var(--text-secondary);">BTC:</span>
            <span id="btc-price-live" style="color: var(--success);">$67,500.00</span>
            <span class="status-dot" style="margin-left: 8px;"></span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
            <span style="color: var(--accent-gold);">⚡</span>
            <span style="color: var(--text-secondary);">Network Hashrate:</span>
            <span style="color: var(--text-primary);">650 EH/s</span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
            <span style="color: var(--accent-gold);">⛏️</span>
            <span style="color: var(--text-secondary);">Active Miners:</span>
            <span id="active-miners-count" style="color: var(--text-primary);">0</span>
        </div>
    `;

    document.body.appendChild(ticker);

    // Show ticker after page load
    setTimeout(() => {
        ticker.style.transform = 'translateY(0)';
    }, 1000);

    // Adjust navbar position
    const navbar = document.querySelector('.navbar-modern, .navbar');
    if (navbar) {
        navbar.style.top = '42px';
    }

    return ticker;
}

// Animate active miners count
function animateMinerCount() {
    const countElement = document.getElementById('active-miners-count');
    if (!countElement) return;

    let count = 0;
    const target = Math.floor(Math.random() * 50) + 100; // Random between 100-150

    const interval = setInterval(() => {
        count += Math.ceil((target - count) / 10);
        countElement.textContent = count;

        if (count >= target) {
            clearInterval(interval);
            countElement.textContent = target;
        }
    }, 50);
}

// Hash rate visualization
function createHashrateViz() {
    const vizContainer = document.createElement('div');
    vizContainer.className = 'mining-viz';
    vizContainer.style.cssText = `
        position: relative;
        width: 100%;
        max-width: 800px;
        height: 200px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 12px;
        overflow: hidden;
        margin: 40px auto;
        border: 1px solid var(--border);
    `;

    // Add to page
    const flowSection = document.querySelector('.flow-section .container');
    if (flowSection) {
        const title = document.createElement('h3');
        title.textContent = 'Live Mining Visualization';
        title.style.cssText = `
            text-align: center;
            color: var(--accent-gold);
            margin-top: 80px;
            margin-bottom: 20px;
            font-size: 24px;
        `;
        flowSection.appendChild(title);
        flowSection.appendChild(vizContainer);
    }

    return vizContainer;
}

// Real-time stats counter
function createRealTimeStats() {
    const statsSection = document.querySelector('.hero-stats-animated');
    if (!statsSection) return;

    // Add live indicator to stats
    statsSection.querySelectorAll('.stat-animated').forEach(stat => {
        const indicator = document.createElement('div');
        indicator.className = 'status-dot';
        indicator.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
        `;
        stat.style.position = 'relative';
        stat.appendChild(indicator);
    });
}

// Mining activity simulator
function simulateMiningActivity() {
    const activities = [
        '⛏️ Block #845,392 found!',
        '💰 Payout processed: 0.00234 BTC',
        '🔧 Miner #127 optimized',
        '📊 Hashrate increased: +2.3%',
        '⚡ New miner deployed',
        '✅ Uptime: 99.98%'
    ];

    const activityFeed = document.createElement('div');
    activityFeed.id = 'activity-feed';
    activityFeed.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        width: 320px;
        max-height: 400px;
        overflow: hidden;
        z-index: 998;
        pointer-events: none;
    `;

    document.body.appendChild(activityFeed);

    function addActivity() {
        const activity = activities[Math.floor(Math.random() * activities.length)];
        const item = document.createElement('div');
        item.style.cssText = `
            background: rgba(10, 14, 26, 0.95);
            backdrop-filter: blur(10px);
            border: 1px solid var(--border);
            border-left: 3px solid var(--accent-gold);
            padding: 12px 16px;
            margin-bottom: 10px;
            border-radius: 8px;
            font-size: 13px;
            color: var(--text-secondary);
            opacity: 0;
            transform: translateX(-100%);
            transition: all 0.3s ease;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        `;
        item.textContent = activity;

        activityFeed.insertBefore(item, activityFeed.firstChild);

        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 10);

        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-100%)';
            setTimeout(() => item.remove(), 300);
        }, 5000);

        // Keep only last 3
        while (activityFeed.children.length > 3) {
            activityFeed.lastChild.remove();
        }
    }

    // Add activity every 8-15 seconds
    setInterval(addActivity, Math.random() * 7000 + 8000);
    addActivity(); // First one immediately
}

// Initialize all live features
function initLiveFeatures() {
    createLiveTicker();
    updateBitcoinPrice();
    animateMinerCount();
    createRealTimeStats();
    // createHashrateViz(); // DISABLED - using static HTML version instead
    simulateMiningActivity();

    // Update BTC price every 30 seconds
    setInterval(updateBitcoinPrice, 30000);

    // Update miner count every 60 seconds
    setInterval(animateMinerCount, 60000);
}

// Start when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLiveFeatures);
} else {
    initLiveFeatures();
}

console.log('🔴 LIVE: Bitcoin price tracking active');
