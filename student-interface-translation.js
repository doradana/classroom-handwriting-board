(function () {
  const storageKey = "pinyinKitchenStudentLanguage";

  const text = {
    "zh-Hant": {
      appTitle: "拼音廚房",
      login: "登入",
      student: "學生",
      teacher: "老師",
      language: "語言",
      teacherLogin: "老師登入",
      studentJoin: "學生加入",
      account: "帳號",
      password: "密碼",
      name: "名字",
      roomPassword: "房間密碼",
      enterTeacher: "進入老師頁面",
      joinGame: "加入遊戲",
      tutorialReplay: "遊戲玩法",
      forgotPassword: "忘記密碼",
      teacherAccountPlaceholder: "輸入老師帳號",
      teacherPasswordPlaceholder: "輸入老師密碼",
      createRoomPasswordPlaceholder: "建立學生加入用的房間密碼",
      roomPasswordPlaceholder: "輸入老師設定的密碼",
      menu: "今日菜單",
      tray: "食材台",
      done: "完成",
      waitingServe: "待上菜",
      completed: "完成",
      time: "時間",
      player: "玩家",
      group: "組別",
      assignedTool: "系統分配廚具",
      notJoined: "尚未加入",
      pot: "鍋子",
      board: "砧板",
      plate: "盤子",
      cookware: "廚具",
      myTool: "我的廚具",
      myPlate: "我的盤子",
      solo: "單機模式",
      online: "多人同步中",
      offline: "本機同步未連線",
      teamTitle: "隊友位置",
      left: "左邊",
      right: "右邊",
      noTeammate: "尚未有隊友",
      joinTeamHint: "加入同一組後，這裡會顯示左右邊的玩家",
      swipeLeft: "左滑傳給他",
      swipeRight: "右滑傳給他",
      runningBanner: "你的主要廚具是{tool}，你也有盤子；食材左右滑出畫面可傳給組員",
      waitingBanner: "你的主要廚具是{tool}，你也有盤子；老師開始後就能傳食材",
      runningCountdown: "你的主要廚具是{tool}，你也有盤子；左右滑出畫面可傳食材，剩下 {time}",
      noReceiver: "目前沒有其他組員可以接食材",
      tableLog: "{item} 放在食材台",
      passLog: "{player} 把 {item} {direction}傳給 {recipient}",
      leftSwipe: "左滑",
      rightSwipe: "右滑",
      cannotUse: "你目前有{tool}和盤子，不能使用{target}",
      plateOnlyHanzi: "盤子只能上中文字",
      newFood: "新食材掉到食材台了",
      completedMenu: "{player} 完成整張菜單！老師又送來新菜單",
      timeout: "時間到！請老師查看成果",
      joined: "{player} 加入 {group}，系統分配{tool}，每人都有盤子"
    },
    "zh-Hans": {
      appTitle: "拼音厨房",
      login: "登录",
      student: "学生",
      teacher: "老师",
      language: "语言",
      teacherLogin: "老师登录",
      studentJoin: "学生加入",
      account: "账号",
      password: "密码",
      name: "名字",
      roomPassword: "房间密码",
      enterTeacher: "进入老师页面",
      joinGame: "加入游戏",
      tutorialReplay: "游戏玩法",
      forgotPassword: "忘记密码",
      teacherAccountPlaceholder: "输入老师账号",
      teacherPasswordPlaceholder: "输入老师密码",
      createRoomPasswordPlaceholder: "建立学生加入用的房间密码",
      roomPasswordPlaceholder: "输入老师设置的密码",
      menu: "今日菜单",
      tray: "食材台",
      done: "完成",
      waitingServe: "待上菜",
      completed: "完成",
      time: "时间",
      player: "玩家",
      group: "组别",
      assignedTool: "系统分配厨具",
      notJoined: "尚未加入",
      pot: "锅子",
      board: "砧板",
      plate: "盘子",
      cookware: "厨具",
      myTool: "我的厨具",
      myPlate: "我的盘子",
      solo: "单机模式",
      online: "多人同步中",
      offline: "本机同步未连接",
      teamTitle: "队友位置",
      left: "左边",
      right: "右边",
      noTeammate: "尚未有队友",
      joinTeamHint: "加入同一组后，这里会显示左右边的玩家",
      swipeLeft: "左滑传给他",
      swipeRight: "右滑传给他",
      runningBanner: "你的主要厨具是{tool}，你也有盘子；食材左右滑出画面可传给组员",
      waitingBanner: "你的主要厨具是{tool}，你也有盘子；老师开始后就能传食材",
      runningCountdown: "你的主要厨具是{tool}，你也有盘子；左右滑出画面可传食材，剩下 {time}",
      noReceiver: "目前没有其他组员可以接食材",
      tableLog: "{item} 放在食材台",
      passLog: "{player} 把 {item} {direction}传给 {recipient}",
      leftSwipe: "左滑",
      rightSwipe: "右滑",
      cannotUse: "你目前有{tool}和盘子，不能使用{target}",
      plateOnlyHanzi: "盘子只能上中文字",
      newFood: "新食材掉到食材台了",
      completedMenu: "{player} 完成整张菜单！老师又送来新菜单",
      timeout: "时间到！请老师查看成果",
      joined: "{player} 加入 {group}，系统分配{tool}，每人都有盘子"
    },
    en: {
      appTitle: "Pinyin Kitchen",
      login: "Login",
      student: "Student",
      teacher: "Teacher",
      language: "Language",
      teacherLogin: "Teacher Login",
      studentJoin: "Student Join",
      account: "Account",
      password: "Password",
      name: "Name",
      roomPassword: "Room Password",
      enterTeacher: "Enter Teacher Page",
      joinGame: "Join Game",
      tutorialReplay: "How to Play",
      forgotPassword: "Forgot Password",
      teacherAccountPlaceholder: "Enter teacher account",
      teacherPasswordPlaceholder: "Enter teacher password",
      createRoomPasswordPlaceholder: "Create a room password for students",
      roomPasswordPlaceholder: "Enter the teacher's room password",
      menu: "Today's Menu",
      tray: "Ingredient Table",
      done: "Done",
      waitingServe: "To serve",
      completed: "Done",
      time: "Time",
      player: "Player",
      group: "Group",
      assignedTool: "Assigned Tool",
      notJoined: "Not joined",
      pot: "Pot",
      board: "Cutting Board",
      plate: "Plate",
      cookware: "Tool",
      myTool: "My Tool",
      myPlate: "My Plate",
      solo: "Solo Mode",
      online: "Multiplayer Sync",
      offline: "Local sync offline",
      teamTitle: "Teammates",
      left: "Left",
      right: "Right",
      noTeammate: "No teammate yet",
      joinTeamHint: "After joining a group, left and right players appear here",
      swipeLeft: "Swipe left to pass",
      swipeRight: "Swipe right to pass",
      runningBanner: "Your main tool is {tool}; you also have a plate. Swipe ingredients left or right to pass them.",
      waitingBanner: "Your main tool is {tool}; you also have a plate. You can pass ingredients after the teacher starts.",
      runningCountdown: "Your main tool is {tool}; swipe ingredients left or right to pass them. Time left: {time}",
      noReceiver: "No teammate can receive ingredients right now",
      tableLog: "{item} is back on the ingredient table",
      passLog: "{player} passed {item} to {recipient} by swiping {direction}",
      leftSwipe: "left",
      rightSwipe: "right",
      cannotUse: "You have {tool} and a plate, so you cannot use {target}",
      plateOnlyHanzi: "Only Chinese characters can be served on the plate",
      newFood: "New ingredients dropped onto the table",
      completedMenu: "{player} completed the whole menu! The teacher sent a new menu",
      timeout: "Time is up! Ask the teacher to check the result",
      joined: "{player} joined {group}. Assigned tool: {tool}. Everyone has a plate."
    },
    ja: {
      appTitle: "ピンインキッチン",
      login: "ログイン",
      student: "学生",
      teacher: "先生",
      language: "言語",
      teacherLogin: "先生ログイン",
      studentJoin: "学生参加",
      account: "アカウント",
      password: "パスワード",
      name: "名前",
      roomPassword: "ルームパスワード",
      enterTeacher: "先生ページへ",
      joinGame: "ゲームに参加",
      tutorialReplay: "遊び方",
      forgotPassword: "パスワードを忘れた",
      teacherAccountPlaceholder: "先生アカウントを入力",
      teacherPasswordPlaceholder: "先生パスワードを入力",
      createRoomPasswordPlaceholder: "学生参加用のルームパスワードを作成",
      roomPasswordPlaceholder: "先生が設定したパスワードを入力",
      menu: "今日のメニュー",
      tray: "食材台",
      done: "完成",
      waitingServe: "提供待ち",
      completed: "完成",
      time: "時間",
      player: "プレイヤー",
      group: "グループ",
      assignedTool: "割り当て調理器具",
      notJoined: "未参加",
      pot: "鍋",
      board: "まな板",
      plate: "皿",
      cookware: "調理器具",
      myTool: "自分の調理器具",
      myPlate: "自分の皿",
      solo: "一人モード",
      online: "マルチ同期中",
      offline: "ローカル同期未接続",
      teamTitle: "チームメイト位置",
      left: "左",
      right: "右",
      noTeammate: "まだチームメイトがいません",
      joinTeamHint: "同じグループに入ると、左右のプレイヤーが表示されます",
      swipeLeft: "左へスワイプして渡す",
      swipeRight: "右へスワイプして渡す",
      runningBanner: "主な調理器具は{tool}です。皿もあります。食材を左右にスワイプすると渡せます。",
      waitingBanner: "主な調理器具は{tool}です。皿もあります。先生が開始すると食材を渡せます。",
      runningCountdown: "主な調理器具は{tool}です。左右にスワイプして食材を渡せます。残り {time}",
      noReceiver: "今は食材を受け取れるチームメイトがいません",
      tableLog: "{item} を食材台に戻しました",
      passLog: "{player} が {item} を{direction}スワイプで {recipient} に渡しました",
      leftSwipe: "左",
      rightSwipe: "右",
      cannotUse: "あなたは{tool}と皿を持っているので、{target}は使えません",
      plateOnlyHanzi: "皿には漢字だけを置けます",
      newFood: "新しい食材が食材台に落ちました",
      completedMenu: "{player} がメニューをすべて完成しました！先生が新しいメニューを送りました",
      timeout: "時間です！先生に結果を確認してもらいましょう",
      joined: "{player} が {group} に参加しました。割り当て調理器具：{tool}。全員に皿があります。"
    },
    vi: {
      appTitle: "Bếp Pinyin",
      login: "Đăng nhập",
      student: "Học sinh",
      teacher: "Giáo viên",
      language: "Ngôn ngữ",
      teacherLogin: "Giáo viên đăng nhập",
      studentJoin: "Học sinh tham gia",
      account: "Tài khoản",
      password: "Mật khẩu",
      name: "Tên",
      roomPassword: "Mật khẩu phòng",
      enterTeacher: "Vào trang giáo viên",
      joinGame: "Vào trò chơi",
      tutorialReplay: "Cách chơi",
      forgotPassword: "Quên mật khẩu",
      teacherAccountPlaceholder: "Nhập tài khoản giáo viên",
      teacherPasswordPlaceholder: "Nhập mật khẩu giáo viên",
      createRoomPasswordPlaceholder: "Tạo mật khẩu phòng cho học sinh",
      roomPasswordPlaceholder: "Nhập mật khẩu do giáo viên đặt",
      menu: "Thực đơn hôm nay",
      tray: "Bàn nguyên liệu",
      done: "Hoàn thành",
      waitingServe: "Chờ phục vụ",
      completed: "Hoàn thành",
      time: "Thời gian",
      player: "Người chơi",
      group: "Nhóm",
      assignedTool: "Dụng cụ được giao",
      notJoined: "Chưa tham gia",
      pot: "Nồi",
      board: "Thớt",
      plate: "Đĩa",
      cookware: "Dụng cụ",
      myTool: "Dụng cụ của tôi",
      myPlate: "Đĩa của tôi",
      solo: "Chế độ một máy",
      online: "Đồng bộ nhiều người",
      offline: "Đồng bộ cục bộ chưa kết nối",
      teamTitle: "Vị trí đồng đội",
      left: "Bên trái",
      right: "Bên phải",
      noTeammate: "Chưa có đồng đội",
      joinTeamHint: "Sau khi vào cùng nhóm, người chơi bên trái và bên phải sẽ hiện ở đây",
      swipeLeft: "Vuốt trái để chuyền",
      swipeRight: "Vuốt phải để chuyền",
      runningBanner: "Dụng cụ chính của bạn là {tool}; bạn cũng có đĩa. Vuốt nguyên liệu sang trái hoặc phải để chuyền.",
      waitingBanner: "Dụng cụ chính của bạn là {tool}; bạn cũng có đĩa. Khi giáo viên bắt đầu, bạn có thể chuyền nguyên liệu.",
      runningCountdown: "Dụng cụ chính của bạn là {tool}; vuốt trái hoặc phải để chuyền nguyên liệu. Còn lại {time}",
      noReceiver: "Hiện chưa có đồng đội nào có thể nhận nguyên liệu",
      tableLog: "{item} đã được đặt lại lên bàn nguyên liệu",
      passLog: "{player} chuyền {item} cho {recipient} bằng cách vuốt {direction}",
      leftSwipe: "trái",
      rightSwipe: "phải",
      cannotUse: "Bạn có {tool} và đĩa, nên không thể dùng {target}",
      plateOnlyHanzi: "Chỉ chữ Hán mới được đặt lên đĩa",
      newFood: "Nguyên liệu mới đã rơi xuống bàn",
      completedMenu: "{player} đã hoàn thành cả thực đơn! Giáo viên gửi thực đơn mới",
      timeout: "Hết giờ! Hãy nhờ giáo viên kiểm tra kết quả",
      joined: "{player} đã vào {group}. Dụng cụ được giao: {tool}. Mỗi người đều có đĩa."
    }
  };

  let applying = false;

  function lang() {
    const saved = localStorage.getItem(storageKey);
    return text[saved] ? saved : "zh-Hant";
  }

  function t() {
    return text[lang()];
  }

  function setText(selector, value) {
    document.querySelectorAll(selector).forEach((element) => {
      if (!element.closest(".tile") && element.textContent !== value) {
        element.textContent = value;
      }
    });
  }

  function toolKey(value) {
    if (/鍋|锅|Pot|Nồi|鍋/.test(value)) return "pot";
    if (/砧|Cutting|まな板|Thớt/.test(value)) return "board";
    if (/盤|盘|Plate|皿|Đĩa/.test(value)) return "plate";
    return "cookware";
  }

  function currentToolLabel(copy) {
    const key = toolKey(document.querySelector("#assignedToolText")?.textContent || "");
    return copy[key] || copy.cookware;
  }

  function rewriteTemplate(template, values) {
    return Object.entries(values).reduce((output, [key, value]) => {
      return output.replaceAll(`{${key}}`, value);
    }, template);
  }

  function translateStatic(copy) {
    setText("h1", copy.appTitle);
    setText(".tab[data-mode='login']", copy.login);
    setText(".tab[data-mode='student']", copy.student);
    setText(".tab[data-mode='teacher']", copy.teacher);
    setText(".tutorial-replay-btn", copy.tutorialReplay);
    setText(".language-row label", copy.language);
    setText(".teacher-login-card h2", copy.teacherLogin);
    setText(".student-login-card h2", copy.studentJoin);
    setText("label[for='teacherAccount']", copy.account);
    setText("label[for='teacherPassword']", copy.password);
    setText("label[for='roomPassword']", copy.roomPassword);
    setText("label[for='loginStudentName']", copy.name);
    setText("label[for='loginGroupSelect']", copy.group);
    setText("label[for='studentRoomPassword']", copy.roomPassword);
    setText("#teacherLogin", copy.enterTeacher);
    setText("#studentLogin", copy.joinGame);
    setText("#forgotTeacherPassword", copy.forgotPassword);
    setText(".kitchen-orders .section-title", copy.menu);
    setText(".ingredient-zone .section-title", copy.tray);
    setText(".kitchen-score-strip div:nth-child(1) span", copy.completed);
    setText(".kitchen-score-strip div:nth-child(2) span", copy.time);
    setText("label[for='studentName']", copy.player);
    setText("label[for='groupSelect']", copy.group);
    setText(".station-panel .assigned-tool span", copy.assignedTool);
    setText(".pot h2", copy.pot);
    setText(".board h2", copy.board);
    setText(".plate h2", copy.plate);

    const teacherAccount = document.querySelector("#teacherAccount");
    if (teacherAccount) teacherAccount.placeholder = copy.teacherAccountPlaceholder;
    const teacherPassword = document.querySelector("#teacherPassword");
    if (teacherPassword) teacherPassword.placeholder = copy.teacherPasswordPlaceholder;
    const teacherRoomPassword = document.querySelector("#roomPassword");
    if (teacherRoomPassword) teacherRoomPassword.placeholder = copy.createRoomPasswordPlaceholder;
    const roomPassword = document.querySelector("#studentRoomPassword");
    if (roomPassword) roomPassword.placeholder = copy.roomPasswordPlaceholder;

    document.querySelectorAll(".station.owned").forEach((station) => {
      const next = station.classList.contains("plate") ? copy.myPlate : copy.myTool;
      if (station.dataset.uiLabel !== next) station.dataset.uiLabel = next;
    });
  }

  function translateOrders(copy) {
    document.querySelectorAll("#orderList .order strong").forEach((strong) => {
      const raw = strong.textContent.trim();
      const next = /完成|Done|Hoàn/.test(raw) ? copy.done : copy.waitingServe;
      if (strong.textContent !== next) strong.textContent = next;
    });
  }

  function translateStatus(copy) {
    const sync = document.querySelector("#syncStatus");
    if (sync) {
      const raw = sync.textContent.trim();
      const rev = raw.match(/#\d+/)?.[0];
      if (/單機|Solo|一人|một máy/.test(raw)) sync.textContent = copy.solo;
      else if (/未連|offline|chưa kết nối|未接続/.test(raw)) sync.textContent = copy.offline;
      else if (/多人|Sync|同期|Đồng bộ/.test(raw)) sync.textContent = `${copy.online}${rev ? ` ${rev}` : ""}`;
    }

    const assigned = document.querySelector("#assignedToolText");
    if (assigned) {
      const raw = assigned.textContent.trim();
      assigned.textContent = /尚未|Not joined|未参加|Chưa/.test(raw) ? copy.notJoined : currentToolLabel(copy);
    }
  }

  function translateBanner(copy) {
    const banner = document.querySelector("#dropBanner");
    if (!banner) return;
    const raw = banner.textContent.trim();
    const tool = currentToolLabel(copy);
    const time = raw.match(/\d{1,2}:\d{2}/)?.[0];
    if (time) banner.textContent = rewriteTemplate(copy.runningCountdown, { tool, time });
    else if (/開始後|after|bắt đầu|開始/.test(raw)) banner.textContent = rewriteTemplate(copy.waitingBanner, { tool });
    else banner.textContent = rewriteTemplate(copy.runningBanner, { tool });
  }

  function translateTeamMap(copy) {
    const map = document.querySelector("#teamMap");
    if (!map) return;
    const title = map.querySelector(".team-map-title");
    if (title) title.textContent = copy.teamTitle;

    const waiting = map.querySelector(".seat-row.waiting");
    if (waiting) {
      waiting.textContent = copy.joinTeamHint;
      return;
    }

    const rows = map.querySelectorAll(".seat-row");
    rows.forEach((row, index) => {
      const strong = row.querySelector("strong");
      const small = row.querySelector("small");
      const em = row.querySelector("em");
      if (strong) strong.textContent = index === 0 ? copy.left : copy.right;
      if (small && /尚未|No|まだ|Chưa/.test(small.textContent.trim())) small.textContent = copy.noTeammate;
      if (em) em.textContent = index === 0 ? copy.swipeLeft : copy.swipeRight;
    });
  }

  function translateLogText(raw, copy) {
    const itemToTable = raw.match(/^(.+)\s+放在食材台$/);
    if (itemToTable) return rewriteTemplate(copy.tableLog, { item: itemToTable[1] });

    const passed = raw.match(/^(.+)\s+把\s+(.+)\s+(左滑|右滑)傳給\s+(.+)$/);
    if (passed) {
      return rewriteTemplate(copy.passLog, {
        player: passed[1],
        item: passed[2],
        direction: passed[3] === "左滑" ? copy.leftSwipe : copy.rightSwipe,
        recipient: passed[4]
      });
    }

    const cannotUse = raw.match(/^你目前有(.+)和盤子，不能使用(.+)$/);
    if (cannotUse) {
      return rewriteTemplate(copy.cannotUse, {
        tool: copy[toolKey(cannotUse[1])] || cannotUse[1],
        target: copy[toolKey(cannotUse[2])] || cannotUse[2]
      });
    }

    const completed = raw.match(/^(.+)\s+完成整張菜單/);
    if (completed) return rewriteTemplate(copy.completedMenu, { player: completed[1] });

    const joined = raw.match(/^(.+)\s+加入\s+(.+)，系統分配(.+)，每人都有盤子$/);
    if (joined) {
      return rewriteTemplate(copy.joined, {
        player: joined[1],
        group: joined[2],
        tool: copy[toolKey(joined[3])] || joined[3]
      });
    }

    if (/沒有其他組員/.test(raw)) return copy.noReceiver;
    if (/盤子只能上中文字/.test(raw)) return copy.plateOnlyHanzi;
    if (/新食材掉到食材台/.test(raw)) return copy.newFood;
    if (/時間到/.test(raw)) return copy.timeout;
    return raw;
  }

  function translateLogs(copy) {
    ["#eventLog", "#joinToast"].forEach((selector) => {
      const element = document.querySelector(selector);
      if (!element) return;
      const translated = translateLogText(element.textContent.trim(), copy);
      if (translated && translated !== element.textContent) element.textContent = translated;
    });
  }

  function apply() {
    if (applying) return;
    applying = true;
    const copy = t();
    document.documentElement.lang = lang();
    translateStatic(copy);
    translateOrders(copy);
    translateStatus(copy);
    translateBanner(copy);
    translateTeamMap(copy);
    translateLogs(copy);
    applying = false;
  }

  function schedule() {
    if (!applying) requestAnimationFrame(apply);
  }

  document.addEventListener("change", (event) => {
    if (event.target?.classList?.contains("student-language-select")) schedule();
  });

  const studentView = document.querySelector("#studentView");
  if (studentView) {
    new MutationObserver(schedule).observe(studentView, {
      childList: true,
      characterData: true,
      attributes: true,
      subtree: true
    });
  }

  apply();
})();
