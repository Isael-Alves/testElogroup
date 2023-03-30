const validarCpf = (cpf) => {
  let result = "";
  const cpfRegex = /^\d{11}$/;
  if (!cpfRegex.test(cpf)) {
    result += "CPF deve conter apenas caracteres numéricos os quais devem ser 11 números.\n";
  }

  const cpfSplit = cpf.split("");
  const cpfDigitos = cpfSplit.slice(0, 9).map(Number);
  const cpfVerificador = cpfSplit.slice(9).map(Number);
  const cpfSoma1 = cpfDigitos.reduce((acc, cur, i) => acc + cur * (10 - i), 0);
  const cpfResto1 = cpfSoma1 % 11;
  const cpfDigito1 = cpfResto1 < 2 ? 0 : 11 - cpfResto1;

  const cpfSoma2 =
    cpfDigitos.reduce((acc, cur, i) => acc + cur * (11 - i), 0) +
    cpfDigito1 * 2;
  const cpfResto2 = cpfSoma2 % 11;
  const cpfDigito2 = cpfResto2 < 2 ? 0 : 11 - cpfResto2;

  if (cpfVerificador[1] !== cpfDigito2 || cpfVerificador[0] !== cpfDigito1) {
    result += "CPF é inválido, verifique se colocou os valores corretos.\n";
  }

  return result.length === 0 ? null : result;
};
