const SHEETDB_API = "https://sheetdb.io/api/v1/bqauqq803k7zo";
const form = document.getElementById("mcForm");
const msg = document.getElementById("formMessage");
const langSelect = document.getElementById("languageSelect");

const BAD_WORDS = ["nigger", "nigga", "n1gga", "niga", "retard"];

if (form) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => data[key] = value.trim());

    if (parseInt(data.age) < 12) {
      msg.textContent = getText("too_young");
      return;
    }

    for (let word of BAD_WORDS) {
      if (data.full_name.toLowerCase().includes(word) || data.nickname.toLowerCase().includes(word)) {
        msg.textContent = getText("bad_words");
        return;
      }
    }

    data.class = calcClass(parseInt(data.age));
    form.class.value = data.class;

    const response = await fetch(SHEETDB_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data })
    });

    if (response.ok) {
      window.location.href = "thanks.html";
    } else {
      msg.textContent = getText("error");
    }
  });
}

function calcClass(age) {
  if (age >= 12 && age < 13) return "7";
  if (age >= 13 && age < 14) return "8";
  if (age >= 14 && age < 15) return "9";
  if (age >= 15 && age < 16) return "10";
  if (age >= 16 && age < 17) return "11";
  if (age >= 17 && age < 18) return "12";
  return "N/A";
}

// Translation
let currentLang = "en";
let translations = {};

async function loadLang(lang = "en") {
  const res = await fetch("lang.json");
  translations = await res.json();
  currentLang = lang;
  updateLang();
}

function getText(key) {
  return translations[currentLang]?.[key] || key;
}

function updateLang() {
  document.querySelectorAll("[data-lang]").forEach(el => {
    el.textContent = getText(el.getAttribute("data-lang"));
  });
  document.querySelectorAll("[data-lang-placeholder]").forEach(el => {
    el.placeholder = getText(el.getAttribute("data-lang-placeholder"));
  });
  document.querySelectorAll("[data-lang-value]").forEach(el => {
    el.value = getText(el.getAttribute("data-lang-value"));
  });
}

if (langSelect) {
  langSelect.addEventListener("change", e => loadLang(e.target.value));
  loadLang();
}