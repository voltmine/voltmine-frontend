const API_URL = 'https://api.govoltmine.xyz/api';
let currentData = {};

// Check admin auth
function checkAuth() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!token || !user.is_admin) {
        window.location.href = 'login.html';
        return false;
    }
    return token;
}

// Tab switching
function showTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-link').forEach(link => {
        link.classList.remove('active');
    });

    document.getElementById(tabName).classList.add('active');
    document.querySelector(`[data-tab="${tabName}"]`)?.classList.add('active');

    // Load tab data
    if (tabName === 'customers') loadCustomers();
    if (tabName === 'miners') loadMiners();
    if (tabName === 'payouts') loadPayouts();
}

// Load overview
async function loadOverview() {
    const token = checkAuth();

    try {
        const [customersRes, minersRes, payoutsRes] = await Promise.all([
            fetch(`${API_URL}/admin/customers`, { headers: { 'Authorization': `Bearer ${token}` } }),
            fetch(`${API_URL}/admin/miners`, { headers: { 'Authorization': `Bearer ${token}` } }),
            fetch(`${API_URL}/admin/payouts`, { headers: { 'Authorization': `Bearer ${token}` } })
        ]);

        const customers = await customersRes.json();
        const miners = await minersRes.json();
        const payouts = await payoutsRes.json();

        document.getElementById('totalCustomers').textContent = customers.customers.length;
        document.getElementById('totalSoldMiners').textContent = miners.miners.filter(m => m.status === 'sold').length;
        document.getElementById('availableMiners').textContent = miners.miners.filter(m => m.status === 'available').length;
        document.getElementById('pendingPayouts').textContent = payouts.payouts.length;

    } catch (error) {
        console.error('Error loading overview:', error);
    }
}

