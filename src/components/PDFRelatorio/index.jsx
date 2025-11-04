import { useEffect, useState } from "react";
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

    useEffect(() => {
        
    })

    const cadastrosFiltrados = cadastros.filter((item) => {
        const criadoEm = new Date(item.createdAt);
        const inicio = dataInicio ? new Date(dataInicio) : null;
        const final = dataFinal ? new Date(dataFinal) : null;

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
        header: {textAlign: 'end'}
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
                    <Text style={styles.text}>Telefone: {inst?.telefone}</Text>
                    {inst?.telefone2 && <Text style={styles.text}>Telecone 2: {inst?.telefone2}</Text>}
                </View>
                <View>
                    <Text style={styles.subTitle}>Relatório Socioeconômico</Text>
                </View>
                <View>
                    <Text style={styles.subTitle}>Identificação Geral</Text>
                    <Text style={styles.text}>
                        Durante o período analisado, foram cadastradas {totalFamilias} famílias, totalizando { totalPessoas } pessoas entre responsáveis e membros familiares.
                        Os registros foram coletados por meio de formulários socioeconômicos aplicados pela equipe da {inst?.nome}, com base em entrevistas e visitas domiciliares.
                    </Text>
                </View>
            </Page>
        </Document>
    );

    return (
        <div style={{ padding: 20 }}>
            <h3>Gerar Relatório Socioeconômico</h3>

            <div style={{ marginBottom: 20 }}>
                <label>Data Início: </label>
                <input
                    type="date"
                    value={dataInicio}
                    onChange={(e) => setDataInicio(e.target.value)}
                    style={{ marginRight: 20 }}
                />
                <label>Data Final: </label>
                <input
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
