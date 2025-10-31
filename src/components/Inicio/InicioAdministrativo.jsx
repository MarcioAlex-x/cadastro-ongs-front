const url = import.meta.env.VITE_API_URL

import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import { useAuth } from "../../context/AuthContext"
import styles from './inicio.module.css'
import Swal from "sweetalert2"

export const InicioAdministrativo = () => {

    const { user } = useAuth()
    const [form, setForm] = useState({
        nome:'',
        logradouro:'',
        numero:'',
        cep:'',
        bairro:'',
        cidade:'',
        uf:'',
        cnpj:'',
        imagemInstituicao:null
    })

    const handleChange = (e) =>{
        const {name, value, files} = e.target
        setForm({
            ...form,
            [name]:files? files[0] : value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        for(let key in form){
            formData.append(key,form[key])
        }

        try {
            const response = await fetch(`${url}/instituicao`,{
                method:'POST',
                body:formData
            })

            if(!response.ok){
                Swal.fire({
                    icon:'error',
                    title:'Erro',
                    text:'Ocorreu um erro ao tentar salvar as informações.',
                    showCloseButton:true
                })
                return {}
            }else{
                Swal.fire({
                    icon:'success',
                    title:'Sucesso',
                    text:'As informações da instituição foram salvas.',
                    showCloseButton:true
                })
            }

        } catch (err) {
            Swal.fire({
                    icon:'Error',
                    title:'Erro',
                    text:`Ocorreu um erro inesperado. ${err.message}`,
                    showCloseButton:true
                })
        }
    }

    return (
        <div className={`${styles['scroll']}`}>
            <div>
                <h1 className={`text-center mb-4 ${styles['font-title']}`}>Painel Administrativo de {user.nome}</h1>
                <div className="bg-light p-4 rounded">
                    <p>
                        Acesse o <Link to='/dashboard/inicio-social' className={`${styles['link']}`}>Painel Assistente Social</Link> para acompanhar os números de cadastrados e análise de risco em qua o público se encontra.
                    </p>
                    <hr className="w-75 m-auto" />
                    <p>
                        Acesse o <Link to='/dashboard/inicio-coordenador' className={`${styles['link']}`}>Painel da Coordenação</Link>
                    </p>
                    <hr className="w-75 m-auto" />
                    <p>
                        Acesse o <Link to='/dashboard/inicio-social' className={`${styles['link']}`}>Painel Docente</Link>
                    </p>
                    <hr className="w-75 m-auto" />
                    <p>
                        Acesse o <Link to='/dashboard/inicio-social' className={`${styles['link']}`}>Painel Financeiro</Link>
                    </p>
                    <hr className="w-75 m-auto" />
                </div>
            </div>
            <div className="mt-4">
                <h4>Informações da Instituição</h4>
                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label htmlFor="" className="form-label">Nome</label>
                        <input type="text"
                         className="form-control" 
                         placeholder="Informe o nome da instituição"
                         name="nome"
                         onChange={handleChange} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="" className="form-label">Logradouro</label>
                        <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Informe a rua, avenida ou outro tipo de localidade"
                        name="logradouro"
                        onChange={handleChange} />
                    </div>
                    <div className="mb-2 row">
                        <div className="col-3 mb-2">
                            <label htmlFor="" className="form-label">Número</label>
                            <input type="text" 
                            className="form-control" 
                            placeholder="Ex: 200 ou 200-A"
                            name="numero"
                            onChange={handleChange} />
                        </div>
                        <div className="col-3 mb-2">
                            <label htmlFor="" className="form-label">CEP</label>
                            <input type="text" 
                            className="form-control" 
                            placeholder="Apenas números"
                            name="cep"
                            onChange={handleChange} />
                        </div>
                        <div className="col-3 mb-2">
                            <label htmlFor="" className="form-label">Bairro</label>
                            <input type="text" 
                            className="form-control" 
                            placeholder="Nome do bairro"
                            name="bairro"
                            onChange={handleChange} />
                        </div>
                        <div className="col-3 mb-2">
                            <label htmlFor="" className="form-label">Cidade</label>
                            <input type="text" 
                            className="form-control" 
                            placeholder="Nome da cidade" 
                            name="cidade"
                            onChange={handleChange}/>
                        </div>
                        <div className="col-6 mb-2">
                            <label htmlFor="" className="form-label">CNPJ</label>
                            <input type="text" 
                            className="form-control" 
                            placeholder="Nome do bairro" 
                            name="cnpj"
                            onChange={handleChange}/>
                        </div>
                        <div className="col-6 mb-2">
                            <label htmlFor="" className="form-label">UF</label>
                            <div className="">
                                <select name="uf"
                                onChange={handleChange}
                                className="form-control">
                                    <option value="AC">AC</option>
                                    <option value="AL">AL</option>
                                    <option value="AP">AP</option>
                                    <option value="AM">AM</option>
                                    <option value="BA">BA</option>
                                    <option value="CE">CE</option>
                                    <option value="DF">DF</option>
                                    <option value="ES">ES</option>
                                    <option value="GO">GO</option>
                                    <option value="MA">MA</option>
                                    <option value="MT">MT</option>
                                    <option value="MS">MS</option>
                                    <option value="MG">MG</option>
                                    <option value="PA">PA</option>
                                    <option value="PB">PB</option>
                                    <option value="PR">PR</option>
                                    <option value="PE">PE</option>
                                    <option value="PI">PI</option>
                                    <option value="RJ">RJ</option>
                                    <option value="RN">RN</option>
                                    <option value="RS">RS</option>
                                    <option value="RO">RO</option>
                                    <option value="RR">RR</option>
                                    <option value="SC">SC</option>
                                    <option value="SP">SP</option>
                                    <option value="SE">SE</option>
                                    <option value="TO">TO</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-6 mb-2">
                            <label htmlFor="" className="form-label">Imagem</label>
                            <input type="file" 
                            name="imagemInstituicao"
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Nome da cidade" />
                        </div>
                    </div>
                    <button type="submit">Enviar</button>
                </form>
            </div>
        </div>
    )
}