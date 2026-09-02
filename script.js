/**
 * نظام أعطال مصنع 5 - الملف البرمجي الرئيسي (النسخة الكاملة النهائية - محدثة ومصلحة للأزرار والربط السحابي)
 */

// إعدادات الاتصال بـ Firebase Realtime Database
const firebaseConfig = {
    databaseURL: "https://factory5-faults-default-rtdb.firebaseio.com/"
};

// تهيئة Firebase
if (typeof firebase !== 'undefined' && !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const rtdb = typeof firebase !== 'undefined' ? firebase.database() : null;

const DEFAULT_MACHINES = [
    { number: "1712", zone: "منطقة 1", section: "تجهيزات منطقة 1", stage: "منشار" },
    { number: "982", zone: "منطقة 1", section: "تجهيزات منطقة 1", stage: "متقاب" },
    { number: "961", zone: "منطقة 1", section: "تجهيزات منطقة 1", stage: "متقاب" },
    { number: "263", zone: "منطقة 1", section: "تجهيزات منطقة 1", stage: "متقاب" },
    { number: "1522", zone: "منطقة 1", section: "لحام منطقة 1", stage: "كاب لوك ليدجير" },
    { number: "1521", zone: "منطقة 1", section: "لحام منطقة 1", stage: "كاب لوك ليدجير" },
    { number: "5004", zone: "منطقة 1", section: "لحام منطقة 1", stage: "كاب لوك ليدجير" },
    { number: "5003", zone: "منطقة 1", section: "لحام منطقة 1", stage: "كاب لوك ليدجير" },
    { number: "998", zone: "منطقة 1", section: "لحام منطقة 1", stage: "كاب لوك ليدجير" },
    { number: "999", zone: "منطقة 1", section: "لحام منطقة 1", stage: "كاب لوك ليدجير" },
    { number: "997", zone: "منطقة 1", section: "لحام منطقة 1", stage: "رينج لوك فيرتكال" },
    { number: "996", zone: "منطقة 1", section: "لحام منطقة 1", stage: "رينج لوك فيرتكال" },
    { number: "5006", zone: "منطقة 1", section: "لحام منطقة 1", stage: "رينج لوك فيرتكال" },
    { number: "5005", zone: "منطقة 1", section: "لحام منطقة 1", stage: "كاب" },
    { number: "450", zone: "منطقة 1", section: "لحام منطقة 1", stage: "كاب" },
    { number: "1523", zone: "منطقة 1", section: "لحام منطقة 1", stage: "كاب" },
    { number: "1524", zone: "منطقة 1", section: "لحام منطقة 1", stage: "كاب" },
    { number: "5008", zone: "منطقة 1", section: "لحام منطقة 1", stage: "فوله اوتوماتيك" },
    { number: "116", zone: "منطقة 1", section: "لحام منطقة 1", stage: "فوله يدوي" },
    { number: "404", zone: "منطقة 1", section: "لحام منطقة 1", stage: "فوله يدوي" },
    { number: "118", zone: "منطقة 1", section: "لحام منطقة 1", stage: "فوله يدوي" },
    { number: "455", zone: "منطقة 1", section: "لحام منطقة 1", stage: "فوله يدوي" },
    { number: "402", zone: "منطقة 1", section: "لحام منطقة 1", stage: "فوله يدوي" },
    { number: "1502", zone: "منطقة 1", section: "لحام منطقة 1", stage: "فرز" },
    { number: "279", zone: "منطقة 2", section: "تجهيزات منطقة 2", stage: "مكبس" },
    { number: "225", zone: "منطقة 2", section: "تجهيزات منطقة 2", stage: "مكبس" },
    { number: "956", zone: "منطقة 2", section: "تجهيزات منطقة 2", stage: "مكبس" },
    { number: "284", zone: "منطقة 2", section: "تجهيزات منطقة 2", stage: "مكبس" },
    { number: "1107", zone: "منطقة 2", section: "تجهيزات منطقة 2", stage: "مكبس تخريم" },
    { number: "1324", zone: "منطقة 2", section: "تجهيزات منطقة 2", stage: "مكبس تشكيل" },
    { number: "1313", zone: "منطقة 2", section: "تجهيزات منطقة 2", stage: "مكنه تشكيل" },
    { number: "1320", zone: "منطقة 2", section: "تجهيزات منطقة 2", stage: "مكنه تشكيل" },
    { number: "147", zone: "منطقة 2", section: "تجهيزات منطقة 2", stage: "مكنه تشكيل" },
    { number: "986", zone: "منطقة 2", section: "تجهيزات منطقة 2", stage: "متقاب" },
    { number: "1306", zone: "منطقة 2", section: "تجهيزات منطقة 2", stage: "متقاب" },
    { number: "963", zone: "منطقة 2", section: "تجهيزات منطقة 2", stage: "متقاب" },
    { number: "1317", zone: "منطقة 2", section: "تجهيزات منطقة 2", stage: "متقاب" },
    { number: "1318", zone: "منطقة 2", section: "تجهيزات منطقة 2", stage: "متقاب" },
    { number: "964", zone: "منطقة 2", section: "تجهيزات منطقة 2", stage: "متقاب" },
    { number: "954", zone: "منطقة 2", section: "تجهيزات منطقة 2", stage: "منشار" },
    { number: "1713", zone: "منطقة 2", section: "تجهيزات منطقة 2", stage: "متقاب متعدد" },
    { number: "112", zone: "منطقة 2", section: "لحام منطقة 2", stage: "فريم كوباية" },
    { number: "114", zone: "منطقة 2", section: "لحام منطقة 2", stage: "فريم كوباية" },
    { number: "477", zone: "منطقة 2", section: "لحام منطقة 2", stage: "فارمه يدوي" },
    { number: "1504", zone: "منطقة 2", section: "لحام منطقة 2", stage: "فارمه يدوي" },
    { number: "712", zone: "منطقة 2", section: "لحام منطقة 2", stage: "فارمه يدوي" },
    { number: "710", zone: "منطقة 2", section: "لحام منطقة 2", stage: "فارمه يدوي" },
    { number: "122", zone: "منطقة 2", section: "لحام منطقة 2", stage: "فارمه يدوي" },
    { number: "454", zone: "منطقة 2", section: "لحام منطقة 2", stage: "فارمه يدوي" },
    { number: "713", zone: "منطقة 2", section: "لحام منطقة 2", stage: "فارمه يدوي" },
    { number: "115", zone: "منطقة 2", section: "لحام منطقة 2", stage: "فارمه يدوي" },
    { number: "117", zone: "منطقة 2", section: "لحام منطقة 2", stage: "فارمه يدوي" },
    { number: "711", zone: "منطقة 2", section: "لحام منطقة 2", stage: "فارمه يدوي" },
    { number: "456", zone: "منطقة 2", section: "لحام منطقة 2", stage: "فارمه يدوي" },
    { number: "1501", zone: "منطقة 2", section: "لحام منطقة 2", stage: "ماكينه يدوي" },
    { number: "120", zone: "منطقة 2", section: "لحام منطقة 2", stage: "ماكينه يدوي" }
];

// قائمة الماكينات الفعلية: تبدأ بالقائمة الأصلية حتى لا تضيع أي ماكينة،
// ثم يمكن للإدارة إضافة/تعديل/حذف الماكينات وحفظها في Firebase.
let MACHINES = [...DEFAULT_MACHINES];
let machineSyncReady = false;

let FAULT_CODES = [
    { code: 1, name: "صيانه الماكينه" },
    { code: 2, name: "الصيانه الوقائية" },
    { code: 3, name: "ضبط الماكينه / بداية تشغيل" },
    { code: 4, name: "صيانه/ تصنيع اسطمبة" },
    { code: 5, name: "صيانه كهرباء" },
    { code: 6, name: "صيانه هواء" },
    { code: 7, name: "غياب او عدم وجود عمالة" },
    { code: 8, name: "عدم توافر خامه" },
    { code: 9, name: "انتظار من القسم السابق" },
    { code: 10, name: "توقف امن صناعي" },
    { code: 11, name: "انتظار كلارك" },
    { code: 12, name: "عطل ونش" },
    { code: 13, name: "تغيير اسطمبة" },
    { code: 14, name: "تدريب عمالة جديدة" },
    { code: 15, name: "توقف للجودة/للأصلاح" },
    { code: 16, name: "نقص ف الكربون" },
    { code: 17, name: "انقطاع كهرباء" }
];


// إعدادات شاشات الفنيين - تحفظ التوزيع الحالي كما هو، وتسمح للإدارة بتعديله لاحقًا.
const DEFAULT_TECH_SCREENS = [
    { id: 'electricity', name: '⚡ صيانة الكهرباء', codes: [5, 12] },
    { id: 'machines', name: '⚙️ صيانة الماكينات', codes: [1, 2] },
    { id: 'mechanics', name: '🔧 ورشة العدة', codes: [4, 13] },
    { id: 'air', name: '💨 صيانة الهواء', codes: [6] },
    { id: 'services', name: '🏗️ أمن وأوناش', codes: [10, 16] },
    { id: 'other', name: '🧰 أعطال فنية أخرى / أكواد جديدة', codes: [] }
];
let TECH_SCREENS = DEFAULT_TECH_SCREENS.map(x => ({...x, codes:[...x.codes]}));
let techScreensSyncReady = false;
function cloneDefaultTechScreens(){ return DEFAULT_TECH_SCREENS.map(x=>({...x,codes:[...x.codes]})); }
function getStoredTechScreens(){
    try {
        const saved=JSON.parse(localStorage.getItem('factory5_tech_screens_backup')||'null');
        if(Array.isArray(saved)&&saved.length) return saved.map((x,i)=>({id:String(x.id||('screen_'+i)),name:String(x.name||'شاشة فنيين'),codes:Array.isArray(x.codes)?x.codes.map(Number).filter(Number.isFinite):[]}));
    } catch(_){ }
    return cloneDefaultTechScreens();
}
function saveTechScreensLocal(list){ localStorage.setItem('factory5_tech_screens_backup',JSON.stringify(list)); }
function populateTechScreenCodeSelector(){
    const sel=document.getElementById('admin-tech-screen-codes'); if(!sel) return;
    sel.innerHTML='';
    FAULT_CODES.slice().sort((a,b)=>a.code-b.code).forEach(f=>{ const o=document.createElement('option'); o.value=f.code; o.textContent=`كود ${f.code} — ${f.name}`; sel.appendChild(o); });
}
function renderTechScreenManagementTable(){
    const tb=document.querySelector('#tech-screens-management-table tbody'); if(!tb) return;
    tb.innerHTML='';
    TECH_SCREENS.forEach(sc=>{ const tr=document.createElement('tr'); tr.innerHTML=`<td>${sc.name}</td><td>${sc.codes.length?sc.codes.join('، '):'بدون أكواد'}</td><td><button class="btn btn-secondary" onclick="editTechScreen('${sc.id}')">✏️ تعديل</button></td>`; tb.appendChild(tr); });
}
function setupTechScreensSync(){
    TECH_SCREENS=getStoredTechScreens(); saveTechScreensLocal(TECH_SCREENS); techScreensSyncReady=true; populateTechScreenCodeSelector(); renderTechScreenManagementTable(); renderTechDashboard();
    if(!rtdb) return;
    rtdb.ref('factory5_tech_screens').on('value',snap=>{
        const v=snap.val();
        if(v && typeof v==='object'){
            const list=Array.isArray(v)?v:Object.keys(v).sort().map(k=>v[k]);
            if(list.length){ TECH_SCREENS=list.map((x,i)=>({id:String(x.id||('screen_'+i)),name:String(x.name||'شاشة فنيين'),codes:Array.isArray(x.codes)?x.codes.map(Number).filter(Number.isFinite):[]})); saveTechScreensLocal(TECH_SCREENS); populateTechScreenCodeSelector(); renderTechScreenManagementTable(); renderTechDashboard(); }
        }
    });
}
function saveTechScreens(list){
    TECH_SCREENS=list.map(x=>({id:String(x.id),name:String(x.name||'شاشة فنيين'),codes:[...new Set((x.codes||[]).map(Number).filter(Number.isFinite))]}));
    saveTechScreensLocal(TECH_SCREENS); populateTechScreenCodeSelector(); renderTechScreenManagementTable(); renderTechDashboard();
    if(rtdb) { const obj={}; TECH_SCREENS.forEach(x=>obj[x.id]=x); rtdb.ref('factory5_tech_screens').set(obj); }
}
function clearTechScreenForm(){
    const id=document.getElementById('tech-screen-edit-id');
    const name=document.getElementById('admin-tech-screen-name');
    const sel=document.getElementById('admin-tech-screen-codes');
    const title=document.getElementById('tech-screen-form-title');
    const del=document.getElementById('delete-tech-screen-btn');
    if(id) id.value='';
    if(name) name.value='';
    if(sel) [...sel.options].forEach(o=>o.selected=false);
    if(title) title.textContent='➕ إضافة / تعديل شاشة';
    if(del) del.style.display='none';
}
window.editTechScreen=function(id){
    const sc=TECH_SCREENS.find(x=>String(x.id)===String(id)); if(!sc)return;
    document.getElementById('tech-screen-edit-id').value=sc.id;
    document.getElementById('admin-tech-screen-name').value=sc.name.replace(/^[^ء-ي٠-٩]*\s*/,'');
    const sel=document.getElementById('admin-tech-screen-codes');
    [...sel.options].forEach(o=>o.selected=sc.codes.includes(Number(o.value)));
    document.getElementById('tech-screen-form-title').textContent=`✏️ تعديل شاشة: ${sc.name}`;
    const del=document.getElementById('delete-tech-screen-btn'); if(del) del.style.display='inline-block';
};
function saveTechScreenFromAdmin(){
    const id=document.getElementById('tech-screen-edit-id').value.trim();
    const name=document.getElementById('admin-tech-screen-name').value.trim();
    const sel=document.getElementById('admin-tech-screen-codes');
    if(!name){ alert('اكتب اسم الشاشة أولاً.'); return; }
    const codes=[...sel.selectedOptions].map(o=>Number(o.value));
    if(id){
        const next=TECH_SCREENS.map(sc=>({ ...sc, codes: sc.id===id ? codes : sc.codes.filter(c=>!codes.includes(Number(c))) }));
        saveTechScreens(next);
        document.getElementById('tech-screen-management-status').textContent='✅ تم تعديل الشاشة وتوزيع الأكواد ومزامنتها مع واجهة الفنيين.';
    }else{
        let newId='screen_'+Date.now()+'_'+Math.random().toString(36).slice(2,8);
        const next=TECH_SCREENS.map(sc=>({ ...sc, codes: sc.codes.filter(c=>!codes.includes(Number(c))) }));
        next.push({id:newId,name,codes:[...new Set(codes)]});
        saveTechScreens(next);
        document.getElementById('tech-screen-management-status').textContent='✅ تم إضافة الشاشة الجديدة وتوزيع الأكواد ومزامنتها مع واجهة الفنيين.';
    }
    clearTechScreenForm();
}
function deleteTechScreenFromAdmin(){
    const id=document.getElementById('tech-screen-edit-id').value.trim();
    const sc=TECH_SCREENS.find(x=>String(x.id)===String(id));
    if(!id||!sc)return;
    if(!confirm(`هل تريد حذف شاشة «${sc.name}»؟\nسيتم حذف الشاشة فقط، ولن يتم حذف أي عطل أو كود أو بيانات تاريخية.`))return;
    saveTechScreens(TECH_SCREENS.filter(x=>String(x.id)!==String(id)));
    clearTechScreenForm();
    document.getElementById('tech-screen-management-status').textContent='🗑️ تم حذف الشاشة فقط، وجميع الأكواد والأعطال التاريخية محفوظة.';
}
function resetTechScreens(){ if(!confirm('استرجاع توزيع شاشات الفنيين الأصلي؟'))return; saveTechScreens(cloneDefaultTechScreens()); clearTechScreenForm(); document.getElementById('tech-screen-management-status').textContent='↩️ تم استرجاع التوزيع الأصلي.'; }
function renderTechDashboard(){
    const section=document.getElementById('tech-dashboard-section'); if(!section)return;
    const grid=section.querySelector('[data-tech-dynamic-grid]') || section.querySelector('div[style*="grid-template-columns"]'); if(!grid)return;
    grid.setAttribute('data-tech-dynamic-grid','1');
    const activeFaults=getStoredFaults().filter(f=>f.status==='active'||f.status==='awaiting_leader_receipt');
    grid.innerHTML='';
    TECH_SCREENS.forEach(sc=>{
        const box=document.createElement('div'); box.style.cssText='background:#fff;padding:15px;border-radius:8px;border-top:5px solid #64748b;box-shadow:0 2px 4px rgba(0,0,0,0.1);';
        const h=document.createElement('h3'); h.style.cssText='margin-top:0;color:#334155;border-bottom:1px solid #eee;padding-bottom:10px;'; h.textContent=`${sc.name} (${sc.codes.length? 'كود '+sc.codes.join('، ') : 'بدون أكواد'})`; box.appendChild(h);
        const holder=document.createElement('div');
        const list=activeFaults.filter(f=>sc.codes.includes(Number(f.faultCode)));
        holder.innerHTML=list.length?list.map(f=>createTechFaultCardHTML(f)).join(''):'<p class="no-data" style="color:#64748b;font-size:13px;">لا توجد أعطال حالياً.</p>';
        box.appendChild(holder); grid.appendChild(box);
    });
}
function createTechFaultCardHTML(fault){
    const start=fault.startTime?new Date(fault.startTime).toLocaleTimeString('ar-EG'):'-'; const dur=fault.startTime?formatDuration(getFaultDurationSeconds(fault),'seconds'):'0 ثانية';
    const waiting = fault.status === 'awaiting_leader_receipt';
    const statusHtml = waiting
        ? `<div style="background:#fef3c7;color:#92400e;border:1px solid #f59e0b;padding:8px;border-radius:6px;font-weight:bold;text-align:center;margin-bottom:10px;">🟡 تم إنهاء العطل — في انتظار استلام قائد الفريق</div>`
        : `<button class="btn btn-success btn-block" style="width:100%;padding:6px;" onclick="endFault('${fault.id}')">✅ تم الإصلاح وإنهاء العطل</button>`;
    return `<div class="fault-card" data-fault-id="${fault.id}" style="background:#fff;border:1px solid ${waiting?'#f59e0b':'#cbd5e1'};padding:12px;border-radius:6px;margin-bottom:10px;"><div style="font-weight:bold;color:${waiting?'#92400e':'#dc2626'};margin-bottom:8px;">${waiting?'🟡':'🔴'} ماكينة: ${fault.machineNumber||'غير معروف'}</div><div style="font-size:13px;color:#334155;margin-bottom:10px;"><p style="margin:3px 0;"><strong>المرحلة:</strong> ${fault.machineStage||'-'}</p><p style="margin:3px 0;"><strong>القسم:</strong> ${fault.machineSection||'-'} (${fault.machineZone||'-'})</p><p style="margin:3px 0;"><strong>العطل:</strong> كود ${fault.faultCode||'-'} — ${fault.faultName||'-'}</p><p style="margin:3px 0;"><strong>وقت البداية:</strong> ${start}</p><p style="margin:3px 0;"><strong>مدة التوقف:</strong> <span class="elapsed-time">${dur}</span></p>${waiting&&fault.endTime?`<p style="margin:3px 0;"><strong>وقت إنهاء الفني:</strong> ${new Date(fault.endTime).toLocaleTimeString('ar-EG')}</p>`:''}${fault.notes?`<p style="margin:3px 0;"><strong>ملاحظات:</strong> ${fault.notes}</p>`:''}</div>${statusHtml}</div>`;
}

function renderTeamLeaderDashboard(){
    const container=document.getElementById('team-leader-pending-faults');
    if(!container)return;
    const pending=getStoredFaults().filter(f=>f.status==='awaiting_leader_receipt');
    if(!pending.length){
        container.innerHTML='<p class="no-data" style="color:#64748b;text-align:center;padding:20px;">✅ لا توجد ماكينات في انتظار الاستلام من قائد الفريق.</p>';
        return;
    }
    container.innerHTML=pending.map(f=>{
        const start=f.startTime?new Date(f.startTime).toLocaleTimeString('ar-EG'):'-';
        const end=(f.technicianEndTime||f.endTime)?new Date(f.technicianEndTime||f.endTime).toLocaleTimeString('ar-EG'):'-';
        const dur=formatDuration(getFaultDurationSeconds(f),'seconds');
        return `<div class="fault-card" data-fault-id="${f.id}" style="background:#fff;border:2px solid #f59e0b;padding:14px;border-radius:8px;margin-bottom:12px;"><div style="font-weight:bold;color:#92400e;font-size:16px;margin-bottom:10px;">🟡 ماكينة جاهزة للاستلام: ${f.machineNumber||'غير معروف'}</div><div style="font-size:13px;color:#334155;margin-bottom:12px;"><p style="margin:4px 0;"><strong>المرحلة:</strong> ${f.machineStage||'-'}</p><p style="margin:4px 0;"><strong>القسم:</strong> ${f.machineSection||'-'} (${f.machineZone||'-'})</p><p style="margin:4px 0;"><strong>العطل:</strong> كود ${f.faultCode||'-'} — ${f.faultName||'-'}</p><p style="margin:4px 0;"><strong>بداية العطل:</strong> ${start}</p><p style="margin:4px 0;"><strong>انتهاء الفني:</strong> ${end}</p><p style="margin:4px 0;"><strong>إجمالي مدة التوقف:</strong> <span class="elapsed-time">${dur}</span></p>${f.notes?`<p style="margin:4px 0;"><strong>ملاحظات:</strong> ${f.notes}</p>`:''}</div><button class="btn btn-success btn-block" style="width:100%;padding:9px;font-weight:bold;" onclick="receiveMachineByTeamLeader('${f.id}')">✅ تم استلام الماكينة من الفني</button></div>`;
    }).join('');
}

window.receiveMachineByTeamLeader=function(faultId){
    const key=String(faultId);
    const faults=getStoredFaults();
    const fault=faults.find(f=>String(f.id)===key);
    if(!fault||fault.status!=='awaiting_leader_receipt'){
        renderTeamLeaderDashboard();
        return;
    }
    // هنا فقط يتوقف العداد وتُثبت المدة النهائية للعطل.
    const receiptTime = getSynchronizedNow();
    fault.endTime = receiptTime;
    fault.leaderReceiptTime = receiptTime;
    fault.durationSeconds = Number.isFinite(Number(fault.startTime))
        ? Math.max(0, (receiptTime - Number(fault.startTime)) / 1000)
        : Math.max(0, Number(fault.durationSeconds) || 0);
    fault.durationMinutes = fault.durationSeconds / 60;
    fault.receivedBy='قائد الفريق';
    fault.status='finished';
    saveStoredFaults(faults);
    loadFaultsFromStorage();
    renderTechDashboard();
    renderTeamLeaderDashboard();
    alert(`✅ تم استلام الماكينة ${fault.machineNumber||''} من الفني وتسجيلها كمغلقة نهائياً.`);
};

let faultCodesSyncReady = false;

function getStoredFaultCodes() {
    try {
        const saved = JSON.parse(localStorage.getItem("factory5_fault_codes_backup") || "null");
        if (Array.isArray(saved) && saved.length) {
            return saved.map(x => ({ code: Number(x.code), name: String(x.name || '').trim() }))
                .filter(x => Number.isFinite(x.code) && x.name);
        }
    } catch (_) {}
    return [...FAULT_CODES];
}

function saveFaultCodesLocal(codes) {
    const safe = (Array.isArray(codes) ? codes : [])
        .map(x => ({ code: Number(x.code), name: String(x.name || '').trim() }))
        .filter(x => Number.isFinite(x.code) && x.name)
        .sort((a,b) => a.code - b.code);
    localStorage.setItem("factory5_fault_codes_backup", JSON.stringify(safe));
}

function setupFaultCodesSync() {
    FAULT_CODES = getStoredFaultCodes();
    saveFaultCodesLocal(FAULT_CODES);
    faultCodesSyncReady = true;
    populateFaultCodes();
    updateFaultCodesManagementTable();

    if (!rtdb) return;
    rtdb.ref('factory5_fault_codes').on('value', (snapshot) => {
        const data = snapshot.val();
        if (data && typeof data === 'object') {
            const list = Array.isArray(data) ? data : Object.values(data);
            const clean = list.map(x => ({ code: Number(x.code), name: String(x.name || '').trim() }))
                .filter(x => Number.isFinite(x.code) && x.name)
                .sort((a,b) => a.code - b.code);
            if (clean.length) {
                FAULT_CODES = clean;
                saveFaultCodesLocal(FAULT_CODES);
            }
        }
        populateFaultCodes();
        updateFaultCodesManagementTable();
    });
}

function saveFaultCodes(codes) {
    const safe = (Array.isArray(codes) ? codes : [])
        .map(x => ({ code: Number(x.code), name: String(x.name || '').trim() }))
        .filter(x => Number.isFinite(x.code) && x.name)
        .sort((a,b) => a.code - b.code);
    FAULT_CODES = safe;
    saveFaultCodesLocal(safe);
    populateFaultCodes();
    updateFaultCodesManagementTable();
    if (rtdb) {
        const obj = {};
        safe.forEach(x => { obj[String(x.code)] = x; });
        rtdb.ref('factory5_fault_codes').set(obj);
    }
}

function clearFaultCodeForm() {
    const code = document.getElementById('admin-fault-code');
    const name = document.getElementById('admin-fault-name');
    const original = document.getElementById('fault-code-edit-original');
    const title = document.getElementById('fault-code-form-title');
    const cancel = document.getElementById('cancel-fault-code-edit-btn');
    if (code) code.value = '';
    if (name) name.value = '';
    if (original) original.value = '';
    if (title) title.textContent = '➕ إضافة كود عطل جديد';
    if (cancel) cancel.style.display = 'none';
}

window.editFaultCode = function(code) {
    const item = FAULT_CODES.find(x => String(x.code) === String(code));
    if (!item) return;
    document.getElementById('admin-fault-code').value = item.code;
    document.getElementById('admin-fault-name').value = item.name;
    document.getElementById('fault-code-edit-original').value = item.code;
    document.getElementById('fault-code-form-title').textContent = `✏️ تعديل كود ${item.code}`;
    document.getElementById('cancel-fault-code-edit-btn').style.display = 'inline-block';
    document.getElementById('admin-fault-code').focus();
};

window.deleteFaultCode = function(code) {
    const item = FAULT_CODES.find(x => String(x.code) === String(code));
    if (!item) return;
    if (!confirm(`هل أنت متأكد من حذف كود العطل ${item.code} — ${item.name}؟\n\nالحذف سيزيل الكود من قائمة تسجيل الأعطال فقط، ولن يحذف أي أعطال تاريخية مسجلة بهذا الكود.`)) return;
    saveFaultCodes(FAULT_CODES.filter(x => String(x.code) !== String(code)));
};

function saveFaultCodeFromAdmin() {
    const codeInput = document.getElementById('admin-fault-code');
    const nameInput = document.getElementById('admin-fault-name');
    const originalInput = document.getElementById('fault-code-edit-original');
    const status = document.getElementById('fault-code-management-status');
    const code = Number(String(codeInput?.value || '').trim());
    const name = String(nameInput?.value || '').trim();
    const original = String(originalInput?.value || '').trim();

    if (!Number.isInteger(code) || code < 1) {
        alert('من فضلك أدخل رقم كود صحيح (رقم صحيح أكبر من صفر).'); return;
    }
    if (!name) { alert('من فضلك اكتب اسم/وصف العطل.'); return; }

    const editing = original !== '';
    const duplicate = FAULT_CODES.find(x => String(x.code) === String(code) && String(x.code) !== original);
    if (duplicate) { alert(`كود ${code} موجود بالفعل. اختر كودًا آخر.`); return; }

    let next;
    if (editing) {
        const exists = FAULT_CODES.some(x => String(x.code) === original);
        if (!exists) { alert('الكود المراد تعديله غير موجود.'); clearFaultCodeForm(); return; }
        next = FAULT_CODES.map(x => String(x.code) === original ? { code, name } : x);
    } else {
        next = [...FAULT_CODES, { code, name }];
    }
    saveFaultCodes(next);
    if (status) status.textContent = editing ? '✅ تم تعديل كود العطل ومزامنته مع شاشة العامل.' : '✅ تم إضافة كود العطل ومزامنته مع شاشة العامل.';
    clearFaultCodeForm();
}

function updateFaultCodesManagementTable() {
    const tbody = document.querySelector('#fault-codes-management-table tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    if (!FAULT_CODES.length) {
        tbody.innerHTML = '<tr><td colspan="3" class="no-data">لا توجد أكواد أعطال حاليًا.</td></tr>';
        return;
    }
    FAULT_CODES.slice().sort((a,b) => a.code-b.code).forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>كود ${item.code}</td><td>${item.name}</td><td>
            <button class="btn btn-secondary" onclick="editFaultCode(${item.code})">✏️ تعديل</button>
            <button class="btn btn-danger" onclick="deleteFaultCode(${item.code})" style="margin-right:6px;">🗑️ حذف</button>
        </td>`;
        tbody.appendChild(tr);
    });
}


// ================================================================
// إعدادات معادلات التقارير - قابلة للتعديل من لوحة الإدارة
// المعادلة تُفسَّر بأمان ولا تسمح بتنفيذ JavaScript أو كود خارجي.
// ================================================================
const DEFAULT_FORMULA_SETTINGS = {
    daily: 'downtime / 52200 * 100',
    shift1: 'shift1Downtime / shift1Operating * 100',
    shift2: 'shift2Downtime / shift2Operating * 100',
    monthly: 'downtime / operating * 100'
};
let FORMULA_SETTINGS = { ...DEFAULT_FORMULA_SETTINGS };
let formulaSettingsSyncReady = false;

function cloneDefaultFormulaSettings() { return { ...DEFAULT_FORMULA_SETTINGS }; }
function getStoredFormulaSettings() {
    try {
        const saved = JSON.parse(localStorage.getItem('factory5_formula_settings_backup') || 'null');
        if (saved && typeof saved === 'object') {
            return {
                daily: String(saved.daily || DEFAULT_FORMULA_SETTINGS.daily),
                shift1: String(saved.shift1 || DEFAULT_FORMULA_SETTINGS.shift1),
                shift2: String(saved.shift2 || DEFAULT_FORMULA_SETTINGS.shift2),
                monthly: String(saved.monthly || DEFAULT_FORMULA_SETTINGS.monthly)
            };
        }
    } catch (_) {}
    return cloneDefaultFormulaSettings();
}
function saveFormulaSettingsLocal(settings) {
    localStorage.setItem('factory5_formula_settings_backup', JSON.stringify(settings));
}
function populateFormulaSettingsForm() {
    const map = { daily: 'formula-daily', shift1: 'formula-shift1', shift2: 'formula-shift2', monthly: 'formula-monthly' };
    Object.keys(map).forEach(key => {
        const el = document.getElementById(map[key]);
        if (el) el.value = FORMULA_SETTINGS[key] || DEFAULT_FORMULA_SETTINGS[key];
    });
}
function normalizeFormulaExpression(expression) {
    return String(expression || '')
        .replace(/[×xX]/g, '*')
        .replace(/[÷]/g, '/')
        .replace(/[٪%]/g, '')
        .replace(/[−–—]/g, '-')
        .replace(/,/g, '.')
        .trim();
}

function evaluateSafeFormula(expression, variables) {
    const input = normalizeFormulaExpression(expression);
    if (!input) throw new Error('المعادلة فارغة');
    const tokens = input.match(/[A-Za-z_][A-Za-z0-9_]*|(?:\d+(?:\.\d*)?|\.\d+)|[()+\-*/]/g);
    if (!tokens || tokens.join('') !== input.replace(/\s+/g, '')) throw new Error('المعادلة تحتوي على رمز غير مسموح');
    let pos = 0;
    const getValue = name => {
        if (Object.prototype.hasOwnProperty.call(variables, name)) return Number(variables[name]) || 0;
        throw new Error(`المتغير ${name} غير معروف`);
    };
    function parseExpression() {
        let value = parseTerm();
        while (tokens[pos] === '+' || tokens[pos] === '-') {
            const op = tokens[pos++];
            const rhs = parseTerm();
            value = op === '+' ? value + rhs : value - rhs;
        }
        return value;
    }
    function parseTerm() {
        let value = parseFactor();
        while (tokens[pos] === '*' || tokens[pos] === '/') {
            const op = tokens[pos++];
            const rhs = parseFactor();
            if (op === '/') {
                if (rhs === 0) throw new Error('لا يمكن القسمة على صفر');
                value /= rhs;
            } else value *= rhs;
        }
        return value;
    }
    function parseFactor() {
        const token = tokens[pos];
        if (token === '+') { pos++; return parseFactor(); }
        if (token === '-') { pos++; return -parseFactor(); }
        if (token === '(') {
            pos++;
            const value = parseExpression();
            if (tokens[pos] !== ')') throw new Error('قوس غير مغلق');
            pos++;
            return value;
        }
        if (!token) throw new Error('المعادلة غير مكتملة');
        pos++;
        if (/^[A-Za-z_]/.test(token)) return getValue(token);
        const number = Number(token);
        if (!Number.isFinite(number)) throw new Error('رقم غير صالح');
        return number;
    }
    const result = parseExpression();
    if (pos !== tokens.length) throw new Error('المعادلة غير مكتملة أو بها ترتيب غير صحيح');
    if (!Number.isFinite(result)) throw new Error('نتيجة المعادلة غير صالحة');
    return result;
}
function calculateReportFormula(type, variables, fallback) {
    try {
        const expression = FORMULA_SETTINGS[type] || DEFAULT_FORMULA_SETTINGS[type];
        const value = evaluateSafeFormula(expression, variables);
        return Number.isFinite(value) ? value : fallback;
    } catch (_) {
        return fallback;
    }
}
function setupFormulaSettingsSync() {
    FORMULA_SETTINGS = getStoredFormulaSettings();
    saveFormulaSettingsLocal(FORMULA_SETTINGS);
    formulaSettingsSyncReady = true;
    populateFormulaSettingsForm();
    if (!rtdb) return;
    rtdb.ref('factory5_formula_settings').on('value', snap => {
        const value = snap.val();
        if (value && typeof value === 'object') {
            FORMULA_SETTINGS = {
                daily: String(value.daily || DEFAULT_FORMULA_SETTINGS.daily),
                shift1: String(value.shift1 || DEFAULT_FORMULA_SETTINGS.shift1),
                shift2: String(value.shift2 || DEFAULT_FORMULA_SETTINGS.shift2),
                monthly: String(value.monthly || DEFAULT_FORMULA_SETTINGS.monthly)
            };
            saveFormulaSettingsLocal(FORMULA_SETTINGS);
            populateFormulaSettingsForm();
            if (document.getElementById('tab-machines')?.classList.contains('active')) updateMachinesPerformanceTable();
        }
    });
}
function saveFormulaSettingsFromAdmin() {
    const ids = { daily: 'formula-daily', shift1: 'formula-shift1', shift2: 'formula-shift2', monthly: 'formula-monthly' };
    const next = {};
    for (const key of Object.keys(ids)) {
        const el = document.getElementById(ids[key]);
        const expression = normalizeFormulaExpression(el ? el.value : '');
        if (!expression) { alert(`اكتب معادلة ${key === 'daily' ? 'التعطل اليومية' : key === 'shift1' ? 'الوردية الأولى' : key === 'shift2' ? 'الوردية الثانية' : 'النسبة الشهرية'} أولاً.`); return; }
        try { evaluateSafeFormula(expression, { downtime: 1, operating: 1, totalDowntime: 1, dailyOperating: 1, shift1Downtime: 1, shift2Downtime: 1, shift1Operating: 1, shift2Operating: 1 }); }
        catch (err) { alert(`المعادلة غير صحيحة: ${err.message}`); return; }
        next[key] = expression;
    }
    FORMULA_SETTINGS = next;
    saveFormulaSettingsLocal(FORMULA_SETTINGS);
    if (rtdb) rtdb.ref('factory5_formula_settings').set(FORMULA_SETTINGS);
    const status = document.getElementById('formula-settings-status');
    if (status) { status.textContent = '✅ تم حفظ المعادلات ومزامنتها. التقارير ستستخدمها فورًا.'; status.style.color = '#16a34a'; }
    updateMachinesPerformanceTable();
}
function resetFormulaSettingsFromAdmin() {
    FORMULA_SETTINGS = cloneDefaultFormulaSettings();
    saveFormulaSettingsLocal(FORMULA_SETTINGS);
    populateFormulaSettingsForm();
    if (rtdb) rtdb.ref('factory5_formula_settings').set(FORMULA_SETTINGS);
    const status = document.getElementById('formula-settings-status');
    if (status) { status.textContent = '↩️ تم استرجاع المعادلات الأصلية وحفظها.'; status.style.color = '#2563eb'; }
    updateMachinesPerformanceTable();
}

let selectedMachine = null;
let html5QrCode = null;
let paretoChartInstance = null;
let cachedFaults = [];
let firebaseFaultsSyncReady = false;
let serverTimeOffsetMs = 0;
let serverTimeSyncReady = false;

// ================================================================
// تنبيهات صوتية فورية بين الشاشات
// - جرس مختلف عند تسجيل عطل جديد لشاشة الصيانة.
// - جرس مختلف عند استلام قائد الفريق للماكينة لشاشة الصيانة.
// الأصوات مولدة محلياً عبر Web Audio ولا تحتاج أي ملفات أو خدمة خارجية.
// ================================================================
let alertAudioContext = null;
let alertAudioReady = false;
let faultAlertStateById = new Map();
let faultAlertBaselineReady = false;

function ensureAlertAudioReady() {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return false;
        if (!alertAudioContext) alertAudioContext = new AudioCtx();
        if (alertAudioContext.state === 'suspended') alertAudioContext.resume().catch(() => {});
        alertAudioReady = alertAudioContext.state === 'running';
        return true;
    } catch (_) {
        return false;
    }
}

function playAlertToneSequence(notes, options = {}) {
    if (!ensureAlertAudioReady() || !alertAudioContext) return;
    const ctx = alertAudioContext;
    const now = ctx.currentTime + 0.02;
    const gap = Number(options.gap ?? 0.08);
    const noteDuration = Number(options.duration ?? 0.18);
    const volume = Number(options.volume ?? 0.065);

    notes.forEach((frequency, index) => {
        const start = now + index * (noteDuration + gap);
        const oscillator = ctx.createOscillator();
        const gain = ctx.createGain();
        oscillator.type = options.type || 'sine';
        oscillator.frequency.setValueAtTime(Number(frequency), start);
        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.exponentialRampToValueAtTime(Math.max(0.001, volume), start + 0.018);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + noteDuration);
        oscillator.connect(gain);
        gain.connect(ctx.destination);
        oscillator.start(start);
        oscillator.stop(start + noteDuration + 0.02);
    });
}

function playNewFaultAlert() {
    // جرس عطل جديد: تنبيه طويل وواضح (عدة تكرارات) حتى يلفت انتباه الفنيين.
    // النغمة مختلفة عن جرس استلام قائد الفريق.
    const notes = [
        880, 1174.66, 1396.91, 1174.66,
        880, 1174.66, 1396.91, 1174.66,
        880, 1174.66, 1396.91, 1567.98,
        1396.91, 1174.66, 880
    ];
    playAlertToneSequence(notes, { duration: 0.22, gap: 0.10, volume: 0.10, type: 'square' });
}

function playLeaderReceiptAlert() {
    // جرس استلام قائد الفريق: تنبيه طويل بنمط مختلف تماماً عن جرس العطل الجديد.
    const notes = [
        523.25, 659.25, 783.99, 659.25,
        523.25, 659.25, 783.99, 880,
        783.99, 659.25, 523.25,
        783.99, 659.25, 523.25
    ];
    playAlertToneSequence(notes, { duration: 0.27, gap: 0.13, volume: 0.095, type: 'triangle' });
}

function monitorFaultAlerts(nextFaults) {
    const list = Array.isArray(nextFaults) ? nextFaults : [];
    const nextState = new Map();
    list.forEach(f => {
        if (f && f.id != null) nextState.set(String(f.id), f.status || '');
    });

    // أول تحميل = تأسيس الحالة فقط، بدون تشغيل جرس للأعطال القديمة.
    if (!faultAlertBaselineReady) {
        faultAlertStateById = nextState;
        faultAlertBaselineReady = true;
        return;
    }

    // الجرس لا يعمل إلا عندما تكون شاشة إدارة الصيانة هي الواجهة الحالية.
    const maintenanceScreenOpen = document.body.classList.contains('factory5-role-tech');
    if (!maintenanceScreenOpen) {
        faultAlertStateById = nextState;
        return;
    }

    let newFaultDetected = false;
    let leaderReceiptDetected = false;

    nextState.forEach((status, id) => {
        const previousStatus = faultAlertStateById.get(id);
        if (status === 'active' && previousStatus !== 'active' && previousStatus !== 'awaiting_leader_receipt') {
            newFaultDetected = true;
        }
        if (status === 'finished' && previousStatus === 'awaiting_leader_receipt') {
            leaderReceiptDetected = true;
        }
    });

    faultAlertStateById = nextState;

    if (newFaultDetected) playNewFaultAlert();
    if (leaderReceiptDetected) playLeaderReceiptAlert();
}

document.addEventListener("DOMContentLoaded", () => {
    // عند فتح الرابط دائماً تظهر شاشة الدخول الرئيسية أولاً.
    // تسجيل الأعطال متاح من شاشة الدخول بدون كلمة مرور، بينما باقي الواجهات محمية.
    const initialTech = document.getElementById("tech-dashboard-section");
    const initialLeader = document.getElementById("team-leader-dashboard-section");
    const initialAdmin = document.getElementById("admin-panel");
    if (initialTech) initialTech.classList.add("hidden");
    if (initialLeader) initialLeader.classList.add("hidden");
    if (initialAdmin) initialAdmin.classList.add("hidden");
    document.body.classList.remove("factory5-role-worker", "factory5-role-tech", "factory5-role-leader", "factory5-role-admin");
    setupMachinePerformanceFilter();
    initClock();
    populateFaultCodes();
    setupRealtimeSync();
    setupLiveFaultRefresh();
    setupServerClockSync();
    setupMachineSync();
    setupFaultCodesSync();
    setupTechScreensSync();
    setupFormulaSettingsSync();
    setupEventListeners();
    restoreAdminStateOnLoad();
});

// مزامنة فورية إضافية للأعطال المفتوحة: تعتمد على Firebase مباشرة
// مع الاحتفاظ بالـ on(value) الأساسي. هذا يضمن أن شاشة الفنيين وشاشة العامل
// تتحدث حتى لو تأخر حدث Firebase في المتصفح أو كان هناك تبويب قديم.
let liveFaultPollTimer = null;
let liveFaultLastSignature = "";
function setupLiveFaultRefresh() {
    if (!rtdb || liveFaultPollTimer) return;
    const refresh = () => {
        rtdb.ref('factory5_faults').once('value').then(snapshot => {
            const data = snapshot.val();
            const next = data && typeof data === 'object' ? Object.values(data) : [];
            const signature = JSON.stringify(next.map(f => ({
                id: f && f.id, status: f && f.status, startTime: f && f.startTime,
                endTime: f && f.endTime, durationSeconds: f && f.durationSeconds
            })).sort((a,b) => String(a.id).localeCompare(String(b.id))));
            if (signature !== liveFaultLastSignature) {
                liveFaultLastSignature = signature;
                applyFirebaseFaultSnapshot(data);
            }
        }).catch(() => {});
    };
    refresh();
    liveFaultPollTimer = setInterval(refresh, 1000);
}

function applyFirebaseFaultSnapshot(data) {
    firebaseFaultsSyncReady = true;
    cachedFaults = data && typeof data === 'object' ? Object.values(data) : [];

    // فحص التغييرات قبل إعادة الرسم حتى يصل التنبيه الصوتي فوراً للشاشة الصحيحة.
    monitorFaultAlerts(cachedFaults);

    // Firebase هو المصدر الموحد بين كل الأجهزة؛ النسخة المحلية مجرد احتياطية.
    localStorage.setItem("factory5_faults_backup", JSON.stringify(cachedFaults));

    // تحديث واجهة العامل وشاشات الفنيين فورًا من نفس البيانات القادمة من Firebase.
    loadFaultsFromStorage();
    renderTechDashboard();
    renderTeamLeaderDashboard();
    updateLiveFaultDurations();

    const activeTab = sessionStorage.getItem("factory5_active_tab") || "tab-indicators";
    const adminPanel = document.getElementById("admin-panel");
    if (adminPanel && !adminPanel.classList.contains("hidden")) {
        if (activeTab === "tab-indicators") updateIndicators();
        else if (activeTab === "tab-machines") updateMachinesPerformanceTable();
        else if (activeTab === "tab-machine-management") updateMachineManagementTable();
        else if (activeTab === "tab-pareto") updateParetoTable();
        else if (activeTab === "tab-logs") updateFullLogsTable();
    }
}

function setupRealtimeSync() {
    if (!rtdb) return;
    const faultsRef = rtdb.ref('factory5_faults');

    // المستمع الأساسي: أي تغيير في أي عطل يعيد رسم الواجهات فورًا.
    faultsRef.on('value', (snapshot) => {
        applyFirebaseFaultSnapshot(snapshot.val());
    });

    // مستمعون إضافيون على مستوى العطل نفسه لضمان التحديث الفوري حتى مع تبويب/متصفح
    // يتأخر في معالجة حدث value. هذه الأحداث لا تكتب أي بيانات؛ فقط تعيد الرسم.
    const refreshFromFirebase = () => {
        faultsRef.once('value').then(snapshot => applyFirebaseFaultSnapshot(snapshot.val())).catch(() => {});
    };
    faultsRef.on('child_added', refreshFromFirebase);
    faultsRef.on('child_changed', refreshFromFirebase);
    faultsRef.on('child_removed', refreshFromFirebase);
}

function getStoredMachines() {
    try {
        const saved = JSON.parse(localStorage.getItem("factory5_machines_backup") || "null");
        if (Array.isArray(saved) && saved.length) return saved;
    } catch (_) {}
    return [...DEFAULT_MACHINES];
}

function saveMachinesLocal(machines) {
    const safe = Array.isArray(machines) ? machines : [];
    localStorage.setItem("factory5_machines_backup", JSON.stringify(safe));
}

function setupMachineSync() {
    // نحتفظ بنسخة محلية أولاً حتى يظل المشروع يعمل حتى مع انقطاع الإنترنت.
    MACHINES = getStoredMachines();
    saveMachinesLocal(MACHINES);
    machineSyncReady = true;

    if (!rtdb) {
        updateMachineManagementTable();
        return;
    }

    rtdb.ref('factory5_machines').on('value', (snapshot) => {
        const data = snapshot.val();
        if (data && typeof data === 'object') {
            const list = Array.isArray(data) ? data : Object.values(data);
            const clean = list.filter(m => m && m.number !== undefined && String(m.number).trim() !== '')
                .map(m => ({
                    number: String(m.number).trim(),
                    zone: String(m.zone || '').trim(),
                    section: String(m.section || '').trim(),
                    stage: String(m.stage || '').trim()
                }));
            if (clean.length) {
                MACHINES = clean;
                saveMachinesLocal(MACHINES);
                populateMachinePerformanceFilter();
            }
        }
        updateMachineManagementTable();
        updateMachinesPerformanceTable();
    });
}

function saveMachines(machines) {
    const safe = (Array.isArray(machines) ? machines : [])
        .filter(m => m && String(m.number || '').trim())
        .map(m => ({
            number: String(m.number).trim(),
            zone: String(m.zone || '').trim(),
            section: String(m.section || '').trim(),
            stage: String(m.stage || '').trim()
        }));

    MACHINES = safe;
    saveMachinesLocal(safe);
    populateMachinePerformanceFilter();

    if (rtdb) {
        const obj = {};
        safe.forEach((m, index) => { obj[String(index)] = m; });
        rtdb.ref('factory5_machines').set(obj);
    }
    updateMachineManagementTable();
    updateMachinesPerformanceTable();
}

function clearMachineForm() {
    const ids = ['admin-machine-number','admin-machine-zone','admin-machine-section','admin-machine-stage'];
    ids.forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
    const original = document.getElementById('machine-edit-original-number');
    if (original) original.value = '';
    const title = document.getElementById('machine-form-title');
    if (title) title.textContent = '➕ إضافة ماكينة جديدة';
    const cancel = document.getElementById('cancel-machine-edit-btn');
    if (cancel) cancel.style.display = 'none';
}

function editMachine(machineNumber) {
    const machine = MACHINES.find(m => String(m.number) === String(machineNumber));
    if (!machine) return;
    document.getElementById('admin-machine-number').value = machine.number;
    document.getElementById('admin-machine-zone').value = machine.zone || '';
    document.getElementById('admin-machine-section').value = machine.section || '';
    document.getElementById('admin-machine-stage').value = machine.stage || '';
    document.getElementById('machine-edit-original-number').value = machine.number;
    document.getElementById('machine-form-title').textContent = `✏️ تعديل الماكينة ${machine.number}`;
    document.getElementById('cancel-machine-edit-btn').style.display = 'inline-block';
    document.getElementById('admin-machine-number').focus();
    document.getElementById('tab-machine-management').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function saveMachineFromAdmin() {
    const number = document.getElementById('admin-machine-number').value.trim();
    const zone = document.getElementById('admin-machine-zone').value.trim();
    const section = document.getElementById('admin-machine-section').value.trim();
    const stage = document.getElementById('admin-machine-stage').value.trim();
    const originalNumber = document.getElementById('machine-edit-original-number').value.trim();
    const status = document.getElementById('machine-management-status');

    if (!number) {
        if (status) { status.textContent = 'من فضلك أدخل رقم الماكينة.'; status.style.color = '#dc2626'; }
        return;
    }

    const duplicate = MACHINES.some(m => String(m.number).trim() === number && String(m.number).trim() !== originalNumber);
    if (duplicate) {
        if (status) { status.textContent = `الماكينة ${number} موجودة بالفعل.`; status.style.color = '#dc2626'; }
        return;
    }

    const newMachine = { number, zone, section, stage };
    let next = [...MACHINES];
    if (originalNumber) {
        const idx = next.findIndex(m => String(m.number).trim() === originalNumber);
        if (idx < 0) {
            if (status) { status.textContent = 'الماكينة الأصلية غير موجودة.'; status.style.color = '#dc2626'; }
            return;
        }
        next[idx] = newMachine;
    } else {
        next.push(newMachine);
    }

    saveMachines(next);
    clearMachineForm();
    if (status) { status.textContent = `تم حفظ الماكينة ${number} بنجاح.`; status.style.color = '#16a34a'; }
}

function deleteMachine(machineNumber) {
    const machine = MACHINES.find(m => String(m.number) === String(machineNumber));
    if (!machine) return;
    const ok = confirm(`هل أنت متأكد من حذف الماكينة ${machine.number} من قائمة الماكينات؟\n\nسيتم حذفها من القائمة فقط، ولن يتم حذف أي أعطال أو تقارير تاريخية مسجلة عليها.`);
    if (!ok) return;
    saveMachines(MACHINES.filter(m => String(m.number) !== String(machineNumber)));
    const status = document.getElementById('machine-management-status');
    if (status) { status.textContent = `تم حذف الماكينة ${machine.number} من القائمة. البيانات التاريخية محفوظة.`; status.style.color = '#16a34a'; }
}

function generateMachineQR(container, number) {
    if (!container || typeof QRCode === 'undefined') return;
    container.innerHTML = '';
    new QRCode(container, {
        text: String(number),
        width: 110,
        height: 110,
        correctLevel: QRCode.CorrectLevel.M
    });
}

function printMachineQR(machineNumber) {
    if (typeof QRCode === 'undefined') {
        alert('مكتبة QR غير متوفرة حالياً. تأكد من وجود الإنترنت ثم أعد تحميل الصفحة.');
        return;
    }
    const holder = document.createElement('div');
    holder.style.position = 'fixed';
    holder.style.left = '-10000px';
    holder.style.top = '0';
    document.body.appendChild(holder);
    new QRCode(holder, { text: String(machineNumber), width: 300, height: 300, correctLevel: QRCode.CorrectLevel.M });
    setTimeout(() => {
        const img = holder.querySelector('img');
        const canvas = holder.querySelector('canvas');
        const src = img ? img.src : (canvas ? canvas.toDataURL('image/png') : '');
        document.body.removeChild(holder);
        if (!src) return alert('تعذر تجهيز QR للطباعة.');
        const win = window.open('', '_blank');
        if (!win) return alert('المتصفح منع نافذة الطباعة. اسمح بالنوافذ المنبثقة ثم حاول مرة أخرى.');
        win.document.write(`<html lang="ar" dir="rtl"><head><title>QR ماكينة ${machineNumber}</title><style>body{font-family:Tahoma,Arial;text-align:center;padding:30px}img{width:300px;height:300px}.num{font-size:28px;font-weight:bold;margin-top:15px}</style></head><body><h2>كود QR للماكينة</h2><img src="${src}" alt="QR"><div class="num">ماكينة ${machineNumber}</div><script>window.onload=function(){window.print();}</script></body></html>`);
        win.document.close();
    }, 250);
}

function updateMachineManagementTable() {
    const tbody = document.querySelector('#machine-management-table tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    if (!MACHINES.length) {
        tbody.innerHTML = '<tr><td colspan="6" class="no-data">لا توجد ماكينات في القائمة.</td></tr>';
        return;
    }
    MACHINES.forEach(machine => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${machine.number}</strong></td>
            <td>${machine.stage || '-'}</td>
            <td>${machine.zone || '-'}</td>
            <td>${machine.section || '-'}</td>
            <td><div id="qr-machine-${String(machine.number).replace(/[^a-zA-Z0-9_-]/g, '_')}" style="width:110px; min-height:110px; margin:auto;"></div><div style="font-size:11px; margin-top:3px;">يمسح مباشرة كرقم ${machine.number}</div></td>
            <td style="white-space:nowrap;">
                <button class="btn btn-secondary" style="padding:5px 8px; margin:2px;" onclick="editMachine('${String(machine.number).replace(/'/g, "\\'")}')">✏️ تعديل</button>
                <button class="btn btn-danger" style="padding:5px 8px; margin:2px;" onclick="deleteMachine('${String(machine.number).replace(/'/g, "\\'")}')">🗑 حذف</button>
                <button class="btn btn-primary" style="padding:5px 8px; margin:2px;" onclick="printMachineQR('${String(machine.number).replace(/'/g, "\\'")}')">🖨️ طباعة QR</button>
            </td>
        `;
        tbody.appendChild(tr);
        const qrId = `qr-machine-${String(machine.number).replace(/[^a-zA-Z0-9_-]/g, '_')}`;
        generateMachineQR(document.getElementById(qrId), machine.number);
    });
}

