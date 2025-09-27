import { useNavigate, useParams } from "react-router-dom"
import styles from './cadastroEndereco.module.css'
import { useState } from "react"
import { useAuth } from "../../../context/AuthContext"
import { InputMask } from "primereact/inputmask"

export const CadastroEndereco = () => {

    const { user } = useAuth()
    const { id } = useParams()
    const navigate = useNavigate()

    const [form, setForm] = useState({
        logradouro: '',
        numero: '',
        bairro: '',
        cep:''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm({
            ...form,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`http://localhost:3000/endereco/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ ...form })
            })

            const data = response.json()
            if(data){
                navigate(`/dashboard/cadastro-domiciliar/${id}`)
            }
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className={`ps-3 ${styles['scroll']}`}>
            <h2 className={`${styles['title-cadastro']}`}>Endereço</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="logradouro" className={`${styles['text-cadastro']} form-label`}>Logradouro</label>
                    <input
                        type="text"
                        required
                        className="form-control"
                        id="logradouro"
                        name="logradouro"
                        value={form.logradouro}
                        onChange={handleChange} />
                </div>
                <div className="row">
                    <div className='col-12 col-md-4'>
                        <label htmlFor="numero" className={`${styles['text-cadastro']} form-label`}>Número</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            id="numero"
                            name="numero"
                            value={form.numero}
                            onChange={handleChange} />
                    </div>
                    <div className='col-12 col-md-4'>
                        <label htmlFor="bairro" className={`${styles['text-cadastro']} form-label`}>Bairro</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            id="bairro"
                            name="bairro"
                            value={form.bairro}
                            onChange={handleChange} />
                    </div>
                    <div className='col-12 col-md-4'>
                        <label htmlFor="cep" className={`${styles['text-cadastro']} form-label`}>CEP</label>
                        <InputMask
                            type="text"
                            mask="99.999-999"
                            className="form-control"
                            id="cep"
                            name="cep"
                            value={form.cep}
                            onChange={handleChange} ></InputMask>
                    </div>
                </div>
                <input type="submit" value="Salvar"  className={`${styles['text-cadastro']} btn btn-success my-4 d-block w-100`} />
            </form>
        </div>
    )
}