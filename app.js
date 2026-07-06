const DEFAULT_LESSON = [
  { traditional: "媽", simplified: "妈", pinyin: "ma", tone: "1" },
  { traditional: "麻", simplified: "麻", pinyin: "ma", tone: "2" },
  { traditional: "馬", simplified: "马", pinyin: "ma", tone: "3" },
  { traditional: "罵", simplified: "骂", pinyin: "ma", tone: "4" },
  { traditional: "花", simplified: "花", pinyin: "hua", tone: "1" },
  { traditional: "茶", simplified: "茶", pinyin: "cha", tone: "2" },
  { traditional: "水", simplified: "水", pinyin: "shui", tone: "3" },
  { traditional: "飯", simplified: "饭", pinyin: "fan", tone: "4" }
];

const simplifiedFallback = {
  媽: "妈",
  馬: "马",
  罵: "骂",
  飯: "饭",
  貓: "猫",
  門: "门",
  車: "车",
  書: "书",
  學: "学",
  說: "说",
  語: "语",
  國: "国",
  風: "风",
  電: "电",
  魚: "鱼"
};

const toneMarks = {
  1: "ˉ",
  2: "ˊ",
  3: "ˇ",
  4: "ˋ",
  5: "輕"
};

const helperHanziBank = [
  { traditional: "花", simplified: "花", pinyin: "hua", tone: "1" },
  { traditional: "發", simplified: "发", pinyin: "fa", tone: "1" },
  { traditional: "媽", simplified: "妈", pinyin: "ma", tone: "1" },
  { traditional: "麻", simplified: "麻", pinyin: "ma", tone: "2" },
  { traditional: "馬", simplified: "马", pinyin: "ma", tone: "3" },
  { traditional: "罵", simplified: "骂", pinyin: "ma", tone: "4" },
  { traditional: "番", simplified: "番", pinyin: "fan", tone: "1" },
  { traditional: "繁", simplified: "繁", pinyin: "fan", tone: "2" },
  { traditional: "反", simplified: "反", pinyin: "fan", tone: "3" },
  { traditional: "飯", simplified: "饭", pinyin: "fan", tone: "4" },
  { traditional: "翻", simplified: "翻", pinyin: "fan", tone: "1" },
  { traditional: "凡", simplified: "凡", pinyin: "fan", tone: "2" },
  { traditional: "返", simplified: "返", pinyin: "fan", tone: "3" },
  { traditional: "範", simplified: "范", pinyin: "fan", tone: "4" },
  { traditional: "書", simplified: "书", pinyin: "shu", tone: "1" },
  { traditional: "熟", simplified: "熟", pinyin: "shu", tone: "2" },
  { traditional: "數", simplified: "数", pinyin: "shu", tone: "4" },
  { traditional: "插", simplified: "插", pinyin: "cha", tone: "1" },
  { traditional: "茶", simplified: "茶", pinyin: "cha", tone: "2" },
  { traditional: "差", simplified: "差", pinyin: "cha", tone: "1" },
  { traditional: "查", simplified: "查", pinyin: "cha", tone: "2" },
  { traditional: "水", simplified: "水", pinyin: "shui", tone: "3" },
  { traditional: "睡", simplified: "睡", pinyin: "shui", tone: "4" },
  { traditional: "火", simplified: "火", pinyin: "huo", tone: "3" },
  { traditional: "貨", simplified: "货", pinyin: "huo", tone: "4" }
];

const generatedHanziBank = [
  ...DEFAULT_LESSON,
  ...helperHanziBank,
  ...(window.HANZI_PINYIN_BANK || []),
  { traditional: "喝", simplified: "喝", pinyin: "he", tone: "1" },
  { traditional: "吃", simplified: "吃", pinyin: "chi", tone: "1" },
  { traditional: "我", simplified: "我", pinyin: "wo", tone: "3" },
  { traditional: "你", simplified: "你", pinyin: "ni", tone: "3" },
  { traditional: "他", simplified: "他", pinyin: "ta", tone: "1" },
  { traditional: "她", simplified: "她", pinyin: "ta", tone: "1" },
  { traditional: "是", simplified: "是", pinyin: "shi", tone: "4" },
  { traditional: "的", simplified: "的", pinyin: "de", tone: "5" },
  { traditional: "不", simplified: "不", pinyin: "bu", tone: "4" },
  { traditional: "好", simplified: "好", pinyin: "hao", tone: "3" },
  { traditional: "老", simplified: "老", pinyin: "lao", tone: "3" },
  { traditional: "師", simplified: "师", pinyin: "shi", tone: "1" },
  { traditional: "學", simplified: "学", pinyin: "xue", tone: "2" },
  { traditional: "生", simplified: "生", pinyin: "sheng", tone: "1" },
  { traditional: "中", simplified: "中", pinyin: "zhong", tone: "1" },
  { traditional: "文", simplified: "文", pinyin: "wen", tone: "2" },
  { traditional: "字", simplified: "字", pinyin: "zi", tone: "4" },
  { traditional: "大", simplified: "大", pinyin: "da", tone: "4" },
  { traditional: "小", simplified: "小", pinyin: "xiao", tone: "3" },
  { traditional: "上", simplified: "上", pinyin: "shang", tone: "4" },
  { traditional: "下", simplified: "下", pinyin: "xia", tone: "4" },
  { traditional: "左", simplified: "左", pinyin: "zuo", tone: "3" },
  { traditional: "右", simplified: "右", pinyin: "you", tone: "4" },
  { traditional: "有", simplified: "有", pinyin: "you", tone: "3" },
  { traditional: "來", simplified: "来", pinyin: "lai", tone: "2" },
  { traditional: "去", simplified: "去", pinyin: "qu", tone: "4" },
  { traditional: "人", simplified: "人", pinyin: "ren", tone: "2" },
  { traditional: "口", simplified: "口", pinyin: "kou", tone: "3" },
  { traditional: "日", simplified: "日", pinyin: "ri", tone: "4" },
  { traditional: "月", simplified: "月", pinyin: "yue", tone: "4" },
  { traditional: "山", simplified: "山", pinyin: "shan", tone: "1" },
  { traditional: "門", simplified: "门", pinyin: "men", tone: "2" },
  { traditional: "車", simplified: "车", pinyin: "che", tone: "1" },
  { traditional: "貓", simplified: "猫", pinyin: "mao", tone: "1" },
  { traditional: "狗", simplified: "狗", pinyin: "gou", tone: "3" },
  { traditional: "魚", simplified: "鱼", pinyin: "yu", tone: "2" },
  { traditional: "電", simplified: "电", pinyin: "dian", tone: "4" },
  { traditional: "風", simplified: "风", pinyin: "feng", tone: "1" },
  { traditional: "國", simplified: "国", pinyin: "guo", tone: "2" },
  { traditional: "語", simplified: "语", pinyin: "yu", tone: "3" }
];

const stateKey = "pinyinKitchenState";
const lessonBankKey = "pinyinKitchenLessonBank";
const sessionModeKey = "pinyinKitchenMode";
const sessionPlayerKey = "pinyinKitchenPlayer";
const sessionGroupKey = "pinyinKitchenGroup";
const DEFAULT_FOOD_DROP_SECONDS = 15;
const channel = "BroadcastChannel" in window ? new BroadcastChannel("pinyin-kitchen") : null;
const remoteSync = location.protocol.startsWith("http");
let remoteBase = "";
let state = loadState();
let currentGroup = state.groups[0]?.id || "A";
let draggedId = null;
let selectedId = null;
let stationWasMoved = false;
let timerHandle = null;
let remoteRev = 0;
let applyingRemote = false;
let joinToastHandle = null;
let activeMode = "login";
const animatedIncomingIds = new Set();

setSessionRole(sessionStorage.getItem("pinyinKitchenRole") || "");

const el = {
  tabs: document.querySelectorAll(".tab"),
  loginView: document.querySelector("#loginView"),
  studentView: document.querySelector("#studentView"),
  teacherView: document.querySelector("#teacherView"),
  teacherAccount: document.querySelector("#teacherAccount"),
  teacherPassword: document.querySelector("#teacherPassword"),
  roomPassword: document.querySelector("#roomPassword"),
  teacherLogin: document.querySelector("#teacherLogin"),
  loginStudentName: document.querySelector("#loginStudentName"),
  loginGroupSelect: document.querySelector("#loginGroupSelect"),
  studentRoomPassword: document.querySelector("#studentRoomPassword"),
  studentLogin: document.querySelector("#studentLogin"),
  loginMessage: document.querySelector("#loginMessage"),
  studentName: document.querySelector("#studentName"),
  groupSelect: document.querySelector("#groupSelect"),
  assignedToolText: document.querySelector("#assignedToolText"),
  joinGroup: document.querySelector("#joinGroup"),
  scoreText: document.querySelector("#scoreText"),
  kitchenScoreText: document.querySelector("#kitchenScoreText"),
  timerText: document.querySelector("#timerText"),
  kitchenTimerText: document.querySelector("#kitchenTimerText"),
  orderList: document.querySelector("#orderList"),
  ingredientTray: document.querySelector("#ingredientTray"),
  potItems: document.querySelector("#potItems"),
  boardItems: document.querySelector("#boardItems"),
  plateItems: document.querySelector("#plateItems"),
  dropBanner: document.querySelector("#dropBanner"),
  eventLog: document.querySelector("#eventLog"),
  lessonInput: document.querySelector("#lessonInput"),
  lessonMakerText: document.querySelector("#lessonMakerText"),
  lessonMakerScript: document.querySelector("#lessonMakerScript"),
  generateLessonItems: document.querySelector("#generateLessonItems"),
  lessonMakerStatus: document.querySelector("#lessonMakerStatus"),
  answerScript: document.querySelector("#answerScript"),
  groupCount: document.querySelector("#groupCount"),
  groupNamesInput: document.querySelector("#groupNamesInput"),
  roundMinutes: document.querySelector("#roundMinutes"),
  foodDropSeconds: document.querySelector("#foodDropSeconds"),
  lessonSetName: document.querySelector("#lessonSetName"),
  folderLessonInput: document.querySelector("#folderLessonInput"),
  lessonSetSelect: document.querySelector("#lessonSetSelect"),
  saveLessonSet: document.querySelector("#saveLessonSet"),
  loadLessonSet: document.querySelector("#loadLessonSet"),
  deleteLessonSet: document.querySelector("#deleteLessonSet"),
  saveLesson: document.querySelector("#saveLesson"),
  startRound: document.querySelector("#startRound"),
  resetRound: document.querySelector("#resetRound"),
  teacherStatus: document.querySelector("#teacherStatus"),
  groupMonitor: document.querySelector("#groupMonitor"),
  syncStatus: document.querySelector("#syncStatus"),
  teamMap: document.querySelector("#teamMap"),
  joinToast: document.querySelector("#joinToast"),
  studentDoor: document.querySelector("#studentDoor"),
  tileTemplate: document.querySelector("#tileTemplate")
};

init();

function init() {
  el.tabs.forEach((tab) => tab.addEventListener("click", () => switchMode(tab.dataset.mode)));
  el.teacherLogin.addEventListener("click", teacherLogin);
  el.studentLogin.addEventListener("click", studentLogin);
  el.joinGroup.addEventListener("click", joinGroup);
  el.saveLesson.addEventListener("click", saveLesson);
  el.saveLessonSet.addEventListener("click", saveLessonSet);
  el.loadLessonSet.addEventListener("click", loadLessonSet);
  el.deleteLessonSet.addEventListener("click", deleteLessonSet);
  el.generateLessonItems?.addEventListener("click", generateLessonItems);
  el.startRound.addEventListener("click", startRound);
  el.resetRound.addEventListener("click", resetRound);

  document.querySelectorAll(".station").forEach((station) => {
    station.addEventListener("click", () => {
      if (stationWasMoved) {
        stationWasMoved = false;
        return;
      }
      if (!selectedId) return;
      moveItemToTarget(selectedId, station.dataset.target);
    });
    station.addEventListener("dragover", (event) => {
      event.preventDefault();
      station.classList.add("drag-over");
    });
    station.addEventListener("dragleave", () => station.classList.remove("drag-over"));
    station.addEventListener("drop", (event) => handleDrop(event, station.dataset.target));
    attachStationDrag(station);
  });

  if (channel) {
    channel.onmessage = (event) => {
      if (event.data === "state-updated") {
        const nextState = loadState();
        detectGroupJoins(state, nextState);
        state = nextState;
        render();
      }
    };
  }

  window.addEventListener("storage", () => {
    const nextState = loadState();
    detectGroupJoins(state, nextState);
    state = nextState;
    render();
  });

  el.lessonInput.value = state.lesson.map((item) => `${item.traditional},${item.simplified},${item.pinyin},${item.tone}`).join("\n");
  if (el.folderLessonInput) el.folderLessonInput.value = el.lessonInput.value;
  setSelectedAnswerScript(state.answerScript);
  el.groupCount.value = state.groups.length;
  if (el.groupNamesInput) el.groupNamesInput.value = groupNamesToText(state.groups);
  el.roundMinutes.value = Math.round(state.roundSeconds / 60);
  if (el.foodDropSeconds) el.foodDropSeconds.value = state.foodDropSeconds || DEFAULT_FOOD_DROP_SECONDS;
  if (state.teacherAccount) el.teacherAccount.value = state.teacherAccount;
  if (state.roomPassword) el.roomPassword.value = state.roomPassword;
  restoreSessionContext();
  renderLessonSets();
  render();
  startTimer();
  initRemoteSync();
}

