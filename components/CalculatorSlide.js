import { BaseSlide as e } from "./BaseSlide.js"; export class CalculatorSlide extends e {
    constructor(e, t, i) { super(e, t), this.onComplete = i, this.clickedWeights = new Set, this.activeIntervals = [] } mount() {
        this.container.innerHTML = `
            <div class="full-stage-container animate-in" style="height: 100%; display: flex; flex-direction: column;">
                <div class="stage-header-group">
                    <h1 class="stage-title">${this.data.title}</h1>
                    <p class="stage-instructions">${this.data.instructionText}</p>
                </div>
                
                <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; width: 100%;">
                    <div style="width: 1100px; background: #1e293b; border-radius: 24px; padding: 40px; box-shadow: 0 25px 60px rgba(0,0,0,0.4); border:2px solid #334155; display:flex; flex-direction:column;">
                        
                        <div id="calc-screen" style="background: #0f172a; border-radius: 12px; margin-bottom: 30px; padding: 20px; border:inset 4px #020617; display:flex; flex-direction: row; gap:15px; min-height:180px; overflow-x:auto;">
                            <div id="calc-idle" style="width:100%; display:flex; align-items:center; justify-content:center; color:#64748b; font-family:monospace; font-size:1.5rem; letter-spacing:2px;">WAITING FOR INPUT...</div>
                        </div>
                        
                        <div style="display:flex; gap:30px;">
                            <div style="flex:2; display:grid; gap: 15px;">
                                ${this.data.weights.map((e, t) => `
                                    <button class="weight-btn" data-idx="${t}" style="padding:20px; background:#334155; border:none; color:white; border-radius:12px; cursor:pointer; font-weight:bold; font-size:1.1rem; text-align:left; box-shadow:0 6px 0 #0f172a; transition:all 0.1s;">
                                        ${e.label}
                                    </button>`).join("")}
                            </div>
                            <div style="flex:1; display:grid; grid-template-columns:repeat(3, 1fr); gap:10px;">
                                ${["AC", "DEL", "%", "sin", "cos", "tan", "7", "8", "9", "4", "5", "6", "1", "2", "3", "0", ".", "="].map(e => `
                                    <div style="background:#475569; border-radius:8px; display:flex; align-items:center; justify-content:center; color:#94a3b8; font-weight:bold; box-shadow:0 4px 0 #1e293b; font-size:0.9rem; user-select:none;">
                                        ${e}
                                    </div>`).join("")}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `, this.screen = document.getElementById("calc-screen"); let e = this.abortController.signal; document.querySelectorAll(".weight-btn").forEach(t => { t.addEventListener("mousedown", () => { t.style.transform = "translateY(4px)", t.style.boxShadow = "0 2px 0 #0f172a" }, { signal: e }), t.addEventListener("mouseup", () => { t.style.transform = "none", t.style.boxShadow = "0 6px 0 #0f172a" }, { signal: e }), t.addEventListener("mouseleave", () => { t.style.transform = "none", t.style.boxShadow = "0 6px 0 #0f172a" }, { signal: e }), t.addEventListener("click", e => this.handleWeightClick(e.currentTarget), { signal: e }) })
    } handleWeightClick(e) {
        let t = this.data.weights[e.dataset.idx], i = `calc-box-${e.dataset.idx}`; if ("true" === e.dataset.clicked) { e.dataset.clicked = "false", e.style.background = "#334155", e.style.color = "white"; let s = document.getElementById(i); s && s.remove(), this.clickedWeights.delete(t.id), 0 === this.clickedWeights.size && (this.screen.innerHTML = '<div id="calc-idle" style="width:100%; display:flex; align-items:center; justify-content:center; color:#64748b; font-family:monospace; font-size:1.5rem; letter-spacing:2px;">WAITING FOR INPUT...</div>'); return } e.dataset.clicked = "true", e.style.background = "#0f172a", e.style.color = "#00A5E5"; let a = document.getElementById("calc-idle"); a && a.remove(); let l = `calc-out-${e.dataset.idx}`; this.screen.insertAdjacentHTML("beforeend", `
            <div id="${i}" class="animate-in" style="flex:1; background:rgba(239,68,68,0.1); border:1px solid #ef4444; border-radius:8px; padding:15px; color:#ef4444; font-family:monospace; font-size:1.05rem; line-height:1.5; display:flex; flex-direction:column; justify-content:center; min-width: 200px;">
                <span style="color:#fca5a5; font-size:0.85rem; margin-bottom:8px; display:block; border-bottom:1px solid rgba(239,68,68,0.3); padding-bottom:5px;">${t.label}</span>
                <span id="${l}"></span>
            </div>
        `); let n = 0, d = t.penalty, o = document.getElementById(l), r = setInterval(() => { if (!document.getElementById(l)) { clearInterval(r); return } o.innerHTML += d.charAt(n), ++n >= d.length && clearInterval(r) }, 10); this.activeIntervals.push(r), this.clickedWeights.add(t.id), this.clickedWeights.size === this.data.weights.length && this.onComplete && this.onComplete()
    } unmount() { this.activeIntervals.forEach(clearInterval), super.unmount() }
}