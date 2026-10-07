// NutriFit Main Application Logic

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. STATE INITIALIZATION & LOCALSTORAGE
  // --------------------------------------------------------------------------
  const STORAGE_KEYS = {
    PROFILE: 'nutrifit_user_profile',
    CUSTOM_FOODS: 'nutrifit_custom_foods',
    DAILY_LOGS: 'nutrifit_daily_logs'
  };

  // Current Date Helper (YYYY-MM-DD)
  const getTodayDateString = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  let currentDate = getTodayDateString();

  // Load Custom Foods & Merge Database
  let customFoods = JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOM_FOODS)) || [];
  let foodDatabase = [...INITIAL_FOOD_DATABASE, ...customFoods];

  // --------------------------------------------------------------------------
  // USER PROFILE SWITCHER (Furkan & Ahmet)
  // --------------------------------------------------------------------------
  let activeUser = localStorage.getItem('nutrifit_active_user') || 'Furkan';

  const getDefaultProfile = (name) => ({
    gender: 'male',
    age: 25,
    height: name === 'Ahmet' ? 175 : 178,
    weight: name === 'Ahmet' ? 78 : 75,
    activity: 1.375, // 1-3 gün fitness
    goal: 'maintenance',
    proteinPref: 'high',
    targetCalories: name === 'Ahmet' ? 2300 : 2200,
    targetProtein: name === 'Ahmet' ? 170 : 165,
    targetCarbs: 220,
    targetFat: 70
  });

  let userProfile = getDefaultProfile(activeUser);
  let dailyLogs = {};

  function loadUserData(name) {
    const profileKey = `nutrifit_profile_${name}`;
    const logsKey = `nutrifit_logs_${name}`;

    // Furkan legacy data migration check
    if (name === 'Furkan' && !localStorage.getItem(profileKey) && localStorage.getItem('nutrifit_user_profile')) {
      userProfile = JSON.parse(localStorage.getItem('nutrifit_user_profile'));
      dailyLogs = JSON.parse(localStorage.getItem('nutrifit_daily_logs')) || {};
    } else {
      userProfile = JSON.parse(localStorage.getItem(profileKey)) || getDefaultProfile(name);
      dailyLogs = JSON.parse(localStorage.getItem(logsKey)) || {};
    }

    if (!dailyLogs[currentDate]) {
      dailyLogs[currentDate] = [
        { id: `demo_${name}_1`, meal: 'Kahvaltı', name: 'Yumurta (Tam, Haşlanmış - 1 Adet ~ 50g)', amount: 100, calories: 155, protein: 12.6, carbs: 1.1, fat: 10.6 },
        { id: `demo_${name}_2`, meal: 'Kahvaltı', name: 'Yulaf Ezmesi (Kuru)', amount: 60, calories: 233.4, protein: 10.1, carbs: 39.8, fat: 4.1 },
        { id: `demo_${name}_3`, meal: 'Öğle Yemeği', name: 'Tavuk Göğsü (Izgara / Haşlanmış, Pişmiş)', amount: 180, calories: 297, protein: 55.8, carbs: 0, fat: 6.5 }
      ];
      saveUserData();
    }
  }

  function saveUserData() {
    localStorage.setItem(`nutrifit_profile_${activeUser}`, JSON.stringify(userProfile));
    localStorage.setItem(`nutrifit_logs_${activeUser}`, JSON.stringify(dailyLogs));
    if (activeUser === 'Furkan') {
      localStorage.setItem('nutrifit_user_profile', JSON.stringify(userProfile));
      localStorage.setItem('nutrifit_daily_logs', JSON.stringify(dailyLogs));
    }
  }

  loadUserData(activeUser);

  // Active state for add-food modal
  let selectedFoodForModal = null;
  let activeMealForModal = 'Kahvaltı';

  // --------------------------------------------------------------------------
  // 2. DOM ELEMENTS
  // --------------------------------------------------------------------------
  const datePicker = document.getElementById('log-date-picker');
  datePicker.value = currentDate;

  // Navigation
  const navBtns = document.querySelectorAll('.nav-btn');
  const tabPages = document.querySelectorAll('.tab-page');

  // Calculator Form & Results
  const calcForm = document.getElementById('macro-calc-form');
  const resBmr = document.getElementById('res-bmr');
  const resTdee = document.getElementById('res-tdee');
  const resTargetCalories = document.getElementById('res-target-calories');
  const resGoalBadge = document.getElementById('res-goal-badge');
  const resProteinG = document.getElementById('res-protein-g');
  const resProteinKcal = document.getElementById('res-protein-kcal');
  const resProteinPct = document.getElementById('res-protein-pct');
  const resCarbsG = document.getElementById('res-carbs-g');
  const resCarbsKcal = document.getElementById('res-carbs-kcal');
  const resCarbsPct = document.getElementById('res-carbs-pct');
  const resFatG = document.getElementById('res-fat-g');
  const resFatKcal = document.getElementById('res-fat-kcal');
  const resFatPct = document.getElementById('res-fat-pct');
  const btnApplyTargets = document.getElementById('btn-apply-targets');
  const btnEditTargets = document.getElementById('btn-edit-targets');

  // Daily Tracker Displays
  const valConsumedCalories = document.getElementById('val-consumed-calories');
  const valTargetCalories = document.getElementById('val-target-calories');
  const valRemainingCalories = document.getElementById('val-remaining-calories');
  const calorieRing = document.getElementById('calorie-ring');

  const valConsumedProtein = document.getElementById('val-consumed-protein');
  const valTargetProtein = document.getElementById('val-target-protein');
  const barProtein = document.getElementById('bar-protein');
  const subtextProtein = document.getElementById('subtext-protein');

  const valConsumedCarbs = document.getElementById('val-consumed-carbs');
  const valTargetCarbs = document.getElementById('val-target-carbs');
  const barCarbs = document.getElementById('bar-carbs');
  const subtextCarbs = document.getElementById('subtext-carbs');

  const valConsumedFat = document.getElementById('val-consumed-fat');
  const valTargetFat = document.getElementById('val-target-fat');
  const barFat = document.getElementById('bar-fat');
  const subtextFat = document.getElementById('subtext-fat');

  // Modals
  const modalAddFood = document.getElementById('modal-add-food');
  const modalAddFoodClose = document.getElementById('modal-add-food-close');
  const modalMealName = document.getElementById('modal-meal-name');
  const modalFoodSearch = document.getElementById('modal-food-search');
  const modalFoodResults = document.getElementById('modal-food-results');
  const selectedFoodPanel = document.getElementById('selected-food-panel');
  const selFoodName = document.getElementById('sel-food-name');
  const selFoodCategory = document.getElementById('sel-food-category');
  const selFoodAmount = document.getElementById('sel-food-amount');
  const selFoodUnit = document.getElementById('sel-food-unit');
  const prevKcal = document.getElementById('prev-kcal');
  const prevProtein = document.getElementById('prev-protein');
  const prevCarbs = document.getElementById('prev-carbs');
  const prevFat = document.getElementById('prev-fat');
  const btnConfirmAddFood = document.getElementById('btn-confirm-add-food');
  const btnQuickAddFood = document.getElementById('btn-quick-add-food');

  // Database Tab & Custom Food Modal
  const dbSearchInput = document.getElementById('db-search-input');
  const dbCategoryPills = document.getElementById('db-category-pills');
  const dbFoodList = document.getElementById('db-food-list');
  const btnOpenCustomFoodModal = document.getElementById('btn-open-custom-food-modal');
  const modalCustomFood = document.getElementById('modal-custom-food');
  const customFoodForm = document.getElementById('custom-food-form');

  // --------------------------------------------------------------------------
  // 3. NAVIGATION & TAB SWITCHING
  // --------------------------------------------------------------------------
  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');

      navBtns.forEach(b => b.classList.remove('active'));
      tabPages.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      document.getElementById(tabId).classList.add('active');
    });
  });

  datePicker.addEventListener('change', (e) => {
    currentDate = e.target.value;
    renderDailyTracker();
  });

  btnEditTargets.addEventListener('click', () => {
    // Switch to calculator tab
    document.querySelector('[data-tab="tab-calculator"]').click();
  });

  // --------------------------------------------------------------------------
  // 4. BMR, TDEE & MACRO CALCULATOR ENGINE
  // --------------------------------------------------------------------------
  function calculateMacros(profileData) {
    const { gender, age, height, weight, activity, goal, proteinPref } = profileData;

    // Mifflin-St Jeor Formula
    let bmr = 0;
    if (gender === 'male') {
      bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
      bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }

    const tdee = Math.round(bmr * parseFloat(activity));

    // Target Calories according to goal
    let targetCalories = tdee;
    let goalLabel = 'Kilo Koruma';
    if (goal === 'fat_loss') {
      targetCalories = Math.round(tdee * 0.80); // %20 deficit
      goalLabel = 'Yağ Yakımı (Deficit)';
    } else if (goal === 'muscle_gain') {
      targetCalories = Math.round(tdee * 1.15); // %15 surplus
      goalLabel = 'Kas Yapımı (Surplus)';
    }

    // Protein calculation based on preference (g/kg)
    let pFactor = 2.0;
    if (proteinPref === 'normal') pFactor = 1.8;
    if (proteinPref === 'high') pFactor = 2.2;
    if (proteinPref === 'very_high') pFactor = 2.5;

    const targetProtein = Math.round(weight * pFactor);
    const proteinKcal = targetProtein * 4;

    // Fat calculation (approx 25-30% of target calories)
    const fatKcal = Math.round(targetCalories * 0.27);
    const targetFat = Math.round(fatKcal / 9);

    // Carbs calculation (Remaining calories)
    let carbsKcal = targetCalories - (proteinKcal + fatKcal);
    if (carbsKcal < 0) carbsKcal = 0;
    const targetCarbs = Math.round(carbsKcal / 4);

    return {
      bmr: Math.round(bmr),
      tdee,
      targetCalories,
      goalLabel,
      targetProtein,
      proteinKcal,
      proteinPct: Math.round((proteinKcal / targetCalories) * 100),
      targetCarbs,
      carbsKcal: Math.round(carbsKcal),
      carbsPct: Math.round((carbsKcal / targetCalories) * 100),
      targetFat,
      fatKcal,
      fatPct: Math.round((fatKcal / targetCalories) * 100)
    };
  }

  function updateCalculatorUI() {
    const profile = getFormProfileValues();
    const result = calculateMacros(profile);

    resBmr.textContent = `${result.bmr} kcal`;
    resTdee.textContent = `${result.tdee} kcal`;
    resTargetCalories.innerHTML = `${result.targetCalories} <span>kcal / gün</span>`;
    resGoalBadge.textContent = result.goalLabel;

    resProteinG.textContent = `${result.targetProtein}g`;
    resProteinKcal.textContent = `${result.proteinKcal} kcal`;
    resProteinPct.textContent = `%${result.proteinPct} Kalori`;

    resCarbsG.textContent = `${result.targetCarbs}g`;
    resCarbsKcal.textContent = `${result.carbsKcal} kcal`;
    resCarbsPct.textContent = `%${result.carbsPct} Kalori`;

    resFatG.textContent = `${result.targetFat}g`;
    resFatKcal.textContent = `${result.fatKcal} kcal`;
    resFatPct.textContent = `%${result.fatPct} Kalori`;
  }

  function getFormProfileValues() {
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const age = parseFloat(document.getElementById('input-age').value) || 25;
    const height = parseFloat(document.getElementById('input-height').value) || 178;
    const weight = parseFloat(document.getElementById('input-weight').value) || 75;
    const activity = parseFloat(document.getElementById('select-activity').value) || 1.375;
    const goal = document.getElementById('select-goal').value;
    const proteinPref = document.getElementById('select-protein-preference').value;

    return { gender, age, height, weight, activity, goal, proteinPref };
  }

  // Calc Form Input Event
  calcForm.addEventListener('input', updateCalculatorUI);
  calcForm.addEventListener('change', updateCalculatorUI);
  calcForm.addEventListener('submit', (e) => {
    e.preventDefault();
    applyCalculatedTargets();
  });

  btnApplyTargets.addEventListener('click', applyCalculatedTargets);

  function applyCalculatedTargets() {
    const profileData = getFormProfileValues();
    const res = calculateMacros(profileData);

    userProfile = {
      ...profileData,
      targetCalories: res.targetCalories,
      targetProtein: res.targetProtein,
      targetCarbs: res.targetCarbs,
      targetFat: res.targetFat
    };

    saveUserData();

    // Refresh Daily Tracker UI & notify user
    renderDailyTracker();
    showToast(`Harika! ${activeUser} için günlük hedefler kaydedildi.`, 'success');
    
    // Switch to tracker tab
    document.querySelector('[data-tab="tab-tracker"]').click();
  }

  // Toast Notification Helper
  function showToast(message, type = 'success') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-info';
    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${escapeHtml(message)}</span>`;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }


  // Populate calculator form with stored profile
  function populateCalcForm() {
    document.querySelector(`input[name="gender"][value="${userProfile.gender}"]`).checked = true;
    document.getElementById('input-age').value = userProfile.age;
    document.getElementById('input-height').value = userProfile.height;
    document.getElementById('input-weight').value = userProfile.weight;
    document.getElementById('select-activity').value = userProfile.activity;
    document.getElementById('select-goal').value = userProfile.goal;
    document.getElementById('select-protein-preference').value = userProfile.proteinPref;

    updateCalculatorUI();
  }

  // --------------------------------------------------------------------------
  // 5. DAILY TRACKER RENDER & MEAL LOGS MANAGEMENT
  // --------------------------------------------------------------------------
  function saveDailyLogs() {
    saveUserData();
  }

  function renderDailyTracker() {
    const dayItems = dailyLogs[currentDate] || [];

    // Calculate Consumed Totals
    let totals = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    };

    const mealCategories = ['Kahvaltı', 'Öğle Yemeği', 'Akşam Yemeği', 'Atıştırmalık & Spor'];
    const mealLists = {};
    const mealTotals = {};

    mealCategories.forEach(m => {
      mealLists[m] = document.getElementById(`list-${m}`);
      mealLists[m].innerHTML = '';
      mealTotals[m] = 0;
    });

    if (dayItems.length === 0) {
      mealCategories.forEach(m => {
        mealLists[m].innerHTML = '<div class="empty-meal">Henüz yiyecek eklenmedi.</div>';
      });
    } else {
      dayItems.forEach(item => {
        totals.calories += item.calories;
        totals.protein += item.protein;
        totals.carbs += item.carbs;
        totals.fat += item.fat;

        if (mealTotals[item.meal] !== undefined) {
          mealTotals[item.meal] += item.calories;
        }

        // Render Item Row
        const row = document.createElement('div');
        row.className = 'meal-item-row';
        row.innerHTML = `
          <div class="meal-item-info">
            <span class="meal-item-name">${escapeHtml(item.name)}</span>
            <span class="meal-item-detail">${item.amount}${item.unit || 'g'} • P:${item.protein.toFixed(1)}g | K:${item.carbs.toFixed(1)}g | Y:${item.fat.toFixed(1)}g</span>
          </div>
          <div class="meal-item-actions">
            <span class="meal-item-kcal">${Math.round(item.calories)} kcal</span>
            <button class="btn-remove-item" data-id="${item.id}" title="Sil"><i class="fa-solid fa-trash-can"></i></button>
          </div>
        `;
        
        if (mealLists[item.meal]) {
          mealLists[item.meal].appendChild(row);
        }
      });

      // Show empty state for meals without items
      mealCategories.forEach(m => {
        if (mealLists[m].children.length === 0) {
          mealLists[m].innerHTML = '<div class="empty-meal">Henüz yiyecek eklenmedi.</div>';
        }
      });
    }

    // Update Meal Header Summaries
    mealCategories.forEach(m => {
      const summaryEl = document.getElementById(`summary-${m}`);
      if (summaryEl) {
        summaryEl.textContent = `${Math.round(mealTotals[m])} kcal`;
      }
    });

    // Update Overall Cards & Progress Bars
    const targetCal = userProfile.targetCalories || 2200;
    const targetProt = userProfile.targetProtein || 160;
    const targetCarb = userProfile.targetCarbs || 220;
    const targetFatVal = userProfile.targetFat || 65;

    valConsumedCalories.textContent = Math.round(totals.calories);
    valTargetCalories.textContent = targetCal;
    const remainingCal = targetCal - Math.round(totals.calories);
    valRemainingCalories.textContent = remainingCal >= 0 ? `${remainingCal} kcal kaldı` : `${Math.abs(remainingCal)} kcal aşıldı`;

    // SVG Circular Gauge Ring Animation
    const radius = 68;
    const circumference = 2 * Math.PI * radius; // ~427
    const calPct = Math.min(totals.calories / targetCal, 1);
    const dashOffset = circumference - (calPct * circumference);
    calorieRing.style.strokeDashoffset = dashOffset;

    // Protein Bar
    valConsumedProtein.textContent = totals.protein.toFixed(1);
    valTargetProtein.textContent = targetProt;
    const protPct = Math.min((totals.protein / targetProt) * 100, 100);
    barProtein.style.width = `${protPct}%`;
    subtextProtein.textContent = `%${Math.round(protPct)} tamamlandı (${totals.protein.toFixed(1)} / ${targetProt}g)`;

    // Carbs Bar
    valConsumedCarbs.textContent = totals.carbs.toFixed(1);
    valTargetCarbs.textContent = targetCarb;
    const carbsPct = Math.min((totals.carbs / targetCarb) * 100, 100);
    barCarbs.style.width = `${carbsPct}%`;
    subtextCarbs.textContent = `%${Math.round(carbsPct)} tamamlandı (${totals.carbs.toFixed(1)} / ${targetCarb}g)`;

    // Fat Bar
    valConsumedFat.textContent = totals.fat.toFixed(1);
    valTargetFat.textContent = targetFatVal;
    const fatPct = Math.min((totals.fat / targetFatVal) * 100, 100);
    barFat.style.width = `${fatPct}%`;
    subtextFat.textContent = `%${Math.round(fatPct)} tamamlandı (${totals.fat.toFixed(1)} / ${targetFatVal}g)`;

    // Attach delete item click events
    document.querySelectorAll('.btn-remove-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const itemId = btn.getAttribute('data-id');
        removeMealItem(itemId);
      });
    });
  }

  function removeMealItem(itemId) {
    if (!dailyLogs[currentDate]) return;
    dailyLogs[currentDate] = dailyLogs[currentDate].filter(i => i.id !== itemId);
    saveDailyLogs();
    renderDailyTracker();
  }

  // --------------------------------------------------------------------------
  // 6. MODAL 1: ADD FOOD TO MEAL
  // --------------------------------------------------------------------------
  document.querySelectorAll('.btn-add-meal-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const mealType = btn.getAttribute('data-meal-type');
      openAddFoodModal(mealType);
    });
  });

  btnQuickAddFood.addEventListener('click', () => {
    openAddFoodModal('Kahvaltı');
  });

  function openAddFoodModal(mealType) {
    activeMealForModal = mealType;
    modalMealName.textContent = mealType;
    modalFoodSearch.value = '';
    selectedFoodForModal = null;
    selectedFoodPanel.style.display = 'none';
    btnConfirmAddFood.disabled = true;

    renderModalFoodResults('');
    modalAddFood.classList.add('active');
  }

  function closeAddFoodModal() {
    modalAddFood.classList.remove('active');
  }

  modalAddFoodClose.addEventListener('click', closeAddFoodModal);
  modalAddFood.querySelectorAll('.modal-close').forEach(b => b.addEventListener('click', closeAddFoodModal));

  // Turkish search normalizer (handles 'ı/i', 'ğ/g', 'ü/u', 'ş/s', 'ö/o', 'ç/c')
  function matchesTurkishSearch(text, query) {
    if (!query) return true;
    const cleanText = (text || '').toLocaleLowerCase('tr-TR');
    const cleanQuery = (query || '').toLocaleLowerCase('tr-TR');
    if (cleanText.includes(cleanQuery)) return true;

    const strip = (s) => s
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c');

    return strip(cleanText).includes(strip(cleanQuery));
  }

  modalFoodSearch.addEventListener('input', (e) => {
    renderModalFoodResults(e.target.value.trim());
  });

  function renderModalFoodResults(query) {
    modalFoodResults.innerHTML = '';

    const filtered = foodDatabase.filter(food => {
      return matchesTurkishSearch(food.name, query) || matchesTurkishSearch(food.category, query);
    });

    if (filtered.length === 0) {
      modalFoodResults.innerHTML = '<div class="empty-meal">Besin bulunamadı. "Besin Rehberi" sekmesinden yeni ekleyebilirsiniz.</div>';
      return;
    }

    filtered.forEach(food => {
      const item = document.createElement('div');
      item.className = `food-select-item ${selectedFoodForModal && selectedFoodForModal.id === food.id ? 'selected' : ''}`;
      item.innerHTML = `
        <div>
          <div class="fsi-name">${escapeHtml(food.name)}</div>
          <div class="fsi-sub">100${food.unit || 'g'} için: ${food.calories} kcal • P:${food.protein}g | K:${food.carbs}g | Y:${food.fat}g</div>
        </div>
        <span class="badge-cat">${escapeHtml(food.category)}</span>
      `;

      item.addEventListener('click', () => {
        selectFoodInModal(food);
        document.querySelectorAll('.food-select-item').forEach(el => el.classList.remove('selected'));
        item.classList.add('selected');
      });

      modalFoodResults.appendChild(item);
    });
  }

  function selectFoodInModal(food) {
    selectedFoodForModal = food;
    selectedFoodPanel.style.display = 'block';
    selFoodName.textContent = food.name;
    selFoodCategory.textContent = food.category;
    selFoodAmount.value = food.defaultAmount || 100;
    selFoodUnit.textContent = food.unit || 'g';
    btnConfirmAddFood.disabled = false;

    updateModalMacroPreview();
  }

  selFoodAmount.addEventListener('input', updateModalMacroPreview);

  function updateModalMacroPreview() {
    if (!selectedFoodForModal) return;
    const amount = parseFloat(selFoodAmount.value) || 0;
    const factor = amount / 100;

    const kcal = selectedFoodForModal.calories * factor;
    const p = selectedFoodForModal.protein * factor;
    const c = selectedFoodForModal.carbs * factor;
    const f = selectedFoodForModal.fat * factor;

    prevKcal.textContent = Math.round(kcal);
    prevProtein.textContent = p.toFixed(1);
    prevCarbs.textContent = c.toFixed(1);
    prevFat.textContent = f.toFixed(1);
  }

  btnConfirmAddFood.addEventListener('click', () => {
    if (!selectedFoodForModal) return;

    const amount = parseFloat(selFoodAmount.value) || 100;
    const factor = amount / 100;

    const newItem = {
      id: 'item_' + Date.now(),
      meal: activeMealForModal,
      foodId: selectedFoodForModal.id,
      name: selectedFoodForModal.name,
      amount,
      unit: selectedFoodForModal.unit || 'g',
      calories: Math.round(selectedFoodForModal.calories * factor * 10) / 10,
      protein: Math.round(selectedFoodForModal.protein * factor * 10) / 10,
      carbs: Math.round(selectedFoodForModal.carbs * factor * 10) / 10,
      fat: Math.round(selectedFoodForModal.fat * factor * 10) / 10
    };

    if (!dailyLogs[currentDate]) {
      dailyLogs[currentDate] = [];
    }

    dailyLogs[currentDate].push(newItem);
    saveDailyLogs();
    renderDailyTracker();
    closeAddFoodModal();
  });

  // --------------------------------------------------------------------------
  // 7. DATABASE TAB & MODAL 2: CUSTOM FOOD
  // --------------------------------------------------------------------------
  let activeDbCategory = 'all';

  function renderDatabaseList() {
    dbFoodList.innerHTML = '';
    const query = dbSearchInput.value.trim();

    const filtered = foodDatabase.filter(food => {
      const matchQuery = matchesTurkishSearch(food.name, query) || matchesTurkishSearch(food.category, query);
      const matchCat = activeDbCategory === 'all' || 
                        (activeDbCategory === 'Özel' ? food.isCustom : food.category === activeDbCategory);
      return matchQuery && matchCat;
    });

    if (filtered.length === 0) {
      dbFoodList.innerHTML = '<div class="empty-meal" style="grid-column: 1 / -1;">Aramanıza uygun besin bulunamadı.</div>';
      return;
    }

    filtered.forEach(food => {
      const card = document.createElement('div');
      card.className = 'food-card-db';
      card.innerHTML = `
        <div class="food-card-top">
          <h4>${escapeHtml(food.name)}</h4>
          <span class="badge-cat">${escapeHtml(food.category)}</span>
        </div>
        <div class="food-macros-mini">
          <div class="f-m-item">
            <span>Kalori</span>
            <strong>${food.calories}</strong>
          </div>
          <div class="f-m-item">
            <span>Protein</span>
            <strong style="color:var(--color-protein);">${food.protein}g</strong>
          </div>
          <div class="f-m-item">
            <span>Karb</span>
            <strong style="color:var(--color-carbs);">${food.carbs}g</strong>
          </div>
          <div class="f-m-item">
            <span>Yağ</span>
            <strong style="color:var(--color-fat);">${food.fat}g</strong>
          </div>
        </div>
      `;

      dbFoodList.appendChild(card);
    });
  }

  dbSearchInput.addEventListener('input', renderDatabaseList);

  dbCategoryPills.querySelectorAll('.pill').forEach(pill => {
    pill.addEventListener('click', () => {
      dbCategoryPills.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeDbCategory = pill.getAttribute('data-category');
      renderDatabaseList();
    });
  });

  // Custom Food Modal Trigger
  btnOpenCustomFoodModal.addEventListener('click', () => {
    customFoodForm.reset();
    modalCustomFood.classList.add('active');
  });

  const modalCustomFoodClose = document.getElementById('modal-custom-food-close');
  modalCustomFoodClose.addEventListener('click', () => modalCustomFood.classList.remove('active'));
  modalCustomFood.querySelectorAll('.modal-close').forEach(b => b.addEventListener('click', () => modalCustomFood.classList.remove('active')));

  customFoodForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('cf-name').value.trim();
    const category = document.getElementById('cf-category').value;
    const unit = document.getElementById('cf-unit').value;
    const calories = parseFloat(document.getElementById('cf-calories').value);
    const protein = parseFloat(document.getElementById('cf-protein').value);
    const carbs = parseFloat(document.getElementById('cf-carbs').value);
    const fat = parseFloat(document.getElementById('cf-fat').value);

    const newFood = {
      id: 'custom_' + Date.now(),
      name,
      category,
      unit,
      calories,
      protein,
      carbs,
      fat,
      defaultAmount: 100,
      isCustom: true
    };

    customFoods.push(newFood);
    localStorage.setItem(STORAGE_KEYS.CUSTOM_FOODS, JSON.stringify(customFoods));
    foodDatabase = [...INITIAL_FOOD_DATABASE, ...customFoods];

    renderDatabaseList();
    modalCustomFood.classList.remove('active');
    showToast('Yeni özel besin veritabanına başarıyla eklendi!', 'success');
  });

  // Helper HTML escaper
  function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }

  // --------------------------------------------------------------------------
  // USER SWITCHER (Furkan / Ahmet) INTERACTION
  // --------------------------------------------------------------------------
  const appUserTitle = document.getElementById('app-user-title');
  const userToggleBtns = document.querySelectorAll('.user-toggle-btn');

  function updateAppUserUI(name) {
    if (appUserTitle) {
      appUserTitle.textContent = name;
    }
    document.title = `${name} | Fitness & Makro Takibi`;
    userToggleBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-user') === name);
    });
  }

  function switchUser(name) {
    if (activeUser === name) return;
    activeUser = name;
    localStorage.setItem('nutrifit_active_user', activeUser);
    updateAppUserUI(activeUser);
    loadUserData(activeUser);
    populateCalcForm();
    renderDailyTracker();
    showToast(`${activeUser} profiline geçildi!`, 'info');
  }

  userToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const selected = btn.getAttribute('data-user');
      switchUser(selected);
    });
  });

  // --------------------------------------------------------------------------
  // INITIALIZE
  // --------------------------------------------------------------------------
  updateAppUserUI(activeUser);
  populateCalcForm();
  renderDailyTracker();
  renderDatabaseList();
});
