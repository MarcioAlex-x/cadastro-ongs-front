import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { formatarData } from "../../utils/fomatters"
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Image } from '@react-pdf/renderer'
import spinner from '../../assets/spinner.gif'
import setaabaixo from '../../assets/setaabaixo.png'

const url = import.meta.env.VITE_API_URL
const styles = StyleSheet.create({
    page:{
        padding: 30,
        fontSize: 12,
        fontFamily: 'Helvetica'
    },
    header:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        textAlign: 'center'
    },
    logo:{
        width: 40,
        height: 40,
        marginRight: '20'
    },
    title:{
        fontSize: 18,
        fontWeight: 'bold'
    },
    sectionTitle:{
        font: 14,
        fontWeight: 'bold',
        marginTop: 12,
        marginBottom: 6,
        borderBottom: '1px solid #000'
    },
    row:{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 3
    },
    field:{
        width: '50%',
        marginBottom:3,
    },
    text:{
        marginBottom: 2
    },
    assinatura:{
        textAlign: 'center',
        marginTop: 40
    }
})

import logo from '../../assets/ABSJ.png'

export const PDFDocument = () => {


    const [pessoa, setPessoa] = useState(null)
    const [endereco, setEndereco] = useState(null)
    const [domicilio, setDomicilio] = useState(null)
    const [acesso, setAcesso] = useState(null)
    const [conjuge, setConjuge] = useState(null)
    const [membro, setMembro] = useState([])
    const [loading, setLoading] = useState(true)
    const [composicaoFamiliar, setComposicaoFamiliar] = useState(null)
    const [cadastro, setCadastro] = useState(null)

    const hoje = new Date()
    const diaAtual = hoje.toLocaleDateString('pt-BR',{day: 'numeric',month:'long', year:'numeric'})

    const { id } = useParams()

    useEffect(() => {
        setLoading(true)
        const dadosPessoais = async () => {
            try {
                const response = await fetch(`${url}/cadastro/${id}`, {
                    method: "GET",
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                const data = await response.json()

                setCadastro(data)

                const pessoaData = data.pessoas?.[0] || null

                setPessoa(pessoaData)
                setEndereco(pessoaData.endereco)
                setConjuge(pessoaData.conjuge)
                setDomicilio(pessoaData.domicilio)
                setAcesso(pessoaData.acesso)
                setComposicaoFamiliar(pessoaData.composicaoFamiliar)
                setMembro(pessoaData.composicaoFamiliar.membros)

            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        dadosPessoais()
    }, [id])

    if(loading || !pessoa) return <div><img src={spinner} /></div>
    

     const MyDocument = (
    <Document>
      <Page size="A4" style={styles.page}>
        
        <View style={styles.header}>
          <Image src={logo} style={styles.logo} />
          <Text style={styles.title}>Associação Beneficente São José</Text>
        </View>

       
        <Text style={styles.sectionTitle}>Informações Pessoais</Text>
        <View>
          <Text>Nome: {pessoa?.nome}</Text>
          <Text>Data de nascimento: {formatarData(pessoa?.data_nascimento)}</Text>
          <Text>CPF: {pessoa?.cpf}</Text>
          <Text>RG: {pessoa?.rg}</Text>
          <Text>Telefone: {pessoa?.telefone}</Text>
          <Text>Nacionalidade: {pessoa?.nacionalidade}</Text>
          <Text>Naturalidade: {pessoa?.naturalidade}</Text>
        </View>

        <View /> 
        <Text style={styles.sectionTitle}>Endereço</Text>
        <View>
          <Text>Logradouro: {endereco?.logradouro}</Text>
          <Text>Número: {endereco?.numero}</Text>
          <Text>Bairro: {endereco?.bairro}</Text>
          <Text>CEP: {endereco?.cep}</Text>
        </View>

        <View />
        <Text style={styles.sectionTitle}>Informações de Moradia</Text>
        <View>
          <Text>Tipo de construção: {domicilio?.tipo_constucao}</Text>
          <Text>Condição de moradia: {domicilio?.condicoes_moradia}</Text>
          <Text>Abastecimento de água: {domicilio?.abastecimento_agua}</Text>
          <Text>Destino do lixo: {domicilio?.destino_lixo}</Text>
        </View>

        <View />
        <Text style={styles.sectionTitle}>Vulnerabilidade</Text>
        <View>
          <Text>Sofre maus tratos: {acesso?.maus_tratos}</Text>
          <Text>Violência doméstica: {acesso?.violencia_domestica}</Text>
          <Text>Discriminação social: {acesso?.discriminacao_social_etnico_racial_sexual}</Text>
        </View>

        {conjuge && (
          <>
            <View />
            <Text style={styles.sectionTitle}>Informações sobre o Cônjuge</Text>
            <View>
              <Text>Nome: {conjuge?.nome}</Text>
              <Text>Data de nascimento: {formatarData(conjuge?.data_nascimento)}</Text>
              <Text>Renda: R${conjuge?.renda}</Text>
              <Text>PCD: {conjuge?.deficiencia}</Text>
            </View>
          </>
        )}

        {membro?.length > 0 && (
          <>
            <View break />
            <Text style={styles.sectionTitle}>Composição Familiar</Text>
            {membro.map((m) => (
              <View key={m.id} style={{ marginBottom: 8 }}>
                <Text>Nome: {m.nome}</Text>
                <Text>Data de nascimento: {formatarData(m.data_nascimento)}</Text>
                <Text>Parentesco: {m.parentesco}</Text>
              </View>
            ))}
          </>
        )}

        <View />
        <Text style={styles.sectionTitle}>Declaração de Ciência e Consentimento</Text>
        <Text>
          Declaro, para os devidos fins, que estou ciente de que as informações prestadas neste formulário serão utilizadas exclusivamente
          para fins de cadastro e acompanhamento junto à Associação Beneficente São José, conforme os princípios da Lei Geral de Proteção de
          Dados Pessoais (Lei nº 13.709/2018), garantindo-se o sigilo e a confidencialidade das informações fornecidas.
        </Text>

        <View style={styles.assinatura}>
          <Text>______________________________________________</Text>
          <Text>{pessoa?.nome}</Text>
          <Text>João Pessoa - PB, {diaAtual}</Text>
        </View>
      </Page>
    </Document>
  )

  return (
    <div className="m-5">
        <p className="text-center mb-5">Baixe o documento clicando no botão abaixo de {pessoa?.nome}!</p>
        <img 
        className="d-block"
        style={{
            width: 34,
            margin: 'auto',
        }}
        src={setaabaixo} />
      <PDFDownloadLink document={MyDocument} fileName={`cadastro_${pessoa?.nome}.pdf`}>
        {({ loading }) => (
          <button className="btn btn-primary d-block m-auto">
            {loading ? "Gerando PDF..." : "Baixar PDF"}
          </button>
        )}
      </PDFDownloadLink>
    </div>
  )
}