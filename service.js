lancamentos.push({ cpf: "74914372061", valor: 1234.78 });
lancamentos.push({ cpf: "74914372061", valor: -123.56 });
lancamentos.push({ cpf: "74914372061", valor: -865.0 });
lancamentos.push({ cpf: "41421980096", valor: -987 });
lancamentos.push({ cpf: "41421980096", valor: 123 });
lancamentos.push({ cpf: "41421980096", valor: -1225.9 });
lancamentos.push({ cpf: "05987701007", valor: 1267.39 });
lancamentos.push({ cpf: "05987701007", valor: 143.9 });
lancamentos.push({ cpf: "05987701007", valor: 23.4 });
lancamentos.push({ cpf: "93975495022", valor: 1943 });
lancamentos.push({ cpf: "93975495022", valor: 8000.21 });
lancamentos.push({ cpf: "93975495022", valor: 546.78 });

const validarEntradaDeDados = (lancamento) => {
  let resultado = "";
  const cpf = lancamento.cpf;
  const valor = lancamento.valor;
  if (!cpf || !valor) {
    return "input do cpf ou input do valor estão vazios";
  }

  const validacaoCpf = validarCpf(cpf);
  if (validacaoCpf) {
    resultado += validacaoCpf;
  }

  if (typeof valor !== "number") {
    resultado += "Valor deve ser numérico.\n";
  }

  if (valor < -2000 || valor > 15000) {
    resultado += "Valor deve estar entre -2000,00 e 15000,00.\n";
  }

  return resultado.length === 0 ? null : resultado;
};

const recuperarSaldosPorConta = (lancamentos) => {
  if (lancamentos.length === 0) {
    return [];
  }

  const hashTable = {};
  for (const lancamento of lancamentos) {
    const cpf = lancamento.cpf;
    const valor = lancamento.valor;

    if (!hashTable[cpf]) {
      hashTable[cpf] = Number(valor);
    } else {
      hashTable[cpf] += Number(valor);
    }
  }

  return Object.entries(hashTable).map(([cpf, valor]) => ({
    cpf,
    valor: valor,
  }));
};

const recuperarMaiorMenorLancamentos = (cpf, lancamentos) => {
  //melhorar função
  if (lancamentos.length === 0) {
    return [];
  }

  const hashTableMaiorValor = {};
  const hashTableMenorValor = {};

  for (const lancamento of lancamentos) {
    if (lancamento.cpf === cpf) {
      const valor = Number(lancamento.valor);

      if (!hashTableMaiorValor[cpf] || hashTableMaiorValor[cpf] > valor) {
        hashTableMaiorValor[cpf] = valor;
      }

      if (!hashTableMenorValor[cpf] || hashTableMenorValor[cpf] < valor) {
        hashTableMenorValor[cpf] = valor;
      }
    }
  }

  return !hashTableMaiorValor[cpf]
    ? []
    : [
        { cpf, valor: hashTableMaiorValor[cpf] },
        { cpf, valor: hashTableMenorValor[cpf] },
      ];
};

const recuperarMaioresSaldos = (lancamentos) => {
  const saldos = recuperarSaldosPorConta(lancamentos);

  const saldosEmOrdemDesc = saldos.sort((a, b) => {
    return b.valor - a.valor;
  });

  return saldosEmOrdemDesc.slice(0, 3);
};

const recuperarMaioresMedias = (lancamentos) => {
  const somaDeSaldosForaDeOrdem = recuperarSaldosPorConta(lancamentos);

  const hashTableRepeticaoCPF = {};
  lancamentos.forEach((lancamento) => {
    const cpf = lancamento.cpf;

    if (!hashTableRepeticaoCPF[cpf]) {
      hashTableRepeticaoCPF[cpf] = 1;
    } else {
      hashTableRepeticaoCPF[cpf] += 1;
    }
  });
  
  const medias = somaDeSaldosForaDeOrdem.map((soma) => {
    const media = Number(soma.valor)/Number(hashTableRepeticaoCPF[soma.cpf]);
    return {cpf: soma.cpf, valor: media};
  });

  const mediasOrdenadasDesc = medias.sort(
    (a, b) => b.valor - a.valor
  );

  return mediasOrdenadasDesc.slice(0, 3);
};
