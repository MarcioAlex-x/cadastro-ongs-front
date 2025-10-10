const url = import.meta.env.VITE_API_URL

import { Link } from 'react-router-dom';
import { formatarDataCriacaoAtualizacao } from '../../../utils/fomatters'
import styles from './membro.module.css'
import { HiOutlinePencilAlt } from "react-icons/hi";
import { BsTrash3Fill, BsTrashFill } from "react-icons/bs";
import Swal from 'sweetalert2'

export const MembroId = ({ membro, composicaoFamiliar, onRemoveComposicao, onRemoveMembro }) => {

    const handleDeleteAll = async (id) => {

        Swal.fire({
            title: 'Tem certeza?',
            text: 'Esta composição será removida permanentemente!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, remover',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await fetch(`${url}/composicao/${id}`, {
                    method: 'DELETE',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if (response.ok) {
                    onRemoveComposicao()
                    Swal.fire('Removido!', 'Composicao familiar removido com sucesso', 'success')
                } else {
                    Swal.fire('Erro!', 'Não foi possível remover a composição familiar', 'error')
                }
            }

        })
    }

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Tem certeza?',
            text: 'Este membro familiar será removido permanentemente!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, remover',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await fetch(`${url}/composicao_familiar/${id}`, {
                    method: 'DELETE',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if (response.ok) {
                    onRemoveMembro(id)
                    Swal.fire('Removido!', 'Membro familiar removido com sucesso!', 'sucess')
                } else {
                    Swal.fire('Erro!', 'Não foi possível remover o membro familiar.', 'error')
                }
            }
        })
    }

    return (
        <div>
            <div className="d-flex justify-content-between">
                <h3 className={`${styles['title-cadastro']}`}>Composição Familiar </h3>
                <button
                    className="btn btn-sm btn-danger"
                    onClick={() => { handleDeleteAll(composicaoFamiliar.id) }}>
                    <BsTrashFill />
                    Remover
                </button>
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
                            <div>
                                <Link to={`/dashboard/update-dados-composicao-familiar/${el.id}`}>
                                    <button className='btn btn-primary btn-sm'><HiOutlinePencilAlt />
                                        Editar
                                    </button>
                                </Link>

                                <button
                                    onClick={() => { handleDelete(el.id) }}
                                    className="btn btn-sm btn-danger ms-2">
                                    <BsTrashFill />
                                    Apagar
                                </button>
                            </div>
                            <p className={`${styles['title-cadastro', 'data']} text-secondary`}>Última atualização: {formatarDataCriacaoAtualizacao(el.updatedAt)}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}