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

const FAULT_CODES = [
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

let selectedMachine = null;
let html5QrCode = null;
let paretoChartInstance = null;
let cachedFaults = [];

document.addEventListener("DOMContentLoaded", () => {
    initClock();
    populateFaultCodes();
    setupRealtimeSync();
    setupMachineSync();
    setupEventListeners();
    restoreAdminStateOnLoad();
});

function setupRealtimeSync() {
    if (!rtdb) return;
    rtdb.ref('factory5_faults').on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
            cachedFaults = Object.values(data);
            localStorage.setItem("factory5_faults_backup", JSON.stringify(cachedFaults));
        } else {
            cachedFaults = [];
            // لا نحذف النسخة الاحتياطية تلقائياً؛ الحذف يتم فقط من لوحة الإدارة.
        }
        loadFaultsFromStorage();
        const activeTab = sessionStorage.getItem("factory5_active_tab") || "tab-indicators";
        if (document.getElementById("admin-panel") && !document.getElementById("admin-panel").classList.contains("hidden")) {
            if (activeTab === "tab-indicators") updateIndicators();
            else if (activeTab === "tab-machines") updateMachinesPerformanceTable();
            else if (activeTab === "tab-machine-management") updateMachineManagementTable();
            else if (activeTab === "tab-pareto") updateParetoTable();
            else if (activeTab === "tab-logs") updateFullLogsTable();
        }
    });
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

