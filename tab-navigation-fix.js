(function () {
  const tabs = Array.from(document.querySelectorAll(".mode-tabs .tab"));
  const loginView = document.querySelector("#loginView");
  const studentView = document.querySelector("#studentView");
  const teacherView = document.querySelector("#teacherView");
  const loginMessage = document.querySelector("#loginMessage");

  if (!tabs.length || !loginView || !studentView || !teacherView) return;

  function getRole() {
    if (document.body.classList.contains("student-session")) return "student";
    if (document.body.classList.contains("teacher-session")) return "teacher";
    return sessionStorage.getItem("pinyinKitchenRole") || "";
  }

  function showView(mode) {
    document.body.classList.toggle("login-view-active", mode === "login");
    tabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.mode === mode));
    loginView.classList.toggle("active", mode === "login");
    studentView.classList.toggle("active", mode === "student");
    teacherView.classList.toggle("active", mode === "teacher");

    if (mode !== "login" && loginMessage) {
      loginMessage.textContent = "";
    }

    if (window.render) {
      window.render();
    }
  }

  function getActiveMode() {
    if (studentView.classList.contains("active")) return "student";
    if (teacherView.classList.contains("active")) return "teacher";
    return "login";
  }

  function syncNavigation() {
    const mode = getActiveMode();
    document.body.classList.toggle("login-view-active", mode === "login");
    tabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.mode === mode));
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", (event) => {
      const mode = tab.dataset.mode;
      const role = getRole();

      if (role === "student" && mode === "teacher") {
        event.preventDefault();
        event.stopImmediatePropagation();
        return;
      }

      event.preventDefault();
      event.stopImmediatePropagation();
      showView(mode);
    }, true);
  });

  [loginView, studentView, teacherView].forEach((view) => {
    new MutationObserver(syncNavigation).observe(view, {
      attributes: true,
      attributeFilter: ["class"]
    });
  });

  syncNavigation();
})();
