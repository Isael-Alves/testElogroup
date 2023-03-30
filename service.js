const validarEntradaDeDados = (lancamento) => {
  let resultado = "";
  const cpf = lancamento.cpf;
  const valor = lancamento.valor;
  if (!cpf || !valor) {
    return "input do cpf ou input do valor estão vazios";
  }

  const validacaoCpf = validarCpf(cpf);
  if (validacaoCpf) resultado += validacaoCpf;

  if (typeof valor !== "number") resultado += "Valor deve ser numérico.\n";

  if (valor < -2000 || valor > 15000)
    resultado += "Valor deve estar entre -2000,00 e 15000,00.\n";

  return resultado.length === 0 ? null : resultado;
};

const recuperarSaldosPorConta = (lancamentos) => {
  if (lancamentos.length === 0) return [];

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
  // corrigir erro que ocorre quando se faz a verificação se a função for chamada separa
  const validacaoCpf = validarCpf(cpf);
  if (validacaoCpf) {
    alert(validacaoCpf);
    return;
  }

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
  if (lancamentos.length === 0) {
    return [];
  }

  const hashTableValores = {};
  let todosValores = [];

  for (const lancamento of lancamentos) {
    const cpf = lancamento.cpf;
    const valor = Number(lancamento.valor);

    if (!hashTableValores[valor]) {
      hashTableValores[valor] = cpf;
    }

    todosValores.push(valor);
  }

  todosValores.sort((a, b) => b - a);
  
  return [
    { cpf: hashTableValores[todosValores[0]], valor: todosValores[0] },
    { cpf: hashTableValores[todosValores[1]], valor: todosValores[1] },
    { cpf: hashTableValores[todosValores[2]], valor: todosValores[2] },
  ];
};

const recuperarMaioresMedias = (lancamentos) => {
  if (lancamentos.length === 0) return [];

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

  const mediasForaDeOrdem = Object.entries(hashTable).map(([cpf, valor]) => ({
    cpf,
    valor: valor,
  }));

  const mediasOrdenadasCresc = mediasForaDeOrdem.sort((a, b) => b.valor - a.valor);
 
  return mediasOrdenadasCresc.slice(0, 3);
};
