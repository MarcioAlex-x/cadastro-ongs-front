const url = import.meta.env.VITE_API_URL

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styles from './cadastroComposicaoFamiliar.module.css'
import { InputMask } from 'primereact/inputmask'
import Swal from "sweetalert2"
import { LuDot } from "react-icons/lu";

export const CadastroComposicaoFamiliar = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const initialState = {
        nome: '',
        data_nascimento: '',
        orientacao_sexual: '',
        parentesco: '',
        estado_civil: '',
        etnia: '',
        ocupacao: '',
        profissao: '',
        renda: '',
        escolaridade: '',
        frequenta_escola: '',
        beneficio_seguro_social: '',
        valor_beneficio_seguro_social: '',
        pcd: '',
        cpf:'',
        nis:'',
    }
    const [form, setForm] = useState(initialState)

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const handleFinish = (e) => {
        e.preventDefault()
        navigate('/dashboard/inicio')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const formToSend = { ...form }

        formToSend.renda = parseFloat(form.renda.replace(/\./g, '').replace(',', '.')) || 0
        formToSend.valor_beneficio_seguro_social = parseFloat(form.valor_beneficio_seguro_social.replace(/\./g, '').replace(',', '.')) || 0

        try {
            const response = await fetch(`${url}/composicao_familiar/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(formToSend)
            })
            

            const data = await response.json()

            if (!response.ok) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: 'Ocorreu um erro inexperado. Porfavor tente outra vez mais tarde!',
                    showCloseButton: true
                })
                return
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso',
                    text: 'Sucesso. Continue adicionando membros familiares ou conclua o cadastro!',
                    showCancelButton: false,
                    timer: 3000
                })
                
                setForm(initialState);
            }

        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className={`ps-3 ${styles['scroll']}`}>
            <h2 className={`${styles['title-cadastro']}`}>Composição Familiar</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nome" className={`${styles['text-cadastro']} form-label`}>Nome <LuDot className="text-danger" /> </label>
                    <input
                        required
                        type="text"
                        className="form-control"
                        id="nome"
                        name="nome"
                        value={form.nome}
                        onChange={handleChange} />
                </div>
                <div className="row">
                    <div className="col-md-4 col-12">
                        <label htmlFor="rg" id="rg" className={`${styles['text-cadastro']} form-label`}>RG <LuDot className="text-danger" /> </label>
                        <input
                            required
                            type="text"
                            className="form-control"
                            id="rg"
                            name="rg"
                            value={form.rg}
                            onChange={handleChange} />
                    </div>

                    <div className="col-md-4 col-12">
                        <label htmlFor="cpf" className={`${styles['text-cadastro']} form-label`}>CPF <LuDot className="text-danger" /> </label>
                        <InputMask
                            required
                            type="text"
                            mask='999.999.999-99'
                            pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
                            className="form-control"
                            id="cpf"
                            name="cpf"
                            value={form.cpf}
                            onChange={handleChange} ></InputMask>
                    </div>

                    <div className="col-md-4 col-12">
                        <label htmlFor="nis" className={`${styles['text-cadastro']} form-label`}>NIS <LuDot className="text-danger" /> </label>
                        <input
                            required
                            type="text"
                            pattern='\d{11}'
                            className="form-control"
                            id="nis"
                            name="nis"
                            value={form.nis}
                            onChange={handleChange} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3 col-12">
                        <label htmlFor="data_nascimento" className={`${styles['text-cadastro']} form-label`}>Data de Nascimento <LuDot className="text-danger" /> </label>
                        <input
                            required
                            type="date"
                            className="form-control"
                            id="data_nascimento"
                            name="data_nascimento"
                            value={form.data_nascimento}
                            onChange={handleChange} />
                    </div>
                    <div className="col-md-3 col-12">
                        <label htmlFor="orientacao_sexual" className={`${styles['text-cadastro']} form-label`}>Orientação Sexual <LuDot className="text-danger" /> </label>
                        <select
                            required
                            className="form-control"
                            name="orientacao_sexual"
                            id="orientacao_sexual"
                            value={form.orientacao_sexual}
                            onChange={handleChange}>
                            <option value="">Selecione</option>
                            <option value="Hétero">Hétero</option>
                            <option value="Gay">Gay</option>
                            <option value="Lésbica">Lésbica</option>
                            <option value="Bisexual">Bisexual</option>
                            <option value="Assexual">Assexual</option>
                            <option value="Pansexual">Pansexual</option>
                        </select>
                    </div>
                    <div className="col-12 col-md-3">
                        <label htmlFor="parentesco" className={`${styles['text-cadastro']} form-label`}>Parentesco <LuDot className="text-danger" /> </label>
                        <input
                            required
                            type="parentesco"
                            className="form-control"
                            id="parentesco"
                            name="parentesco"
                            value={form.parentesco}
                            onChange={handleChange} />
                    </div>
                    <div className="col-md-3 col-12">
                        <label htmlFor="estado_civil" className={`${styles['text-cadastro']} form-label`}>Estado Civil <LuDot className="text-danger" /> </label>
                        <select
                            required
                            className="form-control"
                            name="estado_civil"
                            id="estado_civil"
                            value={form.estado_civil}
                            onChange={handleChange}>
                            <option value="">Selecione</option>
                            <option value="Casado">Casado(a)</option>
                            <option value="Solteiro">Solteiro(a)</option>
                            <option value="Divorciado">Divorciado(a)</option>
                            <option value="Viúvo">Viúvo(a)</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 col-12">
                        <label htmlFor="etnia" className={`${styles['text-cadastro']} form-label`}>Etnia <LuDot className="text-danger" /> </label>
                        <select
                            required
                            className="form-control"
                            name="etnia"
                            id="etnia"
                            value={form.etnia}
                            onChange={handleChange}>
                            <option value="">Selecione</option>
                            <option value="Branco">Branco(a)</option>
                            <option value="Preto">Preto(a)</option>
                            <option value="Pardo">Pardo(a)</option>
                            <option value="Indígena">Indígena</option>
                            <option value="Outro">Outro</option>
                        </select>
                    </div>
                    <div className="col-md-4 col-12">
                        <label htmlFor="pcd" className={`${styles['text-cadastro']} form-label`}>PCD <LuDot className="text-danger" /> </label>
                        <select
                            required
                            className="form-control"
                            name="pcd"
                            id="pcd"
                            value={form.pcd}
                            onChange={handleChange}>
                            <option value="">Selecione</option>
                            <option value="Não">Não</option>
                            <option value="Sim">Sim</option>
                        </select>
                    </div>
                    <div className="col-12 col-md-4">
                        <label htmlFor="renda" className={`${styles['text-cadastro']} form-label`}>Renda <LuDot className="text-danger" /> </label>
                        <input
                            required
                            type="text"
                            className="form-control"
                            id="renda"
                            name="renda"
                            value={form.renda}
                            onChange={handleChange} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <label htmlFor="ocupacao" className={`${styles['text-cadastro']} form-label`}>Ocupação <LuDot className="text-danger" /> </label>
                        <input
                            required
                            type="text"
                            className="form-control"
                            id="ocupacao"
                            name="ocupacao"
                            value={form.ocupacao}
                            onChange={handleChange} />
                    </div>
                    <div className="col-12 col-md-6">
                        <label htmlFor="profissao" className={`${styles['text-cadastro']} form-label`}>Profissao</label>
                        <input
                            type="text"
                            className="form-control"
                            id="profissao"
                            name="profissao"
                            value={form.profissao}
                            onChange={handleChange} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-6 col-md-3">
                        <label htmlFor="escolaridade" className={`${styles['text-cadastro']} form-label`}>Escolaridade <LuDot className="text-danger" /> </label>
                        <input
                            required
                            type="text"
                            className="form-control"
                            id="escolaridade"
                            name="escolaridade"
                            value={form.escolaridade}
                            onChange={handleChange} />
                    </div>
                    <div className="col-md-3 col-12">
                        <label htmlFor="frequenta_escola" className={`${styles['text-cadastro']} form-label`}>Frequentando a Escola <LuDot className="text-danger" /> </label>
                        <select
                            required
                            className="form-control"
                            name="frequenta_escola"
                            id="frequenta_escola"
                            value={form.frequenta_escola}
                            onChange={handleChange}>
                            <option value="">Selecione</option>
                            <option value="Não">Não</option>
                            <option value="Sim">Sim</option>
                        </select>
                    </div>
                    <div className="col-6 col-md-3">
                        <label htmlFor="beneficio_seguro_social" className={`${styles['text-cadastro']} form-label`}>Benefício/Seguro Social <LuDot className="text-danger" /> </label>
                        <select
                            required
                            name="beneficio_seguro_social"
                            id="beneficio_seguro_social"
                            value={form.beneficio_seguro_social}
                            className="form-control"
                            onChange={handleChange}>
                            <option value="">Selecione</option>
                            <option value="Nenhum">Nenhum</option>
                            <option value="Licença Médica">Licença Médica</option>
                            <option value="Aposentadoria">Aposentadoria</option>
                            <option value="Pensão Alimentícia">Pensão Alimentícia</option>
                            <option value="Seguro Desemprego">Seguro Desemprego</option>
                            <option value="Bolsa Família">Bolsa Família</option>
                            <option value="BPC">BPC</option>
                        </select>
                    </div>
                    <div className="col-6 col-md-3">
                        <label htmlFor="valor_beneficio_seguro_social" className={`${styles['text-cadastro']} form-label`}>Valor do Benefício</label>
                        <input
                            type="text"
                            className="form-control"
                            id="valor_beneficio_seguro_social"
                            name="valor_beneficio_seguro_social"
                            value={form.valor_beneficio_seguro_social}
                            onChange={handleChange} />
                    </div>
                </div>
                <input
                    type="submit"
                    value="Salvar"
                    className={`${styles['text-cadastro']} btn btn-success my-4 d-block w-100`} />
            </form>
            <input
                type="button"
                onClick={handleFinish}
                value="Concluir Cadastro"
                className={`${styles['text-cadastro']} btn btn-primary mb-4 d-block w-100`} />
        </div>
    )
}