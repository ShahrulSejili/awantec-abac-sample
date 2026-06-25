import { BaseSlide as e } from "./BaseSlide.js"; export class FlowchartSlide extends e {
    constructor(e, t, i) { super(e, t), this.onComplete = i, this.shieldsActivated = 0 } mount() {
        this.container.innerHTML = `
            <div class="full-stage-container animate-in" style="height: 100%; display: flex; flex-direction: column;">
                <div class="stage-header-group">
                    <h1 class="stage-title">${this.data.title}</h1>
                    <p class="stage-instructions">${this.data.instructionText}</p>
                </div>
                
                <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; width: 100%;">
                    <div style="position:relative; width:800px; height:500px; display:flex; flex-direction:column; justify-content:space-between; align-items:center;">
                        
                        <div style="padding:15px; width:400px; text-align:center; background:var(--bg-container); border:2px solid var(--border-color); border-radius:12px; z-index:10; box-shadow:var(--shadow);">
                            <h3 style="color:var(--text-main); margin:0;">The Organization & Directors</h3>
                            <div id="liability-warning" style="display:none; margin-top:5px; color:#ef4444; font-weight:bold; font-size:0.9rem;">⚠️ RM1M Fine & 20 Yrs Prison</div>
                        </div>
                        
                        <div id="cascade-line" style="position:absolute; top:70px; bottom:70px; width:6px; background:var(--border-color); z-index:1; transition: background 0.5s;"></div>
                        
                        <div id="shields-container" style="position:absolute; top:100px; bottom:100px; width:100%; display:none; flex-direction:column; justify-content:space-evenly; align-items:center; z-index:20;">
                            ${this.data.shields.map((e, t) => {
            let i = t % 2 == 0; return `
                                    <div style="position:relative; width:100%; display:flex; justify-content:center;">
                                        <div class="shield-node" data-id="${e.id}" style="width:40px; height:40px; border-radius:50%; background:var(--bg-container); border:3px solid var(--border-color); color:var(--text-main); display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:1.2rem; cursor:pointer; z-index:25; transition:all 0.3s; position:relative;">${e.label}
                                            <div class="shield-popout" style="display:none; position:absolute; top:50%; transform:translateY(-50%); ${i ? "right:55px;" : "left:55px;"} width:600px; background:var(--bg-container); border:2px solid var(--primary-accent); padding:12px 20px; border-radius:8px; color:var(--text-main); box-shadow:0 10px 20px rgba(0,180,157,0.2); font-size:1rem; font-weight:normal; text-align:${i ? "right" : "left"};">
                                                <strong style="color:var(--primary-main); display:block; margin-bottom:4px;">${e.label}</strong> ${e.text}
                                            </div>
                                        </div>
                                    </div>
                                `}).join("")}
                        </div>

                        <button id="btn-bribe" style="padding:15px; width:400px; text-align:center; background:#ef4444; color:white; border:none; border-radius:12px; z-index:10; cursor:pointer; font-size:1.2rem; font-weight:bold; box-shadow:0 10px 20px rgba(239,68,68,0.3);">🚨 Give Bribe (Employee)</button>
                    </div>
                </div>
            </div>
        `, this.bribeBtn = document.getElementById("btn-bribe"), this.line = document.getElementById("cascade-line"), this.warning = document.getElementById("liability-warning"), this.shieldsContainer = document.getElementById("shields-container"); let e = this.abortController.signal; this.bribeBtn.addEventListener("click", () => this.triggerCascade(), { signal: e }), document.querySelectorAll(".shield-node").forEach(t => { t.addEventListener("click", e => this.handleShieldClick(e.currentTarget), { signal: e }) })
    } triggerCascade() { this.bribeBtn.disabled = !0, this.bribeBtn.style.background = "#991b1b", this.line.style.background = "#ef4444", this.warning.style.display = "block", setTimeout(() => { this.shieldsContainer.style.display = "flex", document.querySelectorAll(".shield-node").forEach((e, t) => { e.style.animationDelay = `${.15 * t}s`, e.classList.add("stagger-in") }) }, 800) } handleShieldClick(e) { if (e.classList.contains("activated")) return; e.classList.add("activated"), e.style.background = "var(--primary-accent)", e.style.color = "white", e.style.borderColor = "var(--primary-accent)", e.style.boxShadow = "0 0 15px rgba(0,180,157,0.5)"; let t = e.querySelector(".shield-popout"); t.style.display = "block", t.classList.add("animate-popout"), this.shieldsActivated++, this.shieldsActivated === this.data.shields.length && (this.line.style.background = "var(--primary-accent)", this.warning.style.color = "var(--primary-accent)", this.warning.innerHTML = "✅ Liability Blocked by Adequate Procedures", this.onComplete && this.onComplete()) }
}