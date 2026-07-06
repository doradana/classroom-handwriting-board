(function () {
  const lessonBankKey = "pinyinKitchenLessonBank";

  const folderInput = document.querySelector("#folderLessonInput");
  const lessonInput = document.querySelector("#lessonInput");
  const nameInput = document.querySelector("#lessonSetName");
  const setSelect = document.querySelector("#lessonSetSelect");
  const status = document.querySelector("#teacherStatus");
  const saveButton = document.querySelector("#saveLessonSet");
  const loadButton = document.querySelector("#loadLessonSet");
  const deleteButton = document.querySelector("#deleteLessonSet");

  if (!folderInput || !lessonInput || !nameInput || !setSelect) return;

  function loadBank() {
    try {
      return JSON.parse(localStorage.getItem(lessonBankKey) || "{}");
    } catch {
      localStorage.removeItem(lessonBankKey);
      return {};
    }
  }

  function saveBank(bank) {
    localStorage.setItem(lessonBankKey, JSON.stringify(bank));
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
    const bank = loadBank();
    setSelect.innerHTML = "";
    Object.keys(bank).sort().forEach((name) => {
      const option = document.createElement("option");
      option.value = name;
      option.textContent = name;
      setSelect.append(option);
    });
    if (selectedName) setSelect.value = selectedName;
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

  function stopOldHandler(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  saveButton?.addEventListener("click", (event) => {
    stopOldHandler(event);
    const bank = loadBank();
    const name = nameInput.value.trim() || nextFolderName(bank);
    const lesson = parseLesson(folderInput.value.trim() || lessonInput.value.trim());
    if (!name) {
      status.textContent = "請先輸入資料夾名稱";
      return;
    }
    if (!lesson.length) {
      status.textContent = "請在單字內容輸入：繁體,簡體,拼音,聲調";
      return;
    }
    bank[name] = lesson;
    saveBank(bank);
    const text = lessonToText(lesson);
    nameInput.value = name;
    folderInput.value = text;
    lessonInput.value = text;
    renderSets(name);
    status.textContent = `已儲存「${name}」`;
  }, true);

  loadButton?.addEventListener("click", (event) => {
    stopOldHandler(event);
    const name = setSelect.value;
    const lesson = loadBank()[name];
    if (!lesson) return;
    const text = lessonToText(lesson);
    nameInput.value = name;
    folderInput.value = text;
    lessonInput.value = text;
    status.textContent = `已載入「${name}」`;
  }, true);

  deleteButton?.addEventListener("click", (event) => {
    stopOldHandler(event);
    const name = setSelect.value;
    if (!name) return;
    const bank = loadBank();
    delete bank[name];
    saveBank(bank);
    folderInput.value = "";
    renderSets();
    status.textContent = `已刪除「${name}」`;
  }, true);

  renderSets();
})();
