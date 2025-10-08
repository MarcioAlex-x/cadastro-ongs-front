import { Link } from 'react-router-dom'
import { captalizeString, formatarData, formatarDataCriacaoAtualizacao, realMonetario, respostaFormatada } from '../../../utils/fomatters'
import styles from './conjugeId.module.css'
import { HiOutlinePencilAlt } from 'react-icons/hi'

export const ConjugeId = ({ conjuge }) => {
    return (
        <div>
            <h3 className={`${styles['title-cadastro']}`}>Conjuge</h3>
            <div className={`${styles['text-cadastro']}`}>
                <div className="row">
                    <p className="col-12 col-md-8"><b>Nome:</b> {conjuge.nome}</p>
                    <p className="col-12 col-md-4"><b>Data de Nascimento:</b> {formatarData(conjuge.data_nascimento)}</p>
                </div>

                <div className="row">
                    <p className="col-12 col-md-3"><b>Etnia:</b> {captalizeString(conjuge.etnia)}</p>
                    <p className="col-12 col-md-3"><b>Ocupação:</b> {conjuge.ocupacao}</p>
                    <p className="col-12 col-md-3"><b>Situação no Mercado no Trabalho: </b>{captalizeString(conjuge.situacao_mercado_trabalho)}</p>
                    <p className="col-12 col-md-3"><b>Renda:</b> R${realMonetario(conjuge.renda)}</p>
                </div>

                <div className="row">
                    <p className="col-12 col-md-3"><b>Deficiência: </b>{respostaFormatada(conjuge.deficiencia)}</p>
                    {conjuge.deficiencia !== 'nao' && <p className="col-12 col-md-3"><b>Tipo de Deficiência:</b> {captalizeString(conjuge.tipo_deficiencia)}</p>}
                    <p className="col-12 col-md-3"><b>Benefício Seguro Social: </b>{captalizeString(conjuge.beneficio_seguro_social)}</p>
                    {conjuge.beneficio_seguro_social !== 'nenhum' && <p className="col-12 col-md-3"><b>Valor do Benefício:</b> R${conjuge.valor_beneficio_seguro_social}</p>}
                </div>
                <div className="d-flex justify-content-between">
                    <Link to={`/dashboard/update-dados-conjuge/${conjuge.id}`}><button className='btn btn-primary btn-sm'><HiOutlinePencilAlt />Editar</button></Link>
                    <p className={`${styles['title-cadastro', 'data']} text-secondary`}>Última atualização: {formatarDataCriacaoAtualizacao(conjuge.updatedAt)}</p>
                </div>
            </div>
        </div>
    )
}