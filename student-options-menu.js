(function () {
  const studentView = document.querySelector("#studentView");
  const studentLayout = document.querySelector(".student-layout");
  const gameColumn = document.querySelector(".game-column");
  const panel = document.querySelector(".station-panel");
  if (!studentView || !studentLayout || !gameColumn || !panel) return;

  const button = document.createElement("button");
  button.id = "studentOptionsToggle";
  button.className = "student-options-toggle";
  button.type = "button";
  button.setAttribute("aria-controls", "studentOptionsPanel");
  button.setAttribute("aria-expanded", "false");
  button.setAttribute("title", "選項");
  button.innerHTML = "<span></span><span></span><span></span>";

  panel.id = "studentOptionsPanel";
  panel.classList.add("student-options-panel");
  gameColumn.prepend(button);

  function setOpen(open) {
    studentView.classList.toggle("options-open", open);
    button.setAttribute("aria-expanded", String(open));
  }

  button.addEventListener("click", () => {
    setOpen(!studentView.classList.contains("options-open"));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });
})();