function loadState() {
  const saved = localStorage.getItem(stateKey);
  if (saved) {
    try {
      return normalizeState(JSON.parse(saved));
    } catch {
      localStorage.removeItem(stateKey);
    }
  }
  const initial = {
    lesson: normalizeLesson(DEFAULT_LESSON),
    answerScript: "traditional",
    teacherAccount: "",
    teacherPassword: "",
    roomPassword: "",
    roundSeconds: 180,
    foodDropSeconds: DEFAULT_FOOD_DROP_SECONDS,
    startedAt: null,
    running: false,
    groups: buildGroups(4, normalizeLesson(DEFAULT_LESSON), 180, "traditional")
  };
  localStorage.setItem(stateKey, JSON.stringify(initial));
  return initial;
}

function saveState(announce = true) {
  localStorage.setItem(stateKey, JSON.stringify(state));
  if (announce && channel) channel.postMessage("state-updated");
  render();
  if (remoteSync && !applyingRemote) {
    pushRemoteState();
  }
}

async function initRemoteSync() {
  if (!remoteSync) {
    el.syncStatus.textContent = "單機模式";
    return;
  }
  el.syncStatus.textContent = "多人同步中";
  try {
    const remote = await fetchRemoteState();
    if (remote.state) {
      applyingRemote = true;
      remoteRev = remote.rev;
      const nextState = normalizeState(remote.state);
      detectGroupJoins(state, nextState);
      state = nextState;
      localStorage.setItem(stateKey, JSON.stringify(state));
      render();
      applyingRemote = false;
    } else {
      await pushRemoteState();
    }
  } catch {
    el.syncStatus.textContent = "本機同步未連線";
  }
  window.setInterval(pullRemoteState, 850);
}

async function fetchRemoteState() {
  let response = await fetch(`${remoteBase}/api/state`, { cache: "no-store" });
  if (!response.ok && !remoteBase && location.port !== "8055") {
    remoteBase = "http://127.0.0.1:8055";
    response = await fetch(`${remoteBase}/api/state`, { cache: "no-store" });
  }
  if (!response.ok) throw new Error("remote state unavailable");
  return response.json();
}

async function pullRemoteState() {
  if (!remoteSync) return;
  try {
    const remote = await fetchRemoteState();
    if (!remote.state || remote.rev <= remoteRev) return;
    applyingRemote = true;
    remoteRev = remote.rev;
    const nextState = normalizeState(remote.state);
    detectGroupJoins(state, nextState);
    state = nextState;
    localStorage.setItem(stateKey, JSON.stringify(state));
    render();
    applyingRemote = false;
    el.syncStatus.textContent = `多人同步中 #${remoteRev}`;
  } catch {
    el.syncStatus.textContent = "本機同步未連線";
  }
}

async function pushRemoteState() {
  try {
    const response = await fetch(`${remoteBase}/api/state`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ state })
    });
    if (!response.ok) throw new Error("remote save failed");
    const payload = await response.json();
    remoteRev = payload.rev;
    el.syncStatus.textContent = `多人同步中 #${remoteRev}`;
  } catch {
    el.syncStatus.textContent = "本機同步未連線";
  }
}

function normalizeState(saved) {
  const lesson = normalizeLesson(saved.lesson?.length ? saved.lesson : DEFAULT_LESSON);
  const answerScript = saved.answerScript === "simplified" ? "simplified" : "traditional";
  return {
    ...saved,
    lesson,
    answerScript,
    teacherAccount: saved.teacherAccount || "",
    teacherPassword: saved.teacherPassword || "",
    roomPassword: saved.roomPassword || "",
    roundSeconds: saved.roundSeconds || 180,
    foodDropSeconds: clamp(Number(saved.foodDropSeconds) || DEFAULT_FOOD_DROP_SECONDS, 3, 60),
    groups: (saved.groups?.length ? saved.groups : buildGroups(4, lesson, saved.roundSeconds || 180, answerScript)).map((group) => normalizeGroup(group, lesson, answerScript))
  };
}

function normalizeGroup(group, lesson, answerScript) {
  const normalized = {
    ...group,
    name: group.name || `${group.id || "A"} 組`,
    ingredients: (group.ingredients || []).map((item) => normalizeItem(item, lesson, answerScript)),
    pot: (group.pot || []).map((item) => normalizeItem(item, lesson, answerScript)),
    board: (group.board || []).map((item) => normalizeItem(item, lesson, answerScript)),
    plate: (group.plate || []).map((item) => normalizeItem(item, lesson, answerScript)),
    playerKitchens: group.playerKitchens || {},
    orders: []
  };
  Object.keys(normalized.playerKitchens).forEach((player) => {
    normalized.playerKitchens[player] = normalizePlayerKitchen(normalized.playerKitchens[player], lesson, answerScript);
  });
  return normalized;
}

function normalizePlayerKitchen(kitchen, lesson, answerScript) {
  return {
    tool: ["pot", "board"].includes(kitchen?.tool) ? kitchen.tool : "pot",
    score: Number(kitchen?.score || 0),
    lastFoodDropAt: Number(kitchen?.lastFoodDropAt || 0),
    toneQueue: Array.isArray(kitchen?.toneQueue) ? kitchen.toneQueue.map(String).filter((tone) => /^[1-4]$/.test(tone)) : [],
    orders: (kitchen?.orders?.length ? kitchen.orders.slice(0, 1) : lesson.slice(0, 1)).map((item) => ({ ...normalizeLessonItem(item), done: Boolean(item.done) })),
    ingredients: (kitchen?.ingredients || []).map((item) => normalizeItem(item, lesson, answerScript)),
    pot: (kitchen?.pot || []).map((item) => normalizeItem(item, lesson, answerScript)),
    board: (kitchen?.board || []).map((item) => normalizeItem(item, lesson, answerScript)),
    plate: (kitchen?.plate || []).map((item) => normalizeItem(item, lesson, answerScript))
  };
}

function normalizeLesson(lesson) {
  return lesson.map(normalizeLessonItem).filter((item) => item.traditional && item.simplified && item.pinyin && isValidToneSequence(item.tone));
}

function normalizeLessonItem(item) {
  const traditional = item.traditional || item.hanzi || "";
  const simplified = item.simplified || simplifiedFallback[traditional] || traditional;
  return {
    traditional,
    simplified,
    pinyin: item.pinyin || "",
    tone: String(item.tone || "")
  };
}

function normalizeItem(item, lesson, answerScript) {
  const source = findLessonForHanzi(item.hanzi, lesson) || normalizeLessonItem(item);
  return {
    ...item,
    scatter: Number.isFinite(Number(item.scatter)) ? Number(item.scatter) : stableScatter(item.id),
    traditional: source.traditional,
    simplified: source.simplified,
    hanzi: displayHanzi(source, answerScript),
    label: item.type === "hanzi" ? displayHanzi(source, answerScript) : item.label
  };
}

function buildGroups(count, lesson, roundSeconds, answerScript = state?.answerScript || "traditional", groupNames = []) {
  return Array.from({ length: count }, (_, index) => {
    const id = String.fromCharCode(65 + index);
    return {
      id,
      name: groupNames[index]?.trim() || `${id} 組`,
      players: [],
      playerKitchens: {},
      score: 0,
      log: "準備開店",
      ingredients: createStarterIngredients(lesson, answerScript),
      pot: [],
      board: [],
      plate: [],
      orders: [],
      roundSeconds
    };
  });
}

function lessonToText(lesson) {
  return lesson.map((item) => `${item.traditional},${item.simplified},${item.pinyin},${item.tone}`).join("\n");
}

function saveLessonSet() {
  const name = el.lessonSetName.value.trim();
  if (!name) {
    el.teacherStatus.textContent = "請先輸入資料夾名稱";
    return;
  }
  const sourceText = el.folderLessonInput.value.trim();
  const lesson = parseLesson(sourceText);
  if (!lesson.length) {
    el.teacherStatus.textContent = "請在單字內容輸入：繁體,簡體,拼音,聲調";
    return;
  }
  const bank = loadLessonBank();
  bank[name] = lesson;
  saveLessonBank(bank);
  renderLessonSets();
  el.lessonSetSelect.value = name;
  const text = lessonToText(lesson);
  el.folderLessonInput.value = text;
  el.lessonInput.value = text;
  el.teacherStatus.textContent = `已儲存「${name}」`;
}

function loadLessonSet() {
  const name = el.lessonSetSelect.value;
  const lesson = loadLessonBank()[name];
  if (!lesson) return;
  const text = lessonToText(lesson);
  el.lessonSetName.value = name;
  el.folderLessonInput.value = text;
  el.lessonInput.value = text;
  el.teacherStatus.textContent = `已載入「${name}」`;
}

function deleteLessonSet() {
  const name = el.lessonSetSelect.value;
  if (!name) return;
  const bank = loadLessonBank();
  delete bank[name];
  saveLessonBank(bank);
  renderLessonSets();
  el.folderLessonInput.value = "";
  el.teacherStatus.textContent = `已刪除「${name}」`;
}

function lessonToText(lesson) {
  return lesson.map((item) => `${item.traditional},${item.simplified},${item.pinyin},${item.tone}`).join("\n");
}

function saveLessonSet() {
  const name = el.lessonSetName.value.trim();
  if (!name) {
    el.teacherStatus.textContent = "請先輸入資料夾名稱";
    return;
  }
  const sourceText = el.folderLessonInput.value.trim() || el.lessonInput.value.trim();
  const lesson = parseLesson(sourceText);
  if (!lesson.length) {
    el.teacherStatus.textContent = "請在單字內容輸入：繁體,簡體,拼音,聲調";
    return;
  }
  const bank = loadLessonBank();
  bank[name] = lesson;
  saveLessonBank(bank);
  renderLessonSets();
  el.lessonSetSelect.value = name;
  el.folderLessonInput.value = lessonToText(lesson);
  el.lessonInput.value = lessonToText(lesson);
  el.teacherStatus.textContent = `已儲存「${name}」`;
}

function loadLessonSet() {
  const name = el.lessonSetSelect.value;
  const lesson = loadLessonBank()[name];
  if (!lesson) return;
  const text = lessonToText(lesson);
  el.lessonSetName.value = name;
  el.folderLessonInput.value = text;
  el.lessonInput.value = text;
  el.teacherStatus.textContent = `已載入「${name}」`;
}

function deleteLessonSet() {
  const name = el.lessonSetSelect.value;
  if (!name) return;
  const bank = loadLessonBank();
  delete bank[name];
  saveLessonBank(bank);
  renderLessonSets();
  el.folderLessonInput.value = "";
  el.teacherStatus.textContent = `已刪除「${name}」`;
}

function lessonToText(lesson) {
  return lesson.map((item) => `${item.traditional},${item.simplified},${item.pinyin},${item.tone}`).join("\n");
}

function saveLessonSet() {
  const name = el.lessonSetName.value.trim();
  if (!name) {
    el.teacherStatus.textContent = "請先輸入資料夾名稱";
    return;
  }
  const sourceText = el.folderLessonInput.value.trim() || el.lessonInput.value.trim();
  const lesson = parseLesson(sourceText);
  if (!lesson.length) {
    el.teacherStatus.textContent = "請在單字內容輸入：繁體,簡體,拼音,聲調";
    return;
  }
  const bank = loadLessonBank();
  bank[name] = lesson;
  saveLessonBank(bank);
  renderLessonSets();
  el.lessonSetSelect.value = name;
  el.folderLessonInput.value = lessonToText(lesson);
  el.lessonInput.value = lessonToText(lesson);
  el.teacherStatus.textContent = `已儲存「${name}」`;
}

