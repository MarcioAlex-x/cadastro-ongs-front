import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styles from './cadastroComposicaoFamiliar.module.css'

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
        renda: 0,
        escolaridade: '',
        frequenta_escola: '',
        beneficio_seguro_social: '',
        valor_beneficio_seguro_social: 0,
        pcd: '',
    }
    const [form, setForm] = useState(initialState)
    const [totalCadastros, setTotalCadastros] = useState(0)
    const [atualizador, setAtualizador] = useState(0)

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const handleFinish = (e) =>{
        e.preventDefault()
        navigate('/dashboard/inicio')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(`http://localhost:3000/composicao_familiar/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ ...form })
            })

            const data = await response.json()
            if (data) {
                setForm(initialState)
                setAtualizador(prev => prev+1)
            }

        } catch (err) {
            console.error(err)
        }
    }

    const handleCount = async () =>{
        try {
            const response = await fetch(`http://localhost:3000/composicao`,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json'
                },
                credentials:'include'
            })
            const data = await response.json()

            const contadorCadastro = data.filter( el => el.dados_pessoais_id)
            
            const totalCadastros = contadorCadastro.map(cadastros => cadastros.id)

            setTotalCadastros(totalCadastros.length)

        } catch (err) {
            console.error(err)
        }
    }

    useEffect(()=>{
        handleCount()
    },[atualizador])

    return (
        <div className={`ps-3 ${styles['scroll']}`}>
            <h2 className={`${styles['title-cadastro']}`}>Composição Familiar</h2>
            <div className="border px-4 py-1 bg-secondary text-light ">
                { atualizador === 0 ?
                (<p className="mb-0">Eu vou atualizando quantos membros forem adicionados</p> )
                :
                (<p className="mb-0">{atualizador} membros adicionados a família.</p>)}
            </div>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nome" className={`${styles['text-cadastro']} form-label`}>Nome</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nome"
                        name="nome"
                        value={form.nome}
                        onChange={handleChange} />
                </div>
                <div className="row">
                    <div className="col-md-3 col-12">
                        <label htmlFor="data_nascimento" className={`${styles['text-cadastro']} form-label`}>Data de Nascimento</label>
                        <input
                            type="date"
                            className="form-control"
                            id="data_nascimento"
                            name="data_nascimento"
                            value={form.data_nascimento}
                            onChange={handleChange} />
                    </div>
                    <div className="col-md-3 col-12">
                        <label htmlFor="orientacao_sexual" className={`${styles['text-cadastro']} form-label`}>Orientação Sexual</label>
                        <select
                            className="form-control"
                            name="orientacao_sexual"
                            id="orientacao_sexual"
                            value={form.orientacao_sexual}
                            onChange={handleChange}>
                            <option value="">Selecione</option>
                            <option value="hetero">Hétero</option>
                            <option value="gay">Gay</option>
                            <option value="lesbica">Lésbica</option>
                            <option value="bissexual">Bisexual</option>
                            <option value="assexual">Assexual</option>
                            <option value="pansexual">Pansexual</option>
                        </select>
                    </div>
                    <div className="col-12 col-md-3">
                        <label htmlFor="parentesco" className={`${styles['text-cadastro']} form-label`}>Parentesco</label>
                        <input
                            type="parentesco"
                            className="form-control"
                            id="parentesco"
                            name="parentesco"
                            value={form.parentesco}
                            onChange={handleChange} />
                    </div>
                    <div className="col-md-3 col-12">
                        <label htmlFor="estado_civil" className={`${styles['text-cadastro']} form-label`}>Estado Civil</label>
                        <select
                            className="form-control"
                            name="estado_civil"
                            id="estado_civil"
                            value={form.estado_civil}
                            onChange={handleChange}>
                            <option value="">Selecione</option>
                            <option value="casado">Casado(a)</option>
                            <option value="solteiro">Solteiro(a)</option>
                            <option value="divorciado">Divorciado(a)</option>
                            <option value="viuvo">Viúvo(a)</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 col-12">
                        <label htmlFor="etnia" className={`${styles['text-cadastro']} form-label`}>Etnia</label>
                        <select
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
                    <div className="col-md-4 col-12">
                        <label htmlFor="pcd" className={`${styles['text-cadastro']} form-label`}>PCD</label>
                        <select
                            className="form-control"
                            name="pcd"
                            id="pcd"
                            value={form.pcd}
                            onChange={handleChange}>
                            <option value="">Selecione</option>
                            <option value="nao">Não</option>
                            <option value="sim">Sim</option>
                        </select>
                    </div>
                    <div className="col-12 col-md-4">
                        <label htmlFor="renda" className={`${styles['text-cadastro']} form-label`}>Renda</label>
                        <input
                            type="number"
                            className="form-control"
                            id="renda"
                            name="renda"
                            value={form.renda}
                            onChange={handleChange} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <label htmlFor="ocupacao" className={`${styles['text-cadastro']} form-label`}>Ocupação</label>
                        <input
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
                        <label htmlFor="escolaridade" className={`${styles['text-cadastro']} form-label`}>Escolaridade</label>
                        <input
                            type="text"
                            className="form-control"
                            id="escolaridade"
                            name="escolaridade"
                            value={form.escolaridade}
                            onChange={handleChange} />
                    </div>
                    <div className="col-md-3 col-12">
                        <label htmlFor="frequenta_escola" className={`${styles['text-cadastro']} form-label`}>Frequentando a Escola</label>
                        <select
                            className="form-control"
                            name="frequenta_escola"
                            id="frequenta_escola"
                            value={form.frequenta_escola}
                            onChange={handleChange}>
                            <option value="">Selecione</option>
                            <option value="nao">Não</option>
                            <option value="sim">Sim</option>
                        </select>
                    </div>
                    <div className="col-6 col-md-3">
                        <label htmlFor="beneficio_seguro_social" className={`${styles['text-cadastro']} form-label`}>Benefício/Seguro Social</label>
                        <select
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
                    <div className="col-6 col-md-3">
                        <label htmlFor="valor_beneficio_seguro_social" className={`${styles['text-cadastro']} form-label`}>Valor do Benefício</label>
                        <input
                            type="number"
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