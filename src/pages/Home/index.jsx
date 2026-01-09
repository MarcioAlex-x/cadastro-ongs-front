const url = import.meta.env.VITE_API_URL
import { useEffect, useState } from "react"
import Style from './Home.module.css'
import { Link } from "react-router-dom"

export const Home = () => {
    
    const [instituicao, setInstituicao] = useState([])

    const fetchApi = async () =>{
        const response = await fetch(`${url}/instituicao`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
            credentials:'include'
        })
        
        const data = await response.json()
        setInstituicao(data[0])    
    }

    useEffect(() => {
        fetchApi()
    }, [])

    if(!instituicao || instituicao === null){
        return(
            <div className="container">
                <h2 className="text-center">Preenhca as informações da instiuição no Painel do Administrador.</h2>
            </div>
        )
    }

    return (
        <div className={`${Style.homeContainer}`}>
            <div className="container">
                <nav className='d-flex justify-content-between align-items-center p-3'>
                    <div>
                        <img className={Style.imagemInstituicao} src={instituicao.imagemInstituicao} alt="" />
                        {console.log(instituicao)}
                    </div>
                    <div>
                        <h1>{instituicao.nome}</h1>
                    </div>
                    <div><Link to='/login' className={Style.link} >Login</Link></div>
                </nav>
            </div>

            {/* Hero */}

            <div className={Style.hero}>

            </div>
        </div>
    )
}