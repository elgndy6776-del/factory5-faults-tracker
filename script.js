/**
 * نظام أعطال مصنع 5 - الملف البرمجي الرئيسي (النسخة الكاملة النهائية - محسنة للموبايل)
 */

const MACHINES = [
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

document.addEventListener("DOMContentLoaded", () => {
    initClock();
    populateFaultCodes();
    loadFaultsFromStorage();
    setupEventListeners();
    restoreAdminStateOnLoad();
});

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
    try {
        const data = localStorage.getItem("factory5_faults");
        return data ? JSON.parse(data) : [];
    } catch (e) {
        return [];
    }
}

function saveStoredFaults(faults) {
    localStorage.setItem("factory5_faults", JSON.stringify(faults));
}

function formatDuration(minutesDecimal) {
    if (minutesDecimal === null || minutesDecimal === undefined || isNaN(minutesDecimal)) return "-";
    const totalSeconds = Math.round(minutesDecimal * 60);
    if (totalSeconds < 60) return `${totalSeconds} ثانية`;
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    if (secs === 0) return `${mins} دقيقة`;
    return `${mins.toFixed(1)} دقيقة (${mins} د و ${secs} ث)`;
}

function switchAdminTab(tabId) {
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

    localStorage.setItem("factory5_active_tab", tabId);

    if (tabId === "tab-indicators") updateIndicators();
    if (tabId === "tab-machines") updateMachinesPerformanceTable();
    if (tabId === "tab-pareto") updateParetoTable();
    if (tabId === "tab-logs") updateFullLogsTable();
}

function restoreAdminStateOnLoad() {
    const isAdminOpen = localStorage.getItem("factory5_admin_open") === "true";
    const savedTab = localStorage.getItem("factory5_active_tab") || "tab-indicators";

    if (isAdminOpen) {
        const adminPanel = document.getElementById("admin-panel");
        if (adminPanel) {
            adminPanel.classList.remove("hidden");
            switchAdminTab(savedTab);
        }
    }
}

function setupEventListeners() {
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

    const scanBtn = document.getElementById("scan-qr-btn");
    if (scanBtn) scanBtn.addEventListener("click", startScanner);
    
    const closeScannerBtn = document.getElementById("close-scanner-btn");
    if (closeScannerBtn) closeScannerBtn.addEventListener("click", stopScanner);

    const startFaultBtn = document.getElementById("start-fault-btn");
    if (startFaultBtn) startFaultBtn.addEventListener("click", startFaultRecord);

    const switchWorkerView = document.getElementById("switch-worker-view");
    const switchTechView = document.getElementById("switch-tech-view");
    const faultRegSection = document.getElementById("fault-registration-section");
    const techDashboardSection = document.getElementById("tech-dashboard-section");
    const workerActiveFaultsSection = document.getElementById("worker-active-faults-section");

    if (switchWorkerView && switchTechView) {
        switchWorkerView.addEventListener("click", () => {
            switchWorkerView.classList.add("active-mode-btn", "btn-primary");
            switchWorkerView.classList.remove("btn-outline");
            switchTechView.classList.remove("active-mode-btn", "btn-primary");
            switchTechView.classList.add("btn-outline");
            
            if (faultRegSection) faultRegSection.classList.remove("hidden");
            if (workerActiveFaultsSection) workerActiveFaultsSection.classList.remove("hidden");
            if (techDashboardSection) techDashboardSection.classList.add("hidden");
        });

        switchTechView.addEventListener("click", () => {
            switchTechView.classList.add("active-mode-btn", "btn-primary");
            switchTechView.classList.remove("btn-outline");
            switchWorkerView.classList.remove("active-mode-btn", "btn-primary");
            switchWorkerView.classList.add("btn-outline");
            
            if (faultRegSection) faultRegSection.classList.add("hidden");
            if (workerActiveFaultsSection) workerActiveFaultsSection.classList.add("hidden");
            if (techDashboardSection) techDashboardSection.classList.remove("hidden");
        });
    }

    const backToIndicatorsBtns = document.querySelectorAll(".back-to-indicators-btn, #back-to-indicators, [data-target='tab-indicators']");
    backToIndicatorsBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const targetTab = btn.getAttribute("data-target") || "tab-indicators";
            switchAdminTab(targetTab);
        });
    });

    const adminLoginBtn = document.getElementById("admin-login-btn");
    if (adminLoginBtn) {
        adminLoginBtn.addEventListener("click", () => {
            document.getElementById("login-modal").classList.remove("hidden");
            document.getElementById("admin-password-input").value = "";
            document.getElementById("login-error-msg").classList.add("hidden");
            document.getElementById("admin-password-input").focus();
        });
    }

    const closeLoginBtn = document.getElementById("close-login-btn");
    if (closeLoginBtn) {
        closeLoginBtn.addEventListener("click", () => {
            document.getElementById("login-modal").classList.add("hidden");
        });
    }

    const submitLoginBtn = document.getElementById("submit-login-btn");
    if (submitLoginBtn) submitLoginBtn.addEventListener("click", verifyAdminPassword);

    const adminPasswordInput = document.getElementById("admin-password-input");
    if (adminPasswordInput) {
        adminPasswordInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") verifyAdminPassword();
        });
    }

    const logoutAdminBtn = document.getElementById("logout-admin-btn");
    if (logoutAdminBtn) {
        logoutAdminBtn.addEventListener("click", () => {
            document.getElementById("admin-panel").classList.add("hidden");
            localStorage.setItem("factory5_admin_open", "false");
            localStorage.removeItem("factory5_active_tab");
        });
    }

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
}

