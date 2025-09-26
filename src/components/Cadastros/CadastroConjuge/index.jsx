import { useParams } from "react-router-dom"

export const CadastroConjuge = () =>{
    const { id } = useParams()
    return(
        <div>Cadastro Conjuge {id} </div>
    )
}