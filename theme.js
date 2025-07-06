const toggleTheme = () => {
  const root = document.documentElement;
  const dark = root.style.getPropertyValue('--bg') === '#282c34';
  if (dark) {
    root.style.setProperty('--bg', '#fff');
    root.style.setProperty('--fg', '#000');
  } else {
    root.style.setProperty('--bg', '#282c34');
    root.style.setProperty('--fg', '#fff');
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.createElement("button");
  btn.textContent = "🌓 Toggle Theme";
  btn.style.position = "absolute";
  btn.style.top = "10px";
  btn.style.right = "10px";
  btn.onclick = toggleTheme;
  document.body.appendChild(btn);
});