window.editMachine = editMachine;
window.deleteMachine = deleteMachine;
window.printMachineQR = printMachineQR;

// مزامنة الساعة مع ساعة Firebase حتى تستخدم كل الأجهزة (لاب/موبايل/كمبيوتر)
// نفس المرجع الزمني، مهما كان ضبط ساعة الجهاز المحلي مختلفًا.
function setupServerClockSync() {
    if (!rtdb) return;
    rtdb.ref('.info/serverTimeOffset').on('value', (snapshot) => {
        const value = Number(snapshot.val());
        serverTimeOffsetMs = Number.isFinite(value) ? value : 0;
        serverTimeSyncReady = true;
        // إعادة رسم المدد فور وصول المزامنة.
        updateLiveFaultDurations(getSynchronizedNow());
    });
}

function getSynchronizedNow() {
    return Date.now() + (serverTimeSyncReady ? serverTimeOffsetMs : 0);
}

function initClock() {
    const clockEl = document.getElementById("live-clock");
    const updateClock = () => {
        const nowMs = getSynchronizedNow();
        const now = new Date(nowMs);
        if (clockEl) clockEl.textContent = now.toLocaleTimeString("ar-EG");

        // الساعة الظاهرة ومدة العطل يستخدمان نفس التوقيت الموحد.
        updateLiveFaultDurations(nowMs);
    };
    updateClock();
    setInterval(updateClock, 1000);
}

