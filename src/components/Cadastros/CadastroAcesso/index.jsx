const url = import.meta.env.VITE_API_URL

import { useNavigate, useParams } from "react-router-dom"
import styles from './cadastroAcesso.module.css'
import { useState } from "react"

export const CadastroAcesso = () => {

    const navigate = useNavigate()
    const { id } = useParams()

    const [form, setForm] = useState({
        maus_tratos: '',
        discricao_maus_tratos: '',
        violencia_domestica: '',
        discriminacao_rejeicao_familiar: '',
        discriminacao_social_etnico_racial_sexual: '',
        acesso_saude: '',
        acesso_esporte_cultura_lazer: ''
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
            const response = await fetch(`${url}/acesso/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({ ...form })
            })

            const data = await response.json()

            if (data) {
                navigate(`/dashboard/composicao/${id}`)
            }
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div>
            <h2 className={`${styles['title-cadastro']}`}>Acessos e Vulnerabilidade <span className="text-danger">*</span> </h2>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-4 col-12">
                        <label htmlFor="maus_tratos" className={`${styles['text-cadastro']} form-label`}>Maus Tratos</label>
                        <select
                        required
                            className="form-control"
                            name="maus_tratos"
                            id="maus_tratos"
                            value={form.maus_tratos}
                            onChange={handleChange}>
                            <option value="">Selecione</option>
                            <option value="Não">Não</option>
                            <option value="Sim">Sim</option>
                        </select>
                    </div>
                    <div className="col-md-8 col-12">
                        <label htmlFor="discricao_maus_tratos" className={`${styles['text-cadastro']} form-label`}>Descrição de Maus Tratos</label>
                        <input
                            type="text"
                            className="form-control"
                            name="discricao_maus_tratos"
                            id="discricao_maus_tratos"
                            value={form.discricao_maus_tratos}
                            onChange={handleChange} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 col-12">
                        <label htmlFor="violencia_domestica" className={`${styles['text-cadastro']} form-label`}>Violência Doméstica<span className="text-danger">*</span></label>
                        <select
                        required
                            className="form-control"
                            name="violencia_domestica"
                            id="violencia_domestica"
                            value={form.violencia_domestica}
                            onChange={handleChange}>
                            <option value="">Selecione</option>
                            <option value="Não">Não</option>
                            <option value="Sim">Sim</option>
                        </select>
                    </div>
                    <div className="col-md-4 col-12">
                        <label htmlFor="discriminacao_rejeicao_familiar" className={`${styles['text-cadastro']} form-label`}>Descriminação ou Rejeição Familiar<span className="text-danger">*</span></label>
                        <select
                        required
                            className="form-control"
                            name="discriminacao_rejeicao_familiar"
                            id="discriminacao_rejeicao_familiar"
                            value={form.discriminacao_rejeicao_familiar}
                            onChange={handleChange}>
                            <option value="">Selecione</option>
                            <option value="Não">Não</option>
                            <option value="Sim">Sim</option>
                        </select>
                    </div>
                    <div className="col-md-4 col-12">
                        <label htmlFor="discriminacao_social_etnico_racial_sexual" className={`${styles['text-cadastro']} form-label`}>Descriminação Socail, Étnico, Racial ou Sexual<span className="text-danger">*</span></label>
                        <select
                        required
                            className="form-control"
                            name="discriminacao_social_etnico_racial_sexual"
                            id="discriminacao_social_etnico_racial_sexual"
                            value={form.discriminacao_social_etnico_racial_sexual}
                            onChange={handleChange}>
                            <option value="">Selecione</option>
                            <option value="Não">Não</option>
                            <option value="Sim">Sim</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 col-12">
                        <label htmlFor="acesso_saude" className={`${styles['text-cadastro']} form-label`}>Acesso a Saúde<span className="text-danger">*</span></label>
                        <select
                        required
                            className="form-control"
                            name="acesso_saude"
                            id="acesso_saude"
                            value={form.acesso_saude}
                            onChange={handleChange}>
                            <option value="">Selecione</option>
                            <option value="Não">Não</option>
                            <option value="Sim">Sim</option>
                        </select>
                    </div>
                    <div className="col-md-6 col-12">
                        <label htmlFor="acesso_esporte_cultura_lazer" className={`${styles['text-cadastro']} form-label`}>Acesso a Esporte, Cultura e Lazer<span className="text-danger">*</span></label>
                        <select
                        required
                            className="form-control"
                            name="acesso_esporte_cultura_lazer"
                            id="acesso_esporte_cultura_lazer"
                            value={form.acesso_esporte_cultura_lazer}
                            onChange={handleChange}>
                            <option value="">Selecione</option>
                            <option value="Não">Não</option>
                            <option value="Sim">Sim</option>
                        </select>
                    </div>
                    <input type="submit" value="Salvar" className={`${styles['text-cadastro']} btn btn-success my-4 d-block w-100`} />
                </div>
            </form>
        </div>
    )
}