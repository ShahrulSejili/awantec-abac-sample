import { BaseSlide as e } from "./BaseSlide.js"; export class QuizEngineSlide extends e {
    constructor(e, t, i, s) { super(e, t), this.onComplete = i, this.quizState = s, this.currentSelection = null } mount() { if (!this.quizState.isReviewing && 0 === this.quizState.activeQuestions.length) { let e = [...this.data.bank].sort(() => .5 - Math.random()); this.quizState.activeQuestions = e.slice(0, 5), this.quizState.currentQIndex = 0, this.quizState.score = 0 } this.renderQuestion() } renderQuestion() {
        let e = this.quizState.activeQuestions[this.quizState.currentQIndex], t = this.quizState.isReviewing; this.currentSelection = t ? e.userPick : null, this.container.innerHTML = `
            <div class="mcq-screen-wrapper animate-in">
                <div class="mcq-glass-card" style="width: 70%;">
                    <div class="mcq-card-content">
                        <div class="mcq-header">
                            <span class="mcq-badge">${t ? "REVIEW MODE" : "ASSESSMENT"} - Q${this.quizState.currentQIndex + 1} of 5</span>
                            <h2 class="mcq-question">${e.q}</h2>
                        </div>
                        <div class="mcq-options" id="mcq-options">
                            ${e.options.map((i, s) => `
                                <button class="mcq-option-btn ${t && s === e.userPick ? "selected" : ""}" data-index="${s}">
                                    ${i}
                                </button>
                            `).join("")}
                        </div>
                        <div id="mcq-feedback" class="mcq-feedback-box ${t ? "" : "hidden"}"></div>
                        <div class="mcq-actions">
                            ${t ? "" : '<button id="mcq-submit-btn" class="mcq-btn-primary" disabled>Submit Answer</button>'}
                            <button id="quiz-continue" class="mcq-btn-primary" style="display:${t ? "block" : "none"}; margin-top:15px;">
                                ${t ? 4 === this.quizState.currentQIndex ? "Return to Results" : "Next Question" : "Continue"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `; let i = this.container.querySelectorAll(".mcq-option-btn"), s = this.container.querySelector("#mcq-submit-btn"), n = this.container.querySelector("#quiz-continue"), c = this.container.querySelector("#mcq-feedback"); t ? this.handleReviewUI(e, i, c, n) : this.handleAssessmentUI(e, i, s, c, n)
    } handleAssessmentUI(e, t, i, s, n) {
        t.forEach(e => { e.onclick = () => { t.forEach(e => e.classList.remove("selected")), e.classList.add("selected"), this.currentSelection = parseInt(e.dataset.index), i.disabled = !1 } }), i.onclick = () => {
            let c = parseInt(atob(e.correctIndex)), r = this.currentSelection === c; e.userPick = this.currentSelection, t.forEach(e => e.style.pointerEvents = "none"), i.style.display = "none", r && this.quizState.score++, s.innerHTML = `
                <div class="feedback-inner ${r ? "correct" : "incorrect-state"}">
                    <strong>${r ? "Correct!" : "Incorrect!"}</strong>
                    <p>${e.feedback}</p>
                </div>
            `, s.classList.remove("hidden"), t[c].classList.add("reveal-correct"), r || t[this.currentSelection].classList.add("reveal-incorrect"), n.style.display = "block"
        }, n.onclick = () => this.nextQuestion()
    } handleReviewUI(e, t, i, s) {
        t.forEach(e => e.style.pointerEvents = "none"); let n = parseInt(atob(e.correctIndex)), c = e.userPick === n; i.innerHTML = `
            <div class="feedback-inner ${c ? "correct" : "incorrect-state"}">
                <strong>${c ? "You answered correctly!" : "You answered incorrectly."}</strong>
                <p>${e.feedback}</p>
            </div>
        `, t[n].classList.add("reveal-correct"), c || null === e.userPick || t[e.userPick].classList.add("reveal-incorrect"), s.onclick = () => this.nextQuestion()
    } nextQuestion() { this.quizState.currentQIndex < 4 ? (this.quizState.currentQIndex++, this.renderQuestion()) : this.onComplete && this.onComplete() }
}