function updateLiveFaultDurations(nowMs = getSynchronizedNow()) {
    const cards = document.querySelectorAll(".fault-card[data-fault-id]");
    cards.forEach(card => {
        const faultId = card.getAttribute("data-fault-id");
        const fault = getStoredFaults().find(f => {
            if (String(f.id) !== String(faultId)) return false;
            return f.status === "active" || f.status === "awaiting_leader_receipt";
        });
        if (!fault) {
            // لا نحذف بطاقة الانتظار بسبب تحديث العداد؛ الحذف يكون فقط بعد استلام قائد الفريق.
            card.remove();
            return;
        }
        const durationEl = card.querySelector(".elapsed-time");
        if (durationEl) durationEl.textContent = formatDuration(getFaultDurationSeconds(fault, nowMs), "seconds");
    });
}

function populateFaultCodes() {
    const select = document.getElementById("fault-select");
    if (!select) return;
    select.innerHTML = '<option value="">-- اختر العطل من القائمة الرسمية --</option>';
    FAULT_CODES.forEach(fault => {
        const option = document.createElement("option");
        option.value = fault.code;
        option.textContent = `كود ${fault.code} — ${fault.name}`;
        select.appendChild(option);
    });
}

function getStoredFaults() {
    // المصدر الأساسي هو Firebase، مع نسخة احتياطية محلية حتى لا تضيع البيانات
    // إذا تم إغلاق الصفحة أو حدث انقطاع مؤقت في الاتصال.
    // بعد الاتصال بـFirebase يكون هو المصدر الفعلي، حتى لو كانت القائمة فارغة
    // (وبالتالي الحذف ينعكس فورًا ولا تعود نسخة localStorage القديمة).
    if (firebaseFaultsSyncReady) return cachedFaults;
    try {
        const backup = JSON.parse(localStorage.getItem("factory5_faults_backup") || "[]");
        return Array.isArray(backup) ? backup : [];
    } catch (_) {
        return [];
    }
}