function findAndSelectMachine(query) {
    if (!query) {
        alert("من فضلك أدخل رقم الماكينة أولاً");
        return;
    }
    const cleanQuery = query.trim();
    const machine = MACHINES.find(m => m.number === cleanQuery);
    const card = document.getElementById("machine-info-card");
    if (machine) {
        selectedMachine = machine;
        document.getElementById("info-zone").textContent = machine.zone;
        document.getElementById("info-section").textContent = machine.section;
        document.getElementById("info-number").textContent = machine.number;
        document.getElementById("info-stage").textContent = machine.stage;
        card.classList.remove("hidden");
    } else {
        selectedMachine = null;
        card.classList.add("hidden");
        alert(`رقم الماكينة (${cleanQuery}) غير موجود في قائمة مصنع 5`);
    }
}

function startScanner() {
    const container = document.getElementById("scanner-container");
    if (!container) return;
    container.style.display = "block";

    if (typeof Html5Qrcode === "undefined") {
        alert("مكتبة قراءة الباركود غير متوفرة.");
        container.style.display = "none";
        return;
    }

    if (html5QrCode) {
        html5QrCode.stop().catch(() => {}).then(() => {
            initCameraScanner(container);
        });
    } else {
        initCameraScanner(container);
    }
}

function initCameraScanner(container) {
    html5QrCode = new Html5Qrcode("reader");

    const qrboxFunction = function(viewfinderWidth, viewfinderHeight) {
        const minEdge = Math.min(viewfinderWidth, viewfinderHeight);
        const qrboxSize = Math.floor(minEdge * 0.75);
        return { width: qrboxSize, height: qrboxSize };
    };

    const config = {
        fps: 15,
        qrbox: qrboxFunction,
        aspectRatio: 1.0
    };

    html5QrCode.start(
        { facingMode: "environment" },
        config,
        (decodedText) => {
            const scannedNumber = decodedText.trim();
            const searchInput = document.getElementById("machine-search-input");
            if (searchInput) {
                searchInput.value = scannedNumber;
            }
            stopScanner();
            findAndSelectMachine(scannedNumber);
        },
        () => {}
    ).catch(err => {
        console.error("Camera start error:", err);
        alert("تعذر فتح الكاميرا. يرجى التأكد من إعطاء صلاحية الكاميرا للمتصفح.");
        container.style.display = "none";
    });
}

function stopScanner() {
    const container = document.getElementById("scanner-container");
    if (!container) return;
    if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.stop().then(() => { 
            container.style.display = "none"; 
        }).catch(() => { 
            container.style.display = "none"; 
        });
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
        durationMinutes: 0,
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

    loadFaultsFromStorage();
    alert("تم تسجيل بداية العطل بنجاح");
}

