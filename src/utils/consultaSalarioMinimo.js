export const getSalarioMinimo = async () => {
  const hoje = new Date();
  const mesAnoAtual = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, '0')}`;

  // Tenta pegar do localStorage
  const salarioLocal = JSON.parse(localStorage.getItem('salarioMinimo') || '{}');

  if (salarioLocal.mesAno === mesAnoAtual && salarioLocal.valor) {
    return salarioLocal.valor;
  }

  // Consulta API do BCB
  const response = await fetch('https://api.bcb.gov.br/dados/serie/bcdata.sgs.1619/dados?formato=json');
  const dados = await response.json();

  // Pega o último valor
  const valorAtual = Number(dados[dados.length - 1].valor);

  // Salva no localStorage
  localStorage.setItem('salarioMinimo', JSON.stringify({ mesAno: mesAnoAtual, valor: valorAtual }));

  return valorAtual;
};