function saveStoredFaults(faults) {
    const safeFaults = Array.isArray(faults) ? faults : [];
    cachedFaults = safeFaults;

    // نسخة احتياطية محلية: لا يتم مسح الأعطال عند الخروج من الصفحة.
    localStorage.setItem("factory5_faults_backup", JSON.stringify(safeFaults));

    if (!rtdb) return;
    const faultsObj = {};
    safeFaults.forEach(f => {
        if (f && f.id) faultsObj[f.id] = f;
    });
    rtdb.ref('factory5_faults').set(faultsObj);
}

// حساب مدة العطل بدقة من الطابع الزمني الحقيقي (Date.now) دون تقريب للدقائق.
// السجلات الجديدة تعتمد دائماً على startTime/endTime، مع الإبقاء على دعم
// durationSeconds/durationMinutes للسجلات القديمة حتى لا تضيع أي بيانات.
function getFaultDurationSeconds(fault, nowMs = getSynchronizedNow()) {
    if (!fault) return 0;

    // أثناء انتظار استلام قائد الفريق يظل عداد العطل شغالاً حتى لحظة الاستلام.
    // endTime لا يتم تسجيله عند ضغط الفني على "تم الإصلاح"؛ بل عند استلام قائد الفريق فقط.
    if (Number.isFinite(Number(fault.startTime))) {
        const isWaitingForLeader = fault.status === "awaiting_leader_receipt";
        const end = isWaitingForLeader
            ? nowMs
            : (Number.isFinite(Number(fault.endTime)) ? Number(fault.endTime) : nowMs);
        return Math.max(0, (end - Number(fault.startTime)) / 1000);
    }

    if (Number.isFinite(Number(fault.durationSeconds))) return Math.max(0, Number(fault.durationSeconds));
    if (Number.isFinite(Number(fault.durationMinutes))) return Math.max(0, Number(fault.durationMinutes) * 60);
    return 0;
}

function getFaultDurationMinutes(fault, nowMs = Date.now()) {
    return getFaultDurationSeconds(fault, nowMs) / 60;
}

// العرض يعتمد على الثواني الصحيحة المكتملة، بدون تحويل 10 ثوانٍ إلى دقيقة
// وبدون تقريب 61 ثانية إلى دقيقتين. ويدعم الساعات تلقائياً.
function formatDuration(value, unit = "minutes") {
    if (value === null || value === undefined || isNaN(value)) return "-";
    const totalSeconds = Math.max(0, Math.floor(unit === "seconds" ? Number(value) : Number(value) * 60));
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
        const parts = [`${hours} ساعة`];
        if (minutes > 0) parts.push(`${minutes} دقيقة`);
        if (seconds > 0) parts.push(`${seconds} ثانية`);
        return parts.join(" و ");
    }
    if (minutes > 0) {
        return seconds > 0 ? `${minutes} دقيقة و ${seconds} ثانية` : `${minutes} دقيقة`;
    }
    return `${seconds} ثانية`;
}

// دالة التنقل بين تبويبات لوحة الإدارة العامة
window.switchAdminTab = function(tabId) {
    const tabBtns = document.querySelectorAll(".tab-btn");
    const tabPanes = document.querySelectorAll(".tab-pane");

    tabBtns.forEach(b => {
        if (b.getAttribute("data-tab") === tabId) b.classList.add("active");
        else b.classList.remove("active");
    });

    tabPanes.forEach(p => {
        if (p.id === tabId) p.classList.add("active");
        else p.classList.remove("active");
    });

    sessionStorage.setItem("factory5_active_tab", tabId);

    if (tabId === "tab-indicators") updateIndicators();
    else if (tabId === "tab-machines") updateMachinesPerformanceTable();
    else if (tabId === "tab-machine-management") updateMachineManagementTable();
    else if (tabId === "tab-formula-settings") populateFormulaSettingsForm();
    else if (tabId === "tab-pareto") updateParetoTable();
    else if (tabId === "tab-logs") updateFullLogsTable();
}

// إعدادات الدخول المستقلة لكل شاشة
const PROTECTED_VIEW_CONFIG = {
    tech: {
        title: "تسجيل دخول إدارة الصيانة",
        description: "أدخل كلمة المرور الخاصة بإدارة الصيانة وشاشات الفنيين:",
        password: "130150",
        sessionKey: "factory5_maintenance_authenticated"
    },
    leader: {
        title: "تسجيل دخول قائد الفريق",
        description: "أدخل كلمة المرور الخاصة بشاشة قائد الفريق:",
        password: "588855",
        sessionKey: "factory5_team_leader_authenticated"
    },
    admin: {
        title: "تسجيل دخول الإدارة",
        description: "أدخل كلمة المرور الخاصة بلوحة تحكم الإدارة:",
        password: "205080",
        sessionKey: "factory5_admin_authenticated"
    }
};

let pendingProtectedView = null;

function restoreAdminStateOnLoad() {
    // الأمان والتنظيم: كل فتح للرابط يبدأ من شاشة الدخول الرئيسية.
    // لا نعيد فتح أي واجهة محمية تلقائياً حتى لو كانت جلسة سابقة موجودة.
    sessionStorage.removeItem("factory5_admin_authenticated");
    sessionStorage.removeItem(PROTECTED_VIEW_CONFIG.tech.sessionKey);
    sessionStorage.removeItem(PROTECTED_VIEW_CONFIG.leader.sessionKey);

    const adminPanel = document.getElementById("admin-panel");
    const loginModal = document.getElementById("login-modal");
    const initialLogin = document.getElementById("initial-login-page");
    if (adminPanel) adminPanel.classList.add("hidden");
    if (loginModal) loginModal.classList.add("hidden");
    if (initialLogin) initialLogin.classList.remove("hidden");
}


function showFactory5Role(role) {
    document.body.classList.remove("factory5-role-worker", "factory5-role-tech", "factory5-role-leader", "factory5-role-admin");
    document.body.classList.add(`factory5-role-${role}`);
    const adminPanel = document.getElementById("admin-panel");
    if (adminPanel && role !== "admin") adminPanel.classList.add("hidden");
}

function setupEventListeners() {
    // أول تفاعل للمستخدم يفتح الصوت في المتصفح، حتى يمكن تشغيل الجرس لاحقاً
    // عند وصول عطل جديد أو استلام قائد الفريق بدون الحاجة لأي Refresh.
    document.addEventListener('pointerdown', () => ensureAlertAudioReady(), { passive: true });
    document.addEventListener('keydown', () => ensureAlertAudioReady());

    // ===== شاشة الدخول الرئيسية =====
    const initialLoginPage = document.getElementById("initial-login-page");
    const initialRoleButtons = document.querySelectorAll(".initial-role-btn");
    const initialPasswordWrap = document.getElementById("initial-password-wrap");
    const initialPasswordInput = document.getElementById("initial-password-input");
    const initialLoginSubmit = document.getElementById("initial-login-submit");
    const initialLoginError = document.getElementById("initial-login-error");
    const initialLoginHint = document.getElementById("initial-login-hint");
    let initialSelectedRole = "worker";

    function updateInitialLoginRole(role) {
        initialSelectedRole = role;
        initialRoleButtons.forEach(btn => btn.classList.toggle("active", btn.dataset.role === role));
        const protectedRole = role !== "worker";
        if (initialPasswordWrap) initialPasswordWrap.classList.toggle("hidden", !protectedRole);
        if (initialPasswordInput) initialPasswordInput.value = "";
        if (initialLoginError) initialLoginError.classList.add("hidden");

        const cfg = PROTECTED_VIEW_CONFIG[role];
        if (initialLoginSubmit) initialLoginSubmit.textContent = role === "worker" ? "دخول تسجيل الأعطال" : "دخول النظام";
        if (initialLoginHint) {
            initialLoginHint.textContent = role === "worker"
                ? "تسجيل الأعطال متاح للعامل مباشرة بدون كلمة مرور."
                : (cfg ? cfg.description.replace(/[:：]$/, "") : "");
        }
        if (protectedRole && initialPasswordInput) initialPasswordInput.focus();
    }

    function enterSelectedRole() {
        if (initialSelectedRole === "worker") {
            sessionStorage.removeItem("factory5_admin_authenticated");
            sessionStorage.removeItem(PROTECTED_VIEW_CONFIG.tech.sessionKey);
            sessionStorage.removeItem(PROTECTED_VIEW_CONFIG.leader.sessionKey);
            if (initialLoginPage) initialLoginPage.classList.add("hidden");
            setActiveView("worker");
            return;
        }

        const cfg = PROTECTED_VIEW_CONFIG[initialSelectedRole];
        const pass = initialPasswordInput ? initialPasswordInput.value : "";
        if (!cfg || pass !== cfg.password) {
            if (initialLoginError) {
                initialLoginError.textContent = "كلمة المرور غير صحيحة!";
                initialLoginError.classList.remove("hidden");
            }
            if (initialPasswordInput) { initialPasswordInput.select(); initialPasswordInput.focus(); }
            return;
        }

        sessionStorage.setItem(cfg.sessionKey, "true");
        if (initialSelectedRole === "admin") {
            sessionStorage.setItem("factory5_admin_authenticated", "true");
            if (initialLoginPage) initialLoginPage.classList.add("hidden");
            showFactory5Role("admin");
            const adminPanel = document.getElementById("admin-panel");
            if (adminPanel) adminPanel.classList.remove("hidden");
            switchAdminTab(sessionStorage.getItem("factory5_active_tab") || "tab-indicators");
        } else {
            if (initialLoginPage) initialLoginPage.classList.add("hidden");
            setActiveView(initialSelectedRole);
        }
        if (initialPasswordInput) initialPasswordInput.value = "";
        if (initialLoginError) initialLoginError.classList.add("hidden");
    }

    initialRoleButtons.forEach(btn => {
        btn.addEventListener("click", () => updateInitialLoginRole(btn.dataset.role));
    });
    if (initialLoginSubmit) initialLoginSubmit.addEventListener("click", enterSelectedRole);
    if (initialPasswordInput) initialPasswordInput.addEventListener("keypress", e => {
        if (e.key === "Enter") enterSelectedRole();
    });
    updateInitialLoginRole("worker");

    // 1. بحث الماكينات
    const searchBtn = document.getElementById("search-machine-btn");
    if (searchBtn) {
        searchBtn.addEventListener("click", () => {
            const query = document.getElementById("machine-search-input").value.trim();
            findAndSelectMachine(query);
        });
    }

    const searchInput = document.getElementById("machine-search-input");
    if (searchInput) {
        searchInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") findAndSelectMachine(searchInput.value.trim());
        });
    }

    // 2. الكاميرا والـ QR
    const scanBtn = document.getElementById("scan-qr-btn");
    if (scanBtn) scanBtn.addEventListener("click", startScanner);
    
    const closeScannerBtn = document.getElementById("close-scanner-btn");
    if (closeScannerBtn) closeScannerBtn.addEventListener("click", stopScanner);

    // 3. تسجيل العطل الجديد
    const startFaultBtn = document.getElementById("start-fault-btn");
    if (startFaultBtn) startFaultBtn.addEventListener("click", startFaultRecord);

    // 4. أزرار تبديل الواجهات (عمال / فنيين / قائد الفريق)
    // واجهة تسجيل الأعطال للعمال تظل مفتوحة بدون كلمة مرور.
    // إدارة الصيانة وشاشة قائد الفريق محميتان بكلمة مرور مستقلة لكل واجهة.
    const switchWorkerView = document.getElementById("switch-worker-view");
    const switchTechView = document.getElementById("switch-tech-view");
    const switchLeaderView = document.getElementById("switch-leader-view");
    const faultRegSection = document.getElementById("fault-registration-section");
    const techDashboardSection = document.getElementById("tech-dashboard-section");
    const teamLeaderDashboardSection = document.getElementById("team-leader-dashboard-section");
    const workerActiveFaultsSection = document.getElementById("worker-active-faults-section");

    function setActiveView(view) {
        const isWorker = view === "worker";
        const isTech = view === "tech";
        const isLeader = view === "leader";

        showFactory5Role(view);
        const adminPanel = document.getElementById("admin-panel");
        if (adminPanel) adminPanel.classList.add("hidden");

        if (switchWorkerView) {
            switchWorkerView.classList.toggle("active-mode-btn", isWorker);
            switchWorkerView.classList.toggle("btn-primary", isWorker);
            switchWorkerView.classList.toggle("btn-outline", !isWorker);
        }
        if (switchTechView) {
            switchTechView.classList.toggle("active-mode-btn", isTech);
            switchTechView.classList.toggle("btn-primary", isTech);
            switchTechView.classList.toggle("btn-outline", !isTech);
        }
        if (switchLeaderView) {
            switchLeaderView.classList.toggle("active-mode-btn", isLeader);
            switchLeaderView.classList.toggle("btn-primary", isLeader);
            switchLeaderView.classList.toggle("btn-outline", !isLeader);
        }

        if (faultRegSection) faultRegSection.classList.toggle("hidden", !isWorker);
        if (workerActiveFaultsSection) workerActiveFaultsSection.classList.toggle("hidden", !isWorker);
        if (techDashboardSection) techDashboardSection.classList.toggle("hidden", !isTech);
        if (teamLeaderDashboardSection) teamLeaderDashboardSection.classList.toggle("hidden", !isLeader);

        if (isTech) {
            loadFaultsFromStorage();
            renderTechDashboard();
        } else if (isLeader) {
            renderTeamLeaderDashboard();
        }
    }

    function returnToInitialLogin() {
        document.body.classList.remove("factory5-role-worker", "factory5-role-tech", "factory5-role-leader", "factory5-role-admin");
        const adminPanel = document.getElementById("admin-panel");
        if (adminPanel) adminPanel.classList.add("hidden");
        const initialLogin = document.getElementById("initial-login-page");
        if (initialLogin) initialLogin.classList.remove("hidden");
        updateInitialLoginRole("worker");
    }

    // كل شاشة محمية لها جلسة دخول مستقلة داخل نفس التبويب.
    function openProtectedLogin(view) {
        const cfg = PROTECTED_VIEW_CONFIG[view];
        if (!cfg) return;
        if (sessionStorage.getItem(cfg.sessionKey) === "true") {
            setActiveView(view);
            return;
        }
        pendingProtectedView = view;
        const loginPage = document.getElementById("screen-login-page");
        const title = document.getElementById("screen-login-title");
        const description = document.getElementById("screen-login-description");
        const passInput = document.getElementById("screen-password-input");
        const errorMsg = document.getElementById("screen-login-error");
        if (title) title.textContent = cfg.title;
        if (description) description.textContent = cfg.description;
        if (passInput) {
            passInput.value = "";
            passInput.focus();
        }
        if (errorMsg) errorMsg.classList.add("hidden");
        if (loginPage) loginPage.classList.remove("hidden");
    }

    if (switchWorkerView) {
        switchWorkerView.addEventListener("click", () => setActiveView("worker"));
    }

    if (switchTechView) {
        switchTechView.addEventListener("click", () => openProtectedLogin("tech"));
    }

    if (switchLeaderView) {
        switchLeaderView.addEventListener("click", () => openProtectedLogin("leader"));
    }

    // 5. تسجيل الدخول الموحد للواجهات المحمية
    const adminLoginBtn = document.getElementById("admin-login-btn");
    if (adminLoginBtn) {
        adminLoginBtn.addEventListener("click", () => openProtectedLogin("admin"));
    }

    const closeLoginBtn = document.getElementById("close-login-btn");
    if (closeLoginBtn) {
        closeLoginBtn.addEventListener("click", () => {
            const modal = document.getElementById("login-modal");
            if (modal) modal.classList.add("hidden");
            pendingProtectedView = null;
        });
    }

    const submitLoginBtn = document.getElementById("submit-login-btn");
    if (submitLoginBtn) submitLoginBtn.addEventListener("click", verifyProtectedPassword);

    const adminPasswordInput = document.getElementById("admin-password-input");
    if (adminPasswordInput) {
        adminPasswordInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") verifyProtectedPassword();
        });
    }

    // شاشة الدخول الجديدة: دخول مستقل لكل واجهة بدون قائمة اختيار حساب.
    const screenLoginSubmit = document.getElementById("screen-login-submit");
    if (screenLoginSubmit) screenLoginSubmit.addEventListener("click", verifyScreenPassword);

    const screenLoginCancel = document.getElementById("screen-login-cancel");
    if (screenLoginCancel) {
        screenLoginCancel.addEventListener("click", () => {
            const page = document.getElementById("screen-login-page");
            if (page) page.classList.add("hidden");
            const input = document.getElementById("screen-password-input");
            const error = document.getElementById("screen-login-error");
            if (input) input.value = "";
            if (error) error.classList.add("hidden");
            pendingProtectedView = null;
        });
    }

    const screenPasswordInput = document.getElementById("screen-password-input");
    if (screenPasswordInput) {
        screenPasswordInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") verifyScreenPassword();
        });
    }

    // تسجيل الخروج من إدارة الصيانة أو شاشة قائد الفريق.
    const logoutMaintenanceBtn = document.getElementById("logout-maintenance-btn");
    if (logoutMaintenanceBtn) {
        logoutMaintenanceBtn.addEventListener("click", () => {
            sessionStorage.removeItem(PROTECTED_VIEW_CONFIG.tech.sessionKey);
            returnToInitialLogin();
        });
    }

    const logoutTeamLeaderBtn = document.getElementById("logout-team-leader-btn");
    if (logoutTeamLeaderBtn) {
        logoutTeamLeaderBtn.addEventListener("click", () => {
            sessionStorage.removeItem(PROTECTED_VIEW_CONFIG.leader.sessionKey);
            returnToInitialLogin();
        });
    }

    // 6. زر تسجيل الخروج من لوحة الإدارة
    const logoutAdminBtn = document.getElementById("logout-admin-btn");
    if (logoutAdminBtn) {
        logoutAdminBtn.addEventListener("click", () => {
            const adminPanel = document.getElementById("admin-panel");
            if (adminPanel) adminPanel.classList.add("hidden");
            sessionStorage.removeItem("factory5_admin_authenticated");
            sessionStorage.removeItem("factory5_active_tab");
            returnToInitialLogin();
        });
    }

    // 7. تبويبات لوحة التحكم
    const tabBtns = document.querySelectorAll(".tab-btn");
    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const tabId = btn.getAttribute("data-tab");
            if (tabId) switchAdminTab(tabId);
        });
    });

    const applyAdvSearchBtn = document.getElementById("apply-adv-search");
    if (applyAdvSearchBtn) applyAdvSearchBtn.addEventListener("click", applyAdvancedSearch);

    const printReportBtn = document.getElementById("print-report-btn");
    if (printReportBtn) printReportBtn.addEventListener("click", executePrintReport);

    const printParetoBtn = document.getElementById("print-pareto-btn");
    if (printParetoBtn) printParetoBtn.addEventListener("click", executePrintPareto);

    const printChartOnlyBtn = document.getElementById("print-chart-only-btn");
    if (printChartOnlyBtn) printChartOnlyBtn.addEventListener("click", printParetoChartOnly);

    const saveFormulaSettingsBtn = document.getElementById("save-formula-settings-btn");
    if (saveFormulaSettingsBtn) saveFormulaSettingsBtn.addEventListener("click", saveFormulaSettingsFromAdmin);
    const resetFormulaSettingsBtn = document.getElementById("reset-formula-settings-btn");
    if (resetFormulaSettingsBtn) resetFormulaSettingsBtn.addEventListener("click", resetFormulaSettingsFromAdmin);

    const saveMachineBtn = document.getElementById("save-machine-btn");
    if (saveMachineBtn) saveMachineBtn.addEventListener("click", saveMachineFromAdmin);
    const cancelMachineEditBtn = document.getElementById("cancel-machine-edit-btn");
    if (cancelMachineEditBtn) cancelMachineEditBtn.addEventListener("click", clearMachineForm);

    const saveFaultCodeBtn = document.getElementById("save-fault-code-btn");
    if (saveFaultCodeBtn) saveFaultCodeBtn.addEventListener("click", saveFaultCodeFromAdmin);
    const saveTechScreenBtn = document.getElementById("save-tech-screen-btn");
    if (saveTechScreenBtn) saveTechScreenBtn.addEventListener("click", saveTechScreenFromAdmin);
    const newTechScreenBtn = document.getElementById("new-tech-screen-btn");
    if (newTechScreenBtn) newTechScreenBtn.addEventListener("click", clearTechScreenForm);
    const deleteTechScreenBtn = document.getElementById("delete-tech-screen-btn");
    if (deleteTechScreenBtn) deleteTechScreenBtn.addEventListener("click", deleteTechScreenFromAdmin);
    const resetTechScreensBtn = document.getElementById("reset-tech-screens-btn");
    if (resetTechScreensBtn) resetTechScreensBtn.addEventListener("click", resetTechScreens);

    const cancelFaultCodeBtn = document.getElementById("cancel-fault-code-edit-btn");
    if (cancelFaultCodeBtn) cancelFaultCodeBtn.addEventListener("click", clearFaultCodeForm);

}

