import styles from './inicio.module.css'
import { useCadastro } from '../../hooks/useCadastros'

import { FaClipboardUser } from "react-icons/fa6";
import { BsCalendarDate } from "react-icons/bs";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { CiCalendarDate } from "react-icons/ci";

export const Inicio = () => {

    const { total, mesAtual, mesAnterior, anoAtual } = useCadastro()
    return (
        <>
            <h2 className="fs-4">Cadastros Beneficiários</h2>
            <div className="row justify-content-evenly">
                <div className={`col-6 col-lg-2 p-1 ${styles['card-style']}`}>
                    <div className={`rounded text-light bg-success p-2 shadow d-flex flex-column justify-content-between ${styles['card-style']}`}>
                        <div className="d-flex">
                            <p>Beneficiários Cadastrados</p>
                            <FaClipboardUser size={30} />
                        </div>
                        <p className="fs-2 align-self-end me-2 ">{total}</p>
                    </div>
                </div>

                <div className={`col-6 col-lg-2 p-1 ${styles['card-style']}`}>
                    <div className={`rounded text-light bg-danger p-2 shadow d-flex flex-column justify-content-between ${styles['card-style']}`}>
                        <div className='d-flex'>
                            <p>Cadastros Mês Atual</p>
                            <BsCalendarDate size={30} />
                        </div>
                        <p className="fs-2 align-self-end me-2 ">{mesAtual}</p>
                    </div>
                </div>

                <div className={`col-6 col-lg-2 p-1 ${styles['card-style']}`}>
                    <div className={`rounded text-dark bg-warning p-2 shadow d-flex flex-column justify-content-between ${styles['card-style']}`}>
                        <div className="d-flex">
                            <p >Cadastros Mês Passado</p>
                            <HiOutlineCalendarDateRange size={40} />
                        </div>
                        <p className="fs-2 align-self-end me-2 ">{mesAnterior}</p>
                    </div>
                </div>

                <div className={`col-6 col-lg-2 p-1 ${styles['card-style']}`}>
                    <div className={`rounded text-light bg-primary p-2 shadow d-flex flex-column justify-content-between ${styles['card-style']}`}>
                        <div className="d-flex">
                            <p >Cadastrados Neste Ano</p>
                            <b>
                                <CiCalendarDate className={styles.bold} size={36}/>
                            </b>
                        </div>
                        <p className="fs-2 align-self-end me-2 ">{anoAtual}</p>
                    </div>
                </div>
            </div>
        </>
    )
}