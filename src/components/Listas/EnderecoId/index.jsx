import { Link } from 'react-router-dom'
import { formatarDataCriacaoAtualizacao } from '../../../utils/fomatters'
import styles from './enderecoId.module.css'
import { HiOutlinePencilAlt } from "react-icons/hi";

export const EnderecoId = ({ endereco }) => {
    return (
        <div>
            <h3 className={`${styles['title-cadastro']}`}>Endereço</h3>
            <div className={`${styles['text-cadastro']}`}>
                <p className="col-12"><b>Logradouro: </b>{endereco.logradouro}</p>
                <div className="row">
                    <p className="col-12 col-md-4"><b>Número: </b>{endereco.numero}</p>
                    <p className="col-12 col-md-4"><b>Bairro:</b> {endereco.bairro}</p>
                    <p className="col-12 col-md-4"><b>CEP: </b>{endereco.cep}</p>
                </div>
                <div className="d-flex justify-content-between">
                    <Link ><button  className='btn btn-primary btn-sm'><HiOutlinePencilAlt />Editar</button></Link>
                    <p className={`${styles['title-cadastro', 'data']} text-secondary`}>Última atualização: {formatarDataCriacaoAtualizacao(endereco.updatedAt)}</p>
                </div>
            </div>
        </div>
    )
}