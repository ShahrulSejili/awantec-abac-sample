import { BaseSlide as e } from "./BaseSlide.js"; export class CaseFilesSlide extends e {
    constructor(e, t, i) { super(e, t), this.onComplete = i, this.openedFiles = new Set } mount() {
        this.container.innerHTML = `
            <div class="full-stage-container animate-in" style="height: 100%; display: flex; flex-direction: column;">
                <div class="stage-header-group">
                    <h1 class="stage-title">${this.data.title}</h1>
                    <p class="stage-instructions">${this.data.instructionText}</p>
                </div>
                
                <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; width: 100%;">
                    <div style="display:flex; justify-content:center; gap:40px;">
                        ${this.data.files.map((e, t) => `
                            <div class="case-file" data-idx="${t}" style="width:450px; height:400px; background:#fde68a; border-radius:5px 20px 5px 5px; position:relative; cursor:pointer; transition:transform 0.3s; box-shadow:0 15px 30px rgba(0,0,0,0.1); padding:30px; display:flex; flex-direction:column;">
                                <div style="position:absolute; top:-15px; left:0; width:100px; height:15px; background:#fcd34d; border-radius:5px 5px 0 0;"></div>
                                <h2 style="color:#92400e; border-bottom:2px solid #d97706; padding-bottom:10px;">Case File ${t + 1}</h2>
                                <h3 style="color:#b45309; margin-top:10px;">${e.title}</h3>
                                <div class="case-content" style="display:none; margin-top:20px; font-size:1.1rem; color:#78350f; flex:1;">
                                    <p style="margin-bottom:20px;">${e.text}</p>
                                    <strong style="color:#991b1b; background:#fee2e2; padding:10px; border-radius:5px; display:block;">Result: ${e.result}</strong>
                                </div>
                                <div class="case-hint" style="margin-top:auto; font-weight:bold; color:#d97706; text-align:center;">Click to Open</div>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </div>
        `; let e = this.abortController.signal; document.querySelectorAll(".case-file").forEach(t => { t.addEventListener("click", e => this.handleFileClick(e.currentTarget), { signal: e }) })
    } handleFileClick(e) { let t = e.querySelector(".case-content"), i = e.querySelector(".case-hint"); "none" === t.style.display && (t.style.display = "block", i.style.display = "none", e.style.background = "#fef3c7", this.openedFiles.add(e.dataset.idx), this.openedFiles.size === this.data.files.length && this.onComplete && this.onComplete()) }
}