function loadFaultsFromStorage() {
    const faults = getStoredFaults();
    const container = document.getElementById("active-faults-container");
    
    const techCatElectricity = document.getElementById("tech-cat-electricity");
    const techCatMachines = document.getElementById("tech-cat-machines");
    const techCatMechanics = document.getElementById("tech-cat-mechanics");
    const techCatServices = document.getElementById("tech-cat-services");
    
    if (!container && !techCatElectricity) return;

    const activeFaults = faults.filter(f => f.status === "active");

    const createFaultCardHTML = (fault, isTechMode) => {
        const startTimeStr = fault.startTime ? new Date(fault.startTime).toLocaleTimeString("ar-EG") : "-";
        const elapsedSeconds = fault.startTime ? Math.floor((Date.now() - fault.startTime) / 1000) : 0;
        let timeDisplay = elapsedSeconds < 60 ? `${elapsedSeconds} ثانية` : `${Math.floor(elapsedSeconds / 60)} دقيقة و ${elapsedSeconds % 60} ثانية`;

        return `
            <div class="fault-card">
                <div class="fault-card-header">🔴 ماكينة عطلانة: ${fault.machineNumber || 'غير معروف'}</div>
                <div class="fault-card-body">
                    <p><strong>المرحلة:</strong> ${fault.machineStage || '-'}</p>
                    <p><strong>القسم:</strong> ${fault.machineSection || '-'} (${fault.machineZone || '-'})</p>
                    <p><strong>العطل:</strong> كود ${fault.faultCode || '-'} — ${fault.faultName || '-'}</p>
                    <p><strong>وقت البداية:</strong> ${startTimeStr}</p>
                    <p><strong>مدة التوقف:</strong> <span class="elapsed-time">${timeDisplay}</span></p>
                    ${fault.notes ? `<p><strong>ملاحظات:</strong> ${fault.notes}</p>` : ""}
                </div>
                ${!isTechMode ? `<button class="btn btn-danger btn-block" onclick="endFault('${fault.id}')">⏹ انتهاء العطل</button>` : `<button class="btn btn-success btn-block" onclick="endFault('${fault.id}')">✅ تم الإصلاح وإنهاء العطل</button>`}
            </div>
        `;
    };

    if (container) {
        if (activeFaults.length === 0) {
            container.innerHTML = '<p class="no-data">لا توجد أعطال مفتوحة حالياً.</p>';
        } else {
            let html = "";
            activeFaults.forEach(fault => { html += createFaultCardHTML(fault, false); });
            container.innerHTML = html;
        }
    }

    if (techCatElectricity && techCatMachines && techCatMechanics && techCatServices) {
        const excludedCodes = [3, 7, 8, 9, 11, 14, 15, 17];
        const techActiveFaults = activeFaults.filter(f => !excludedCodes.includes(Number(f.faultCode)));

        const electricityFaults = techActiveFaults.filter(f => Number(f.faultCode) === 5);
        const machinesFaults = techActiveFaults.filter(f => [1, 2].includes(Number(f.faultCode)));
        const mechanicsFaults = techActiveFaults.filter(f => [4, 6, 13].includes(Number(f.faultCode)));
        const servicesFaults = techActiveFaults.filter(f => [10, 12, 16].includes(Number(f.faultCode)));

        const renderCategory = (list) => {
            if (list.length === 0) return '<p class="no-data">لا توجد أعطال في هذا القسم حالياً.</p>';
            let h = "";
            list.forEach(f => { h += createFaultCardHTML(f, true); });
            return h;
        };

        techCatElectricity.innerHTML = renderCategory(electricityFaults);
        techCatMachines.innerHTML = renderCategory(machinesFaults);
        techCatMechanics.innerHTML = renderCategory(mechanicsFaults);
        techCatServices.innerHTML = renderCategory(servicesFaults);
    }
}

window.endFault = function(faultId) {
    const faults = getStoredFaults();
    const fault = faults.find(f => f.id === faultId);
    if (!fault) return;
    fault.endTime = Date.now();
    fault.durationMinutes = Number(((fault.endTime - fault.startTime) / 60000).toFixed(3));
    fault.status = "finished";
    saveStoredFaults(faults);
    loadFaultsFromStorage();
    alert(`تم تسجيل انتهاء العطل. المدة: ${formatDuration(fault.durationMinutes)}`);
};

window.deleteFault = function(faultId) {
    if (!confirm("هل أنت متأكد من رغبتك في حذف هذا العطل نهائياً؟")) return;
    let faults = getStoredFaults();
    faults = faults.filter(f => f.id !== faultId);
    saveStoredFaults(faults);
    loadFaultsFromStorage();
    switchAdminTab(localStorage.getItem("factory5_active_tab") || "tab-indicators");
    alert("تم حذف العطل بنجاح.");
};

function verifyAdminPassword() {
    const pass = document.getElementById("admin-password-input").value;
    const errorMsg = document.getElementById("login-error-msg");
    if (pass === "205080") {
        document.getElementById("login-modal").classList.add("hidden");
        document.getElementById("admin-panel").classList.remove("hidden");
        localStorage.setItem("factory5_admin_open", "true");
        switchAdminTab(localStorage.getItem("factory5_active_tab") || "tab-indicators");
    } else {
        errorMsg.classList.remove("hidden");
    }
}

function updateIndicators() {
    const faults = getStoredFaults();
    const total = faults.length;
    const active = faults.filter(f => f.status === "active").length;
    const finished = faults.filter(f => f.status === "finished").length;
    const totalDurationDecimal = faults.reduce((sum, f) => sum + (f.durationMinutes || 0), 0);

    const setEl = (id, val) => { const el = document.getElementById(id); if(el) el.textContent = val; };
    setEl("kpi-total", total);
    setEl("kpi-active", active);
    setEl("kpi-finished", finished);
    setEl("kpi-total-time", formatDuration(totalDurationDecimal));
}

