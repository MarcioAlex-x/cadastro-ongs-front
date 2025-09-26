import { useParams } from "react-router-dom"

export const CadastroEndereco = () =>{
    const { id } = useParams()
    return(
        <div>
            Cadastro Conjuge { id }
        </div>
    )
}