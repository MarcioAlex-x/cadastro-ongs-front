export const formatarData = (dataString) => {
  if (!dataString) return "Não informado!";
  const partes = dataString.split("-");
  return `${partes[2]}/${partes[1]}/${partes[0]}`;
};

export const formatarDataCriacaoAtualizacao = (dataString) => {
  if (!dataString) return "Não informado";
  const diaMesAno = dataString.slice(0, 10);
  const partes = diaMesAno.split("-");
  return `${partes[2]}/${partes[1]}/${partes[0]}`;
};

export const captalizeString = (dataString) => {
  if (!dataString) return "Não informado";
  const capitalizedString =
    dataString.charAt(0).toUpperCase() + dataString.slice(1);
  return capitalizedString;
};

export const realMonetario = (dataReal) => {
  if (!dataReal) return "Não informado";
  const valor = Number(dataReal);

  return valor.toLocaleString("pt-BR", {
    styles: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const respostaFormatada = (resposta) =>{
  if(resposta === 'nao'){
    return 'Não'
  }else{
    return 'Sim'
  }
}
