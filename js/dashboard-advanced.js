const API_URL = 'https://api.govoltmine.xyz/api';
const BTC_PRICE = 67500;
let dashboardData = {};

// Tab switching
function showDashboardTab(tab) {
    document.querySelectorAll('.dash-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.dash-tab').forEach(el => el.classList.remove('active'));

    document.getElementById(tab).classList.add('active');
    document.querySelector(`[data-tab="${tab}"]`).classList.add('active');

    if (tab === 'earnings') loadEarningsData();
    if (tab === 'history') loadHistoryData();
    if (tab === 'settings') loadSettingsData();
}

// Load main dashboard
async function loadDashboard() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    try {
        const response = await fetch(`${API_URL}/customer/dashboard`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) throw new Error('Failed to load');

        dashboardData = await response.json();
        displayDashboard(dashboardData);
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to load dashboard');
        window.location.href = 'login.html';
    }
}

function displayDashboard(data) {
    // User info
    document.getElementById('userEmail').textContent = data.customer.email;

    // Balance
    const balance = data.customer.balance_btc || 0;
    document.getElementById('totalBalance').textContent = balance.toFixed(8) + ' BTC';
    document.getElementById('balanceUSD').textContent = '$' + (balance * BTC_PRICE).toFixed(2) + ' USD';
    document.getElementById('availableBalance').textContent = balance.toFixed(8);

    // Stats
    document.getElementById('totalMiners').textContent = data.miners.length;
    const totalHashrate = data.miners.reduce((sum, m) => sum + m.hashrate, 0);
    document.getElementById('totalHashrate').textContent = totalHashrate.toFixed(2) + ' TH/s';

    const totalEarnings = data.miners.reduce((sum, m) => sum + (m.total_earned_btc || 0), 0);
    document.getElementById('totalEarnings').textContent = totalEarnings.toFixed(8) + ' BTC';

    // Calculate daily average (mock - would need actual daily data)
    const avgDaily = totalEarnings / 30; // Simplified
    document.getElementById('avgDailyEarnings').textContent = avgDaily.toFixed(8) + ' BTC';

    // ROI Analysis
    const totalInvestment = data.miners.reduce((sum, m) => sum + (m.purchase_price || 0), 0);
    const totalElectricity = data.miners.reduce((sum, m) => sum + (m.total_electricity_usd || 0), 0);
    const currentValue = (totalEarnings * BTC_PRICE) - totalElectricity;
    const totalProfit = currentValue - totalInvestment;
    const roiPercent = totalInvestment > 0 ? (totalProfit / totalInvestment * 100) : 0;

    document.getElementById('totalInvestment').textContent = '$' + totalInvestment.toFixed(2);
    document.getElementById('currentValue').textContent = '$' + currentValue.toFixed(2);
    document.getElementById('totalProfit').textContent = '$' + totalProfit.toFixed(2);
    document.getElementById('roiPercentage').textContent = roiPercent.toFixed(2) + '%';

    // Break even calculation
    if (data.miners.length > 0 && avgDaily > 0) {
        const daysToBreakEven = totalInvestment / (avgDaily * BTC_PRICE);
        const oldestMiner = data.miners[0];
        const breakEvenDate = new Date(oldestMiner.purchase_date);
        breakEvenDate.setDate(breakEvenDate.getDate() + daysToBreakEven);
        document.getElementById('breakEvenDate').textContent = breakEvenDate.toLocaleDateString();

        const daysMining = Math.floor((Date.now() - new Date(oldestMiner.purchase_date)) / (1000 * 60 * 60 * 24));
        document.getElementById('daysMining').textContent = daysMining + ' days';
    }

    // Miners display
    const minersGrid = document.getElementById('minersGrid');
    const emptyState = document.getElementById('emptyState');

    if (data.miners.length === 0) {
        minersGrid.style.display = 'none';
        emptyState.style.display = 'flex';
    } else {
        minersGrid.style.display = 'grid';
        emptyState.style.display = 'none';

        minersGrid.innerHTML = data.miners.map(miner => {
            const netProfit = (miner.total_earned_btc || 0) * BTC_PRICE - (miner.total_electricity_usd || 0);
            return `
                <div class="miner-card">
                    <div class="miner-header">
                        <div>
                            <h3>${miner.model}</h3>
                            <p class="miner-serial">${miner.serial_number}</p>
                        </div>
                        <span class="status-badge active">● Online</span>
                    </div>
                    <div class="miner-stats-grid">
                        <div class="miner-stat">
                            <p class="miner-stat-label">Hashrate</p>
                            <p class="miner-stat-value">${miner.hashrate} TH/s</p>
                        </div>
                        <div class="miner-stat">
                            <p class="miner-stat-label">Purchase Price</p>
                            <p class="miner-stat-value">$${miner.purchase_price}</p>
                        </div>
                    </div>
                    <div class="miner-earnings">
                        <div class="earnings-row">
                            <span>Total Mined</span>
                            <span class="earnings-value">${(miner.total_earned_btc || 0).toFixed(8)} BTC</span>
                        </div>
                        <div class="earnings-row">
                            <span>Electricity Cost</span>
                            <span class="earnings-cost">-$${(miner.total_electricity_usd || 0).toFixed(2)}</span>
                        </div>
                        <div class="earnings-row total">
                            <span>Net Profit</span>
                            <span class="earnings-profit">${netProfit.toFixed(2)} USD</span>
                        </div>
                    </div>
                    <div class="miner-footer">
                        <small>Active since ${new Date(miner.purchase_date).toLocaleDateString()}</small>
                    </div>
                </div>
            `;
        }).join('');
    }
}

