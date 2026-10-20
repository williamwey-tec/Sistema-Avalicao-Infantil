let currentRole = 'professor';

function selectRole(el, role){
  document.querySelectorAll('.role-btn').forEach(b=>b.classList.remove('active'));
  el.classList.add('active');
  currentRole = role;
}

function fazerLogin(){
  const email = document.getElementById('login-email').value || 'usuario@escola.edu.br';
  const names = { professor:'Profª. Ana Silva', coordenador:'Coord. Carlos Mendes', diretor:'Dir. Maria Costa' };
  const badges = { professor:'badge-professor', coordenador:'badge-coordenador', diretor:'badge-diretor' };
  const roles = { professor:'Professor', coordenador:'Coordenador', diretor:'Diretor' };
  const initials = { professor:'AS', coordenador:'CM', diretor:'MC' };

  document.getElementById('user-name').textContent = names[currentRole];
  const badge = document.getElementById('user-badge');
  badge.textContent = roles[currentRole];
  badge.className = 'badge-role ' + badges[currentRole];
  document.getElementById('user-avatar').textContent = initials[currentRole];
  document.getElementById('dash-greeting').textContent = 'Bom dia, ' + names[currentRole].split(' ')[0] + ' ' + names[currentRole].split(' ')[1] + '!';

  if(currentRole === 'coordenador'){
    document.getElementById('nav-modelos').style.display = 'flex';
  } else {
    document.getElementById('nav-modelos').style.display = 'none';
  }

  document.getElementById('screen-login').classList.remove('active');
  document.getElementById('screen-main').classList.add('active');
  renderAlunos();
  renderTabelaAlunos();
  renderAtencao();
}

function fazerLogout(){
  document.getElementById('screen-main').classList.remove('active');
  document.getElementById('screen-login').classList.add('active');
}

function goPage(page, navEl){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById('page-'+page).classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
  if(navEl) navEl.classList.add('active');
  if(page==='avaliacao') renderAlunos();
}