function loadLessonSet() {
  const name = el.lessonSetSelect.value;
  const lesson = loadLessonBank()[name];
  if (!lesson) return;
  const text = lessonToText(lesson);
  el.lessonSetName.value = name;
  el.folderLessonInput.value = text;
  el.lessonInput.value = text;
  el.teacherStatus.textContent = `已載入「${name}」`;
}

function deleteLessonSet() {
  const name = el.lessonSetSelect.value;
  if (!name) return;
  const bank = loadLessonBank();
  delete bank[name];
  saveLessonBank(bank);
  renderLessonSets();
  el.folderLessonInput.value = "";
  el.teacherStatus.textContent = `已刪除「${name}」`;
}

function createStarterIngredients(lesson, answerScript = state.answerScript) {
  const pinyinItems = lesson.slice(0, 6).flatMap((item) => [
    ...makePinyinPartItems(item, answerScript),
    ...makeToneItems(item, answerScript)
  ]);
  return shuffle(pinyinItems).slice(0, 10);
}

function splitPinyinParts(pinyin) {
  return String(pinyin || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z]/g, "")
    .split("")
    .filter(Boolean);
}

function makePinyinPartItems(source, answerScript = state.answerScript) {
  return splitPinyinParts(source.pinyin).map((part) => makeItem("pinyin", part, source, answerScript));
}

function splitToneParts(tone) {
  return String(tone || "")
    .replace(/[^1-5]/g, "")
    .split("")
    .filter(Boolean);
}

function isValidToneSequence(tone) {
  return /^[1-5]+$/.test(String(tone || ""));
}

function displayToneSequence(tone) {
  return splitToneParts(tone).map((part) => toneMarks[part] || part).join("");
}

function makeToneItems(source, answerScript = state.answerScript) {
  return splitToneParts(source.tone).map((tone) =>
    makeItem("tone", toneMarks[tone] || tone, { ...source, tone }, answerScript)
  );
}

function makeRandomPinyinPartItem(source, answerScript = state.answerScript) {
  const parts = splitPinyinParts(source.pinyin);
  return makeItem("pinyin", randomItem(parts.length ? parts : [source.pinyin]), source, answerScript);
}