function findAndSelectMachine(query, fromScanner = false) {
    if (!query) {
        alert("من فضلك أدخل رقم الماكينة أولاً");
        return false;
    }

    const cleanQuery = String(query).trim();
    // قراءة الاسكان قد تحتوي على مسافات أو نص إضافي؛ نحاول المطابقة الدقيقة أولاً
    // ثم نبحث عن رقم ماكينة مسجل داخل النص المقروء.
    const normalizedQuery = cleanQuery.replace(/\s+/g, '');
    const machine = MACHINES.find(m => String(m.number).trim() === cleanQuery)
        || MACHINES.find(m => String(m.number).replace(/\s+/g, '') === normalizedQuery)
        || MACHINES.find(m => normalizedQuery.includes(String(m.number).replace(/\s+/g, '')));
    const card = document.getElementById("machine-info-card");
    if (machine) {
        selectedMachine = machine;
        document.getElementById("info-zone").textContent = machine.zone;
        document.getElementById("info-section").textContent = machine.section;
        document.getElementById("info-number").textContent = machine.number;
        document.getElementById("info-stage").textContent = machine.stage;
        card.classList.remove("hidden");

        // عند القراءة الصحيحة من الاسكان: يدخل مباشرة لخطوة تسجيل العطل
        // ويضع المؤشر على قائمة الأعطال بدون كتابة رقم الماكينة يدوياً.
        if (fromScanner) {
            const faultSelect = document.getElementById("fault-select");
            if (faultSelect) {
                setTimeout(() => {
                    faultSelect.focus();
                    faultSelect.scrollIntoView({ behavior: "smooth", block: "center" });
                }, 150);
            }
        }
        return true;
    } else {
        selectedMachine = null;
        card.classList.add("hidden");
        alert(`رقم الماكينة (${cleanQuery}) غير موجود في قائمة مصنع 5`);
        return false;
    }
}

function selectScannedMachine(rawText, source = "scanner") {
    const raw = String(rawText || "").trim();
    if (!raw) return false;

    // نحاول الرقم كما هو أولاً، ثم نستخرج كل مجموعات الأرقام من نتيجة QR/الباركود/OCR.
    const candidates = [raw, ...((raw.match(/\d+/g) || []))];
    for (const candidate of candidates) {
        const found = findAndSelectMachine(candidate, true);
        if (found) {
            const input = document.getElementById("machine-search-input");
            if (input) input.value = candidate;
            stopScanner();
            return true;
        }
    }
    return false;
}

function setScannerStatus(message) {
    const status = document.getElementById("scanner-status");
    if (status) status.textContent = message;
}

function startScanner() {
    const container = document.getElementById("scanner-container");
    if (!container) return;
    container.style.display = "block";
    setScannerStatus("وجّه الكاميرا إلى QR أو الباركود أو رقم الماكينة المكتوب...");

    if (typeof Html5Qrcode === "undefined") {
        alert("مكتبة قراءة QR/الباركود غير متوفرة.");
        container.style.display = "none";
        return;
    }

    if (html5QrCode) {
        html5QrCode.stop().catch(() => {}).then(() => initCameraScanner(container));
    } else {
        initCameraScanner(container);
    }
}

let ocrTimer = null;
let ocrBusy = false;
let ocrWorker = null;
let ocrWorkerPromise = null;

function normalizeMachineDigits(text) {
    return String(text || '')
        .replace(/[OoQq]/g, '0')
        .replace(/[IiLl|]/g, '1')
        .replace(/[Ss]/g, '5')
        .replace(/[Gg]/g, '6')
        .replace(/[Bb]/g, '8')
        .replace(/[Zz]/g, '2');
}

function makeOcrCanvases(video) {
    const vw = video.videoWidth;
    const vh = video.videoHeight;
    if (!vw || !vh) return [];

    const regions = [];

    // اللافتات عندكم خضراء بإطار أصفر. نبحث عن أكبر منطقة متصلة بهذا اللون
    // بدلاً من الاعتماد على مكان ثابت داخل الكاميرا؛ وبالتالي لو قربت الموبايل
    // أو ميلته قليلاً سنظل قادرين على تحديد اللافتة.
    try {
        const probe = document.createElement('canvas');
        const pw = 160;
        const ph = Math.max(100, Math.round(pw * vh / vw));
        probe.width = pw;
        probe.height = ph;
        const pctx = probe.getContext('2d', { willReadFrequently: true });
        pctx.drawImage(video, 0, 0, pw, ph);
        const pd = pctx.getImageData(0, 0, pw, ph).data;
        const mask = new Uint8Array(pw * ph);

        for (let y = 0; y < ph; y++) {
            for (let x = 0; x < pw; x++) {
                const i = (y * pw + x) * 4;
                const r = pd[i], g = pd[i + 1], b = pd[i + 2];
                const green = g > 65 && g > r * 1.18 && g > b * 1.10;
                const yellow = r > 120 && g > 105 && b < 125 && Math.abs(r - g) < 95;
                mask[y * pw + x] = (green || yellow) ? 1 : 0;
            }
        }

        // Connected components على صورة صغيرة جداً حتى تكون العملية خفيفة على الموبايل.
        const seen = new Uint8Array(pw * ph);
        let best = null;
        const queue = new Int32Array(pw * ph);

        for (let sy = 0; sy < ph; sy++) {
            for (let sx = 0; sx < pw; sx++) {
                const seed = sy * pw + sx;
                if (!mask[seed] || seen[seed]) continue;

                let head = 0, tail = 0;
                queue[tail++] = seed;
                seen[seed] = 1;
                let area = 0, minX = sx, minY = sy, maxX = sx, maxY = sy;

                while (head < tail) {
                    const pos = queue[head++];
                    const x = pos % pw;
                    const y = Math.floor(pos / pw);
                    area++;
                    if (x < minX) minX = x;
                    if (x > maxX) maxX = x;
                    if (y < minY) minY = y;
                    if (y > maxY) maxY = y;

                    for (let dy = -1; dy <= 1; dy++) {
                        for (let dx = -1; dx <= 1; dx++) {
                            if (dx === 0 && dy === 0) continue;
                            const nx = x + dx, ny = y + dy;
                            if (nx < 0 || ny < 0 || nx >= pw || ny >= ph) continue;
                            const np = ny * pw + nx;
                            if (mask[np] && !seen[np]) {
                                seen[np] = 1;
                                queue[tail++] = np;
                            }
                        }
                    }
                }

                const boxW = maxX - minX + 1;
                const boxH = maxY - minY + 1;
                const ratio = boxW / Math.max(1, boxH);
                if (area > 180 && boxW > pw * 0.25 && ratio > 1.35 && (!best || area > best.area)) {
                    best = { area, minX, minY, maxX, maxY };
                }
            }
        }

        if (best) {
            const boxW = best.maxX - best.minX + 1;
            const boxH = best.maxY - best.minY + 1;
            const padX = Math.round(boxW * 0.10);
            const padY = Math.round(boxH * 0.35);
            const x = Math.max(0, best.minX - padX);
            const y = Math.max(0, best.minY - padY);
            const right = Math.min(pw, best.maxX + 1 + padX);
            const bottom = Math.min(ph, best.maxY + 1 + padY);
            regions.push({ x: x / pw, y: y / ph, w: (right - x) / pw, h: (bottom - y) / ph });
        }
    } catch (_) {}

    // احتياطي إذا لم نستطع تحديد اللافتة بالألوان.
    if (!regions.length) {
        regions.push(
            { x: 0.04, y: 0.04, w: 0.92, h: 0.56 },
            { x: 0.04, y: 0.20, w: 0.92, h: 0.70 }
        );
    }

    const canvases = [];
    for (const region of regions) {
        const sx = Math.max(0, Math.floor(vw * region.x));
        const sy = Math.max(0, Math.floor(vh * region.y));
        const sw = Math.min(vw - sx, Math.floor(vw * region.w));
        const sh = Math.min(vh - sy, Math.floor(vh * region.h));
        if (sw < 80 || sh < 40) continue;

        // تكبير الصورة 2.5x قبل OCR؛ مهم جداً عند التصوير من مسافة.
        const scale = 2.5;
        const base = document.createElement('canvas');
        base.width = Math.floor(sw * scale);
        base.height = Math.floor(sh * scale);
        const ctx = base.getContext('2d', { willReadFrequently: true });
        ctx.imageSmoothingEnabled = true;
        ctx.drawImage(video, sx, sy, sw, sh, 0, 0, base.width, base.height);

        const image = ctx.getImageData(0, 0, base.width, base.height);
        const d = image.data;
        const gray = new Uint8ClampedArray(base.width * base.height);
        let min = 255, max = 0;

        for (let i = 0, j = 0; i < d.length; i += 4, j++) {
            const r = d[i], g = d[i + 1], b = d[i + 2];
            // تقليل تأثير اللون الأخضر مع إبقاء الأرقام السوداء واضحة.
            const y = Math.round(0.50 * r + 0.32 * g + 0.18 * b);
            gray[j] = y;
            if (y < min) min = y;
            if (y > max) max = y;
        }

        const range = Math.max(1, max - min);
        const stretched = new Uint8ClampedArray(gray.length);
        const binary = new Uint8ClampedArray(gray.length);
        const dark = new Uint8ClampedArray(gray.length);
        const t1 = min + range * 0.56;
        const t2 = min + range * 0.40;

        for (let i = 0; i < gray.length; i++) {
            stretched[i] = Math.max(0, Math.min(255, ((gray[i] - min) * 255) / range));
            binary[i] = gray[i] < t1 ? 0 : 255;
            dark[i] = gray[i] < t2 ? 0 : 255;
        }

        for (const source of [stretched, binary, dark]) {
            const out = document.createElement('canvas');
            out.width = base.width;
            out.height = base.height;
            const octx = out.getContext('2d', { willReadFrequently: true });
            const outImage = octx.createImageData(out.width, out.height);
            for (let i = 0, j = 0; i < outImage.data.length; i += 4, j++) {
                const v = source[j];
                outImage.data[i] = v;
                outImage.data[i + 1] = v;
                outImage.data[i + 2] = v;
                outImage.data[i + 3] = 255;
            }
            octx.putImageData(outImage, 0, 0);
            canvases.push(out);
        }
    }
    return canvases;
}

async function getOcrWorker() {
    if (typeof Tesseract === 'undefined') return null;
    if (ocrWorker) return ocrWorker;
    if (ocrWorkerPromise) return ocrWorkerPromise;

    ocrWorkerPromise = (async () => {
        try {
            // Worker واحد بدلاً من إنشاء OCR جديد كل مرة: أسرع وأثبت على الموبايل.
            const worker = await Tesseract.createWorker('eng', 1, { logger: () => {} });
            await worker.setParameters({
                tessedit_char_whitelist: '0123456789',
                tessedit_pageseg_mode: '7',
                preserve_interword_spaces: '0'
            });
            ocrWorker = worker;
            return worker;
        } catch (err) {
            console.warn('OCR worker init error:', err);
            ocrWorkerPromise = null;
            return null;
        }
    })();
    return ocrWorkerPromise;
}

async function startNumberOCRFallback() {
    if (ocrTimer) clearInterval(ocrTimer);

    const runOCR = async () => {
        if (ocrBusy || !html5QrCode || !html5QrCode.isScanning || typeof Tesseract === 'undefined') return;
        const video = document.querySelector('#reader video');
        if (!video || !video.videoWidth || !video.videoHeight) return;

        ocrBusy = true;
        try {
            setScannerStatus('جاري تحسين الصورة والتعرف على رقم الماكينة...');
            const worker = await getOcrWorker();
            if (!worker) return;

            const canvases = makeOcrCanvases(video);
            for (const canvas of canvases) {
                const result = await worker.recognize(canvas);
                const rawText = result && result.data ? result.data.text || '' : '';
                const text = normalizeMachineDigits(rawText).replace(/[^0-9\s]/g, ' ').trim();
                if (text && selectScannedMachine(text, 'ocr')) return;
            }
            setScannerStatus('لم يتم التعرف بعد... قرّب الكاميرا وثبّتها على الرقم داخل الإطار.');
        } catch (err) {
            console.warn('OCR error:', err);
        } finally {
            ocrBusy = false;
        }
    };

    // أول محاولة بسرعة، ثم إعادة المحاولة كل 1.5 ثانية بدون إرهاق الهاتف.
    runOCR();
    ocrTimer = setInterval(runOCR, 1500);
}

function applyCameraFocus() {
    try {
        if (!html5QrCode || typeof html5QrCode.applyVideoConstraints !== 'function') return;
        html5QrCode.applyVideoConstraints({
            advanced: [
                { focusMode: 'continuous' },
                { exposureMode: 'continuous' },
                { whiteBalanceMode: 'continuous' }
            ]
        }).catch(() => {});
    } catch (_) {}
}

