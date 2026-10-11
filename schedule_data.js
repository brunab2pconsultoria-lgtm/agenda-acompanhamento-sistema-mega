/**
 * Base de Dados Inicial - Agenda de Acompanhamento Extra Projeto Transição MEGA · Arpol
 * Consultores: Cybelle (Backoffice) & Lucicleiton (Serviços e Contratos)
 */

const DIAS_SEMANA = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

const PROGRAMACAO_ORIGINAL = [
  // --- BACKOFFICE (Cybelle) ---
  {
    dataStr: '2026-10-15',
    consultor: 'Cybelle',
    trilha: 'Backoffice',
    modulos: 'Financeiro, materiais, vendas',
    periodoTipo: '09-13Hs',
    tipoAgenda: 'Remota',
    slots: [
      '09:00 - 09:30', '09:30 - 10:00', '10:00 - 10:30', '10:30 - 11:00',
      '11:00 - 11:30', '11:30 - 12:00', '12:00 - 12:30', '12:30 - 13:00'
    ]
  },
  {
    dataStr: '2026-10-19',
    consultor: 'Cybelle',
    trilha: 'Backoffice',
    modulos: 'Financeiro, materiais, vendas',
    periodoTipo: '14-18Hs',
    tipoAgenda: 'Remota',
    slots: [
      '14:00 - 14:30', '14:30 - 15:00', '15:00 - 15:30', '15:30 - 16:00',
      '16:00 - 16:30', '16:30 - 17:00', '17:00 - 17:30', '17:30 - 18:00'
    ]
  },
  {
    dataStr: '2026-10-26',
    consultor: 'Cybelle',
    trilha: 'Backoffice',
    modulos: 'Financeiro, materiais, vendas',
    periodoTipo: '09-13Hs',
    tipoAgenda: 'Remota',
    slots: [
      '09:00 - 09:30', '09:30 - 10:00', '10:00 - 10:30', '10:30 - 11:00',
      '11:00 - 11:30', '11:30 - 12:00', '12:00 - 12:30', '12:30 - 13:00'
    ]
  },
  {
    dataStr: '2026-11-03',
    consultor: 'Cybelle',
    trilha: 'Backoffice',
    modulos: 'Financeiro, materiais, vendas',
    periodoTipo: '09-13Hs',
    tipoAgenda: 'Remota',
    slots: [
      '09:00 - 09:30', '09:30 - 10:00', '10:00 - 10:30', '10:30 - 11:00',
      '11:00 - 11:30', '11:30 - 12:00', '12:00 - 12:30', '12:30 - 13:00'
    ]
  },
  {
    dataStr: '2026-11-09',
    consultor: 'Cybelle',
    trilha: 'Backoffice',
    modulos: 'Financeiro, materiais, vendas',
    periodoTipo: '09-13Hs',
    tipoAgenda: 'Remota',
    slots: [
      '09:00 - 09:30', '09:30 - 10:00', '10:00 - 10:30', '10:30 - 11:00',
      '11:00 - 11:30', '11:30 - 12:00', '12:00 - 12:30', '12:30 - 13:00'
    ]
  },
  {
    dataStr: '2026-11-16',
    consultor: 'Cybelle',
    trilha: 'Backoffice',
    modulos: 'Financeiro, materiais, vendas',
    periodoTipo: '09-13Hs',
    tipoAgenda: 'Remota',
    slots: [
      '09:00 - 09:30', '09:30 - 10:00', '10:00 - 10:30', '10:30 - 11:00',
      '11:00 - 11:30', '11:30 - 12:00', '12:00 - 12:30', '12:30 - 13:00'
    ]
  },
  {
    dataStr: '2026-11-23',
    consultor: 'Cybelle',
    trilha: 'Backoffice',
    modulos: 'Financeiro, materiais, vendas',
    periodoTipo: '09-13Hs',
    tipoAgenda: 'Remota',
    slots: [
      '09:00 - 09:30', '09:30 - 10:00', '10:00 - 10:30', '10:30 - 11:00',
      '11:00 - 11:30', '11:30 - 12:00', '12:00 - 12:30', '12:30 - 13:00'
    ]
  },
  {
    dataStr: '2026-11-30',
    consultor: 'Cybelle',
    trilha: 'Backoffice',
    modulos: 'Financeiro, materiais, vendas',
    periodoTipo: '09-13Hs',
    tipoAgenda: 'Remota',
    slots: [
      '09:00 - 09:30', '09:30 - 10:00', '10:00 - 10:30', '10:30 - 11:00',
      '11:00 - 11:30', '11:30 - 12:00', '12:00 - 12:30', '12:30 - 13:00'
    ]
  },
  {
    dataStr: '2026-12-07',
    consultor: 'Cybelle',
    trilha: 'Backoffice',
    modulos: 'Financeiro, materiais, vendas',
    periodoTipo: '09-13Hs',
    tipoAgenda: 'Remota',
    slots: [
      '09:00 - 09:30', '09:30 - 10:00', '10:00 - 10:30', '10:30 - 11:00',
      '11:00 - 11:30', '11:30 - 12:00', '12:00 - 12:30', '12:30 - 13:00'
    ]
  },
  {
    dataStr: '2026-12-14',
    consultor: 'Cybelle',
    trilha: 'Backoffice',
    modulos: 'Financeiro, materiais, vendas',
    periodoTipo: '09-13Hs',
    tipoAgenda: 'Remota',
    slots: [
      '09:00 - 09:30', '09:30 - 10:00', '10:00 - 10:30', '10:30 - 11:00',
      '11:00 - 11:30', '11:30 - 12:00', '12:00 - 12:30', '12:30 - 13:00'
    ]
  },
  {
    dataStr: '2027-01-04',
    consultor: 'Cybelle',
    trilha: 'Backoffice',
    modulos: 'Financeiro, materiais, vendas',
    periodoTipo: '08-17Hs',
    tipoAgenda: 'Remota',
    slots: [
      // Manhã
      '08:00 - 08:30', '08:30 - 09:00', '09:00 - 09:30', '09:30 - 10:00',
      '10:00 - 10:30', '10:30 - 11:00', '11:00 - 11:30', '11:30 - 12:00',
      // Tarde (12:00 - 13:00 Intervalo Almoço)
      '13:00 - 13:30', '13:30 - 14:00', '14:00 - 14:30', '14:30 - 15:00',
      '15:00 - 15:30', '15:30 - 16:00', '16:00 - 16:30', '16:30 - 17:00'
    ]
  },
  {
    dataStr: '2027-01-05',
    consultor: 'Cybelle',
    trilha: 'Backoffice',
    modulos: 'Financeiro, materiais, vendas',
    periodoTipo: '08-17Hs',
    tipoAgenda: 'Remota',
    slots: [
      // Manhã
      '08:00 - 08:30', '08:30 - 09:00', '09:00 - 09:30', '09:30 - 10:00',
      '10:00 - 10:30', '10:30 - 11:00', '11:00 - 11:30', '11:30 - 12:00',
      // Tarde
      '13:00 - 13:30', '13:30 - 14:00', '14:00 - 14:30', '14:30 - 15:00',
      '15:00 - 15:30', '15:30 - 16:00', '16:00 - 16:30', '16:30 - 17:00'
    ]
  },
  {
    dataStr: '2027-01-11',
    consultor: 'Cybelle',
    trilha: 'Backoffice',
    modulos: 'Financeiro, materiais, vendas',
    periodoTipo: '09-13Hs',
    tipoAgenda: 'Remota',
    slots: [
      '09:00 - 09:30', '09:30 - 10:00', '10:00 - 10:30', '10:30 - 11:00',
      '11:00 - 11:30', '11:30 - 12:00', '12:00 - 12:30', '12:30 - 13:00'
    ]
  },

  // --- SERVIÇOS & CONTRATOS (Lucicleiton) ---
  {
    dataStr: '2026-10-14',
    consultor: 'Lucicleiton',
    trilha: 'Serviços',
    modulos: 'Serviços e contratos',
    periodoTipo: '08-12Hs',
    tipoAgenda: 'Remota',
    slots: [
      '08:00 - 08:30', '08:30 - 09:00', '09:00 - 09:30', '09:30 - 10:00',
      '10:00 - 10:30', '10:30 - 11:00', '11:00 - 11:30', '11:30 - 12:00'
    ]
  },
  {
    dataStr: '2026-10-21',
    consultor: 'Lucicleiton',
    trilha: 'Serviços',
    modulos: 'Serviços e contratos',
    periodoTipo: '08-12Hs',
    tipoAgenda: 'Remota',
    slots: [
      '08:00 - 08:30', '08:30 - 09:00', '09:00 - 09:30', '09:30 - 10:00',
      '10:00 - 10:30', '10:30 - 11:00', '11:00 - 11:30', '11:30 - 12:00'
    ]
  },
  {
    dataStr: '2026-10-28',
    consultor: 'Lucicleiton',
    trilha: 'Serviços',
    modulos: 'Serviços e contratos',
    periodoTipo: '08-12Hs',
    tipoAgenda: 'Remota',
    slots: [
      '08:00 - 08:30', '08:30 - 09:00', '09:00 - 09:30', '09:30 - 10:00',
      '10:00 - 10:30', '10:30 - 11:00', '11:00 - 11:30', '11:30 - 12:00'
    ]
  },
  {
    dataStr: '2026-10-30',
    consultor: 'Lucicleiton',
    trilha: 'Serviços',
    modulos: 'Serviços e contratos',
    periodoTipo: '08-12Hs',
    tipoAgenda: 'Remota',
    slots: [
      '08:00 - 08:30', '08:30 - 09:00', '09:00 - 09:30', '09:30 - 10:00',
      '10:00 - 10:30', '10:30 - 11:00', '11:00 - 11:30', '11:30 - 12:00'
    ]
  },
  {
    dataStr: '2026-11-18',
    consultor: 'Lucicleiton',
    trilha: 'Serviços',
    modulos: 'Serviços e contratos',
    periodoTipo: '08-12Hs',
    tipoAgenda: 'Remota',
    slots: [
      '08:00 - 08:30', '08:30 - 09:00', '09:00 - 09:30', '09:30 - 10:00',
      '10:00 - 10:30', '10:30 - 11:00', '11:00 - 11:30', '11:30 - 12:00'
    ]
  },
  {
    dataStr: '2026-11-25',
    consultor: 'Lucicleiton',
    trilha: 'Serviços',
    modulos: 'Serviços e contratos',
    periodoTipo: '08-12Hs',
    tipoAgenda: 'Remota',
    slots: [
      '08:00 - 08:30', '08:30 - 09:00', '09:00 - 09:30', '09:30 - 10:00',
      '10:00 - 10:30', '10:30 - 11:00', '11:00 - 11:30', '11:30 - 12:00'
    ]
  },
  {
    dataStr: '2026-12-02',
    consultor: 'Lucicleiton',
    trilha: 'Serviços',
    modulos: 'Serviços e contratos',
    periodoTipo: '08-12Hs',
    tipoAgenda: 'Remota',
    slots: [
      '08:00 - 08:30', '08:30 - 09:00', '09:00 - 09:30', '09:30 - 10:00',
      '10:00 - 10:30', '10:30 - 11:00', '11:00 - 11:30', '11:30 - 12:00'
    ]
  },
  {
    dataStr: '2026-12-09',
    consultor: 'Lucicleiton',
    trilha: 'Serviços',
    modulos: 'Serviços e contratos',
    periodoTipo: '08-12Hs',
    tipoAgenda: 'Remota',
    slots: [
      '08:00 - 08:30', '08:30 - 09:00', '09:00 - 09:30', '09:30 - 10:00',
      '10:00 - 10:30', '10:30 - 11:00', '11:00 - 11:30', '11:30 - 12:00'
    ]
  },
  {
    dataStr: '2026-12-16',
    consultor: 'Lucicleiton',
    trilha: 'Serviços',
    modulos: 'Serviços e contratos',
    periodoTipo: '08-12Hs',
    tipoAgenda: 'Remota',
    slots: [
      '08:00 - 08:30', '08:30 - 09:00', '09:00 - 09:30', '09:30 - 10:00',
      '10:00 - 10:30', '10:30 - 11:00', '11:00 - 11:30', '11:30 - 12:00'
    ]
  },
  {
    dataStr: '2027-01-08',
    consultor: 'Lucicleiton',
    trilha: 'Serviços',
    modulos: 'Serviços e contratos',
    periodoTipo: '08-12Hs',
    tipoAgenda: 'Remota',
    slots: [
      '08:00 - 08:30', '08:30 - 09:00', '09:00 - 09:30', '09:30 - 10:00',
      '10:00 - 10:30', '10:30 - 11:00', '11:00 - 11:30', '11:30 - 12:00'
    ]
  }
];

