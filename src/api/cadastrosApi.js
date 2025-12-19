const url = import.meta.env.VITE_API_URL;
const fethcCadastro = async () => {
  try {
    const response = await fetch(`${url}/cadastro`, {
      credentials: "include",
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return err.message;
  }
};

const fetchDomicilio = async () => {
  try {
    const cadastros = await fethcCadastro();
    const pessoas = cadastros.flatMap((t) => t.pessoas);
    const domicilio = pessoas.flatMap((t) => t.domicilio);

    return domicilio;
  } catch (err) {
    console.error(err);
  }
};

const fetchAcesso = async () => {
  try {
    const cadastros = await fethcCadastro();
    const pessoas = cadastros.flatMap((t) => t.pessoas);
    const acessos = pessoas.flatMap((t) => t.acesso);

    return acessos;
  } catch (err) {
    console.error(err);
  }
};

const todasPessoas = async () => {
  const cadastros = await fethcCadastro();
  const todasPessoas = cadastros.flatMap((c) => c.pessoas);
  return todasPessoas;
};

const calcularIdade = (dataNascimento) => {
  const hoje = new Date();
  const nascimento = new Date(dataNascimento);
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const mes = hoje.getMonth() - nascimento.getMonth;

  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }
  return idade;
};

export const idadeChefesFamiliares = async () => {
  try {
    const pessoas = await todasPessoas();
    const idades = pessoas.map((p) => calcularIdade(p.data_nascimento));

    const faixaEtaria = {
      infantil: idades.filter((i) => i < 12).length,
      adolescente: idades.filter((i) => i >= 12 && i < 30).length,
      jovem_adulto: idades.filter((i) => i >= 30 && i < 40).length,
      adulto: idades.filter((i) => i >= 40 && i < 50).length,
      meia_idade: idades.filter((i) => i >= 50 && i < 60).length,
      idoso: idades.filter((i) => i >= 60).length,
    };

    return faixaEtaria;
  } catch (err) {
    console.error(err);
    return {};
  }
};

export const seguroSocialChefes = async () => {
  try {
    const pessoas = await todasPessoas();
    const beneficio = pessoas.map((p) => p.beneficio_seguro_social);

    const contagem = {
      Nenhum: 0,
      "Licença Médica": 0,
      Aposentadoria: 0,
      "Pensão Alimentícia": 0,
      "Seguro Desemprego": 0,
      "Bolsa Família": 0,
      BPC: 0,
    };

    beneficio.forEach((b) => {
      if (contagem[b] !== undefined) {
        contagem[b]++;
      }
    });

    return contagem;
  } catch (err) {
    console.error(err);
    return {};
  }
};

export const etniaChefesFamiliares = async () => {
  try {
    const pessoas = await todasPessoas();
    const etnias = pessoas.map((e) => e.etnia);

    const contagem = {
      Preto: 0,
      Branco: 0,
      Pardo: 0,
      Indígena: 0,
      Outro: 0,
    };

    etnias.forEach((u) => {
      if (contagem[u] !== undefined) {
        contagem[u]++;
      }
    });

    return contagem;
  } catch (err) {
    console.error(err);
    return {};
  }
};

export const orientacaoSexualChefesFamiliares = async () => {
  try {
    const pessoas = await todasPessoas();
    const orientacoes = pessoas.map((p) => p.orientacao_sexual);

    const contagem = {
      Hétero: 0,
      Gay: 0,
      Lésbica: 0,
      Bissexual: 0,
      Assexual: 0,
      Pansexual: 0,
    };

    orientacoes.forEach((o) => {
      if (contagem[o] !== undefined) {
        contagem[o]++;
      }
    });

    return contagem;
  } catch (err) {
    console.error(err);
    return {};
  }
};

export const estadoCivilChefesFamiliares = async () => {
  try {
    const pessoas = await todasPessoas();
    const estadoCivil = pessoas.map((p) => p.estado_civil);

    const contagem = {
      Casado: 0,
      Solteiro: 0,
      Divorciado: 0,
      Viúvo: 0,
    };

    estadoCivil.forEach((e) => {
      if (contagem[e] !== undefined) {
        contagem[e]++;
      }
    });

    return contagem;
  } catch (err) {
    console.error(err);
    return {};
  }
};

export const deficienciaChefesFamiliares = async () => {
  try {
    const pessoas = await todasPessoas();
    const deficiencia = pessoas.map((d) => d.deficiencia);

    const contagem = {
      Sim: 0,
      'Não': 0,
    };

    deficiencia.forEach((e) => {
      if (contagem[e] !== undefined) {
        contagem[e]++;
      }
    });

    return contagem;
  } catch (err) {
    console.error(err);
    return {};
  }
};

export const situacaoMercadoTrabalhoChefes = async () => {
  try {
    const pessoas = await todasPessoas();
    const situacao = pessoas.map((p) => p.situacao_mercado_trabalho);

    const contagem = {
      Empregado: 0,
      Desempregado: 0,
      Autônomo: 0,
      Subemprego: 0,
      Estudante: 0,
      "Estágio Remunerado": 0,
    };

    situacao.forEach((s) => {
      if (contagem[s] !== undefined) {
        contagem[s]++;
      }
    });

    return contagem;
  } catch (err) {
    console.error(err);
    return {};
  }
};

export const cadastroShowAll = async () => await fethcCadastro();

export const cadastrosMesAnterior = async () => {
  const cadastros = await fethcCadastro();

  const hoje = new Date();
  let mesAnterior = hoje.getMonth();
  let anoAnterior = hoje.getFullYear();

  if (mesAnterior === 0) {
    mesAnterior = 11;
    anoAnterior -= 1;
  } else {
    mesAnterior -= 1;
  }

  return cadastros.filter((el) => {
    const data = new Date(el.createdAt);
    return (
      data.getMonth() === mesAnterior && data.getFullYear() === anoAnterior
    );
  });
};

export const ultimosCadastros = async () => {
  const cadastros = await fethcCadastro();
  const hoje = new Date();
  const mesAtual = hoje.getMonth();
  const anoAtual = hoje.getFullYear();

  return cadastros.filter((el) => {
    const data = new Date(el.createdAt);
    return data.getMonth() === mesAtual && data.getFullYear() === anoAtual;
  });
};

export const cadastrosAno = async () => {
  const cadastros = await fethcCadastro();
  const hoje = new Date();
  const anoAtual = hoje.getFullYear();

  return cadastros.filter((el) => {
    const data = new Date(el.createdAt);
    return data.getFullYear() === anoAtual;
  });
};

// =============Domicílio=================//

export const tipoLocalidade = async () => {
  try {
    const domicilio = await fetchDomicilio();
    const tipoLocalidade = domicilio.map((e) => e.tipo_localidade);

    const contagem = {
      Rural: 0,
      Urbana: 0,
    };

    tipoLocalidade.forEach((e) => {
      if (contagem[e] !== undefined) {
        contagem[e]++;
      }
    });

    return contagem;
  } catch (err) {
    console.error(err);
    return {};
  }
};

export const condicoesMoradia = async () => {
  try {
    const domicilio = await fetchDomicilio();
    const condicoesMoradia = domicilio.map((e) => e.condicoes_moradia);

    const contagem = {
      Própria: 0,
      Alugada: 0,
      Cedido: 0,
      Invadido: 0,
      República: 0,
      "Residência Estudantil": 0,
      "Moradia Compartilhada": 0,
      Outro: 0,
    };

    condicoesMoradia.forEach((e) => {
      if (contagem[e] !== undefined) {
        contagem[e]++;
      }
    });

    return contagem;
  } catch (err) {
    console.error(err);
    return {};
  }
};

export const coabitacaoFamiliar = async () => {
  try {
    const domicilio = await fetchDomicilio();
    const coabitacao = domicilio.map((e) => e.situacao_coabitacao_familiar);

    const contagem = {
      Sim: 0,
      'Não': 0,
    };

    coabitacao.forEach((e) => {
      if (contagem[e] !== undefined) {
        contagem[e]++;
      }
    });

    return contagem;
  } catch (err) {
    console.error(err);
    return {};
  }
};

export const tipoConstrucao = async () => {
  try {
    const domicilio = await fetchDomicilio();
    const construcao = domicilio.map((e) => e.tipo_constucao);

    const contagem = {
      Alvenaria: 0,
      Taipa: 0,
      "Materiais Recicláveis": 0,
    };

    construcao.forEach((e) => {
      if (contagem[e] !== undefined) {
        contagem[e]++;
      }
    });

    return contagem;
  } catch (err) {
    console.error(err);
    return {};
  }
};

export const psfProximo = async () => {
  try {
    const domicilio = await fetchDomicilio();
    const psf = domicilio.map((e) => e.psf_proximo);

    const contagem = {
      Sim: 0,
      'Não': 0,
    };

    psf.forEach((e) => {
      if (contagem[e] !== undefined) {
        contagem[e]++;
      }
    });

    return contagem;
  } catch (err) {
    console.error(err);
    return {};
  }
};

export const postoPolicialProximo = async () => {
  try {
    const domicilio = await fetchDomicilio();
    const postoPolicial = domicilio.map((e) => e.posto_policia_proximo);

    const contagem = {
      Sim: 0,
      'Não': 0,
    };

    postoPolicial.forEach((e) => {
      if (contagem[e] !== undefined) {
        contagem[e]++;
      }
    });

    return contagem;
  } catch (err) {
    console.error(err);
    return {};
  }
};

export const crecheProximo = async () => {
  try {
    const domicilio = await fetchDomicilio();
    const creche = domicilio.map((e) => e.creche_proximo);

    const contagem = {
      Sim: 0,
      'Não': 0,
    };

    creche.forEach((e) => {
      if (contagem[e] !== undefined) {
        contagem[e]++;
      }
    });

    return contagem;
  } catch (err) {
    console.error(err);
    return {};
  }
};

export const pracaProximo = async () => {
  try {
    const domicilio = await fetchDomicilio();
    const praca = domicilio.map((e) => e.praca_proximo);

    const contagem = {
      Sim: 0,
      'Não': 0,
    };

    praca.forEach((e) => {
      if (contagem[e] !== undefined) {
        contagem[e]++;
      }
    });

    return contagem;
  } catch (err) {
    console.error(err);
    return {};
  }
};

export const abastecimentoAgua = async () => {
  try {
    const domicilio = await fetchDomicilio();
    const agua = domicilio.map((e) => e.abastecimento_agua);

    const contagem = {
      "Rede Pública": 0,
      Poço: 0,
      "Ligação Clandestina": 0,
    };

    agua.forEach((e) => {
      if (contagem[e] !== undefined) {
        contagem[e]++;
      }
    });

    return contagem;
  } catch (err) {
    console.error(err);
    return {};
  }
};

export const abastecimentoEnergia = async () => {
  try {
    const domicilio = await fetchDomicilio();
    const energia = domicilio.map((e) => e.abastecimento_energia);

    const contagem = {
      "Medidor Próprio": 0,
      "Medidor Compartilhado": 0,
      "Sem Medidor": 0,
      "Ligação Clandestina": 0,
    };

    energia.forEach((e) => {
      if (contagem[e] !== undefined) {
        contagem[e]++;
      }
    });

    return contagem;
  } catch (err) {
    console.error(err);
    return {};
  }
};

export const esgotamentoSanitario = async () => {
  try {
    const domicilio = await fetchDomicilio();
    const esgoto = domicilio.map((e) => e.esgotamento_sanitario);

    const contagem = {
      "Rede Pública": 0,
      Fossa: 0,
      "Céu Aberto": 0,
      Rio: 0,
    };

    esgoto.forEach((e) => {
      if (contagem[e] !== undefined) {
        contagem[e]++;
      }
    });

    return contagem;
  } catch (err) {
    console.error(err);
    return {};
  }
};

export const destinoLixo = async () => {
  try {
    const domicilio = await fetchDomicilio();
    const lixo = domicilio.map((e) => e.destino_lixo);

    const contagem = {
      Coletado: 0,
      "Céu Aberto": 0,
      Queimado: 0,
      Enterrado: 0,
    };

    lixo.forEach((e) => {
      if (contagem[e] !== undefined) {
        contagem[e]++;
      }
    });

    return contagem;
  } catch (err) {
    console.error(err);
    return {};
  }
};

// =============Acesso/Vulnerabilidade=================//

export const mausTratos = async () => {
  try {
    const vulnerabilidade = await fetchAcesso();
    const maustratos = vulnerabilidade.map((e) => e.maus_tratos);

    const contagem = {
      Sim: 0,
      'Não': 0,
    };

    maustratos.forEach((e) => {
      if (contagem[e] !== undefined) {
        contagem[e]++;
      }
    });

    return contagem;
  } catch (err) {
    console.error(err);
    return {};
  }
};

export const violenciaDomestica = async () => {
  try {
    const vulnerabilidade = await fetchAcesso();
    const violenciadomestica = vulnerabilidade.map((e) => e.violencia_domestica);

    const contagem = {
      Sim: 0,
      'Não': 0,
    };

    violenciadomestica.forEach((e) => {
      if (contagem[e] !== undefined) {
        contagem[e]++;
      }
    });

    return contagem;
  } catch (err) {
    console.error(err);
    return {};
  }
};

export const discriminacaoRejeicaoFamiliar = async () => {
  try {
    const vulnerabilidade = await fetchAcesso();
    const rejeicaofamiliar = vulnerabilidade.map((e) => e.discriminacao_rejeicao_familiar);

    const contagem = {
      Sim: 0,
      'Não': 0,
    };

    rejeicaofamiliar.forEach((e) => {
      if (contagem[e] !== undefined) {
        contagem[e]++;
      }
    });

    return contagem;
  } catch (err) {
    console.error(err);
    return {};
  }
};

export const discriminacaoSocial = async () => {
  try {
    const vulnerabilidade = await fetchAcesso();
    const discriminacaosocial = vulnerabilidade.map((e) => e.discriminacao_social_etnico_racial_sexual);

    const contagem = {
      Sim: 0,
      'Não': 0,
    };

    discriminacaosocial.forEach((e) => {
      if (contagem[e] !== undefined) {
        contagem[e]++;
      }
    });

    return contagem;
  } catch (err) {
    console.error(err);
    return {};
  }
};

export const acessoSaude = async () => {
  try {
    const vulnerabilidade = await fetchAcesso();
    const acessosaude = vulnerabilidade.map((e) => e.acesso_saude);

    const contagem = {
      Sim: 0,
      'Não': 0,
    };

    acessosaude.forEach((e) => {
      if (contagem[e] !== undefined) {
        contagem[e]++;
      }
    });

    return contagem;
  } catch (err) {
    console.error(err);
    return {};
  }
};

export const acessoCultura = async () => {
  try {
    const vulnerabilidade = await fetchAcesso();
    const acessocultura = vulnerabilidade.map((e) => e.acesso_esporte_cultura_lazer);

    const contagem = {
      Sim: 0,
      'Não': 0,
    };

    acessocultura.forEach((e) => {
      if (contagem[e] !== undefined) {
        contagem[e]++;
      }
    });

    return contagem;
  } catch (err) {
    console.error(err);
    return {};
  }
};
