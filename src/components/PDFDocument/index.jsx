import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { formatarData } from "../../utils/fomatters"
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Image } from '@react-pdf/renderer'
import spinner from '../../assets/spinner.gif'
import setaabaixo from '../../assets/setaabaixo.png'

const url = import.meta.env.VITE_API_URL
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: 'Helvetica'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    textAlign: 'center'
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: '20'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  sectionTitle: {
    font: 14,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 6,
    borderBottom: '1px solid #000'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 3
  },
  field: {
    width: '50%',
    marginBottom: 3,
  },
  text: {
    marginBottom: 2
  },
  assinatura: {
    textAlign: 'center',
    marginTop: 40
  },
  docsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
  },
  rg: {
    width: 150,
    height: 250,
  },
  comprovante: {
    width: 150,
    height: 300,
  },
  containerDuplo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  containerTriplo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  containerQuadruplo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 4,
  },
  coluna: {
    flexGrow: 1,
    flexBasis: 0,
    marginRight: 6,
  }
})

import Swal from "sweetalert2"

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
  const [inst, setInst] = useState([])

  const hoje = new Date()
  const diaAtual = hoje.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })

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

  useEffect(()=>{
    const fetchApi = async () =>{
      try {
        const response = await fetch(`${url}/instituicao`)
        const data = await response.json()
        setInst(data)
      } catch (err) {
        Swal.fire({
          icon:'error',
          title: 'Erro',
          text: 'Ocorreu um erro ', err
        })
      }
    }
    fetchApi()
  },[])

  if (loading || !pessoa) return <div><img src={spinner} /></div>


  const MyDocument = (
    <Document>
      <Page size="A4" style={styles.page}>

        <View style={styles.header}>
          <Image src={inst[0]?.imagemInstituicao} style={styles.logo} />
          <Text style={styles.title}>{inst[0]?.nome}</Text>
        </View>


        <Text style={styles.sectionTitle}>Informações Pessoais</Text>
        <View style={styles.containerDuplo}>
          <View className="coluna">
            <Text >Nome: {pessoa?.nome} </Text>
          </View>
          <View className="coluna">
            <Text>Data de nascimento: {formatarData(pessoa?.data_nascimento)}</Text>
          </View>
        </View>

        <View style={styles.containerQuadruplo}>
          <View className="coluna">
            <Text>Telefone: {pessoa?.telefone}</Text>
          </View>
          <View className="coluna">
            <Text>RG: {pessoa?.rg} </Text>
          </View>
          <View className="coluna">
            <Text>CPF: {pessoa?.cpf} </Text>
          </View>
          <View className="coluna">
            <Text>NIS: {pessoa?.nis}</Text>
          </View>
        </View>

        <View style={styles.containerTriplo}>
          <View className="coluna">
            <Text >Naturalidade: {pessoa?.naturalidade} </Text>
          </View>
          <View className="coluna">
            <Text>Nacionalidade: {pessoa?.nacionalidade}</Text>
          </View>
          <View className="coluna">
            <Text>Estado civil: {pessoa?.estado_civil}</Text>
          </View>
        </View>

        <View style={styles.containerQuadruplo} >
          <View className="coluna">
            <Text>Etnia: {pessoa?.etnia} </Text>
          </View>
          <View className="coluna">
            <Text>Orientação Sexual: {pessoa?.orientacao_sexual}</Text>
          </View>
          <View className="coluna">
            <Text>PCD: {pessoa?.deficiencia} </Text>
          </View>
          <View className="coluna">
            <Text>{pessoa?.deficiencia !== 'Não' && `Deficiência: ${pessoa?.tipo_deficiencia}`}</Text>
          </View>
        </View>

        <View style={styles.containerDuplo}>
          <View className="coluna">
            <Text>Mãe: {pessoa?.nome_mae} </Text>
          </View>
          <View className="coluna">
            <Text>{pessoa?.nome_pai && `Pai: ${pessoa?.nome_pai}`} </Text>
          </View>
        </View>

        <View style={styles.containerTriplo}>
          <View className="coluna">{pessoa?.curso && <Text style={styles.container}>Curso: {pessoa?.curso}</Text>}</View>
          <View className="coluna">{pessoa?.periodo && <Text>Período: {pessoa?.periodo}</Text>}</View>
          <View className="coluna">{pessoa?.instituicao && <Text>Instituição: {pessoa?.instituicao}</Text>}</View>
        </View>

        <View style={styles.containerTriplo}>
          <View className="coluna">
            <Text>Situação trabalhista: {pessoa?.situacao_mercado_trabalho} </Text>
          </View>
          <View className="coluna">
            <Text>Renda: R${pessoa?.renda}</Text>
          </View>
          <View className="coluna">
            <Text>Benefício: {pessoa?.beneficio_seguro_social} </Text>
          </View>
        </View>

        <View style={styles.containerDuplo}>
          <View className="coluna">{pessoa?.beneficio_seguro_social !== 'Nenhum' && <Text>Valor do benefício: R${pessoa?.valor_beneficio_seguro_social}</Text>}</View>
          <View className="coluna">
            <Text>Apoio a renda familiar: {pessoa?.apoio_renda_primaria}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Endereço</Text>
        <View style={styles.containerQuadruplo}>
          <View className="coluna">
            <Text>Logradouro: {endereco?.logradouro} </Text>
          </View>
          <View className="coluna">
            <Text>Número: {endereco?.numero}</Text>
          </View>
          <View className="coluna">
            <Text>Bairro: {endereco?.bairro} </Text>
          </View>
          <View className="coluna">
            <Text>CEP: {endereco?.cep}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Informações de Moradia</Text>
        <View style={styles.containerTriplo}>
          <View className="columa">
            <Text style={styles.container}>Localidade: {domicilio.tipo_localidade} </Text>
          </View>
          <View className="columa">
            <Text>Tipo de construção: {domicilio?.tipo_constucao} </Text>
          </View>
          <View className="columa">
            <Text>Condição de moradia: {domicilio?.condicoes_moradia}</Text>
          </View>
        </View>

        <View style={styles.containerDuplo}>
          <View className="coluna">
            <Text>Abastecimento de água: {domicilio?.abastecimento_agua} </Text>
          </View>
          <View className="coluna">
            <Text>Abastecimento de energia: {domicilio.abastecimento_energia}</Text>
          </View>
        </View>

        <View style={styles.containerDuplo}>
          <View className="coluna">
            <Text>Esgotamento sanitário: {domicilio.esgotamento_sanitario}</Text>
          </View>
          <View className="coluna">
            <Text>Destino do lixo: {domicilio?.destino_lixo}</Text>
          </View>
        </View>

        <View style={styles}>
          <Text>A localidade {domicilio.psf_proximo === 'Sim' ? 'tem acesso a PSF' : 'não tem acesso a PSF'}, {domicilio.posto_policia_proximo === "Sim" ? 'tem acesso a posto polícial' : 'não tem acesso a posto polícial'}, {domicilio.creche_proximo === 'Sim' ? 'tem acesso a creche' : 'não tem acesso a creche'} e {domicilio.praca_proximo === 'Sim' ? 'tem acesso a praça' : 'não tem acesso a praça'}.</Text>
        </View>

        <Text style={styles.sectionTitle}>Vulnerabilidade</Text>
        <View style={styles.containerTriplo}>
          <View className="coluna">
            <Text>Sofre maus tratos: {acesso?.maus_tratos} </Text>
          </View>
          <View className="coluna">
            <Text>Violência doméstica: {acesso?.violencia_domestica}</Text>
          </View>
          <View className="coluna">
            <Text>Discriminação social: {acesso?.discriminacao_social_etnico_racial_sexual}</Text>
          </View>
        </View>

        {conjuge && (
          <>
            <View />
            <Text style={styles.sectionTitle}>Informações sobre o Cônjuge</Text>
            <View>
              <View style={styles.containerDuplo}>
                <View className="coluna">
                  <Text>Nome: {conjuge?.nome} </Text>
                </View>
                <View className="coluna">
                  <Text>Data de nascimento: {formatarData(conjuge?.data_nascimento)}</Text>
                </View>
              </View>

              <View style={styles.containerTriplo}>
                <View className="coluna">
                  <Text style={styles.container}>Renda: R${conjuge?.renda}</Text>
                </View>
                <View className="coluna">
                  <Text>PCD: {conjuge?.deficiencia}</Text>
                </View>
                <View className="coluna">
                  <Text>{conjuge?.deficiencia === 'Sim' && `Deficiência: ${conjuge.tipo_dificiencia}`}</Text>
                </View>
              </View>

              <View style={styles.containerTriplo}>
                <View className="coluna">
                  <Text>Etnia: {conjuge?.etnia} </Text>
                </View>
                <View className="coluna">
                  <Text>{conjuge.ocupacao && `Ocupação: ${conjuge?.ocupacao}`}</Text>
                </View>
                <View className="coluna">
                  <Text style={styles.container}>Benefício: {conjuge.beneficio_seguro_social} {conjuge?.beneficio_seguro_social !== 'Nenhum' && `Valor do 
                bebnefício: {conjuge?.valor_beneficio_seguro_social}`}</Text>
                </View>
              </View>
            </View>
          </>
        )}

        {membro?.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Composição Familiar</Text>
            {membro.map((m) => (
              <View key={m.id} style={{ marginBottom: 8 }}>
                <View style={styles.container}>
                  <Text>Nome: {m.nome} </Text>
                  <Text>Data de nascimento: {formatarData(m.data_nascimento)}</Text>
                </View>
                <View style={styles.container}>
                  <Text>CPF: {m.cpf}</Text>
                  <Text> Nis: {m.nis}</Text>
                </View>
                <View style={styles.container}>
                  <Text>Parentesco: {m.parentesco}</Text>
                  <Text>Etnia: {m.etnia}</Text>
                  {m.ocupacao && <Text>Ocupação: {m.ocupacao}</Text>}
                  {m.profissao && <Text> Profissão: {m.profissao}</Text>}
                </View>
                <View style={styles.container}>
                  <Text>Escolaridade: {m.escolaridade}</Text>
                  <Text>Frequenta a escola? {m.frequenta_escola}</Text>
                  {m.renda && <Text>Renda: R${m.renda}</Text>}
                </View>
                <View style={styles.container}>
                  <Text >PCD: {m.deficiencia} </Text>
                  {m.deficiencia && <Text>Deficinência: {m.tipo_deficiencia}</Text>}
                </View>
                <View style={styles.container}>
                  <Text>Benefício: {m.beneficio_seguro_social} </Text>
                  <Text>{m.valor_beneficio_seguro_social && `Valor do benefício: ${m.valor_beneficio_seguro_social}`} </Text>
                </View>
              </View>
            ))}
          </>
        )}
        <View break>
          <Text style={styles.sectionTitle}>Documentos</Text>
          <View style={styles.docsContainer}>
            {pessoa.rg_frente && <Image src={pessoa.rg_frente} style={styles.rg} />}
            {pessoa.rg_verso && <Image src={pessoa.rg_verso} style={styles.rg} />}
            {pessoa.comprovante_residencia && <Image src={pessoa.comprovante_residencia} style={styles.comprovante} />}
          </View>
          <View />
          <Text style={styles.sectionTitle}>Declaração de Ciência e Consentimento</Text>
          <Text>
            Declaro, para os devidos fins, que estou ciente de que as informações prestadas neste formulário serão utilizadas exclusivamente
            para fins de cadastro e acompanhamento junto à {inst[0]?.nome}, conforme os princípios da Lei Geral de Proteção de
            Dados Pessoais (Lei nº 13.709/2018), garantindo-se o sigilo e a confidencialidade das informações fornecidas.
          </Text>
          <View style={styles.assinatura}>
            <Text>______________________________________________</Text>
            <Text>{pessoa?.nome}</Text>
            <Text>{inst[0]?.cidade} - {inst[0]?.uf}, {diaAtual}</Text>
          </View>
        </View>
      </Page>
    </Document>
  )

  return (
    <div className="m-5">
      <p className="text-center mb-5">Baixe o documento de <b>{pessoa?.nome}</b> clicando no botão abaixo!</p>
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