// Earnings data
function loadEarningsData() {
    const totalEarnings = dashboardData.miners?.reduce((sum, m) => sum + (m.total_earned_btc || 0), 0) || 0;

    // Mock time-based data (would need backend support for real data)
    document.getElementById('todayEarnings').textContent = (totalEarnings / 30).toFixed(8) + ' BTC';
    document.getElementById('todayEarningsUSD').textContent = '$' + ((totalEarnings / 30) * BTC_PRICE).toFixed(2);

    document.getElementById('weekEarnings').textContent = (totalEarnings / 4).toFixed(8) + ' BTC';
    document.getElementById('weekEarningsUSD').textContent = '$' + ((totalEarnings / 4) * BTC_PRICE).toFixed(2);

    document.getElementById('monthEarnings').textContent = totalEarnings.toFixed(8) + ' BTC';
    document.getElementById('monthEarningsUSD').textContent = '$' + (totalEarnings * BTC_PRICE).toFixed(2);

    document.getElementById('allTimeEarnings').textContent = totalEarnings.toFixed(8) + ' BTC';
    document.getElementById('allTimeEarningsUSD').textContent = '$' + (totalEarnings * BTC_PRICE).toFixed(2);

    // Miner breakdown
    const breakdown = document.getElementById('minerBreakdown');
    if (dashboardData.miners) {
        breakdown.innerHTML = dashboardData.miners.map(m => `
            <div class="miner-breakdown-item">
                <span class="miner-breakdown-name">${m.serial_number} - ${m.model}</span>
                <span class="miner-breakdown-earnings">${(m.total_earned_btc || 0).toFixed(8)} BTC</span>
            </div>
        `).join('');
    }
}

// History data
function loadHistoryData() {
    document.getElementById('historyTable').innerHTML = `
        <div class="table-empty">
            <div class="table-empty-icon">📋</div>
            <p>Transaction history coming soon</p>
        </div>
    `;
}

// Settings data
function loadSettingsData() {
    document.getElementById('settingsEmail').textContent = dashboardData.customer?.email || '-';
    document.getElementById('settingsTotalMiners').textContent = dashboardData.miners?.length || 0;

    if (dashboardData.miners?.length > 0) {
        const oldestDate = new Date(dashboardData.miners[0].purchase_date);
        document.getElementById('settingsMemberSince').textContent = oldestDate.toLocaleDateString();
    }

    if (dashboardData.customer?.btc_address) {
        document.getElementById('settingsBtcAddress').value = dashboardData.customer.btc_address;
    }
}

function updateBtcAddress() {
    alert('BTC address update feature coming soon!');
}

// Withdrawal modal
function showWithdrawModal() {
    document.getElementById('withdrawModal').style.display = 'flex';
}

function closeWithdrawModal() {
    document.getElementById('withdrawModal').style.display = 'none';
}

document.getElementById('withdrawAmount')?.addEventListener('input', (e) => {
    const amount = parseFloat(e.target.value) || 0;
    document.getElementById('withdrawAmountDisplay').textContent = amount.toFixed(8) + ' BTC';
    document.getElementById('withdrawReceiveDisplay').textContent = amount.toFixed(8) + ' BTC';
});

async function submitWithdraw() {
    const amount = parseFloat(document.getElementById('withdrawAmount').value);
    const address = document.getElementById('withdrawAddress').value;

    if (!amount || amount < 0.001) {
        alert('Minimum withdrawal is 0.001 BTC');
        return;
    }

    if (!address) {
        alert('Please enter a Bitcoin address');
        return;
    }

    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${API_URL}/customer/withdraw`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount_btc: amount, btc_address: address })
        });

        const data = await response.json();

        if (response.ok) {
            alert('✅ Withdrawal request submitted! We will process it within 24 hours.');
            closeWithdrawModal();
            loadDashboard();
        } else {
            alert(data.error || 'Withdrawal failed');
        }
    } catch (error) {
        alert('Connection error');
    }
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}

// Initialize
loadDashboard();
setInterval(loadDashboard, 30000); // Reload every 30 seconds
