import styles from './GraficosDomiciliares.module.css'

import { GraficosTiposLocalidades } from '../../components/Graficos/GraficosTiposLocalidades';
import { GraficosCondicoesMoradia } from '../../components/Graficos/GraficosCondicoesMoradia';
import { GraficosCoabitacaoFamiliar } from '../../components/Graficos/GraficoCoabitacaoFamiliar';
import { GraficosTipoConstrucao } from '../../components/Graficos/GraficosTipoConstrucao';
import { GraficosPsfProximo } from '../../components/Graficos/GraficosPsfProximo';
import { GraficosPostoPolicialProximo } from '../../components/Graficos/GraficosPostoPolicialProximo';
import { GraficosCrecheProximo } from '../../components/Graficos/GraficosCrecheProximo';
import { GraficosPracaProximo } from '../../components/Graficos/GraficosPracaProximo';
import { GraficosAbastecimentoAgua } from '../../components/Graficos/GraficosAbasecimentoAgua';
import { GraficosAbastecimentoEnergia } from '../../components/Graficos/GraficosAbastecimentoEnergia';
import { GraficosColetaLixo } from '../../components/Graficos/GraficosColetaLixo';
import { GraficosEsgotamentoSanitario } from '../../components/Graficos/GraficosEsgotamentoSanitario';
import spinner from '../../assets/spinner.gif'
import { useCadastro } from '../../hooks/useCadastros';
import { FaChartPie } from 'react-icons/fa';

