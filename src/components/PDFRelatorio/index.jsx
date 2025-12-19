import { useEffect, useState } from "react";
import { formatarData } from '../../utils/fomatters'
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFDownloadLink
} from "@react-pdf/renderer";

const url = import.meta.env.VITE_API_URL;

export const PDFRelatorio = () => {
    const [dataInicio, setDataInicio] = useState("");
    const [dataFinal, setDataFinal] = useState("");
    const [cadastros, setCadastros] = useState([]);
    const [inst, setInst] = useState(null)
    const [pessoa, setPessoa] = useState(null)
    const [conjuge, setConjuge] = useState(null)
    const [endereco, setEndereco] = useState(null)
    const [domicilio, setDomicilio] = useState(null)
    const [acesso, setAcesso] = useState(null)
    const [composicaoFamiliar, setComposicaoFamiliar] = useState(null)
    const [membro, setMembro] = useState(null)
    const [dataInicioFormatada, setDataInicioFormatada] = useState('')
    const [dataFinalFormatada, setDataFinalFormatada] = useState('')


    useEffect(() => {
        const fetcCadastro = async () => {
            try {

                const response = await fetch(`${url}/cadastro`, {
                    credentials: "include",
                    method: "GET"
                });
                const data = await response.json();

                setCadastros(data || []);

            } catch (err) {
                console.log(err)
            }

        };
        fetcCadastro();
    }, []);

    useEffect(() => {
        const fetchInst = async () => {
            const response = await fetch(`${url}/instituicao`)
            const data = await response.json()
            setInst(data[0])
        }
        fetchInst()
    }, [])

    const qtdCadastros = cadastros.length

    useEffect(() => {
        setDataInicioFormatada(formatarData(dataInicio))
        setDataFinalFormatada(formatarData(dataFinal))
    }, [dataInicio, dataFinal])

    const inicio = dataInicio ? new Date(dataInicio) : null;
    const final = dataFinal ? new Date(dataFinal) : null;

    const cadastrosFiltrados = cadastros.filter((item) => {
        const criadoEm = new Date(item.createdAt);

        if (inicio && criadoEm < inicio) return false;
        if (final && criadoEm > final) return false;

        return true;
    });

    const totalFamilias = cadastrosFiltrados.length

    const totalPessoas = cadastrosFiltrados.reduce((acc, c) => {
        const pessoa = c?.pessoas?.[0];
        if (!pessoa) return acc;

        const qtdMembros = pessoa?.composicaoFamiliar?.membros?.length || 0;
        const temConjuge = pessoa?.conjuge ? 1 : 0;

        return acc + 1 + temConjuge + qtdMembros;
    }, 0);

    const contagemOrientacoes = {
        "Hétero": 0,
        "Gay": 0,
        "Lésbica": 0,
        "Bisexual": 0,
        "Assexual": 0,
        "Pansexual": 0,
    };

    cadastrosFiltrados.forEach(c => {
        const pessoa = c?.pessoas?.[0];
        if (!pessoa) return;

        const registrar = (orientacao) => {
            if (contagemOrientacoes.hasOwnProperty(orientacao)) {
                contagemOrientacoes[orientacao]++;
            }
        };

        registrar(pessoa?.orientacao_sexual);

        registrar(pessoa?.conjuge?.orientacao_sexual);

        pessoa?.composicaoFamiliar?.membros?.forEach(m => {
            registrar(m?.orientacao_sexual);
        });
    });

    const toPercent = (quant) => totalPessoas > 0 ? ((quant / totalPessoas) * 100).toFixed(2) : 0;

    const totalHeterosPercents = toPercent(contagemOrientacoes["Hétero"]);
    const totalGaysPercents = toPercent(contagemOrientacoes["Gay"]);
    const totalLesbicasPercents = toPercent(contagemOrientacoes["Lésbica"]);
    const totalBiPercents = toPercent(contagemOrientacoes["Bisexual"]);
    const totalAssexuaisPercents = toPercent(contagemOrientacoes["Assexual"]);
    const totalPanPercents = toPercent(contagemOrientacoes["Pansexual"]);

    const styles = StyleSheet.create({
        page: { padding: 30, fontFamily: 'Helvetica' },
        section: { marginBottom: 10 },
        title: { fontSize: 18, textAlign: "center", marginBottom: 15 },
        subTitle: { fontSize: 16, textAlign: "center", marginBottom: 15 },
        item: {
            marginBottom: 8,
            borderBottomWidth: 1,
            borderBottomColor: "#ccc",
            borderBottomStyle: "solid",
            paddingBottom: 5
        },
        logo: {
            width: 40,
            height: 40,
            marginRight: '20'
        },
        text: { fontSize: 12, marginBottom: 2 },
        header: { textAlign: 'center', marginVertical: 40 }
    });

    const RelatorioPDF = (
        <Document>
            <Page style={styles.page}>
                <Text style={styles.title}>
                    {inst?.nome}
                </Text>
                <View style={styles.header}>
                    <Text style={styles.text}>CNPJ: {inst?.cnpj}</Text>
                    <Text style={styles.text}>Endereço: {inst?.logradouro}, {inst?.numero}, {inst?.bairro}, {inst?.cidade} - {inst?.uf}</Text>
                    <Text style={styles.text}>Telefone: {inst?.telefone} {inst?.telefone2 && ` - ${inst?.telefone2}`} </Text>

                </View>
                <View>
                    <Text style={styles.subTitle}>Relatório Socioeconômico</Text>
                </View>
                <View>
                    <Text style={styles.subTitle}>Identificação Geral</Text>
                    <Text style={styles.text}>
                        Durante o período analisado, {dataInicioFormatada} à {dataFinalFormatada}, foram cadastradas {totalFamilias} famílias, totalizando {totalPessoas} pessoas entre responsáveis e membros familiares.
                        Os registros foram coletados por meio de formulários socioeconômicos aplicados pela equipe da {inst?.nome}, com base em entrevistas e visitas domiciliares.
                    </Text>
                </View>
                <View>
                    <Text style={styles.subTitle}>
                        Composição Familiar e Perfil Demográfico
                    </Text>
                    <Text style={styles.text}>
                        Total de famílias {qtdCadastros}
                    </Text>
                    <Text style={styles.text}>
                        Total de pessoas {totalPessoas}
                    </Text>
                    <Text style={styles.text}>
                        Total de héteros {totalHeterosPercents}%
                    </Text>
                    <Text style={styles.text}>
                        Total de gays {totalGaysPercents}%
                    </Text>
                    <Text style={styles.text}>
                        Total de lésbicas {totalLesbicasPercents}%
                    </Text>
                    <Text style={styles.text}>
                        Total de bissexuais {totalBiPercents}%
                    </Text>
                    <Text style={styles.text}>
                        Total de assexuais {totalAssexuaisPercents}%
                    </Text>
                    <Text style={styles.text}>
                        Total de pansexuais {totalPanPercents}%
                    </Text>
                    <Text style={styles.text}>
                        Faixa etária predominante
                    </Text>
                    <Text style={styles.text}>
                        Estado civil mais comum
                    </Text>
                    <Text style={styles.text}>
                        Etnia predominante
                    </Text>
                    <Text style={styles.text}>
                        Pessoas com deficiência
                    </Text>
                </View>
            </Page>
        </Document>
    );

    return (
        <div style={{ padding: 20 }}>
            <h3>Gerar Relatório Socioeconômico</h3>

            <div style={{ marginBottom: 20 }}>
                <label className="form-label">Data Início: </label>
                <input
                    className="form-control"
                    type="date"
                    value={dataInicio}
                    onChange={(e) => setDataInicio(e.target.value)}
                    style={{ marginRight: 20 }}
                />
                <label className="form-label">Data Final: </label>
                <input
                    className="form-control"
                    type="date"
                    value={dataFinal}
                    onChange={(e) => setDataFinal(e.target.value)}
                />
            </div>

            <PDFDownloadLink
                document={RelatorioPDF}
                fileName={`relatorio_socioeconomico_${dataInicio || "inicio"}_${dataFinal || "hoje"
                    }.pdf`}
            >
                {({ loading }) =>
                    loading ? (
                        "Gerando PDF..."
                    ) : (
                        <button
                            style={{
                                backgroundColor: "#007bff",
                                color: "#fff",
                                padding: "8px 16px",
                                borderRadius: 6,
                                border: "none",
                                cursor: "pointer"
                            }}
                        >
                            Baixar Relatório
                        </button>
                    )
                }
            </PDFDownloadLink>

            <div style={{ marginTop: 20 }}>
                <p>Total de cadastros: {cadastrosFiltrados.length}</p>
            </div>
        </div>
    );
};