// Load customers
async function loadCustomers() {
    const token = checkAuth();

    try {
        const res = await fetch(`${API_URL}/admin/customers`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        currentData.customers = data.customers;

        displayCustomersTable(data.customers);
    } catch (error) {
        console.error('Error:', error);
    }
}

function displayCustomersTable(customers) {
    const container = document.getElementById('customersTable');

    if (customers.length === 0) {
        container.innerHTML = '<div class="table-empty"><div class="table-empty-icon">👥</div><p>No customers yet</p></div>';
        return;
    }

    container.innerHTML = `
        <div class="data-table">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Miners</th>
                        <th>Balance</th>
                        <th>Joined</th>
                    </tr>
                </thead>
                <tbody>
                    ${customers.map(c => `
                        <tr>
                            <td>#${c.id}</td>
                            <td>${c.email}</td>
                            <td>${c.miner_count} miners</td>
                            <td>${c.balance_btc.toFixed(8)} BTC</td>
                            <td>${new Date(c.created_at).toLocaleDateString()}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// Load miners
async function loadMiners() {
    const token = checkAuth();

    try {
        const res = await fetch(`${API_URL}/admin/miners`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        currentData.miners = data.miners;

        displayMinersTable(data.miners);
    } catch (error) {
        console.error('Error:', error);
    }
}

function displayMinersTable(miners) {
    const container = document.getElementById('minersTable');

    container.innerHTML = `
        <div class="data-table">
            <table>
                <thead>
                    <tr>
                        <th>Serial</th>
                        <th>Model</th>
                        <th>Hashrate</th>
                        <th>Status</th>
                        <th>Customer</th>
                        <th>Purchase Cost</th>
                        <th>Sold Price</th>
                    </tr>
                </thead>
                <tbody>
                    ${miners.map(m => `
                        <tr>
                            <td><strong>${m.serial_number}</strong></td>
                            <td>${m.model}</td>
                            <td>${m.hashrate} TH/s</td>
                            <td><span class="table-badge ${m.status}">${m.status}</span></td>
                            <td>${m.customer_email || '-'}</td>
                            <td>$${m.purchase_cost}</td>
                            <td>${m.sold_price ? '$' + m.sold_price : '-'}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// Load payouts
async function loadPayouts() {
    const token = checkAuth();

    try {
        const res = await fetch(`${API_URL}/admin/payouts`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        currentData.payouts = data.payouts;

        displayPayoutsTable(data.payouts);
    } catch (error) {
        console.error('Error:', error);
    }
}

function displayPayoutsTable(payouts) {
    const container = document.getElementById('payoutsTable');

    if (payouts.length === 0) {
        container.innerHTML = '<div class="table-empty"><div class="table-empty-icon">💰</div><p>No pending payouts</p></div>';
        return;
    }

    container.innerHTML = `
        <div class="data-table">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Customer</th>
                        <th>Amount</th>
                        <th>Address</th>
                        <th>Requested</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    ${payouts.map(p => `
                        <tr>
                            <td>#${p.id}</td>
                            <td>${p.email}</td>
                            <td>${p.amount_btc.toFixed(8)} BTC</td>
                            <td><code>${p.btc_address.substring(0, 20)}...</code></td>
                            <td>${new Date(p.created_at).toLocaleDateString()}</td>
                            <td>
                                <button class="table-btn primary" onclick="showProcessPayoutModal(${p.id})">
                                    Process
                                </button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// Assign Miner Modal
async function showAssignMinerModal() {
    const token = checkAuth();

    // Load customers and available miners
    const [customersRes, minersRes] = await Promise.all([
        fetch(`${API_URL}/admin/customers`, { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch(`${API_URL}/admin/miners`, { headers: { 'Authorization': `Bearer ${token}` } })
    ]);

    const customers = await customersRes.json();
    const miners = await minersRes.json();

    const availableMiners = miners.miners.filter(m => m.status === 'available');

    document.getElementById('assignCustomerId').innerHTML =
        customers.customers.map(c => `<option value="${c.id}">${c.email}</option>`).join('');

    document.getElementById('assignMinerId').innerHTML =
        availableMiners.map(m => `<option value="${m.id}">${m.serial_number} - ${m.model}</option>`).join('');

    document.getElementById('assignMinerModal').style.display = 'flex';
}

function closeAssignMinerModal() {
    document.getElementById('assignMinerModal').style.display = 'none';
}

async function submitAssignMiner() {
    const token = checkAuth();
    const customer_id = parseInt(document.getElementById('assignCustomerId').value);
    const miner_id = parseInt(document.getElementById('assignMinerId').value);
    const purchase_price = parseFloat(document.getElementById('assignPrice').value);

    try {
        const res = await fetch(`${API_URL}/admin/assign-miner`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ customer_id, miner_id, purchase_price })
        });

        const data = await res.json();

        if (res.ok) {
            alert('Miner assigned successfully!');
            closeAssignMinerModal();
            loadMiners();
            loadOverview();
        } else {
            alert(data.error || 'Failed to assign miner');
        }
    } catch (error) {
        alert('Connection error');
    }
}

// Update Earnings Modal
async function showUpdateEarningsModal() {
    const token = checkAuth();

    const res = await fetch(`${API_URL}/admin/miners`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const miners = await res.json();

    const soldMiners = miners.miners.filter(m => m.status === 'sold');

    document.getElementById('earningsMinerId').innerHTML =
        soldMiners.map(m => `<option value="${m.id}">${m.serial_number} - ${m.customer_email}</option>`).join('');

    document.getElementById('updateEarningsModal').style.display = 'flex';
}

function closeUpdateEarningsModal() {
    document.getElementById('updateEarningsModal').style.display = 'none';
}

async function submitUpdateEarnings() {
    const token = checkAuth();
    const miner_id = parseInt(document.getElementById('earningsMinerId').value);
    const btc_earned = parseFloat(document.getElementById('earningsBTC').value);
    const electricity_cost = parseFloat(document.getElementById('earningsElectricity').value);

    try {
        const res = await fetch(`${API_URL}/admin/update-earnings`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ miner_id, btc_earned, electricity_cost })
        });

        const data = await res.json();

        if (res.ok) {
            alert('Earnings updated successfully!');
            closeUpdateEarningsModal();
            loadMiners();
        } else {
            alert(data.error || 'Failed to update earnings');
        }
    } catch (error) {
        alert('Connection error');
    }
}

// Process Payout Modal
function showProcessPayoutModal(payoutId) {
    document.getElementById('payoutId').value = payoutId;
    document.getElementById('processPayoutModal').style.display = 'flex';
}

function closeProcessPayoutModal() {
    document.getElementById('processPayoutModal').style.display = 'none';
}

async function submitProcessPayout() {
    const token = checkAuth();
    const payout_id = parseInt(document.getElementById('payoutId').value);
    const tx_hash = document.getElementById('payoutTxHash').value;

    if (!tx_hash) {
        alert('Please enter transaction hash');
        return;
    }

    try {
        const res = await fetch(`${API_URL}/admin/process-payout`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ payout_id, tx_hash })
        });

        const data = await res.json();

        if (res.ok) {
            alert('Payout processed successfully!');
            closeProcessPayoutModal();
            loadPayouts();
            loadOverview();
        } else {
            alert(data.error || 'Failed to process payout');
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
checkAuth();
loadOverview();
