import { BaseSlide as e } from "./BaseSlide.js";

export class DecisionTreeSlide extends e {
    constructor(e, t, i) {
        super(e, t);
        this.onComplete = i;
    }

    mount() {
        // FIX 1: Safely handle both 'options' (old data) and 'choices' (new data)
        let opts = this.data.options || this.data.choices || [];

        this.container.innerHTML = `
            <div class="animate-in" style="position:absolute; inset:0; background: url('${this.data.bgImage || ""}') center center / cover no-repeat; display: flex; justify-content: flex-end; align-items: center; padding: 0 80px; box-sizing: border-box;">
                
                <div style="position:absolute; inset:0; background: linear-gradient(to left, rgba(0,0,0,0.8) 0%, transparent 60%); pointer-events:none; z-index:1;"></div>

                <div class="cinematic-glass-panel" style="position:relative; z-index:2; width: 35%; min-width: 480px; max-width: 550px; border-radius: 20px; padding: 40px; display: flex; flex-direction: column;">
                    
                    <h1 class="stage-title" style="color:var(--primary-main); margin-bottom:20px; text-align: left; font-size:2.5rem;">${this.data.title}</h1>
                    
                    <div class="cinematic-instruction" style="font-size:1.25rem; line-height:1.6; margin-bottom:15px; border-left: 4px solid var(--primary-accent); padding-left: 20px; font-style: italic;">
                        "${this.data.instructionText}"
                    </div>
                    
                    ${this.data.scenarioText ? `<div style="font-size:1.15rem; color:var(--text-main); margin-bottom:25px; line-height:1.5;">${this.data.scenarioText}</div>` : ''}
                    
                    <div id="dec-opts" style="display:flex; flex-direction:column; gap:15px;">
                        ${opts.map((e, t) => `
                            <button class="dec-btn cinematic-btn" data-idx="${t}">
                                ${e.label || e.text}
                            </button>
                        `).join("")}
                    </div>
                    
                    <div id="dec-feedback" class="cinematic-feedback" style="display:none; margin-top:25px; padding:20px; border-radius:12px; font-size:1.1rem; border-left: 4px solid;"></div>
                </div>
            </div>
        `;

        this.feedbackBox = document.getElementById("dec-feedback");
        let e = this.abortController.signal;
        document.querySelectorAll(".dec-btn").forEach(t => {
            t.addEventListener("click", e => this.handleChoice(e.currentTarget), { signal: e })
        });
    }

    handleChoice(e) {
        let t = e.dataset.idx;
        let opts = this.data.options || this.data.choices || [];
        let i = opts[t];
        let a = !0 === i.isCorrect;
        let o = document.querySelectorAll(".dec-btn");

        o.forEach(e => { e.disabled = !0, e.style.opacity = "0.4" });

        e.style.opacity = "1";
        e.style.borderColor = a ? "#10b981" : "#ef4444";
        e.style.background = a ? "rgba(16, 185, 129, 0.2)" : "rgba(239, 68, 68, 0.2)";

        this.feedbackBox.style.display = "block";
        this.feedbackBox.style.background = a ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)";
        this.feedbackBox.style.borderColor = a ? "#10b981" : "#ef4444";
        this.feedbackBox.innerHTML = i.feedback;

        a ? (this.onComplete && this.onComplete()) : setTimeout(() => {
            this.abortController.signal.aborted || (o.forEach(e => {
                e.disabled = !1, e.style.opacity = "1", e.style.background = "", e.style.borderColor = ""
            }), this.feedbackBox.style.display = "none")
        }, 4e3);
    }
}