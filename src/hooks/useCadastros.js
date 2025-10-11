import { useEffect, useState } from "react";
import {
  cadastrosAno,
  cadastroShowAll,
  cadastrosMesAnterior,
  idadeChefesFamiliares,
  ultimosCadastros,
  orientacaoSexualChefesFamiliares,
  estadoCivilChefesFamiliares,
  etniaChefesFamiliares
} from "../api/cadastrosApi";

export const useCadastro = () => {
  const [total, setTotal] = useState(0);
  const [mesAtual, setMesAtual] = useState(0);
  const [mesAnterior, setMesAnterior] = useState(0);
  const [anoAtual, setAnoAtual] = useState(0);
  const [loading, setLoading] = useState(true);
  const [idadesChefes, setIdadesChefes] = useState([]);
  const [orientacaoChefes, setOrientacaoChefes] = useState([])
  const [estadoCivilChefes, setEstadoCivilChefes] = useState([])
  const [etniaChefes, setEtniaChefes] = useState([])

  const fetchData = async () => {
    try {
      const all = await cadastroShowAll();
      const atual = await ultimosCadastros();
      const anterior = await cadastrosMesAnterior();
      const ano = await cadastrosAno();
      const idadesC = await idadeChefesFamiliares();
      const orientacaoSexualC = await orientacaoSexualChefesFamiliares()
      const estadoCivilC = await estadoCivilChefesFamiliares()
      const etniaC = await etniaChefesFamiliares()

      setTotal(all.length);
      setMesAtual(atual.length);
      setMesAnterior(anterior.length);
      setAnoAtual(ano.length);
      setIdadesChefes(idadesC);
      setOrientacaoChefes(orientacaoSexualC)
      setEstadoCivilChefes(estadoCivilC)
      setEtniaChefes(etniaC)
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return { total, mesAtual, mesAnterior, anoAtual, loading, idadesChefes, orientacaoChefes, estadoCivilChefes, etniaChefes };
};
