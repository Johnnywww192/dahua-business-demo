(function () {
  'use strict';
  const KEY = 'design';
  const PROJECTS = ['云樾府', '滨江悦', '湖畔里'];
  const TYPES = ['防水构造', '立面效果', '材料样板', '机电点位', '景观收口'];
  const SPECIALTIES = ['建筑', '景观', '室内', '机电'];
  const seed = () => ({
    tasks: [
      {id:'SJ-101',project:'云樾府',name:'地下室防水节点专项深化',owner:'设计组 A',due:'2026-10-27',progress:80,required:['深化图纸','会审纪要','节点确认单'],docs:['深化图纸','会审纪要']},
      {id:'SJ-102',project:'云樾府',name:'首层大堂精装施工图',owner:'室内组 A',due:'2026-11-03',progress:75,required:['施工图','材料清单','专业会签单'],docs:['施工图','材料清单']},
      {id:'SJ-103',project:'滨江悦',name:'景观雨水花园方案确认',owner:'景观组 B',due:'2026-10-30',progress:60,required:['景观方案','水文复核表','成本测算'],docs:['景观方案']},
      {id:'SJ-104',project:'滨江悦',name:'标准层机电综合排布',owner:'机电组 B',due:'2026-11-05',progress:45,required:['综合管线图','碰撞检查表'],docs:['综合管线图']},
      {id:'SJ-105',project:'湖畔里',name:'铝板幕墙深化与封样',owner:'建筑组 C',due:'2026-10-28',progress:100,required:['深化图纸','样板确认单'],docs:['深化图纸','样板确认单']},
      {id:'SJ-106',project:'湖畔里',name:'示范区入口铺装图',owner:'景观组 C',due:'2026-11-02',progress:90,required:['施工图','样板确认单','排版图'],docs:['施工图','样板确认单']},
      {id:'SJ-107',project:'云樾府',name:'户内门窗立面校核',owner:'建筑组 A',due:'2026-11-07',progress:50,required:['校核图纸','会签单'],docs:['校核图纸']},
      {id:'SJ-108',project:'滨江悦',name:'售楼处灯光专项设计',owner:'照明组 B',due:'2026-10-25',progress:100,required:['灯光方案','照度计算书'],docs:['灯光方案','照度计算书']}
    ],
    samples:[
      {id:'MB-001',project:'云樾府',name:'大堂洞石实物样板',due:'2026-10-29',state:'待复核',owner:'室内组 A'},
      {id:'MB-002',project:'滨江悦',name:'金属格栅色板',due:'2026-11-02',state:'已送样',owner:'建筑组 B'},
      {id:'MB-003',project:'湖畔里',name:'幕墙铝板封样',due:'2026-10-26',state:'已封样',owner:'建筑组 C'},
      {id:'MB-004',project:'云樾府',name:'园路石材防滑样板',due:'2026-11-04',state:'待送样',owner:'景观组 A'},
      {id:'MB-005',project:'滨江悦',name:'入口灯具实物样板',due:'2026-10-30',state:'已送样',owner:'照明组 B'}
    ],
    issues: [
      {id:'XJ-001',project:'云樾府',place:'1#楼地下室',type:'防水构造',detail:'穿墙套管节点缺少止水构造',owner:'总包一组',due:'2026-10-27',state:'整改中',evidence:'',note:'已提交节点修正图，待现场实施',history:['2026-10-23｜巡检录入','2026-10-25｜转入整改']},
      {id:'XJ-002',project:'云樾府',place:'2#楼首层',type:'材料样板',detail:'大堂石材与封样色差明显',owner:'精装一组',due:'2026-11-02',state:'待整改',evidence:'',note:'需提供对照样板',history:['2026-10-29｜巡检录入']},
      {id:'XJ-003',project:'滨江悦',place:'3#楼屋面',type:'防水构造',detail:'落水口附加防水层未连续施工',owner:'总包二组',due:'2026-10-28',state:'待复验',evidence:'',note:'施工方反馈已完成，待设计复核',history:['2026-10-24｜巡检录入','2026-10-28｜提交复验']},
      {id:'XJ-004',project:'湖畔里',place:'示范区入口',type:'景观收口',detail:'台阶与侧石收口高差超样板',owner:'景观三组',due:'2026-11-03',state:'整改中',evidence:'',note:'下周复验',history:['2026-10-30｜巡检录入']},
      {id:'XJ-005',project:'云樾府',place:'地下车库 B 区',type:'机电点位',detail:'喷淋与吊顶分格中心偏位',owner:'机电一组',due:'2026-10-26',state:'已销项',evidence:'模拟复验记录 FY-005：点位复核通过；复验人：巡检组 A',note:'按综合图调整',history:['2026-10-20｜巡检录入','2026-10-25｜复验通过并销项']},
      {id:'XJ-006',project:'滨江悦',place:'样板段西立面',type:'立面效果',detail:'横向分缝与图纸标高不一致',owner:'幕墙二组',due:'2026-11-01',state:'待整改',evidence:'',note:'',history:['2026-10-30｜巡检录入']},
      {id:'XJ-007',project:'湖畔里',place:'2#楼屋面',type:'防水构造',detail:'泛水收头压条遗漏',owner:'总包三组',due:'2026-10-29',state:'待复验',evidence:'',note:'已补装压条',history:['2026-10-26｜巡检录入','2026-10-30｜提交复验']},
      {id:'XJ-008',project:'云樾府',place:'大堂入口',type:'景观收口',detail:'铺装与门槛交接处积水',owner:'景观一组',due:'2026-10-30',state:'整改中',evidence:'',note:'需优化找坡',history:['2026-10-25｜巡检录入']},
      {id:'XJ-009',project:'滨江悦',place:'会所公区',type:'材料样板',detail:'木饰面拼接方向与封样不同',owner:'精装二组',due:'2026-10-26',state:'已销项',evidence:'模拟复验记录 FY-009：更换后符合封样；复验人：巡检组 B',note:'',history:['2026-10-21｜巡检录入','2026-10-26｜复验通过并销项']},
      {id:'XJ-010',project:'湖畔里',place:'4#楼外立面',type:'立面效果',detail:'铝板阴角转角收口不顺直',owner:'幕墙三组',due:'2026-11-04',state:'待整改',evidence:'',note:'',history:['2026-10-30｜巡检录入']},
      {id:'XJ-011',project:'云樾府',place:'3#楼屋面',type:'防水构造',detail:'变形缝防水搭接不足',owner:'总包一组',due:'2026-11-02',state:'待整改',evidence:'',note:'',history:['2026-10-29｜巡检录入']},
      {id:'XJ-012',project:'滨江悦',place:'车库主入口',type:'机电点位',detail:'导向灯具与车行视线冲突',owner:'机电二组',due:'2026-11-05',state:'整改中',evidence:'',note:'已启动点位调整',history:['2026-10-28｜巡检录入']}
    ],
    specialties:['建筑','景观'],
    weeklyText:'',
    weeklyGeneratedFor:[],
    reminderDays:3
  });
  const articles=[
    {id:'ZX-01',title:'低碳立面：材料用量与维护周期的协同设计',specialty:'建筑',source:'模拟资料库 · 建筑研究',date:'2026-10-27',summary:'虚构案例对三类立面方案进行材料用量、耐久与维护便利性比较，提出先确定维护边界再选择材料体系。',action:'在立面比选表中增加可更换性和维护可达性两项。'},
    {id:'ZX-02',title:'高密度社区的入口与首层空间组织',specialty:'建筑',source:'模拟资料库 · 空间观察',date:'2026-10-29',summary:'虚构案例采用分时分流与可视化动线设计，减少归家、访客和后勤流线冲突。',action:'在首层评审前叠加三类人群动线，形成冲突点清单。'},
    {id:'ZX-03',title:'雨水花园与社区慢行系统一体化',specialty:'景观',source:'模拟资料库 · 景观专题',date:'2026-10-28',summary:'虚构案例将浅沟、下凹绿地与慢行路径组合，重点检查溢流方向及后期养护作业空间。',action:'对雨水花园方案补充溢流路径及养护入口示意。'},
    {id:'ZX-04',title:'示范区铺装的模块化与收口控制',specialty:'景观',source:'模拟资料库 · 工艺研究',date:'2026-10-30',summary:'虚构案例通过统一铺装模数和提前绘制收口详图，减少现场小块拼接及反复切割。',action:'样板确认时同时审核主面、边界和异形区三类排版。'},
    {id:'ZX-05',title:'精装样板评审中的多光源色差检查',specialty:'室内',source:'模拟资料库 · 材料观察',date:'2026-10-26',summary:'虚构案例建议在自然光、暖光和中性光条件下记录主材颜色与纹理表现，并保留同批次对照样。',action:'为石材与木饰面封样增加光源条件和批次记录。'},
    {id:'ZX-06',title:'车库综合管线的净高检查流程',specialty:'机电',source:'模拟资料库 · 专业协同',date:'2026-10-29',summary:'虚构案例以关键车行动线为轴，联合检查管线、标识、消防设备及装修完成面的净高关系。',action:'在机电会审中标出主车道最不利断面并专项复核。'}
  ];
  let state=UI.load(KEY,seed),tab='plan',project='全部项目',statusFilter='全部状态',root;
  const esc=UI.esc;
  const persist=()=>UI.save(KEY,state);
  const days=(d)=>Math.round((new Date(d+'T00:00:00Z')-new Date(UI.today+'T00:00:00Z'))/86400000);
  const overdue=(r)=>r.state!=='已销项' && days(r.due)<0;
  const taskRisk=(t)=>t.progress===100?'已完成':days(t.due)<0?'已逾期':days(t.due)<=state.reminderDays?'即将到期':'进行中';
  const tone=(s)=>s==='已销项'||s==='已完成'||s==='已封样'?'green':s==='已逾期'?'red':s==='待复验'||s==='即将到期'?'amber':'blue';
  const btn=(text,action,id='',primary=false)=>`<button type="button" class="btn ${primary?'primary':''}" data-da="${action}" data-id="${esc(id)}">${esc(text)}</button>`;
  const options=(values,selected)=>values.map(v=>`<option value="${esc(v)}" ${v===selected?'selected':''}>${esc(v)}</option>`).join('');
  const matches=r=>project==='全部项目'||r.project===project;
  const refresh=()=>render(root);
  const countBy=(arr,key)=>Object.entries(arr.reduce((a,r)=>(a[r[key]]=(a[r[key]]||0)+1,a),{})).sort((a,b)=>b[1]-a[1]);
  const scopeToolbar=()=>`<div class="toolbar"><label>项目范围 <select id="design-project" aria-label="项目范围">${options(['全部项目',...PROJECTS],project)}</select></label><span class="muted small">所有名单、指标与导出随项目筛选更新</span></div>`;
  function render(container){
    root=container;
    root.innerHTML=`${UI.heading?UI.heading('SCENARIO 04 · DESIGN & INSPECTION','让设计问题有提醒、有闭环','从设计计划、材料样板到现场巡检，以统一台账追踪责任与进度。'):''}<div class="tabs" role="tablist" aria-label="设计与巡检功能">${[['plan','设计计划与样板'],['inspection','巡检闭环'],['weekly','产品前沿周报']].map(([id,label])=>`<button type="button" role="tab" aria-selected="${tab===id}" class="tab ${tab===id?'active':''}" data-da="tab" data-id="${id}">${label}</button>`).join('')}</div>${tab==='plan'?planView():tab==='inspection'?inspectionView():weeklyView()}`;
    root.onclick=click;
    const scope=root.querySelector('#design-project');if(scope)scope.onchange=e=>{project=e.target.value;refresh();};
    const filter=root.querySelector('#inspection-status');if(filter)filter.onchange=e=>{statusFilter=e.target.value;refresh();};
    const reminder=root.querySelector('#design-reminder');if(reminder)reminder.onchange=e=>{state.reminderDays=Number(e.target.value);persist();refresh();};
    root.querySelectorAll('[data-specialty]').forEach(el=>el.onchange=()=>{state.specialties=Array.from(root.querySelectorAll('[data-specialty]:checked')).map(e=>e.value);persist();refresh();});
    const editor=root.querySelector('#weekly-editor');if(editor)editor.oninput=e=>{state.weeklyText=e.target.value;persist();};
  }
  function planView(){
    const tasks=state.tasks.filter(matches),samples=state.samples.filter(matches),missing=tasks.reduce((n,t)=>n+t.required.filter(d=>!t.docs.includes(d)).length,0),late=tasks.filter(t=>taskRisk(t)==='已逾期');
    return `${scopeToolbar()}<div class="stats">${UI.stat('设计任务',tasks.length,'按当前项目范围统计')}${UI.stat('未完成逾期',late.length,'完成度未达 100% 且计划日已过','red')}${UI.stat('缺失文件',missing,'按各任务必备文件清单检查','amber')}${UI.stat('样板待封样',samples.filter(s=>s.state!=='已封样').length,'包含待送样、已送样和待复核')}</div>
    <div class="card"><div class="card-header"><div><h2>设计节点与文件完整性</h2><span class="muted small">预警依据：计划完成日、完成度、必备文件清单</span></div>${btn('导出设计台账','export-tasks')}</div><div class="toolbar"><label>到期提醒窗口 <select id="design-reminder" aria-label="到期提醒窗口">${[1,3,7].map(n=>`<option value="${n}" ${n===state.reminderDays?'selected':''}>未来 ${n} 天</option>`).join('')}</select></label><span class="small muted">演示基准日：${UI.today}</span></div>${UI.table(['任务 / 项目','责任团队','计划完成','完成度','必备文件','状态','操作'],tasks.map(t=>{const absent=t.required.filter(d=>!t.docs.includes(d));return [`<b>${esc(t.name)}</b><br><span class="muted">${esc(t.id)} · ${esc(t.project)}</span>`,esc(t.owner),t.due,`${t.progress}%<div class="progress" style="width:85px;margin-top:6px"><span style="width:${t.progress}%"></span></div>`,absent.length?`<span style="color:var(--amber)">缺 ${absent.length} 份</span><br><span class="muted">${esc(absent.join('、'))}</span>`:UI.badge('完整','green'),UI.badge(taskRisk(t),tone(taskRisk(t))),btn('更新','task',t.id)];}))}</div>
    <div class="grid-2"><div class="card"><div class="card-header"><h2>材料样板管理</h2>${UI.badge('封样前复核','blue')}</div>${UI.table(['样板 / 项目','计划封样','进展','操作'],samples.map(s=>[`<b>${esc(s.name)}</b><br><span class="muted">${esc(s.project)}</span>`,`${s.due}${s.state!=='已封样'&&days(s.due)<0?'<br>'+UI.badge('逾期 '+Math.abs(days(s.due))+' 天','red'):''}`,UI.badge(s.state,tone(s.state)),btn('更新','sample',s.id)]))}</div><div class="card"><h2>今日待办清单</h2><div class="stack">${[...tasks.filter(t=>taskRisk(t)==='已逾期'||taskRisk(t)==='即将到期').map(t=>`<div style="padding:12px;background:#f7f8f3;border-radius:8px">${UI.badge(taskRisk(t),tone(taskRisk(t)))} <b>${esc(t.name)}</b><div class="muted small" style="margin-top:6px">${esc(t.owner)} · ${t.due} · ${t.required.filter(d=>!t.docs.includes(d)).length? '补齐缺失文件并确认排期':'复核交付进度'}</div></div>`),...samples.filter(s=>s.state!=='已封样'&&days(s.due)<=state.reminderDays).map(s=>`<div style="padding:12px;background:#f7f8f3;border-radius:8px">${UI.badge('样板跟进',days(s.due)<0?'red':'amber')} <b>${esc(s.name)}</b><div class="muted small" style="margin-top:6px">${esc(s.owner)} · ${s.due} · 当前${esc(s.state)}</div></div>`)].join('')||'<div class="empty">当前范围没有到期提醒</div>'}</div><div class="notice">提醒在本演示内生成。真实上线需接入设计平台和企业消息渠道，并约定文件版本、责任人及到期口径。</div></div></div>`;
  }
  function inspectionView(){
    const scoped=state.issues.filter(matches),issues=scoped.filter(r=>statusFilter==='全部状态'||(statusFilter==='仅逾期'?overdue(r):r.state===statusFilter)),done=scoped.filter(r=>r.state==='已销项').length;
    const groups=countBy(scoped,'type'),projectCounts=countBy(scoped,'project');
    return `${scopeToolbar()}<div class="stats">${UI.stat('巡检问题',scoped.length,'支持快速录入与责任追踪')}${UI.stat('逾期待闭环',scoped.filter(overdue).length,'待复验仍计入未闭环','red')}${UI.stat('待复验',scoped.filter(r=>r.state==='待复验').length,'复验通过并填写依据后销项','amber')}${UI.stat('闭环率',UI.pct(scoped.length?done/scoped.length*100:0),`${done} / ${scoped.length} 项已销项`,'green')}</div><div class="card"><div class="card-header"><h2>巡检问题台账</h2><div class="row">${btn('导出台账','export-issues')}${btn('录入问题','new-issue','',true)}</div></div><div class="toolbar"><label>状态筛选 <select id="inspection-status">${options(['全部状态','仅逾期','待整改','整改中','待复验','已销项'],statusFilter)}</select></label><span class="small muted">显示 ${issues.length} 项 / 当前项目 ${scoped.length} 项</span></div>${UI.table(['问题 / 位置','类别','责任团队','计划完成','进展','操作'],issues.map(r=>[`<b>${esc(r.detail)}</b><br><span class="muted">${esc(r.id)} · ${esc(r.project)} · ${esc(r.place)}</span>`,esc(r.type),esc(r.owner),`${r.due}${overdue(r)?'<br>'+UI.badge('逾期 '+Math.abs(days(r.due))+' 天','red'):''}`,UI.badge(r.state,tone(r.state)),btn(r.state==='已销项'?'查看记录':'跟进 / 复验','issue',r.id)]))}</div>
    <div class="grid-2"><div class="card"><div class="card-header"><h2>同类问题聚合</h2>${UI.badge('按标准类别统计','neutral')}</div>${groups.map(([name,n])=>`<div style="margin:17px 0"><div class="row" style="justify-content:space-between;margin-bottom:7px"><span>${esc(name)}</span><b>${n} 项</b></div><div class="progress"><span style="width:${scoped.length?n/scoped.length*100:0}%"></span></div></div>`).join('')||'<div class="empty">暂无问题</div>'}<p class="muted small">同类聚合用于发现共性问题，不代表判定为同一缺陷。</p></div><div class="card"><div class="card-header"><h2>复盘摘要与案例库</h2>${btn('生成复盘','summary')}</div><p class="muted">${groups.length?`当前高频类别为「${esc(groups[0][0])}」，共 ${groups[0][1]} 项，覆盖 ${new Set(scoped.filter(r=>r.type===groups[0][0]).map(r=>r.project)).size} 个项目。`:'尚无问题记录。'}</p><p class="muted small">${projectCounts.map(([p,n])=>`${esc(p)} ${n} 项`).join(' · ')}</p><h3>已闭环案例</h3><div class="stack">${scoped.filter(r=>r.state==='已销项').map(r=>`<div style="border-left:3px solid #c8dbad;padding:4px 0 4px 13px"><b>${esc(r.detail)}</b><div class="small muted">${esc(r.project)} · ${esc(r.evidence)}</div></div>`).join('')||'<div class="empty">复验通过后自动沉淀至案例库</div>'}</div></div></div>`;
  }
  function weeklyView(){
    const selected=articles.filter(a=>state.specialties.includes(a.specialty));
    const stale=state.weeklyText&&state.specialties.slice().sort().join('|')!==state.weeklyGeneratedFor.slice().sort().join('|');
    return `<div class="notice">以下 6 条资料全部为虚构的模拟资讯，用于演示筛选、整理与周报输出。没有抓取真实媒体，也没有发送邮件或定时推送。</div><div class="grid-2"><div class="card"><div class="card-header"><h2>选择本周专业方向</h2>${UI.badge('2026.10.26 — 10.31','blue')}</div><div class="row" style="margin-bottom:20px">${SPECIALTIES.map(s=>`<label class="row" style="gap:6px"><input type="checkbox" value="${s}" data-specialty ${state.specialties.includes(s)?'checked':''}>${s}</label>`).join('')}</div><div class="stack">${selected.map(a=>`<article style="padding:16px;background:#f7f9f2;border:1px solid #e7edde;border-radius:9px"><div class="row" style="justify-content:space-between">${UI.badge(a.specialty,'green')}<span class="small muted">${a.date}</span></div><h3 style="margin:10px 0 7px">${esc(a.title)}</h3><p class="small muted" style="margin-bottom:8px">${esc(a.summary)}</p><div class="small muted">${esc(a.source)} · ${a.id} · 虚构</div></article>`).join('')||'<div class="empty">勾选至少一个专业方向</div>'}</div><div style="margin-top:18px">${btn('生成周报草稿','generate-weekly','',true)}</div></div><div class="card"><div class="card-header"><h2>周报草稿</h2><div class="row">${btn('导出 TXT','weekly-txt')}${btn('导出 HTML','weekly-html')}</div></div>${stale?'<div class="notice amber">专业选择已变化，当前草稿仍保留原内容。点击“生成周报草稿”可重新生成；已编辑内容将被新草稿替换。</div>':''}<label class="field">可直接编辑，修改保存在本浏览器<textarea id="weekly-editor" style="min-height:570px" placeholder="选择专业后点击生成周报草稿">${esc(state.weeklyText)}</textarea></label><p class="muted small">生成方式：按所选模拟资料整理固定结构草稿。实际 GPT 摘要、媒体采集、授权来源与自动分发属于接入阶段。</p></div></div>`;
  }
  function click(e){
    const b=e.target.closest('[data-da]');if(!b)return;const a=b.dataset.da,id=b.dataset.id;
    if(a==='tab'){tab=id;refresh();}
    if(a==='task')editTask(id);
    if(a==='sample')editSample(id);
    if(a==='new-issue')newIssue();
    if(a==='issue')editIssue(id);
    if(a==='export-tasks')UI.csv('设计任务台账-模拟.csv',state.tasks.filter(matches).map(t=>({'任务编号':t.id,'项目':t.project,'任务':t.name,'责任团队':t.owner,'计划完成':t.due,'完成度':t.progress+'%','状态':taskRisk(t),'已提交文件':t.docs.join('；'),'缺失文件':t.required.filter(d=>!t.docs.includes(d)).join('；')})));
    if(a==='export-issues')UI.csv('巡检问题台账-模拟.csv',state.issues.filter(matches).filter(r=>statusFilter==='全部状态'||(statusFilter==='仅逾期'?overdue(r):r.state===statusFilter)).map(r=>({'编号':r.id,'项目':r.project,'位置':r.place,'类别':r.type,'问题':r.detail,'责任团队':r.owner,'计划完成':r.due,'状态':r.state,'逾期天数':overdue(r)?Math.abs(days(r.due)):0,'跟进记录':r.note,'复验依据':r.evidence,'过程记录':r.history.join('；')})));
    if(a==='summary')showSummary();
    if(a==='generate-weekly')generateWeekly();
    if(a==='weekly-txt'||a==='weekly-html')exportWeekly(a);
  }
  function editTask(id){
    const t=state.tasks.find(r=>r.id===id);
    UI.modal('更新设计任务 · '+t.id,`<form id="design-task-form"><h3>${esc(t.name)}</h3><p class="muted small">${esc(t.project)} · ${esc(t.owner)}</p><div class="grid-2"><label class="field">计划完成日<input name="due" type="date" value="${t.due}" required></label><label class="field">完成度（0–100%）<input name="progress" type="number" min="0" max="100" step="1" value="${t.progress}" required></label></div><h3>文件完整性检查</h3><p class="muted small">勾选表示该文件已提交；此处模拟文件登记，不上传真实文件。</p><div class="stack">${t.required.map(d=>`<label style="display:block"><input type="checkbox" name="doc" value="${esc(d)}" ${t.docs.includes(d)?'checked':''}> ${esc(d)}</label>`).join('')}</div><div class="notice">“完成”条件：完成度 100% 且所有必备文件已提交。缺少文件时不允许标记完成。</div><button class="btn primary" type="submit">保存更新</button></form>`);
    document.getElementById('design-task-form').onsubmit=e=>{e.preventDefault();const fd=new FormData(e.target),p=Number(fd.get('progress')),docs=fd.getAll('doc');if(p===100&&docs.length!==t.required.length){UI.toast('请先补齐必备文件，再标记 100% 完成');return;}t.progress=p;t.due=fd.get('due');t.docs=docs;persist();UI.closeModal();refresh();UI.toast('设计节点与文件清单已更新');};
  }
  function editSample(id){
    const s=state.samples.find(r=>r.id===id);UI.modal('材料样板 · '+s.id,`<form id="sample-form"><h3>${esc(s.name)}</h3><p class="muted small">${esc(s.project)} · ${esc(s.owner)}</p><label class="field">计划封样日<input name="due" type="date" value="${s.due}" required></label><label class="field">当前进展<select name="state">${options(['待送样','已送样','待复核','已封样'],s.state)}</select></label><div class="notice">演示中登记样板状态；真实封样应关联审批记录及实物样板编号。</div><button class="btn primary" type="submit">保存样板进展</button></form>`);document.getElementById('sample-form').onsubmit=e=>{e.preventDefault();const f=new FormData(e.target);s.due=f.get('due');s.state=f.get('state');persist();UI.closeModal();refresh();UI.toast('样板进展已更新');};
  }
  function newIssue(){
    UI.modal('快速录入巡检问题',`<form id="issue-new-form"><div class="grid-2"><label class="field">项目<select name="project">${options(PROJECTS,project==='全部项目'?PROJECTS[0]:project)}</select></label><label class="field">问题类别<select name="type">${options(TYPES,TYPES[0])}</select></label><label class="field">位置<input name="place" maxlength="80" placeholder="如：1#楼屋面" required></label><label class="field">责任团队<input name="owner" maxlength="40" placeholder="如：总包一组" required></label></div><label class="field">问题描述<textarea name="detail" maxlength="500" placeholder="描述具体部位、现象和与要求的差异" required></textarea></label><label class="field">计划完成日<input name="due" type="date" value="2026-11-03" required></label><button class="btn primary" type="submit">保存问题</button></form>`);
    document.getElementById('issue-new-form').onsubmit=e=>{e.preventDefault();const f=new FormData(e.target);const detail=String(f.get('detail')).trim(),place=String(f.get('place')).trim(),owner=String(f.get('owner')).trim();if(!detail||!place||!owner){UI.toast('请填写问题描述、位置和责任团队');return;}const next=Math.max(0,...state.issues.map(r=>Number(r.id.split('-')[1])||0))+1;state.issues.unshift({id:'XJ-'+String(next).padStart(3,'0'),project:f.get('project'),type:f.get('type'),place,owner,detail,due:f.get('due'),state:'待整改',evidence:'',note:'',history:[UI.today+'｜巡检录入']});persist();statusFilter='全部状态';project=f.get('project');UI.closeModal();refresh();UI.toast('问题已录入，并纳入统计与提醒');};
  }
  function editIssue(id){
    const r=state.issues.find(i=>i.id===id),closed=r.state==='已销项';
    UI.modal('巡检跟进 · '+r.id,`<form id="issue-edit-form"><h3>${esc(r.detail)}</h3><p class="muted small">${esc(r.project)} · ${esc(r.place)} · ${esc(r.owner)}</p><div class="grid-2"><label class="field">计划完成日<input name="due" type="date" value="${r.due}" required ${closed?'disabled':''}></label><label class="field">当前进展<select name="state" ${closed?'disabled':''}>${options(['待整改','整改中','待复验','已销项'],r.state)}</select></label></div><label class="field">跟进记录<textarea name="note" maxlength="1000" ${closed?'readonly':''}>${esc(r.note)}</textarea></label><label class="field">复验依据（销项必填）<textarea name="evidence" maxlength="1000" placeholder="填写复验结果、复验人、模拟记录编号或证据说明" ${closed?'readonly':''}>${esc(r.evidence)}</textarea></label><div class="notice">闭环流程：待整改 → 整改中 → 待复验 → 已销项。只有待复验的问题可以销项，且必须填写复验依据；复验不通过可退回整改中。</div><h3>过程记录</h3><div class="stack small muted" style="margin-bottom:20px">${r.history.map(h=>`<div>${esc(h)}</div>`).join('')}</div>${closed?UI.badge('已完成复验，记录只读','green'):'<button class="btn primary" type="submit">保存跟进</button>'}</form>`);
    if(closed)return;
    document.getElementById('issue-edit-form').onsubmit=e=>{e.preventDefault();const f=new FormData(e.target),next=f.get('state'),evidence=String(f.get('evidence')).trim(),allowed={'待整改':['待整改','整改中'],'整改中':['整改中','待复验'],'待复验':['待复验','整改中','已销项']};if(!allowed[r.state].includes(next)){UI.toast('请按“待整改 → 整改中 → 待复验 → 已销项”依次推进');return;}if(next==='已销项'&&evidence.length<8){UI.toast('请填写至少 8 个字的复验依据，包含结果与复验人');return;}const prev=r.state;r.state=next;r.due=f.get('due');r.note=String(f.get('note')).trim();r.evidence=evidence;r.history.push(UI.today+'｜'+(next===prev?'更新跟进记录':prev+' → '+next)+(next==='已销项'?'（复验依据已登记）':''));persist();UI.closeModal();refresh();UI.toast(next==='已销项'?'复验通过，已销项并更新案例库':'跟进记录已保存');};
  }
  function summaryText(){
    const rows=state.issues.filter(matches),groups=countBy(rows,'type'),done=rows.filter(r=>r.state==='已销项');
    return `设计巡检复盘｜模拟数据\n项目范围：${project}\n基准日：${UI.today}\n\n一、总体情况\n共 ${rows.length} 项问题，已销项 ${done.length} 项，闭环率 ${UI.pct(rows.length?done.length/rows.length*100:0)}；逾期未闭环 ${rows.filter(overdue).length} 项，待复验 ${rows.filter(r=>r.state==='待复验').length} 项。\n\n二、同类问题分布\n${groups.map(([name,n])=>`• ${name}：${n} 项，涉及 ${new Set(rows.filter(r=>r.type===name).map(r=>r.project)).size} 个项目`).join('\n')||'暂无问题'}\n\n三、重点跟进\n${rows.filter(overdue).map(r=>`• ${r.id} ${r.project}｜${r.detail}｜${r.owner}｜逾期 ${Math.abs(days(r.due))} 天｜当前${r.state}`).join('\n')||'当前无逾期问题'}\n\n四、已闭环案例\n${done.map(r=>`• ${r.id} ${r.detail}\n  复验依据：${r.evidence}`).join('\n')||'暂无已闭环案例'}\n\n五、后续动作（供人工复核）\n${groups[0]?`优先检查「${groups[0][0]}」相关设计节点及施工样板，组织责任团队对重复出现的问题做专项交底。`:'持续完成巡检录入。'}对逾期待办明确复验排期；待复验项完成现场检查并登记依据后销项。\n\n统计规则：同类问题按标准类别聚合；已销项才计入闭环；待复验仍计入未闭环。以上为演示数据计算与模板整理，不是实际项目结论。`;
  }
  function showSummary(){const text=summaryText();UI.modal('巡检复盘摘要',`<div class="report"><pre>${esc(text)}</pre></div><button id="summary-download" class="btn primary">导出复盘 TXT</button>`);document.getElementById('summary-download').onclick=()=>UI.download('设计巡检复盘-模拟.txt',text);}
  function generateWeekly(){
    const selected=articles.filter(a=>state.specialties.includes(a.specialty));if(!selected.length){UI.toast('请至少选择一个专业方向');return;}
    if(state.weeklyText){UI.modal('重新生成周报草稿',`<p>重新生成会覆盖当前已编辑的草稿。可以先导出保留现有内容。</p><div class="row"><button id="weekly-rebuild" class="btn primary">重新生成</button><button id="weekly-back" class="btn">保留当前草稿</button></div>`);document.getElementById('weekly-back').onclick=UI.closeModal;document.getElementById('weekly-rebuild').onclick=()=>{UI.closeModal();buildWeekly(selected);};}else buildWeekly(selected);
  }
  function buildWeekly(selected){state.weeklyText=`产品前沿资讯周报｜模拟演示\n周期：2026.10.26 — 2026.10.31\n专业方向：${state.specialties.join('、')}\n资料数量：${selected.length} 条\n\n【资料说明】本周报使用虚构模拟资讯，不代表真实新闻、真实项目实践或正式技术依据。\n\n一、本周观察\n${state.specialties.map(s=>`• ${s}：围绕方案评审、专业协同和落地细节，整理可供讨论的设计检查项。`).join('\n')}\n\n二、专题摘要\n${selected.map((a,i)=>`${i+1}. ${a.title}\n专业：${a.specialty}｜日期：${a.date}\n来源：${a.source}（虚构，资料编号 ${a.id}）\n摘要：${a.summary}\n可讨论动作：${a.action}`).join('\n\n')}\n\n三、下周跟进建议\n将上述可讨论动作纳入下一轮专业会审；由专业负责人核实适用条件后，决定是否进入标准化检查清单。\n\n四、发布前检查\n□ 核验真实来源及转载授权\n□ 确认专业意见及适用边界\n□ 确认收件人范围与发布周期\n\n说明：此稿为本地模拟资料按固定模板整理，可人工编辑。未接入真实媒体、GPT API 或自动推送。`;state.weeklyGeneratedFor=[...state.specialties];persist();refresh();UI.toast('周报草稿已生成，可编辑后导出');}
  function exportWeekly(format){if(!state.weeklyText.trim()){UI.toast('请先生成或填写周报草稿');return;}if(format==='weekly-txt')UI.download('产品前沿资讯周报-模拟.txt',state.weeklyText);else UI.download('产品前沿资讯周报-模拟.html',`<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>产品前沿资讯周报 · 模拟</title><style>body{font-family:system-ui,"PingFang SC",sans-serif;max-width:820px;margin:50px auto;padding:0 24px;line-height:1.9;color:#213e30}h1{font-size:25px}pre{white-space:pre-wrap;font-family:inherit;font-size:14px}.tag{color:#6d815d;border-bottom:1px solid #dce6d4;padding-bottom:18px}</style><h1>产品前沿资讯周报</h1><p class="tag">模拟资料 · 2026 年 10 月 · 可编辑草稿</p><pre>${esc(state.weeklyText)}</pre></html>`,'text/html;charset=utf-8');}
  window.Modules.design={title:'设计与巡检',subtitle:'设计节点、巡检闭环与产品前沿周报',render,getData:()=>({kind:'设计与巡检模拟数据',asOf:UI.today,...JSON.parse(JSON.stringify(state)),articles}),reset:()=>{state=seed();persist();if(root&&root.isConnected)refresh();}};
})();