function initCameraScanner(container) {
    if (html5QrCode) {
        try { html5QrCode.clear(); } catch (_) {}
    }
    html5QrCode = new Html5Qrcode('reader');
    const qrboxFunction = (viewfinderWidth, viewfinderHeight) => {
        // مساحة أكبر من النسخة القديمة حتى لا يتم قص لافتة 5003/5004.
        const width = Math.floor(viewfinderWidth * 0.94);
        const height = Math.floor(Math.min(viewfinderHeight * 0.62, width * 0.50));
        return { width: Math.max(220, width), height: Math.max(120, height) };
    };

    const F = typeof Html5QrcodeSupportedFormats !== 'undefined' ? Html5QrcodeSupportedFormats : {};
    const formats = [
        F.QR_CODE, F.CODE_128, F.CODE_39, F.CODE_93,
        F.EAN_13, F.EAN_8, F.UPC_A, F.UPC_E
    ].filter(Boolean);

    const onCode = (decodedText) => {
        if (selectScannedMachine(normalizeMachineDigits(decodedText), 'code')) return;
        setScannerStatus('تمت القراءة لكن الرقم غير موجود في قائمة الماكينات.');
    };

    html5QrCode.start(
        { facingMode: { exact: 'environment' } },
        { fps: 12, qrbox: qrboxFunction, aspectRatio: 1.5, formatsToSupport: formats },
        onCode,
        () => {}
    ).then(() => {
        applyCameraFocus();
        startNumberOCRFallback();
    }).catch(() => {
        // بعض الهواتف لا تدعم exact، فنرجع للوضع العام للكاميرا الخلفية.
        return html5QrCode.start(
            { facingMode: 'environment' },
            { fps: 12, qrbox: qrboxFunction, aspectRatio: 1.5, formatsToSupport: formats },
            onCode,
            () => {}
        ).then(() => {
            applyCameraFocus();
            startNumberOCRFallback();
        });
    }).catch(err => {
        console.error('Camera error:', err);
        alert('تعذر فتح الكاميرا. يرجى إعطاء صلاحية الكاميرا للمتصفح وفتح الموقع عبر HTTPS.');
        container.style.display = 'none';
    });
}

function stopScanner() {
    const container = document.getElementById("scanner-container");
    if (ocrTimer) { clearInterval(ocrTimer); ocrTimer = null; }
    ocrBusy = false;
    if (!container) return;
    if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.stop().then(() => { container.style.display = "none"; }).catch(() => { container.style.display = "none"; });
    } else {
        container.style.display = "none";
    }
}

function startFaultRecord() {
    if (!selectedMachine) {
        alert("من فضلك حدد الماكينة أولاً");
        return;
    }
    const faultCodeVal = document.getElementById("fault-select").value;
    if (!faultCodeVal) {
        alert("من فضلك اختر نوع العطل");
        return;
    }
    const faultObj = FAULT_CODES.find(f => f.code == faultCodeVal);
    const notes = document.getElementById("fault-notes").value.trim();

    const newFault = {
        id: "f_" + Date.now(),
        machineNumber: selectedMachine.number,
        machineStage: selectedMachine.stage,
        machineZone: selectedMachine.zone,
        machineSection: selectedMachine.section,
        faultCode: faultObj.code,
        faultName: faultObj.name,
        startTime: getSynchronizedNow(),
        endTime: null,
        durationMinutes: 0, // للتوافق مع البيانات القديمة
        durationSeconds: 0,
        notes: notes,
        status: "active"
    };

    const faults = getStoredFaults();
    faults.push(newFault);
    saveStoredFaults(faults);
    // تحديث واجهة العامل والفنيين فورًا على نفس الجهاز بدون انتظار Refresh.
    loadFaultsFromStorage();

    document.getElementById("machine-search-input").value = "";
    document.getElementById("machine-info-card").classList.add("hidden");
    document.getElementById("fault-select").value = "";
    document.getElementById("fault-notes").value = "";
    selectedMachine = null;

    alert("تم تسجيل بداية العطل بنجاح");
}

function loadFaultsFromStorage() {
    const faults = getStoredFaults();
    const container = document.getElementById("active-faults-container");
    
    const techCatElectricity = document.getElementById("tech-cat-electricity");
    const techCatMachines = document.getElementById("tech-cat-machines");
    const techCatMechanics = document.getElementById("tech-cat-mechanics");
    const techCatAir = document.getElementById("tech-cat-air");
    const techCatServices = document.getElementById("tech-cat-services");
    const techCatOther = document.getElementById("tech-cat-other");
    
    if (!container && !techCatElectricity) return;

    const activeFaults = faults.filter(f => f.status === "active");

    const createFaultCardHTML = (fault, isTechMode) => {
        const startTimeStr = fault.startTime ? new Date(fault.startTime).toLocaleTimeString("ar-EG") : "-";
        const timeDisplay = fault.startTime
            ? formatDuration(getFaultDurationSeconds(fault), "seconds")
            : "0 ثانية";

        return `
            <div class="fault-card" data-fault-id="${fault.id}" style="background:#fff; border:1px solid #cbd5e1; padding:12px; border-radius:6px; margin-bottom:10px;">
                <div class="fault-card-header" style="font-weight:bold; color:#dc2626; margin-bottom:8px;">🔴 ماكينة عطلانة: ${fault.machineNumber || 'غير معروف'}</div>
                <div class="fault-card-body" style="font-size:13px; color:#334155; margin-bottom:10px;">
                    <p style="margin:3px 0;"><strong>المرحلة:</strong> ${fault.machineStage || '-'}</p>
                    <p style="margin:3px 0;"><strong>القسم:</strong> ${fault.machineSection || '-'} (${fault.machineZone || '-'})</p>
                    <p style="margin:3px 0;"><strong>العطل:</strong> كود ${fault.faultCode || '-'} — ${fault.faultName || '-'}</p>
                    <p style="margin:3px 0;"><strong>وقت البداية:</strong> ${startTimeStr}</p>
                    <p style="margin:3px 0;"><strong>مدة التوقف:</strong> <span class="elapsed-time">${timeDisplay}</span></p>
                    ${fault.notes ? `<p style="margin:3px 0;"><strong>ملاحظات:</strong> ${fault.notes}</p>` : ""}
                </div>
                ${!isTechMode ? `<button class="btn btn-danger btn-block" style="width:100%; padding:6px;" onclick="endFault('${fault.id}')">⏹ انتهاء العطل</button>` : `<button class="btn btn-success btn-block" style="width:100%; padding:6px;" onclick="endFault('${fault.id}')">✅ تم الإصلاح وإنهاء العطل</button>`}
            </div>
        `;
    };

    if (container) {
        if (activeFaults.length === 0) {
            container.innerHTML = '<p class="no-data" style="color:#64748b;">لا توجد أعطال مفتوحة حالياً.</p>';
        } else {
            let html = "";
            activeFaults.forEach(fault => { html += createFaultCardHTML(fault, false); });
            container.innerHTML = html;
        }
    }

    // شاشة الفنيين أصبحت ديناميكية حسب إعدادات الإدارة.
    if (techCatElectricity) renderTechDashboard();
    renderTeamLeaderDashboard();

}

let finishingFaultIds = new Set();

window.endFault = function(faultId) {
    const key = String(faultId);
    // منع الضغط المتكرر على زر "تم الإصلاح"؛ أول ضغطة فقط تنهي العطل.
    if (finishingFaultIds.has(key)) return;
    const faults = getStoredFaults();
    const fault = faults.find(f => String(f.id) === key);
    if (!fault || fault.status !== "active") {
        loadFaultsFromStorage();
        return;
    }
    finishingFaultIds.add(key);
    // الفني يؤكد الإصلاح فقط، ولا نوقف عداد التوقف هنا.
    // يظل العطل في حالة انتظار قائد الفريق، والعداد يستمر من startTime حتى الاستلام الفعلي.
    fault.technicianEndTime = getSynchronizedNow();
    fault.status = "awaiting_leader_receipt";
    // لا نضع endTime ولا durationSeconds النهائية هنا؛ يتم تثبيتهما عند استلام قائد الفريق.
    // نحفظ أولاً ثم نعيد الرسم، حتى لا يظهر العطل للحظة ثم يختفي بسبب مزامنة قديمة.
    saveStoredFaults(faults);
    loadFaultsFromStorage();
    renderTechDashboard();
    renderTeamLeaderDashboard();
    alert(`تم تسجيل انتهاء الفني. عداد التوقف مستمر حتى استلام قائد الفريق للماكينة.`);
    finishingFaultIds.delete(key);
};

window.deleteFault = function(faultId) {
    if (!confirm("هل أنت متأكد من رغبتك في حذف هذا العطل نهائياً؟")) return;
    let faults = getStoredFaults();
    faults = faults.filter(f => String(f.id) !== String(faultId));
    saveStoredFaults(faults);
    alert("تم حذف العطل بنجاح.");
};

function verifyScreenPassword() {
    const view = pendingProtectedView;
    const cfg = PROTECTED_VIEW_CONFIG[view];
    const passInput = document.getElementById("screen-password-input");
    const errorMsg = document.getElementById("screen-login-error");
    const pass = passInput ? passInput.value : "";
    if (!cfg) return;

    if (pass === cfg.password) {
        sessionStorage.setItem(cfg.sessionKey, "true");
        const page = document.getElementById("screen-login-page");
        if (page) page.classList.add("hidden");
        if (view === "admin") {
            const adminPanel = document.getElementById("admin-panel");
            if (adminPanel) adminPanel.classList.remove("hidden");
            sessionStorage.setItem("factory5_admin_authenticated", "true");
            showFactory5Role("admin");
            switchAdminTab(sessionStorage.getItem("factory5_active_tab") || "tab-indicators");
        } else {
            setActiveView(view);
        }
        if (passInput) passInput.value = "";
        if (errorMsg) errorMsg.classList.add("hidden");
        pendingProtectedView = null;
    } else {
        if (errorMsg) errorMsg.classList.remove("hidden");
        if (passInput) { passInput.select(); passInput.focus(); }
    }
}

function verifyProtectedPassword() {
    const view = pendingProtectedView;
    const cfg = PROTECTED_VIEW_CONFIG[view];
    const passInput = document.getElementById("admin-password-input");
    const errorMsg = document.getElementById("login-error-msg");
    const pass = passInput ? passInput.value : "";
    if (!cfg) return;

    if (pass === cfg.password) {
        sessionStorage.setItem(cfg.sessionKey, "true");
        const modal = document.getElementById("login-modal");
        if (modal) modal.classList.add("hidden");
        if (view === "admin") {
            const adminPanel = document.getElementById("admin-panel");
            if (adminPanel) adminPanel.classList.remove("hidden");
            sessionStorage.setItem("factory5_admin_authenticated", "true");
            showFactory5Role("admin");
            switchAdminTab(sessionStorage.getItem("factory5_active_tab") || "tab-indicators");
        } else {
            setActiveView(view);
        }
        pendingProtectedView = null;
    } else {
        if (errorMsg) errorMsg.classList.remove("hidden");
        if (passInput) { passInput.select(); passInput.focus(); }
    }
}

// توافق مع أي استدعاء قديم داخل المشروع.
function verifyAdminPassword() {
    pendingProtectedView = "admin";
    verifyProtectedPassword();
}

function updateIndicators() {
    const faults = getStoredFaults();
    const total = faults.length;
    const active = faults.filter(f => f.status === "active").length;
    const finished = faults.filter(f => f.status === "finished").length;
    // إجمالي وقت التوقف في لوحة المؤشرات يعتمد على نفس مدة العطل المسجلة
    // في سجل الأعطال، بالثواني الكاملة، حتى يطابق السجل والتقارير بدون فروق تقريب.
    const totalDurationSeconds = faults.reduce((sum, f) => {
        if (!f) return sum;
        if (f.status === "finished" && Number.isFinite(Number(f.durationSeconds))) {
            return sum + Math.max(0, Math.floor(Number(f.durationSeconds)));
        }
        return sum + getFaultDurationSeconds(f);
    }, 0);

    const setEl = (id, val) => { const el = document.getElementById(id); if(el) el.textContent = val; };
    setEl("kpi-total", total);
    setEl("kpi-active", active);
    setEl("kpi-finished", finished);
    setEl("kpi-total-time", formatDuration(totalDurationSeconds, "seconds"));
}

// ================================================================
// حساب نسبة التعطل حسب ساعات تشغيل مصنع 5
// الوردية الأولى: 07:30 -> 16:00 مع راحة 12:00 -> 13:00
// الوردية الثانية: 16:00 -> 23:00
// إجمالي التشغيل اليومي = 14.5 ساعة = 52,200 ثانية
// ================================================================
const FACTORY_DAILY_OPERATING_SECONDS = 52200;
const FACTORY_BREAK_START_HOUR = 12;
const FACTORY_BREAK_END_HOUR = 13;

function getOperatingIntervalsForDay(dayDate) {
    const y = dayDate.getFullYear();
    const m = dayDate.getMonth();
    const d = dayDate.getDate();

    return [
        // الوردية الأولى قبل/بعد الراحة
        [new Date(y, m, d, 7, 30, 0, 0).getTime(), new Date(y, m, d, FACTORY_BREAK_START_HOUR, 0, 0, 0).getTime()],
        [new Date(y, m, d, FACTORY_BREAK_END_HOUR, 0, 0, 0).getTime(), new Date(y, m, d, 16, 0, 0, 0).getTime()],
        // الوردية الثانية
        [new Date(y, m, d, 16, 0, 0, 0).getTime(), new Date(y, m, d, 23, 0, 0, 0).getTime()]
    ];
}

// عدد ثواني التشغيل الفعلية بين لحظتين، مع احتساب الورديتين والراحة فقط.
function getOperatingSecondsBetween(startMs, endMs) {
    if (!Number.isFinite(Number(startMs)) || !Number.isFinite(Number(endMs))) return 0;

    let start = Number(startMs);
    let end = Number(endMs);
    if (end <= start) return 0;

    let totalSeconds = 0;
    const startDate = new Date(start);
    const endDate = new Date(end);

    // نمشي يومًا بيوم حتى لا نحتسب الليل أو وقت الراحة.
    const cursor = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    const lastDay = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());

    while (cursor.getTime() <= lastDay.getTime()) {
        const intervals = getOperatingIntervalsForDay(cursor);

        intervals.forEach(([intervalStart, intervalEnd]) => {
            const overlapStart = Math.max(start, intervalStart);
            const overlapEnd = Math.min(end, intervalEnd);
            if (overlapEnd > overlapStart) {
                totalSeconds += (overlapEnd - overlapStart) / 1000;
            }
        });

        cursor.setDate(cursor.getDate() + 1);
    }

    return Math.max(0, totalSeconds);
}

// وقت التشغيل الفعلي من بداية الشهر الحالي وحتى اللحظة الحالية.
// مثال: يوم 4 الساعة 08:00 => 3 أيام كاملة + 30 دقيقة فقط من اليوم الرابع.
function getCurrentMonthOperatingSeconds(nowMs = getSynchronizedNow()) {
    const now = new Date(nowMs);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0).getTime();
    return getOperatingSecondsBetween(monthStart, nowMs);
}

// وقت التشغيل الفعلي لليوم الحالي فقط.
function getTodayOperatingSeconds(nowMs = getSynchronizedNow()) {
    const now = new Date(nowMs);
    const dayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0).getTime();
    return getOperatingSecondsBetween(dayStart, nowMs);
}

// حساب مدة توقف العطل داخل نافذة زمنية، مع احتساب وقت التشغيل فقط.
// هذا يمنع احتساب وقت الليل أو ساعة الراحة إذا امتد العطل خلالها.
function getFaultOperatingSeconds(fault, windowStartMs, windowEndMs, nowMs = getSynchronizedNow()) {
    if (!fault) return 0;

    const faultStart = Number(fault.startTime);
    if (!Number.isFinite(faultStart)) return 0;

    const faultEndRaw = Number(fault.endTime);
    const faultEnd = Number.isFinite(faultEndRaw) ? faultEndRaw : nowMs;

    const start = Math.max(faultStart, Number(windowStartMs));
    const end = Math.min(faultEnd, Number(windowEndMs), nowMs);

    if (end <= start) return 0;

    return getOperatingSecondsBetween(start, end);
}

// إجمالي وقت توقف ماكينة خلال الشهر الحالي فقط.
function getMachineMonthlyDowntimeSeconds(machineFaults, nowMs = getSynchronizedNow()) {
    const now = new Date(nowMs);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0).getTime();

    return machineFaults.reduce((sum, fault) => {
        // السجلات القديمة التي لا تحتوي startTime لا يمكن تقسيمها زمنيًا،
        // لذلك نحافظ على مدتها كما هي حتى لا تضيع أي بيانات.
        if (!Number.isFinite(Number(fault.startTime))) {
            return sum + getFaultDurationSeconds(fault, nowMs);
        }
        return sum + getFaultOperatingSeconds(fault, monthStart, nowMs, nowMs);
    }, 0);
}

// إجمالي وقت توقف ماكينة خلال اليوم الحالي فقط.
function getMachineDailyDowntimeSeconds(machineFaults, nowMs = getSynchronizedNow()) {
    // النسبة اليومية تعتمد على إجمالي مدة الأعطال المسجلة في اليوم
    // ÷ 52,200 ثانية، ولا تتأثر بكون وقت الاختبار خارج ساعات التشغيل.
    // نستخدم وقت البداية والنهاية الفعليين حتى تظهر النسبة حتى لو تم تسجيل العطل ليلًا.
    const now = new Date(nowMs);
    const dayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0).getTime();
    const dayEnd = dayStart + 24 * 60 * 60 * 1000;

    return machineFaults.reduce((sum, fault) => {
        const startTime = Number(fault && fault.startTime);
        if (!Number.isFinite(startTime)) return sum;

        const endTimeRaw = Number(fault && fault.endTime);
        const endTime = Number.isFinite(endTimeRaw) ? endTimeRaw : nowMs;
        const overlapStart = Math.max(startTime, dayStart);
        const overlapEnd = Math.min(endTime, dayEnd, nowMs);
        if (overlapEnd <= overlapStart) return sum;

        return sum + ((overlapEnd - overlapStart) / 1000);
    }, 0);
}

