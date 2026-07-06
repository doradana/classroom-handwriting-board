(function () {
  const storageKey = "pinyinKitchenStudentLanguage";
  const studentView = document.querySelector("#studentView");
  const studentLogin = document.querySelector("#studentLogin");
  const tutorial = document.querySelector("#studentTutorial");
  const title = document.querySelector("#tutorialTitle");
  const progress = document.querySelector("#tutorialProgress");
  const dots = document.querySelector("#tutorialDots");
  const visual = document.querySelector("#tutorialVisual");
  const stepTitle = document.querySelector("#tutorialStepTitle");
  const stepText = document.querySelector("#tutorialStepText");
  const backButton = document.querySelector("#tutorialBack");
  const nextButton = document.querySelector("#tutorialNext");
  const doorTitle = document.querySelector("#doorTitle");
  const doorText = document.querySelector("#doorText");

  if (!studentView || !tutorial || !studentLogin) return;

  const languages = {
    "zh-Hant": {
      title: "玩法介紹",
      language: "語言",
      back: "上一步",
      next: "下一步",
      confirm: "確認",
      doorTitle: "等待老師開始",
      doorText: "老師按下「開始遊戲」後，門會自動打開，帶你進入食材台。",
      peerLeft: "左邊同學",
      peerRight: "右邊同學",
      progress: "{current} / {total}",
      steps: [
        {
          title: "第 1 步：看菜單",
          text: "先看今天要完成的中文字。每次只會出現一題，完成後才會出現下一題。",
          visual: "menu"
        },
        {
          title: "第 2 步：收集材料",
          text: "食材會從上方掉落。你會看到拼音、聲調，也可能看到不是答案的中文字。",
          visual: "ingredients"
        },
        {
          title: "第 3 步：用鍋子組字",
          text: "拿到鍋子的同學，把正確的拼音和聲調放進鍋子，就能組成菜單需要的中文字。",
          visual: "pan"
        },
        {
          title: "第 4 步：用砧板拆字",
          text: "拿到砧板的同學，可以把中文字切成拼音和聲調，再傳給需要的隊友。",
          visual: "board"
        },
        {
          title: "第 5 步：傳給隊友",
          text: "把食材往左邊或右邊滑出食材台，就能傳給旁邊的同學，幫助大家一起完成菜單。",
          visual: "pass"
        },
        {
          title: "第 6 步：完成菜單",
          text: "把完成的中文字放到自己的盤子。答對後，食材會縮小消失，接著會出現下一題。",
          visual: "serve"
        }
      ]
    },
    "zh-Hans": {
      title: "玩法介绍",
      language: "语言",
      back: "上一步",
      next: "下一步",
      confirm: "确认",
      doorTitle: "等待老师开始",
      doorText: "老师按下“开始游戏”后，门会自动打开，带你进入食材台。",
      peerLeft: "左边同学",
      peerRight: "右边同学",
      progress: "{current} / {total}",
      steps: [
        { title: "第 1 步：看菜单", text: "先看今天要完成的汉字。每次只会出现一题，完成后才会出现下一题。", visual: "menu" },
        { title: "第 2 步：收集材料", text: "食材会从上方掉落。你会看到拼音、声调，也可能看到不是答案的汉字。", visual: "ingredients" },
        { title: "第 3 步：用锅子组字", text: "拿到锅子的同学，把正确的拼音和声调放进锅子，就能组成菜单需要的汉字。", visual: "pan" },
        { title: "第 4 步：用砧板拆字", text: "拿到砧板的同学，可以把汉字切成拼音和声调，再传给需要的队友。", visual: "board" },
        { title: "第 5 步：传给队友", text: "把食材往左边或右边滑出食材台，就能传给旁边的同学，帮助大家一起完成菜单。", visual: "pass" },
        { title: "第 6 步：完成菜单", text: "把完成的汉字放到自己的盘子。答对后，食材会缩小消失，接着会出现下一题。", visual: "serve" }
      ]
    },
    en: {
      title: "How to Play",
      language: "Language",
      back: "Back",
      next: "Next",
      confirm: "Confirm",
      doorTitle: "Waiting for Teacher",
      doorText: "When the teacher starts the game, the door will open and take you to the ingredient table.",
      peerLeft: "Left teammate",
      peerRight: "Right teammate",
      progress: "{current} / {total}",
      steps: [
        { title: "Step 1: Read the Menu", text: "Look at the Chinese character you need to serve. You get one question at a time, and the next one appears after you finish.", visual: "menu" },
        { title: "Step 2: Collect Ingredients", text: "Ingredients fall from the top. You will see pinyin, tones, and sometimes Chinese characters that are not the direct answer.", visual: "ingredients" },
        { title: "Step 3: Cook with the Pan", text: "If you have the pan, put the correct pinyin and tone into it to make the character on the menu.", visual: "pan" },
        { title: "Step 4: Cut with the Board", text: "If you have the cutting board, cut a Chinese character into pinyin and tone, then pass them to teammates.", visual: "board" },
        { title: "Step 5: Pass to Teammates", text: "Swipe an ingredient out to the left or right to pass it to the teammate beside you.", visual: "pass" },
        { title: "Step 6: Finish the Menu", text: "Put the finished Chinese character on your plate. Correct answers shrink away, then the next question appears.", visual: "serve" }
      ]
    },
    ja: {
      title: "遊び方",
      language: "言語",
      back: "戻る",
      next: "次へ",
      confirm: "確認",
      doorTitle: "先生の開始を待っています",
      doorText: "先生がゲームを開始すると、ドアが自動で開いて材料台に入ります。",
      peerLeft: "左の仲間",
      peerRight: "右の仲間",
      progress: "{current} / {total}",
      steps: [
        { title: "ステップ 1：メニューを見る", text: "今日作る漢字を確認します。問題は一つずつ出て、完成すると次の問題が出ます。", visual: "menu" },
        { title: "ステップ 2：材料を集める", text: "材料は上から落ちてきます。ピンイン、声調、答えではない漢字が出ることがあります。", visual: "ingredients" },
        { title: "ステップ 3：フライパンで漢字を作る", text: "フライパンを持っている人は、正しいピンインと声調を入れて、メニューの漢字を作ります。", visual: "pan" },
        { title: "ステップ 4：まな板で分ける", text: "まな板を持っている人は、漢字をピンインと声調に分けて、必要な仲間に渡します。", visual: "board" },
        { title: "ステップ 5：仲間に渡す", text: "材料を左または右にスワイプすると、隣の仲間に渡せます。", visual: "pass" },
        { title: "ステップ 6：メニューを完成する", text: "完成した漢字を自分の皿に置きます。正解すると小さく消えて、次の問題が出ます。", visual: "serve" }
      ]
    },
    vi: {
      title: "Cách chơi",
      language: "Ngôn ngữ",
      back: "Quay lại",
      next: "Tiếp theo",
      confirm: "Xác nhận",
      doorTitle: "Đang chờ giáo viên",
      doorText: "Khi giáo viên bắt đầu trò chơi, cánh cửa sẽ tự mở và đưa bạn vào bàn nguyên liệu.",
      peerLeft: "Bạn bên trái",
      peerRight: "Bạn bên phải",
      progress: "{current} / {total}",
      steps: [
        { title: "Bước 1: Xem thực đơn", text: "Hãy xem chữ Hán cần hoàn thành. Mỗi lần chỉ có một câu hỏi, làm xong mới có câu tiếp theo.", visual: "menu" },
        { title: "Bước 2: Thu thập nguyên liệu", text: "Nguyên liệu sẽ rơi từ phía trên. Bạn sẽ thấy pinyin, thanh điệu và đôi khi có chữ Hán không phải đáp án trực tiếp.", visual: "ingredients" },
        { title: "Bước 3: Ghép chữ bằng chảo", text: "Nếu bạn có chảo, hãy bỏ đúng pinyin và thanh điệu vào chảo để tạo chữ Hán trong thực đơn.", visual: "pan" },
        { title: "Bước 4: Tách chữ bằng thớt", text: "Nếu bạn có thớt, hãy cắt chữ Hán thành pinyin và thanh điệu rồi chuyển cho đồng đội cần.", visual: "board" },
        { title: "Bước 5: Chuyển cho đồng đội", text: "Vuốt nguyên liệu ra trái hoặc phải để chuyển cho bạn bên cạnh.", visual: "pass" },
        { title: "Bước 6: Hoàn thành thực đơn", text: "Đặt chữ Hán đã hoàn thành lên đĩa. Khi đúng, nguyên liệu sẽ thu nhỏ biến mất rồi xuất hiện câu tiếp theo.", visual: "serve" }
      ]
    }
  };

  let currentStep = 0;

  function getLanguage() {
    const saved = localStorage.getItem(storageKey);
    return languages[saved] ? saved : "zh-Hant";
  }

  function renderVisual(kind) {
    const copy = languages[getLanguage()] || languages["zh-Hant"];
    const scenes = {
      menu: `
        <div class="tutorial-scene">
          <div class="tutorial-menu-card menu-demo"><span>一</span><small>yi</small></div>
        </div>`,
      ingredients: `
        <div class="tutorial-scene">
          <span class="tutorial-food ingredient-letter-a" style="left:8px;top:18px;">h</span>
          <span class="tutorial-food ingredient-letter-b" style="left:76px;top:18px;">u</span>
          <span class="tutorial-food ingredient-letter-c" style="left:144px;top:18px;">a</span>
          <span class="tutorial-word ingredient-hanzi" style="left:206px;top:8px;">茶</span>
          <span class="tutorial-tone ingredient-tone" style="left:268px;top:20px;">¯</span>
          <span class="tutorial-arrow bounce-down" style="left:224px;top:130px;">↓</span>
        </div>`,
      pan: `
        <div class="tutorial-scene">
          <img class="scene-pan pan-wiggle" src="assets/pan.png" alt="">
          <span class="pan-bowl-zone" aria-hidden="true">
            <span class="tutorial-word result-pop pan-result">一</span>
          </span>
          <span class="tutorial-food move-to-pan-y" style="left:0;top:18px;">y</span>
          <span class="tutorial-food move-to-pan-i" style="left:172px;top:18px;">i</span>
          <span class="tutorial-tone move-to-pan-tone" style="left:172px;top:84px;">¯</span>
        </div>`,
      board: `
        <div class="tutorial-scene">
          <img class="scene-board board-slice" src="assets/board.png" alt="">
          <span class="tutorial-word word-slice" style="left:226px;top:70px;">三</span>
          <span class="tutorial-food split-s" style="left:40px;top:132px;">s</span>
          <span class="tutorial-food split-a" style="left:106px;top:132px;">a</span>
          <span class="tutorial-food split-n" style="left:172px;top:132px;">n</span>
          <span class="tutorial-tone split-tone" style="left:250px;top:132px;">¯</span>
        </div>`,
      pass: `
        <div class="tutorial-scene">
          <span class="tutorial-peer peer-left">${copy.peerLeft}</span>
          <span class="tutorial-peer peer-right">${copy.peerRight}</span>
          <span class="tutorial-food pass-food-left" style="left:124px;top:48px;">s</span>
          <span class="tutorial-tone pass-food-right" style="left:132px;top:108px;">¯</span>
          <span class="tutorial-arrow pass-left" style="left:42px;top:72px;">←</span>
          <span class="tutorial-arrow pass-right" style="right:42px;top:72px;">→</span>
        </div>`,
      serve: `
        <div class="tutorial-scene">
          <img class="scene-plate" src="assets/plate.png" alt="">
          <span class="tutorial-word serve-drop" style="left:116px;top:54px;">一</span>
        </div>`
    };
    visual.innerHTML = scenes[kind] || scenes.menu;
  }

  function render() {
    const lang = getLanguage();
    const copy = languages[lang];
    const steps = copy.steps;
    const step = steps[currentStep];

    title.textContent = copy.title;
    stepTitle.textContent = step.title;
    stepText.textContent = step.text;
    progress.textContent = copy.progress
      .replace("{current}", String(currentStep + 1))
      .replace("{total}", String(steps.length));
    backButton.textContent = copy.back;
    backButton.disabled = currentStep === 0;
    nextButton.textContent = currentStep === steps.length - 1 ? copy.confirm : copy.next;
    if (doorTitle) doorTitle.textContent = copy.doorTitle;
    if (doorText) doorText.textContent = copy.doorText;

    dots.innerHTML = steps
      .map((_, index) => `<span class="tutorial-dot${index === currentStep ? " active" : ""}"></span>`)
      .join("");
    renderVisual(step.visual);
  }

  function startTutorial() {
    currentStep = 0;
    studentView.classList.add("tutorial-active");
    render();
    tutorial.scrollIntoView({ block: "start" });
  }

  window.startStudentTutorial = startTutorial;

  function finishTutorial() {
    studentView.classList.remove("tutorial-active");
    if (typeof window.render === "function") window.render();
  }

  studentLogin.addEventListener("click", () => {
    window.setTimeout(() => {
      if (studentView.classList.contains("active")) {
        startTutorial();
      }
    }, 0);
  });

  document.addEventListener("click", (event) => {
    if (!event.target?.closest?.(".tutorial-replay-btn")) return;
    if (!studentView.classList.contains("active")) return;
    startTutorial();
  });

  backButton.addEventListener("click", () => {
    currentStep = Math.max(0, currentStep - 1);
    render();
  });

  nextButton.addEventListener("click", () => {
    const total = languages[getLanguage()].steps.length;
    if (currentStep >= total - 1) {
      finishTutorial();
      return;
    }
    currentStep += 1;
    render();
  });

  document.addEventListener("change", (event) => {
    if (!event.target?.classList?.contains("student-language-select")) return;
    localStorage.setItem(storageKey, event.target.value);
    window.requestAnimationFrame(render);
  });

  render();
})();
