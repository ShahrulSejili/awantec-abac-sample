import { BaseSlide as e } from "./BaseSlide.js"; export class InboxSlide extends e {
    constructor(e, t, i) { super(e, t), this.onComplete = i, this.viewed = new Set } mount() {
        this.container.innerHTML = `
            <div class="full-stage-container animate-in">
                <div class="stage-header-group">
                    <h1 class="stage-title">${this.data.title}</h1>
                    <p class="stage-instructions">${this.data.instructionText}</p>
                </div>
                <div style="display:flex; width:95%; height: 80%; margin:0 auto; background:var(--bg-surface); border-radius:12px; box-shadow:0 25px 50px -12px rgba(0,0,0,0.5); border:1px solid var(--border-color); overflow:hidden; font-family: 'Segoe UI', system-ui, sans-serif;">
                    
                    <div style="width:380px; border-right:1px solid var(--border-color); display:flex; flex-direction:column; background:var(--bg-body);">
                        <div style="padding:20px; border-bottom:1px solid var(--border-color); background:var(--bg-container);">
                            <div style="font-weight:bold; font-size:1.2rem; color:var(--text-main); margin-bottom:15px;">Inbox</div>
                            <div style="background:var(--bg-body); border:1px solid var(--border-color); border-radius:20px; padding:8px 15px; color:var(--text-muted); font-size:0.9rem; display:flex; align-items:center;">🔍 Search current mailbox...</div>
                        </div>
                        <div style="overflow-y:auto; flex:1;" id="email-list">
                            ${this.data.emails.map((e, t) => `
                                <div class="email-item" data-id="${e.id}" style="padding:15px 20px; border-bottom:1px solid var(--border-color); cursor:pointer; display:flex; gap:15px; position:relative;">
                                    <div class="unread-dot" id="dot-${e.id}" style="width:10px; height:10px; background:var(--primary-main); border-radius:50%; position:absolute; left:8px; top:25px; display:${this.viewed.has(e.id) ? "none" : "block"};"></div>
                                    <div style="width:40px; height:40px; border-radius:50%; background:var(--btn-hover-bg); display:flex; align-items:center; justify-content:center; color:var(--primary-main); font-weight:bold; font-size:1.1rem; flex-shrink:0;">${e.sender.charAt(0)}</div>
                                    <div style="flex:1; overflow:hidden;">
                                        <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:4px;">
                                            <strong style="color:var(--text-main); font-size:1rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${e.sender}</strong>
                                            <span style="color:var(--text-muted); font-size:0.8rem;">10:${14 + t} AM</span>
                                        </div>
                                        <div style="color:var(--primary-main); font-size:0.9rem; font-weight:bold; margin-bottom:4px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${e.subject}</div>
                                        <div style="color:var(--text-muted); font-size:0.85rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${e.body}</div>
                                    </div>
                                    ${this.viewed.has(e.id) ? '<div style="position:absolute; right:15px; top:25px; color:#ef4444; font-size:1.2rem;">\uD83D\uDEA9</div>' : ""}
                                </div>
                            `).join("")}
                        </div>
                    </div>

                    <div id="reading-pane" style="flex:1; background:var(--bg-container); display:flex; flex-direction:column; align-items:center; justify-content:center; color:var(--text-muted);">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" style="opacity:0.2; margin-bottom:20px;"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                        <p style="font-size:1.2rem;">Select an item to read</p>
                    </div>
                </div>
            </div>
        `, this.pane = document.getElementById("reading-pane"); let e = this.abortController.signal; document.getElementById("email-list").addEventListener("click", e => { let t = e.target.closest(".email-item"); t && this.openEmail(t.dataset.id, t) }, { signal: e })
    } openEmail(e, t) {
        let i = this.data.emails.find(t => t.id === e); document.querySelectorAll(".email-item").forEach(e => e.style.background = "transparent"), t.style.background = "rgba(0, 180, 157, 0.05)"; let o = document.getElementById(`dot-${i.id}`); o && (o.style.display = "none"), this.pane.innerHTML = `
            <div style="width:100%; height:100%; display:flex; flex-direction:column;">
                <div style="padding:30px; border-bottom:1px solid var(--border-color);">
                    <h2 style="margin:0 0 20px 0; color:var(--text-main); font-size:1.8rem; font-weight:normal;">${i.subject}</h2>
                    <div style="display:flex; gap:15px; align-items:center;">
                        <div style="width:50px; height:50px; border-radius:50%; background:var(--btn-hover-bg); display:flex; align-items:center; justify-content:center; color:var(--primary-main); font-weight:bold; font-size:1.4rem;">${i.sender.charAt(0)}</div>
                        <div style="flex:1;">
                            <div style="color:var(--text-main); font-size:1.1rem;"><strong>${i.sender}</strong> &lt;${i.sender.toLowerCase().replace(" ", ".")}@external.com&gt;</div>
                            <div style="color:var(--text-muted); font-size:0.9rem; margin-top:2px;">To: You &lt;employee@theorganization.com&gt;</div>
                        </div>
                        <div style="display:flex; gap:10px; color:var(--text-muted);">
                            <button style="background:transparent; border:1px solid var(--border-color); color:var(--text-main); padding:8px 15px; border-radius:4px; cursor:default;">↩ Reply</button>
                            <button style="background:transparent; border:1px solid var(--border-color); color:var(--text-main); padding:8px 15px; border-radius:4px; cursor:default;">↪ Forward</button>
                        </div>
                    </div>
                </div>
                
                <div style="flex:1; padding:30px; overflow-y:auto; position:relative;">
                    <div id="flag-area" style="margin-bottom:30px;">
                        ${this.viewed.has(i.id) ? `<div class="animate-in" style="background:rgba(239, 68, 68, 0.1); border-left:4px solid #ef4444; padding:15px 20px; border-radius:0 8px 8px 0; color:#ef4444;">
                                <div style="display:flex; align-items:center; gap:10px; margin-bottom:8px;">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                                    <strong style="font-size:1.1rem;">${i.type} Detected</strong>
                                </div>
                                <div style="color:var(--text-main); line-height:1.5;">${i.feedback}</div>
                            </div>`: `<div id="btn-flag" style="background:#fefce8; border:1px solid #fde047; padding:12px 20px; border-radius:8px; color:#a16207; cursor:pointer; display:flex; align-items:center; gap:10px; transition:all 0.2s; font-weight:bold; box-shadow:0 4px 6px rgba(0,0,0,0.05);">
                                ⚠️ CAUTION: External Sender. Click to flag for Compliance Review.
                            </div>`}
                    </div>
                    <div style="color:var(--text-main); font-size:1.15rem; line-height:1.7;">
                        <p>Hi there,</p>
                        <p>${i.body}</p>
                        <p style="margin-top:40px; color:var(--text-muted);">Regards,<br>${i.sender}</p>
                    </div>
                </div>
            </div>
        `; let r = document.getElementById("btn-flag"); r && (r.onclick = () => { this.viewed.add(i.id), t.innerHTML.includes("\uD83D\uDEA9") || (t.innerHTML += `<div style="position:absolute; right:15px; top:25px; color:#ef4444; font-size:1.2rem;">🚩</div>`), this.viewed.size === this.data.emails.length && this.onComplete(), this.openEmail(e, t) })
    }
}