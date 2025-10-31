import styles from './inicio.module.css'
import { useCadastro } from '../../hooks/useCadastros'

import { FaClipboardUser } from "react-icons/fa6";
import { BsCalendarDate } from "react-icons/bs";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { CiCalendarDate } from "react-icons/ci";
import spinner from '../../assets/spinner.gif'

import { DadosAnaliticos } from '../dadosAnaliticos';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export const InicioSocial = () => {
    const { loading, total, mesAtual, mesAnterior, anoAtual } = useCadastro()
    const { user } = useAuth()

    return (
        <>
            {user.isAdmin &&
                <Link
                    to='/dashboard/inicio-administrativo'
                    className={` ${styles['link']}`}><button className={`btn btn-primary btn-sm mb-3`}
                    >Voltar ao Administrativo
                    </button>
                </Link>
            }
            
            {loading ? (
                <div className=' w-100 d-flex justify-content-center align-items-center h-100'>
                    <img
                        src={spinner} />
                </div>
            ) : (
                <div className={` w-100 px-2 pb-4 ${styles['scroll']}`}>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h2 className={`${styles['font-title']} fs-4`}>Cadastros Beneficiários</h2>
                        <div className={styles.horizontalRow}></div>
                    </div>
                    <div className="row justify-content-evenly">

                        <div className={`col-6 col-lg-2 p-1 ${styles['card-style']}`}>
                            <div className={`rounded text-light bg-success p-2 shadow d-flex flex-column justify-content-between ${styles['card-style']}  ${styles['backGroundCard']}`}>
                                <div className="d-flex">
                                    <p className={`${styles['font-title']}`}>Beneficiários Cadastrados</p>
                                    <FaClipboardUser size={30} />
                                </div>
                                <p className={`${styles['font-text']} display-6 align-self-end me-2 `}>{total}</p>
                            </div>
                        </div>

                        <div className={`col-6 col-lg-2 p-1 ${styles['card-style']}`}>
                            <div className={`rounded text-light bg-danger p-2 shadow d-flex flex-column justify-content-between ${styles['card-style']}  ${styles['backGroundCard']}`}>
                                <div className='d-flex'>
                                    <p className={`${styles['font-title']}`}>Cadastros Mês Atual</p>
                                    <BsCalendarDate size={30} />
                                </div>
                                <p className={`${styles['font-text']} display-6 align-self-end me-2 `}>{mesAtual}</p>
                            </div>
                        </div>

                        <div className={`col-6 col-lg-2 p-1 ${styles['card-style']}`}>
                            <div style={{ backgroundColor: '#9D00FF' }} className={`rounded text-light p-2 shadow d-flex flex-column justify-content-between ${styles['card-style']}  ${styles['backGroundCard']}`}>
                                <div className="d-flex">
                                    <p className={`${styles['font-title']}`}>Cadastros Mês Passado</p>
                                    <HiOutlineCalendarDateRange size={40} />
                                </div>
                                <p className={`${styles['font-text']} display-6 align-self-end me-2 `}>{mesAnterior}</p>
                            </div>
                        </div>

                        <div className={`col-6 col-lg-2 p-1 ${styles['card-style']}`}>
                            <div className={`rounded text-light bg-primary p-2 shadow d-flex flex-column justify-content-between ${styles['card-style']}  ${styles['backGroundCard']}`}>
                                <div className="d-flex">
                                    <p className={`${styles['font-title']}`}>Cadastrados Neste Ano</p>
                                    <b>
                                        <CiCalendarDate className={styles.bold} size={36} />
                                    </b>
                                </div>
                                <p className={`${styles['font-text']} display-6 align-self-end me-2 `}>{anoAtual}</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <DadosAnaliticos />
                    </div>


                </div>
            )}

        </>
    )
}