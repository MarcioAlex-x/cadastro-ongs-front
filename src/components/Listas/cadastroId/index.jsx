const url = import.meta.env.VITE_API_URL

import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styles from './cadastroId.module.css'
import { GoPencil } from "react-icons/go";
import spinner from '../../../assets/spinner.gif'
import { formatarDataCriacaoAtualizacao } from '../../../utils/fomatters';

import { EnderecoId } from '../EnderecoId';
import { PessoaId } from '../PessoaId';
import { ConjugeId } from '../ConjugeId'
import { DomicilioId } from '../DomicilioId';
import { AcessoId } from '../AcessoId';
import { MembroId } from '../MembroId'
import { LuFileSpreadsheet } from "react-icons/lu";
import { BsFilePdfFill } from 'react-icons/bs';




export const CadastroId = () => {

    const [cadastro, setCadastro] = useState(null)
    const [pessoa, setPessoa] = useState(null)
    const [endereco, setEndereco] = useState(null)
    const [domicilio, setDomicilio] = useState(null)
    const [acesso, setAcesso] = useState(null)
    const [conjuge, setConjuge] = useState(null)
    const [composicaoFamiliar, setComposicaoFamiliar] = useState(null)
    const [membro, setMembro] = useState([])
    const [loading, setLoading] = useState(true)
    const [userCreator, setUserCreator] = useState(null)
    const [userId, setUserId] = useState(null)

    const { id } = useParams()

    useEffect(() => {
        const cadastroPessoal = async () => {
            try {
                const response = await fetch(`${url}/cadastro/${id}`, {
                    method: "GET",
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                const data = await response.json()

                setCadastro(data)

                const pessoaData = data.pessoas?.[0] || null

                setPessoa(pessoaData)
                setEndereco(pessoaData.endereco)
                setConjuge(pessoaData.conjuge)
                setDomicilio(pessoaData.domicilio)
                setAcesso(pessoaData.acesso)
                setComposicaoFamiliar(pessoaData.composicaoFamiliar)
                setMembro(pessoaData.composicaoFamiliar.membros)
                setUserId(data.user_id)

            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        cadastroPessoal()

    }, [id])

    useEffect(() => {
        const criador = async () => {
            try {
                const response = await fetch(`${url}/users/${cadastro.user_id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                })
                const userData = await response.json()

                setUserCreator(userData)

            } catch (err) {
                console.log(err.message)
            }
        }

        criador()
    }, [userId])

    const removeMembroUI = (idMembro) => {
        setMembro((prev) => prev.filter((m) => m.id !== idMembro))
    }

    const removeComposicaoUI = () => {
        setComposicaoFamiliar(null)
        setMembro([])
    }

    
    return (
        <div className={`${styles['scroll']} pb-2`}>
            {loading ?
                <div className='d-flex align-items-center justify-content-center h-100'>
                    <img src={spinner} />
                </div>
                :
                <div className='mb-4'>
                    <div className={`d-flex justify-content-between`}>
                        <h2 className={`${styles['title-cadastro']}`}>Cadastro</h2>
                        <Link to={`/dashboard/pdf-document/${id}`} className={` ${styles['link']}`}>
                            <div className={`border rounded-2 shadow py-1 px-2 bg-primary text-light`}>
                                <BsFilePdfFill size={24}   />
                                <p className='m-0 '>PDF</p>
                            </div>
                        </Link>
                    </div>
                    <p className=''>Criado {userCreator && <span>por {userCreator?.nome}</span>} em {formatarDataCriacaoAtualizacao(cadastro.createdAt)}</p>
                    <hr />
                    {pessoa ? <PessoaId pessoa={pessoa} /> : <p className='text-center dext-danger'>Cadastro Incompleto.</p>}
                    <hr />
                    {endereco !== null ? <EnderecoId endereco={endereco} /> : <p className='text-center dext-danger'>Cadastro Incompleto.</p>}
                    <hr />
                    {conjuge !== null && <div> <ConjugeId conjuge={conjuge} /> <hr /> </div>}

                    {domicilio !== null ? <DomicilioId domicilio={domicilio} /> : <p className='text-center dext-danger'>Cadastro Incompleto.</p>}
                    <hr />
                    {acesso !== null ? <AcessoId acesso={acesso} /> : <p className='text-center dext-danger'>Cadastro Incompleto.</p>}
                    <hr />
                    {composicaoFamiliar === null || membro !== null && <MembroId
                        membro={membro}
                        composicaoFamiliar={composicaoFamiliar}
                        onRemoveComposicao={removeComposicaoUI}
                        onRemoveMembro={removeMembroUI} />}
                    {composicaoFamiliar === null && <Link to={`/dashboard/composicao/${pessoa.id}`}><button className='btn btn-primary btn-sm w-100 mb-2'>Adicionar Composição Familiar a este Cadastro</button></Link>}
                    {conjuge === null && <Link to={`/dashboard/cadastro-conjuge-tardio/${pessoa.id}`}><button className='btn btn-primary btn-sm w-100'>Adicionar Conjuge a este Cadastro</button></Link>}
                </div>
            }


        </div>
    )
}