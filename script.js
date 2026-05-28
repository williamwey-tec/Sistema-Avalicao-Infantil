const alunos = [
  {num:'01',nome:'Ana Lima Santos',status:'done'},
  {num:'02',nome:'Bruno Souza Costa',status:'done'},
  {num:'03',nome:'Carlos Mendes Rocha',status:'partial'},
  {num:'04',nome:'Daniela Ferreira',status:'empty'},
  {num:'05',nome:'Eduardo Santos Lima',status:'done'},
  {num:'06',nome:'Fernanda Oliveira',status:'partial'},
  {num:'07',nome:'Gabriel Alves Neto',status:'empty'},
  {num:'08',nome:'Helena Cruz Pinto',status:'done'},
];

const alunosTable = [
  {num:'01',nome:'Ana Lima Santos',turma:'Girassol — Tarde',etapa:'1ª Etapa',resp:'Maria Santos',sit:'Ativa'},
  {num:'02',nome:'Bruno Souza Costa',turma:'Girassol — Tarde',etapa:'1ª Etapa',resp:'Paulo Costa',sit:'Ativa'},
  {num:'03',nome:'Carlos Mendes',turma:'Borboleta — Manhã',etapa:'1ª Etapa',resp:'Joana Mendes',sit:'Ativa'},
  {num:'04',nome:'Daniela Ferreira',turma:'Estrela — Tarde',etapa:'2ª Etapa',resp:'Rosa Ferreira',sit:'Ativa'},
  {num:'05',nome:'Eduardo Lima',turma:'Borboleta — Manhã',etapa:'1ª Etapa',resp:'André Lima',sit:'Ativa'},
  {num:'06',nome:'Fernanda Oliveira',turma:'Estrela — Tarde',etapa:'2ª Etapa',resp:'Cláudia Oliveira',sit:'Transferida'},
];

const atencao = ['Carlos Mendes — Corpo e Movimento','Fernanda Oliveira — Espaços e Números'];

let currentAluno = 0;
let currentRole = 'professor';

function renderAlunos(){
  const el = document.getElementById('lista-alunos');
  if(!el) return;
  el.innerHTML = alunos.map((a,i)=>`
    <div class="aluno-row${i===currentAluno?' selected':''}" onclick="selectAluno(${i})">
      <div class="aluno-num">${a.num}</div>
      <div class="aluno-nome">${a.nome}</div>
      <span class="aluno-status status-${a.status}">${a.status==='done'?'Concluído':a.status==='partial'?'Parcial':'Pendente'}</span>
    </div>
  `).join('');
}

function renderTabelaAlunos(){
  const el = document.getElementById('tabela-alunos');
  if(!el) return;
  el.innerHTML = alunosTable.map(a=>`
    <tr>
      <td>${a.num}</td>
      <td><strong>${a.nome}</strong></td>
      <td>${a.turma}</td>
      <td><span class="chip ${a.etapa==='1ª Etapa'?'chip-blue':'chip-amber'}">${a.etapa}</span></td>
      <td>${a.resp}</td>
      <td><span class="chip ${a.sit==='Ativa'?'chip-green':'chip-gray'}">${a.sit}</span></td>
      <td><button class="btn btn-outline btn-sm" onclick="showToast('✏️ Editando ${a.nome}')">Editar</button></td>
    </tr>
  `).join('');
}

function renderAtencao(){
  const el = document.getElementById('alunos-atencao');
  if(!el) return;
  el.innerHTML = atencao.map(a=>`
    <div style="display:flex;align-items:center;gap:8px;padding:8px 10px;background:#FCEBEB;border-radius:8px">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#E24B4A" stroke-width="2" width="14" height="14"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      <span style="font-size:12px;color:#A32D2D">${a}</span>
    </div>
  `).join('');
}

function selectAluno(i){
  currentAluno = i;
  renderAlunos();
  const el = document.getElementById('eval-aluno-nome');
  if(el) el.textContent = alunos[i].nome;
}

function prevAluno(){
  if(currentAluno > 0){ currentAluno--; selectAluno(currentAluno); }
}
function nextAluno(){
  if(currentAluno < alunos.length-1){ currentAluno++; selectAluno(currentAluno); }
}

function selectOpt(btn, opt){
  const group = btn.parentElement;
  group.querySelectorAll('.opt-btn').forEach(b=>{ b.className='opt-btn'; });
  btn.classList.add('sel-'+opt);
}

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

function openModal(id){ document.getElementById(id).classList.add('open'); }
function closeModal(id){ document.getElementById(id).classList.remove('open'); }

function salvarAluno(){
  const nome = document.getElementById('m-nome').value;
  if(!nome){ showToast('⚠️ Informe o nome do aluno'); return; }
  closeModal('modal-aluno');
  showToast('✅ Aluno cadastrado com sucesso!');
}

let toastTimer;
function showToast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>t.classList.remove('show'), 2800);
}