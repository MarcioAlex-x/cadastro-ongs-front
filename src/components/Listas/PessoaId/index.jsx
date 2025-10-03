import { captalizeString, formatarData, formatarDataCriacaoAtualizacao, realMonetario, respostaFormatada } from '../../../utils/fomatters'
import styles from './pessoaId.module.css'

export const PessoaId = ({ pessoa }) => {


    return (
        <div>
            <h3 className={`${styles['title-cadastro']}`}>Dados Pessoais</h3>
            <div className={`${styles['text-cadastro']}`}>
                <div className={` row`}>
                    <p className='col-12 col-md-6' >Nome: {pessoa.nome}</p>
                    <p className="col-12 col-md-6">Data de Nascimento: {formatarData(pessoa.data_nascimento)}</p>
                </div>
                
                <div className="row">
                    <p className="col-12 col-md-3">Telefone: {pessoa.telefone}</p>
                    <p className="col-12 col-md-3">RG: {pessoa.rg}</p>
                    <p className="col-12 col-md-3">CPF: {pessoa.cpf}</p>
                    <p className="col-12 col-md-3">Nis: {pessoa.nis}</p>
                </div>

                <div className="row">
                    {pessoa.nome_pai && <p className="col-12 col-md-6">Pai: {pessoa.nome_pai}</p>}
                    <p className="col-12 col-md-6">Mãe: {pessoa.nome_mae}</p>
                </div>

                <div className="row">
                    <p className="col-12 col-md-3">Estado Civil: {captalizeString(pessoa.estado_civil)}</p>
                    <p className="col-12 col-md-3">Nacionalidade: {captalizeString(pessoa.nacionalidade)}</p>
                    <p className="col-12 col-md-3">Naturalidade: {captalizeString(pessoa.naturalidade)}</p>
                    <p className="col-12 col-md-3">Etnia: {captalizeString(pessoa.etnia)}</p>
                </div>

                <div className="row">
                    <p className="col-12 col-md-3">Orientação Sexual: {captalizeString(pessoa.orientacao_sexual)}</p>
                    <p className="col-12 col-md-3">Deficiência: {respostaFormatada(pessoa.deficiencia)}</p>
                    {pessoa.deficiencia === 'sim' && <p className="col-12 col-md-6">Tipo de Deficiência: {pessoa.tipo_deficiencia} </p>}
                </div>

                <div className="row">
                    <p className="col-12 col-md-3">Curso: {captalizeString(pessoa.curso)}</p>
                    <p className="col-12 col-md-3">Periodo: {captalizeString(pessoa.periodo)}</p>
                    <p className="col-12 col-md-3">Intituição: {captalizeString(pessoa.instituicao)}</p>
                    <p className="col-12 col-md-3">Situação no Mercado de Trabalho: {captalizeString(pessoa.situacao_mercado_trabalho)}</p>
                </div>

                <div className="row">
                    <p className="col-12 col-md-3">Renda: R${realMonetario(pessoa.renda)}</p>
                    <p className="col-12 col-md-3">Benefício Seguro Social: {captalizeString(pessoa.beneficio_seguro_social)}</p>
                    {pessoa.beneficio_seguro_social !== 0 && <p className="col-12 col-md-3">Valor do Benefício: R${captalizeString(pessoa.valor_beneficio_seguro_social)}</p>}
                    <p className="col-12 col-md-3">Apoio a Renda Primária: {captalizeString(pessoa.apoio_renda_primaria)}</p>
                </div>
                <p className={`${styles['title-cadastro', 'data']} text-end text-secondary`}>Última atualização: {formatarDataCriacaoAtualizacao(pessoa.updatedAt)}</p>
            </div>
        </div>
    )
}