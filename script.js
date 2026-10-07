document.addEventListener('DOMContentLoaded', () => {
  const teamGrid = document.getElementById('teamGrid');
  const teamDetailSection = document.getElementById('team-detail');

  // 1. 生成战队 Logo 列表
  const teamIds = Object.keys(teamsData);
  teamIds.forEach(id => {
    const team = teamsData[id];
    const div = document.createElement('div');
    div.className = 'team-logo-item';
    div.dataset.team = id;
    div.innerHTML = `
      <img src="${team.logo}" alt="${team.name}">
      <span>${team.name}</span>
    `;
    
    // 点击战队 Logo 切换
    div.addEventListener('click', () => {
      document.querySelectorAll('.team-logo-item').forEach(i => i.classList.remove('active'));
      div.classList.add('active');
      renderTeam(id);
    });
    
    teamGrid.appendChild(div);
  });

  // 2. 默认加载第一支战队
  if (teamIds.length > 0) {
    const firstTeam = teamGrid.firstElementChild;
    if (firstTeam) {
      firstTeam.classList.add('active');
      renderTeam(teamIds[0]);
    }
  }

  // 3. 渲染战队详情
  function renderTeam(teamId) {
    const team = teamsData[teamId];
    if (!team) return;

    const playersHtml = team.players.map(p => 
      `<button class="player-btn" data-player="${p.id}">${p.id}</button>`
    ).join('');

    teamDetailSection.innerHTML = `
      <div class="team-detail-card">
        <div class="team-header">
          <div class="team-photo">
            <img src="${team.photo}" alt="${team.name}">
          </div>
          <div class="team-info">
            <h2>${team.name}</h2>
            <p class="team-region"><i class="fas fa-flag"></i> ${team.region}</p>
            <div class="player-selector" id="playerSelector">
              ${playersHtml}
            </div>
          </div>
        </div>
        <div class="player-stats-panel" id="playerStatsPanel">
          <p style="text-align:center; color: var(--text-muted);">请选择选手查看详细数据</p>
        </div>
      </div>
    `;

    // 绑定选手按钮事件
    const playerBtns = teamDetailSection.querySelectorAll('.player-btn');
    playerBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        playerBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderPlayerStats(teamId, btn.dataset.player);
      });
    });

    // 默认选中第一个选手
    if (playerBtns.length > 0) {
      playerBtns[0].click();
    }
  }

  // 4. 渲染选手数据
  function renderPlayerStats(teamId, playerId) {
    const team = teamsData[teamId];
    const player = team.players.find(p => p.id === playerId);
    if (!player) return;

    const statsPanel = document.getElementById('playerStatsPanel');
    statsPanel.innerHTML = `
      <div class="player-portrait">
        <img src="${player.portrait}" alt="${player.id}">
        <h3 style="margin-top:10px; font-size:1.5rem;">${player.id}</h3>
        <p style="color:var(--text-muted); font-size:0.9rem;">${player.role}</p>
      </div>
      <div class="stats-grid">
        <div class="stat-item"><div class="stat-value">${player.stats.adr}</div><div class="stat-label">ADR</div></div>
        <div class="stat-item"><div class="stat-value">${player.stats.rating}</div><div class="stat-label">Rating Pro</div></div>
        <div class="stat-item"><div class="stat-value">${player.stats.kast}%</div><div class="stat-label">KAST</div></div>
        <div class="stat-item"><div class="stat-value">${player.stats.hs}%</div><div class="stat-label">爆头率</div></div>
      </div>
    `;
  }
});
