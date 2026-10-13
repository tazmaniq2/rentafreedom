(() => {
  // IMPORTANT: Set this to the business email address before publishing.
  const CONTACT_EMAIL = "chokanite@gmail.com";
  const translations = window.RENTAFREEDOM_TRANSLATIONS || {};
  const langButtons = document.querySelectorAll(".lang-btn");
  const form = document.getElementById("enquiry-form");
  const hint = document.getElementById("form-hint");
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".desktop-nav");

  document.getElementById("year").textContent = new Date().getFullYear();

  function setLanguage(lang) {
    if (!translations[lang]) return;
    document.documentElement.lang = lang;
    document.title = lang === "bg"
      ? "Rent a Freedom | Свободата започва на пътя"
      : "Rent a Freedom | Freedom starts on the road";

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");
      if (translations[lang][key] !== undefined) element.innerHTML = translations[lang][key];
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
      const key = element.getAttribute("data-i18n-placeholder");
      if (translations[lang][key] !== undefined) element.placeholder = translations[lang][key];
    });
    langButtons.forEach((button) => {
      const active = button.dataset.lang === lang;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    localStorage.setItem("rentafreedom-language", lang);
  }

  langButtons.forEach((button) => button.addEventListener("click", () => setLanguage(button.dataset.lang)));
  const savedLang = localStorage.getItem("rentafreedom-language");
  setLanguage(savedLang === "en" ? "en" : "bg");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    }));
  }

  if (form) {
    const startInput = form.elements.start;
    const endInput = form.elements.end;
    const today = new Date();
    const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    startInput.min = localToday;
    endInput.min = localToday;
    startInput.addEventListener("change", () => {
      endInput.min = startInput.value || localToday;
      if (endInput.value && endInput.value < endInput.min) endInput.value = "";
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const lang = document.documentElement.lang || "bg";
      const t = translations[lang] || translations.bg;
      if (!startInput.value || !endInput.value || endInput.value <= startInput.value) {
        hint.textContent = t.formDateError;
        hint.classList.add("error");
        return;
      }
      if (!CONTACT_EMAIL || !CONTACT_EMAIL.includes("@")) {
        hint.textContent = t.formEmailMissing;
        hint.classList.add("error");
        return;
      }
      hint.classList.remove("error");
      const data = new FormData(form);
      const subject = t.formEmailSubject;
      const body = [
        `${t.formName}: ${data.get("name")}`,
        `${t.formStart}: ${data.get("start")}`,
        `${t.formEnd}: ${data.get("end")}`,
        `${t.formExtras}: ${data.get("extras")}`,
        `${t.formDelivery}: ${data.get("delivery")}`,
        `${t.formMessage}: ${data.get("message") || "-"}`
      ].join("\n");
      window.location.href = `mailto:${encodeURIComponent(CONTACT_EMAIL)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }
})();
