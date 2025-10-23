const url = import.meta.env.VITE_API_URL

import styles from './cadastro.module.css'
import { FiPlus } from "react-icons/fi";
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Cadastro = () => {

    const { user } = useAuth()
    const navigate = useNavigate()

    const novoCadastro = async () =>{
        try{
            const response = await fetch(`${url}/cadastro`,{
                credentials:'include',
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({user_id:user.id})
            })
            const data = await response.json()
            return data
        }catch(err){
            console.log(err)
        }
    }

    const handleNovoCadastro = async (e) =>{
        e.preventDefault()
        const novo = await novoCadastro()
        if(novo.id){
            navigate(`/dashboard/cadastro-pessoal/${novo.id}`)
        }else{
            console.log('Erro: Cadastro não respondeu.')
        }
    }



    return (
        <div>
            <div>
                <h2 className={`${styles['title-cadastro']}`}>Novo Cadastro de Beneficiário</h2>
                <div className={`${styles['card-cadastro']} card shadow`}>
                    <div className="card-body">
                        <h3 className={`${styles['title-cadastro']} card-title text-danger `}>Importante!</h3>
                        <p className={`${styles['text-cadastro']} card-text`}>Ao iniciar um cadastro de beneficiário é importante que seja concluído, todos os dados preenchidos na ordem, para que os relatórios sejam acertivos.</p>
                        <p className={`${styles['text-cadastro']} card-text`}>Se por ventura ocorrer algum erro de digitação durante o processo de cadastramento, não volte para a página anterior, continue cadastrando e atualize posteriormente para não duplicar os dados.</p>
                    </div>
                </div>
            </div>
            <form onSubmit={handleNovoCadastro}>
                <button
                    className='btn btn-success d-flex align-items-center m-auto mt-5'>
                    <FiPlus size={20}
                    />
                    Iniciar Cadastro
                </button>
            </form>
        </div>
    )
}