function makeItem(type, label, source, answerScript = state.answerScript) {
  const id = `${type}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return {
    id,
    type,
    label: type === "hanzi" ? displayHanzi(source, answerScript) : label,
    hanzi: displayHanzi(source, answerScript),
    traditional: source.traditional,
    simplified: source.simplified,
    pinyin: source.pinyin,
    tone: source.tone,
    scatter: stableScatter(id)
  };
}

function switchMode(mode) {
  if (mode === "student") {
    const group = getGroup();
    if (!group?.players.includes(getPlayerName())) {
      mode = "login";
      showLoginMessage("學生請先輸入名字、組別和房間密碼");
    }
  }
  if (mode === "teacher" && !state.teacherAccount) {
    mode = "login";
    showLoginMessage("老師請先登入並建立房間密碼");
  }
  activeMode = mode;
  sessionStorage.setItem(sessionModeKey, mode);
  applyModeClasses(mode);
  render();
}

function applyModeClasses(mode) {
  el.tabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.mode === mode));
  el.loginView.classList.toggle("active", mode === "login");
  el.studentView.classList.toggle("active", mode === "student");
  el.teacherView.classList.toggle("active", mode === "teacher");
  document.body.classList.toggle("login-view-active", mode === "login");
}

function restoreSessionContext() {
  const savedPlayer = sessionStorage.getItem(sessionPlayerKey);
  const savedGroup = sessionStorage.getItem(sessionGroupKey);
  const savedRole = sessionStorage.getItem("pinyinKitchenRole") || "";
  const savedMode = sessionStorage.getItem(sessionModeKey) || savedRole || "login";

  if (savedPlayer) {
    el.studentName.value = savedPlayer;
    el.loginStudentName.value = savedPlayer;
  }
  if (savedGroup && state.groups.some((group) => group.id === savedGroup)) {
    currentGroup = savedGroup;
  }

  let mode = savedMode;
  if (mode === "teacher" && !state.teacherAccount) mode = "login";
  if (mode === "student" && !getGroup()?.players.includes(getPlayerName())) mode = "login";
  if (!["login", "student", "teacher"].includes(mode)) mode = "login";

  activeMode = mode;
  setSessionRole(mode === "login" ? savedRole : mode);
  applyModeClasses(mode);
}

function teacherLogin() {
  const account = el.teacherAccount.value.trim();
  const password = el.teacherPassword.value.trim();
  const roomPassword = el.roomPassword.value.trim();
  if (!account || !password || !roomPassword) {
    showLoginMessage("老師需要輸入帳號、密碼和房間密碼");
    return;
  }
  if (state.teacherAccount && (state.teacherAccount !== account || state.teacherPassword !== password)) {
    showLoginMessage("老師帳號或密碼不正確");
    return;
  }
  state.teacherAccount = account;
  state.teacherPassword = password;
  state.roomPassword = roomPassword;
  setSessionRole("teacher");
  sessionStorage.setItem(sessionModeKey, "teacher");
  saveState();
  showLoginMessage("老師登入成功");
  switchMode("teacher");
}

function studentLogin() {
  const player = el.loginStudentName.value.trim();
  const groupId = el.loginGroupSelect.value;
  const password = el.studentRoomPassword.value.trim();
  if (!player || !groupId || !password) {
    showLoginMessage("學生需要輸入名字、組別和房間密碼");
    return;
  }
  if (!state.roomPassword) {
    showLoginMessage("老師還沒有建立房間密碼");
    return;
  }
  if (password !== state.roomPassword) {
    showLoginMessage("房間密碼不正確");
    return;
  }
  el.studentName.value = player;
  currentGroup = groupId;
  el.groupSelect.value = groupId;
  sessionStorage.setItem(sessionPlayerKey, player);
  sessionStorage.setItem(sessionGroupKey, groupId);
  sessionStorage.setItem(sessionModeKey, "student");
  joinGroup();
  setSessionRole("student");
  showLoginMessage(`${player} 已加入 ${getGroup()?.name || "小組"}`);
  switchMode("student");
}

function showLoginMessage(message) {
  el.loginMessage.textContent = message;
}

function setSessionRole(role) {
  if (role) {
    sessionStorage.setItem("pinyinKitchenRole", role);
  }
  document.body.classList.toggle("student-session", role === "student");
  document.body.classList.toggle("teacher-session", role === "teacher");
}

function joinGroup() {
  currentGroup = el.groupSelect.value;
  const group = getGroup();
  const player = getPlayerName();
  if (!group.players.includes(player) && group.players.length >= 5) {
    group.log = `${group.name} 已經有 5 個人了`;
    saveState();
    return;
  }
  if (!group.players.includes(player)) {
    group.players.push(player);
  }
  const kitchen = ensurePlayerKitchen(group, player);
  kitchen.tool = el.toolSelect.value;
  if (!kitchen.ingredients.length) {
    kitchen.ingredients = group.ingredients.length ? group.ingredients.splice(0, 6) : createStarterIngredients(state.lesson, state.answerScript).slice(0, 6);
  }
  group.log = `${player} 加入 ${group.name}，使用${toolName(kitchen.tool)}，每人都有盤子`;
  saveState();
}

function updatePlayerTool() {
  const group = getGroup();
  if (!group) return;
  const player = getPlayerName();
  const kitchen = ensurePlayerKitchen(group, player);
  kitchen.tool = el.toolSelect.value;
  group.log = `${player} 換成${toolName(kitchen.tool)}`;
  saveState();
}

function saveLesson() {
  const lesson = parseLesson(el.lessonInput.value);
  if (!lesson.length) {
    el.teacherStatus.textContent = "題目格式需要再看一下";
    return;
  }
  const count = clamp(Number(el.groupCount.value) || 4, 1, 8);
  const minutes = clamp(Number(el.roundMinutes.value) || 3, 1, 10);
  const foodDropSeconds = clamp(Number(el.foodDropSeconds?.value) || DEFAULT_FOOD_DROP_SECONDS, 3, 60);
  const answerScript = getSelectedAnswerScript();
  state.lesson = lesson;
  state.answerScript = answerScript;
  state.roundSeconds = minutes * 60;
  state.foodDropSeconds = foodDropSeconds;
  state.startedAt = null;
  state.running = false;
  state.groups = buildGroups(count, lesson, state.roundSeconds, answerScript, readGroupNames(count));
  if (el.groupNamesInput) el.groupNamesInput.value = groupNamesToText(state.groups);
  currentGroup = state.groups[0].id;
  saveState();
}

function generateLessonItems() {
  const rawText = el.lessonMakerText?.value.trim() || "";
  if (!rawText) {
    setLessonMakerStatus("請先輸入中文字");
    return;
  }

  const outputScript = el.lessonMakerScript?.value === "simplified" ? "simplified" : "traditional";
  const missing = [];
  const generated = buildGeneratedLessonItems(rawText, missing);

  if (!generated.length) {
    setLessonMakerStatus(`目前字典還沒有：${missing.join("、") || rawText}`);
    return;
  }

  const current = parseLesson(el.lessonInput.value);
  const existingKeys = new Set(current.map(lessonKey));
  const uniqueGenerated = generated.filter((item) => {
    const key = lessonKey(item);
    if (existingKeys.has(key)) return false;
    existingKeys.add(key);
    return true;
  });

  if (!uniqueGenerated.length) {
    setLessonMakerStatus("這些題目已經在作答內容裡");
    return;
  }

  const generatedText = uniqueGenerated
    .map((item) => lessonItemToSingleScriptLine(item, outputScript))
    .join("\n");
  const existingText = el.lessonInput.value.trim();
  const nextText = [existingText, generatedText].filter(Boolean).join("\n");
  el.lessonInput.value = nextText;
  if (el.folderLessonInput && !el.folderLessonInput.value.trim()) {
    el.folderLessonInput.value = nextText;
  }
  setSelectedAnswerScript(outputScript);
  setLessonMakerStatus(
    `已生成 ${uniqueGenerated.length} 個題目${missing.length ? `；尚未支援：${missing.join("、")}` : ""}`
  );
}

function findGeneratedHanzi(char) {
  const found = generatedHanziBank.find((item) => item.traditional === char || item.simplified === char);
  return found ? normalizeLessonItem(found) : null;
}

function buildGeneratedLessonItems(rawText, missing) {
  const terms = rawText
    .split(/[\s,，、。；;]+/u)
    .map((term) => term.replace(/[^\u3400-\u9fff]/gu, ""))
    .filter(Boolean);

  return terms.flatMap((term) => buildGeneratedLessonTerm(term, missing));
}

function buildGeneratedLessonTerm(term, missing) {
  const phraseMap = {
    ...(window.HANZI_PHRASE_PINYIN || {}),
    "可樂": [["可", "ke", "3"], ["樂", "le", "4"]],
    "可乐": [["可", "ke", "3"], ["乐", "le", "4"]]
  };
  const characters = [...term];
  const pieces = [];
  let index = 0;

  while (index < characters.length) {
    const rest = characters.slice(index).join("");
    const phrase = Object.keys(phraseMap)
      .sort((a, b) => b.length - a.length)
      .find((key) => rest.startsWith(key));

    if (phrase) {
      phraseMap[phrase].forEach(([hanzi, pinyin, tone]) => {
        const item = findGeneratedHanzi(hanzi);
        pieces.push(normalizeLessonItem({
          traditional: item?.traditional || hanzi,
          simplified: item?.simplified || hanzi,
          pinyin,
          tone
        }));
      });
      index += [...phrase].length;
      continue;
    }

    const char = characters[index];
    if (/[\u3400-\u9fff]/u.test(char)) {
      const item = findGeneratedHanzi(char);
      if (item) {
        pieces.push(item);
      } else if (!missing.includes(char)) {
        missing.push(char);
      }
    }
    index += 1;
  }

  if (!pieces.length) return [];
  return [{
    traditional: pieces.map((item) => item.traditional).join(""),
    simplified: pieces.map((item) => item.simplified).join(""),
    pinyin: pieces.map((item) => item.pinyin).join(""),
    tone: pieces.map((item) => item.tone).join("")
  }];
}

function lessonKey(item) {
  return `${item.traditional}|${item.simplified}|${item.pinyin}|${item.tone}`;
}

function lessonItemToSingleScriptLine(item, script) {
  const hanzi = script === "simplified" ? item.simplified : item.traditional;
  return `${hanzi},${item.pinyin},${item.tone}`;
}

function getSelectedAnswerScript() {
  const value = el.answerScript?.value || el.lessonMakerScript?.value || state.answerScript;
  return value === "simplified" ? "simplified" : "traditional";
}

function setSelectedAnswerScript(script) {
  const nextScript = script === "simplified" ? "simplified" : "traditional";
  if (el.answerScript) el.answerScript.value = nextScript;
  if (el.lessonMakerScript) el.lessonMakerScript.value = nextScript;
}

function setLessonMakerStatus(message) {
  if (el.lessonMakerStatus) el.lessonMakerStatus.textContent = message;
}

function parseLesson(text) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const parts = line.split(",").map((part) => part?.trim());
      if (parts.length >= 4) {
        const [traditional, simplified, pinyin, tone] = parts;
        return { traditional, simplified, pinyin, tone };
      }
      const [hanzi, pinyin, tone] = parts;
      return {
        traditional: hanzi,
        simplified: simplifiedFallback[hanzi] || hanzi,
        pinyin,
        tone
      };
    })
    .filter((item) => item.traditional && item.simplified && item.pinyin && isValidToneSequence(item.tone));
}

function startRound() {
  state.foodDropSeconds = clamp(Number(el.foodDropSeconds?.value) || state.foodDropSeconds || DEFAULT_FOOD_DROP_SECONDS, 3, 60);
  state.running = true;
  state.startedAt = Date.now();
  state.groups.forEach((group) => {
    group.score = 0;
    group.log = "回合開始，快點備菜！";
    group.ingredients = createStarterIngredients(state.lesson, state.answerScript);
    group.playerKitchens = {};
    group.players.forEach((player, index) => {
      const kitchen = ensurePlayerKitchen(group, player);
      kitchen.tool = ["pot", "board"][index % 2];
      kitchen.score = 0;
      kitchen.lastFoodDropAt = Date.now();
      kitchen.toneQueue = [];
      kitchen.ingredients = createStarterIngredients(state.lesson, state.answerScript).slice(0, 6);
      kitchen.pot = [];
      kitchen.board = [];
      kitchen.plate = [];
      kitchen.orders = nextSingleOrderForPlayer(group, player);
    });
    group.pot = [];
    group.board = [];
    group.plate = [];
    group.orders = [];
  });
  saveState();
}

function resetRound() {
  state.running = false;
  state.startedAt = null;
  state.groups = buildGroups(state.groups.length, state.lesson, state.roundSeconds, state.answerScript, state.groups.map((group) => group.name));
  saveState();
}

function readGroupNames(count) {
  const typedNames = (el.groupNamesInput?.value || "")
    .split("\n")
    .map((name) => name.trim());
  return Array.from({ length: count }, (_, index) => (
    typedNames[index] || state.groups[index]?.name || `${String.fromCharCode(65 + index)} 組`
  ));
}

function groupNamesToText(groups) {
  return groups.map((group) => group.name).join("\n");
}

function getRemainingSeconds() {
  if (!state.running || !state.startedAt) return state.roundSeconds;
  return Math.max(0, state.roundSeconds - Math.floor((Date.now() - state.startedAt) / 1000));
}

function startTimer() {
  window.clearInterval(timerHandle);
  timerHandle = window.setInterval(() => {
    if (state.running && getRemainingSeconds() === 0) {
      state.running = false;
      state.groups.forEach((group) => {
        group.log = "時間到！請老師查看成果";
      });
      saveState();
    } else {
      dropTimedIngredients();
      renderTimers();
    }
  }, 500);
}

function render() {
  renderGroups();
  renderStudent();
  renderTeacher();
  renderTimers();
}

function renderGroups() {
  el.groupSelect.innerHTML = "";
  el.loginGroupSelect.innerHTML = "";
  state.groups.forEach((group) => {
    const option = document.createElement("option");
    option.value = group.id;
    option.textContent = group.name;
    el.groupSelect.append(option);
    el.loginGroupSelect.append(option.cloneNode(true));
  });
  if (!state.groups.some((group) => group.id === currentGroup)) {
    currentGroup = state.groups[0]?.id || "A";
  }
  el.groupSelect.value = currentGroup;
  el.loginGroupSelect.value = currentGroup;
}

function renderStudent() {
  const group = getGroup();
  if (!group) return;
  if (!group.players.includes(getPlayerName()) && activeMode !== "student") return;
  renderStudentDoor();
  const kitchen = ensurePlayerKitchen(group, getPlayerName());
  el.assignedToolText.textContent = toolName(kitchen.tool);
  el.scoreText.textContent = kitchen.score;
  if (el.kitchenScoreText) el.kitchenScoreText.textContent = kitchen.score;
  el.eventLog.textContent = group.log;
  renderTeamMap(group, getPlayerName());
  renderOrders(kitchen);
  renderOwnedStation(kitchen.tool);
  renderTileList(el.ingredientTray, kitchen.ingredients);
  renderTileList(el.potItems, kitchen.pot);
  renderTileList(el.boardItems, kitchen.board);
  renderTileList(el.plateItems, kitchen.plate);
}

function renderStudentDoor() {
  if (!el.studentView || !el.studentDoor) return;
  const tutorialActive = el.studentView.classList.contains("tutorial-active");
  if (tutorialActive) {
    el.studentView.classList.remove("door-opening");
    el.studentView.classList.remove("door-opened");
    return;
  }
  const shouldWait = activeMode === "student" && !state.running;
  el.studentView.classList.toggle("waiting-start", shouldWait);
  if (shouldWait) {
    el.studentView.classList.remove("door-opening");
    el.studentView.classList.remove("door-opened");
    return;
  }
  if (activeMode === "student" && !el.studentView.classList.contains("door-opened")) {
    el.studentView.classList.add("door-opening");
    window.setTimeout(() => {
      el.studentView.classList.add("door-opened");
      el.studentView.classList.remove("door-opening");
    }, 900);
  }
}

function renderTeamMap(group, player) {
  if (!el.teamMap) return;
  const joined = group.players.includes(player);
  const teammateCount = group.players.filter((name) => name !== player).length;
  if (!joined || teammateCount === 0) {
    el.teamMap.innerHTML = `
      <div class="team-map-title">隊友位置</div>
      <div class="seat-row waiting">加入同一組後，這裡會顯示左右邊的玩家</div>
    `;
    return;
  }
  const leftPlayer = getRecipientPlayer(group, player, -1);
  const rightPlayer = getRecipientPlayer(group, player, 1);
  el.teamMap.innerHTML = `
    <div class="team-map-title">隊友位置</div>
    <div class="seat-row">
      <span class="seat-arrow">←</span>
      <div><strong>左邊</strong><small>${leftPlayer || "等待隊友"}</small></div>
      <em>左滑傳給他</em>
    </div>
    <div class="seat-row">
      <span class="seat-arrow">→</span>
      <div><strong>右邊</strong><small>${rightPlayer || "等待隊友"}</small></div>
      <em>右滑傳給他</em>
    </div>
  `;
}

function renderOwnedStation(tool) {
  document.querySelectorAll(".station").forEach((station) => {
    const owned = station.dataset.target === tool || station.dataset.target === "plate";
    station.classList.toggle("owned", owned);
    station.classList.toggle("locked", !owned);
    station.classList.toggle("personal-plate", station.dataset.target === "plate");
  });
  requestAnimationFrame(() => {
    preventStationOverlaps();
    requestAnimationFrame(preventStationOverlaps);
  });
  const label = toolName(tool);
  el.dropBanner.textContent = state.running
    ? `你的主要廚具是${label}，你也有盤子；食材左右滑出畫面可傳給組員`
    : `你的主要廚具是${label}，你也有盤子；老師開始後就能傳食材`;
}

function renderOrders(kitchen) {
  el.orderList.innerHTML = "";
  kitchen.orders.forEach((order) => {
    const card = document.createElement("div");
    card.className = `order ${order.done ? "done" : ""}`;
    card.innerHTML = `
      <div>
        <div class="hanzi">${displayHanzi(order)}</div>
        <div class="order-meta">${order.pinyin}${displayToneSequence(order.tone)}</div>
      </div>
      <strong>${order.done ? "完成" : "待上菜"}</strong>
    `;
    el.orderList.append(card);
  });
}

function renderTileList(container, items) {
  container.innerHTML = "";
  const occupied = container === el.ingredientTray ? stationRects() : [];
  items.forEach((item) => {
    const tile = el.tileTemplate.content.firstElementChild.cloneNode(true);
    tile.className = `tile ${item.type}`;
    tile.textContent = item.label;
    tile.dataset.id = item.id;
    tile.dataset.scatter = item.scatter || stableScatter(item.id);
    tile.title = describeItem(item);
    if (container === el.ingredientTray) {
      const width = item.type === "tone" ? 52 : 64;
      let position;
      if (Number.isFinite(item.x) && Number.isFinite(item.y)) {
        position = clampToWorkArea(item.x, item.y, width, 52);
        if (overlapsAny({ ...position, width, height: 52 }, occupied)) {
          position = nearestOpenPosition(position.x, position.y, width, 52, occupied);
        }
        item.x = position.x;
        item.y = position.y;
      } else {
        const scattered = scatterPosition(item, width, 52);
        position = nearestOpenPosition(
          scattered.x,
          scattered.y,
          width,
          52,
          occupied
        );
        item.x = position.x;
        item.y = position.y;
      }
      const occupiedRect = { ...position, width, height: 52 };
      occupied.push(occupiedRect);
      tile.style.left = `${position.x}px`;
      tile.style.top = `${position.y}px`;
      tile.dataset.placed = "true";
    }
    if (item.serving) {
      tile.classList.add("serving");
    }
    const incomingKey = `${item.id}:${item.entryAt || ""}`;
    if (item.entryFrom && !animatedIncomingIds.has(incomingKey)) {
      tile.classList.add(`incoming-${item.entryFrom}`);
      animatedIncomingIds.add(incomingKey);
    }
    attachTilePointerHandlers(tile, item.id);
    tile.addEventListener("click", () => {
      if (tile.dataset.swiped === "true") {
        tile.dataset.swiped = "false";
        return;
      }
      selectedId = selectedId === item.id ? null : item.id;
      renderStudent();
    });
    tile.addEventListener("contextmenu", (event) => event.preventDefault());
    tile.addEventListener("dragstart", (event) => event.preventDefault());
    tile.addEventListener("dragend", () => tile.classList.remove("dragging"));
    tile.classList.toggle("selected", selectedId === item.id);
    container.append(tile);
  });
}

function renderTeacher() {
  const remaining = formatTime(getRemainingSeconds());
  el.teacherStatus.textContent = state.running ? `進行中 ${remaining}` : "等待開始";
  el.groupMonitor.innerHTML = "";
  state.groups.forEach((group) => {
    const card = document.createElement("article");
    card.className = "monitor-card";
    const playerScreens = group.players.length
      ? group.players.map((player) => renderStudentMonitorScreen(group, player)).join("")
      : `<div class="student-monitor-empty">尚未有學生加入這一組</div>`;
    card.innerHTML = `
      <header>
        <div class="group-title-edit">
          <h3>${group.name}</h3>
          <button class="group-edit-btn" type="button" data-group-id="${group.id}" aria-label="修改組別名稱">✎</button>
        </div>
        <strong>${groupScore(group)} 分</strong>
      </header>
      <p>玩家：${renderPlayerTools(group)}</p>
      <p>${group.log}</p>
      <div class="student-monitor-grid">
        ${playerScreens}
      </div>
    `;
    card.querySelector(".group-edit-btn")?.addEventListener("click", () => editGroupName(group.id));
    el.groupMonitor.append(card);
  });
}

function editGroupName(groupId) {
  const group = state.groups.find((entry) => entry.id === groupId);
  const button = document.querySelector(`.group-edit-btn[data-group-id="${CSS.escape(groupId)}"]`);
  const container = button?.closest(".group-title-edit");
  if (!group || !container) return;
  container.innerHTML = `<input class="group-name-editor" maxlength="16" aria-label="組別名稱">`;
  const input = container.querySelector(".group-name-editor");
  input.value = group.name;
  const commit = () => {
    const nextName = input.value.trim() || group.name;
    group.name = nextName;
    if (el.groupNamesInput) el.groupNamesInput.value = groupNamesToText(state.groups);
    saveState();
  };
  input.focus();
  input.select();
  input.addEventListener("blur", commit, { once: true });
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      input.blur();
    }
    if (event.key === "Escape") {
      event.preventDefault();
      renderTeacher();
    }
  });
}

function renderStudentMonitorScreen(group, player) {
  const kitchen = ensurePlayerKitchen(group, player);
  const leftPlayer = getRecipientPlayer(group, player, -1);
  const rightPlayer = getRecipientPlayer(group, player, 1);
  const orders = kitchen.orders || [];
  const doneCount = orders.filter((order) => order.done).length;
  const tool = toolName(kitchen.tool);
  return `
    <section class="student-screen">
      <header>
        <div>
          <strong>${escapeHtml(player)}</strong>
          <span>${tool}｜盤子</span>
        </div>
        <em>${doneCount}/${orders.length || 0}</em>
      </header>
      <div class="student-screen-neighbors">
        <span>左：${escapeHtml(leftPlayer || "無")}</span>
        <span>右：${escapeHtml(rightPlayer || "無")}</span>
      </div>
      <div class="student-screen-orders">
        ${orders.slice(0, 5).map((order) => `
          <span class="${order.done ? "done" : ""}">
            ${displayHanzi(order)}
            <small>${order.pinyin}${displayToneSequence(order.tone)}</small>
          </span>
        `).join("") || "<span>無菜單</span>"}
      </div>
      <div class="student-screen-table">
        ${monitorStationPiles(kitchen)}
      </div>
    </section>
  `;
}

function monitorStationPiles(kitchen) {
  const ownedTool = kitchen.tool === "board" ? "board" : "pot";
  const toolLabel = ownedTool === "board" ? "砧板" : "鍋子";
  return [
    monitorPile("食材台", kitchen.ingredients),
    monitorPile(toolLabel, kitchen[ownedTool]),
    monitorPile("盤子", kitchen.plate)
  ].join("");
}

function monitorPile(label, items = []) {
  const chips = items.slice(0, 8).map((item) => {
    const text = item.type === "hanzi" ? displayHanzi(item) : item.label;
    return `<span class="mini-chip ${item.type}">${escapeHtml(text)}</span>`;
  }).join("");
  const more = items.length > 8 ? `<small>+${items.length - 8}</small>` : "";
  return `
    <div class="monitor-pile">
      <strong>${label}</strong>
      <div>${chips || "<span class='mini-empty'>空</span>"}${more}</div>
    </div>
  `;
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[char]));
}

function renderPlayerTools(group) {
  if (!group.players.length) return "尚未加入";
  return group.players.map((player) => {
    const kitchen = ensurePlayerKitchen(group, player);
    const leftPlayer = getRecipientPlayer(group, player, -1);
    const rightPlayer = getRecipientPlayer(group, player, 1);
    const sideText = group.players.length > 1 ? ` 左:${leftPlayer} 右:${rightPlayer}` : "";
    return `${player}(${toolName(kitchen.tool)}${sideText})`;
  }).join("、");
}

function detectGroupJoins(previousState, nextState) {
  const previousGroup = previousState.groups.find((group) => group.id === currentGroup);
  const nextGroup = nextState.groups.find((group) => group.id === currentGroup);
  if (!previousGroup || !nextGroup) return;
  const player = getPlayerName();
  if (!nextGroup.players.includes(player)) return;
  const previousPlayers = new Set(previousGroup.players || []);
  const newPlayers = nextGroup.players.filter((name) => name !== player && !previousPlayers.has(name));
  if (!newPlayers.length) return;
  const names = newPlayers.join("、");
  const seat = describeNeighborSeats(nextGroup, player, newPlayers);
  showJoinToast(`${names} 加入你的組別${seat ? `，${seat}` : ""}`);
}

function describeNeighborSeats(group, player, names) {
  const details = [];
  const leftPlayer = getRecipientPlayer(group, player, -1);
  const rightPlayer = getRecipientPlayer(group, player, 1);
  if (names.includes(leftPlayer)) details.push(`${leftPlayer} 在你的左邊`);
  if (names.includes(rightPlayer) && rightPlayer !== leftPlayer) details.push(`${rightPlayer} 在你的右邊`);
  if (details.length) return details.join("，");
  if (leftPlayer && rightPlayer && group.players.length > 2) {
    return `現在左邊是 ${leftPlayer}，右邊是 ${rightPlayer}`;
  }
  return "";
}

function showJoinToast(message) {
  if (!el.joinToast) return;
  window.clearTimeout(joinToastHandle);
  el.joinToast.textContent = message;
  el.joinToast.classList.add("show");
  joinToastHandle = window.setTimeout(() => {
    el.joinToast.classList.remove("show");
  }, 3600);
}

function collectPlayerItems(group, tool) {
  return group.players.flatMap((player) => {
    const kitchen = ensurePlayerKitchen(group, player);
    return tool === "plate" || kitchen.tool === tool ? kitchen[tool] : [];
  });
}

function renderTimers() {
  const remaining = formatTime(getRemainingSeconds());
  el.timerText.textContent = remaining;
  if (el.kitchenTimerText) el.kitchenTimerText.textContent = remaining;
  const group = getGroup();
  const kitchen = group ? ensurePlayerKitchen(group, getPlayerName()) : null;
  const toolText = kitchen ? `你的主要廚具是${toolName(kitchen.tool)}，你也有盤子；` : "";
  if (state.running) {
    el.dropBanner.textContent = `${toolText}左右滑出畫面可傳食材，剩下 ${remaining}`;
  } else {
    el.dropBanner.textContent = `${toolText}老師開始後就能傳食材`;
  }
}

function miniStation(name, items) {
  const chips = items.slice(0, 6).map((item) => `<span class="mini-chip">${item.type === "hanzi" ? displayHanzi(item) : item.label}</span>`).join("");
  return `<div class="mini-station"><strong>${name}</strong><div class="mini-items">${chips || "空"}</div></div>`;
}

function handleDrop(event, target) {
  event.preventDefault();
  document.querySelectorAll(".station").forEach((station) => station.classList.remove("drag-over"));
  if (!draggedId) return;
  moveItemToTarget(draggedId, target);
  draggedId = null;
}

function attachTilePointerHandlers(tile, itemId) {
  let startX = 0;
  let startY = 0;
  let moved = false;
  let active = false;
  let pointerId = null;
  let tileWidth = 64;
  let tileHeight = 52;
  let pendingPush = null;
  let pushFrame = null;
  tile.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    active = true;
    moved = false;
    pointerId = event.pointerId;
    const tileRect = tile.getBoundingClientRect();
    tileWidth = tileRect.width;
    tileHeight = tileRect.height;
    startX = event.clientX;
    startY = event.clientY;
    draggedId = itemId;
    selectedId = null;
    tile.classList.add("dragging");
    document.querySelector(".kitchen").classList.add("dragging-food");
    tile.setPointerCapture?.(event.pointerId);
  });
  tile.addEventListener("pointermove", (event) => {
    if (!active || event.pointerId !== pointerId) return;
    handleTileDragMove(event);
  });

  function schedulePreviewPush(object, dx, dy) {
    pendingPush = { object, dx, dy };
    if (pushFrame) return;
    pushFrame = requestAnimationFrame(() => {
      pushFrame = null;
      if (!active || !pendingPush) return;
      pushOverlappingObjects(pendingPush.object, pendingPush.dx, pendingPush.dy);
      pendingPush = null;
    });
  }

  function handleTileDragMove(event) {
    const dx = event.clientX - startX;
    const dy = event.clientY - startY;
    if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
    moved = true;
    const tray = el.ingredientTray;
    if (tile.parentElement !== tray) {
      tray.append(tile);
    }
    const kitchenRect = document.querySelector(".kitchen").getBoundingClientRect();
    const position = clampToWorkArea(
      event.clientX - kitchenRect.left - tileWidth / 2,
      event.clientY - kitchenRect.top - tileHeight / 2,
      tileWidth,
      tileHeight
    );
    tile.style.position = "absolute";
    tile.style.left = `${Math.round(position.x)}px`;
    tile.style.top = `${Math.round(position.y)}px`;
    tile.style.zIndex = "29";
    schedulePreviewPush({
      kind: "food",
      id: itemId,
      x: position.x,
      y: position.y,
      width: tileWidth,
      height: tileHeight
    }, dx, dy);
    setTransferGuideState(transferDirectionFromTile(tile));
  }
  tile.addEventListener("pointerup", (event) => {
    if (!active || event.pointerId !== pointerId) return;
    active = false;
    pointerId = null;
    if (pushFrame) {
      cancelAnimationFrame(pushFrame);
      pushFrame = null;
    }
    pendingPush = null;
    tile.classList.remove("dragging");
    document.querySelector(".kitchen").classList.remove("dragging-food");
    setTransferGuideState(0);
    draggedId = null;
    const station = stationFromPoint(event.clientX, event.clientY, tile);
    const stationTarget = station?.dataset.target;
    const sourceName = getItemSourceName(itemId);
    if (moved && stationTarget && sourceName !== stationTarget) {
      tile.dataset.swiped = "true";
      moveItemToTarget(itemId, stationTarget);
      return;
    }
    const transferDirection = moved ? transferDirectionFromTile(tile) : 0;
    if (transferDirection) {
      tile.dataset.swiped = "true";
      tile.classList.add(transferDirection > 0 ? "outgoing-right" : "outgoing-left");
      window.setTimeout(() => passItemToTeammate(itemId, transferDirection), 170);
      return;
    }
    if (moved) {
      tile.dataset.swiped = "true";
      moveItemToTable(itemId, currentTilePosition(tile));
      clearPreviewPushes();
    }
  });
  tile.addEventListener("pointercancel", () => {
    active = false;
    pointerId = null;
    if (pushFrame) {
      cancelAnimationFrame(pushFrame);
      pushFrame = null;
    }
    pendingPush = null;
    draggedId = null;
    tile.classList.remove("dragging");
    document.querySelector(".kitchen").classList.remove("dragging-food");
    setTransferGuideState(0);
    clearPreviewPushes();
  });
}

function stationFromPoint(x, y, tile) {
  const previousPointerEvents = tile.style.pointerEvents;
  tile.style.pointerEvents = "none";
  const station = document.elementFromPoint(x, y)?.closest?.(".station");
  tile.style.pointerEvents = previousPointerEvents;
  return station;
}

function currentTilePosition(tile) {
  const kitchenRect = document.querySelector(".kitchen").getBoundingClientRect();
  const tileRect = tile.getBoundingClientRect();
  return clampToWorkArea(
    tileRect.left - kitchenRect.left,
    tileRect.top - kitchenRect.top,
    tileRect.width,
    tileRect.height
  );
}

function clampToWorkArea(x, y, width = 0, height = 0) {
  const kitchenRect = document.querySelector(".kitchen").getBoundingClientRect();
  const topSafe = clamp(Math.round(kitchenRect.height * 0.14), 72, 92);
  const bottomSafe = clamp(Math.round(kitchenRect.height * 0.16), 84, 112);
  const maxX = Math.max(0, kitchenRect.width - width);
  const maxY = Math.max(topSafe, kitchenRect.height - bottomSafe - height);
  return {
    x: clamp(Math.round(x), 0, Math.round(maxX)),
    y: clamp(Math.round(y), topSafe, Math.round(maxY))
  };
}

function transferDirectionFromTile(tile) {
  const kitchen = document.querySelector(".kitchen");
  const kitchenRect = kitchen.getBoundingClientRect();
  const tileRect = tile.getBoundingClientRect();
  const zoneWidth = clamp(kitchenRect.width * 0.07, 46, 64);
  const centerX = tileRect.left + tileRect.width / 2 - kitchenRect.left;
  if (centerX <= zoneWidth) return -1;
  if (centerX >= kitchenRect.width - zoneWidth) return 1;
  return 0;
}

function setTransferGuideState(direction) {
  const kitchen = document.querySelector(".kitchen");
  kitchen.classList.toggle("transfer-left-active", direction < 0);
  kitchen.classList.toggle("transfer-right-active", direction > 0);
}

function getItemSourceName(itemId) {
  const group = getGroup();
  if (!group) return null;
  const kitchen = ensurePlayerKitchen(group, getPlayerName());
  return ["ingredients", "pot", "board", "plate"].find((name) => kitchen[name].some((item) => item.id === itemId)) || null;
}

function findKitchenItem(kitchen, itemId) {
  for (const sourceName of ["ingredients", "pot", "board", "plate"]) {
    const index = kitchen[sourceName].findIndex((item) => item.id === itemId);
    if (index !== -1) {
      return { sourceName, index, item: kitchen[sourceName][index] };
    }
  }
  return null;
}

function moveItemToTable(itemId, position) {
  const group = getGroup();
  const kitchen = ensurePlayerKitchen(group, getPlayerName());
  const found = findKitchenItem(kitchen, itemId);
  if (!found) return;
  const [item] = kitchen[found.sourceName].splice(found.index, 1);
  const width = item.type === "tone" ? 52 : 64;
  const intendedPosition = clampToWorkArea(position.x, position.y, width, 52);
  const finalPosition = nearestOpenPosition(
    intendedPosition.x,
    intendedPosition.y,
    width,
    52,
    tableObstacleRects(kitchen.ingredients)
  );
  item.x = finalPosition.x;
  item.y = finalPosition.y;
  delete item.entryFrom;
  delete item.entryAt;
  delete item.serving;
  kitchen.ingredients.push(item);
  settleObjectsAround({
    kind: "food",
    item,
    id: item.id,
    x: finalPosition.x,
    y: finalPosition.y,
    width,
    height: 52
  }, true);
  group.log = `${item.label} 放在食材台`;
  selectedId = null;
  saveState();
}

function attachStationDrag(station) {
  let startX = 0;
  let startY = 0;
  let startLeft = 0;
  let startTop = 0;
  let lastLeft = 0;
  let lastTop = 0;
  let active = false;
  let pendingPush = null;
  let pushFrame = null;
  station.addEventListener("pointerdown", (event) => {
    if (event.target.closest(".tile")) return;
    event.preventDefault();
    active = true;
    stationWasMoved = false;
    station.classList.add("dragging-station");
    startX = event.clientX;
    startY = event.clientY;
    const kitchenRect = document.querySelector(".kitchen").getBoundingClientRect();
    const stationRect = station.getBoundingClientRect();
    startLeft = stationRect.left - kitchenRect.left;
    startTop = stationRect.top - kitchenRect.top;
    lastLeft = startLeft;
    lastTop = startTop;
    station.setPointerCapture?.(event.pointerId);
  });
  station.addEventListener("contextmenu", (event) => event.preventDefault());
  station.addEventListener("pointermove", (event) => {
    if (!active) return;
    const dx = event.clientX - startX;
    const dy = event.clientY - startY;
    if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
    stationWasMoved = true;
    const stationRect = station.getBoundingClientRect();
    const position = clampToWorkArea(startLeft + dx, startTop + dy, stationRect.width, stationRect.height);
    station.style.left = `${position.x}px`;
    station.style.top = `${position.y}px`;
    station.style.right = "auto";
    station.style.bottom = "auto";
    lastLeft = position.x;
    lastTop = position.y;
    pendingPush = {
      object: {
        kind: "station",
        station,
        x: position.x,
        y: position.y,
        width: stationRect.width,
        height: stationRect.height
      },
      dx,
      dy
    };
    if (!pushFrame) {
      pushFrame = requestAnimationFrame(() => {
        pushFrame = null;
        if (!active || !pendingPush) return;
        pushOverlappingObjects(pendingPush.object, pendingPush.dx, pendingPush.dy);
        pendingPush = null;
      });
    }
  });
  station.addEventListener("pointerup", () => {
    if (pushFrame) {
      cancelAnimationFrame(pushFrame);
      pushFrame = null;
    }
    pendingPush = null;
    if (stationWasMoved) {
      settleStationPosition(station);
      saveState();
    } else {
      clearPreviewPushes();
    }
    station.classList.remove("dragging-station");
    active = false;
  });
  station.addEventListener("pointercancel", () => {
    if (pushFrame) {
      cancelAnimationFrame(pushFrame);
      pushFrame = null;
    }
    pendingPush = null;
    station.classList.remove("dragging-station");
    clearPreviewPushes();
    active = false;
  });
}

function settleStationPosition(station) {
  const kitchenRect = document.querySelector(".kitchen").getBoundingClientRect();
  const stationRect = station.getBoundingClientRect();
  const currentPosition = clampToWorkArea(
    stationRect.left - kitchenRect.left,
    stationRect.top - kitchenRect.top,
    stationRect.width,
    stationRect.height
  );
  station.style.left = `${currentPosition.x}px`;
  station.style.top = `${currentPosition.y}px`;
  station.style.right = "auto";
  station.style.bottom = "auto";
  settleObjectsAround({
    kind: "station",
    station,
    x: currentPosition.x,
    y: currentPosition.y,
    width: stationRect.width,
    height: stationRect.height
  }, true);
  resolveStationOverlaps(station, 0, 0, true);
}

function passItemToTeammate(itemId, direction) {
  const group = getGroup();
  const player = getPlayerName();
  const kitchen = ensurePlayerKitchen(group, player);
  const sourceName = ["ingredients", "pot", "board", "plate"].find((name) => kitchen[name].some((item) => item.id === itemId));
  if (!sourceName) return;
  const itemIndex = kitchen[sourceName].findIndex((item) => item.id === itemId);
  const [item] = kitchen[sourceName].splice(itemIndex, 1);
  const recipient = getRecipientPlayer(group, player, direction);
  if (!recipient) {
    kitchen[sourceName].splice(itemIndex, 0, item);
    group.log = "目前沒有其他組員可以接食材";
    saveState();
    return;
  }
  const recipientKitchen = ensurePlayerKitchen(group, recipient);
  delete item.x;
  delete item.y;
  delete item.serving;
  item.entryFrom = direction < 0 ? "right" : "left";
  item.entryAt = Date.now();
  recipientKitchen.ingredients.push(item);
  group.log = `${player} 把 ${item.label} ${direction < 0 ? "左滑" : "右滑"}傳給 ${recipient}`;
  selectedId = null;
  saveState();
}

function moveItemToTarget(itemId, target) {
  const group = getGroup();
  const kitchen = ensurePlayerKitchen(group, getPlayerName());
  if (target !== kitchen.tool && target !== "plate") {
    group.log = `你目前有${toolName(kitchen.tool)}和盤子，不能使用${toolName(target)}`;
    selectedId = null;
    saveState();
    return;
  }
  const sourceName = ["ingredients", "pot", "board", "plate"].find((name) => kitchen[name].some((item) => item.id === itemId));
  if (!sourceName) return;
  const itemIndex = kitchen[sourceName].findIndex((item) => item.id === itemId);
  const [item] = kitchen[sourceName].splice(itemIndex, 1);
  delete item.x;
  delete item.y;
  delete item.entryFrom;
  delete item.entryAt;

  if (target === "pot") {
    kitchen.pot.push(item);
    cookIfReady(group, kitchen);
  }
  if (target === "board") {
    cutIfReady(group, kitchen, item);
  }
  if (target === "plate") {
    kitchen.plate.push(item);
    serveIfReady(group, kitchen, item);
  }

  selectedId = null;
  saveState();
}

function cookIfReady(group, kitchen) {
  const pinyinParts = kitchen.pot.filter((item) => item.type === "pinyin");
  const toneParts = kitchen.pot.filter((item) => item.type === "tone");
  if (!pinyinParts.length || !toneParts.length) {
    group.log = "鍋子需要拼音字母和聲調";
    return;
  }
  const assembledPinyin = pinyinParts.map((item) => item.label).join("").toLowerCase();
  const assembledTone = toneParts.map((item) => item.tone).join("");
  const match = state.lesson.find((item) => item.pinyin === assembledPinyin && item.tone === assembledTone);
  if (!match) {
    group.log = `${assembledPinyin}${displayToneSequence(assembledTone)} 沒有煮出菜單上的字`;
    return;
  }
  const usedIds = new Set([...pinyinParts.map((item) => item.id), ...toneParts.map((item) => item.id)]);
  kitchen.pot = kitchen.pot.filter((item) => !usedIds.has(item.id));
  kitchen.pot.push(makeItem("hanzi", displayHanzi(match), match));
  group.log = `煮好了：${displayHanzi(match)}`;
}

function cutIfReady(group, kitchen, item) {
  if (item.type !== "hanzi") {
    kitchen.board.push(item);
    group.log = "砧板只會切中文字";
    return;
  }
  const source = findLessonForHanzi(item.hanzi) || item;
  kitchen.board.push(...makePinyinPartItems(source));
  kitchen.board.push(...makeToneItems(source));
  group.log = `${item.hanzi} 被切成 ${splitPinyinParts(source.pinyin).join(" + ")} + ${displayToneSequence(source.tone)}`;
}

function serveIfReady(group, kitchen, item) {
  if (item.type !== "hanzi") {
    kitchen.plate = kitchen.plate.filter((plateItem) => plateItem.id !== item.id);
    delete item.x;
    delete item.y;
    kitchen.ingredients.push(item);
    group.log = "盤子只能上中文字";
    return;
  }
  const order = kitchen.orders.find((entry) => displayHanzi(entry) === item.hanzi && !entry.done);
  if (!order) {
    group.log = `${item.hanzi} 不是現在指定的菜`;
    return;
  }
  order.done = true;
  kitchen.score += 1;
  group.score = groupScore(group);
  item.serving = true;
  group.log = `上菜成功：${item.hanzi}`;
  window.setTimeout(() => removeServedItem(item.id), 520);
  kitchen.orders = nextSingleOrderForPlayer(group, getPlayerName());
  group.log = `${getPlayerName()} 完成一題，新的題目來了`;
}

function removeServedItem(itemId) {
  const group = getGroup();
  if (!group) return;
  const kitchen = ensurePlayerKitchen(group, getPlayerName());
  const before = kitchen.plate.length;
  kitchen.plate = kitchen.plate.filter((plateItem) => plateItem.id !== itemId);
  if (kitchen.plate.length !== before) {
    saveState();
  }
}

function dropTimedIngredients() {
  if (!state.running) return;
  const group = getGroup();
  if (!group || !group.players.includes(getPlayerName())) return;
  const kitchen = ensurePlayerKitchen(group, getPlayerName());
  const now = Date.now();
  kitchen.lastFoodDropAt ||= state.startedAt || now;
  const dropIntervalMs = clamp(Number(state.foodDropSeconds) || DEFAULT_FOOD_DROP_SECONDS, 3, 60) * 1000;
  if (now - kitchen.lastFoodDropAt < dropIntervalMs) return;
  kitchen.lastFoodDropAt = now;
  addFallingIngredients(kitchen, 3);
  group.log = "新食材掉到食材台了";
  saveState();
}

function addFallingIngredients(kitchen, count) {
  const occupied = tableObstacleRects(kitchen.ingredients);
  for (let index = 0; index < count; index += 1) {
    const item = makeRandomIngredient(kitchen);
    const width = item.type === "tone" ? 52 : 64;
    const position = randomDropPosition(width, 52, occupied);
    item.x = position.x;
    item.y = position.y;
    item.entryFrom = "top";
    item.entryAt = Date.now() + index;
    kitchen.ingredients.push(item);
    occupied.push({ x: position.x, y: position.y, width, height: 52 });
  }
}

function makeRandomIngredient(kitchen) {
  const source = randomItem(activeDropSources(kitchen));
  if (Math.random() < 0.75) return makeRandomPinyinPartItem(source);
  return makeOrderToneIngredient(source);
}

function activeDropSources(kitchen) {
  const activeOrders = (kitchen.orders?.length ? kitchen.orders : state.lesson)
    .filter((item) => !item.done);
  return activeOrders.length ? activeOrders : state.lesson;
}

function makeHelperHanziIngredient(kitchen) {
  const activeOrders = (kitchen.orders?.length ? kitchen.orders : state.lesson)
    .filter((item) => !item.done);
  const targets = activeOrders.length ? activeOrders : state.lesson;
  const answerSet = new Set(state.lesson.flatMap((item) => [
    item.traditional,
    item.simplified,
    displayHanzi(item, state.answerScript)
  ]));
  const targetPairs = new Set(targets.map((item) => `${item.pinyin}:${item.tone}`));
  const candidates = helperHanziBank.filter((item) =>
    targetPairs.has(`${item.pinyin}:${item.tone}`) &&
    !answerSet.has(item.traditional) &&
    !answerSet.has(item.simplified) &&
    !answerSet.has(displayHanzi(item, state.answerScript))
  );
  if (!candidates.length) return null;
  const helper = randomItem(candidates);
  return makeItem("hanzi", displayHanzi(helper, state.answerScript), helper, state.answerScript);
}

function makeLessonToneIngredient(kitchen) {
  const tone = Math.random() < 0.15 ? randomChallengeTone() : drawLessonTone(kitchen);
  const lessonSource = state.lesson.find((item) => splitToneParts(item.tone).includes(tone)) || randomItem(state.lesson);
  const source = { ...lessonSource, tone };
  return makeItem("tone", toneMarks[tone] || tone, source);
}

function makeOrderToneIngredient(source) {
  const toneParts = splitToneParts(source.tone);
  const tone = randomItem(toneParts.length ? toneParts : ["1"]);
  return makeItem("tone", toneMarks[tone] || tone, { ...source, tone });
}

function drawLessonTone(kitchen) {
  const lessonTones = state.lesson.flatMap((item) => splitToneParts(item.tone)).filter((tone) => /^[1-4]$/.test(tone));
  if (!kitchen.toneQueue?.length) {
    kitchen.toneQueue = shuffle(lessonTones.length ? lessonTones : ["1", "2", "3", "4"]);
  }
  return kitchen.toneQueue.shift() || randomItem(lessonTones.length ? lessonTones : ["1", "2", "3", "4"]);
}

function randomChallengeTone() {
  const lessonToneSet = new Set(state.lesson.flatMap((item) => splitToneParts(item.tone)));
  const outsideLesson = ["1", "2", "3", "4"].filter((tone) => !lessonToneSet.has(tone));
  return randomItem(outsideLesson.length ? outsideLesson : ["1", "2", "3", "4"]);
}

function randomDropPosition(width, height, occupied = []) {
  const kitchenRect = document.querySelector(".kitchen").getBoundingClientRect();
  const leftPad = 84;
  const rightPad = 84;
  const span = Math.max(1, kitchenRect.width - leftPad - rightPad - width);
  for (let attempt = 0; attempt < 80; attempt += 1) {
    const x = leftPad + Math.random() * span;
    const y = 92 + Math.random() * Math.max(1, kitchenRect.height - 230);
    const position = clampToWorkArea(x, y, width, height);
    if (!overlapsAny({ ...position, width, height }, occupied)) return position;
  }
  return firstOpenTilePosition(width, height, occupied);
}

function ingredientRects(items) {
  return items.map((item) => {
    const width = item.type === "tone" ? 52 : 64;
    const height = 52;
    const position = Number.isFinite(item.x) && Number.isFinite(item.y)
      ? clampToWorkArea(item.x, item.y, width, height)
      : scatterPosition(item, width, height);
    return { ...position, width, height };
  });
}

function stationRects(excludedStation = null) {
  const kitchenRect = document.querySelector(".kitchen").getBoundingClientRect();
  return [...document.querySelectorAll(".station.owned")]
    .filter((station) => station !== excludedStation)
    .map((station) => stationCollisionObject(station, kitchenRect));
}

function stationCollisionObject(station, kitchenRect = document.querySelector(".kitchen").getBoundingClientRect()) {
  const rect = station.getBoundingClientRect();
  const base = {
    x: rect.left - kitchenRect.left,
    y: rect.top - kitchenRect.top,
    width: rect.width,
    height: rect.height
  };
  const collision = stationCollisionBox(station.dataset.target, base);
  return {
    kind: "station",
    station,
    ...collision
  };
}

function stationCollisionBox(target, base) {
  let collision = base;
  if (target === "pot") {
    collision = {
      x: base.x + base.width * 0.03,
      y: base.y + base.height * 0.03,
      width: base.width * 0.56,
      height: base.height * 0.94
    };
  }
  if (target === "board") {
    collision = {
      x: base.x + base.width * 0.08,
      y: base.y + base.height * 0.08,
      width: base.width * 0.84,
      height: base.height * 0.84
    };
  }
  if (target === "plate") {
    collision = {
      x: base.x + base.width * 0.08,
      y: base.y + base.height * 0.08,
      width: base.width * 0.84,
      height: base.height * 0.84
    };
  }
  return {
    x: Math.round(collision.x),
    y: Math.round(collision.y),
    width: Math.round(collision.width),
    height: Math.round(collision.height)
  };
}

function stationCollisionAt(station, position, width, height) {
  return stationCollisionBox(station.dataset.target, {
    x: position.x,
    y: position.y,
    width,
    height
  });
}

function constrainedStationPosition(station, x, y, width, height, dx = 0, dy = 0, previous = null) {
  const occupied = stationRects(station);
  const desired = clampToWorkArea(x, y, width, height);
  if (!overlapsAny(stationCollisionAt(station, desired, width, height), occupied)) return desired;

  const fallback = previous
    ? clampToWorkArea(previous.x, previous.y, width, height)
    : currentStationPosition(station, width, height);
  const candidates = [
    clampToWorkArea(desired.x, fallback.y, width, height),
    clampToWorkArea(fallback.x, desired.y, width, height)
  ];

  const blocker = occupied.find((rect) => overlapsAny(stationCollisionAt(station, desired, width, height), [rect]));
  if (blocker) {
    if (dx > 0) candidates.push(clampToWorkArea(blocker.x - width, desired.y, width, height));
    if (dx < 0) candidates.push(clampToWorkArea(blocker.x + blocker.width, desired.y, width, height));
    if (dy > 0) candidates.push(clampToWorkArea(desired.x, blocker.y - height, width, height));
    if (dy < 0) candidates.push(clampToWorkArea(desired.x, blocker.y + blocker.height, width, height));
    candidates.push(pushedPosition({ kind: "station", ...blocker }, { kind: "station", station, ...desired, width, height }, dx, dy, Infinity));
  }

  const safeCandidates = candidates.filter((position) => !overlapsAny(stationCollisionAt(station, position, width, height), occupied));
  if (safeCandidates.length) {
    return safeCandidates.sort((a, b) => distanceSquared(a, desired) - distanceSquared(b, desired))[0];
  }
  return fallback;
}

function currentStationPosition(station, width, height) {
  const kitchenRect = document.querySelector(".kitchen").getBoundingClientRect();
  const rect = station.getBoundingClientRect();
  return clampToWorkArea(rect.left - kitchenRect.left, rect.top - kitchenRect.top, width, height);
}

function distanceSquared(a, b) {
  return ((a.x - b.x) ** 2) + ((a.y - b.y) ** 2);
}

function preventStationOverlaps() {
  resolveStationOverlaps(null, 0, 0, true);
}

function stationObjects() {
  const kitchenRect = document.querySelector(".kitchen")?.getBoundingClientRect();
  if (!kitchenRect) return [];
  return [...document.querySelectorAll(".station.owned")].map((station) => {
    const rect = station.getBoundingClientRect();
    const object = {
      kind: "station",
      station,
      x: Math.round(rect.left - kitchenRect.left),
      y: Math.round(rect.top - kitchenRect.top),
      width: Math.round(rect.width),
      height: Math.round(rect.height)
    };
    object.collision = stationCollisionObject(station, kitchenRect);
    return object;
  });
}

function resolveStationOverlaps(activeStation = null, dx = 0, dy = 0, persist = false) {
  const maxPasses = persist ? 18 : 10;
  const maxStep = Infinity;
  for (let pass = 0; pass < maxPasses; pass += 1) {
    let changed = false;
    const stations = stationObjects();
    for (let i = 0; i < stations.length; i += 1) {
      for (let j = i + 1; j < stations.length; j += 1) {
        const first = stations[i];
        const second = stations[j];
        if (!stationRectsTouching(first.collision, second.collision, 6)) continue;
        const anchor = second.station === activeStation ? second : first;
        const target = second.station === activeStation ? first : second;
        let objectToMove = target;
        let collisionPosition = pushedPosition(anchor.collision, target.collision, dx, dy, maxStep, 6);
        let position = elementPositionFromCollisionMove(target, collisionPosition);
        if (target.x === position.x && target.y === position.y) {
          objectToMove = anchor;
          collisionPosition = pushedPosition(target.collision, anchor.collision, -dx, -dy, maxStep, 6);
          position = elementPositionFromCollisionMove(anchor, collisionPosition);
        }
        if (objectToMove.x === position.x && objectToMove.y === position.y) continue;
        moveTableObject(objectToMove, position, persist);
        changed = true;
      }
    }
    if (!changed) return;
  }
}

function stationRectsTouching(a, b, lead = 0) {
  return (
    a.x < b.x + b.width + lead &&
    a.x + a.width + lead > b.x &&
    a.y < b.y + b.height + lead &&
    a.y + a.height + lead > b.y
  );
}

function elementPositionFromCollisionMove(object, collisionPosition) {
  return clampToWorkArea(
    object.x + collisionPosition.x - object.collision.x,
    object.y + collisionPosition.y - object.collision.y,
    object.width,
    object.height
  );
}

function tableObstacleRects(items, excludedStation = null) {
  return [
    ...stationRects(excludedStation),
    ...ingredientRects(items)
  ];
}

function tableObjects(excluded = {}) {
  const kitchen = ensurePlayerKitchen(getGroup(), getPlayerName());
  const foodObjects = kitchen.ingredients
    .filter((item) => item.id !== excluded.id)
    .map((item) => {
      const width = item.type === "tone" ? 52 : 64;
      const height = 52;
      const position = currentFoodPosition(item, width, height);
      return { kind: "food", item, x: position.x, y: position.y, width, height };
    });
  const stationObjects = [...document.querySelectorAll(".station.owned")]
    .filter((station) => station !== excluded.station)
    .map((station) => {
      const kitchenRect = document.querySelector(".kitchen").getBoundingClientRect();
      const rect = station.getBoundingClientRect();
      return {
        kind: "station",
        station,
        x: Math.round(rect.left - kitchenRect.left),
        y: Math.round(rect.top - kitchenRect.top),
        width: Math.round(rect.width),
        height: Math.round(rect.height)
      };
    });
  return [...foodObjects, ...stationObjects];
}

function pushOverlappingObjects(dragged, dx = 0, dy = 0) {
  if (dragged.kind === "station") {
    resolveStationOverlaps(dragged.station, dx, dy, false);
    return;
  }
  pushObjectsNaturally(dragged, dx, dy, false);
}

function settleObjectsAround(anchor, persist = false) {
  pushObjectsNaturally(anchor, 0, 0, persist);
}

function pushObjectsNaturally(anchor, dx = 0, dy = 0, persist = false) {
  const maxPasses = persist ? 16 : 6;
  const maxStep = persist ? 44 : 18;
  const anchors = [anchor];
  for (let pass = 0; pass < maxPasses; pass += 1) {
    let changed = false;
    const objects = tableObjects(anchor);
    for (const currentAnchor of anchors.slice()) {
      for (const object of objects) {
        if (sameTableObject(currentAnchor, object)) continue;
        if (anchor.kind === "food" && object.kind === "station") continue;
        if (!overlapsAny(currentAnchor, [object])) continue;
        const pushed = pushedPosition(currentAnchor, object, dx, dy, maxStep);
        if (object.x === pushed.x && object.y === pushed.y) continue;
        moveTableObject(object, pushed, persist);
        anchors.push({ ...object, x: pushed.x, y: pushed.y });
        changed = true;
      }
    }
    if (!changed) return;
  }
}

function pushedPosition(dragged, object, dx = 0, dy = 0, maxStep = Infinity, lead = 0) {
  const draggedCenterX = dragged.x + dragged.width / 2;
  const draggedCenterY = dragged.y + dragged.height / 2;
  const objectCenterX = object.x + object.width / 2;
  const objectCenterY = object.y + object.height / 2;
  const overlapX = Math.min(dragged.x + dragged.width + lead - object.x, object.x + object.width + lead - dragged.x);
  const overlapY = Math.min(dragged.y + dragged.height + lead - object.y, object.y + object.height + lead - dragged.y);
  let x = object.x;
  let y = object.y;
  if (overlapX < overlapY) {
    const direction = objectCenterX === draggedCenterX ? Math.sign(dx) || 1 : Math.sign(objectCenterX - draggedCenterX);
    x += direction * Math.min(overlapX, maxStep);
  } else {
    const direction = objectCenterY === draggedCenterY ? Math.sign(dy) || 1 : Math.sign(objectCenterY - draggedCenterY);
    y += direction * Math.min(overlapY, maxStep);
  }
  return clampToWorkArea(x, y, object.width, object.height);
}

function moveTableObject(object, position, persist = false) {
  if (object.kind === "food") {
    if (persist) {
      object.item.x = position.x;
      object.item.y = position.y;
    }
    const tile = el.ingredientTray.querySelector(`[data-id="${CSS.escape(object.item.id)}"]`);
    if (tile && !tile.classList.contains("dragging")) {
      tile.style.left = `${position.x}px`;
      tile.style.top = `${position.y}px`;
      tile.dataset.previewPushed = "true";
    }
  }
  if (object.kind === "station") {
    object.station.style.left = `${position.x}px`;
    object.station.style.top = `${position.y}px`;
    object.station.style.right = "auto";
    object.station.style.bottom = "auto";
  }
}

function currentFoodPosition(item, width, height) {
  const tile = el.ingredientTray.querySelector(`[data-id="${CSS.escape(item.id)}"]`);
  if (tile) {
    return currentTilePosition(tile);
  }
  return Number.isFinite(item.x) && Number.isFinite(item.y)
    ? clampToWorkArea(item.x, item.y, width, height)
    : scatterPosition(item, width, height);
}

function tableObjectRect(object) {
  return {
    x: object.x,
    y: object.y,
    width: object.width,
    height: object.height
  };
}

function clearPreviewPushes() {
  if (el.ingredientTray.querySelector("[data-preview-pushed='true']")) {
    renderStudent();
  }
}

function sameTableObject(a, b) {
  const aId = a.id || a.item?.id;
  const bId = b.id || b.item?.id;
  return (aId && aId === bId) || (a.station && a.station === b.station);
}

function scatterPosition(item, width, height) {
  const kitchenRect = document.querySelector(".kitchen").getBoundingClientRect();
  const anchors = [
    [0.08, 0.18], [0.23, 0.1], [0.46, 0.18], [0.73, 0.12],
    [0.12, 0.45], [0.33, 0.5], [0.62, 0.48], [0.83, 0.38],
    [0.2, 0.72], [0.52, 0.72], [0.78, 0.7], [0.4, 0.34]
  ];
  const [xRatio, yRatio] = anchors[((item.scatter || stableScatter(item.id)) - 1) % anchors.length];
  return clampToWorkArea(kitchenRect.width * xRatio, kitchenRect.height * yRatio, width, height);
}

function firstOpenTilePosition(width, height, occupied = []) {
  const kitchenRect = document.querySelector(".kitchen").getBoundingClientRect();
  const topSafe = clamp(Math.round(kitchenRect.height * 0.14), 72, 92);
  const bottomSafe = clamp(Math.round(kitchenRect.height * 0.16), 84, 112);
  const stepX = width + 14;
  const stepY = height + 14;
  for (let y = topSafe; y <= kitchenRect.height - bottomSafe - height; y += stepY) {
    for (let x = 70; x <= kitchenRect.width - 70 - width; x += stepX) {
      const position = clampToWorkArea(x, y, width, height);
      if (!overlapsAny({ ...position, width, height }, occupied)) return position;
    }
  }
  return clampToWorkArea(84, topSafe, width, height);
}

function nearestOpenPosition(x, y, width, height, occupied = []) {
  const start = clampToWorkArea(x, y, width, height);
  const startRect = { ...start, width, height };
  if (!overlapsAny(startRect, occupied)) return start;
  const step = 18;
  for (let radius = step; radius <= 360; radius += step) {
    for (let angle = 0; angle < 360; angle += 30) {
      const radians = angle * Math.PI / 180;
      const position = clampToWorkArea(
        start.x + Math.cos(radians) * radius,
        start.y + Math.sin(radians) * radius,
        width,
        height
      );
      if (!overlapsAny({ ...position, width, height }, occupied)) return position;
    }
  }
  return firstOpenTilePosition(width, height, occupied);
}

function overlapsAny(rect, others) {
  const gap = 0;
  return others.some((other) => (
    rect.x < other.x + other.width + gap &&
    rect.x + rect.width + gap > other.x &&
    rect.y < other.y + other.height + gap &&
    rect.y + rect.height + gap > other.y
  ));
}

function getGroup() {
  return state.groups.find((group) => group.id === currentGroup);
}

function getPlayerName() {
  return el.studentName.value.trim() || "小廚師";
}

function ensurePlayerKitchen(group, player) {
  group.playerKitchens ||= {};
  if (!group.players.includes(player)) {
    if (group.players.length >= 5) return normalizePlayerKitchen({}, state.lesson, state.answerScript);
    group.players.push(player);
  }
  if (!group.playerKitchens[player]) {
    group.playerKitchens[player] = {
      tool: el.toolSelect?.value || ["pot", "board"][Math.max(0, group.players.indexOf(player)) % 2],
      score: 0,
      lastFoodDropAt: Date.now(),
      toneQueue: [],
      orders: nextSingleOrderForPlayer(group, player),
      ingredients: createStarterIngredients(state.lesson, state.answerScript).slice(0, 6),
      pot: [],
      board: [],
      plate: []
    };
  }
  return group.playerKitchens[player];
}

function getRecipientPlayer(group, player, direction) {
  if (group.players.length < 2) return null;
  const index = group.players.indexOf(player);
  if (index === -1) return group.players[0];
  return group.players[(index + direction + group.players.length) % group.players.length];
}

function toolName(tool) {
  return { pot: "鍋子", board: "砧板", plate: "盤子" }[tool] || "廚具";
}

function groupScore(group) {
  return group.players.reduce((sum, player) => sum + Number(group.playerKitchens?.[player]?.score || 0), 0);
}

function describeItem(item) {
  if (item.type === "hanzi") return `${displayHanzi(item)}：${item.pinyin}${displayToneSequence(item.tone)}`;
  if (item.type === "tone") return `聲調 ${item.tone}`;
  return `拼音字母 ${item.label}`;
}

function displayHanzi(item, answerScript = state.answerScript) {
  return answerScript === "simplified" ? item.simplified : item.traditional;
}

function findLessonForHanzi(hanzi, lesson = state.lesson) {
  return lesson.find((entry) => entry.traditional === hanzi || entry.simplified === hanzi);
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
  const rest = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${rest}`;
}

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function stableScatter(id = "") {
  let hash = 0;
  String(id).split("").forEach((char) => {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  });
  return (hash % 12) + 1;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function getPlayerName() {
  return el.studentName.value.trim() || "小廚師";
}

function toolName(tool) {
  return { pot: "鍋子", board: "砧板", plate: "盤子" }[tool] || "廚具";
}

function joinGroup() {
  currentGroup = el.groupSelect.value;
  const group = getGroup();
  const player = getPlayerName();
  if (!group || !player) return;
  sessionStorage.setItem(sessionPlayerKey, player);
  sessionStorage.setItem(sessionGroupKey, currentGroup);
  if (!group.players.includes(player) && group.players.length >= 5) {
    group.log = `${group.name} 已經有 5 個人了`;
    saveState();
    return;
  }
  if (!group.players.includes(player)) {
    group.players.push(player);
  }
  const kitchen = ensurePlayerKitchen(group, player);
  if (!kitchen.ingredients.length) {
    kitchen.ingredients = group.ingredients.length
      ? group.ingredients.splice(0, 6)
      : createStarterIngredients(state.lesson, state.answerScript).slice(0, 6);
  }
  group.log = `${player} 加入 ${group.name}，系統分配${toolName(kitchen.tool)}，每人都有盤子`;
  saveState();
}

function ensurePlayerKitchen(group, player) {
  group.playerKitchens ||= {};
  if (!group.players.includes(player)) {
    return normalizePlayerKitchen({}, state.lesson, state.answerScript);
  }
  if (!group.playerKitchens[player]) {
    group.playerKitchens[player] = {
      tool: assignToolForPlayer(group, player),
      score: 0,
      lastFoodDropAt: Date.now(),
      toneQueue: [],
      orders: nextSingleOrderForPlayer(group, player),
      ingredients: createStarterIngredients(state.lesson, state.answerScript).slice(0, 6),
      pot: [],
      board: [],
      plate: []
    };
  }
  return group.playerKitchens[player];
}

function nextSingleOrderForPlayer(group, player) {
  const lesson = state.lesson?.length ? state.lesson : DEFAULT_LESSON;
  const activeKeys = new Set(
    (group.players || [])
      .filter((name) => name !== player)
      .flatMap((name) => group.playerKitchens?.[name]?.orders || [])
      .filter((order) => !order.done)
      .map(orderKey)
  );
  const available = lesson.filter((item) => !activeKeys.has(orderKey(item)));
  const pool = available.length ? available : lesson;
  const picked = randomItem(shuffle(pool));
  return picked ? [{ ...picked, done: false }] : [];
}

function orderKey(item) {
  return `${item.traditional || ""}|${item.simplified || ""}|${item.pinyin || ""}|${item.tone || ""}`;
}

function assignToolForPlayer(group, player) {
  const existing = group.playerKitchens?.[player]?.tool;
  if (["pot", "board"].includes(existing)) return existing;
  const otherPlayers = group.players.filter((name) => name !== player);
  const tools = otherPlayers.map((name) => group.playerKitchens?.[name]?.tool).filter((tool) => ["pot", "board"].includes(tool));
  const potCount = tools.filter((tool) => tool === "pot").length;
  const boardCount = tools.filter((tool) => tool === "board").length;
  if (!tools.length) return Math.random() < 0.5 ? "pot" : "board";
  if (potCount === 0) return "pot";
  if (boardCount === 0) return "board";
  if (potCount === boardCount) return Math.random() < 0.5 ? "pot" : "board";
  return potCount < boardCount ? "pot" : "board";
}

function assignToolsForGroup(group) {
  const shuffledPlayers = shuffle(group.players);
  shuffledPlayers.forEach((player, index) => {
    const kitchen = ensurePlayerKitchen(group, player);
    if (shuffledPlayers.length === 1) {
      kitchen.tool = Math.random() < 0.5 ? "pot" : "board";
    } else if (index === 0) {
      kitchen.tool = Math.random() < 0.5 ? "pot" : "board";
    } else if (index === 1) {
      kitchen.tool = shuffledPlayers.length > 1 && group.playerKitchens[shuffledPlayers[0]].tool === "pot" ? "board" : "pot";
    } else {
      kitchen.tool = assignToolForPlayer(group, player);
    }
  });
}

function startRound() {
  state.running = true;
  state.startedAt = Date.now();
  state.groups.forEach((group) => {
    group.score = 0;
    group.log = "回合開始，快點備菜！";
    group.ingredients = createStarterIngredients(state.lesson, state.answerScript);
    group.players.forEach((player) => {
      if (group.playerKitchens?.[player]) {
        group.playerKitchens[player].orders = [];
      }
    });
    group.players.forEach((player) => {
      const kitchen = ensurePlayerKitchen(group, player);
      kitchen.score = 0;
      kitchen.lastFoodDropAt = Date.now();
      kitchen.toneQueue = [];
      kitchen.ingredients = createStarterIngredients(state.lesson, state.answerScript).slice(0, 6);
      kitchen.pot = [];
      kitchen.board = [];
      kitchen.plate = [];
      kitchen.orders = nextSingleOrderForPlayer(group, player);
    });
    assignToolsForGroup(group);
    group.pot = [];
    group.board = [];
    group.plate = [];
    group.orders = [];
  });
  saveState();
}

function loadLessonBank() {
  try {
    return JSON.parse(localStorage.getItem(lessonBankKey) || "{}");
  } catch {
    localStorage.removeItem(lessonBankKey);
    return {};
  }
}

function saveLessonBank(bank) {
  localStorage.setItem(lessonBankKey, JSON.stringify(bank));
}

function renderLessonSets() {
  if (!el.lessonSetSelect) return;
  const bank = loadLessonBank();
  el.lessonSetSelect.innerHTML = "";
  Object.keys(bank).sort().forEach((name) => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    el.lessonSetSelect.append(option);
  });
}

