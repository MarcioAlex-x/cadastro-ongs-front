const url = import.meta.env.VITE_API_URL

import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../../../context/AuthContext"
import styles from './cadastroDomiciliar.module.css'
import { useState } from "react"

export const CadastroDomiciliar = () => {

    const { id } = useParams()
    const { user } = useAuth()
    const navigate = useNavigate()

    const [form, setForm] = useState({
        tipo_localidade: '',
        condicoes_moradia: '',
        situacao_coabitacao_familiar: '',
        tipo_constucao: '',
        psf_proximo: '',
        posto_policia_proximo: '',
        creche_proximo: '',
        praca_proximo: '',
        abastecimento_agua: '',
        abastecimento_energia: '',
        esgotamento_sanitario: '',
        destino_lixo: '',
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
            const response = await fetch(`${url}/dados_domiciliar/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ ...form })
            })
            const data = response.json()

            if (data) {
                navigate(`/dashboard/acesso/${id}`)
            }
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className={`ps-3 ${styles['scroll']}`}>
            <h2 className={`${styles['title-cadastro']}`}>Condições Domiciliar</h2>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-4 col-12">
                        <label htmlFor="tipo_localidade" className={`${styles['text-cadastro']} form-label`}><span className="text-danger">*</span>Localidade</label>
                        <select
                        required
                            className="form-control"
                            name="tipo_localidade"
                            id="tipo_localidade"
                            value={form.tipo_localidade}
                            onChange={handleChange}>
                            <option value="">Selecione</option>
                            <option value="Urbana">Urbana</option>
                            <option value="Rural">Rural</option>
                        </select>
                    </div>
                    <div className="col-md-4 col-12">
                        <label htmlFor="condicoes_moradia" className={`${styles['text-cadastro']} form-label`}>Condições de Moradia<span className="text-danger">*</span></label>
                        <select
                        required
                            className="form-control"
                            name="condicoes_moradia"
                            id="condicoes_moradia"
                            value={form.condicoes_moradia}
                            onChange={handleChange}>
                            <option value="">Selecione</option>
                            <option value="Própria">Própria</option>
                            <option value="Alugada">Alugada</option>
                            <option value="Cedido">Cedida</option>
                            <option value="Invadido">Invadido</option>
                            <option value="República">República</option>
                            <option value="Residência Estudantil">Residencia Estudantil</option>
                            <option value="Moradia Compartilhada">Moradia Compartilhada</option>
                            <option value="Outro">Outro</option>
                        </select>
                    </div>
                    <div className="col-md-4 col-12">
                        <label htmlFor="situacao_coabitacao_familiar" className={`${styles['text-cadastro']} form-label`}>Situação de Coabitação Familiar<span className="text-danger">*</span></label>
                        <select
                        required
                            className="form-control"
                            name="situacao_coabitacao_familiar"
                            id="situacao_coabitacao_familiar"
                            value={form.situacao_coabitacao_familiar}
                            onChange={handleChange}>
                            <option value="">Selecione</option>
                            <option value="Não">Não</option>
                            <option value="Sim">Sim</option>
                        </select>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4 col-12">
                        <label htmlFor="tipo_constucao" className={`${styles['text-cadastro']} form-label`}>Tipo de Construção<span className="text-danger">*</span></label>
                        <select
                        required
                            className="form-control"
                            name="tipo_constucao"
                            id="tipo_constucao"
                            value={form.tipo_constucao}
                            onChange={handleChange}>
                            <option value="">Selecione</option>
                            <option value="Alvenaria">Alvenaria</option>
                            <option value="Taipa">Taipa</option>
                            <option value="Materiais Recicláveis">Materiais Recicláveis</option>
                        </select>
                    </div>
                    <div className="col-md-4 col-12">
                        <label htmlFor="psf_proximo" className={`${styles['text-cadastro']} form-label`}>Local Coberto por PSF<span className="text-danger">*</span></label>
                        <select
                        required
                            className="form-control"
                            name="psf_proximo"
                            id="psf_proximo"
                            value={form.psf_proximo}
                            onChange={handleChange}>
                            <option value="">Selecione</option>
                            <option value="Não">Não</option>
                            <option value="Sim">Sim</option>
                        </select>
                    </div>
                    <div className="col-md-4 col-12">
                        <label htmlFor="posto_policia_proximo" className={`${styles['text-cadastro']} form-label`}>Local Coberto por Posto de Polícia<span className="text-danger">*</span></label>
                        <select
                        required
                            className="form-control"
                            name="posto_policia_proximo"
                            id="posto_policia_proximo"
                            value={form.posto_policia_proximo}
                            onChange={handleChange}>
                            <option value="">Selecione</option>
                            <option value="Não">Não</option>
                            <option value="Sim">Sim</option>
                        </select>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4 col-12">
                        <label htmlFor="creche_proximo" className={`${styles['text-cadastro']} form-label`}>Local Coberto por Creche<span className="text-danger">*</span></label>
                        <select
                        required
                            className="form-control"
                            name="creche_proximo"
                            id="creche_proximo"
                            value={form.creche_proximo}
                            onChange={handleChange}>
                            <option value="">Selecione</option>
                            <option value="Não">Não</option>
                            <option value="Sim">Sim</option>
                        </select>
                    </div>
                    <div className="col-md-4 col-12">
                        <label htmlFor="praca_proximo" className={`${styles['text-cadastro']} form-label`}>Local Coberto por Praça<span className="text-danger">*</span></label>
                        <select
                        required
                            className="form-control"
                            name="praca_proximo"
                            id="praca_proximo"
                            value={form.praca_proximo}
                            onChange={handleChange}>
                            <option value="">Selecione</option>
                            <option value="Não">Não</option>
                            <option value="Sim">Sim</option>
                        </select>
                    </div>
                    <div className="col-md-4 col-12">
                        <label htmlFor="abastecimento_energia" className={`${styles['text-cadastro']} form-label`}>Abastecimento de Energia<span className="text-danger">*</span></label>
                        <select
                        required
                            className="form-control"
                            name="abastecimento_energia"
                            id="abastecimento_energia"
                            value={form.abastecimento_energia}
                            onChange={handleChange}>
                            <option value="">Selecione</option>
                            <option value="Medidor Próprio">Medidor Próprio</option>
                            <option value="Medidor Compartilhado">Medidor Compartilhado</option>
                            <option value="Sem Medidor">Sem Medidor</option>
                            <option value="Ligação Clandestina">Ligação Clandestina</option>
                        </select>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4 col-12">
                        <label htmlFor="abastecimento_agua" className={`${styles['text-cadastro']} form-label`}>Abastecimento de Água<span className="text-danger">*</span></label>
                        <select
                        required
                            className="form-control"
                            name="abastecimento_agua"
                            id="abastecimento_agua"
                            value={form.abastecimento_agua}
                            onChange={handleChange}>
                            <option value="">Selecione</option>
                            <option value="Rede Pública">Rede Pública</option>
                            <option value="Poço">Poço</option>
                            <option value="Ligação Clandestina">Ligação Clandestina</option>
                        </select>
                    </div>
                    <div className="col-md-4 col-12">
                        <label htmlFor="esgotamento_sanitario" className={`${styles['text-cadastro']} form-label`}>Esgotamento Sanitário<span className="text-danger">*</span></label>
                        <select
                        required
                            className="form-control"
                            name="esgotamento_sanitario"
                            id="esgotamento_sanitario"
                            value={form.esgotamento_sanitario}
                            onChange={handleChange}>
                            <option value="">Selecione</option>
                            <option value="Rede Pública">Rede Pública</option>
                            <option value="Fossa">Fossa</option>
                            <option value="Céu Aberto">Céu Aberto</option>
                            <option value="Rio">Rio</option>
                        </select>
                    </div>
                    <div className="col-md-4 col-12">
                        <label htmlFor="destino_lixo" className={`${styles['text-cadastro']} form-label`}>Destino do Lixo<span className="text-danger">*</span></label>
                        <select
                        required
                            className="form-control"
                            name="destino_lixo"
                            id="destino_lixo"
                            value={form.destino_lixo}
                            onChange={handleChange}>
                            <option value="">Selecione</option>
                            <option value="Coletado">Coletado</option>
                            <option value="Céu Aberto">Céu Aberto</option>
                            <option value="Queimado">Queimado</option>
                            <option value="Enterrado">Enterrado</option>
                        </select>
                    </div>
                </div>
                <input type="submit" value="Salvar" className={`${styles['text-cadastro']} btn btn-success my-4 d-block w-100`} />
            </form>
        </div>
    )
}