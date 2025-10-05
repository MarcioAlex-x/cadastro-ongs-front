import { useAuth } from "../../../context/AuthContext"
import styles from './composicaoFamiliar.module.css'
import { useNavigate, useParams } from 'react-router-dom'

export const UpdateComposicaoFamiliar = () =>{
    const { user } = useAuth()
    const { id } = useParams()
    const navigate = useNavigate()

    const handleFinish = (e) =>{
        e.preventDefault()
        navigate('/dashboard/inicio')
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try {
            const response = await fetch(`http://localhost:3000/composicao/${id}`,{
                method:'POST',
                headers:{
                    'Content-Type':"Aplicattion/json"
                },
                credentials:'include',
            })

            const data = await response.json()
            console.log(data)
            if(data){
                navigate(`/dashboard/cadastro-composicao-familiar/${data.id}`)
            }
        } catch (err) {
            console.error(err)
        }
    }

    return(
        <div className="">
            <h2 className={`${styles['title-cadastro']}`}>Composição Familiar</h2>
            <div className="p-5 border rounded shadow">
                <p className={`${styles['text-cadastro']} fs-5 text-center`}>Conclua o cadastro ou siga adicionando a composição familiar do beneficiário que está sendo cadastrado selecionando uma das opções a baixo!</p>
                <form onSubmit={handleSubmit} className="mt-5">
                    <input
                    type="submit"
                    name=""
                    value="Adicionar Composição Familiar"
                    className={`${styles['text-cadastro']} btn btn-primary mb-4 d-block w-100`} />
                </form>
                <input
                    type="button"
                    onClick={handleFinish}
                    value="Concluir sem Composição Familiar"
                    className={`${styles['text-cadastro']} btn btn-success mb-4 d-block w-100`} />
            </div>
        </div>
    )
}