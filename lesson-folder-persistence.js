(function () {
  const legacyLessonBankKey = "pinyinKitchenLessonBank";
  const permanentLessonBankKey = "pinyinKitchenLessonBankPermanent";
  const stateKey = "pinyinKitchenState";
  const defaultAccount = "__default_teacher__";

  const folderInput = document.querySelector("#folderLessonInput");
  const lessonInput = document.querySelector("#lessonInput");
  const nameInput = document.querySelector("#lessonSetName");
  const setSelect = document.querySelector("#lessonSetSelect");
  const status = document.querySelector("#teacherStatus");
  const saveButton = document.querySelector("#saveLessonSet");
  const loadButton = document.querySelector("#loadLessonSet");
  const deleteButton = document.querySelector("#deleteLessonSet");
  const teacherAccountInput = document.querySelector("#teacherAccount");
  const teacherLoginButton = document.querySelector("#teacherLogin");

  if (!folderInput || !lessonInput || !nameInput || !setSelect) return;

  function readJson(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch {
      return fallback;
    }
  }

  function writeJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function getTeacherAccount() {
    const typedAccount = teacherAccountInput?.value?.trim();
    const savedState = readJson(stateKey, {});
    return typedAccount || savedState.teacherAccount || defaultAccount;
  }

  function normalizeStore(store) {
    if (!store || typeof store !== "object") return { accounts: {} };
    if (!store.accounts || typeof store.accounts !== "object") store.accounts = {};
    return store;
  }

  function loadPermanentStore() {
    return normalizeStore(readJson(permanentLessonBankKey, { accounts: {} }));
  }

  function savePermanentStore(store) {
    writeJson(permanentLessonBankKey, normalizeStore(store));
  }

  function loadLegacyBank() {
    const bank = readJson(legacyLessonBankKey, {});
    return bank && typeof bank === "object" ? bank : {};
  }

  function saveLegacyBank(bank) {
    writeJson(legacyLessonBankKey, bank);
  }

  function getAccountBank(account = getTeacherAccount()) {
    const store = loadPermanentStore();
    const legacyBank = loadLegacyBank();

    if (!store.accounts[account]) store.accounts[account] = {};

    Object.entries(legacyBank).forEach(([name, lesson]) => {
      if (!store.accounts[account][name]) {
        store.accounts[account][name] = lesson;
      }
    });

    savePermanentStore(store);
    return store.accounts[account];
  }

  function saveAccountBank(bank, account = getTeacherAccount()) {
    const store = loadPermanentStore();
    store.accounts[account] = bank;
    savePermanentStore(store);
    saveLegacyBank(bank);
  }

  function parseLesson(text) {
    return text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const parts = line.split(",").map((part) => part.trim());
        if (parts.length >= 4) {
          const [traditional, simplified, pinyin, tone] = parts;
          return { traditional, simplified, pinyin, tone };
        }
        if (parts.length >= 3) {
          const [hanzi, pinyin, tone] = parts;
          return { traditional: hanzi, simplified: hanzi, pinyin, tone };
        }
        return null;
      })
      .filter((item) => item && item.traditional && item.simplified && item.pinyin && /^[1-5]+$/.test(item.tone));
  }

  function lessonToText(lesson) {
    const script = document.querySelector("#lessonMakerScript")?.value === "simplified" ? "simplified" : "traditional";
    return lesson.map((item) => {
      const hanzi = script === "simplified" ? item.simplified : item.traditional;
      return `${hanzi},${item.pinyin},${item.tone}`;
    }).join("\n");
  }

  function renderSets(selectedName = "") {
    const bank = getAccountBank();
    setSelect.innerHTML = "";

    Object.keys(bank).sort().forEach((name) => {
      const option = document.createElement("option");
      option.value = name;
      option.textContent = name;
      setSelect.append(option);
    });

    if (selectedName && bank[selectedName]) setSelect.value = selectedName;
  }

  function nextFolderName(bank) {
    let index = Object.keys(bank).length + 1;
    let name = `資料夾 ${index}`;
    while (bank[name]) {
      index += 1;
      name = `資料夾 ${index}`;
    }
    return name;
  }

  function stopOldHandlers(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  saveButton?.addEventListener("click", (event) => {
    stopOldHandlers(event);

    const bank = getAccountBank();
    const name = nameInput.value.trim() || nextFolderName(bank);
    const sourceText = folderInput.value.trim() || lessonInput.value.trim();
    const lesson = parseLesson(sourceText);

    if (!name) {
      status.textContent = "請先輸入資料夾名稱。";
      return;
    }

    if (!lesson.length) {
      status.textContent = "請輸入單字資料，格式為：繁體,簡體,pinyin,聲調。";
      return;
    }

    bank[name] = lesson;
    saveAccountBank(bank);

    const text = lessonToText(lesson);
    nameInput.value = name;
    folderInput.value = text;
    lessonInput.value = text;
    renderSets(name);
    status.textContent = `已永久儲存「${name}」，重新登入也會保留。`;
  }, true);

  loadButton?.addEventListener("click", (event) => {
    stopOldHandlers(event);

    const name = setSelect.value;
    const lesson = getAccountBank()[name];
    if (!lesson) return;

    const text = lessonToText(lesson);
    nameInput.value = name;
    folderInput.value = text;
    lessonInput.value = text;
    status.textContent = `已載入「${name}」。`;
  }, true);

  deleteButton?.addEventListener("click", (event) => {
    stopOldHandlers(event);

    const name = setSelect.value;
    if (!name) return;

    const bank = getAccountBank();
    delete bank[name];
    saveAccountBank(bank);
    folderInput.value = "";
    renderSets();
    status.textContent = `已刪除「${name}」。`;
  }, true);

  teacherLoginButton?.addEventListener("click", () => {
    window.setTimeout(() => renderSets(), 0);
  });

  teacherAccountInput?.addEventListener("change", () => renderSets());
  renderSets();
})();
