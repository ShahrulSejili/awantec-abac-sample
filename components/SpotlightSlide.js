import { BaseSlide as t } from "./BaseSlide.js"; export class SpotlightSlide extends t {
    constructor(t, e, i) { super(t, e), this.onComplete = i, this.foundItems = new Set } mount() {
        this.container.innerHTML = `
            <div style="position:relative; width:100%; height:100%; background:#0f172a; overflow:hidden; cursor:crosshair; touch-action:none;" id="spotlight-area" class="animate-in">
                
                <div style="position:absolute; inset:0; background-image: linear-gradient(rgba(0, 180, 157, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 180, 157, 0.08) 1px, transparent 1px); background-size: 60px 60px; z-index:1;"></div>
                <div style="position:absolute; inset:0; background: radial-gradient(circle at center, transparent 0%, #0f172a 80%); z-index:2;"></div>

                <div style="position:absolute; top:40px; left:40px; color:white; z-index:20; pointer-events:none;">
                    <h2 class="stage-title" style="color:white; margin-bottom:10px;">${this.data.title}</h2>
                    <p class="stage-instructions" style="color:#cbd5e1;">${this.data.instructionText}</p>
                </div>
                
                <div id="tracker-hud" style="position:absolute; top:40px; right:40px; background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.3); color:white; padding:15px 25px; border-radius:50px; font-weight:bold; font-size:1.2rem; z-index:20; transition: all 0.3s ease;">
                    Folders Found: 0 / ${this.data.hiddenItems.length}
                </div>
                
                ${this.data.hiddenItems.map(t => `
                    <div class="hidden-item" data-id="${t.id}" style="position:absolute; top:${t.top}; left:${t.left}; color:white; font-size:2.5rem; cursor:pointer; z-index:5;">📁
                        <div class="hidden-tooltip" style="display:none; position:absolute; top:50px; left:0; width:280px; background:var(--bg-container); padding:15px; border-radius:8px; font-size:1rem; border:1px solid var(--border-color); z-index:25; box-shadow:0 10px 25px rgba(0,0,0,0.5);">
                            <strong style="color:var(--primary-main);">${t.label}</strong><p style="margin-top:5px; color:var(--text-main); font-size: 0.95rem;">${t.text}</p>
                        </div>
                    </div>
                `).join("")}

                <div id="light-mask" style="position:absolute; inset:0; background: radial-gradient(circle 200px at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 20%, rgba(15,23,42,0.85) 60%, rgba(15,23,42,0.98) 100%); pointer-events:none; z-index:10; transition: background 0.1s ease-out;"></div>
            </div>
        `, this.area = document.getElementById("spotlight-area"), this.mask = document.getElementById("light-mask"), this.tracker = document.getElementById("tracker-hud"); let t = this.abortController.signal; this.area.addEventListener("mousemove", t => this.moveLight(t.clientX, t.clientY), { signal: t }), this.area.addEventListener("touchmove", t => { t.preventDefault(), this.moveLight(t.touches[0].clientX, t.touches[0].clientY) }, { passive: !1, signal: t }), document.querySelectorAll(".hidden-item").forEach(e => { e.addEventListener("click", t => this.handleItemClick(t.currentTarget), { signal: t }) })
    } moveLight(t, e) { let i = this.area.getBoundingClientRect(), a = i.width / this.area.offsetWidth, r = (t - i.left) / a, s = (e - i.top) / a; this.mask.style.background = `radial-gradient(circle 200px at ${r}px ${s}px, rgba(255,255,255,0.15) 0%, transparent 30%, rgba(15,23,42,0.85) 70%, rgba(15,23,42,0.98) 100%)` } handleItemClick(t) { let e = t.querySelector(".hidden-tooltip"); "none" === e.style.display && (e.style.display = "block", t.innerHTML = t.innerHTML.replace("\uD83D\uDCC1", "✅"), t.style.zIndex = "15", this.foundItems.add(t.dataset.id), this.tracker.innerHTML = `Folders Found: ${this.foundItems.size} / ${this.data.hiddenItems.length}`, this.foundItems.size === this.data.hiddenItems.length && (this.tracker.style.background = "rgba(16,185,129,0.2)", this.tracker.style.borderColor = "#10b981", this.tracker.style.color = "#10b981", this.onComplete && this.onComplete())) }
}