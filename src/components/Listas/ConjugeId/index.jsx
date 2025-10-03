import { captalizeString, formatarData, formatarDataCriacaoAtualizacao, realMonetario, respostaFormatada } from '../../../utils/fomatters'
import styles from './conjugeId.module.css'

export const ConjugeId = ({ conjuge }) => {
    return (
        <div>
            <h3 className={`${styles['title-cadastro']}`}>Conjuge</h3>
            <div className={`${styles['text-cadastro']}`}>
                <div className="row">
                    <p className="col-12 col-md-8">Nome: {conjuge.nome}</p>
                    <p className="col-12 col-md-4">Data de Nascimento: {formatarData(conjuge.data_nascimento)}</p>
                </div>

                <div className="row">
                    <p className="col-12 col-md-3">Etnia: {captalizeString(conjuge.etnia)}</p>
                    <p className="col-12 col-md-3">Ocupação: {conjuge.ocupacao}</p>
                    <p className="col-12 col-md-3">Situação no Mercado no Trabalho: {captalizeString(conjuge.situacao_mercado_trabalho)}</p>
                    <p className="col-12 col-md-3">Renda: R${realMonetario(conjuge.renda)}</p>
                </div>

                <div className="row">
                    <p className="col-12 col-md-3">Deficiência: {respostaFormatada(conjuge.deficiencia)}</p>
                    { conjuge.deficiencia!== 'nao' && <p className="col-12 col-md-3">Tipo de Deficiência: {captalizeString(conjuge.tipo_deficiencia)}</p>}
                    <p className="col-12 col-md-3">Benefício Seguro Social: {captalizeString(conjuge.beneficio_seguro_social)}</p>
                    { conjuge.beneficio_seguro_social!=='nenhum' && <p className="col-12 col-md-3">Valor do Benefício: R${conjuge.valor_beneficio_seguro_social}</p>}
                </div>
                <p className={`${styles['title-cadastro', 'data']} text-end text-secondary`}>Última atualização: {formatarDataCriacaoAtualizacao(conjuge.updatedAt)}</p>
            </div>
        </div>
    )
}