// حساب موحد لكل مؤشرات اليوم؛ نفس البيانات/الثواني تُستخدم أعلى التقرير وأسفله.
// بهذه الطريقة لا يمكن أن تختلف "نسبة التعطل اليومية" بين الجدول الرئيسي وتفاصيل الأيام.
function calculateMachineDayReportMetrics(dayDate, machineFaults, nowMs = getSynchronizedNow()) {
    const dayStart = new Date(dayDate.getFullYear(), dayDate.getMonth(), dayDate.getDate()).getTime();
    const dayEnd = new Date(dayDate.getFullYear(), dayDate.getMonth(), dayDate.getDate() + 1).getTime();
    const effectiveEnd = Math.min(dayEnd, nowMs);
    if (effectiveEnd <= dayStart) {
        return { shift1Total: 0, shift2Total: 0, total: 0, shift1Operating: 27000, shift2Operating: 25200, dailyRatio: 0, shift1Ratio: 0, shift2Ratio: 0 };
    }

    const dayFaults = machineFaults.filter(f => Number.isFinite(Number(f.startTime)) && faultIntersectsDateRange(f, dayStart, dayEnd - 1));
    const shift1Intervals = getMachineShiftIntervalsForDay(dayDate, 1);
    const shift2Intervals = getMachineShiftIntervalsForDay(dayDate, 2);
    // نأخذ الثواني المكتملة لكل عطل قبل الجمع، تمامًا مثل إجمالي التقرير الرئيسي.
    // لو جمعنا الكسور المخفية بالمللي ثانية أولًا ثم عملنا floor في النهاية،
    // ممكن يظهر فرق 1-2 ثانية بين أعلى التقرير وتفاصيل اليوم.
    const shift1Total = shift1Intervals.reduce((sum, [a, b]) => sum + dayFaults.reduce((inner, fault) => inner + Math.floor(Math.max(0, getFaultOperatingSeconds(fault, a, b, nowMs))), 0), 0);
    const shift2Total = shift2Intervals.reduce((sum, [a, b]) => sum + dayFaults.reduce((inner, fault) => inner + Math.floor(Math.max(0, getFaultOperatingSeconds(fault, a, b, nowMs))), 0), 0);
    const total = shift1Total + shift2Total;

    // المقامات الخاصة بالورديات ثابتة حسب ساعات تشغيل المصنع:
    // الوردية الأولى = 27,000 ثانية، الوردية الثانية = 25,200 ثانية.
    const shift1Operating = shift1Intervals.reduce((sum, [a, b]) => sum + (b - a) / 1000, 0);
    const shift2Operating = shift2Intervals.reduce((sum, [a, b]) => sum + (b - a) / 1000, 0);

    const formulaVariables = {
        downtime: total,
        operating: FACTORY_DAILY_OPERATING_SECONDS,
        totalDowntime: total,
        dailyOperating: FACTORY_DAILY_OPERATING_SECONDS,
        shift1Downtime: shift1Total,
        shift2Downtime: shift2Total,
        shift1Operating,
        shift2Operating
    };
    const shift1Ratio = calculateReportFormula('shift1', { ...formulaVariables, downtime: shift1Total, operating: shift1Operating }, shift1Operating > 0 ? (shift1Total / shift1Operating) * 100 : 0);
    const shift2Ratio = calculateReportFormula('shift2', { ...formulaVariables, downtime: shift2Total, operating: shift2Operating }, shift2Operating > 0 ? (shift2Total / shift2Operating) * 100 : 0);
    const dailyRatio = calculateReportFormula('daily', formulaVariables, FACTORY_DAILY_OPERATING_SECONDS > 0 ? (total / FACTORY_DAILY_OPERATING_SECONDS) * 100 : 0);

    return { dayFaults, shift1Total, shift2Total, total, shift1Operating, shift2Operating, dailyRatio, shift1Ratio, shift2Ratio };
}

function calculateDailyStopRatio(machineFaults, nowMs = getSynchronizedNow()) {
    const now = new Date(nowMs);
    const metrics = calculateMachineDayReportMetrics(new Date(now.getFullYear(), now.getMonth(), now.getDate()), machineFaults, nowMs);
    return metrics.dailyRatio;
}

// حساب النسبة اليومية لأي يوم تاريخي، وليس اليوم الحالي فقط.
// هذا يسمح بالرجوع إلى نسبة التعطل لليوم السابق بعد بدء يوم جديد،
// ويستخدم نفس الدالة الموحدة التي تستخدمها تفاصيل الأيام.
function calculateDailyStopRatioForDate(machineFaults, targetDateString, nowMs = getSynchronizedNow()) {
    if (!targetDateString) return calculateDailyStopRatio(machineFaults, nowMs);
    const dayStart = new Date(`${targetDateString}T00:00:00`).getTime();
    if (!Number.isFinite(dayStart)) return 0;
    return calculateMachineDayReportMetrics(new Date(dayStart), machineFaults, nowMs).dailyRatio;
}

function calculateMonthlyStopRatio(machineFaults, nowMs = getSynchronizedNow()) {
    // النسبة الشهرية حتى اللحظة الحالية: إجمالي توقف الماكينة منذ يوم 1
    // ÷ وقت التشغيل الفعلي للمصنع منذ يوم 1 وحتى اللحظة الحالية × 100.
    const operatingSeconds = getCurrentMonthOperatingSeconds(nowMs);
    if (operatingSeconds <= 0) return 0;

    const downtimeSeconds = getMachineMonthlyDowntimeSeconds(machineFaults, nowMs);
    return calculateReportFormula('monthly', {
        downtime: downtimeSeconds, operating: operatingSeconds, totalDowntime: downtimeSeconds,
        dailyOperating: FACTORY_DAILY_OPERATING_SECONDS, shift1Downtime: 0, shift2Downtime: 0,
        shift1Operating: 27000, shift2Operating: 25200
    }, (downtimeSeconds / operatingSeconds) * 100);
}

function getMachinePerformanceFilters() {
    const input = document.getElementById('machine-performance-filter-input');
    const select = document.getElementById('machine-performance-filter');
    const selectedMachine = String(input ? input.value : '').trim() || String(select ? select.value || '' : '');
    const dateFrom = String(document.getElementById('machine-performance-date-from')?.value || '');
    const dateTo = String(document.getElementById('machine-performance-date-to')?.value || '');
    return { selectedMachine, dateFrom, dateTo };
}

function getDateRangeBounds(dateFrom, dateTo, nowMs = getSynchronizedNow()) {
    const now = new Date(nowMs);
    const from = dateFrom ? new Date(`${dateFrom}T00:00:00`).getTime() : new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const to = dateTo ? new Date(`${dateTo}T23:59:59.999`).getTime() : nowMs;
    return { from, to };
}

function faultIntersectsDateRange(fault, fromMs, toMs) {
    if (!fault || !Number.isFinite(Number(fault.startTime))) return false;
    const start = Number(fault.startTime);
    const end = Number.isFinite(Number(fault.endTime)) ? Number(fault.endTime) : getSynchronizedNow();
    return end >= fromMs && start <= toMs;
}

function getFaultsForMachineAndRange(faults, machineNumber, dateFrom, dateTo, nowMs) {
    const { from, to } = getDateRangeBounds(dateFrom, dateTo, nowMs);
    return faults.filter(f => (!machineNumber || String(f.machineNumber) === String(machineNumber)) && (!(dateFrom || dateTo) || faultIntersectsDateRange(f, from, to)));
}

// مدة العطل المسجلة فعليًا في سجل الأعطال، بدون استبعاد ساعة الراحة أو ساعات الليل.
// تستخدمها شاشة تقرير أداء الماكينات عند عرض "إجمالي وقت التوقف" حتى يطابق
// مجموع مدد الأعطال المسجلة بالدقيقة والثانية حرفيًا.
function getFaultRecordedDurationInRange(fault, rangeFrom, rangeTo, nowMs = getSynchronizedNow()) {
    if (!fault) return 0;

    const start = Number(fault.startTime);
    if (Number.isFinite(start)) {
        const endRaw = Number(fault.endTime);
        const end = Number.isFinite(endRaw) ? endRaw : nowMs;
        const overlapStart = Math.max(start, Number(rangeFrom));
        const overlapEnd = Math.min(end, Number(rangeTo), nowMs);
        return overlapEnd > overlapStart ? (overlapEnd - overlapStart) / 1000 : 0;
    }

    // دعم السجلات القديمة التي لا تحتوي على startTime.
    const seconds = Number(fault.durationSeconds);
    if (Number.isFinite(seconds) && seconds >= 0) return seconds;
    const minutes = Number(fault.durationMinutes);
    return Number.isFinite(minutes) && minutes >= 0 ? minutes * 60 : 0;
}

function getFaultDurationInRange(fault, rangeFrom, rangeTo, nowMs = getSynchronizedNow()) {
    if (!fault) return 0;
    // تقرير الأداء يطابق سجل الأعطال في خانة المدة: نأخذ الثواني المكتملة
    // لكل عطل أولاً ثم نجمعها، حتى لا تتسبب أجزاء الثانية المخفية في فرق +1 ثانية.
    return Math.floor(Math.max(0, getFaultRecordedDurationInRange(fault, rangeFrom, rangeTo, nowMs)));
}

function sumRecordedFaultDurations(faults, rangeFrom, rangeTo, nowMs = getSynchronizedNow()) {
    return (Array.isArray(faults) ? faults : []).reduce((sum, fault) => {
        return sum + getFaultDurationInRange(fault, rangeFrom, rangeTo, nowMs);
    }, 0);
}

function populateMachinePerformanceFilter() {
    const select = document.getElementById('machine-performance-filter');
    if (!select) return;
    const currentValue = String(select.value || '');
    const numbers = [...new Set((Array.isArray(MACHINES) ? MACHINES : []).map(m => String(m?.number ?? '').trim()).filter(Boolean))].sort((a,b)=>a.localeCompare(b,'ar',{numeric:true}));
    select.innerHTML = '<option value="">كل الماكينات</option>' + numbers.map(number => `<option value="${number.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}">${number}</option>`).join('');
    if (numbers.includes(currentValue)) select.value = currentValue; else select.value = '';
}

function setupMachinePerformanceFilter() {
    const select = document.getElementById('machine-performance-filter');
    if (!select) return;
    if (select.dataset.bound !== '1') {
        select.dataset.bound = '1';
        select.addEventListener('change', () => { const input=document.getElementById('machine-performance-filter-input'); if(input) input.value=select.value||''; updateMachinesPerformanceTable(); });
    }
    populateMachinePerformanceFilter();
    const input=document.getElementById('machine-performance-filter-input');
    const searchBtn=document.getElementById('machine-performance-search-btn');
    const applyBtn=document.getElementById('machine-performance-apply-btn');
    const resetBtn=document.getElementById('machine-performance-reset-btn');
    const apply=()=>updateMachinesPerformanceTable();
    if(input && input.dataset.bound!=='1'){ input.dataset.bound='1'; input.addEventListener('keypress',e=>{if(e.key==='Enter')apply();}); }
    if(searchBtn && searchBtn.dataset.bound!=='1'){ searchBtn.dataset.bound='1'; searchBtn.addEventListener('click',apply); }
    if(applyBtn && applyBtn.dataset.bound!=='1'){ applyBtn.dataset.bound='1'; applyBtn.addEventListener('click',apply); }
    ['machine-performance-date-from','machine-performance-date-to'].forEach(id=>{const el=document.getElementById(id); if(el&&el.dataset.bound!=='1'){el.dataset.bound='1';el.addEventListener('change',apply);}});
    if(resetBtn && resetBtn.dataset.bound!=='1'){ resetBtn.dataset.bound='1'; resetBtn.addEventListener('click',()=>{if(input)input.value='';select.value='';['machine-performance-date-from','machine-performance-date-to'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});apply();}); }
}

function getMachineShiftIntervalsForDay(dayDate, shiftNumber) {
    const intervals = getOperatingIntervalsForDay(dayDate);
    if (Number(shiftNumber) === 1) return intervals.slice(0, 2);
    if (Number(shiftNumber) === 2) return intervals.slice(2, 3);
    return intervals;
}

function getShiftOperatingSecondsForDate(dayDate, shiftNumber, nowMs = getSynchronizedNow()) {
    const intervals = getMachineShiftIntervalsForDay(dayDate, shiftNumber);
    const dayEnd = new Date(dayDate.getFullYear(), dayDate.getMonth(), dayDate.getDate() + 1).getTime();
    const effectiveEnd = Math.min(nowMs, dayEnd);
    if (effectiveEnd <= dayDate.getTime()) return 0;

    return intervals.reduce((sum, [intervalStart, intervalEnd]) => {
        const overlapStart = intervalStart;
        const overlapEnd = Math.min(intervalEnd, effectiveEnd);
        if (overlapEnd <= overlapStart) return sum;
        return sum + (overlapEnd - overlapStart) / 1000;
    }, 0);
}

