import { BaseSlide as t } from "./BaseSlide.js"; export class ExitHubSlide extends t {
    constructor(t, e, i) { super(t, e), this.onComplete = i } mount() {
        this.container.innerHTML = `
            <div class="full-stage-container animate-in" style="height: 100%; display: flex; flex-direction: column;">
                <div class="stage-header-group">
                    <h1 class="stage-title">${this.data.title}</h1>
                    <p class="stage-instructions">${this.data.instructionText}</p>
                </div>
                
                <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; width: 100%;">
                    <div style="max-width:950px; width:100%; background:var(--bg-container); border-radius:20px; box-shadow:var(--shadow); border:1px solid var(--border-color); overflow:hidden; display:flex;">
                        <div style="flex:1; padding:50px; border-right:1px solid var(--border-color);">
                            <h2 style="color:var(--primary-accent); margin-bottom:30px;">Internal Whistleblowing</h2>
                            <p style="line-height:2; font-size:1.1rem; color:var(--text-main);">${this.data.internal}</p>
                        </div>
                        <div style="flex:1; padding:50px;">
                            <h2 style="color:#ef4444; margin-bottom:30px;">Direct to MACC</h2>
                            <p style="line-height:2; font-size:1.1rem; color:var(--text-main);">${this.data.external}</p>
                        </div>
                    </div>
                </div>
            </div>
        `, this.onComplete && this.onComplete()
    }
}