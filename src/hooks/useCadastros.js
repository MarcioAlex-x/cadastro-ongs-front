import { useEffect, useState } from "react";
import {
    cadastrosAno,
  cadastroShowAll,
  cadastrosMesAnterior,
  ultimosCadastros,
  
} from "../api/cadastrosApi";

export const useCadastro = () => {
  const [total, setTotal] = useState(0);
  const [mesAtual, setMesAtual] = useState(0);
  const [mesAnterior, setMesAnterior] = useState(0);
  const [anoAtual, setAnoAtual] = useState(0)
  const [loading, setLoading] = useState(true);

    const fetchData = async () => {
      try {
        const all = await cadastroShowAll();
        const atual = await ultimosCadastros();
        const anterior = await cadastrosMesAnterior();
        const ano = await cadastrosAno()

        setTotal(all.length);
        setMesAtual(atual.length);
        setMesAnterior(anterior.length);
        setAnoAtual(ano.length)
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    useEffect(()=>{
      fetchData()
    },[])
  return { total, mesAtual, mesAnterior, anoAtual, loading }
};
