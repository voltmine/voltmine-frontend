// ============================================
// AI CHATBOT WIDGET
// Simple AI support chatbot for VoltMine
// ============================================

class VoltMineChat {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.init();
    }

    init() {
        this.createChatWidget();
        this.attachEventListeners();
        this.addWelcomeMessage();
    }

    createChatWidget() {
        const chatHTML = `
            <!-- Chat Button -->
            <div class="chat-button" id="chatButton">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                <span class="chat-notification">1</span>
            </div>

            <!-- Chat Window -->
            <div class="chat-window" id="chatWindow">
                <div class="chat-header">
                    <div class="chat-header-info">
                        <div class="chat-avatar">⚡</div>
                        <div>
                            <div class="chat-title">VoltMine Support</div>
                            <div class="chat-status">
                                <span class="status-dot"></span> Online
                            </div>
                        </div>
                    </div>
                    <button class="chat-close" id="chatClose">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 6L6 18M6 6l12 12"/>
                        </svg>
                    </button>
                </div>

                <div class="chat-messages" id="chatMessages">
                    <!-- Messages will be added here -->
                </div>

                <div class="chat-quick-replies" id="quickReplies">
                    <button class="quick-reply" data-question="pricing">💰 Pricing Info</button>
                    <button class="quick-reply" data-question="aml">🔒 AML Policy</button>
                    <button class="quick-reply" data-question="custom">🛠️ Custom Setup</button>
                    <button class="quick-reply" data-question="support">📧 Contact</button>
                </div>

                <div class="chat-input-area">
                    <input type="text" class="chat-input" id="chatInput" placeholder="Type your question...">
                    <button class="chat-send" id="chatSend">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', chatHTML);
    }

    attachEventListeners() {
        const chatButton = document.getElementById('chatButton');
        const chatClose = document.getElementById('chatClose');
        const chatSend = document.getElementById('chatSend');
        const chatInput = document.getElementById('chatInput');
        const quickReplies = document.querySelectorAll('.quick-reply');

        chatButton.addEventListener('click', () => this.toggleChat());
        chatClose.addEventListener('click', () => this.toggleChat());
        chatSend.addEventListener('click', () => this.sendMessage());
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        quickReplies.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const question = e.target.dataset.question;
                this.handleQuickReply(question);
            });
        });
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        const chatWindow = document.getElementById('chatWindow');
        const chatButton = document.getElementById('chatButton');
        const notification = chatButton.querySelector('.chat-notification');

        if (this.isOpen) {
            chatWindow.classList.add('open');
            chatButton.classList.add('active');
            if (notification) notification.style.display = 'none';
        } else {
            chatWindow.classList.remove('open');
            chatButton.classList.remove('active');
        }
    }

    addWelcomeMessage() {
        const welcomeMsg = "👋 Welcome to VoltMine! I'm here to help you with Bitcoin cloud mining. Click a button below or type your question!";
        this.addMessage(welcomeMsg, 'bot');
    }

    addMessage(text, sender = 'user') {
        const messagesContainer = document.getElementById('chatMessages');
        const messageHTML = `
            <div class="chat-message ${sender}">
                ${sender === 'bot' ? '<div class="message-avatar">⚡</div>' : ''}
                <div class="message-bubble">${text}</div>
            </div>
        `;
        messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    sendMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();

        if (!message) return;

        this.addMessage(message, 'user');
        input.value = '';

        // Simulate bot response
        setTimeout(() => {
            const response = this.getBotResponse(message);
            this.addMessage(response, 'bot');
        }, 500);
    }

    handleQuickReply(question) {
        const questions = {
            pricing: "What are the pricing plans?",
            aml: "Tell me about AML policy",
            custom: "What about custom setups?",
            support: "How can I contact support?"
        };

        this.addMessage(questions[question], 'user');

        setTimeout(() => {
            const response = this.getBotResponse(question);
            this.addMessage(response, 'bot');
        }, 500);
    }

    getBotResponse(input) {
        const lowerInput = input.toLowerCase();

        // Pricing
        if (lowerInput.includes('pric') || input === 'pricing') {
            return `💰 <strong>Our Pricing Plans:</strong><br><br>
                <strong>Starter:</strong> $600 (1x Antminer S19, 95 TH/s)<br>
                <strong>Pro:</strong> $3,000 (5x S19, 475 TH/s)<br>
                <strong>Enterprise:</strong> $6,000 (10x S19, 950 TH/s)<br><br>
                All plans include 51% ownership stake and FREE trading signals ($199/mo value)! <a href="#marketplace">View details</a>`;
        }

        // AML Policy
        if (lowerInput.includes('aml') || lowerInput.includes('kyc') || lowerInput.includes('verification') || input === 'aml') {
            return `🔒 <strong>AML & KYC Requirements:</strong><br><br>
                <strong>Mandatory for all users:</strong><br>
                • Wallet whitelisting (all withdrawal addresses verified)<br>
                • 4 ID documents required:<br>
                  1. Government-issued photo ID<br>
                  2. Proof of address (within 3 months)<br>
                  3. Selfie with ID document<br>
                  4. Source of funds declaration<br><br>
                • Enhanced due diligence for transactions over $10,000<br>
                • Ongoing transaction monitoring<br><br>
                <strong>⚠️ No compliance = Account suspension</strong><br>
                See <a href="#legal">Legal & Compliance</a> for full details.`;
        }

        // Custom setup
        if (lowerInput.includes('custom') || lowerInput.includes('enterprise') || lowerInput.includes('white label') || input === 'custom') {
            return `🛠️ <strong>Custom Mining Solutions:</strong><br><br>
                For large-scale or specialized needs:<br>
                • Dedicated hardware clusters (50+ units)<br>
                • Custom ownership splits<br>
                • White-label dashboard branding<br>
                • API integration<br>
                • Flexible pricing models<br>
                • Geographic preference (India/Georgia)<br>
                • SLA guarantees<br><br>
                <strong>Minimum:</strong> $30,000 USD<br>
                <strong>Get Quote:</strong> <a href="mailto:contact@govoltmine.xyz">contact@govoltmine.xyz</a><br>
                <a href="#custom">Learn more</a>`;
        }

        // Support/Contact
        if (lowerInput.includes('support') || lowerInput.includes('contact') || lowerInput.includes('help') || input === 'support') {
            return `📧 <strong>Contact Our Team:</strong><br><br>
                <strong>Email:</strong><br>
                • support@govoltmine.xyz<br>
                • contact@govoltmine.xyz<br><br>
                <strong>Telegram:</strong> <a href="https://t.me/dsmrcrypto" target="_blank">@dsmrcrypto</a><br><br>
                We typically respond within 24 hours!`;
        }

        // Hardware
        if (lowerInput.includes('hardware') || lowerInput.includes('miner') || lowerInput.includes('s19')) {
            return `⚙️ <strong>Our Hardware:</strong><br><br>
                We use <strong>Antminer S19</strong> ASIC miners:<br>
                • 95 TH/s per unit<br>
                • Industry-leading efficiency<br>
                • Professional hosting with 24/7 monitoring<br>
                • Industrial cooling systems<br>
                • 99.9% uptime guarantee<br><br>
                Located in optimized facilities in India 🇮🇳 and Georgia 🇬🇪`;
        }

        // Risk
        if (lowerInput.includes('risk') || lowerInput.includes('safe') || lowerInput.includes('guarantee')) {
            return `⚠️ <strong>Important Disclosure:</strong><br><br>
                Mining profitability depends on:<br>
                • Bitcoin price volatility<br>
                • Network difficulty changes<br>
                • Electricity costs<br><br>
                <strong>You may lose your investment.</strong> Only invest what you can afford to lose.
                See our <a href="terms.html">Terms of Service</a> for full risk disclosure.`;
        }

        // Trading signals
        if (lowerInput.includes('signal') || lowerInput.includes('trading') || lowerInput.includes('free')) {
            return `📊 <strong>FREE Trading Signals:</strong><br><br>
                Every package includes premium trading signals:<br>
                • Daily market analysis<br>
                • Buy/sell recommendations<br>
                • VIP insider insights<br>
                • $199/month value - FREE for you!<br><br>
                Maximize your crypto profits beyond just mining!`;
        }

        // Default response
        return `I'd be happy to help! Here are some topics I can assist with:<br><br>
            💰 Pricing plans<br>
            🔒 AML/KYC policy<br>
            🛠️ Custom setups<br>
            ⚙️ Hardware specs<br>
            📊 Trading signals<br>
            ⚠️ Risks & compliance<br>
            📧 Contact support<br><br>
            Or type your specific question!`;
    }
}

// Initialize chatbot when page loads
document.addEventListener('DOMContentLoaded', () => {
    new VoltMineChat();
});
