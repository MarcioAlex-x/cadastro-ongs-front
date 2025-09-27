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
            const response = await fetch(`http://localhost:3000/dados_domiciliar/${id}`, {
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
                        <label htmlFor="tipo_localidade" className={`${styles['text-cadastro']} form-label`}>Localidade</label>
                        <select
                            className="form-control"
                            name="tipo_localidade"
                            id="tipo_localidade"
                            value={form.tipo_localidade}
                            onChange={handleChange}>
                            <option value="">Selecione</option>
                            <option value="urbana">Urbana</option>
                            <option value="rural">Rural</option>
                        </select>
                    </div>
                    <div className="col-md-4 col-12">
                        <label htmlFor="condicoes_moradia" className={`${styles['text-cadastro']} form-label`}>Condições de Moradia</label>
                        <select
                            className="form-control"
                            name="condicoes_moradia"
                            id="condicoes_moradia"
                            value={form.condicoes_moradia}
                            onChange={handleChange}>
                            <option value="">Selecione</option>
                            <option value="propria">Própria</option>
                            <option value="alugada">Alugada</option>
                            <option value="cedido">Cedida</option>
                            <option value="invadido">Invadido</option>
                            <option value="republica">República</option>
                            <option value="residencia_estudantil">Residencia Estudantil</option>
                            <option value="moradia_compartilhada">Moradia Compartilhada</option>
                            <option value="outro">Outro</option>
                        </select>
                    </div>
                    <div className="col-md-4 col-12">
                        <label htmlFor="situacao_coabitacao_familiar" className={`${styles['text-cadastro']} form-label`}>Situação de Coabitação Familiar</label>
                        <select
                            className="form-control"
                            name="situacao_coabitacao_familiar"
                            id="situacao_coabitacao_familiar"
                            value={form.situacao_coabitacao_familiar}
                            onChange={handleChange}>
                            <option value="">Selecione</option>
                            <option value="nao">Não</option>
                            <option value="sim">Sim</option>
                        </select>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4 col-12">
                        <label htmlFor="tipo_constucao" className={`${styles['text-cadastro']} form-label`}>Tipo de Construção</label>
                        <select
                            className="form-control"
                            name="tipo_constucao"
                            id="tipo_constucao"
                            value={form.tipo_constucao}
                            onChange={handleChange}>
                            <option value="">Selecione</option>
                            <option value="alvenaria">Alvenaria</option>
                            <option value="taipa">Taipa</option>
                            <option value="materiais_reciclaveis">Materiais Recicláveis</option>
                        </select>
                    </div>
                    <div className="col-md-4 col-12">
                        <label htmlFor="psf_proximo" className={`${styles['text-cadastro']} form-label`}>Local Coberto por PSF</label>
                        <select
                            className="form-control"
                            name="psf_proximo"
                            id="psf_proximo"
                            value={form.psf_proximo}
                            onChange={handleChange}>
                            <option value="">Selecione</option>
                            <option value="nao">Não</option>
                            <option value="sim">Sim</option>
                        </select>
                    </div>
                    <div className="col-md-4 col-12">
                        <label htmlFor="posto_policia_proximo" className={`${styles['text-cadastro']} form-label`}>Local Coberto por Posto de Polícia</label>
                        <select
                            className="form-control"
                            name="posto_policia_proximo"
                            id="posto_policia_proximo"
                            value={form.posto_policia_proximo}
                            onChange={handleChange}>
                            <option value="">Selecione</option>
                            <option value="nao">Não</option>
                            <option value="sim">Sim</option>
                        </select>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4 col-12">
                        <label htmlFor="creche_proximo" className={`${styles['text-cadastro']} form-label`}>Local Coberto por Creche</label>
                        <select
                            className="form-control"
                            name="creche_proximo"
                            id="creche_proximo"
                            value={form.creche_proximo}
                            onChange={handleChange}>
                            <option value="">Selecione</option>
                            <option value="nao">Não</option>
                            <option value="sim">Sim</option>
                        </select>
                    </div>
                    <div className="col-md-4 col-12">
                        <label htmlFor="praca_proximo" className={`${styles['text-cadastro']} form-label`}>Local Coberto por Praça</label>
                        <select
                            className="form-control"
                            name="praca_proximo"
                            id="praca_proximo"
                            value={form.praca_proximo}
                            onChange={handleChange}>
                            <option value="">Selecione</option>
                            <option value="nao">Não</option>
                            <option value="sim">Sim</option>
                        </select>
                    </div>
                    <div className="col-md-4 col-12">
                        <label htmlFor="abastecimento_energia" className={`${styles['text-cadastro']} form-label`}>Abastecimento de Energia</label>
                        <select
                            className="form-control"
                            name="abastecimento_energia"
                            id="abastecimento_energia"
                            value={form.abastecimento_energia}
                            onChange={handleChange}>
                            <option value="">Selecione</option>
                            <option value="medidor_proprio">Medidor Próprio</option>
                            <option value="medidor_compartilhado">Medidor Compartilhado</option>
                            <option value="sem_medidor">Sem Medidor</option>
                            <option value="ligacao_clandestina">Ligação Clandestina</option>
                        </select>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4 col-12">
                        <label htmlFor="abastecimento_agua" className={`${styles['text-cadastro']} form-label`}>Abastecimento de Água</label>
                        <select
                            className="form-control"
                            name="abastecimento_agua"
                            id="abastecimento_agua"
                            value={form.abastecimento_agua}
                            onChange={handleChange}>
                            <option value="">Selecione</option>
                            <option value="rede_publica">Rede Pública</option>
                            <option value="poco">Poço</option>
                            <option value="ligacao_clandestina">Ligação Clandestina</option>
                        </select>
                    </div>
                    <div className="col-md-4 col-12">
                        <label htmlFor="esgotamento_sanitario" className={`${styles['text-cadastro']} form-label`}>Esgotamento Sanitário</label>
                        <select
                            className="form-control"
                            name="esgotamento_sanitario"
                            id="esgotamento_sanitario"
                            value={form.esgotamento_sanitario}
                            onChange={handleChange}>
                            <option value="">Selecione</option>
                            <option value="rede_publica">Rede Pública</option>
                            <option value="fossa">Fossa</option>
                            <option value="ceu_aberto">Céu Aberto</option>
                            <option value="rio">Rio</option>
                        </select>
                    </div>
                    <div className="col-md-4 col-12">
                        <label htmlFor="destino_lixo" className={`${styles['text-cadastro']} form-label`}>Destino do Lixo</label>
                        <select
                            className="form-control"
                            name="destino_lixo"
                            id="destino_lixo"
                            value={form.destino_lixo}
                            onChange={handleChange}>
                            <option value="">Selecione</option>
                            <option value="coletado">Coletado</option>
                            <option value="ceu_aberto">Ceu Aberto</option>
                            <option value="queimado">Queimado</option>
                            <option value="enterrado">Enterrado</option>
                        </select>
                    </div>
                </div>
                <input type="submit" value="Salvar" className={`${styles['text-cadastro']} btn btn-success my-4 d-block w-100`} />
            </form>
        </div>
    )
}