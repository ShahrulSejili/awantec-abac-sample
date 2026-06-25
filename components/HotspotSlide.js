import { BaseSlide as e } from "./BaseSlide.js"; export class HotspotSlide extends e {
    constructor(e, t, r) { super(e, t), this.onComplete = r, this.clickedMarkers = new Set } mount() {
        this.container.innerHTML = `
            <div class="full-stage-container animate-in" style="padding: 20px 40px;">
                <div class="stage-header-group" style="margin-bottom: 20px;">
                    <h1 class="stage-title">${this.data.title}</h1>
                    <p class="stage-instructions">${this.data.instructionText}</p>
                </div>
                <div style="display:flex; width:100%; max-width: 1550px; margin:0 auto; background:var(--bg-container); border-radius:20px; border:1px solid var(--border-color); box-shadow:var(--shadow); overflow:hidden; min-height: 650px;">
                    
                    <div style="flex: 7; position:relative; background: url('assets/images/Bribery.webp') center center / cover no-repeat; overflow:hidden; box-shadow: inset -10px 0 20px rgba(0,0,0,0.3);">
                        <div style="position:absolute; inset:0; background: linear-gradient(to right, transparent 60%, rgba(15, 23, 42, 0.4) 100%); pointer-events:none;"></div>
    
                        ${this.data.markers.map(e => `
                            <div class="scene-marker" data-id="${e.id}" style="position:absolute; top:${e.top}; left:${e.left}; width:35px; height:35px; background:var(--primary-main); border-radius:50%; cursor:pointer; box-shadow:0 0 15px var(--primary-main); display:flex; align-items:center; justify-content:center; color:white; font-weight:bold; font-size:1.2rem;">+</div>
                        `).join("")}
                    </div>

                    <div style="flex: 3; padding:50px; display:flex; align-items:center; border-left:1px solid var(--border-color);">
                        <div id="hotspot-info" style="font-size: 1.25rem; color:var(--text-main); line-height:1.6;">
                            ${this.data.defaultPanel}
                        </div>
                    </div>

                </div>
            </div>
        `, this.infoPanel = document.getElementById("hotspot-info"); let e = this.abortController.signal; document.querySelectorAll(".scene-marker").forEach(t => { t.addEventListener("click", e => this.handleMarkerClick(e.currentTarget), { signal: e }) })
    } handleMarkerClick(e) {
        let t = this.data.markers.find(t => t.id === e.dataset.id); document.querySelectorAll(".scene-marker").forEach(e => { let t = e.dataset.id; this.clickedMarkers.has(t) ? (e.style.background = "rgba(0,0,0,0.5)", e.style.border = "2px solid var(--primary-main)", e.style.color = "var(--primary-main)", e.style.boxShadow = "none", e.innerHTML = "✓") : (e.style.background = "var(--primary-main)", e.style.border = "none", e.style.color = "white", e.style.boxShadow = "0 0 15px var(--primary-main)", e.innerHTML = "+") }), e.style.background = "var(--primary-accent)", e.style.border = "none", e.style.color = "white", e.style.boxShadow = "0 0 20px var(--primary-accent)", e.innerHTML = "✓", this.infoPanel.innerHTML = `
            <div class="animate-in">
                <strong style="color:var(--primary-main); font-size:1.6rem; display:block; margin-bottom:15px;">${t.label}</strong>
                <p style="font-size:1.2rem;">${t.text}</p>
            </div>
        `, this.clickedMarkers.add(t.id), this.clickedMarkers.size === this.data.markers.length && this.onComplete && this.onComplete()
    }
}