function initClock() {
    const clockEl = document.getElementById("live-clock");
    if (clockEl) {
        setInterval(() => {
            const now = new Date();
            clockEl.textContent = now.toLocaleTimeString("ar-EG");
        }, 1000);
    }
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
    if (Array.isArray(cachedFaults) && cachedFaults.length) return cachedFaults;
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

// مدة دقيقة بدون تقريب: نعتمد على وقت البداية والنهاية للمسجلات الجديدة،
// مع دعم السجلات القديمة التي تحتوي durationMinutes حتى لا نفقد أي بيانات.
function getFaultDurationSeconds(fault) {
    if (!fault) return 0;
    if (Number.isFinite(Number(fault.durationSeconds))) return Math.max(0, Number(fault.durationSeconds));
    if (fault.startTime && fault.endTime) return Math.max(0, (Number(fault.endTime) - Number(fault.startTime)) / 1000);
    if (Number.isFinite(Number(fault.durationMinutes))) return Math.max(0, Number(fault.durationMinutes) * 60);
    return 0;
}

function getFaultDurationMinutes(fault) {
    return getFaultDurationSeconds(fault) / 60;
}

function formatDuration(value, unit = "minutes") {
    if (value === null || value === undefined || isNaN(value)) return "-";
    const totalSeconds = Math.max(0, Math.round(unit === "seconds" ? Number(value) : Number(value) * 60));
    if (totalSeconds < 60) return `${totalSeconds} ثانية`;
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    if (secs === 0) return `${mins} دقيقة`;
    return `${mins} دقيقة و ${secs} ثانية`;
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
    else if (tabId === "tab-pareto") updateParetoTable();
    else if (tabId === "tab-logs") updateFullLogsTable();
}

function restoreAdminStateOnLoad() {
    // sessionStorage خاص بنفس التبويب: يظل الدخول موجوداً عند Refresh فقط،
    // أما تبويب/جلسة جديدة فتحتاج كلمة المرور من جديد.
    const adminPanel = document.getElementById("admin-panel");
    const loginModal = document.getElementById("login-modal");
    const isAuthenticated = sessionStorage.getItem("factory5_admin_authenticated") === "true";

    if (loginModal) loginModal.classList.add("hidden");
    if (isAuthenticated && adminPanel) {
        adminPanel.classList.remove("hidden");
        const activeTab = sessionStorage.getItem("factory5_active_tab") || "tab-indicators";
        switchAdminTab(activeTab);
    } else if (adminPanel) {
        adminPanel.classList.add("hidden");
    }
}

function setupEventListeners() {
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

    // 4. أزرار تبديل الواجهات (عمال / فنيين) - التصحيح الجذري للعمل الفوري
    const switchWorkerView = document.getElementById("switch-worker-view");
    const switchTechView = document.getElementById("switch-tech-view");
    const faultRegSection = document.getElementById("fault-registration-section");
    const techDashboardSection = document.getElementById("tech-dashboard-section");
    const workerActiveFaultsSection = document.getElementById("worker-active-faults-section");

    if (switchWorkerView) {
        switchWorkerView.addEventListener("click", () => {
            switchWorkerView.classList.add("active-mode-btn", "btn-primary");
            switchWorkerView.classList.remove("btn-outline");
            if (switchTechView) {
                switchTechView.classList.remove("active-mode-btn", "btn-primary");
                switchTechView.classList.add("btn-outline");
            }
            if (faultRegSection) faultRegSection.classList.remove("hidden");
            if (workerActiveFaultsSection) workerActiveFaultsSection.classList.remove("hidden");
            if (techDashboardSection) techDashboardSection.classList.add("hidden");
        });
    }

    if (switchTechView) {
        switchTechView.addEventListener("click", () => {
            switchTechView.classList.add("active-mode-btn", "btn-primary");
            switchTechView.classList.remove("btn-outline");
            if (switchWorkerView) {
                switchWorkerView.classList.remove("active-mode-btn", "btn-primary");
                switchWorkerView.classList.add("btn-outline");
            }
            if (faultRegSection) faultRegSection.classList.add("hidden");
            if (workerActiveFaultsSection) workerActiveFaultsSection.classList.add("hidden");
            if (techDashboardSection) techDashboardSection.classList.remove("hidden");
            loadFaultsFromStorage();
        });
    }

    // 5. زر فتح نافذة تسجيل دخول الإدارة
    const adminLoginBtn = document.getElementById("admin-login-btn");
    if (adminLoginBtn) {
        adminLoginBtn.addEventListener("click", () => {
            const loginModal = document.getElementById("login-modal");
            if (loginModal) loginModal.classList.remove("hidden");
            const passInput = document.getElementById("admin-password-input");
            if (passInput) {
                passInput.value = "";
                passInput.focus();
            }
            const errorMsg = document.getElementById("login-error-msg");
            if (errorMsg) errorMsg.classList.add("hidden");
        });
    }

    const closeLoginBtn = document.getElementById("close-login-btn");
    if (closeLoginBtn) {
        closeLoginBtn.addEventListener("click", () => {
            document.getElementById("login-modal").classList.add("hidden");
        });
    }

    const submitLoginBtn = document.getElementById("submit-login-btn");
    if (submitLoginBtn) {
        submitLoginBtn.addEventListener("click", verifyAdminPassword);
    }

    const adminPasswordInput = document.getElementById("admin-password-input");
    if (adminPasswordInput) {
        adminPasswordInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") verifyAdminPassword();
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

    const saveMachineBtn = document.getElementById("save-machine-btn");
    if (saveMachineBtn) saveMachineBtn.addEventListener("click", saveMachineFromAdmin);
    const cancelMachineEditBtn = document.getElementById("cancel-machine-edit-btn");
    if (cancelMachineEditBtn) cancelMachineEditBtn.addEventListener("click", clearMachineForm);
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
        startTime: Date.now(),
        endTime: null,
        durationMinutes: 0, // للتوافق مع البيانات القديمة
        durationSeconds: 0,
        notes: notes,
        status: "active"
    };

    const faults = getStoredFaults();
    faults.push(newFault);
    saveStoredFaults(faults);

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
    
    if (!container && !techCatElectricity) return;

    const activeFaults = faults.filter(f => f.status === "active");

    const createFaultCardHTML = (fault, isTechMode) => {
        const startTimeStr = fault.startTime ? new Date(fault.startTime).toLocaleTimeString("ar-EG") : "-";
        const elapsedSeconds = fault.startTime ? Math.floor((Date.now() - fault.startTime) / 1000) : 0;
        let timeDisplay = elapsedSeconds < 60 ? `${elapsedSeconds} ثانية` : `${Math.floor(elapsedSeconds / 60)} دقيقة و ${elapsedSeconds % 60} ثانية`;

        return `
            <div class="fault-card" style="background:#fff; border:1px solid #cbd5e1; padding:12px; border-radius:6px; margin-bottom:10px;">
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

    if (techCatElectricity && techCatMachines && techCatMechanics && techCatAir && techCatServices) {
        const excludedCodes = [3, 7, 8, 9, 11, 14, 15, 17];
        const techActiveFaults = activeFaults.filter(f => !excludedCodes.includes(Number(f.faultCode)));

        // توزيع أعطال شاشات الفنيين بشكل حصري: كل كود له شاشة واحدة فقط.
        // مهم: الكود 12 يتبع صيانة الكهرباء، وليس أمن وأوناش.
        const electricityCodes = new Set([5, 12]);
        const machinesCodes = new Set([1, 2]);
        const mechanicsCodes = new Set([4, 13]);
        const airCodes = new Set([6]);
        const servicesCodes = new Set([10, 16]);

        const getTechCategory = (faultCode) => {
            const code = Number(faultCode);
            if (electricityCodes.has(code)) return 'electricity';
            if (machinesCodes.has(code)) return 'machines';
            if (mechanicsCodes.has(code)) return 'mechanics';
            if (airCodes.has(code)) return 'air';
            if (servicesCodes.has(code)) return 'services';
            return null;
        };

        // كل عطل يُضاف لقائمة واحدة فقط حسب الكود، لمنع ظهور نفس العطل في شاشتين.
        const categoryLists = {
            electricity: [],
            machines: [],
            mechanics: [],
            air: [],
            services: []
        };
        techActiveFaults.forEach(fault => {
            const category = getTechCategory(fault.faultCode);
            if (category) categoryLists[category].push(fault);
        });

        const electricityFaults = categoryLists.electricity;
        const machinesFaults = categoryLists.machines;
        const mechanicsFaults = categoryLists.mechanics;
        const airFaults = categoryLists.air;
        const servicesFaults = categoryLists.services;

        const renderCategory = (list) => {
            if (list.length === 0) return '<p class="no-data" style="color:#64748b; font-size:13px;">لا توجد أعطال حالياً.</p>';
            let h = "";
            list.forEach(f => { h += createFaultCardHTML(f, true); });
            return h;
        };

        techCatElectricity.innerHTML = renderCategory(electricityFaults);
        techCatMachines.innerHTML = renderCategory(machinesFaults);
        techCatMechanics.innerHTML = renderCategory(mechanicsFaults);
        techCatAir.innerHTML = renderCategory(airFaults);
        techCatServices.innerHTML = renderCategory(servicesFaults);
    }
}

window.endFault = function(faultId) {
    const faults = getStoredFaults();
    const fault = faults.find(f => f.id === faultId);
    if (!fault) return;
    fault.endTime = Date.now();
    // نحفظ المدة بالثواني بدون تقريب، ونحتفظ بالحقل القديم للتوافق فقط.
    fault.durationSeconds = Math.max(0, (fault.endTime - fault.startTime) / 1000);
    fault.durationMinutes = fault.durationSeconds / 60;
    fault.status = "finished";
    saveStoredFaults(faults);
    alert(`تم تسجيل انتهاء العطل. المدة: ${formatDuration(fault.durationSeconds, "seconds")}`);
};

window.deleteFault = function(faultId) {
    if (!confirm("هل أنت متأكد من رغبتك في حذف هذا العطل نهائياً؟")) return;
    let faults = getStoredFaults();
    faults = faults.filter(f => f.id !== faultId);
    saveStoredFaults(faults);
    alert("تم حذف العطل بنجاح.");
};

function verifyAdminPassword() {
    const pass = document.getElementById("admin-password-input").value;
    const errorMsg = document.getElementById("login-error-msg");
    if (pass === "205080") {
        document.getElementById("login-modal").classList.add("hidden");
        document.getElementById("admin-panel").classList.remove("hidden");
        // حفظ الدخول داخل نفس التبويب فقط حتى يظل مفتوحاً عند Refresh.
        sessionStorage.setItem("factory5_admin_authenticated", "true");
        switchAdminTab(sessionStorage.getItem("factory5_active_tab") || "tab-indicators");
    } else {
        errorMsg.classList.remove("hidden");
    }
}

function updateIndicators() {
    const faults = getStoredFaults();
    const total = faults.length;
    const active = faults.filter(f => f.status === "active").length;
    const finished = faults.filter(f => f.status === "finished").length;
    const totalDurationSeconds = faults.reduce((sum, f) => sum + getFaultDurationSeconds(f), 0);

    const setEl = (id, val) => { const el = document.getElementById(id); if(el) el.textContent = val; };
    setEl("kpi-total", total);
    setEl("kpi-active", active);
    setEl("kpi-finished", finished);
    setEl("kpi-total-time", formatDuration(totalDurationSeconds, "seconds"));
}

function updateMachinesPerformanceTable() {
    const faults = getStoredFaults();
    const tbody = document.querySelector("#machines-performance-table tbody");
    if (!tbody) return;
    tbody.innerHTML = "";
    const totalFactoryTime = faults.reduce((sum, f) => sum + getFaultDurationSeconds(f), 0) || 1;

    MACHINES.forEach(machine => {
        const mFaults = faults.filter(f => f.machineNumber === machine.number);
        const count = mFaults.length;
        const totalDuration = mFaults.reduce((sum, f) => sum + getFaultDurationSeconds(f), 0);
        const avgDuration = count > 0 ? totalDuration / count : 0;
        const maxDuration = count > 0 ? Math.max(...mFaults.map(f => getFaultDurationSeconds(f))) : 0;
        const stopRatio = ((totalDuration / totalFactoryTime) * 100).toFixed(1);

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${machine.number}</td>
            <td>${machine.stage}</td>
            <td>${machine.zone}</td>
            <td>${machine.section}</td>
            <td>${count}</td>
            <td>${formatDuration(totalDuration, "seconds")}</td>
            <td>${formatDuration(avgDuration, "seconds")}</td>
            <td>${formatDuration(maxDuration, "seconds")}</td>
            <td>${stopRatio}%</td>
        `;
        tbody.appendChild(tr);
    });
}

