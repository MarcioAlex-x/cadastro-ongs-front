import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from './cadastroId.module.css'
import { GoPencil } from "react-icons/go";
import spinner from '../../../assets/spinner.gif'
import { formatarDataCriacaoAtualizacao } from '../../../utils/fomatters';

import { EnderecoId } from '../EnderecoId';
import { PessoaId } from '../PessoaId';
import { ConjugeId } from '../ConjugeId'
import { DomicilioId } from '../DomicilioId';



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
                const response = await fetch(`http://localhost:3000/cadastro/${id}`, {
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
                setUserId(data.user_id)


            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }       

        cadastroPessoal()

    }, [id])

    useEffect(()=>{
         const criador = async () => {
            try {
                const response = await fetch(`http://localhost:3000/users/${cadastro.user_id}`, {
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
    },[userId])

    return (
        <div className={`${styles['scroll']}`}>
            {loading ?
                <div className='d-flex align-items-center justify-content-center h-100'>
                    <img src={spinner} />
                </div>
                :
                <div>
                    <h2 className={`${styles['title-cadastro']}`}>Cadastro ID: {cadastro?.id}</h2>
                    <p className='text-end text-secondary'>Criado por {userCreator?.nome} em {formatarDataCriacaoAtualizacao(cadastro.createdAt)}</p>
                    <hr />
                    {pessoa ? <PessoaId pessoa={pessoa} /> : <p className='text-center dext-danger'>Cadastro Incompleto.</p>}
                    <hr />
                    {endereco !== null ? <EnderecoId endereco={endereco} /> : <p className='text-center dext-danger'>Cadastro Incompleto.</p>}
                    <hr />
                    {conjuge !== null && <ConjugeId conjuge={conjuge} />}
                    <hr />
                    {domicilio !== null ? <DomicilioId domicilio={domicilio} /> : <p className='text-center dext-danger'>Cadastro Incompleto.</p>}
                </div>
            }


        </div>
    )
}