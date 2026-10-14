/**
 * MamaNest - Core Application Logic
 * For Mama, Khush & Khwaish • With Love from Susheel
 */

// State Management
const state = {
  activeTab: 'sanctuary',
  activeTwin: 'both', // 'khush', 'khwaish', 'both'
  breatheActive: false,
  breatheTimer: null,
  breathePhase: 'inhale',
  voiceEnabled: false,
  nebulizerTimer: null,
  nebulizerSecondsRemaining: 0,
  nebulizerTotalSeconds: 0,
  nebulizerBubblesInterval: null,
  
  // Twins Daily Health Data (persisted in localStorage)
  healthData: {
    khush: {
      vitD: false,
      multi: false,
      iron: false,
      teethMorning: false,
      teethNight: false,
      lastMeds: []
    },
    khwaish: {
      vitD: false,
      multi: false,
      iron: false,
      teethMorning: false,
      teethNight: false,
      lastMeds: []
    }
  },
  
  // Custom Memories
  memories: [
    {
      id: 1,
      twin: 'Both',
      date: 'Today',
      text: 'Khush and Khwaish giggling together holding their little stuffed bears. Their little hands are so soft.',
      tag: 'Sweet Moments'
    },
    {
      id: 2,
      twin: 'Khush',
      date: 'Precious Memory',
      text: 'Khush resting his head on Mama’s shoulder while drifting to sleep after a long cry. He feels completely safe in your arms.',
      tag: 'Love Anchor'
    },
    {
      id: 3,
      twin: 'Khwaish',
      date: 'Precious Memory',
      text: 'Khwaish running to hug Mama’s knees with a giant smile, saying her little words. You are her favorite person in the entire world.',
      tag: 'Love Anchor'
    }
  ]
};

// Toddler Brain Wisdom (From Instagram Carousel & Child Psychology)
const toddlerBrainWisdom = [
  {
    tag: 'Truth',
    tagClass: 'tag-truth',
    title: 'Before Age 3: Logic Does Not Work',
    quote: '“No matter how many times you explain the same thing, they do it again. It is not defiance. It is brain development.”',
    instead: 'Instead of explaining: Use fewer words, guide their hands gently, or distract with a new toy.'
  },
  {
    tag: 'Truth',
    tagClass: 'tag-truth',
    title: 'They Throw Toys: Not Defiance',
    quote: '“They throw toys. You explain. They throw again. Their brain is testing gravity and cause-and-effect, not disrespecting you.”',
    instead: 'Instead of shouting: Slow down. Pick it up gently and say: “Car goes in the box.” Clear actions over words.'
  },
  {
    tag: 'Myth Buster',
    tagClass: 'tag-myth',
    title: '“They Understand Me, They Just Don’t Care”',
    quote: '“Truth is: their brain cannot use all those words yet. Toddlers feel deeply, act on impulse, and copy everything.”',
    instead: 'They cannot stop and think before acting. Model the calm behavior you want them to copy.'
  },
  {
    tag: 'Truth',
    tagClass: 'tag-truth',
    title: 'They Learn By Watching, Not Listening',
    quote: '“Explaining more often increases stress. What actually works: Toddlers learn by watching you. They copy you.”',
    instead: 'If you want them to be gentle, speak softly and move slowly. Your calm is contagious.'
  },
  {
    tag: 'Mindset',
    tagClass: 'tag-action',
    title: 'You Are Not Failing',
    quote: '“Repeat it daily. Children copy what you do, not what you say. You are not failing. Less talking. More showing.”',
    instead: 'Self-control is a 5-year journey. Every time you stay calm, you build their brain.'
  },
  {
    tag: 'Twin Wisdom',
    tagClass: 'tag-truth',
    title: 'Khush & Khwaish Fighting Over One Toy',
    quote: '“Toddlers do not have the neural wiring to share yet. To them, if another baby has it, it ceased to exist for them.”',
    instead: 'Do not scold. Narrate: “Both want the truck! Let’s set a 2-minute timer, Khush first then Khwaish!”'
  }
];

