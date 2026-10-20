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
