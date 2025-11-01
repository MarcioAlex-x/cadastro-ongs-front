import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
const url = import.meta.env.VITE_API_URL;
import { getSalarioMinimo } from "../../utils/consultaSalarioMinimo";
import styles from './DadosAnaliticos.module.css'
import { BsFilePdfFill } from "react-icons/bs";

export const DadosAnaliticos = () => {
    const [dadosGrafico, setDadosGrafico] = useState([]);
    const [salarioMinimo, setSalarioMinimo] = useState(0);


    const calcularRisco = (usuario, salarioMinimo) => {
        let pontos = 0;
        const pessoa = usuario.pessoas?.[0]
        if(!pessoa) return 'Regular'

        const renda = Number(pessoa.renda)
        const acesso = pessoa.acesso || {}
        const domicilio = pessoa.domicilio || {}

        if (renda < salarioMinimo) pontos += 2;
        else if (usuario.renda < salarioMinimo * 2) pontos += 1;

        if (acesso.acesso_saude !== "Sim") pontos += 2;
        if (acesso.acesso_esporte_cultura_lazer !== "Sim") pontos += 1;

        if (acesso.maus_tratos === "Sim") pontos += 3;
        if (acesso.violencia_domestica === "Sim") pontos += 3;

        if (acesso.discriminacao_rejeicao_familiar === "Sim") pontos += 2;
        if (acesso.discriminacao_social_etnico_racial_sexual === "Sim") pontos += 2;

        if (pessoa.apoio_renda_primaria === "Nenhum") pontos += 1;
        if (pessoa.beneficio_seguro_social === "Nenhum") pontos += 1;

        if (domicilio.esgotamento_sanitario === "Céu aberto" || domicilio.esgotamento_sanitario === 'Rio') pontos += 2;
        if(domicilio.destino_lixo === 'Queimado' || domicilio.destino_lixo === 'Céu aberto') pontos += 2

        if (pontos <= 2) return "Regular";
        if (pontos <= 4) return "Médio";
        if (pontos <= 6) return "Atenção";
        if (pontos <= 8) return "Risco";
        return "Crítico";
    };

    useEffect(() => {
        const fetchDados = async () => {
            try {
                const salario = await getSalarioMinimo();
                setSalarioMinimo(salario)
                const response = await fetch(`${url}/cadastro`, {
                    method: "GET",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                });
                const data = await response.json();

                const contadores = {
                    Regular: 0,
                    Médio: 0,
                    Atenção: 0,
                    Risco: 0,
                    Crítico: 0,
                };

                data.forEach((usuario) => {
                    const categoria = calcularRisco(usuario, salarioMinimo);
                    contadores[categoria]++;
                });

                // Transformar em array para o gráfico
                const dados = Object.keys(contadores).map((chave) => ({
                    categoria: chave,
                    quantidade: contadores[chave],
                }));

                setDadosGrafico(dados);
            } catch (err) {
                console.error(err);
            }
        };

        fetchDados();
    }, []);

    return (
        <>
            <div style={{ width: "100%", height: 400 }}>
                <div className='d-flex justify-content-between align-items-center'>
                    <h2 className={`${styles['font-title']} fs-4`}>Análises de Riscos</h2>
                    <div className={styles.horizontalRow}></div>
                </div>
                <ResponsiveContainer width="100%" height='100%'>
                    <BarChart data={dadosGrafico} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="categoria" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="quantidade" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className={`border rounded bg-light mt-5 p-5`}>
                <h3  className={`${styles['font-title']} fs-2 text-center mb-5`} >Como os riscos são calculados</h3>
                <div className={`${styles['font-text']}`}>
                    <p>
                        Cada família é avaliada com base em diversos fatores, somando pontos de risco:
                    </p>
                    <ul style={{listStyle:'none'}}>
                        <li><strong>Renda familiar:</strong> menor que o salário mínimo atual = 2 pontos, até 2x o salário mínimo = 1 ponto;</li>
                        <li><strong>Acesso à saúde:</strong> sem acesso = 2 pontos;</li>
                        <li><strong>Acesso a esportes, cultura e lazer:</strong> sem acesso = 1 ponto;</li>
                        <li><strong>Maus-tratos ou violência doméstica:</strong> cada ocorrência = 3 pontos;</li>
                        <li><strong>Discriminação familiar ou social:</strong> cada ocorrência = 2 pontos;</li>
                        <li><strong>Apoio de renda e benefícios:</strong> ausência de apoio ou benefício = 1 ponto cada;</li>
                        <li><strong>Condições de moradia:</strong> esgotamento sanitário precário (despejado a céu aberto ou  em rios) = 2 pontos;</li>
                    </ul>
                    <p>
                        A soma dos pontos define a categoria de risco da família:
                    </p>
                    <ul style={{listStyle:'none'}}>
                        <li>0–2 pontos: <strong>Regular</strong></li>
                        <li>3–4 pontos: <strong>Médio</strong></li>
                        <li>5–6 pontos: <strong>Atenção</strong></li>
                        <li>7–8 pontos: <strong>Risco</strong></li>
                        <li>9+ pontos: <strong>Crítico</strong></li>
                    </ul>
                    <p>
                        O valor do salário mínimo utilizado na avaliação é <strong>R$ {salarioMinimo}</strong> e é atualizado automaticamente uma vez por mês.
                    </p>
                </div>
            </div>

        </>

    );
};