// Meal & Snack Recipes
const mealRecipes = [
  {
    id: 1,
    title: '🥞 2-Ingredient Banana Oat Pancakes',
    category: 'quick',
    tag: '⚡ 5-Minute',
    time: '5 mins',
    desc: '1 ripe mashed banana + 1 egg + 2 tbsp oats flour. Cook small coin pancakes in ghee. Soft and easy for twins to self-feed!'
  },
  {
    id: 2,
    title: '🧀 Golden Butter Paneer Bites',
    category: 'quick',
    tag: '💪 High-Protein',
    time: '5 mins',
    desc: 'Soft fresh paneer cubes tossed lightly in melted ghee with a pinch of roasted cumin powder. Loved by toddlers!'
  },
  {
    id: 3,
    title: '🥣 Warm Moong Dal Khichdi with Ghee',
    category: 'meals',
    tag: '🥣 Gentle Belly',
    time: '15 mins',
    desc: 'Soft pressure-cooked yellow moong dal + rice + grated carrot, mashed with generous homemade ghee. Easy digestion.'
  },
  {
    id: 4,
    title: '🌯 Soft Paneer & Veggie Paratha Roll',
    category: 'meals',
    tag: '✋ Finger Food',
    time: '15 mins',
    desc: 'Whole wheat soft roti rolled with mild grated paneer and mashed potato. Cut into two twin-friendly rolls.'
  },
  {
    id: 5,
    title: '🍚 Curd Rice with Pomegranate Smile',
    category: 'meals',
    tag: '❄️ Cool & Soothing',
    time: '8 mins',
    desc: 'Soft mashed rice mixed with fresh mild curd, a drop of ghee, and sweet pomegranate jewels on top.'
  },
  {
    id: 6,
    title: '🤧 Warm Turmeric & Cardamom Soother',
    category: 'sick',
    tag: '🤧 Cold Soother',
    time: '5 mins',
    desc: 'Warm milk or almond drink with a pinch of turmeric and cardamom. Soothes sore throats before bedtime.'
  },
  {
    id: 7,
    title: '🍲 Clear Moong & Vegetable Soup',
    category: 'sick',
    tag: '🤧 Sick Day',
    time: '12 mins',
    desc: 'Warm clear broth of yellow dal and boiled bottle gourd/carrot with a pinch of salt and cumin. Keeps twins hydrated.'
  },
  {
    id: 8,
    title: '🍿 Crispy Roasted Ghee Makhana',
    category: 'finger',
    tag: '✋ Snack',
    time: '4 mins',
    desc: 'Fox nuts roasted in a spoon of ghee with a tiny dash of salt. Crunchy, healthy, zero mess finger snack.'
  },
  {
    id: 9,
    title: '🍌 Steamed Apple-Cinnamon Mash',
    category: 'sick',
    tag: '🤧 Cold Day',
    time: '8 mins',
    desc: 'Steamed sweet apple slices mashed smoothly with a hint of warm cinnamon. Soothing for coughing toddlers.'
  }
];

// Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
  loadStoredData();
  setupNav();
  renderBrainWisdom();
  renderRecipes('all');
  renderChecklist();
  renderMemories();
  setupNebulizerEvents();
  registerServiceWorker();
});

// Navigation Handling
function setupNav() {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetTab = item.dataset.tab;
      switchTab(targetTab);
    });
  });
}

