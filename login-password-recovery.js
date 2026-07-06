(function () {
  const stateKey = "pinyinKitchenState";

  const accountInput = document.querySelector("#teacherAccount");
  const passwordInput = document.querySelector("#teacherPassword");
  if (!accountInput || !passwordInput) return;

  const controls = document.createElement("div");
  controls.className = "password-recovery-row";

  const button = document.createElement("button");
  button.id = "forgotTeacherPassword";
  button.className = "text-btn";
  button.type = "button";
  button.textContent = "忘記密碼";

  const hint = document.createElement("div");
  hint.id = "teacherPasswordHint";
  hint.className = "password-hint";
  hint.setAttribute("aria-live", "polite");

  controls.append(button, hint);
  passwordInput.closest(".field-row")?.after(controls);

  function readSavedState() {
    try {
      return JSON.parse(localStorage.getItem(stateKey) || "{}");
    } catch {
      return {};
    }
  }

  button.addEventListener("click", () => {
    const account = accountInput.value.trim();
    const saved = readSavedState();

    if (!account) {
      hint.textContent = "請先輸入老師帳號。";
      accountInput.focus();
      return;
    }

    if (saved.teacherAccount === account && saved.teacherPassword) {
      passwordInput.type = "text";
      passwordInput.value = saved.teacherPassword;
      hint.textContent = `此帳號的密碼是：${saved.teacherPassword}`;
      passwordInput.focus();
      return;
    }

    hint.textContent = "找不到這個帳號的密碼，請確認帳號是否正確。";
  });
})();
