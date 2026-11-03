window.Modules={};
window.UI={
 today:'2026-10-31',
 esc:v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),
 num:n=>Number(n).toLocaleString('zh-CN',{maximumFractionDigits:2}),money:n=>'¥'+Number(n).toLocaleString('zh-CN',{minimumFractionDigits:2,maximumFractionDigits:2}),pct:n=>Number(n).toFixed(1)+'%',
 badge:(t,c='neutral')=>`<span class="badge ${['green','amber','red','blue','neutral'].includes(c)?c:'neutral'}">${UI.esc(t)}</span>`,
 stat:(l,v,d='',tone='')=>`<div class="stat ${UI.esc(tone)}"><div class="stat-label">${UI.esc(l)}</div><div class="stat-value">${UI.esc(v)}</div><div class="stat-detail">${UI.esc(d)}</div></div>`,
 table:(hs,rs)=>`<div class="table-wrap"><table><thead><tr>${hs.map(h=>`<th>${UI.esc(h)}</th>`).join('')}</tr></thead><tbody>${rs.length?rs.map(r=>`<tr>${r.map(v=>`<td>${v??''}</td>`).join('')}</tr>`).join(''):`<tr><td colspan="${hs.length}" class="empty">没有符合条件的数据</td></tr>`}</tbody></table></div>`,
 load:(k,f)=>{try{const s=localStorage.getItem('dahua-demo-v1-'+k);if(s)return JSON.parse(s)}catch(e){}return typeof f==='function'?f():JSON.parse(JSON.stringify(f))},
 save:(k,v)=>{try{localStorage.setItem('dahua-demo-v1-'+k,JSON.stringify(v))}catch(e){UI.toast('浏览器存储不可用，请导出保存当前数据')}},
 download:(filename,text,mime='text/plain;charset=utf-8')=>{const a=document.createElement('a'),u=URL.createObjectURL(new Blob([text],{type:mime}));a.href=u;a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),3000)},
 csv:(filename,rows)=>{if(!rows.length){UI.toast('当前没有可导出的数据');return}const keys=[...new Set(rows.flatMap(r=>Object.keys(r)))];const q=v=>'"'+String(v??'').replace(/^[=+@\-]/,"'$&").replace(/"/g,'""')+'"';UI.download(filename,'\ufeff'+[keys,...rows.map(r=>keys.map(k=>r[k]))].map(r=>r.map(q).join(',')).join('\r\n'),'text/csv;charset=utf-8');UI.toast('已导出 '+rows.length+' 条数据')},
 toast:t=>{const el=document.getElementById('toast');el.textContent=t;el.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>el.classList.remove('show'),3500)},
 modal:(t,h)=>{document.getElementById('dialog-title').textContent=t;document.getElementById('dialog-body').innerHTML=h;const d=document.getElementById('dialog');if(!d.open)d.showModal()},closeModal:()=>document.getElementById('dialog').close(),
 heading:(eyebrow,title,subtitle)=>`<div class="page-heading"><div><div class="eyebrow">${UI.esc(eyebrow)}</div><h1>${UI.esc(title)}</h1><p>${UI.esc(subtitle)}</p></div><div class="page-meta">演示基准日 · 2026.10.31</div></div>`
};document.getElementById('dialog-close').onclick=UI.closeModal;document.getElementById('dialog').addEventListener('click',e=>{if(e.target===e.currentTarget){const r=e.currentTarget.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)UI.closeModal()}});
