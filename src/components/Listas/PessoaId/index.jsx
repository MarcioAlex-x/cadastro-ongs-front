import { Link } from 'react-router-dom';
import { captalizeString, formatarData, formatarDataCriacaoAtualizacao, realMonetario, respostaFormatada } from '../../../utils/fomatters'
import styles from './pessoaId.module.css'
import { HiOutlinePencilAlt } from "react-icons/hi";

export const PessoaId = ({ pessoa }) => {


    return (
        <div>
            <h3 className={`${styles['title-cadastro']}`}>Dados Pessoais</h3>
            <div className={`${styles['text-cadastro']}`}>
                <div className={` row`}>
                    <p className='col-12 col-md-6' ><b>Nome: </b>{pessoa.nome}</p>
                    <p className="col-12 col-md-6"><b>Data de Nascimento: </b>{formatarData(pessoa.data_nascimento)}</p>
                </div>
                
                <div className="row">
                    <p className="col-12 col-md-3"><b>Telefone: </b>{pessoa.telefone}</p>
                    <p className="col-12 col-md-3"><b>RG: </b>{pessoa.rg}</p>
                    <p className="col-12 col-md-3"><b>CPF: </b>{pessoa.cpf}</p>
                    <p className="col-12 col-md-3"><b>Nis: </b>{pessoa.nis}</p>
                </div>

                <div className="row">
                    {pessoa.nome_pai && <p className="col-12 col-md-6"><b>Pai: </b>{pessoa.nome_pai}</p>}
                    <p className="col-12 col-md-6"><b>Mãe: </b>{pessoa.nome_mae}</p>
                </div>

                <div className="row">
                    <p className="col-12 col-md-3"><b>Estado Civil: </b>{captalizeString(pessoa.estado_civil)}</p>
                    <p className="col-12 col-md-3"><b>Nacionalidade: </b>{captalizeString(pessoa.nacionalidade)}</p>
                    <p className="col-12 col-md-3"><b>Naturalidade: </b>{captalizeString(pessoa.naturalidade)}</p>
                    <p className="col-12 col-md-3"><b>Etnia: </b>{captalizeString(pessoa.etnia)}</p>
                </div>

                <div className="row">
                    <p className="col-12 col-md-3"><b>Orientação Sexual: </b>{captalizeString(pessoa.orientacao_sexual)}</p>
                    <p className="col-12 col-md-3"><b>Deficiência: </b>{respostaFormatada(pessoa.deficiencia)}</p>
                    {pessoa.deficiencia === 'sim' && <p className="col-12 col-md-6"><b>Tipo de Deficiência: </b>{pessoa.tipo_deficiencia} </p>}
                </div>

                <div className="row">
                    <p className="col-12 col-md-3"><b>Curso:</b> {captalizeString(pessoa.curso)}</p>
                    <p className="col-12 col-md-3"><b>Periodo: </b>{captalizeString(pessoa.periodo)}</p>
                    <p className="col-12 col-md-3"><b>Intituição: </b>{captalizeString(pessoa.instituicao)}</p>
                    <p className="col-12 col-md-3"><b>Situação no Mercado de Trabalho: </b>{captalizeString(pessoa.situacao_mercado_trabalho)}</p>
                </div>

                <div className="row">
                    <p className="col-12 col-md-3"><b>Renda:</b> R${realMonetario(pessoa.renda)}</p>
                    <p className="col-12 col-md-3"><b>Benefício Seguro Social:</b> {captalizeString(pessoa.beneficio_seguro_social)}</p>
                    {pessoa.beneficio_seguro_social !== 0 && <p className="col-12 col-md-3"><b>Valor do Benefício:</b> R${captalizeString(pessoa.valor_beneficio_seguro_social)}</p>}
                    <p className="col-12 col-md-3"><b>Apoio a Renda Primária: </b>{captalizeString(pessoa.apoio_renda_primaria)}</p>
                </div>
                <div className="d-flex justify-content-between">
                    <Link to={`/dashboard/update-dados-pessoal/${pessoa.id}`}><button  className='btn btn-primary btn-sm'><HiOutlinePencilAlt />Editar</button></Link>
                    <p className={`${styles['title-cadastro', 'data']} text-secondary`}>Última atualização: {formatarDataCriacaoAtualizacao(pessoa.updatedAt)}</p>
                </div>
            </div>
        </div>
    )
}