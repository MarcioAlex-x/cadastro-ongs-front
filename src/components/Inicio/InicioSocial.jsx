import styles from './inicio.module.css'
import { useCadastro } from '../../hooks/useCadastros'

import { FaClipboardUser } from "react-icons/fa6";
import { BsCalendarDate, BsFilePdfFill } from "react-icons/bs";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { CiCalendarDate } from "react-icons/ci";
import spinner from '../../assets/spinner.gif'

import { DadosAnaliticos } from '../dadosAnaliticos';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Image } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: 'Helvetica'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    textAlign: 'center'
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: '20'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  sectionTitle: {
    font: 14,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 6,
    borderBottom: '1px solid #000'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 3
  },
  field: {
    width: '50%',
    marginBottom: 3,
  },
  text: {
    marginBottom: 2
  },
  assinatura: {
    textAlign: 'center',
    marginTop: 40
  },
  docsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
  },
  rg: {
    width: 150,
    height: 250,
  },
  comprovante: {
    width: 150,
    height: 300,
  },
  containerDuplo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  containerTriplo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  containerQuadruplo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 4,
  },
  coluna: {
    flexGrow: 1,
    flexBasis: 0,
    marginRight: 6,
  }
})



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

                    <div>
                        <h3 className={`text-center mt-4 ${styles['font-title']}`}>Gere um Relatório Social</h3>
                        <button className="btn btn-primary btn-sm d-block m-auto"> <BsFilePdfFill /> Gerar Relatório</button>
                    </div>
                </div>
            )}

        </>
    )
}