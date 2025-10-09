import { Link } from 'react-router-dom';
import { formatarDataCriacaoAtualizacao } from '../../../utils/fomatters'
import styles from './membro.module.css'
import { HiOutlinePencilAlt } from "react-icons/hi";
import { BsTrash3Fill } from "react-icons/bs";
import { useEffect, useState } from 'react';

export const MembroId = ({ membro, composicaoFamiliar }) => {

    const handleRemove = async (e) => {
        e.preventDefault()
        const response = await fetch(`http://localhost:3000/composicao/${composicaoFamiliar.id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        console.log(data)
    }


    return (
        <div>
            <div className="d-flex justify-content-between">
                <h3 className={`${styles['title-cadastro']}`}>Composição Familiar </h3>
                <form>
                    <button onClick={handleRemove} className="btn btn-danger btn-sm"> <BsTrash3Fill /> Apagar</button>
                </form>
            </div>
            {membro.map((el) => (
                <div key={el.id}>
                    <div className={`${styles['text-cadastro']}`}>
                        <div className="row">
                            <p className="col-12 col-md-8"><b>Nome: </b>{el.nome}</p>
                            <p className="col-12 col-md-4"><b>Data de Nascimento: </b>{el.data_nascimento}</p>
                        </div>

                        <div className="row">
                            <p className="col-12 col-md-3"><b>Orientação Sexual: </b>{el.orientacao_sexual}</p>
                            <p className="col-12 col-md-3"><b>Parentesco: </b>{el.parentesco}</p>
                            <p className="col-12 col-md-3"><b>Estado Civil: </b>{el.estado_civil}</p>
                            <p className="col-12 col-md-3"><b>Etnia: </b>{el.etnia}</p>
                        </div>

                        <div className="row">
                            <p className="col-12 col-md-3"><b>Ocupação: </b>{el.ocupacao}</p>
                            {el.profissao !== "" && <p className="col-12 col-md-3"><b>Profissão: </b>{el.profissao}</p>}
                            <p className="col-12 col-md-3"><b>Renda: </b>{el.renda}</p>
                            <p className="col-12 col-md-3"><b>Escolaridade: </b>{el.escolaridade}</p>
                        </div>

                        <div className="row">
                            <p className="col-12 col-md-3"><b>Frequenta Escola: </b>{el.frequenta_escola}</p>
                            <p className="col-12 col-md-3"><b>Benenfício Seguro Social: </b>{el.beneficio_seguro_social}</p>
                            {el.beneficio_seguro_social !== "Nenhum" && <p className="col-12 col-md-3"><b>Estado Civil: </b>{el.estado_civil}</p>}
                            <p className="col-12 col-md-3"><b>PCD: </b>{el.pcd}</p>
                        </div>
                        <div className="d-flex justify-content-between">
                            <Link to={`/dashboard/update-dados-composicao-familiar/${el.id}`}><button className='btn btn-primary btn-sm'><HiOutlinePencilAlt />Editar</button></Link>
                            <p className={`${styles['title-cadastro', 'data']} text-secondary`}>Última atualização: {formatarDataCriacaoAtualizacao(el.updatedAt)}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}