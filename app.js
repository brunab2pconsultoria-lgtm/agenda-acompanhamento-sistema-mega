/**
 * ARPOL - Agenda de Acompanhamento Estilo Calendário
 * Com Central de Solicitações e Aprovação da Gestora Bruna
 */
(function () {
  'use strict';

  const STORAGE_KEY = 'arpol_agenda_mega_slots_v1';
  const STORAGE_USER = 'arpol_agenda_mega_usuario_v1';
  const STORAGE_ADMIN_TOKEN = 'arpol_agenda_admin_token';
  const SENHA_GESTOR = 'arpol2026';

  // Contatos da Gestora Bruna para aviso e confirmação
  const BRUNA_WHATSAPP = '5511999807554';
  const BRUNA_EMAIL = 'bruna@arpol.eng.br';

  const MESES = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  let slots = [];
  let usuarioAtual = localStorage.getItem(STORAGE_USER) || '';
  let slotSelecionado = null;
  let apenasLivres = false;

  // Estado do Calendário: Ano e Mês (Iniciando em Outubro/2026 onde começam as agendas)
  let anoAtual = 2026;
  let mesAtual = 9; // 0 = Janeiro, 9 = Outubro
  let dataIsoSelecionada = '2026-10-14'; // Dia padrão selecionado

  document.addEventListener('DOMContentLoaded', () => {
    inicializarUsuario();
    configurarEventos();
    carregarDados();

    // Atualização periódica a cada 10 segundos para ver aprovações e novos pedidos em tempo real
    setInterval(() => {
      carregarDadosSilencioso();
    }, 10000);
  });

  function ehAdministradorBruna() {
    return localStorage.getItem(STORAGE_ADMIN_TOKEN) === 'autenticado_bruna';
  }

  async function carregarDados() {
    try {
      const resp = await fetch('/api/slots');
      if (resp.ok) {
        const data = await resp.json();
        if (data.slots && Array.isArray(data.slots)) {
          slots = data.slots;
          localStorage.setItem(STORAGE_KEY, JSON.stringify(slots));
          renderizarCalendario();
          renderizarPainelDia(dataIsoSelecionada);
          atualizarContadorPendentesHeader();
          return;
        }
      }
    } catch (e) {
      console.log('API remota não disponível, recorrendo ao cache local...');
    }

    // Fallback para cache local / catalogo padrao
    try {
      const salvo = localStorage.getItem(STORAGE_KEY);
      if (salvo) {
        slots = JSON.parse(salvo);
      } else if (window.CATALOGO_SLOTS_PADRAO) {
        slots = JSON.parse(JSON.stringify(window.CATALOGO_SLOTS_PADRAO));
      }
    } catch (e) {
      slots = window.CATALOGO_SLOTS_PADRAO || [];
    }

    renderizarCalendario();
    renderizarPainelDia(dataIsoSelecionada);
    atualizarContadorPendentesHeader();
  }

  async function carregarDadosSilencioso() {
    try {
      const resp = await fetch('/api/slots');
      if (resp.ok) {
        const data = await resp.json();
        if (data.slots && Array.isArray(data.slots)) {
          slots = data.slots;
          localStorage.setItem(STORAGE_KEY, JSON.stringify(slots));
          renderizarCalendario();
          renderizarPainelDia(dataIsoSelecionada);
          atualizarContadorPendentesHeader();
        }
      }
    } catch (e) {}
  }

  async function atualizarSlotServidor(slotId, novoStatus, reservaInfo) {
    const adminToken = ehAdministradorBruna() ? SENHA_GESTOR : null;
    try {
      const resp = await fetch('/api/slot/atualizar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slotId: slotId,
          status: novoStatus,
          reserva: reservaInfo,
          adminToken: adminToken
        })
      });
      if (resp.ok) {
        const result = await resp.json();
        if (result.slots) {
          slots = result.slots;
          localStorage.setItem(STORAGE_KEY, JSON.stringify(slots));
          renderizarCalendario();
          renderizarPainelDia(dataIsoSelecionada);
          atualizarContadorPendentesHeader();
          return true;
        }
      } else {
        const errJson = await resp.json();
        alert(errJson.error || 'Erro ao processar solicitação.');
      }
    } catch (err) {
      // Fallback offline local
      const idx = slots.findIndex(s => s.id === slotId);
      if (idx !== -1) {
        if (novoStatus === 'confirmado') {
          slots[idx].status = 'reservado';
        } else if (novoStatus === 'recusado' || novoStatus === 'livre') {
          slots[idx].status = 'livre';
          slots[idx].reserva = null;
        } else {
          slots[idx].status = novoStatus;
          slots[idx].reserva = reservaInfo;
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(slots));
        renderizarCalendario();
        renderizarPainelDia(dataIsoSelecionada);
        atualizarContadorPendentesHeader();
        return true;
      }
    }
    return false;
  }

  function atualizarContadorPendentesHeader() {
    const elBadge = document.getElementById('badge-pendentes-header');
    if (!elBadge) return;
    const pendentes = slots.filter(s => s.status === 'pendente').length;
    if (ehAdministradorBruna() && pendentes > 0) {
      elBadge.style.display = 'inline-block';
      elBadge.textContent = `${pendentes} pendente(s)`;
    } else {
      elBadge.style.display = 'none';
    }
  }

  function inicializarUsuario() {
    const inputGlobal = document.getElementById('campo-usuario-global');
    if (inputGlobal) {
      inputGlobal.value = usuarioAtual;
      inputGlobal.addEventListener('input', (e) => {
        usuarioAtual = e.target.value.trim();
        localStorage.setItem(STORAGE_USER, usuarioAtual);
        renderizarCalendario();
        renderizarPainelDia(dataIsoSelecionada);
      });
    }
    atualizarEstadoUsuario();
  }

  function atualizarEstadoUsuario() {
    const boxGestor = document.getElementById('box-gestor-logado');
    const btnAcesso = document.getElementById('btn-acesso-gestor');

    if (ehAdministradorBruna()) {
      if (boxGestor) boxGestor.style.display = 'flex';
      if (btnAcesso) btnAcesso.style.display = 'none';
    } else {
      if (boxGestor) boxGestor.style.display = 'none';
      if (btnAcesso) btnAcesso.style.display = 'inline-flex';
    }
    atualizarContadorPendentesHeader();
  }

  window.abrirModalSenhaGestor = function () {
    const inputSenha = document.getElementById('input-senha-gestor');
    const erroSenha = document.getElementById('erro-senha-gestor');
    if (inputSenha) inputSenha.value = '';
    if (erroSenha) erroSenha.style.display = 'none';

    const modal = document.getElementById('modal-senha-gestor');
    if (modal) modal.classList.add('ativo');
    setTimeout(() => { if (inputSenha) inputSenha.focus(); }, 100);
  };

  window.autenticarGestor = function (e) {
    e.preventDefault();
    const inputSenha = document.getElementById('input-senha-gestor');
    const erroSenha = document.getElementById('erro-senha-gestor');
    const valor = inputSenha ? inputSenha.value.trim() : '';

    if (valor === SENHA_GESTOR) {
      localStorage.setItem(STORAGE_ADMIN_TOKEN, 'autenticado_bruna');
      fecharModal();
      atualizarEstadoUsuario();
      renderizarCalendario();
      renderizarPainelDia(dataIsoSelecionada);
    } else {
      if (erroSenha) erroSenha.style.display = 'block';
      if (inputSenha) {
        inputSenha.select();
        inputSenha.focus();
      }
    }
  };

  window.sairModoGestor = function () {
    localStorage.removeItem(STORAGE_ADMIN_TOKEN);
    atualizarEstadoUsuario();
    renderizarCalendario();
    renderizarPainelDia(dataIsoSelecionada);
  };

  function configurarEventos() {
    const chkLivres = document.getElementById('chk-so-livres');
    if (chkLivres) {
      chkLivres.addEventListener('change', (e) => {
        apenasLivres = e.target.checked;
        renderizarCalendario();
      });
    }

    // Fechar modais ao clicar no overlay
    document.querySelectorAll('.modal-overlay-cal').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          fecharModal();
        }
      });
    });

    // Tecla ESC fecha modais
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        fecharModal();
      }
    });
  }

  window.mudarMes = function (direcao) {
    mesAtual += direcao;
    if (mesAtual > 11) {
      mesAtual = 0;
      anoAtual += 1;
    } else if (mesAtual < 0) {
      mesAtual = 11;
      anoAtual -= 1;
    }
    renderizarCalendario();
  };

  function obterStatusSlot(slot) {
    if (slot.status === 'pendente') {
      return 'pendente';
    }
    if (slot.status === 'reservado') {
      if (usuarioAtual && slot.reserva && slot.reserva.nome.trim().toLowerCase() === usuarioAtual.toLowerCase()) {
        return 'minha';
      }
      return 'reservado';
    }
    return 'livre';
  }

  function renderizarCalendario() {
    const rotulo = document.getElementById('rotulo-mes-ano');
    if (rotulo) {
      rotulo.textContent = `${MESES[mesAtual]} ${anoAtual}`;
    }

    const grid = document.getElementById('grid-dias-mes');
    if (!grid) return;
    grid.innerHTML = '';

    const slotsPorData = {};
    slots.forEach(s => {
      if (!slotsPorData[s.dataIso]) slotsPorData[s.dataIso] = [];
      slotsPorData[s.dataIso].push(s);
    });

    const primeiroDiaSemana = new Date(anoAtual, mesAtual, 1).getDay();
    const totalDiasMes = new Date(anoAtual, mesAtual + 1, 0).getDate();
    const totalDiasMesAnterior = new Date(anoAtual, mesAtual, 0).getDate();

    // Dias do mês anterior
    for (let i = primeiroDiaSemana - 1; i >= 0; i--) {
      const numDia = totalDiasMesAnterior - i;
      const cell = document.createElement('div');
      cell.className = 'cal-day-cell other-month';
      cell.innerHTML = `<span class="day-number">${numDia}</span>`;
      grid.appendChild(cell);
    }

    // Dias do mês atual
    for (let d = 1; d <= totalDiasMes; d++) {
      const dStr = String(d).padStart(2, '0');
      const mStr = String(mesAtual + 1).padStart(2, '0');
      const dataIso = `${anoAtual}-${mStr}-${dStr}`;

      const slotsDoDia = slotsPorData[dataIso] || [];
      const temAgenda = slotsDoDia.length > 0;
      const livresQtd = slotsDoDia.filter(s => s.status === 'livre').length;
      const pendentesQtd = slotsDoDia.filter(s => s.status === 'pendente').length;
      const isSelecionado = (dataIso === dataIsoSelecionada);

      const ocultarPorFiltro = apenasLivres && temAgenda && livresQtd === 0;

      const cell = document.createElement('div');
      cell.className = `cal-day-cell ${temAgenda ? 'has-agenda' : ''} ${isSelecionado ? 'selected' : ''}`;
      if (ocultarPorFiltro) cell.style.opacity = '0.35';

      let conteudoHtml = `<div class="day-number">${d}</div>`;

      if (temAgenda) {
        const primeiro = slotsDoDia[0];

        let pillStatusHtml = '';
        if (livresQtd === 0) {
          pillStatusHtml = `<span class="day-slots-summary-pill pill-lotado">Lotado</span>`;
        } else {
          pillStatusHtml = `<span class="day-slots-summary-pill pill-livres">${livresQtd} livres</span>`;
        }

        const isAdmin = ehAdministradorBruna();
        const tagAdminHtml = isAdmin ? `<span class="day-consultant-admin-tag">👤 ${primeiro.consultor}</span>` : '';
        const tagPendenteHtml = (isAdmin && pendentesQtd > 0) ? `<span style="background: #f59e0b; color: #fff; font-size: 0.65rem; padding: 1px 5px; border-radius: 4px; font-weight: 700; display: block; margin-top: 2px;">⏳ ${pendentesQtd} pendente</span>` : '';

        conteudoHtml += `
          <div class="day-cell-meta">
            <span class="day-consultant-tag">Acompanhamento</span>
            ${tagAdminHtml}
            ${pillStatusHtml}
            ${tagPendenteHtml}
          </div>
        `;

        cell.onclick = () => {
          dataIsoSelecionada = dataIso;
          document.querySelectorAll('.cal-day-cell').forEach(c => c.classList.remove('selected'));
          cell.classList.add('selected');
          renderizarPainelDia(dataIso);
        };
      }

      cell.innerHTML = conteudoHtml;
      grid.appendChild(cell);
    }
  }

  function renderizarPainelDia(dataIso) {
    const elTitulo = document.getElementById('painel-dia-titulo');
    const elMeta = document.getElementById('painel-dia-meta');
    const containerSlots = document.getElementById('lista-slots-dia');

    if (!containerSlots) return;
    containerSlots.innerHTML = '';

    const slotsDoDia = slots.filter(s => s.dataIso === dataIso);

    if (slotsDoDia.length === 0) {
      const partes = dataIso.split('-');
      if (elTitulo) elTitulo.textContent = `${partes[2]}/${partes[1]}/${partes[0]}`;
      if (elMeta) elMeta.textContent = 'Não há plantão de acompanhamento previsto para este dia.';
      containerSlots.innerHTML = `
        <div style="text-align: center; padding: 40px 10px; color: #94a3b8;">
          <div style="font-size: 2.2rem; margin-bottom: 8px;">📅</div>
          <p style="font-size: 0.85rem;">Selecione um dos dias destacados com a etiqueta <strong>Acompanhamento</strong> no calendário.</p>
        </div>
      `;
      return;
    }

    const primeiro = slotsDoDia[0];
    const livres = slotsDoDia.filter(s => s.status === 'livre').length;
    const pendentes = slotsDoDia.filter(s => s.status === 'pendente').length;
    const isAdmin = ehAdministradorBruna();

    if (elTitulo) {
      elTitulo.textContent = `${primeiro.dataFormatada} — ${primeiro.diaSemana}`;
    }

    if (elMeta) {
      const consultorAdminInfo = isAdmin ? `<br><strong style="color: #2A3890;">👤 Consultor: ${primeiro.consultor} (${primeiro.trilha} • ${primeiro.modulos})</strong>` : '';
      const pendentesInfo = (isAdmin && pendentes > 0) ? `<br><span style="color: #d97706; font-weight: 700;">⏳ ${pendentes} solicitação(ões) aguardando sua confirmação</span>` : '';

      elMeta.innerHTML = `
        Acompanhamento • ${primeiro.periodoGeral} • <span style="color: #059669; font-weight: 700;">${livres} horários livres</span>
        ${consultorAdminInfo}
        ${pendentesInfo}
      `;
    }

    slotsDoDia.forEach(slot => {
      const st = obterStatusSlot(slot);
      const card = document.createElement('div');
      
      let cardClassExtra = '';
      if (st === 'pendente') cardClassExtra = 'card-pendente';
      else if (st === 'minha') cardClassExtra = 'card-minha';
      else if (st === 'reservado') cardClassExtra = 'card-ocupado';

      card.className = `slot-item-card ${cardClassExtra}`;

      let badgeHtml = '';
      let btnHtml = '';

      if (st === 'livre') {
        badgeHtml = `<span class="slot-badge-status badge-st-livre"><span class="dot-livre"></span> Livre</span>`;
        btnHtml = `<button class="btn-slot-agendar" onclick="abrirModal('${slot.id}')">Solicitar</button>`;
      } else if (st === 'pendente') {
        badgeHtml = `<span class="slot-badge-status badge-st-pendente"><span class="dot-pendente"></span> Aguardando Confirmação</span>`;
        if (isAdmin) {
          btnHtml = `
            <div style="display: flex; gap: 4px;">
              <button class="btn-aprovar-gestor" onclick="aprovarSolicitacaoGestor('${slot.id}')" title="Aprovar e confirmar reserva">✅ Aprovar</button>
              <button class="btn-recusar-gestor" onclick="recusarSolicitacaoGestor('${slot.id}')" title="Recusar e liberar horário">✕</button>
            </div>
          `;
        } else {
          btnHtml = `<span style="color: #d97706; font-size: 0.76rem; font-weight: 600;">Em aprovação</span>`;
        }
      } else {
        badgeHtml = `<span class="slot-badge-status badge-st-reservado"><span class="dot-reservado"></span> Reservado</span>`;
        if (isAdmin) {
          btnHtml = `<button class="btn-slot-cancelar" onclick="abrirModalCancelar('${slot.id}')" title="Apenas o Gestor pode liberar este horário">Liberar</button>`;
        } else {
          btnHtml = `<span style="color: #94a3b8; font-size: 0.78rem; font-weight: 600;">Confirmado</span>`;
        }
      }

      let infoTextoHtml = '';
      if (slot.reserva) {
        const statusTextoAprov = slot.status === 'pendente' 
          ? `<span style="color: #d97706; font-size: 0.72rem; font-weight: 700;">⏳ Aguardando aprovação da Bruna</span>`
          : `<span style="color: #059669; font-size: 0.72rem; font-weight: 700;">✅ Reserva Confirmada</span>`;

        infoTextoHtml = `
          <div class="slot-nome-destaque">${slot.reserva.nome}</div>
          <div class="slot-dept-destaque">${slot.reserva.departamento}</div>
          <div class="slot-assunto-destaque" title="${slot.reserva.assunto}">🎯 ${slot.reserva.assunto}</div>
          <div style="margin-top: 3px;">${statusTextoAprov}</div>
        `;
      } else {
        infoTextoHtml = `<div style="color: #64748b; font-size: 0.78rem;">Sessão de 30 min livre</div>`;
      }

      card.innerHTML = `
        <div class="slot-time-col">
          <div class="slot-time-text">${slot.horario}</div>
          ${badgeHtml}
        </div>
        <div class="slot-info-col">
          ${infoTextoHtml}
        </div>
        <div>
          ${btnHtml}
        </div>
      `;

      containerSlots.appendChild(card);
    });
  }

  window.abrirModal = function (slotId) {
    const s = slots.find(item => item.id === slotId);
    if (!s || s.status !== 'livre') return;

    slotSelecionado = s;

    const elResumo = document.getElementById('resumo-slot-modal');
    if (elResumo) {
      elResumo.innerHTML = `<strong>${s.dataFormatada} (${s.diaSemana}) às ${s.horario}</strong><br>Acompanhamento Transição MEGA`;
    }

    const inputNome = document.getElementById('input-nome');
    if (inputNome) inputNome.value = usuarioAtual;

    const modal = document.getElementById('modal-agendamento');
    if (modal) modal.classList.add('ativo');
  };

  window.salvarAgendamento = async function (e) {
    e.preventDefault();
    if (!slotSelecionado) return;

    const nome = document.getElementById('input-nome').value.trim();
    const dept = document.getElementById('input-dept').value.trim();
    const assunto = document.getElementById('input-assunto').value.trim();

    if (!nome || !dept || !assunto) return;

    usuarioAtual = nome;
    localStorage.setItem(STORAGE_USER, nome);
    const inputGlobal = document.getElementById('campo-usuario-global');
    if (inputGlobal) inputGlobal.value = nome;

    const reservaDados = {
      nome: nome,
      departamento: dept,
      assunto: assunto,
      dataSolicitacao: new Date().toISOString()
    };

    const slotAtual = slotSelecionado;
    fecharModal();

    // Envia ao servidor com status pendente
    const sucesso = await atualizarSlotServidor(slotAtual.id, 'pendente', reservaDados);
    if (sucesso) {
      exibirModalNotificacao(slotAtual, reservaDados);
    }
  };

  function exibirModalNotificacao(slot, reserva) {
    const elResumo = document.getElementById('resumo-sucesso-notif');
    if (elResumo) {
      elResumo.innerHTML = `
        <strong>Data:</strong> ${slot.dataFormatada} (${slot.diaSemana})<br>
        <strong>Horário:</strong> ${slot.horario}<br>
        <strong>Solicitante:</strong> ${reserva.nome} (${reserva.departamento})<br>
        <strong>Assunto:</strong> ${reserva.assunto}
      `;
    }

    // Monta texto formatado para WhatsApp
    const msgWhats = encodeURIComponent(
      `*Olá Bruna! Solicitação de Horário na Agenda MEGA*\n\n` +
      `👤 *Colaborador:* ${reserva.nome}\n` +
      `🏢 *Departamento:* ${reserva.departamento}\n` +
      `📅 *Data:* ${slot.dataFormatada} (${slot.diaSemana})\n` +
      `⏰ *Horário:* ${slot.horario}\n` +
      `🎯 *Assunto:* ${reserva.assunto}\n\n` +
      `Por favor, acesse o sistema para aprovar este agendamento.`
    );
    const btnWhats = document.getElementById('btn-link-whatsapp');
    if (btnWhats) {
      btnWhats.href = `https://api.whatsapp.com/send?phone=${BRUNA_WHATSAPP}&text=${msgWhats}`;
    }

    // Monta texto formatado para E-mail
    const assuntoEmail = encodeURIComponent(`Solicitação de Horário na Agenda MEGA - ${reserva.nome} (${slot.dataFormatada})`);
    const corpoEmail = encodeURIComponent(
      `Olá Bruna,\n\n` +
      `Foi solicitada uma reserva de horário no acompanhamento MEGA:\n\n` +
      `- Colaborador: ${reserva.nome}\n` +
      `- Departamento: ${reserva.departamento}\n` +
      `- Data: ${slot.dataFormatada} (${slot.diaSemana})\n` +
      `- Horário: ${slot.horario}\n` +
      `- Assunto: ${reserva.assunto}\n\n` +
      `Acesse a Área do Gestor para confirmar ou ajustar o horário.\n`
    );
    const btnEmail = document.getElementById('btn-link-email');
    if (btnEmail) {
      btnEmail.href = `mailto:${BRUNA_EMAIL}?subject=${assuntoEmail}&body=${corpoEmail}`;
    }

    const modalSucesso = document.getElementById('modal-sucesso-solicitacao');
    if (modalSucesso) modalSucesso.classList.add('ativo');
  }

  // Ações da Gestora Bruna
  window.aprovarSolicitacaoGestor = async function (slotId) {
    const s = slots.find(item => item.id === slotId);
    if (!s) return;
    if (confirm(`Aprovar a reserva de ${s.reserva ? s.reserva.nome : 'colaborador'} para ${s.dataFormatada} às ${s.horario}?`)) {
      await atualizarSlotServidor(slotId, 'confirmado', s.reserva);
    }
  };

  window.recusarSolicitacaoGestor = async function (slotId) {
    const s = slots.find(item => item.id === slotId);
    if (!s) return;
    if (confirm(`Recusar e liberar este horário (${s.dataFormatada} às ${s.horario}) de volta para a agenda?`)) {
      await atualizarSlotServidor(slotId, 'recusado', null);
    }
  };

  window.abrirModalCancelar = function (slotId) {
    const s = slots.find(item => item.id === slotId);
    if (!s) return;

    slotSelecionado = s;
    const elTexto = document.getElementById('texto-cancelar');
    if (elTexto) {
      elTexto.innerHTML = `Deseja cancelar o agendamento de <strong>${s.dataFormatada} às ${s.horario}</strong>?`;
    }

    const modal = document.getElementById('modal-cancelar');
    if (modal) modal.classList.add('ativo');
  };

  window.confirmarCancelamento = async function () {
    if (!slotSelecionado) return;
    const id = slotSelecionado.id;
    fecharModal();
    await atualizarSlotServidor(id, 'livre', null);
  };

  window.fecharModal = function () {
    document.querySelectorAll('.modal-overlay-cal').forEach(m => m.classList.remove('ativo'));
    slotSelecionado = null;
  };

})();
