import { BaseSlide as t } from "./BaseSlide.js"; export class BranchingSlide extends t {
    constructor(t, e, i) { super(t, e), this.onComplete = i, this.currStep = 0 } mount() {
        this.container.innerHTML = `
            <div class="animate-in" style="position:absolute; inset:0; background: url('${this.data.bgImage || ""}') center center / cover no-repeat; display: flex; justify-content: flex-end; align-items: center; padding: 0 80px; box-sizing: border-box;">
                
                <div style="position:absolute; inset:0; background: linear-gradient(to left, rgba(0,0,0,0.8) 0%, transparent 60%); pointer-events:none; z-index:1;"></div>

                <div class="cinematic-glass-panel" style="position:relative; z-index:2; width: 35%; min-width: 480px; max-width: 550px; border-radius: 20px; padding: 40px; display: flex; flex-direction: column;">
                    
                    <h1 class="stage-title" style="color:var(--primary-main); margin-bottom:20px; text-align: left; font-size:2.5rem;">${this.data.title}</h1>
                    
                    <div class="cinematic-instruction" style="font-size:1.25rem; line-height:1.6; margin-bottom:30px; border-left: 4px solid var(--primary-accent); padding-left: 20px; font-style: italic;">
                        "${this.data.instructionText}"
                    </div>
                    
                    <h3 id="branch-q" style="margin-bottom:25px; font-size: 1.3rem;"></h3>
                    <div id="branch-opts" style="display:flex; flex-direction:column; gap:15px;"></div>
                    
                    <div id="branch-fb" class="cinematic-feedback" style="display:none; margin-top:25px; padding:20px; border-radius:12px; font-size:1.1rem; border-left: 4px solid;"></div>
                    
                    <button id="branch-nxt" class="sc-btn-primary" style="display:none; margin-top: 30px; width: 100%;">Continue</button>
                </div>
            </div>
        `, this.questionArea = document.getElementById("branch-q"), this.optionsArea = document.getElementById("branch-opts"), this.feedbackBox = document.getElementById("branch-fb"), this.nextBtn = document.getElementById("branch-nxt"), this.loadStep()
    } loadStep() { let t = this.data.steps[this.currStep]; this.questionArea.innerHTML = t.q, this.feedbackBox.style.display = "none", this.nextBtn.style.display = "none", this.optionsArea.innerHTML = "", this.optionsArea.style.display = "flex", t.options.forEach((t, e) => { let i = document.createElement("button"); i.className = "dec-btn cinematic-btn", i.style.cssText = "text-align:left;", i.innerHTML = t.label, i.onclick = () => this.handleChoice(t, i), this.optionsArea.appendChild(i) }) } handleChoice(t, e) { let i = this.optionsArea.querySelectorAll(".dec-btn"); i.forEach(t => { t.disabled = !0, t.style.opacity = "0.4" }), e.style.opacity = "1", e.style.borderColor = t.correct ? "#10b981" : "#ef4444", e.style.background = t.correct ? "rgba(16, 185, 129, 0.2)" : "rgba(239, 68, 68, 0.2)", this.feedbackBox.style.display = "block", this.feedbackBox.style.background = t.correct ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)", this.feedbackBox.style.borderColor = t.correct ? "#10b981" : "#ef4444", this.feedbackBox.innerHTML = t.fb, this.nextBtn.style.display = "block", this.nextBtn.onclick = () => { t.correct ? (this.currStep++, this.currStep < this.data.steps.length ? this.loadStep() : (this.nextBtn.style.display = "none", this.onComplete && this.onComplete())) : this.loadStep() } }
}