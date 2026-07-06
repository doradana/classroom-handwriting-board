(function () {
  const storageKey = "pinyinKitchenStudentLanguage";

  const languages = [
    ["zh-Hant", "繁體中文"],
    ["zh-Hans", "简体中文"],
    ["en", "English"],
    ["ja", "日本語"],
    ["vi", "Tiếng Việt"]
  ];

  const copy = {
    "zh-Hant": {
      appTitle: "拼音廚房",
      login: "登入",
      student: "學生",
      teacher: "老師",
      studentEyebrow: "Student",
      studentJoin: "學生加入",
      language: "語言",
      name: "名字",
      group: "組別",
      roomPassword: "房間密碼",
      roomPasswordPlaceholder: "輸入老師設定的密碼",
      joinGame: "加入遊戲",
      tutorialReplay: "遊戲玩法",
      player: "玩家",
      assignedTool: "系統分配廚具",
      notJoined: "尚未加入",
      pot: "鍋子",
      board: "砧板",
      solo: "單機模式",
      online: "多人同步中",
      offline: "本機同步未連線",
      menu: "今日菜單",
      tray: "食材台",
      completed: "完成",
      time: "時間"
    },
    "zh-Hans": {
      appTitle: "拼音厨房",
      login: "登录",
      student: "学生",
      teacher: "老师",
      studentEyebrow: "Student",
      studentJoin: "学生加入",
      language: "语言",
      name: "名字",
      group: "组别",
      roomPassword: "房间密码",
      roomPasswordPlaceholder: "输入老师设置的密码",
      joinGame: "加入游戏",
      tutorialReplay: "游戏玩法",
      player: "玩家",
      assignedTool: "系统分配厨具",
      notJoined: "尚未加入",
      pot: "锅子",
      board: "砧板",
      solo: "单机模式",
      online: "多人同步中",
      offline: "本机同步未连接",
      menu: "今日菜单",
      tray: "食材台",
      completed: "完成",
      time: "时间"
    },
    en: {
      appTitle: "Pinyin Kitchen",
      login: "Login",
      student: "Student",
      teacher: "Teacher",
      studentEyebrow: "Student",
      studentJoin: "Student Join",
      language: "Language",
      name: "Name",
      group: "Group",
      roomPassword: "Room Password",
      roomPasswordPlaceholder: "Enter the teacher's room password",
      joinGame: "Join Game",
      tutorialReplay: "How to Play",
      player: "Player",
      assignedTool: "Assigned Tool",
      notJoined: "Not joined",
      pot: "Pot",
      board: "Cutting Board",
      solo: "Solo Mode",
      online: "Multiplayer Sync",
      offline: "Local sync offline",
      menu: "Today's Menu",
      tray: "Ingredient Table",
      completed: "Done",
      time: "Time"
    },
    ja: {
      appTitle: "ピンインキッチン",
      login: "ログイン",
      student: "学生",
      teacher: "先生",
      studentEyebrow: "Student",
      studentJoin: "学生参加",
      language: "言語",
      name: "名前",
      group: "グループ",
      roomPassword: "ルームパスワード",
      roomPasswordPlaceholder: "先生が設定したパスワードを入力",
      joinGame: "ゲームに参加",
      tutorialReplay: "遊び方",
      player: "プレイヤー",
      assignedTool: "割り当て調理器具",
      notJoined: "未参加",
      pot: "鍋",
      board: "まな板",
      solo: "一人モード",
      online: "マルチ同期中",
      offline: "ローカル同期未接続",
      menu: "今日のメニュー",
      tray: "食材台",
      completed: "完成",
      time: "時間"
    },
    vi: {
      appTitle: "Bếp Pinyin",
      login: "Đăng nhập",
      student: "Học sinh",
      teacher: "Giáo viên",
      studentEyebrow: "Student",
      studentJoin: "Học sinh tham gia",
      language: "Ngôn ngữ",
      name: "Tên",
      group: "Nhóm",
      roomPassword: "Mật khẩu phòng",
      roomPasswordPlaceholder: "Nhập mật khẩu do giáo viên đặt",
      joinGame: "Vào trò chơi",
      tutorialReplay: "Cách chơi",
      player: "Người chơi",
      assignedTool: "Dụng cụ được giao",
      notJoined: "Chưa tham gia",
      pot: "Nồi",
      board: "Thớt",
      solo: "Chế độ một máy",
      online: "Đang đồng bộ nhiều người",
      offline: "Đồng bộ cục bộ chưa kết nối",
      menu: "Thực đơn hôm nay",
      tray: "Bàn nguyên liệu",
      completed: "Hoàn thành",
      time: "Thời gian"
    }
  };

  const selectors = [
    ["h1", "appTitle"],
    [".tab[data-mode='login']", "login"],
    [".tab[data-mode='student']", "student"],
    [".tab[data-mode='teacher']", "teacher"],
    [".student-login-card .eyebrow", "studentEyebrow"],
    [".student-login-card h2", "studentJoin"],
    ["label[for='loginStudentName']", "name"],
    ["label[for='loginGroupSelect']", "group"],
    ["label[for='studentRoomPassword']", "roomPassword"],
    ["#studentLogin", "joinGame"],
    ["label[for='studentName']", "player"],
    ["label[for='groupSelect']", "group"],
    [".station-panel .assigned-tool span", "assignedTool"],
    ["#joinGroup", "joinGame"],
    [".kitchen-orders .section-title", "menu"],
    [".ingredient-zone .section-title", "tray"],
    [".kitchen-score-strip div:nth-child(1) span", "completed"],
    [".kitchen-score-strip div:nth-child(2) span", "time"]
  ];

  const dynamicMap = {
    "單機模式": "solo",
    "多人同步中": "online",
    "本機同步未連線": "offline",
    "尚未加入": "notJoined",
    "鍋子": "pot",
    "砧板": "board"
  };

  let applying = false;

  function getLanguage() {
    const saved = localStorage.getItem(storageKey);
    return copy[saved] ? saved : "zh-Hant";
  }

  function createControl(id) {
    const row = document.createElement("div");
    row.className = "field-row language-row";

    const label = document.createElement("label");
    label.setAttribute("for", id);

    const select = document.createElement("select");
    select.id = id;
    select.className = "student-language-select";
    languages.forEach(([value, text]) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = text;
      select.append(option);
    });

    row.append(label, select);
    return row;
  }

  function installControls() {
    document.querySelector("#panelStudentLanguage")?.closest(".language-row")?.remove();

    const topbar = document.querySelector(".topbar");
    if (topbar && !document.querySelector("#topbarStudentLanguage")) {
      const topbarControl = createControl("topbarStudentLanguage");
      topbarControl.classList.add("topbar-language");
      const replayButton = document.createElement("button");
      replayButton.type = "button";
      replayButton.className = "tutorial-replay-btn";
      topbarControl.append(replayButton);
      topbar.append(topbarControl);
    }

    document.querySelectorAll(".student-language-select").forEach((select) => {
      select.value = getLanguage();
      const traditionalOption = select.querySelector('option[value="zh-Hant"]');
      if (traditionalOption) traditionalOption.textContent = "繁體中文";
      select.addEventListener("change", () => {
        localStorage.setItem(storageKey, select.value);
        applyLanguage();
      });
    });
  }

  function translateDynamicText(element, langCopy) {
    if (!element) return;
    const text = element.textContent.trim();
    const syncMatch = text.match(/#\d+$/);

    Object.entries(dynamicMap).some(([source, key]) => {
      if (text === source || text.startsWith(`${source} #`)) {
        setText(element, `${langCopy[key]}${syncMatch ? ` ${syncMatch[0]}` : ""}`);
        return true;
      }
      return false;
    });
  }

  function setText(element, text) {
    if (element && element.textContent !== text) {
      element.textContent = text;
    }
  }

  function applyLanguage() {
    if (applying) return;
    applying = true;

    const lang = getLanguage();
    const langCopy = copy[lang];
    document.documentElement.lang = lang;

    document.querySelectorAll(".student-language-select").forEach((select) => {
      const traditionalOption = select.querySelector('option[value="zh-Hant"]');
      if (traditionalOption) traditionalOption.textContent = "繁體中文";
      select.value = lang;
    });

    selectors.forEach(([selector, key]) => {
      document.querySelectorAll(selector).forEach((element) => {
        setText(element, langCopy[key]);
      });
    });

    document.querySelectorAll(".tutorial-replay-btn").forEach((button) => {
      setText(button, langCopy.tutorialReplay);
    });

    document.querySelectorAll(".language-row label").forEach((label) => {
      setText(label, langCopy.language);
    });

    const roomPassword = document.querySelector("#studentRoomPassword");
    if (roomPassword) roomPassword.placeholder = langCopy.roomPasswordPlaceholder;

    translateDynamicText(document.querySelector("#syncStatus"), langCopy);
    translateDynamicText(document.querySelector("#assignedToolText"), langCopy);

    applying = false;
  }

  function scheduleApply() {
    if (applying) return;
    window.requestAnimationFrame(applyLanguage);
  }

  installControls();
  applyLanguage();

  const studentView = document.querySelector("#studentView");
  if (studentView) {
    new MutationObserver(scheduleApply).observe(studentView, {
      childList: true,
      characterData: true,
      subtree: true
    });
  }
})();
