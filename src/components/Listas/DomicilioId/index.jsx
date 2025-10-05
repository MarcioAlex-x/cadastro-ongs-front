import { Link } from 'react-router-dom'
import { captalizeString, formatarDataCriacaoAtualizacao, respostaFormatada } from '../../../utils/fomatters'
import styles from './domicilioId.module.css'
import { HiOutlinePencilAlt } from "react-icons/hi";

export const DomicilioId = ({ domicilio }) => {
    return (
        <div>
            <h3 className={`${styles['title-cadastro']}`}>Domicílio</h3>
            <div className={`${styles['text-cadastro']}`}>
                <div className="row">
                    <p className="col-12 col-md-3"><b>Tipo de Localidade:</b> {captalizeString(domicilio.tipo_localidade)}</p>
                    <p className="col-12 col-md-3"><b>Condições de Moradia: </b>{captalizeString(domicilio.condicoes_moradia)}</p>
                    <p className="col-12 col-md-3"><b>Tipo de Construção: </b>{captalizeString(domicilio.tipo_construção)}</p>
                    <p className="col-12 col-md-3"><b>Situação de Coabitação Familiar: </b>{respostaFormatada(domicilio.situacao_coabitacao_familiar)}</p>
                </div>

                <div className="row">
                    <p className="col12 col-md-3"><b>Abastecimento de Água:</b> {captalizeString(domicilio.abastecimento_agua)}</p>
                    <p className="col12 col-md-3"><b>Abastecimento de Energia Elétrica: </b>{captalizeString(domicilio.abastecimento_energia)}</p>
                    <p className="col12 col-md-3"><b>Esgotamento Sanitário:</b> {captalizeString(domicilio.esgotamento_sanitario)}</p>
                    <p className="col12 col-md-3"><b>Destino do Lixo: </b>{captalizeString(domicilio.destino_lixo)}</p>
                </div>

                <p className='fs-4'>Área coberta por:</p>
                <div className="row">
                    <p className="col-12 col-md-3"><b>PSF: </b>{respostaFormatada(domicilio.psf_proximo)}</p>
                    <p className="col-12 col-md-3"><b>Posto de Ploícia:</b> {respostaFormatada(domicilio.posto_policial_proximo)}</p>
                    <p className="col-12 col-md-3"><b>Creche:</b> {respostaFormatada(domicilio.creche_proximo)}</p>
                    <p className="col-12 col-md-3"><b>Praça: </b>{respostaFormatada(domicilio.praca_proximo)}</p>
                </div>


                <div className="d-flex justify-content-between">
                    <Link ><button  className='btn btn-primary btn-sm'><HiOutlinePencilAlt />Editar</button></Link>
                    <p className={`${styles['title-cadastro', 'data']} text-secondary`}>Última atualização: {formatarDataCriacaoAtualizacao(domicilio.updatedAt)}</p>
                </div>
            </div>
        </div>
    )
}