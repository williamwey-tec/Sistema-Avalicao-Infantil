let currentAluno = 0;

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
