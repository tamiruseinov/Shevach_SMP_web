const IP = "play.shevachsmp.edu";
fetch(`https://api.mcstatus.io/v2/status/java/${IP}`)
  .then(res => res.json())
  .then(data => {
    const status = data.online
      ? `🟢 Online · ${data.players.online}/${data.players.max}`
      : "🔴 Offline";
    document.getElementById("status").textContent = status;
  })
  .catch(() => {
    document.getElementById("status").textContent = "Error checking status";
  });