function updateMachinesPerformanceTable() {
    const faults = getStoredFaults();
    const tbody = document.querySelector("#machines-performance-table tbody");
    if (!tbody) return;
    tbody.innerHTML = "";
    const totalFactoryTime = faults.reduce((sum, f) => sum + (f.durationMinutes || 0), 0) || 1;

    MACHINES.forEach(machine => {
        const mFaults = faults.filter(f => f.machineNumber === machine.number);
        const count = mFaults.length;
        const totalDuration = mFaults.reduce((sum, f) => sum + (f.durationMinutes || 0), 0);
        const avgDuration = count > 0 ? totalDuration / count : 0;
        const maxDuration = count > 0 ? Math.max(...mFaults.map(f => f.durationMinutes || 0)) : 0;
        const stopRatio = ((totalDuration / totalFactoryTime) * 100).toFixed(1);

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${machine.number}</td>
            <td>${machine.stage}</td>
            <td>${machine.zone}</td>
            <td>${machine.section}</td>
            <td>${count}</td>
            <td>${formatDuration(totalDuration)}</td>
            <td>${formatDuration(avgDuration)}</td>
            <td>${formatDuration(maxDuration)}</td>
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
    const totalDuration = filtered.reduce((sum, f) => sum + (f.durationMinutes || 0), 0);

    const setEl = (id, val) => { const el = document.getElementById(id); if(el) el.textContent = val; };
    setEl("res-count", count);
    setEl("res-finished", finished);
    setEl("res-active", active);
    setEl("res-total-duration", formatDuration(totalDuration));
    setEl("res-avg-duration", formatDuration(count > 0 ? totalDuration / count : 0));
    setEl("res-max-duration", formatDuration(count > 0 ? Math.max(...filtered.map(f => f.durationMinutes || 0)) : 0));
    
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
            <td>${f.status === "finished" ? formatDuration(f.durationMinutes) : "-"}</td>
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
    const totalFaultsDuration = faults.reduce((sum, f) => sum + (f.durationMinutes || 0), 0) || 1;

    const paretoMap = {};
    FAULT_CODES.forEach(fc => { paretoMap[fc.code] = { code: fc.code, name: fc.name, count: 0, duration: 0 }; });

    faults.forEach(f => {
        if (paretoMap[f.faultCode]) {
            paretoMap[f.faultCode].count += 1;
            paretoMap[f.faultCode].duration += (f.durationMinutes || 0);
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
        chartDurations.push(Number(item.duration.toFixed(2)));
        chartCumulative.push(Number(cumulativeDurationPercent.toFixed(1)));

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>كود ${item.code}</td>
            <td>${item.name}</td>
            <td>${item.count}</td>
            <td>${countRatio}%</td>
            <td>${formatDuration(item.duration)}</td>
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
                { label: 'وقت التوقف (بالدقائق)', data: durations, backgroundColor: 'rgba(37, 99, 235, 0.7)', yAxisID: 'y' },
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

function printParetoChartOnly() {
    const chartCard = document.getElementById("pareto-chart-card");
    if (!chartCard) return;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html lang="ar" dir="rtl">
        <head>
            <title>طباعة تحليل Pareto</title>
            <style>
                body { font-family: Tahoma, sans-serif; text-align: center; padding: 20px; }
                h2 { color: #1e293b; }
                .chart-container { width: 90%; max-width: 900px; margin: 0 auto; height: 500px; }
            </style>
        </head>
        <body>
            <h2>📈 تحليل Pareto لأعطال مصنع 5</h2>
            <div class="chart-container">
                <canvas id="printCanvas"></canvas>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
            <script>
                setTimeout(() => {
                    const originalCanvas = window.opener.document.getElementById('pareto-canvas');
                    if (originalCanvas) {
                        const newCanvas = document.getElementById('printCanvas');
                        const ctx = newCanvas.getContext('2d');
                        const chartInstance = window.opener.paretoChartInstance;
                        if(chartInstance) {
                            new Chart(ctx, {
                                type: chartInstance.config.type,
                                data: JSON.parse(JSON.stringify(chartInstance.config.data)),
                                options: { responsive: true, maintainAspectRatio: false }
                            });
                        }
                    }
                    setTimeout(() => { window.print(); window.close(); }, 500);
                }, 300);
            </script>
        </body>
        </html>
    `);
    printWindow.document.close();
}

function executePrintPareto() { window.print(); }

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
            <td>${f.status === "finished" ? formatDuration(f.durationMinutes) : "مفتوح"}</td>
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
    document.getElementById("print-summary-box").innerHTML = `<strong>إجمالي الأعطال بالتقرير:</strong> ${filtered.length} &nbsp;|&nbsp; <strong>إجمالي وقت التوقف:</strong> ${formatDuration(filtered.reduce((sum, f) => sum + (f.durationMinutes || 0), 0))}`;

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
            <td>${f.status === "finished" ? formatDuration(f.durationMinutes) : "مفتوح"}</td>
        `;
        tbody.appendChild(tr);
    });
    window.print();
}
