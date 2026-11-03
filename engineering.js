/* 四表归一：固定模拟数据，浏览器内字段映射、治理、去重及销项演示。 */
(() => {
  const SOURCES = ['通用销项', '分户查验', '承接查验', '预防看查'];
  const FIELDS = {
    '通用销项': {id:'问题编号',project:'项目名称',location:'位置',category:'专业',problem:'问题描述',owner:'责任单位',due:'整改期限',status:'状态',updated:'更新日期',evidence:'销项依据',verifier:'复验人'},
    '分户查验': {id:'查验单号',project:'楼盘',location:'房号',category:'检查专业',problem:'查验问题',owner:'整改单位',due:'完成时限',status:'整改进度',updated:'检查日期',evidence:'复验记录',verifier:'验收人'},
    '承接查验': {id:'缺陷编码',project:'工程项目',location:'部位',category:'系统类别',problem:'缺陷说明',owner:'施工单位',due:'计划关闭日',status:'处理状态',updated:'登记日期',evidence:'关闭凭证',verifier:'复核人'},
    '预防看查': {id:'风险单号',project:'项目',location:'检查点位',category:'问题类别',problem:'风险描述',owner:'责任方',due:'整改截止',status:'跟踪状态',updated:'巡查日期',evidence:'销项记录',verifier:'验证人'}
  };
  const LABELS = {id:'统一问题编号',project:'项目',location:'位置',category:'专业',problem:'问题描述',owner:'责任单位',due:'整改期限',status:'统一状态',updated:'来源更新日',evidence:'销项依据',verifier:'复验人'};
  const STATUS = {'未整改':'待整改','待处理':'待整改','未处理':'待整改','待整改':'待整改','施工中':'整改中','处理中':'整改中','整改中':'整改中','待验收':'待复验','待复核':'待复验','待复验':'待复验','完成':'已销项','已关闭':'已销项','已销项':'已销项'};
  const OPTIONS = ['待整改','整改中','待复验','已销项'];
  const clone = v => JSON.parse(JSON.stringify(v));
  let host, tab='ledger', sourceTab=SOURCES[0], filter={search:'',project:'全部项目',status:'全部状态',source:'全部来源'};
  function seed() {
    const row=(id,project,location,category,problem,owner,due,status,updated,evidence='',verifier='')=>({id,project,location,category,problem,owner,due,status,updated,evidence,verifier});
    const a='云境花园（模拟）', b='江湾雅苑（模拟）';
    const packs = [
      [row('Q-001',a,'1号楼/101/卫生间','防水','淋浴区地漏周边渗水','模拟防水一队','2026-10-25','施工中','2026-10-24'),row('Q-002',a,'1号楼/102/客厅','装修','西墙乳胶漆色差','模拟精装二队','2026-11-03','未整改','2026-10-28'),row('Q-003',a,'2号楼/201/厨房','给排水','水槽排水接头松动','模拟安装一队','2026-10-27','完成','2026-10-29','复验记录 EV-003：满水试验通过（模拟）','模拟工程师甲'),row('Q-004',b,'地下车库/B区','消防','喷淋末端标识缺失','模拟消防一队','2026-11-04','待验收','2026-10-29'),row('Q-005',b,'3号楼/303/阳台','门窗','窗框密封胶断点','','2026-10-30','未整改','2026-10-29')],
      [row('Q-001',a,'1号楼/101/卫生间','防水','淋浴区地漏周边渗水','模拟防水一队','2026-10-25','待复核','2026-10-30'),row('F-102',a,'1号楼/102/客厅','装修','西墙乳胶漆色差','模拟精装二队','2026-11-03','未处理','2026-10-30'),row('F-103',a,'1号楼/103/卧室','门窗','南窗执手无法锁闭','模拟门窗一队','2026-10-29','处理中','2026-10-28'),row('F-104',b,'3号楼/301/厨房','装修','墙砖空鼓','模拟精装三队','2026-11-05','未处理','2026-10-29'),row('F-105',b,'3号楼/302/卫生间','给排水','地漏排水不畅','模拟安装二队','2026-11-02','暂停处理中','2026-10-29')],
      [row('Q-004',b,'地下车库/B区','消防','喷淋末端标识缺失','模拟消防一队','2026-11-04','已关闭','2026-10-30','复验记录 EV-004：标识补全（模拟）','模拟工程师乙'),row('C-202',a,'2号楼/屋面','防水','女儿墙根部收口开裂','模拟防水一队','2026-10-28','待处理','2026-10-27'),row('C-203',a,'设备房/水泵房','机电','控制柜接地标识缺失','模拟机电一队','2026-11-02','处理中','2026-10-30'),row('C-204',b,'3号楼/电梯厅','装修','石材踢脚收口不平','模拟精装三队','2026-11-06','待处理','2026-10-30'),row('C-205',b,'配电间/1区','电气','电缆沟盖板破损','模拟电气一队','2026-11-03','已关闭','2026-10-30')],
      [row('C-202',a,'2号楼/屋面','防水','女儿墙根部收口开裂','模拟防水一队','2026-10-28','整改中','2026-10-29'),row('P-302',a,'1号楼/101/卫生间','装修','顶棚检修口边缘开裂','模拟精装二队','2026-11-03','待整改','2026-10-30'),row('P-303',a,'景观/主入口','景观','雨水口周边积水','模拟景观一队','2026-10-30','待复验','2026-10-30'),row('P-304',b,'3号楼/屋面','安全','临边护栏缺少紧固件','模拟总包二队','2026-10-28','待整改','2026-10-28'),row('P-305',b,'地下车库/A区','给排水','排水管保温破损','模拟安装二队','2026-11-07','整改中','2026-10-30')]
    ];
    const raw={}; SOURCES.forEach((s,i)=>raw[s]=packs[i].map(r=>Object.fromEntries(Object.keys(FIELDS[s]).map(k=>[FIELDS[s][k],r[k]]))));
    return {raw,records:[],quarantine:[],overrides:{},runCount:0,runAt:null};
  }
  let state=UI.load('engineering',seed);
  if(!state.raw || !state.overrides) state=seed();
  function save(){UI.save('engineering',state)}
  function validDate(value){return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value+'T00:00:00Z')) && new Date(value+'T00:00:00Z').toISOString().slice(0,10)===value}
  function normalize(){
    const groups=new Map(), quarantine=[];
    SOURCES.forEach(source=>state.raw[source].forEach((raw,index)=>{
      const r=Object.fromEntries(Object.entries(FIELDS[source]).map(([key,field])=>[key,String(raw[field]??'').trim()]));
      const errors=[];
      ['id','project','location','category','problem','owner'].forEach(k=>{if(!r[k]) errors.push(LABELS[k]+'缺失')});
      if(!validDate(r.due))errors.push('整改期限不是有效日期');
      if(!validDate(r.updated))errors.push('来源更新日不是有效日期');
      const mapped=STATUS[r.status]; if(!mapped)errors.push('状态“'+r.status+'”未映射');
      if(mapped==='已销项' && (!r.evidence||!r.verifier)) errors.push('已销项缺少销项依据或复验人');
      r.status=mapped||r.status;
      const sourceRef={source,row:index+2,index,original:clone(raw)};
      const key=r.project+'::'+r.id;
      if(errors.length){quarantine.push({...sourceRef,errors,id:r.id});return}
      const existing=groups.get(key);
      if(existing && (existing.location!==r.location || existing.category!==r.category || existing.problem!==r.problem)){
        quarantine.push({...sourceRef,errors:['相同项目与编号对应不同位置、专业或问题，请人工核对'],id:r.id}); return;
      }
      if(existing){
        const sources=[...existing.sources,sourceRef];
        if(r.updated>existing.updated) groups.set(key,{...r,key,sources});
        else existing.sources=sources;
      }else groups.set(key,{...r,key,sources:[sourceRef]});
    }));
    state.records=[...groups.values()].map(r=>({...r,...(state.overrides[r.key]||{}),sources:r.sources,key:r.key}));
    const potential=new Map();
    state.records.forEach(r=>{const signature=[r.project,r.location,r.category,r.problem].join('|'); const group=potential.get(signature)||[];group.push(r);potential.set(signature,group)});
    state.records.forEach(r=>r.possibleDuplicate=[]);
    [...potential.values()].filter(g=>g.length>1).forEach(g=>g.forEach(r=>r.possibleDuplicate=g.filter(other=>other.key!==r.key).map(other=>other.id)));
    state.quarantine=quarantine; state.runCount++;state.runAt=new Date().toLocaleString('zh-CN',{hour12:false});save();
  }
  if(!state.runCount)normalize();
  const esc=v=>UI.esc(v), tone=s=>s==='已销项'?'green':s==='待复验'?'blue':s==='整改中'?'amber':'neutral';
  const overdue=r=>r.status!=='已销项' && r.due<UI.today;
  const opts=(values,selected)=>values.map(v=>`<option value="${esc(v)}" ${v===selected?'selected':''}>${esc(v)}</option>`).join('');
  function visible(){return state.records.filter(r=>(filter.project==='全部项目'||r.project===filter.project)&&(filter.status==='全部状态'||(filter.status==='已逾期'?overdue(r):r.status===filter.status))&&(filter.source==='全部来源'||r.sources.some(s=>s.source===filter.source))&&(!filter.search||[r.id,r.project,r.location,r.problem,r.owner].join(' ').toLowerCase().includes(filter.search.toLowerCase())))}
  function render(container){
    if(container)host=container;if(!host)return;
    const rawN=SOURCES.reduce((n,s)=>n+state.raw[s].length,0), merged=state.records.reduce((n,r)=>n+r.sources.length-1,0),closed=state.records.filter(r=>r.status==='已销项').length;
    host.innerHTML=`${UI.heading?UI.heading('SCENARIO 06 / 表格第 6 行','让每一项问题，都有闭环。','四类查验台账统一字段、识别重复、追溯责任与销项证据。'):''}
      <div class="stats">${UI.stat('统一问题',state.records.length,`${rawN} 条来源记录 · 合并 ${merged} 条重复`)}${UI.stat('待治理记录',state.quarantine.length,'未进入业务指标分母',state.quarantine.length?'amber':'')}${UI.stat('逾期未销项',state.records.filter(overdue).length,'截至 2026.10.31','red')}${UI.stat('已销项比例',UI.pct(state.records.length?closed/state.records.length*100:0),`${closed} / ${state.records.length} 项 · 含复验依据`,'green')}</div>
      <div class="tabs" aria-label="工程管理视图">${[['ledger','统一问题台账'],['sources','四表与字段映射'],['quality','数据治理 '+state.quarantine.length],['rules','销项规则']].map(([v,t])=>`<button class="tab ${tab===v?'active':''}" data-etab="${v}">${t}</button>`).join('')}</div>
      ${tab==='ledger'?ledger():tab==='sources'?sources():tab==='quality'?quality():rules()}`;
    host.querySelectorAll('[data-etab]').forEach(b=>b.onclick=()=>{tab=b.dataset.etab;render()});
    if(tab==='ledger')bindLedger();
    if(tab==='sources')bindSources();
    if(tab==='quality')host.querySelectorAll('[data-fix]').forEach(b=>b.onclick=()=>fix(Number(b.dataset.fix)));
    host.querySelectorAll('[data-reconcile]').forEach(b=>b.onclick=()=>{normalize();render();UI.toast('已按统一口径重新归并；处理记录已保留')});
  }
  function ledger(){
    const projects=[...new Set(state.records.map(r=>r.project))];
    return `<div class="card"><div class="card-header"><div><h2 class="section-title">一个入口，追踪全程</h2><p class="muted small">编号一致才合并；不同编号的相似问题仅提示人工复核。销项操作在本浏览器保存。</p></div><button class="btn secondary" id="eng-export">导出台账 CSV</button></div>
      <div class="toolbar"><label class="field">搜索<input id="eng-search" type="search" placeholder="问题编号、位置、责任单位…" value="${esc(filter.search)}"></label><label class="field">项目<select id="eng-project">${opts(['全部项目',...projects],filter.project)}</select></label><label class="field">状态<select id="eng-status">${opts(['全部状态',...OPTIONS,'已逾期'],filter.status)}</select></label><label class="field">来源<select id="eng-source">${opts(['全部来源',...SOURCES],filter.source)}</select></label></div><div id="eng-table">${ledgerTable()}</div></div>
      <div class="grid-2" style="margin-top:20px"><div class="card"><h3>专业分布</h3>${distribution()}</div><div class="card"><h3>先处理这三类问题</h3><div class="stack"><div class="notice"><b>① ${state.quarantine.length} 条字段或销项依据不完整</b><p class="small">在「数据治理」中补齐信息，再加入统一台账。</p></div><div class="notice"><b>② ${state.records.filter(overdue).length} 项已逾期</b><p class="small">按「已逾期」筛选，定位责任单位与整改时限。</p></div><div class="notice"><b>③ ${state.records.filter(r=>r.possibleDuplicate.length).length} 项有相似记录</b><p class="small">Q-002 与 F-102 为模拟复核样例；同一房间的不同问题保留独立编号。</p></div></div></div></div>`;
  }
  function ledgerTable(){
    const rows=visible();
    return `<div class="muted small" style="margin:10px 0">当前显示 ${rows.length} 项 · 来源 ${SOURCES.reduce((n,s)=>n+state.raw[s].length,0)} 条 · 最近归并 ${esc(state.runAt)}</div>`+UI.table(['问题 / 项目','位置与问题','责任单位','期限 / 状态','来源 / 溯源','操作'],rows.map(r=>[
      `<b>${esc(r.id)}</b><div class="small muted">${esc(r.project)}</div>`,
      `<div>${esc(r.location)}</div><div class="small muted">${esc(r.problem)}</div>${r.possibleDuplicate.length?UI.badge('相似记录待复核','amber'):''}`,
      esc(r.owner),`${esc(r.due)} ${overdue(r)?UI.badge('逾期','red'):''}<div style="margin-top:5px">${UI.badge(r.status,tone(r.status))}</div>`,
      r.sources.map(s=>`<div class="small">${esc(s.source)} · 行 ${s.row}</div>`).join(''),
      `<button class="btn secondary" data-issue="${esc(r.key)}">查看 / 处理</button>`
    ]));
  }
  function distribution(){const entries=Object.entries(state.records.reduce((a,r)=>(a[r.category]=(a[r.category]||0)+1,a),{})).sort((a,b)=>b[1]-a[1]);return entries.map(([name,n])=>`<div style="margin:14px 0"><div class="row" style="justify-content:space-between"><span>${esc(name)}</span><b>${n}</b></div><div class="progress" style="margin-top:7px;height:7px;background:#edf1ef;border-radius:10px"><span style="display:block;background:#167c69;height:7px;border-radius:10px;width:${n/(state.records.length||1)*100}%"></span></div></div>`).join('')||'<p class="empty">尚无统一数据</p>'}
  function bindIssueButtons(){host.querySelectorAll('[data-issue]').forEach(b=>b.onclick=()=>detail(b.dataset.issue))}
  function bindLedger(){
    bindIssueButtons();
    document.getElementById('eng-search').oninput=e=>{filter.search=e.target.value;document.getElementById('eng-table').innerHTML=ledgerTable();bindIssueButtons()};
    ['project','status','source'].forEach(k=>document.getElementById('eng-'+k).onchange=e=>{filter[k]=e.target.value;render()});
    document.getElementById('eng-export').onclick=()=>UI.csv('查验销项_统一台账_模拟.csv',visible().map(r=>({'问题编号':r.id,'项目':r.project,'位置':r.location,'专业':r.category,'问题描述':r.problem,'责任单位':r.owner,'整改期限':r.due,'统一状态':r.status,'逾期':overdue(r)?'是':'否','来源':r.sources.map(s=>s.source+'第'+s.row+'行').join('；'),'销项依据':r.evidence,'复验人':r.verifier,'疑似重复编号':r.possibleDuplicate.join('；'),'数据属性':'模拟数据'})));
  }
  function sources(){
    const raw=state.raw[sourceTab],fields=Object.values(FIELDS[sourceTab]);
    return `<div class="card"><div class="card-header"><div><h2 class="section-title">四套表头，一个数据标准</h2><p class="muted small">原始模拟表保持各自字段名称。导入仅作用于此演示，不写回企业原表。</p></div><button class="btn primary" data-reconcile>重新映射与归并</button></div><div class="tabs">${SOURCES.map(s=>`<button class="tab ${sourceTab===s?'active':''}" data-source-tab="${s}">${s} · ${state.raw[s].length}</button>`).join('')}</div>
      <div class="notice small">${esc(sourceTab)} → 标准台账：保留原表名称、行号和原始字段快照。按「项目 + 问题编号」去重，取来源更新日期较新的业务状态；相同编号内容冲突进入治理队列。</div>
      <div style="margin-top:16px">${UI.table(['原表字段','统一字段','处理规则'],Object.entries(FIELDS[sourceTab]).map(([k,v])=>[esc(v),esc(LABELS[k]),k==='status'?'按已公布的状态字典转换':k==='id'?'与项目组成唯一键':k==='due'||k==='updated'?'校验 YYYY-MM-DD 真实日期':k==='evidence'||k==='verifier'?'已销项必须非空':'去除首尾空格；关键字段不能为空']))}</div></div>
      <div class="card" style="margin-top:20px"><div class="card-header"><div><h3>原始表快照 · ${esc(sourceTab)}</h3><p class="muted small">支持 UTF-8 JSON 数组，表头需与当前模板一致，最多 5,000 行；导入后自动校验。</p></div><div class="row"><button class="btn secondary" id="eng-source-download">下载来源 / 导入模板</button><button class="btn secondary" id="eng-source-import">导入同类 JSON</button><input type="file" accept=".json,application/json" id="eng-file" hidden></div></div>${UI.table(['源行号',...fields],raw.map((r,i)=>[String(i+2),...fields.map(f=>esc(r[f]))]))}</div>`;
  }
  function bindSources(){
    host.querySelectorAll('[data-source-tab]').forEach(b=>b.onclick=()=>{sourceTab=b.dataset.sourceTab;render()});
    document.getElementById('eng-source-download').onclick=()=>UI.download(sourceTab+'_模拟来源.json',JSON.stringify(state.raw[sourceTab],null,2),'application/json;charset=utf-8');
    const input=document.getElementById('eng-file');document.getElementById('eng-source-import').onclick=()=>input.click();
    input.onchange=async()=>{
      const file=input.files[0];if(!file)return;
      try{
        if(file.size>3*1024*1024)throw new Error('文件超过 3 MB，请拆分后导入');
        const data=JSON.parse((await file.text()).replace(/^\uFEFF/,''));
        if(!Array.isArray(data)||!data.length||data.length>5000)throw new Error('请输入包含 1–5,000 行对象的 JSON 数组');
        const fields=Object.values(FIELDS[sourceTab]);
        if(data.some(r=>!r||typeof r!=='object'||Array.isArray(r)||fields.some(f=>!(f in r))))throw new Error('表头不匹配，请先下载当前来源模板');
        if(data.some(r=>fields.some(f=>typeof r[f]==='object'&&r[f]!==null)))throw new Error('字段只能填写文字、数字或空值');
        state.raw[sourceTab]=data.map(r=>Object.fromEntries(fields.map(f=>[f,String(r[f]??'')])));normalize();render();UI.toast('已替换本演示的 '+sourceTab+' 来源；校验结果见数据治理');
      }catch(e){UI.toast('导入失败：'+e.message)}
    };
  }
  function quality(){
    const total=SOURCES.reduce((n,s)=>n+state.raw[s].length,0),merged=state.records.reduce((n,r)=>n+r.sources.length-1,0);
    return `<div class="card"><div class="card-header"><div><h2 class="section-title">先治理，再看指标</h2><p class="muted small">${total} 条输入 = ${state.records.length} 项统一问题 + ${merged} 条同编号归并 + ${state.quarantine.length} 条隔离记录。</p></div><button class="btn primary" data-reconcile>重新校验</button></div><div class="notice small">隔离记录不计入问题总量、逾期数或销项率。补齐字段不会自动判定问题已解决；销项仍需依据与复验人。</div>${UI.table(['来源 / 行号','问题编号','阻断原因','操作'],state.quarantine.map((q,i)=>[`${esc(q.source)} · 第 ${q.row} 行`,esc(q.id),q.errors.map(e=>`<div>${UI.badge(e,'red')}</div>`).join(''),`<button class="btn secondary" data-fix="${i}">核对与补齐</button>`]))}</div>
      <div class="card" style="margin-top:20px"><h3>疑似重复 · 保留独立记录</h3><p class="muted small">同项目、位置、专业与问题描述完全相同，但编号不同，提示人工复核。系统不会自动合并。</p>${UI.table(['问题编号','位置','可能重复的编号','当前处理'],state.records.filter(r=>r.possibleDuplicate.length).map(r=>[esc(r.id),esc(r.location),esc(r.possibleDuplicate.join('、')),UI.badge('保留，待人工确认','amber')]))}</div>`;
  }
  function rules(){return `<div class="grid-2"><div class="card"><h2 class="section-title">数据与归并口径</h2><ol class="stack"><li>编号以「项目 + 问题编号」组成唯一键，跨项目不合并。</li><li>同编号的位置、专业或描述冲突，冲突来源行隔离，避免错并。</li><li>同编号一致时保留全部来源，以最新来源更新日期确定初始业务状态；同日保留先读入记录。</li><li>不同编号即使描述相同，也仅标记疑似重复，不自动删除。</li><li>无责任单位、未知状态、非法日期，或已销项缺少依据、复验人，均先隔离。</li><li>看板指标只计算通过校验的统一记录；分母不含隔离记录。</li></ol></div><div class="card"><h2 class="section-title">闭环与责任口径</h2><ol class="stack"><li>「待整改 → 整改中 → 待复验 → 已销项」顺序推进，不允许跨级销项。</li><li>提交复验时需填写整改依据；复验通过时需填写复验人和销项依据。</li><li>待复验可退回整改中；已销项可复开，必须记录原因。</li><li>修改责任单位或截止日期需填写操作人和变更说明。</li><li>每次处理追加时间、操作人、状态与说明，不覆盖历史。</li><li>全部数据与人员均为模拟。此处文字依据用于演示，生产环境需接入附件存储和身份权限。</li></ol></div></div><div class="card" style="margin-top:20px"><h3>状态映射字典</h3>${UI.table(['原始状态','统一状态'],Object.entries(STATUS).map(([a,b])=>[esc(a),UI.badge(b,tone(b))]))}<div class="notice small">期限按日期比较：早于 2026-10-31 且未销项即逾期；当日到期不算逾期。本演示不自动发送通知、不写回外部系统。</div></div>`}
  function fix(index){
    const q=state.quarantine[index],map=FIELDS[q.source],raw=state.raw[q.source][q.index];
    UI.modal('补齐来源记录 · '+q.source+'第 '+q.row+' 行',`<p class="notice">${q.errors.map(esc).join('；')}</p><form id="eng-fix-form"><div class="grid-2">${Object.entries(map).map(([k,v])=>`<label class="field">${esc(v)}${k==='status'?`<select name="${k}">${opts([...new Set([String(raw[v]||''),...OPTIONS])],String(raw[v]||''))}</select>`:`<input name="${k}" value="${esc(raw[v])}" ${k==='due'||k==='updated'?'type="date"':''} ${['id','project','location','category','problem','owner','due','updated'].includes(k)?'required':''}>`}</label>`).join('')}</div><p class="small muted">仅修改本演示内的来源副本。保存后重新校验，不符合规则的记录仍会隔离。</p><button class="btn primary" type="submit">保存并重新校验</button></form>`);
    document.getElementById('eng-fix-form').onsubmit=e=>{e.preventDefault();const data=new FormData(e.currentTarget);Object.entries(map).forEach(([k,v])=>raw[v]=String(data.get(k)||'').trim());normalize();UI.closeModal();render();UI.toast('来源副本已保存并重新校验')};
  }
  function detail(key){
    const r=state.records.find(r=>r.key===key);if(!r)return;
    const histories=r.history||[];
    const next={'待整改':['待整改','整改中'],'整改中':['整改中','待复验'],'待复验':['待复验','已销项','整改中'],'已销项':['已销项','整改中']}[r.status]||[r.status];
    UI.modal(r.id+' · 问题详情与闭环',`<div class="notice"><b>${esc(r.problem)}</b><p class="small">${esc(r.project)} / ${esc(r.location)} / ${esc(r.category)}</p>${UI.badge(r.status,tone(r.status))} ${overdue(r)?UI.badge('已逾期','red'):''}${r.possibleDuplicate.length?'<p class="small">相似编号：'+esc(r.possibleDuplicate.join('、'))+'。需人工确认，当前均保留。</p>':''}</div>
      <form id="eng-process"><div class="grid-2"><label class="field">责任单位<input name="owner" value="${esc(r.owner)}" required></label><label class="field">整改期限<input name="due" type="date" value="${esc(r.due)}" required></label><label class="field">下一状态<select name="status">${opts(next,r.status)}</select></label><label class="field">操作人<input name="actor" placeholder="例如：模拟工程师甲" required></label><label class="field">复验人<input name="verifier" value="${esc(r.verifier)}" placeholder="销项时必填"></label><label class="field">整改 / 销项依据<input name="evidence" value="${esc(r.evidence)}" placeholder="复验记录编号及结果（模拟）"></label></div><label class="field">处理说明<textarea name="note" rows="2" placeholder="记录整改进展、变更理由或复开原因" required></textarea></label><div id="eng-process-error" class="small" style="color:#b83c31;margin:8px 0" role="alert"></div><button class="btn primary" type="submit">保存处理记录</button></form>
      <h3 style="margin-top:24px">来源追溯</h3>${UI.table(['原表','行号','原始状态','来源更新日'],r.sources.map(s=>[esc(s.source),String(s.row),esc(s.original[FIELDS[s.source].status]),esc(s.original[FIELDS[s.source].updated])]))}
      <h3 style="margin-top:24px">处理轨迹</h3><div class="stack"><div class="notice small"><b>来源归并</b><p>按项目与编号归并 ${r.sources.length} 条来源记录；初始状态取最新来源日期。</p></div>${histories.map(h=>`<div class="notice small"><b>${esc(h.at)} · ${esc(h.actor)}</b><p>${esc(h.from)} → ${esc(h.to)} · ${esc(h.note)}</p><p>责任单位：${esc(h.owner)}；截止：${esc(h.due)}</p>${h.evidence?'<p>依据：'+esc(h.evidence)+'；复验人：'+esc(h.verifier||'待复验')+'</p>':''}</div>`).join('')}</div>`);
    document.getElementById('eng-process').onsubmit=e=>{
      e.preventDefault();const data=Object.fromEntries(new FormData(e.currentTarget));Object.keys(data).forEach(k=>data[k]=data[k].trim());
      let error='';
      if(!data.actor||!data.note||!data.owner)error='请填写操作人、责任单位与处理说明。';
      else if(!validDate(data.due))error='整改期限不是有效日期。';
      else if(!next.includes(data.status))error='请选择允许的下一状态。';
      else if((data.status==='待复验'||data.status==='已销项')&&!data.evidence)error='提交复验或销项前，请填写整改 / 销项依据。';
      else if(data.status==='已销项'&&!data.verifier)error='销项前，请填写复验人。';
      if(error){document.getElementById('eng-process-error').textContent=error;return}
      const h={at:new Date().toLocaleString('zh-CN',{hour12:false}),actor:data.actor,from:r.status,to:data.status,note:data.note,owner:data.owner,due:data.due,evidence:data.evidence,verifier:data.verifier};
      const returnedToWork=data.status==='整改中' && (r.status==='已销项'||r.status==='待复验');
      state.overrides[key]={owner:data.owner,due:data.due,status:data.status,evidence:returnedToWork?'':data.evidence,verifier:returnedToWork?'':data.verifier,history:[...histories,h]};Object.assign(r,state.overrides[key]);save();UI.closeModal();render();UI.toast(data.status==='已销项'?'已记录复验依据并完成销项':returnedToWork?'已退回整改；历史依据已保留，新一轮复验需补充依据':'处理记录已保存');
    };
  }
  window.Modules.engineering={title:'查验与销项',subtitle:'四表合一 · 数据治理 · 责任追溯',render,getData:()=>clone({schema:'dahua-engineering-demo-v1',asOf:UI.today,...state,fieldMappings:FIELDS,statusMappings:STATUS}),reset(){state=seed();normalize();filter={search:'',project:'全部项目',status:'全部状态',source:'全部来源'};tab='ledger';render()}};
})();
