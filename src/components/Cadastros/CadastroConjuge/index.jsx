import { useNavigate, useParams } from "react-router-dom"
import styles from './cadastroConjuge.module.css'
import { useState } from "react"

export const CadastroConjuge = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [form, setForm] = useState({
        nome: '',
        data_nascimento: '',
        etnia: '',
        situacao_mercado_trabalho: '',
        renda: '',
        ocupacao: '',
        deficiencia: '',
        tipo_deficiencia: '',
        beneficio_seguro_social: '',
        valor_beneficio_seguro_social: '',
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

        const formToSend = { ...form }

        formToSend.renda = parseFloat(form.renda.replace(/\./g, '').replace(',', '.')) || 0
        formToSend.valor_beneficio_seguro_social = parseFloat(form.valor_beneficio_seguro_social.replace(/\./g, '').replace(',', '.'))

        try {
            const response = await fetch(`http://localhost:3000/conjuge/${id}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(formToSend)
            })

            const data = response.json()
            if (data) {
                navigate(`/dashboard/cadastro-endereco/${id}`)
            }
        } catch (err) {
            console.log(err, '-', err.message)
        }
    }

    return (
        <div className={`ps-3 ${styles['scroll']}`}>
            <h2 className={`${styles['title-cadastro']}`}>Conjuge</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nome" id="nome" className={`${styles['text-cadastro']} form-label`}>Nome</label>
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
                        <label htmlFor="data_nascimento" className={`${styles['text-cadastro']} form-label`}>Data de Nascimento</label>
                        <input
                            required
                            type="date"
                            className="form-control"
                            id="data_nascimento"
                            name="data_nascimento"
                            value={form.data_nascimento}
                            onChange={handleChange} />
                    </div>
                    <div className="col-md-4 col-12">
                        <label htmlFor="etnia" className={`${styles['text-cadastro']} form-label`}>Etnia</label>
                        <select
                            required
                            className="form-control"
                            name="etnia"
                            id="etnia"
                            value={form.etnia}
                            onChange={handleChange}>
                            <option value="">Selecione</option>
                            <option value="branco">Branco(a)</option>
                            <option value="preto">Preto(a)</option>
                            <option value="pardo">Pardo(a)</option>
                            <option value="indigena">Indígena</option>
                            <option value="outro">Outro</option>
                        </select>
                    </div>
                    <div className="col-6 col-md-4">
                        <label htmlFor="situacao_mercado_trabalho" className={`${styles['text-cadastro']} form-label`}>Situação Trabalhista</label>
                        <select
                            required
                            className="form-control"
                            name="situacao_mercado_trabalho"
                            id="situacao_mercado_trabalho"
                            value={form.situacao_mercado_trabalho}
                            onChange={handleChange}>
                            <option value="">Selecione</option>
                            <option value="empregado">Empregado</option>
                            <option value="desempregado">Desempregado</option>
                            <option value="autonomo">Autônomo</option>
                            <option value="subemprego">Subemprego</option>
                            <option value="estudante">Estudante</option>
                            <option value="estagio_remunerado">Estágio Remunerado</option>
                        </select>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-md-4">
                        <label htmlFor="renda" className={`${styles['text-cadastro']} form-label`}>Renda</label>
                        <input
                            required
                            type="text"
                            className="form-control"
                            id="renda"
                            name="renda"
                            value={form.renda}
                            onChange={handleChange} />
                    </div>
                    <div className="col-12 col-md-4">
                        <label htmlFor="ocupacao" className={`${styles['text-cadastro']} form-label`}>Ocupação</label>
                        <input
                            required
                            type="text"
                            className="form-control"
                            id="ocupacao"
                            name="ocupacao"
                            value={form.ocupacao}
                            onChange={handleChange} />
                    </div>
                    <div className="col-md-4 col-12">
                        <label htmlFor="deficiencia" className={`${styles['text-cadastro']} form-label`}>PCD</label>
                        <select
                            required
                            className="form-control"
                            name="deficiencia"
                            id="deficiencia"
                            value={form.deficiencia}
                            onChange={handleChange}>
                            <option value="">Selecione</option>
                            <option value="nao">Não</option>
                            <option value="sim">Sim</option>
                        </select>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-md-4">
                        <label htmlFor="tipo_deficiencia" className={`${styles['text-cadastro']} form-label`}>Tipo de Deficiência</label>
                        <input
                            type="text"
                            className="form-control"
                            id="tipo_deficiencia"
                            name="tipo_deficiencia"
                            value={form.tipo_deficiencia}
                            onChange={handleChange} />
                    </div>
                    <div className="col-6 col-md-4">
                        <label htmlFor="beneficio_seguro_social" className={`${styles['text-cadastro']} form-label`}>Benefício/Seguro Social</label>
                        <select
                            required
                            name="beneficio_seguro_social"
                            id="beneficio_seguro_social"
                            value={form.beneficio_seguro_social}
                            className="form-control"
                            onChange={handleChange}>
                            <option value="">Selecione</option>
                            <option value="nenhum">Nenhum</option>
                            <option value="licenca_medica">Licença Médica</option>
                            <option value="aposentadoria">Aposentadoria</option>
                            <option value="pensao_alimenticia">Pensão Alimentícia</option>
                            <option value="seguro_desemprego">Seguro Desemprego</option>
                            <option value="bolsa_familia">Bolsa Família</option>
                            <option value="bpc">BPC</option>
                        </select>
                    </div>
                    <div className="col-6 col-md-4">
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

                <input type="submit" value="Salvar" className={`${styles['text-cadastro']} btn btn-success my-4 d-block w-100`} />
            </form>
        </div>
    )
}