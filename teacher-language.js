(function () {
  const storageKey = "pinyinKitchenStudentLanguage";

  const copy = {
    "zh-Hant": {
      courseSettings: "課程設定",
      groupCount: "組數",
      time: "時間",
      foodDropSeconds: "食材掉落秒數",
      answerScript: "答案字體",
      traditional: "繁體",
      simplified: "簡體",
      traditionalChinese: "繁體中文",
      simplifiedChinese: "簡體中文",
      lessonMaker: "題目製作",
      inputChinese: "輸入中文字",
      lessonMakerPlaceholder: "例如：媽媽喝水",
      generatedScript: "生成題目字體",
      generateItems: "確認生成",
      currentLesson: "目前作答內容",
      lessonHint: "每行格式：中文字,拼音,聲調。例如：媽,ma,1；多字題：可樂,kele,34",
      lessonFolder: "作答內容資料夾",
      folderName: "資料夾名稱",
      folderPlaceholder: "例如：第一課",
      saveWords: "儲存單字",
      load: "載入",
      delete: "刪除",
      savedFolders: "已儲存資料夾",
      wordContent: "單字內容",
      wordPlaceholder: "每行輸入：繁體,簡體,拼音,聲調\n例如：媽,妈,ma,1",
      saveSettings: "儲存設定",
      startGame: "開始遊戲",
      reset: "重設",
      liveClassroom: "Live Classroom",
      groupMonitor: "小組監控",
      waiting: "等待開始",
      running: "進行中",
      points: "分",
      players: "玩家",
      notJoined: "尚未加入",
      left: "左",
      right: "右",
      none: "無",
      noMenu: "無菜單",
      ingredientTable: "食材台",
      pot: "鍋子",
      board: "砧板",
      plate: "盤子",
      empty: "空",
      timeUpReview: "時間到！請老師查看成果"
    },
    "zh-Hans": {
      courseSettings: "课程设置",
      groupCount: "组数",
      time: "时间",
      foodDropSeconds: "食材掉落秒数",
      answerScript: "答案字体",
      traditional: "繁体",
      simplified: "简体",
      traditionalChinese: "繁体中文",
      simplifiedChinese: "简体中文",
      lessonMaker: "题目制作",
      inputChinese: "输入中文",
      lessonMakerPlaceholder: "例如：妈妈喝水",
      generatedScript: "生成题目字体",
      generateItems: "确认生成",
      currentLesson: "目前作答内容",
      lessonHint: "每行格式：中文字,拼音,声调。例如：妈,ma,1；多字题：可乐,kele,34",
      lessonFolder: "作答内容资料夹",
      folderName: "资料夹名称",
      folderPlaceholder: "例如：第一课",
      saveWords: "储存单字",
      load: "载入",
      delete: "删除",
      savedFolders: "已储存资料夹",
      wordContent: "单字内容",
      wordPlaceholder: "每行输入：繁体,简体,拼音,声调\n例如：媽,妈,ma,1",
      saveSettings: "储存设置",
      startGame: "开始游戏",
      reset: "重设",
      liveClassroom: "Live Classroom",
      groupMonitor: "小组监控",
      waiting: "等待开始",
      running: "进行中",
      points: "分",
      players: "玩家",
      notJoined: "尚未加入",
      left: "左",
      right: "右",
      none: "无",
      noMenu: "无菜单",
      ingredientTable: "食材台",
      pot: "锅子",
      board: "砧板",
      plate: "盘子",
      empty: "空",
      timeUpReview: "时间到！请老师查看成果"
    },
    en: {
      courseSettings: "Course Settings",
      groupCount: "Groups",
      time: "Time",
      foodDropSeconds: "Ingredient Drop Seconds",
      answerScript: "Answer Script",
      traditional: "Traditional",
      simplified: "Simplified",
      traditionalChinese: "Traditional Chinese",
      simplifiedChinese: "Simplified Chinese",
      lessonMaker: "Question Maker",
      inputChinese: "Enter Chinese Text",
      lessonMakerPlaceholder: "Example: 媽媽喝水",
      generatedScript: "Generated Question Script",
      generateItems: "Generate",
      currentLesson: "Current Answer Content",
      lessonHint: "Format each line: Chinese,Pinyin,Tone. Example: 媽,ma,1; phrase: 可樂,kele,34",
      lessonFolder: "Answer Content Folders",
      folderName: "Folder Name",
      folderPlaceholder: "Example: Lesson 1",
      saveWords: "Save Words",
      load: "Load",
      delete: "Delete",
      savedFolders: "Saved Folders",
      wordContent: "Word Content",
      wordPlaceholder: "Enter one line each: Traditional,Simplified,Pinyin,Tone\nExample: 媽,妈,ma,1",
      saveSettings: "Save Settings",
      startGame: "Start Game",
      reset: "Reset",
      liveClassroom: "Live Classroom",
      groupMonitor: "Group Monitor",
      waiting: "Waiting",
      running: "In Progress",
      points: "pts",
      players: "Players",
      notJoined: "Not joined",
      left: "Left",
      right: "Right",
      none: "None",
      noMenu: "No menu",
      ingredientTable: "Ingredient Table",
      pot: "Pot",
      board: "Cutting Board",
      plate: "Plate",
      empty: "Empty",
      timeUpReview: "Time is up! Please review the results."
    },
    ja: {
      courseSettings: "授業設定",
      groupCount: "グループ数",
      time: "時間",
      foodDropSeconds: "食材落下秒数",
      answerScript: "解答の字体",
      traditional: "繁体字",
      simplified: "簡体字",
      traditionalChinese: "繁体字中国語",
      simplifiedChinese: "簡体字中国語",
      lessonMaker: "問題作成",
      inputChinese: "中国語を入力",
      lessonMakerPlaceholder: "例：媽媽喝水",
      generatedScript: "生成する問題の字体",
      generateItems: "生成を確認",
      currentLesson: "現在の解答内容",
      lessonHint: "各行の形式：中国語,ピンイン,声調。例：媽,ma,1；複数文字：可樂,kele,34",
      lessonFolder: "解答内容フォルダー",
      folderName: "フォルダー名",
      folderPlaceholder: "例：第1課",
      saveWords: "単語を保存",
      load: "読み込み",
      delete: "削除",
      savedFolders: "保存済みフォルダー",
      wordContent: "単語内容",
      wordPlaceholder: "1行ずつ入力：繁体字,簡体字,ピンイン,声調\n例：媽,妈,ma,1",
      saveSettings: "設定を保存",
      startGame: "ゲーム開始",
      reset: "リセット",
      liveClassroom: "Live Classroom",
      groupMonitor: "グループ監視",
      waiting: "開始待ち",
      running: "進行中",
      points: "点",
      players: "プレイヤー",
      notJoined: "未参加",
      left: "左",
      right: "右",
      none: "なし",
      noMenu: "メニューなし",
      ingredientTable: "食材テーブル",
      pot: "鍋",
      board: "まな板",
      plate: "皿",
      empty: "空",
      timeUpReview: "時間です！先生は結果を確認してください"
    },
    vi: {
      courseSettings: "Cài đặt bài học",
      groupCount: "Số nhóm",
      time: "Thời gian",
      foodDropSeconds: "Giây rơi nguyên liệu",
      answerScript: "Kiểu chữ đáp án",
      traditional: "Phồn thể",
      simplified: "Giản thể",
      traditionalChinese: "Tiếng Trung phồn thể",
      simplifiedChinese: "Tiếng Trung giản thể",
      lessonMaker: "Tạo câu hỏi",
      inputChinese: "Nhập chữ Trung",
      lessonMakerPlaceholder: "Ví dụ: 媽媽喝水",
      generatedScript: "Kiểu chữ câu hỏi",
      generateItems: "Xác nhận tạo",
      currentLesson: "Nội dung trả lời hiện tại",
      lessonHint: "Mỗi dòng: Chữ Trung,Pinyin,Thanh điệu. Ví dụ: 媽,ma,1; nhiều chữ: 可樂,kele,34",
      lessonFolder: "Thư mục nội dung trả lời",
      folderName: "Tên thư mục",
      folderPlaceholder: "Ví dụ: Bài 1",
      saveWords: "Lưu từ",
      load: "Tải",
      delete: "Xóa",
      savedFolders: "Thư mục đã lưu",
      wordContent: "Nội dung từ",
      wordPlaceholder: "Nhập từng dòng: Phồn thể,Giản thể,Pinyin,Thanh điệu\nVí dụ: 媽,妈,ma,1",
      saveSettings: "Lưu cài đặt",
      startGame: "Bắt đầu trò chơi",
      reset: "Đặt lại",
      liveClassroom: "Live Classroom",
      groupMonitor: "Theo dõi nhóm",
      waiting: "Đang chờ",
      running: "Đang diễn ra",
      points: "điểm",
      players: "Người chơi",
      notJoined: "Chưa tham gia",
      left: "Trái",
      right: "Phải",
      none: "Không có",
      noMenu: "Không có thực đơn",
      ingredientTable: "Bàn nguyên liệu",
      pot: "Nồi",
      board: "Thớt",
      plate: "Đĩa",
      empty: "Trống",
      timeUpReview: "Hết giờ! Giáo viên hãy xem kết quả."
    }
  };

  const selectors = [
    ["#teacherView aside.panel > .section-title", "courseSettings"],
    ["label[for='groupCount']", "groupCount"],
    ["label[for='roundMinutes']", "time"],
    ["label[for='foodDropSeconds']", "foodDropSeconds"],
    ["label[for='answerScript']", "answerScript"],
    ["#answerScript option[value='traditional']", "traditional"],
    ["#answerScript option[value='simplified']", "simplified"],
    [".lesson-maker > .section-title", "lessonMaker"],
    ["label[for='lessonMakerText']", "inputChinese"],
    ["label[for='lessonMakerScript']", "generatedScript"],
    ["#lessonMakerScript option[value='traditional']", "traditionalChinese"],
    ["#lessonMakerScript option[value='simplified']", "simplifiedChinese"],
    ["#generateLessonItems", "generateItems"],
    ["label[for='lessonInput']", "currentLesson"],
    [".current-lesson-box > .hint", "lessonHint"],
    [".lesson-folder > .section-title", "lessonFolder"],
    ["label[for='lessonSetName']", "folderName"],
    ["#saveLessonSet", "saveWords"],
    ["#loadLessonSet", "load"],
    ["#deleteLessonSet", "delete"],
    ["label[for='lessonSetSelect']", "savedFolders"],
    ["label[for='folderLessonInput']", "wordContent"],
    ["#saveLesson", "saveSettings"],
    ["#startRound", "startGame"],
    ["#resetRound", "reset"],
    [".monitor-head .eyebrow", "liveClassroom"],
    [".monitor-head h2", "groupMonitor"]
  ];

  let applying = false;

  function getLanguage() {
    const saved = localStorage.getItem(storageKey);
    return copy[saved] ? saved : "zh-Hant";
  }

  function setText(element, text) {
    if (element && element.textContent !== text) {
      element.textContent = text;
    }
  }

  function translateTeacherStatus(langCopy) {
    const status = document.querySelector("#teacherStatus");
    if (!status) return;
    const text = status.textContent.trim();
    const time = text.match(/\d{1,2}:\d{2}/)?.[0];
    setText(status, time ? `${langCopy.running} ${time}` : langCopy.waiting);
  }

  function translateMonitorCards(langCopy) {
    document.querySelectorAll(".monitor-card").forEach((card) => {
      const score = card.querySelector("header strong");
      if (score) {
        const value = score.textContent.match(/\d+/)?.[0] || "0";
        setText(score, `${value} ${langCopy.points}`);
      }

      const playerLine = card.querySelector("header + p");
      if (playerLine) {
        const content = playerLine.textContent.replace(/^.*?[：:]\s*/, "").trim();
        setText(playerLine, `${langCopy.players}: ${translateToolText(content || langCopy.notJoined, langCopy)}`);
      }

      const logLine = card.querySelector("header + p + p");
      if (logLine) {
        const text = logLine.textContent.trim();
        if (/時間到|时间到|Time is up|時間です|Hết giờ/u.test(text)) {
          setText(logLine, langCopy.timeUpReview);
        } else {
          setText(logLine, translateToolText(text, langCopy));
        }
      }

      card.querySelectorAll(".monitor-pile strong, .mini-station strong").forEach((title) => {
        const text = title.textContent.trim();
        if (/食材台|Ingredient Table|Bàn nguyên liệu/u.test(text)) setText(title, langCopy.ingredientTable);
        if (/鍋|锅|Pot|Nồi/.test(text)) setText(title, langCopy.pot);
        if (/砧|Cutting|まな板|Thớt/.test(text)) setText(title, langCopy.board);
        if (/盤|盘|Plate|皿|Đĩa/.test(text)) setText(title, langCopy.plate);
      });

      card.querySelectorAll(".student-screen header span").forEach((toolLine) => {
        setText(toolLine, translateToolText(toolLine.textContent, langCopy));
      });

      card.querySelectorAll(".student-screen-neighbors span").forEach((neighbor) => {
        const text = neighbor.textContent.trim();
        const value = text.replace(/^.*?[：:]\s*/, "").trim();
        if (/^左|^Left|^Trái/u.test(text)) setText(neighbor, `${langCopy.left}: ${translateNone(value, langCopy)}`);
        if (/^右|^Right|^Phải/u.test(text)) setText(neighbor, `${langCopy.right}: ${translateNone(value, langCopy)}`);
      });

      card.querySelectorAll(".student-screen-orders > span").forEach((order) => {
        if (/無菜單|无菜单|No menu|メニューなし|Không có thực đơn/u.test(order.textContent.trim())) {
          setText(order, langCopy.noMenu);
        }
      });

      card.querySelectorAll(".mini-empty").forEach((empty) => setText(empty, langCopy.empty));
    });
  }

  function translateNone(value, langCopy) {
    return /^(無|无|None|なし|Không có)$/u.test(value) ? langCopy.none : value;
  }

  function translateToolText(text, langCopy) {
    return String(text)
      .replace(/食材台|Ingredient Table|Bàn nguyên liệu/gu, langCopy.ingredientTable)
      .replace(/鍋子|锅子|Pot|Nồi/gu, langCopy.pot)
      .replace(/砧板|Cutting Board|まな板|Thớt/gu, langCopy.board)
      .replace(/盤子|盘子|Plate|皿|Đĩa/gu, langCopy.plate);
  }

  function applyTeacherLanguage() {
    if (applying) return;
    applying = true;

    const langCopy = copy[getLanguage()];
    selectors.forEach(([selector, key]) => {
      document.querySelectorAll(selector).forEach((element) => setText(element, langCopy[key]));
    });

    const lessonSetName = document.querySelector("#lessonSetName");
    if (lessonSetName) lessonSetName.placeholder = langCopy.folderPlaceholder;

    const lessonMakerText = document.querySelector("#lessonMakerText");
    if (lessonMakerText) lessonMakerText.placeholder = langCopy.lessonMakerPlaceholder;

    const folderLessonInput = document.querySelector("#folderLessonInput");
    if (folderLessonInput) folderLessonInput.placeholder = langCopy.wordPlaceholder;

    const lessonSetSelect = document.querySelector("#lessonSetSelect");
    if (lessonSetSelect) lessonSetSelect.setAttribute("aria-label", langCopy.savedFolders);

    translateTeacherStatus(langCopy);
    translateMonitorCards(langCopy);
    applying = false;
  }

  function scheduleApply() {
    if (applying) return;
    window.requestAnimationFrame(applyTeacherLanguage);
  }

  document.addEventListener("change", (event) => {
    if (event.target?.classList?.contains("student-language-select")) {
      scheduleApply();
    }
  });

  const teacherView = document.querySelector("#teacherView");
  if (teacherView) {
    new MutationObserver(scheduleApply).observe(teacherView, {
      childList: true,
      characterData: true,
      subtree: true
    });
  }

  applyTeacherLanguage();
})();
