import { BaseSlide as e } from "./BaseSlide.js"; export class SwipeSlide extends e {
    constructor(e, t, i) { super(e, t), this.onComplete = i, this.currItemIndex = 0 } mount() {
        this.container.innerHTML = `
            <div class="full-stage-container animate-in" style="height: 100%; display: flex; flex-direction: column;">
                <div class="stage-header-group">
                    <h1 class="stage-title">${this.data.title}</h1>
                    <p class="stage-instructions">${this.data.instructionText}</p>
                </div>
                
                <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; width: 100%;">
                    <div style="max-width:700px; width:100%; text-align:center;">
                        <div id="val-card" style="background:var(--bg-container); padding:50px; border-radius:20px; box-shadow:var(--shadow); border:1px solid var(--border-color); margin-bottom:30px; min-height:200px; display:flex; align-items:center; justify-content:center; font-size:1.5rem; color:var(--text-main); transition: all 0.3s ease;">
                        </div>

                        <div id="val-actions" style="display:flex; gap:20px; justify-content:center;">
                            <button class="val-btn" data-ans="Approve" style="padding:15px 30px; background:#10b981; color:white; border:none; border-radius:10px; font-size:1.2rem; cursor:pointer;">✅ Approve</button>
                            <button class="val-btn" data-ans="Decline" style="padding:15px 30px; background:#ef4444; color:white; border:none; border-radius:10px; font-size:1.2rem; cursor:pointer;">❌ Decline</button>
                            <button class="val-btn" data-ans="Declare" style="padding:15px 30px; background:#f59e0b; color:white; border:none; border-radius:10px; font-size:1.2rem; cursor:pointer;">📝 Declare</button>
                        </div>

                        <div id="val-fb" style="display:none; margin-top:30px; padding:20px; background:var(--bg-container); border-radius:12px; font-size:1.2rem; border:2px solid;"></div>
                        
                        <button id="val-next" class="sc-btn-primary" style="display:none; margin:20px auto 0 auto;">Next Item</button>
                    </div>
                </div>
            </div>
        `, this.card = document.getElementById("val-card"), this.actions = document.getElementById("val-actions"), this.feedback = document.getElementById("val-fb"), this.nextBtn = document.getElementById("val-next"); let e = this.abortController.signal; document.querySelectorAll(".val-btn").forEach(t => { t.addEventListener("click", e => this.handleChoice(e.currentTarget.dataset.ans), { signal: e }) }), this.loadItem()
    } loadItem() { let e = this.data.items[this.currItemIndex]; this.card.innerHTML = `"${e.q}"`, this.actions.style.display = "flex", this.feedback.style.display = "none", this.nextBtn.style.display = "none" } handleChoice(e) {
        let t = this.data.items[this.currItemIndex], i = e === t.correct; this.actions.style.display = "none", this.feedback.style.display = "block", this.feedback.style.borderColor = i ? "#10b981" : "#ef4444", this.feedback.style.color = i ? "#10b981" : "#ef4444"; let n = i ? t.correctFeedback : t.incorrectFeedback; this.feedback.innerHTML = `
            <strong>${i ? "Correct!" : "Incorrect."}</strong>
            <br>
            <span style="color:var(--text-main); font-size:1rem; display:block; margin-top:10px;">${n}</span>
        `, this.nextBtn.style.display = "block", this.nextBtn.innerHTML = i ? this.currItemIndex === this.data.items.length - 1 ? "Finish" : "Next Item" : "Try Again", this.nextBtn.onclick = () => {
                i ? (this.currItemIndex++, this.currItemIndex < this.data.items.length ? this.loadItem() : (this.card.style.background = "transparent", this.card.style.border = "none", this.card.style.boxShadow = "none", this.card.innerHTML = `
                        <div style="animation: popIn 0.5s ease;">
                            <div style="font-size: 5rem; margin-bottom: 20px;">✅</div>
                            <h2 style="color: var(--primary-main); font-size: 2.5rem; margin-bottom: 15px;">Validator Complete!</h2>
                            <p style="color: var(--text-muted); font-size: 1.2rem;">You have successfully evaluated all scenarios. You may now proceed.</p>
                        </div>
                    `, this.feedback.style.display = "none", this.nextBtn.style.display = "none", this.onComplete && this.onComplete())) : this.loadItem()
            }
    }
}