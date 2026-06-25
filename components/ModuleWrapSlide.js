import { BaseSlide as t } from "./BaseSlide.js"; export class ModuleWrapSlide extends t {
    constructor(t, e, i, a) { super(t, e), this.onComplete = i, this.onFastTrack = a } mount() {
        this.container.innerHTML = `
            <div class="module-wrap-wrapper animate-in" style="width:100%; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; background:var(--mcq-gradient); padding: 40px;">
                <div class="success-icon-badge" style="width:80px; height:80px; background:var(--primary-accent); color:white; font-size:3rem; display:flex; align-items:center; justify-content:center; border-radius:50%; margin-bottom:20px; box-shadow:0 10px 20px rgba(0,180,157,0.3);">✓</div>
                <div class="stage-header-group" style="text-align:center;">
                    <h2 class="stage-title" style="font-size:2.5rem; margin-bottom: 20px;">${this.data.title}</h2>
                </div>
                <div class="wrap-grid" style="display:flex; gap:30px; width:100%; max-width:1000px;">
                    <div class="takeaway-card" style="flex:1.5; background:var(--bg-container); padding:30px; border-radius:20px; box-shadow:var(--shadow); border:1px solid var(--border-color);">
                        <h3 style="color:var(--primary-accent); margin-bottom:20px; font-size:1.3rem;">Key Takeaways</h3>
                        <ul style="padding-left:20px;">
                            ${this.data.takeaways.map(t => `<li style="margin-bottom:12px; color:var(--text-muted); line-height:1.5; font-size:1.1rem;">${t}</li>`).join("")}
                        </ul>
                    </div>
                    ${this.data.nextModule ? `
                    <div id="next-module-card" class="next-preview-card" style="flex:1; background:#0f172a; color:white; padding:30px; border-radius:20px; position:relative; overflow:hidden; display:flex; flex-direction:column; justify-content:center; cursor:pointer; transition:all 0.3s ease;">
                        <div class="next-label" style="font-size:0.8rem; letter-spacing:2px; color:#00B49D; font-weight:800; margin-bottom:10px;">UP NEXT</div>
                        <h3 style="margin-bottom:15px; font-size:1.4rem;">${this.data.nextModule.title}</h3>
                        <p style="color:#94a3b8; font-size:0.95rem; line-height:1.6;">${this.data.nextModule.desc}</p>
                        <div class="next-arrow" style="position:absolute; bottom:20px; right:20px; font-size:2rem; color:#00B49D; opacity:0.5; transition:all 0.3s ease;">→</div>
                    </div>`: ""}
                </div>
                <p style="margin-top:40px; color:var(--primary-main); font-size:1.2rem; font-weight:bold;">Click the card to jump straight in, or 'Next' below to return to the Main Menu.</p>
            </div>
        `, this.onComplete && this.onComplete(); let t = document.getElementById("next-module-card"); t && this.onFastTrack && t.addEventListener("click", () => { this.onFastTrack(this.data.nextModule.targetId) })
    }
}