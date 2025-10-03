import { formatarDataCriacaoAtualizacao } from '../../../utils/fomatters'
import styles from './enderecoId.module.css'

export const EnderecoId = ({ endereco }) => {
    return (
        <div>
            <h3 className={`${styles['title-cadastro']}`}>Endereço</h3>
            <div className={`${styles['text-cadastro']}`}>
                <p className="col-12">Logradouro: {endereco.logradouro}</p>
                <div className="row">
                    <p className="col-12 col-md-4">Número: {endereco.numero}</p>
                    <p className="col-12 col-md-4">Bairro: {endereco.bairro}</p>
                    <p className="col-12 col-md-4">CEP: {endereco.cep}</p>
                </div>
                <p className={`${styles['title-cadastro', 'data']} text-end text-secondary`}>Última atualização: {formatarDataCriacaoAtualizacao(endereco.updatedAt)}</p>
            </div>
        </div>
    )
}