function applyAdvancedSearch() {
    const query = document.getElementById("adv-search-query").value.trim().toLowerCase();
    const dateFrom = document.getElementById("date-from").value;
    const dateTo = document.getElementById("date-to").value;
    const faults = getStoredFaults();

    const filtered = faults.filter(f => {
        const matchQuery = !query || (f.machineNumber && f.machineNumber.toLowerCase().includes(query)) || (f.machineStage && f.machineStage.toLowerCase().includes(query)) || (f.faultName && f.faultName.toLowerCase().includes(query)) || String(f.faultCode) === query;
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
    const totalDuration = filtered.reduce((sum, f) => sum + getFaultDurationSeconds(f), 0);

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
    const faults = getStoredFaults().filter(f => f.status === "finished" && f.faultCode);
    const tbody = document.querySelector("#pareto-table tbody");
    if (!tbody) return;
    tbody.innerHTML = "";

    const totalFaultsCount = faults.length || 1;
    const totalFaultsDuration = faults.reduce((sum, f) => sum + getFaultDurationSeconds(f), 0) || 1;

    const paretoMap = {};
    FAULT_CODES.forEach(fc => { paretoMap[fc.code] = { code: fc.code, name: fc.name, count: 0, duration: 0 }; });

    faults.forEach(f => {
        if (paretoMap[f.faultCode]) {
            paretoMap[f.faultCode].count += 1;
            paretoMap[f.faultCode].duration += getFaultDurationSeconds(f);
        }
    });

    const sortedPareto = Object.values(paretoMap).sort((a, b) => b.duration - a.duration || b.count - a.count);
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
            <td>كود ${item.code}</td>
            <td>${item.name}</td>
            <td>${item.count}</td>
            <td>${countRatio}%</td>
            <td>${formatDuration(item.duration, "seconds")}</td>
            <td>${durationRatio.toFixed(1)}%</td>
            <td><strong>${cumulativeDurationPercent.toFixed(1)}%</strong></td>
        `;
        tbody.appendChild(tr);
    });

    renderParetoChart(chartLabels, chartDurations, chartCumulative);
}

function renderParetoChart(labels, durations, cumulative) {
    const canvasElement = document.getElementById("pareto-canvas");
    if (!canvasElement || typeof Chart === "undefined") return;
    if (paretoChartInstance) paretoChartInstance.destroy();

    paretoChartInstance = new Chart(canvasElement, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                { label: 'وقت التوقف (بالثواني)', data: durations, backgroundColor: 'rgba(37, 99, 235, 0.7)', yAxisID: 'y' },
                { label: 'النسبة التراكمية (%)', data: cumulative, type: 'line', borderColor: 'rgba(220, 38, 38, 1)', yAxisID: 'y1', fill: false }
            ]
        },
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