function escapeMachineReportHtml(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function renderMachineFaultDetailsForDay(dayFaults, dayStart, dayEnd, nowMs) {
    if (!dayFaults.length) return '<div class="machine-fault-details-empty">لا توجد أعطال في هذا اليوم.</div>';

    const rows = dayFaults.map((fault, index) => {
        const totalForDay = getFaultDurationInRange(fault, dayStart, dayEnd, nowMs);
        const dayDate = new Date(dayStart);
        const shift1 = getMachineShiftIntervalsForDay(dayDate, 1).reduce((sum, [a, b]) => sum + getFaultOperatingSeconds(fault, a, b, nowMs), 0);
        const shift2 = getMachineShiftIntervalsForDay(dayDate, 2).reduce((sum, [a, b]) => sum + getFaultOperatingSeconds(fault, a, b, nowMs), 0);

        const start = Number.isFinite(Number(fault.startTime)) ? new Date(Number(fault.startTime)) : null;
        const endRaw = Number(fault.endTime);
        const end = Number.isFinite(endRaw) ? new Date(endRaw) : null;
        const startText = start ? start.toLocaleTimeString('ar-EG') : '-';
        const endText = end ? end.toLocaleTimeString('ar-EG') : 'مفتوح';
        const code = escapeMachineReportHtml(fault.faultCode || '-');
        const name = escapeMachineReportHtml(fault.faultName || 'عطل غير محدد');
        const notes = fault.notes ? `<div class="machine-fault-detail-note"><strong>ملاحظات:</strong> ${escapeMachineReportHtml(fault.notes)}</div>` : '';

        return `<div class="machine-fault-detail-item">
            <div class="machine-fault-detail-title">🛑 العطل ${index + 1}: كود ${code} — ${name}</div>
            <div class="machine-fault-detail-grid">
                <span><strong>وقت البداية:</strong> ${startText}</span>
                <span><strong>وقت النهاية:</strong> ${endText}</span>
                <span><strong>مدة التوقف في اليوم:</strong> ${formatDuration(totalForDay, 'seconds')}</span>
                <span><strong>من الوردية الأولى:</strong> ${formatDuration(shift1, 'seconds')}</span>
                <span><strong>من الوردية الثانية:</strong> ${formatDuration(shift2, 'seconds')}</span>
            </div>
            ${notes}
        </div>`;
    }).join('');

    return `<div class="machine-fault-details-list">${rows}</div>`;
}

function renderMachineDailyDetails(faults, machineNumber, dateFrom, dateTo, nowMs) {
    const tbody = document.querySelector('#machine-daily-details-table tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    const { from, to } = getDateRangeBounds(dateFrom, dateTo, nowMs);
    const first = new Date(from);
    first.setHours(0, 0, 0, 0);
    const last = new Date(to);
    last.setHours(0, 0, 0, 0);
    const relevant = faults.filter(f => !machineNumber || String(f.machineNumber) === String(machineNumber));

    for (let day = new Date(first); day <= last; day.setDate(day.getDate() + 1)) {
        const ds = new Date(day.getFullYear(), day.getMonth(), day.getDate()).getTime();
        const de = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1).getTime();
        const dayNow = Math.min(nowMs, de);
        const metrics = calculateMachineDayReportMetrics(day, relevant, nowMs);
        const dayFaults = metrics.dayFaults || [];
        const { shift1Total, shift2Total, shift1Ratio, shift2Ratio, dailyRatio } = metrics;
        // إجمالي توقف اليوم هنا يطابق سجل الأعطال الكامل، مثل الإجمالي أعلى التقرير.
        // نسب التعطل والوردية تظل محسوبة على زمن التشغيل فقط حسب المعادلات المعتمدة.
        const total = dayFaults.reduce((sum, fault) => sum + getFaultDurationInRange(fault, ds, de, nowMs), 0);

        const count = dayFaults.length;
        const detailsHtml = renderMachineFaultDetailsForDay(dayFaults, ds, de, nowMs);
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${day.toLocaleDateString('ar-EG')}</td>
            <td><strong>${count}</strong></td>
            <td><strong>${formatDuration(total, 'seconds')}</strong></td>
            <td><span class="machine-shift-duration">${formatDuration(shift1Total, 'seconds')}</span><span class="machine-shift-ratio">${shift1Ratio.toFixed(1)}%</span></td>
            <td><span class="machine-shift-duration">${formatDuration(shift2Total, 'seconds')}</span><span class="machine-shift-ratio">${shift2Ratio.toFixed(1)}%</span></td>
            <td><strong>${dailyRatio.toFixed(1)}%</strong></td>
            <td><details class="machine-fault-details"><summary>🔎 عرض الأعطال (${count})</summary>${detailsHtml}</details></td>
        `;
        tbody.appendChild(tr);
    }

    if (!tbody.children.length) {
        tbody.innerHTML = '<tr><td colspan="7" class="no-data">لا توجد أيام داخل الفترة المحددة.</td></tr>';
    }
}

function updateMachinesPerformanceTable() {
    const faults=getStoredFaults(), tbody=document.querySelector('#machines-performance-table tbody'); if(!tbody)return;
    setupMachinePerformanceFilter(); populateMachinePerformanceFilter();
    const {selectedMachine,dateFrom,dateTo}=getMachinePerformanceFilters(); const status=document.getElementById('machine-performance-filter-status'); const summary=document.getElementById('machine-performance-summary'); const now=getSynchronizedNow();
    if(dateFrom&&dateTo&&dateFrom>dateTo){tbody.innerHTML='<tr><td colspan="10" class="no-data">تاريخ البداية يجب أن يكون قبل أو مساويًا لتاريخ النهاية.</td></tr>';if(status)status.textContent='⚠️ الفترة الزمنية غير صحيحة';if(summary)summary.classList.add('hidden');return;}
    if(selectedMachine&&!MACHINES.some(m=>String(m.number)===selectedMachine)){tbody.innerHTML='<tr><td colspan="10" class="no-data">❌ رقم الماكينة غير موجود في قائمة الماكينات.</td></tr>';if(status)status.textContent=`❌ الماكينة ${selectedMachine} غير موجودة`;if(summary)summary.classList.add('hidden');return;}

    const {from,to}=getDateRangeBounds(dateFrom,dateTo,now); tbody.innerHTML='';
    const machines=selectedMachine?MACHINES.filter(m=>String(m.number)===selectedMachine):MACHINES;

    // في حالة اختيار فترة متعددة الأيام، نحسب مؤشرات اليوم يومًا بيوم ثم نجمعها.
    // لذلك "نسبة التعطل اليومي" أعلى التقرير = مجموع نسب الأيام الظاهرة أسفله،
    // وإجمالي وقت التوقف أعلى التقرير = مجموع أوقات التوقف اليومية نفسها.
    function getPeriodDayMetrics(machineFaults) {
        const first = new Date(from); first.setHours(0,0,0,0);
        const last = new Date(to); last.setHours(0,0,0,0);
        const rows = [];
        for (let day = new Date(first); day <= last; day.setDate(day.getDate()+1)) {
            const dayCopy = new Date(day);
            const metrics = calculateMachineDayReportMetrics(dayCopy, machineFaults, now);
            rows.push(metrics);
        }
        return rows;
    }

    machines.forEach(machine=>{
        const all=faults.filter(f=>String(f.machineNumber)===String(machine.number));
        const legacy=(!dateFrom&&!dateTo)?all.filter(f=>!Number.isFinite(Number(f.startTime))):[];
        const mf=getFaultsForMachineAndRange(all,machine.number,dateFrom,dateTo,now);

        let total, count, avg, max, daily;
        const isSingleDay = !!(dateFrom && dateTo && dateFrom === dateTo);
        const hasDateRange = !!(dateFrom || dateTo);

        if (hasDateRange) {
            const periodMetrics = getPeriodDayMetrics(all);
            // إجمالي الفترة يُقرأ مباشرة من سجل الأعطال الكامل، وليس من ساعات التشغيل فقط.
            total = sumRecordedFaultDurations(all, from, to, now);
            daily = periodMetrics.reduce((sum,m)=>sum + m.dailyRatio, 0);
            const periodFaults = periodMetrics.flatMap(m=>m.dayFaults || []);
            count = periodFaults.length;
            const durations = periodMetrics.flatMap(m => (m.dayFaults || []).map(f => getFaultOperatingSeconds(f,
                new Date(new Date(Number(f.startTime)).getFullYear(), new Date(Number(f.startTime)).getMonth(), new Date(Number(f.startTime)).getDate()).getTime(),
                new Date(new Date(Number(f.startTime)).getFullYear(), new Date(Number(f.startTime)).getMonth(), new Date(Number(f.startTime)).getDate()+1).getTime(), now
            )));
            avg = count ? total / count : 0;
            max = durations.length ? Math.max(...durations) : 0;
        } else {
            const dayMetrics = calculateMachineDayReportMetrics(new Date(new Date(now).getFullYear(), new Date(now).getMonth(), new Date(now).getDate()), all, now);
            // إجمالي وقت التوقف في الجدول الرئيسي = المدة المسجلة فعليًا في سجل الأعطال.
            total = sumRecordedFaultDurations(all, from, to, now);
            count = dayMetrics.dayFaults.length + legacy.length;
            avg = count ? total / count : 0;
            const durations = dayMetrics.dayFaults.map(f=>getFaultOperatingSeconds(f,
                new Date(new Date(now).getFullYear(), new Date(now).getMonth(), new Date(now).getDate()).getTime(),
                new Date(new Date(now).getFullYear(), new Date(now).getMonth(), new Date(now).getDate()+1).getTime(), now));
            if (legacy.length) durations.push(...legacy.map(f=>getFaultDurationSeconds(f,now)));
            max = durations.length ? Math.max(...durations) : 0;
            daily = dayMetrics.dailyRatio;
        }

        // النسبة الشهرية تظل محسوبة بالطريقة الشهرية/الفترة الحالية، ولا تتأثر بجمع النسب اليومية.
        let monthly;
        if (hasDateRange) {
            const rangeStop = mf.reduce((sum,f)=>sum+getFaultDurationInRange(f,from,to,now),0);
            const operating=getOperatingSecondsBetween(from,Math.min(to,now));
            monthly = operating>0 ? calculateReportFormula('monthly', {
                downtime: rangeStop, operating, totalDowntime: rangeStop,
                dailyOperating: FACTORY_DAILY_OPERATING_SECONDS, shift1Downtime: 0, shift2Downtime: 0,
                shift1Operating: 27000, shift2Operating: 25200
            }, (rangeStop/operating)*100) : 0;
        } else {
            monthly=calculateMonthlyStopRatio(all,now);
        }

        const tr=document.createElement('tr'); tr.innerHTML=`<td>${machine.number}</td><td>${machine.stage}</td><td>${machine.zone}</td><td>${machine.section}</td><td>${count}</td><td>${formatDuration(total,'seconds')}</td><td>${formatDuration(avg,'seconds')}</td><td>${formatDuration(max,'seconds')}</td><td>${daily.toFixed(1)}%</td><td>${monthly.toFixed(1)}%</td>`; tbody.appendChild(tr);
    });

    // ملخص الفترة يستخدم نفس إجمالي التوقف المستخدم في الصف العلوي، حتى لا يظهر فرق ثانية أو أكثر.
    const selectedAll = selectedMachine ? faults.filter(f=>String(f.machineNumber)===selectedMachine) : faults;
    let summaryTotal = 0;
    if (dateFrom || dateTo) {
        const first = new Date(from); first.setHours(0,0,0,0);
        const last = new Date(to); last.setHours(0,0,0,0);
        summaryTotal = sumRecordedFaultDurations(selectedAll, from, to, now);
    } else {
        summaryTotal = sumRecordedFaultDurations(selectedAll, from, to, now);
    }
    if(summary&&(selectedMachine||dateFrom||dateTo)){summary.innerHTML=`<div class="summary-grid"><div>🔧 الماكينة: ${selectedMachine||'كل الماكينات'}</div><div>📅 الفترة: ${dateFrom||'اليوم'} → ${dateTo||'اليوم'}</div><div>🛑 عدد الأعطال: ${getFaultsForMachineAndRange(faults,selectedMachine,dateFrom,dateTo,now).length}</div><div>⏱️ إجمالي التوقف: ${formatDuration(summaryTotal,'seconds')}</div></div>`;summary.classList.remove('hidden');}else if(summary)summary.classList.add('hidden');
    if(status){status.textContent=`✅ ${selectedMachine?`الماكينة ${selectedMachine}`:'كل الماكينات'}${dateFrom||dateTo?` | من ${dateFrom||'البداية'} إلى ${dateTo||'اليوم'}`:''}`;status.style.color='#16a34a';}
    renderMachineDailyDetails(faults,selectedMachine,dateFrom,dateTo,now);
}

function applyAdvancedSearch() {
    const query = document.getElementById("adv-search-query").value.trim().toLowerCase();
    const dateFrom = document.getElementById("date-from").value;
    const dateTo = document.getElementById("date-to").value;
    const faults = getStoredFaults();

    const filtered = faults.filter(f => {
        // البحث هنا مقصود يكون دقيقًا برقم الماكينة أو كود العطل فقط.
        // مثال: البحث عن 5 يعرض كود العطل 5 فقط، وليس 13 أو 1 أو أي نص يحتوي الرقم 5.
        // والبحث عن رقم ماكينة يعرض أعطال هذه الماكينة فقط.
        const machineNumber = String(f.machineNumber ?? '').trim().toLowerCase();
        const faultCode = String(f.faultCode ?? '').trim().toLowerCase();
        const matchQuery = !query || machineNumber === query || faultCode === query;
        let matchDate = true;
        if (f.startTime) {
            const fDate = new Date(f.startTime).toISOString().split('T')[0];
            if (dateFrom && fDate < dateFrom) matchDate = false;
            if (dateTo && fDate > dateTo) matchDate = false;
        }
        return matchQuery && matchDate;
    });

    const count = filtered.length;
    const finished = filtered.filter(f => f.status === "finished").length;
    const active = filtered.filter(f => f.status === "active").length;
    const totalDuration = filtered.reduce((sum, f) => {
        if (!f) return sum;
        if (f.status === "finished" && Number.isFinite(Number(f.durationSeconds))) {
            return sum + Math.max(0, Math.floor(Number(f.durationSeconds)));
        }
        return sum + getFaultDurationSeconds(f);
    }, 0);

    const setEl = (id, val) => { const el = document.getElementById(id); if(el) el.textContent = val; };
    setEl("res-count", count);
    setEl("res-finished", finished);
    setEl("res-active", active);
    setEl("res-total-duration", formatDuration(totalDuration, "seconds"));
    setEl("res-avg-duration", formatDuration(count > 0 ? totalDuration / count : 0, "seconds"));
    setEl("res-max-duration", formatDuration(count > 0 ? Math.max(...filtered.map(f => getFaultDurationSeconds(f))) : 0, "seconds"));
    
    document.getElementById("search-results-summary").classList.remove("hidden");

    const tbody = document.querySelector("#adv-search-table tbody");
    tbody.innerHTML = "";
    if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="no-data">لا توجد نتائج مطابقة.</td></tr>';
        return;
    }
    filtered.forEach(f => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${f.machineNumber || '-'} (${f.machineStage || '-'})</td>
            <td>${f.machineSection || '-'}</td>
            <td>كود ${f.faultCode || '-'} — ${f.faultName || '-'}</td>
            <td>${f.startTime ? new Date(f.startTime).toLocaleString("ar-EG") : '-'}</td>
            <td>${f.endTime ? new Date(f.endTime).toLocaleTimeString("ar-EG") : "مفتوح"}</td>
            <td>${f.status === "finished" ? formatDuration(getFaultDurationSeconds(f), "seconds") : "-"}</td>
        `;
        tbody.appendChild(tr);
    });
}

function updateParetoTable() {
    // Pareto يعتمد فقط على سجل الأعطال الحالي بعد الحذف.
    const faults = getStoredFaults().filter(f => f && f.status === "finished" && f.faultCode);
    const tbody = document.querySelector("#pareto-table tbody");
    if (!tbody) return;
    tbody.innerHTML = "";

    const totalFaultsCount = faults.length || 1;
    const totalFaultsDuration = faults.reduce((sum, f) => sum + getFaultDurationSeconds(f), 0) || 1;
    const paretoMap = {};

    faults.forEach(f => {
        const code = String(f.faultCode);
        if (!paretoMap[code]) {
            const codeInfo = FAULT_CODES.find(fc => String(fc.code) === code);
            paretoMap[code] = { code: f.faultCode, name: f.faultName || (codeInfo ? codeInfo.name : "عطل غير محدد"), count: 0, duration: 0 };
        }
        paretoMap[code].count += 1;
        paretoMap[code].duration += getFaultDurationSeconds(f);
    });

    const sortedPareto = Object.values(paretoMap).filter(item => item.count > 0).sort((a, b) => b.duration - a.duration || b.count - a.count);
    let cumulativeDurationPercent = 0;
    const chartLabels = [], chartDurations = [], chartCumulative = [];

    sortedPareto.forEach(item => {
        const countRatio = ((item.count / totalFaultsCount) * 100).toFixed(1);
        const durationRatio = (item.duration / totalFaultsDuration) * 100;
        cumulativeDurationPercent += durationRatio;
        chartLabels.push(`كود ${item.code}: ${item.name}`);
        chartDurations.push(Number(item.duration.toFixed(3)));
        chartCumulative.push(Number(cumulativeDurationPercent.toFixed(1)));
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>كود ${item.code}</td><td>${item.name}</td><td>${item.count}</td><td>${countRatio}%</td>
            <td>${formatDuration(item.duration, "seconds")}</td><td>${durationRatio.toFixed(1)}%</td>
            <td><strong>${cumulativeDurationPercent.toFixed(1)}%</strong></td>`;
        tbody.appendChild(tr);
    });

    renderParetoChart(chartLabels, chartDurations, chartCumulative);
}

function renderParetoChart(labels, durations, cumulative) {
    const canvasElement = document.getElementById("pareto-canvas");
    if (!canvasElement || typeof Chart === "undefined") return;
    if (paretoChartInstance) paretoChartInstance.destroy();

    // إظهار النسبة التراكمية داخل الرسم أسفل كل نقطة فقط.
    // يتم رسمها على الـcanvas نفسه، لذلك تظهر أيضًا عند طباعة الرسم.
    const paretoCumulativeLabelsPlugin = {
        id: 'paretoCumulativeLabels',
        afterDatasetsDraw(chart) {
            const lineDatasetIndex = chart.data.datasets.findIndex(ds => ds.type === 'line' || ds.yAxisID === 'y1');
            if (lineDatasetIndex < 0) return;
            const meta = chart.getDatasetMeta(lineDatasetIndex);
            const data = chart.data.datasets[lineDatasetIndex].data || [];
            const ctx = chart.ctx;
            ctx.save();
            ctx.font = 'bold 12px Tahoma, Arial, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillStyle = '#111827';
            meta.data.forEach((point, index) => {
                const value = Number(data[index]);
                if (!Number.isFinite(value)) return;
                ctx.fillText(`${value.toFixed(1)}%`, point.x, point.y + 9);
            });
            ctx.restore();
        }
    };

    paretoChartInstance = new Chart(canvasElement, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                { label: 'وقت التوقف (بالثواني)', data: durations, backgroundColor: 'rgba(37, 99, 235, 0.7)', yAxisID: 'y' },
                { label: 'النسبة التراكمية (%)', data: cumulative, type: 'line', borderColor: 'rgba(220, 38, 38, 1)', yAxisID: 'y1', fill: false }
            ]
        },
        plugins: [paretoCumulativeLabelsPlugin],
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { type: 'linear', position: 'left', beginAtZero: true },
                y1: { type: 'linear', position: 'right', max: 100, grid: { drawOnChartArea: false }, beginAtZero: true }
            }
        }
    });
}

function buildParetoPrintHtml(includeTable) {
    const canvas = document.getElementById("pareto-canvas");
    if (!canvas) return null;
    // تحويل الـ canvas إلى صورة يضمن ظهور الرسم في الطباعة بدلاً من صفحة بيضاء.
    const chartImage = canvas.toDataURL("image/png", 1.0);
    const table = document.getElementById("pareto-table");
    const tableHtml = includeTable && table ? table.outerHTML : "";
    return `
        <html lang="ar" dir="rtl"><head><title>تحليل Pareto</title>
        <style>
            body{font-family:Tahoma,Arial,sans-serif;padding:20px;color:#111;text-align:center;background:#fff}
            h2{margin-bottom:20px}.chart{width:100%;max-width:1100px;height:auto;display:block;margin:auto}
            table{width:100%;border-collapse:collapse;margin-top:25px;font-size:12px;direction:rtl}
            th,td{border:1px solid #333;padding:7px;text-align:center}th{background:#eee}
            @page{size:auto;margin:12mm}
        </style></head><body>
        <h2>📈 تحليل Pareto لأعطال مصنع 5</h2>
        <img class="chart" src="${chartImage}" alt="Pareto Chart">
        ${includeTable ? `<h3>تفاصيل تحليل الأعطال</h3>${tableHtml}` : ""}
        </body></html>`;
}

function printParetoChartOnly() {
    const html = buildParetoPrintHtml(false);
    if (!html) return alert("لا يوجد رسم Pareto للطباعة.");
    const printWindow = window.open('', '_blank');
    if (!printWindow) return alert("المتصفح منع نافذة الطباعة. اسمح بالنوافذ المنبثقة ثم حاول مرة أخرى.");
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => { printWindow.print(); }, 300);
}

function executePrintPareto() {
    const html = buildParetoPrintHtml(true);
    if (!html) return alert("لا يوجد تحليل Pareto للطباعة.");
    const printWindow = window.open('', '_blank');
    if (!printWindow) return alert("المتصفح منع نافذة الطباعة. اسمح بالنوافذ المنبثقة ثم حاول مرة أخرى.");
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => { printWindow.print(); }, 300);
}

function updateFullLogsTable() {
    const faults = getStoredFaults();
    const tbody = document.querySelector("#full-logs-table tbody");
    if (!tbody) return;
    tbody.innerHTML = "";
    if (faults.length === 0) {
        tbody.innerHTML = '<tr><td colspan="12" class="no-data">لا توجد أعطال مسجلة.</td></tr>';
        return;
    }
    faults.forEach(f => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${f.startTime ? new Date(f.startTime).toLocaleDateString("ar-EG") : '-'}</td>
            <td>${f.machineZone || '-'}</td>
            <td>${f.machineSection || '-'}</td>
            <td>${f.machineNumber || '-'}</td>
            <td>${f.machineStage || '-'}</td>
            <td>${f.faultCode || '-'}</td>
            <td>${f.faultName || '-'}</td>
            <td>${f.startTime ? new Date(f.startTime).toLocaleTimeString("ar-EG") : '-'}</td>
            <td>${f.endTime ? new Date(f.endTime).toLocaleTimeString("ar-EG") : "مفتوح"}</td>
            <td>${f.status === "finished" ? formatDuration(getFaultDurationSeconds(f), "seconds") : "مفتوح"}</td>
            <td>${f.notes || "-"}</td>
            <td><button class="btn btn-danger" style="padding: 4px 8px; font-size: 12px;" onclick="deleteFault('${f.id}')">🗑 حذف</button></td>
        `;
        tbody.appendChild(tr);
    });
}

function executePrintReport() {
    const reportType = document.getElementById("report-type").value;
    const machineFilter = document.getElementById("report-machine-filter").value.trim();
    const faultFilter = document.getElementById("report-fault-filter").value.trim();
    const dateFrom = document.getElementById("report-date-from").value;
    const dateTo = document.getElementById("report-date-to").value;
    const faults = getStoredFaults();

    const filtered = faults.filter(f => {
        if (reportType === "finished" && f.status !== "finished") return false;
        if (reportType === "active" && f.status !== "active") return false;
        if (machineFilter && f.machineNumber !== machineFilter) return false;
        if (faultFilter && String(f.faultCode) !== faultFilter) return false;
        let matchDate = true;
        if (f.startTime) {
            const fDate = new Date(f.startTime).toISOString().split('T')[0];
            if (dateFrom && fDate < dateFrom) matchDate = false;
            if (dateTo && fDate > dateTo) matchDate = false;
        }
        return matchDate;
    });

    document.getElementById("print-meta-info").textContent = `تاريخ الاستخراج: ${new Date().toLocaleString("ar-EG")} | الفترة: ${dateFrom || 'البداية'} إلى ${dateTo || 'الآن'}`;
    document.getElementById("print-summary-box").innerHTML = `<strong>إجمالي الأعطال بالتقرير:</strong> ${filtered.length} &nbsp;|&nbsp; <strong>إجمالي وقت التوقف:</strong> ${formatDuration(filtered.reduce((sum, f) => sum + getFaultDurationMinutes(f), 0))}`;

    const tbody = document.querySelector("#print-table-element tbody");
    tbody.innerHTML = "";
    filtered.forEach(f => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${f.startTime ? new Date(f.startTime).toLocaleDateString("ar-EG") : '-'}</td>
            <td>${f.machineZone || '-'}</td>
            <td>${f.machineSection || '-'}</td>
            <td>${f.machineNumber || '-'}</td>
            <td>${f.machineStage || '-'}</td>
            <td>${f.faultName || '-'}</td>
            <td>${f.startTime ? new Date(f.startTime).toLocaleTimeString("ar-EG") : '-'}</td>
            <td>${f.endTime ? new Date(f.endTime).toLocaleTimeString("ar-EG") : "مفتوح"}</td>
            <td>${f.status === "finished" ? formatDuration(getFaultDurationSeconds(f), "seconds") : "مفتوح"}</td>
        `;
        tbody.appendChild(tr);
    });
    window.print();
}