/**
 * Gera lista plana de todos os slots de horários
 */
function gerarCatalogoSlotsIniciais() {
  const listaSlots = [];

  PROGRAMACAO_ORIGINAL.forEach(item => {
    // Quebrar data YYYY-MM-DD
    const partes = item.dataStr.split('-');
    const dataObj = new Date(parseInt(partes[0]), parseInt(partes[1]) - 1, parseInt(partes[2]));
    const diaSemana = DIAS_SEMANA[dataObj.getDay()];
    const dataFormatada = `${partes[2]}/${partes[1]}/${partes[0]}`;

    item.slots.forEach(slotHorario => {
      const horaClean = slotHorario.replace(/[^0-9]/g, '');
      const id = `${item.dataStr}_${horaClean}_${item.consultor.toLowerCase()}`;

      listaSlots.push({
        id: id,
        dataIso: item.dataStr,
        dataFormatada: dataFormatada,
        diaSemana: diaSemana,
        horario: slotHorario,
        consultor: item.consultor,
        trilha: item.trilha,
        modulos: item.modulos,
        periodoGeral: item.periodoTipo,
        tipoAgenda: item.tipoAgenda,
        status: 'livre', // 'livre' ou 'reservado'
        reserva: null    // { nome, departamento, assunto, reservadoEm, usuarioId }
      });
    });
  });

  return listaSlots;
}

// Exporta globalmente para uso no browser
window.CATALOGO_SLOTS_PADRAO = gerarCatalogoSlotsIniciais();
