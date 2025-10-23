import { useEffect, useState } from "react";
import {
  cadastrosAno,
  cadastroShowAll,
  cadastrosMesAnterior,
  idadeChefesFamiliares,
  ultimosCadastros,
  orientacaoSexualChefesFamiliares,
  estadoCivilChefesFamiliares,
  etniaChefesFamiliares,
  seguroSocialChefes,
  deficienciaChefesFamiliares,
  situacaoMercadoTrabalhoChefes,
  tipoLocalidade,
  condicoesMoradia,
  coabitacaoFamiliar,
  tipoConstrucao,
  psfProximo,
  postoPolicialProximo,
  crecheProximo,
  pracaProximo,
  abastecimentoAgua,
  abastecimentoEnergia,
  esgotamentoSanitario,
  destinoLixo,
  mausTratos,
  violenciaDomestica,
  discriminacaoRejeicaoFamiliar,
  discriminacaoSocial,
  acessoSaude,
  acessoCultura,
} from "../api/cadastrosApi";

export const useCadastro = () => {
  const [total, setTotal] = useState(0);
  const [mesAtual, setMesAtual] = useState(0);
  const [mesAnterior, setMesAnterior] = useState(0);
  const [anoAtual, setAnoAtual] = useState(0);
  const [loading, setLoading] = useState(true);
  const [idadesChefes, setIdadesChefes] = useState([]);
  const [orientacaoChefes, setOrientacaoChefes] = useState([]);
  const [estadoCivilChefes, setEstadoCivilChefes] = useState([]);
  const [etniaChefes, setEtniaChefes] = useState([]);
  const [seguroChefes, setSeguroChefes] = useState([]);
  const [deficienciaChefes, setDeficienciaChefes] = useState([]);
  const [trabalhoChefes, setTrabalhoChefes] = useState([]);
  const [tipo, setTipo] = useState([]);
  const [condicoes, setCondicoes] = useState([]);
  const [coabitacao, setCoabitacao] = useState([]);
  const [construcao, setConstrucao] = useState([]);
  const [psf, setPsf] = useState([]);
  const [policial, setPolicial] = useState([]);
  const [creche, setCreche] = useState([]);
  const [praca, setPraca] = useState([]);
  const [agua, setAgua] = useState([]);
  const [esgoto, setEsgoto] = useState([]);
  const [energia, setEnergia] = useState([]);
  const [lixo, setLixo] = useState([]);
  const [mausTratosU, setMausTratosU] = useState([]);
  const [violenciaDomesticaU, setViolenciaDomesticaU] = useState([]);
  const [discriminacaoRejeicaoFamiliarU, setDiscriminacaoRejeicaoFamiliarU] =
    useState([]);
  const [discriminacaoSocialU, setDiscriminacaoSocialU] = useState([]);
  const [saude, setSaude] = useState([])
  const [cultura, setCultura] = useState([])

  const fetchData = async () => {
    try {
      const all = await cadastroShowAll();
      const atual = await ultimosCadastros();
      const anterior = await cadastrosMesAnterior();
      const ano = await cadastrosAno();
      const idadesC = await idadeChefesFamiliares();
      const orientacaoSexualC = await orientacaoSexualChefesFamiliares();
      const estadoCivilC = await estadoCivilChefesFamiliares();
      const etniaC = await etniaChefesFamiliares();
      const seguroC = await seguroSocialChefes();
      const deficienciaC = await deficienciaChefesFamiliares();
      const trabalhoC = await situacaoMercadoTrabalhoChefes();
      const tiposLocalidades = await tipoLocalidade();
      const condicoesMoradiaC = await condicoesMoradia();
      const coabitacaoC = await coabitacaoFamiliar();
      const construcaoC = await tipoConstrucao();
      const psfC = await psfProximo();
      const policialC = await postoPolicialProximo();
      const crecheC = await crecheProximo();
      const pracaC = await pracaProximo();
      const aguaC = await abastecimentoAgua();
      const energiaC = await abastecimentoEnergia();
      const lixoC = await destinoLixo();
      const esgotoC = await esgotamentoSanitario();
      const maustratos = await mausTratos();
      const violenciadomestica = await violenciaDomestica();
      const discriminacaoRejeicao = await discriminacaoRejeicaoFamiliar();
      const discriminacaosocial = await discriminacaoSocial();
      const acessocultura = await acessoCultura()
      const acessosaude = await acessoSaude()

      setTotal(all.length);
      setMesAtual(atual.length);
      setMesAnterior(anterior.length);
      setAnoAtual(ano.length);
      setIdadesChefes(idadesC);
      setOrientacaoChefes(orientacaoSexualC);
      setEstadoCivilChefes(estadoCivilC);
      setEtniaChefes(etniaC);
      setSeguroChefes(seguroC);
      setDeficienciaChefes(deficienciaC);
      setTrabalhoChefes(trabalhoC);
      setTipo(tiposLocalidades);
      setCondicoes(condicoesMoradiaC);
      setCoabitacao(coabitacaoC);
      setConstrucao(construcaoC);
      setPsf(psfC);
      setPolicial(policialC);
      setCreche(crecheC);
      setPraca(pracaC);
      setAgua(aguaC);
      setEnergia(energiaC);
      setLixo(lixoC);
      setEsgoto(esgotoC);
      setMausTratosU(maustratos);
      setViolenciaDomesticaU(violenciadomestica);
      setDiscriminacaoSocialU(discriminacaosocial);
      setDiscriminacaoRejeicaoFamiliarU(discriminacaoRejeicao);
      setSaude(acessosaude)
      setCultura(acessocultura)
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return {
    total,
    mesAtual,
    mesAnterior,
    anoAtual,
    loading,
    idadesChefes,
    orientacaoChefes,
    estadoCivilChefes,
    etniaChefes,
    seguroChefes,
    deficienciaChefes,
    trabalhoChefes,
    tipo,
    condicoes,
    coabitacao,
    construcao,
    psf,
    policial,
    creche,
    praca,
    agua,
    energia,
    lixo,
    esgoto,
    mausTratosU,
    violenciaDomesticaU,
    discriminacaoSocialU,
    discriminacaoRejeicaoFamiliarU,
    saude, 
    cultura
  };
};
