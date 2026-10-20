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
