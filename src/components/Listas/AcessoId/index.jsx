

import { Link } from 'react-router-dom'
import { formatarDataCriacaoAtualizacao } from '../../../utils/fomatters'
import styles from './acessoId.module.css'
import { HiOutlinePencilAlt } from "react-icons/hi";

export const AcessoId = ({acesso})=>{

    return(
        <div>
            <h3 className={`${styles['title-cadastro']}`}>Vulnerabilidade e Acessos</h3>
            <div className={`${styles['text-cadastro']}`}>
                <div className="row">
                    <p className="col-12 col-md-4"><b>Violência Doméstica: </b>{acesso.violencia_domestica}</p>
                    <p className="col-12 col-md-4"><b>Discriminação, Rejeição Familiar: </b>{acesso.discriminacao_rejeicao_familiar}</p>
                    <p className="col-12 col-md-4"><b>Discriminação Social, Étnica, Racial e/ou Sexual: </b>{acesso.discriminacao_social_etnico_racial_sexual}</p>
                </div>

                <div className="row">
                    <p className="col-12 col-md 6"><b>Maus Tratos: </b>{acesso.maus_tratos}</p>
                    {acesso.maus_tratos === 'Sim' && <p className="col-12 col-md 6"><b>Descrição dos Maus Tratos: </b>{acesso.discricao_maus_tratos}</p>}
                </div>

                <div className="row">
                    <p className="col-12 col-md-4"><b>Saúde: </b>{acesso.acesso_saude}</p>
                    <p className="col-12 col-md-4"><b>Esporte, Cultura e Lazer</b>{acesso.acesso_esporte_cultura_lazer}</p>
                </div>
                <div className="d-flex justify-content-between">
                    <Link to={`/dashboard/update-dados-acesso/${acesso.id}`}><button  className='btn btn-primary btn-sm'><HiOutlinePencilAlt />Editar</button></Link>
                    <p className={`${styles['title-cadastro', 'data']} text-secondary`}>Última atualização: {formatarDataCriacaoAtualizacao(acesso.updatedAt)}</p>
                </div>
            </div>
        </div>
    )
}