export const ListaGraficosDomiciliares = () => {

    const { loading, tipo, condicoes, coabitacao, construcao, psf, policial, creche, praca, agua, energia, lixo, esgoto, } = useCadastro()

    return (
        <>
            {loading ? (
                <div className=' w-100 d-flex align-items-center justify-content-center h-100'>
                    <img
                        src={spinner} />
                </div>
            ) : (

                <div className={`${styles['scroll']} w-100 p-2`}>
                    <h2 className={`${styles['font-title']} display-4 text-center mt-2 d-flex align-items-center justify-content-center`}><FaChartPie />  <b>Gráficos</b></h2>

                    <div className='d-flex justify-content-between align-items-center mt-5'>
                        <h2 className={`${styles['font-title']} fs-4`}><b>Dados Cadastrais</b> Domiciliares</h2>
                        <div className={styles.horizontalRow}></div>
                    </div>
                    <div className='row justify-content-evenly'>
                        <div className={`col-12 col-md-4 p-1 ${styles['card-style']}`}>
                            <div className={`rounded text-light bg-light p-2 shadow d-flex flex-column justify-content-between ${styles['card-style']} ${styles['backGroundLocalidade']}`}>
                                <p className={`${styles['font-title']} text-light`}>Localidade Domicíliar</p>
                                <GraficosTiposLocalidades tipo={tipo} />
                            </div>
                        </div>
                        <div className={`col-12 col-md-4 p-1 ${styles['card-style']}`}>
                            <div className={`rounded text-light bg-light p-2 shadow d-flex flex-column justify-content-between ${styles['card-style']} ${styles['backGroundCondicao']}`}>
                                <p className={`${styles['font-title']} text-light`}>Condição Domicíliar</p>
                                <GraficosCondicoesMoradia condicoes={condicoes} />
                            </div>
                        </div>
                        <div className={`col-12 col-md-4 p-1 ${styles['card-style']}`}>
                            <div className={`rounded text-light bg-light p-2 shadow d-flex flex-column justify-content-between ${styles['card-style']} ${styles['backGroundCoabitacao']}`}>
                                <p className={`${styles['font-title']} text-light`}>Coabitação Familiar</p>
                                <GraficosCoabitacaoFamiliar coabitacao={coabitacao} />
                            </div>
                        </div>
                        <div className={`col-12 col-md-4 p-1 ${styles['card-style']}`}>
                            <div className={`rounded text-light bg-light p-2 shadow d-flex flex-column justify-content-between ${styles['card-style']} ${styles['backGroundTipoConstrucao']}`}>
                                <p className={`${styles['font-title']} text-light`}>Tipos de Construção</p>
                                <GraficosTipoConstrucao construcao={construcao} />
                            </div>
                        </div>
                        <div className={`col-12 col-md-4 p-1 ${styles['card-style']}`}>
                            <div className={`rounded text-light bg-light p-2 shadow d-flex flex-column justify-content-between ${styles['card-style']} ${styles['backGroundPsf']}`}>
                                <p className={`${styles['font-title']} text-light`}>Coberto por PSF</p>
                                <GraficosPsfProximo psf={psf} />
                            </div>
                        </div>
                        <div className={`col-12 col-md-4 p-1 ${styles['card-style']}`}>
                            <div className={`rounded text-light bg-light p-2 shadow d-flex flex-column justify-content-between ${styles['card-style']} ${styles['backGroundPolicial']}`}>
                                <p className={`${styles['font-title']} text-light`}>Coberto por Posto Policial</p>
                                <GraficosPostoPolicialProximo policial={policial} />
                            </div>
                        </div>
                        <div className={`col-12 col-md-4 p-1 ${styles['card-style']}`}>
                            <div className={`rounded text-light bg-light p-2 shadow d-flex flex-column justify-content-between ${styles['card-style']} ${styles['backGroundCreche']}`}>
                                <p className={`${styles['font-title']} text-light`}>Coberto por Creche</p>
                                <GraficosCrecheProximo creche={creche} />
                            </div>
                        </div>
                        <div className={`col-12 col-md-4 p-1 ${styles['card-style']}`}>
                            <div className={`rounded text-light bg-light p-2 shadow d-flex flex-column justify-content-between ${styles['card-style']} ${styles['backGroundPraca']}`}>
                                <p className={`${styles['font-title']} text-light`}>Coberto por Praça</p>
                                <GraficosPracaProximo praca={praca} />
                            </div>
                        </div>
                        <div className={`col-12 col-md-4 p-1 ${styles['card-style']}`}>
                            <div className={`rounded text-light bg-light p-2 shadow d-flex flex-column justify-content-between ${styles['card-style']} ${styles['backGroundAgua']}`}>
                                <p className={`${styles['font-title']} text-light`}>Abastecimento de Água</p>
                                <GraficosAbastecimentoAgua agua={agua} />
                            </div>
                        </div>
                        <div className={`col-12 col-md-4 p-1 ${styles['card-style']}`}>
                            <div className={`rounded text-light bg-light p-2 shadow d-flex flex-column justify-content-between ${styles['card-style']} ${styles['backGroundEnergia']}`}>
                                <p className={`${styles['font-title']} text-light`}>Abastecimento de Energia Elétrica</p>
                                <GraficosAbastecimentoEnergia energia={energia} />
                            </div>
                        </div>
                        <div className={`col-12 col-md-4 p-1 ${styles['card-style']}`}>
                            <div className={`rounded text-light bg-light p-2 shadow d-flex flex-column justify-content-between ${styles['card-style']} ${styles['backGroundLixo']}`}>
                                <p className={`${styles['font-title']} text-light`}>Coleta de Lixo</p>
                                <GraficosColetaLixo lixo={lixo} />
                            </div>
                        </div>
                        <div className={`col-12 col-md-4 p-1 ${styles['card-style']}`}>
                            <div className={`rounded text-light bg-light p-2 shadow d-flex flex-column justify-content-between ${styles['card-style']} ${styles['backGroundEsgoto']}`}>
                                <p className={`${styles['font-title']} text-light`}>Esgotamento Sanitário</p>
                                <GraficosEsgotamentoSanitario esgoto={esgoto} />
                            </div>
                        </div>
                    </div >
                </div>
            )
            }
        </>
    )
}