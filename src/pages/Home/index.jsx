const url = import.meta.env.VITE_API_URL
import { useEffect, useState } from "react"
import Style from './Home.module.css'
import { Link } from "react-router-dom"

export const Home = () => {

    const [instituicao, setInstituicao] = useState([])

    const fetchApi = async () => {
        const response = await fetch(`${url}/instituicao`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })

        const data = await response.json()
        setInstituicao(data[0])
    }

    useEffect(() => {
        fetchApi()
    }, [])

    if (!instituicao || instituicao === null) {
        return (
            <div className="container">
                <h2 className="text-center">Preencha as informações da instiuição no Painel do Administrador.</h2>
            </div>
        )
    }

    const {
        agenciaBanco1,
        agenciaBanco2,
        bairro,
        cep,
        chavePix,
        cidade,
        cnpj,
        contaBanco1,
        contaBanco2,
        createdAt,
        email,
        facebook,
        heroFrase,
        heroImagem,
        imagemInstituicao,
        instagram,
        logradouro,
        missao,
        missaoImagem,
        nome,
        nomeBanco1,
        nomeBanco2,
        numero,
        operacaoBanco1,
        operacaoBanco2,
        qrCodePixImagem,
        sobre,
        sobreImagem,
        spotify,
        telefone,
        telefone2,
        tiktok,
        tipoContaBanco1,
        tipoContaBanco2,
        uf,
        updatedAt,
        valores,
        valoresImagem,
        visao,
        visaoImagem,
        x,
        youtube,
    } = instituicao

    return (
        <div className={`${Style.homeContainer}`}>
            <div>
                <nav className='d-flex justify-content-between align-items-center p-3'>
                    <div>
                        {imagemInstituicao && <img className={Style.imagemInstituicao} src={imagemInstituicao} alt="" />}
                    </div>
                    <div>
                       
                    </div>
                    <div><Link to='/login' className={Style.link} >Login</Link></div>
                </nav>
            </div>
            <div className="container">

                {/* Hero */}

                <div className={`${Style.hero} row`}>
                     {nome && <h1 className="text-center my-4">{nome}</h1>}
                    {heroImagem && <img className="col-12" src={heroImagem} alt={`Imagem hero de ${nome}`} />}
                    {heroFrase && <p className="col-12 text-center">{heroFrase}</p>}
                </div>
                {/* Nos a jude a mudar histórias de vida */}
                <div>
                    {nome && <button className={Style.chamada1}>Nos ajude a mudar histórias de vida</button>}
                </div>
                {/* Sobre */}
                <div>
                    {sobreImagem && <img className="col-6" src={sobreImagem} alt={`imagem sobre ${nome}`} />}
                    {sobre && <p>{sobre}</p>}
                </div>
            </div>
        </div>
    )
}