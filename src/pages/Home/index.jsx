const url = import.meta.env.VITE_API_URL
import { useEffect, useState } from "react"

export const Home = () => {
    
    const [instituicao, setInstituicao] = useState({})

    const fetchApi = async () =>{
        const response = await fetch(`${url}/instituicao`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
            credentials:'include'
        })
        
        const data = await response.json()
        console.log(data)
        setInstituicao(data)    
    }

    useEffect(() => {
        fetchApi()
    }, [])

    return (
        <div>
            <nav>
                <div>
                    <img src={instituicao[0].imagemInstituicao} alt="" />
                    <p>{instituicao[0].nome}</p>
                </div>

                <div>
                    
                </div>
            </nav>
        </div>
    )
}