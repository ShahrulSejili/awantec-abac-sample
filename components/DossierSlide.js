import { BaseSlide as t } from "./BaseSlide.js"; export class DossierSlide extends t {
    constructor(t, e, i) { super(t, e), this.onComplete = i, this.clickedTabs = new Set } mount() {
        this.container.innerHTML = `
            <div class="full-stage-container animate-in" style="height: 100%; display: flex; flex-direction: column;">
                <div class="stage-header-group">
                    <h1 class="stage-title">${this.data.title}</h1>
                    <p class="stage-instructions">${this.data.instructionText}</p>
                </div>
                
                <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; width: 100%;">
                    
                    <div style="display:flex; width:1100px; height:550px; background: linear-gradient(135deg, var(--bg-container) 0%, var(--bg-body) 100%); border-radius:16px; position:relative; box-shadow:var(--shadow); border: 1px solid var(--border-color); overflow:hidden;">
                        
                        <div style="display:flex; flex-direction:column; gap:8px; z-index:2; justify-content:center; padding-left:30px; width: 350px;">
                            ${this.data.tabs.map((t, e) => `
                                <button class="dossier-tab" data-idx="${e}" style="padding:25px 35px; background:rgba(255,255,255,0.05); backdrop-filter:blur(10px); border:1px solid rgba(255,255,255,0.1); border-right:none; border-radius:12px 0 0 12px; cursor:pointer; text-align:right; font-weight:bold; color:var(--text-muted); font-size:1.1rem; display:flex; align-items:center; gap:15px; justify-content:flex-end; transition:all 0.3s; position:relative;">
                                    <div class="tab-indicator" style="position:absolute; right:0; top:10%; bottom:10%; width:4px; background:transparent; border-radius:4px;"></div>
                                    ${t.label} <span style="font-size:1.5rem;">${t.icon}</span>
                                </button>
                            `).join("")}
                        </div>
                        
                        <div id="dossier-content" style="flex:1; background:var(--bg-container); border-left:1px solid var(--border-color); z-index:3; display:flex; flex-direction:column; justify-content:flex-start; position:relative; overflow-y:auto; overflow-x:hidden; padding:50px; box-shadow: -10px 0 30px rgba(0,0,0,0.1);">
                            <h3 style="color:var(--text-muted); text-align:center; z-index:2; margin:auto 0;">Select a tab to view the legal statute.</h3>
                        </div>
                    </div>
                </div>
            </div>
        `, this.contentArea = document.getElementById("dossier-content"); let t = this.abortController.signal; document.querySelectorAll(".dossier-tab").forEach(e => { e.addEventListener("click", t => this.handleTabClick(t.currentTarget), { signal: t }) })
    } handleTabClick(t) {
        let e = t.dataset.idx, i = this.data.tabs[e]; document.querySelectorAll(".dossier-tab").forEach(t => { t.style.background = "rgba(255,255,255,0.05)", t.style.color = "var(--text-muted)", t.querySelector(".tab-indicator").style.background = "transparent" }), t.style.background = "var(--bg-container)", t.style.color = "var(--primary-main)", t.querySelector(".tab-indicator").style.background = "var(--primary-main)", this.contentArea.innerHTML = `
            <div style="position:absolute; right:-40px; bottom:-60px; font-size:250px; opacity:0.04; z-index:0; pointer-events:none; filter:grayscale(100%); transform:rotate(-15deg);">${i.icon}</div>
            
            <div style="z-index:2; position:relative; animation: popIn 0.4s ease; margin: auto 0;">
                <div style="display:flex; align-items:center; gap:20px; border-bottom:3px solid var(--primary-accent); padding-bottom:15px; margin-bottom:30px;">
                    <span style="font-size:3rem; filter:drop-shadow(0 4px 6px rgba(0,0,0,0.2));">${i.icon}</span>
                    <h2 style="color:var(--text-main); font-size: 2.2rem; margin:0;">${i.title}</h2>
                </div>
                <p style="font-size:1.4rem; color:var(--text-main); line-height:1.7;">${i.text}</p>
            </div>
        `, this.clickedTabs.add(i.id), this.clickedTabs.size === this.data.tabs.length && this.onComplete && this.onComplete()
    }
}