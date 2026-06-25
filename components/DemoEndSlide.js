import { BaseSlide } from "./BaseSlide.js";

export class DemoEndSlide extends BaseSlide {
    constructor(container, data, onComplete) {
        super(container, data);
        this.onComplete = onComplete;
    }

    mount() {
        this.container.innerHTML = `
            <div class="demo-end-container animate-in">
                <div class="demo-end-card">
                    <div class="demo-end-icon">🚀</div>
                    <h1 class="demo-end-title">Demo Version Complete</h1>
                    <p class="demo-end-text">
                        You have reached the end of the sample module. 
                        We hope you found this preview of the <strong>Anti-Bribery and Anti-Corruption (ABAC) Essentials</strong> course insightful.
                    </p>
                    <div class="demo-contact-box">
                        <p>For the full demo and inquiries, please contact:</p>
                        <a href="mailto:digital.learning@awantec.my" class="demo-email">digital.learning@awantec.my</a>
                    </div>
                    <div class="demo-footer">
                        Awantec Digital Learning Solutions
                    </div>
                </div>
            </div>
        `;

        // Add specific styles for this slide if not in main CSS
        if (!document.getElementById('demo-end-styles')) {
            const style = document.createElement('style');
            style.id = 'demo-end-styles';
            style.textContent = `
                .demo-end-container {
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
                    padding: 20px;
                }
                .demo-end-card {
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 30px;
                    padding: 60px;
                    max-width: 700px;
                    width: 100%;
                    text-align: center;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                }
                .demo-end-icon {
                    font-size: 5rem;
                    margin-bottom: 30px;
                }
                .demo-end-title {
                    font-size: 2.5rem;
                    color: white;
                    margin-bottom: 20px;
                    font-weight: 800;
                }
                .demo-end-text {
                    font-size: 1.2rem;
                    color: #94a3b8;
                    line-height: 1.6;
                    margin-bottom: 40px;
                }
                .demo-contact-box {
                    background: rgba(0, 165, 229, 0.1);
                    border: 1px solid rgba(0, 165, 229, 0.3);
                    border-radius: 20px;
                    padding: 30px;
                    margin-bottom: 30px;
                }
                .demo-contact-box p {
                    color: #cbd5e1;
                    margin-bottom: 10px;
                    font-size: 1rem;
                }
                .demo-email {
                    color: #00A5E5;
                    font-size: 1.5rem;
                    font-weight: bold;
                    text-decoration: none;
                    transition: color 0.3s ease;
                }
                .demo-email:hover {
                    color: #38bdf8;
                }
                .demo-footer {
                    font-size: 0.9rem;
                    color: #64748b;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                }
            `;
            document.head.appendChild(style);
        }

        if (this.onComplete) this.onComplete();
    }
}