function switchTab(tabId) {
  state.activeTab = tabId;
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });
  document.querySelectorAll('.tab-section').forEach(sec => {
    sec.classList.toggle('active', sec.id === `section-${tabId}`);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// SOS Calm & Breathing Modal
function openBreatheModal() {
  const modal = document.getElementById('breatheModal');
  modal.classList.add('active');
  startBreatheCycle();
  if (window.mamaAudio) {
    mamaAudio.playSingingBowl(220, 5);
  }
}

function closeBreatheModal() {
  const modal = document.getElementById('breatheModal');
  modal.classList.remove('active');
  stopBreatheCycle();
  if (window.mamaAudio) {
    mamaAudio.stopSpeech();
  }
}

function startBreatheCycle() {
  state.breatheActive = true;
  const circle = document.getElementById('breatheCircle');
  const innerText = document.getElementById('breatheInner');
  const promptText = document.getElementById('breathePrompt');
  const pillInhale = document.getElementById('pillInhale');
  const pillHold = document.getElementById('pillHold');
  const pillExhale = document.getElementById('pillExhale');

  const steps = [
    {
      phase: 'inhale',
      duration: 4000,
      circleClass: 'inhale',
      label: 'Breathe In',
      prompt: 'Inhale calm... You are safe. Khush and Khwaish are safe.',
      voice: 'Inhale peace. You are safe. Your babies are safe.'
    },
    {
      phase: 'hold',
      duration: 7000,
      circleClass: 'hold',
      label: 'Hold Gently',
      prompt: 'Hold and soften your shoulders... Release the urge to blame.',
      voice: 'Hold softly. Relax your shoulders.'
    },
    {
      phase: 'exhale',
      duration: 8000,
      circleClass: 'exhale',
      label: 'Exhale Slowly',
      prompt: 'Exhale tension... They are not giving you a hard time, they are having a hard time.',
      voice: 'Exhale all frustration. They are just tiny babies in a giant world.'
    }
  ];

  let currentStepIdx = 0;

  function runStep() {
    if (!state.breatheActive) return;
    const current = steps[currentStepIdx];
    state.breathePhase = current.phase;

    circle.className = `breathe-circle ${current.circleClass}`;
    circle.style.transitionDuration = `${current.duration / 1000}s`;
    innerText.textContent = current.label;
    promptText.textContent = current.prompt;

    pillInhale.classList.toggle('active', current.phase === 'inhale');
    pillHold.classList.toggle('active', current.phase === 'hold');
    pillExhale.classList.toggle('active', current.phase === 'exhale');

    if (window.mamaAudio) {
      if (current.phase === 'inhale') mamaAudio.playBreathSound('inhale', 4);
      if (current.phase === 'exhale') mamaAudio.playBreathSound('exhale', 8);
      if (state.voiceEnabled) mamaAudio.speak(current.voice);
    }

    state.breatheTimer = setTimeout(() => {
      currentStepIdx = (currentStepIdx + 1) % steps.length;
      runStep();
    }, current.duration);
  }

  runStep();
}

function stopBreatheCycle() {
  state.breatheActive = false;
  if (state.breatheTimer) clearTimeout(state.breatheTimer);
  const circle = document.getElementById('breatheCircle');
  if (circle) circle.className = 'breathe-circle';
}

function toggleVoiceGuidance() {
  state.voiceEnabled = !state.voiceEnabled;
  const btn = document.getElementById('voiceToggleBtn');
  btn.textContent = state.voiceEnabled ? '🔊 Voice Guide: ON' : '🔈 Voice Guide: OFF';
  if (!state.voiceEnabled && window.mamaAudio) {
    mamaAudio.stopSpeech();
  }
}

// 15-Minute Sanctuary Recharge Timer
let sanctuaryInterval = null;
let sanctuaryRemaining = 15 * 60;

function startSanctuaryTimer(minutes = 15) {
  if (sanctuaryInterval) clearInterval(sanctuaryInterval);
  sanctuaryRemaining = minutes * 60;
  const display = document.getElementById('sanctuaryTimerDisplay');
  const btn = document.getElementById('sanctuaryStartBtn');
  btn.textContent = '⏸ Pause Recharge';
  btn.onclick = pauseSanctuaryTimer;

  updateSanctuaryDisplay();

  sanctuaryInterval = setInterval(() => {
    sanctuaryRemaining--;
    updateSanctuaryDisplay();
    if (sanctuaryRemaining <= 0) {
      clearInterval(sanctuaryInterval);
      sanctuaryInterval = null;
      btn.textContent = '▶ Start 15-Min Sanctuary';
      btn.onclick = () => startSanctuaryTimer(15);
      if (window.mamaAudio) {
        mamaAudio.playSingingBowl(330, 6);
      }
      alert('🌟 Your Sanctuary recharge is complete. You gave your nervous system peace. Khush & Khwaish are waiting for your warm smile!');
    }
  }, 1000);
}

function pauseSanctuaryTimer() {
  if (sanctuaryInterval) {
    clearInterval(sanctuaryInterval);
    sanctuaryInterval = null;
    const btn = document.getElementById('sanctuaryStartBtn');
    btn.textContent = '▶ Resume Sanctuary';
    btn.onclick = () => resumeSanctuaryTimer();
  }
}

function resumeSanctuaryTimer() {
  const btn = document.getElementById('sanctuaryStartBtn');
  btn.textContent = '⏸ Pause Recharge';
  btn.onclick = pauseSanctuaryTimer;
  sanctuaryInterval = setInterval(() => {
    sanctuaryRemaining--;
    updateSanctuaryDisplay();
    if (sanctuaryRemaining <= 0) {
      clearInterval(sanctuaryInterval);
      sanctuaryInterval = null;
      btn.textContent = '▶ Start 15-Min Sanctuary';
      btn.onclick = () => startSanctuaryTimer(15);
      if (window.mamaAudio) mamaAudio.playSingingBowl(330, 6);
    }
  }, 1000);
}

function updateSanctuaryDisplay() {
  const m = Math.floor(sanctuaryRemaining / 60);
  const s = sanctuaryRemaining % 60;
  const display = document.getElementById('sanctuaryTimerDisplay');
  if (display) {
    display.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }
}

// Susheel Tag-Team Message Generator
function sendSusheelSOS() {
  const message = encodeURIComponent(
    "Hi Susheel ❤️ Twins (Khush & Khwaish) have overwhelmed my energy cup today. Could you please take over for 15-20 minutes when you can so I can step back and reset? Love you!"
  );
  window.open(`https://wa.me/?text=${message}`, '_blank');
}

// Render Toddler Brain Wisdom
function renderBrainWisdom() {
  const container = document.getElementById('brainWisdomGrid');
  if (!container) return;
  container.innerHTML = toddlerBrainWisdom.map(w => `
    <div class="brain-card">
      <span class="brain-tag ${w.tagClass}">${w.tag}</span>
      <h4>${w.title}</h4>
      <div class="brain-quote">${w.quote}</div>
      <div class="brain-instead">
        <strong>💡 What works instead:</strong>
        ${w.instead}
      </div>
    </div>
  `).join('');
}

// Twins Health Tracker (Khush & Khwaish)
function selectTwin(twin) {
  state.activeTwin = twin;
  document.getElementById('btnKhush').className = `twin-btn ${twin === 'khush' ? 'khush-active' : ''}`;
  document.getElementById('btnKhwaish').className = `twin-btn ${twin === 'khwaish' ? 'khwaish-active' : ''}`;
  document.getElementById('btnBoth').className = `twin-btn ${twin === 'both' ? 'both-active' : ''}`;
  renderChecklist();
}

function renderChecklist() {
  const container = document.getElementById('healthChecklist');
  if (!container) return;

  const twinsToRender = state.activeTwin === 'both' ? ['khush', 'khwaish'] : [state.activeTwin];

  const items = [
    { key: 'vitD', name: 'Vitamin D3 Drops', dose: '1 dose daily (400 IU)' },
    { key: 'multi', name: 'Multivitamin Syrup / Gummies', dose: 'Morning after breakfast' },
    { key: 'iron', name: 'Iron / Zinc Tonic', dose: 'Daily as prescribed' },
    { key: 'teethMorning', name: 'Morning Toothbrush & Face Wash', dose: 'Gentle toddler paste' },
    { key: 'teethNight', name: 'Bedtime Dental Cleaning', dose: 'Before sleeping' }
  ];

  let html = '';

  twinsToRender.forEach(twinKey => {
    const isKhush = twinKey === 'khush';
    const twinName = isKhush ? 'Khush 👦' : 'Khwaish 👧';
    const badgeClass = isKhush ? 'badge-khush' : 'badge-khwaish';

    html += `
      <div style="margin-bottom: 18px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
          <span class="badge-twin ${badgeClass}" style="font-size: 0.88rem; padding: 4px 12px;">${twinName} Daily Care</span>
          <span style="font-size: 0.78rem; color: var(--text-muted);">Tap to check off</span>
        </div>
    `;

    items.forEach(it => {
      const isChecked = state.healthData[twinKey][it.key];
      html += `
        <div class="checklist-item ${isChecked ? 'done' : ''}" onclick="toggleCheckItem('${twinKey}', '${it.key}')">
          <div class="check-label">
            <div class="check-box">${isChecked ? '✓' : ''}</div>
            <div>
              <div>${it.name}</div>
              <div class="check-meta">${it.dose}</div>
            </div>
          </div>
          <span style="font-size: 0.8rem; font-weight: 600; color: ${isChecked ? 'var(--secondary)' : '#999'};">
            ${isChecked ? 'Given ✨' : 'Pending'}
          </span>
        </div>
      `;
    });

    html += `</div>`;
  });

  container.innerHTML = html;
}

function toggleCheckItem(twinKey, itemKey) {
  state.healthData[twinKey][itemKey] = !state.healthData[twinKey][itemKey];
  if (state.healthData[twinKey][itemKey] && window.mamaAudio) {
    mamaAudio.playSuccessChime();
  }
  saveStoredData();
  renderChecklist();
}

// Medicine & Sick Day Logger
function logMedicineDose() {
  const twinSelect = document.getElementById('medTwinSelect').value;
  const medName = document.getElementById('medNameInput').value.trim();
  const medDose = document.getElementById('medDoseInput').value.trim();
  
  if (!medName) {
    alert('Please enter medicine name (e.g. Paracetamol, Cough Syrup, Nasal Spray)');
    return;
  }

  const record = {
    id: Date.now(),
    twin: twinSelect === 'both' ? 'Both' : (twinSelect === 'khush' ? 'Khush' : 'Khwaish'),
    name: medName,
    dose: medDose || 'Standard Dose',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    date: new Date().toLocaleDateString()
  };

  if (twinSelect === 'both') {
    state.healthData.khush.lastMeds.unshift(record);
    state.healthData.khwaish.lastMeds.unshift(record);
  } else {
    state.healthData[twinSelect].lastMeds.unshift(record);
  }

  saveStoredData();
  renderMedsHistory();
  document.getElementById('medNameInput').value = '';
  document.getElementById('medDoseInput').value = '';
  if (window.mamaAudio) mamaAudio.playSuccessChime();
  alert(`✅ Recorded dose: ${record.name} for ${record.twin} at ${record.time}`);
}

function renderMedsHistory() {
  const container = document.getElementById('medsHistoryList');
  if (!container) return;

  const allMeds = [
    ...(state.healthData.khush.lastMeds || []),
    ...(state.healthData.khwaish.lastMeds || [])
  ].sort((a, b) => b.id - a.id).slice(0, 6);

  if (allMeds.length === 0) {
    container.innerHTML = '<p style="font-size: 0.85rem; color: var(--text-muted); font-style: italic;">No sick day medicines logged today. Twins are healthy!</p>';
    return;
  }

  container.innerHTML = allMeds.map(m => `
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: #FFF; border-radius: 8px; margin-bottom: 6px; border: 1px solid rgba(0,0,0,0.05); font-size: 0.85rem;">
      <div>
        <strong>${m.twin}:</strong> ${m.name} (${m.dose})
      </div>
      <span style="color: var(--primary); font-weight: 600;">${m.time}</span>
    </div>
  `).join('');
}

// Interactive Nebulizer Fun Station
function setupNebulizerEvents() {
  // Pre-seed some bubbles
  const arena = document.getElementById('nebulizerArena');
  if (!arena) return;
  arena.addEventListener('click', (e) => {
    if (e.target.classList.contains('bubble')) {
      popBubble(e.target);
    }
  });
}

function startNebulizer(minutes = 8) {
  const twin = document.getElementById('nebulizerTwinSelect').value;
  state.nebulizerTotalSeconds = minutes * 60;
  state.nebulizerSecondsRemaining = state.nebulizerTotalSeconds;
  
  const display = document.getElementById('nebulizerTimer');
  const btn = document.getElementById('nebulizerStartBtn');
  btn.textContent = '⏹ Stop Session';
  btn.onclick = stopNebulizer;

  if (window.mamaAudio) {
    mamaAudio.startNebulizerHum();
    mamaAudio.playSingingBowl(300, 3);
  }

  // Spawn bubbles interval
  startBubbleSpawner();

  if (state.nebulizerTimer) clearInterval(state.nebulizerTimer);
  updateNebulizerDisplay();

  state.nebulizerTimer = setInterval(() => {
    state.nebulizerSecondsRemaining--;
    updateNebulizerDisplay();

    if (state.nebulizerSecondsRemaining <= 0) {
      stopNebulizer();
      if (window.mamaAudio) {
        mamaAudio.playSuccessChime();
      }
      alert(`🎉 Wonderful job! Nebulizer session completed for ${twin === 'both' ? 'Khush & Khwaish' : (twin === 'khush' ? 'Khush' : 'Khwaish')}. Give them a big warm cuddle!`);
    }
  }, 1000);
}

function stopNebulizer() {
  if (state.nebulizerTimer) {
    clearInterval(state.nebulizerTimer);
    state.nebulizerTimer = null;
  }
  stopBubbleSpawner();
  if (window.mamaAudio) {
    mamaAudio.stopNebulizerHum();
  }
  const btn = document.getElementById('nebulizerStartBtn');
  btn.textContent = '▶ Start Nebulizer Fun Session';
  btn.onclick = () => startNebulizer(8);
  updateNebulizerDisplay();
}

function updateNebulizerDisplay() {
  const display = document.getElementById('nebulizerTimer');
  if (!display) return;
  const m = Math.floor(state.nebulizerSecondsRemaining / 60);
  const s = state.nebulizerSecondsRemaining % 60;
  display.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function startBubbleSpawner() {
  stopBubbleSpawner();
  state.nebulizerBubblesInterval = setInterval(() => {
    spawnBubble();
  }, 1200);
  // initial burst
  for (let i = 0; i < 4; i++) setTimeout(spawnBubble, i * 300);
}

function stopBubbleSpawner() {
  if (state.nebulizerBubblesInterval) {
    clearInterval(state.nebulizerBubblesInterval);
    state.nebulizerBubblesInterval = null;
  }
}

function spawnBubble() {
  const arena = document.getElementById('nebulizerArena');
  if (!arena) return;

  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  
  const emojis = ['🎈', '🫧', '⭐', '🧸', '🚗', '🍓', '🦄', '🐣'];
  const emoji = emojis[Math.floor(Math.random() * emojis.length)];
  bubble.textContent = emoji;

  const size = Math.floor(Math.random() * 20) + 40; // 40px to 60px
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  
  const colors = ['#FFE5EC', '#E3F2FD', '#E8F5E9', '#FFF3E0', '#F3E5F5'];
  bubble.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
  bubble.style.border = '2px solid rgba(255,255,255,0.8)';
  
  const left = Math.floor(Math.random() * (arena.clientWidth - size - 10));
  bubble.style.left = `${Math.max(5, left)}px`;
  
  const duration = (Math.random() * 3 + 4); // 4-7s float up
  bubble.style.animationDuration = `${duration}s`;

  arena.appendChild(bubble);

  // remove after float out
  setTimeout(() => {
    if (bubble.parentNode === arena) arena.removeChild(bubble);
  }, duration * 1000);
}

function popBubble(bubbleEl) {
  if (window.mamaAudio) {
    mamaAudio.playBubblePop(1.0 + Math.random() * 0.4);
  }
  bubbleEl.style.transform = 'scale(1.8)';
  bubbleEl.style.opacity = '0';
  setTimeout(() => {
    if (bubbleEl.parentNode) bubbleEl.parentNode.removeChild(bubbleEl);
  }, 150);
}

// Recipes / What to Make Filter
function filterRecipes(cat) {
  document.querySelectorAll('.chip').forEach(c => {
    c.classList.toggle('active', c.dataset.filter === cat);
  });
  renderRecipes(cat);
}

function renderRecipes(category) {
  const container = document.getElementById('recipesList');
  if (!container) return;

  const filtered = category === 'all' 
    ? mealRecipes 
    : mealRecipes.filter(r => r.category === category);

  container.innerHTML = filtered.map(r => `
    <div class="recipe-card">
      <div style="flex: 1; padding-right: 12px;">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
          <span style="font-size: 0.72rem; padding: 2px 8px; border-radius: 12px; background: #FFF0EC; color: var(--primary); font-weight: 700;">${r.tag}</span>
          <span class="recipe-title">${r.title}</span>
        </div>
        <p class="recipe-desc">${r.desc}</p>
      </div>
      <div class="recipe-time">⏱ ${r.time}</div>
    </div>
  `).join('');
}

function pickRandomRecipe() {
  const random = mealRecipes[Math.floor(Math.random() * mealRecipes.length)];
  alert(`✨ Today's Magic Pick for Khush & Khwaish:\n\n${random.title}\n⏱ Ready in: ${random.time}\n\n${random.desc}`);
}

// Memories & Love Vault
function renderMemories() {
  const container = document.getElementById('memoriesGrid');
  if (!container) return;

  container.innerHTML = state.memories.map(m => `
    <div class="memory-card">
      <div class="memory-date">For ${m.twin} • ${m.date}</div>
      <p>“${m.text}”</p>
      <span style="font-size: 0.72rem; background: var(--secondary-light); color: var(--secondary); padding: 2px 8px; border-radius: 10px; font-weight: 600;">${m.tag}</span>
    </div>
  `).join('');
}

function addCustomMemory() {
  const text = prompt("Write a sweet moment or reminder of why you love Khush & Khwaish:");
  if (!text || text.trim() === '') return;

  const newMem = {
    id: Date.now(),
    twin: 'Khush & Khwaish',
    date: 'Today',
    text: text.trim(),
    tag: 'Mama Note'
  };

  state.memories.unshift(newMem);
  saveStoredData();
  renderMemories();
  if (window.mamaAudio) mamaAudio.playSuccessChime();
}

// Local Storage Persistence
function loadStoredData() {
  try {
    const savedHealth = localStorage.getItem('mamanest_health');
    if (savedHealth) {
      state.healthData = JSON.parse(savedHealth);
    }
    const savedMem = localStorage.getItem('mamanest_memories');
    if (savedMem) {
      state.memories = JSON.parse(savedMem);
    }
  } catch (e) {
    console.log('Error reading localStorage', e);
  }
}

function saveStoredData() {
  try {
    localStorage.setItem('mamanest_health', JSON.stringify(state.healthData));
    localStorage.setItem('mamanest_memories', JSON.stringify(state.memories));
  } catch (e) {
    console.log('Error saving to localStorage', e);
  }
}

// Service Worker Registration for PWA Offline
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
      .then(() => console.log('MamaNest SW active'))
      .catch(e => console.log('SW registration note', e));
  }
}
