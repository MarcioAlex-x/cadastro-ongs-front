const url = import.meta.env.VITE_API_URL

import { useEffect, useState } from 'react'
import styles from './listaCadastros.module.css'
import spinner from '../../../assets/spinner.gif'
import { FaRegEye } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'

export const ListaCadastros = () => {

  const location = useLocation()

    const [loading, setLoading] = useState(true)
    const [cadastros, setCadastros] = useState([])
    const [message, setMessage] = useState('')

    useEffect(() => {

        const listaCadastros = async () => {

            try {
                setLoading(true)
                const response = await fetch(`${url}/cadastro`, {
                    credentials: 'include'
                })

                const data = await response.json()
                setCadastros(data)

            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }
        listaCadastros()

        
    }, [])
    
    const cadastrosCompletos = (pessoa) => {
        return (
            pessoa?.nome &&
            pessoa?.endereco &&
            pessoa?.domicilio &&
            pessoa?.acesso
        )
    }

     return (
    <div className={` ${styles['scroll']}`}>
      <h2 className={`${styles['title-cadastro']}`}>Cadastros Realizados</h2>
      {location.state?.message && (<div className='alert alert-success'>{location.state.message}</div>)}
      {loading ? (
        <div className='d-flex align-items-center justify-content-center'>
          <img src={spinner} className='mt-5' />
        </div>
      ) : (
        <div>
          <ul>
            {cadastros && cadastros.length>0 ?
            cadastros.map((data) => (
              <li key={data.id} className={`${styles['link']} d-flex mb-3`}>
                <Link className={`${styles['link']}`} to={`/dashboard/cadastro/${data.id}`}>
                    <button
                    className='btn btn-outline-primary btn-sm me-2 d-flex align-items-center'>
                      <FaRegEye className={`${styles['button-link']}`} /> <span className={`${styles['text-link']}`}>Ver Cadastro</span>
                    </button>
                </Link>
                <ul>
                  {data.pessoas && data.pessoas.length > 0 ? (
                    data.pessoas.map((pessoa) => (
                      <li key={pessoa.id} className={styles['link']}>
                        {cadastrosCompletos(pessoa) ? (
                          <>Cadastrado: {pessoa.nome}</>
                        ) : (
                          <span >{pessoa.nome} - <b>Complete este cadastro</b></span>
                        )}
                      </li>
                    ))
                  ) : (
                    <li className={`${styles['link']} text-danger`}><b>Remova este cadastro</b></li>
                  )}
                </ul>
              </li>
            ))
            :
            <div>
              <p>Nenhum cadastro realizado.</p>
            </div>
            }
          </ul>
        </div>
      )}
    </div>
  )
}