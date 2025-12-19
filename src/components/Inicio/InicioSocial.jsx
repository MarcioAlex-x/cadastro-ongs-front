const url = import.meta.env.VITE_API_URL

import styles from './inicio.module.css'
import { useCadastro } from '../../hooks/useCadastros'

import { BsFilePdfFill, BsFillBarChartFill, BsFillBarChartLineFill } from "react-icons/bs";
import spinner from '../../assets/spinner.gif'

import { DadosAnaliticos } from '../dadosAnaliticos';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';



export const InicioSocial = () => {

    const { loading, total, mesAtual, mesAnterior, anoAtual } = useCadastro()
    const { user } = useAuth()



    return (
        <>
            {loading ? (
                <div className=' w-100 d-flex justify-content-center align-items-center h-100'>
                    <img
                        src={spinner} />
                </div>
            ) : (
                <div className={` w-100 px-2 pb-4 ${styles['scroll']}`}>
                    {user.isAdmin &&
                        <Link
                            to='/dashboard/inicio-administrativo'
                            className={` ${styles['link']}`}><button className={`btn btn-primary btn-sm mb-3`}
                            >Voltar ao Administrativo
                            </button>
                        </Link>
                    }
                    <div className='d-flex justify-content-between align-items-center'>
                        <h2 className={`${styles['font-title']} fs-4`}>Cadastros <br /> Beneficiários</h2>
                        <div className={styles.horizontalRow}></div>
                    </div>
                    <div className="row justify-content-evenly">

                        <div className={`col-6 col-lg-2 p-1 ${styles['card-style']}`}>
                            <div className={`rounded text-light bg-success p-2 shadow d-flex align-items-center justify-content-between ${styles['card-style']}  ${styles['backGroundCard']}`}>
                                <p className={`${styles['font-card']}`}>Beneficiários <br /> Cadastrados</p>
                                <p className={`${styles['font-card']} fs-4 align-self-end me-2 `}>{total}</p>
                            </div>
                        </div>

                        <div className={`col-6 col-lg-2 p-1 ${styles['card-style']}`}>
                            <div className={`rounded text-light bg-danger p-2 shadow d-flex align-items-center justify-content-between ${styles['card-style']}  ${styles['backGroundCard']}`}>
                                <p className={`${styles['font-card']}`}>Cadastros <br /> Mês Atual</p>
                                <p className={`${styles['font-card']} fs-4 align-self-end me-2 `}>{mesAtual}</p>
                            </div>
                        </div>

                        <div className={`col-6 col-lg-2 p-1 ${styles['card-style']}`}>
                            <div style={{ backgroundColor: '#9D00FF' }} className={`rounded text-light p-2 shadow d-flex align-items-center justify-content-between ${styles['card-style']}  ${styles['backGroundCard']}`}>
                                <p className={`${styles['font-card']}`}>Cadastros <br /> Mês Passado</p>
                                <p className={`${styles['font-card']} fs-4 align-self-end me-2 `}>{mesAnterior}</p>
                            </div>
                        </div>

                        <div className={`col-6 col-lg-2 p-1 ${styles['card-style']}`}>
                            <div className={`rounded text-light bg-primary p-2 shadow d-flex align-items-center justify-content-between ${styles['card-style']}  ${styles['backGroundCard']}`}>
                                <p className={`${styles['font-card']}`}>Cadastrados <br /> Neste Ano</p>
                                <p className={`${styles['font-card']} fs-4 align-self-end me-2 `}>{anoAtual}</p>
                            </div>
                        </div>
                    </div>
                    <div>

                        <h3 className={`text-center mt-4 ${styles['font-title']} mt-5`}>Visualizar Gráficos de Riscos e Vulnerabilidade</h3>
                        
                        
                        <button type="button" class="btn btn-primary btn-sm d-block m-auto mb-5" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                <BsFillBarChartLineFill  className='me-2'/>
                            Análise de Riscos e Vulnerabilidade
                        </button>

                        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Análise de Riscos e Vulnerabilidade</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
         <DadosAnaliticos />
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Entendido</button>
      </div>
    </div>
  </div>
</div>
                       
                    </div>

                    <div>
                        <h3 className={`text-center mt-4 ${styles['font-title']}`}>Gere um Relatório Socioconômico</h3>
                        <Link to='/dashboard/relatorio-socioeconomico'>
                            <button className="btn btn-primary btn-sm d-block m-auto"> <BsFilePdfFill />
                                Gerar Relatório</button>
                        </Link>
                    </div>
                </div>
            )}

        </>
    )
}