function saveLessonSet() {
  const name = el.lessonSetName.value.trim();
  if (!name) {
    el.teacherStatus.textContent = "請先輸入資料夾名稱";
    return;
  }
  const lesson = parseLesson(el.lessonInput.value);
  if (!lesson.length) {
    el.teacherStatus.textContent = "作答內容格式需要再看一下";
    return;
  }
  const bank = loadLessonBank();
  bank[name] = lesson;
  saveLessonBank(bank);
  renderLessonSets();
  el.lessonSetSelect.value = name;
  el.teacherStatus.textContent = `已儲存「${name}」`;
}

function loadLessonSet() {
  const name = el.lessonSetSelect.value;
  const lesson = loadLessonBank()[name];
  if (!lesson) return;
  el.lessonSetName.value = name;
  el.lessonInput.value = lesson.map((item) => `${item.traditional},${item.simplified},${item.pinyin},${item.tone}`).join("\n");
  el.teacherStatus.textContent = `已載入「${name}」`;
}

function deleteLessonSet() {
  const name = el.lessonSetSelect.value;
  if (!name) return;
  const bank = loadLessonBank();
  delete bank[name];
  saveLessonBank(bank);
  renderLessonSets();
  el.teacherStatus.textContent = `已刪除「${name}」`;
}

function buildGroups(count, lesson, roundSeconds, answerScript = state?.answerScript || "traditional", groupNames = []) {
  return Array.from({ length: count }, (_, index) => {
    const id = String.fromCharCode(65 + index);
    return {
      id,
      name: groupNames[index]?.trim() || `${id} 組`,
      players: [],
      playerKitchens: {},
      score: 0,
      log: "等待老師開始",
      ingredients: createStarterIngredients(lesson, answerScript),
      pot: [],
      board: [],
      plate: [],
      orders: [],
      roundSeconds
    };
  });
}
