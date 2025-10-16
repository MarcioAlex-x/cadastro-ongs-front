import styles from './inicio.module.css'
import { useCadastro } from '../../hooks/useCadastros'

import { FaClipboardUser } from "react-icons/fa6";
import { BsCalendarDate } from "react-icons/bs";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { CiCalendarDate } from "react-icons/ci";
import spinner from '../../assets/spinner.gif'
import { GraficosIdadesFamiliares } from '../Graficos/GraficosIdadesFamiliares';
import { GraficosOrientacaoSexualChefesFamiliares } from '../Graficos/GraficosOrientacaoSexualChefesFamiliares';
import { GraficosEstadoCivilChefesFamiliares } from '../Graficos/GraficosEstadoCivilChefesFamiliares';
import { GraficosEtniasChefesFamiliares } from '../Graficos/GraficosEtniasChefesFamiliares';
import { GraficosDeficienciasChefesFamiliares } from '../Graficos/GraficoDeficienciasChefesFamiliares';
import { GraficosSegurosChefesFamiliares } from '../Graficos/GraficosSegurosChefesFamiliares';
import { GraficosTiposLocalidades } from '../Graficos/GraficosTiposLocalidades';
import { GraficosTrabalhosChefe } from '../Graficos/GraficosTrabalhosChefes';
import { GraficosCondicoesMoradia } from '../Graficos/GraficosCondicoesMoradia';
import { GraficosCoabitacaoFamiliar } from '../Graficos/GraficoCoabitacaoFamiliar';
import { GraficosTipoConstrucao } from '../Graficos/GraficosTipoConstrucao';
import { GraficosPsfProximo } from '../Graficos/GraficosPsfProximo';
import { GraficosPostoPolicialProximo } from '../Graficos/GraficosPostoPolicialProximo';
import { GraficosCrecheProximo } from '../Graficos/GraficosCrecheProximo';
import { GraficosPracaProximo } from '../Graficos/GraficosPracaProximo';
import { GraficosAbastecimentoAgua } from '../Graficos/GraficosAbasecimentoAgua';
import { GraficosAbastecimentoEnergia } from '../Graficos/GraficosAbastecimentoEnergia';
import { GraficosColetaLixo } from '../Graficos/GraficosColetaLixo';
import { GraficosEsgotamentoSanitario } from '../Graficos/GraficosEsgotamentoSanitario';

export const Inicio = () => {

    const { total, mesAtual, mesAnterior, anoAtual, loading, idadesChefes, orientacaoChefes, estadoCivilChefes, etniaChefes, deficienciaChefes, seguroChefes, trabalhoChefes, tipo, condicoes, coabitacao, construcao, psf, policial, creche, praca, agua, energia, lixo, esgoto, } = useCadastro()

    return (
        <>
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
                    <div className='d-flex justify-content-between align-items-center mt-5'>
                        <h2 className={`${styles['font-title']} fs-4`}><b>Dados Cadastrais</b> dos Chefes de Família</h2>
                        <div className={styles.horizontalRow}></div>
                    </div>
                    <div className="row justify-content-evenly">
                        <div className={`col-12 col-md-6 p-1 ${styles['card-style']} `}>
                            <div className={`rounded text-light bg-light p-2 shadow d-flex flex-column justify-content-between ${styles['card-style']}  ${styles['backGroundEtariedade']} `}>
                                <p className={`${styles['font-title']} text-light fs-5`}>Faixa Etária Chefes de Família</p>
                                <GraficosIdadesFamiliares idades={idadesChefes || {}} />
                            </div>
                        </div>

                        <div className={`col-12 col-md-6 p-1 ${styles['card-style']}`}>
                            <div className={`rounded text-light bg-light p-2 shadow d-flex flex-column justify-content-between ${styles['card-style']} ${styles['backGroundDiversidade']}`}>
                                <p className={`${styles['font-title']} text-light fs-5`}>Orientação Sexual Chefes de Família</p>
                                <GraficosOrientacaoSexualChefesFamiliares orientacaoChefe={orientacaoChefes} />
                            </div>
                        </div>

                        <div className={`col-12 col-md-6 p-1 ${styles['card-style']}`}>
                            <div className={`rounded text-light bg-light p-2 shadow d-flex flex-column justify-content-between ${styles['card-style']} ${styles['backGroundCasal']}`}>
                                <p className={`${styles['font-title']} text-light fs-5`}>Estado Civil Chefes de Família</p>
                                <GraficosEstadoCivilChefesFamiliares estadoCivilChefes={estadoCivilChefes} />
                            </div>
                        </div>

                        <div className={`col-12 col-md-6 p-1 ${styles['card-style']}`}>
                            <div className={`rounded text-light bg-light p-2 shadow d-flex flex-column justify-content-between ${styles['card-style']} ${styles['backGroundEtnia']}`}>
                                <p className={`${styles['font-title']} text-light fs-5`}>Etnia Chefes de Família</p>
                                <GraficosEtniasChefesFamiliares etniaChefes={etniaChefes} />
                            </div>
                        </div>

                        <div className={`col-12 col-md-6 p-1 ${styles['card-style']}`}>
                            <div className={`rounded text-light bg-light p-2 shadow d-flex flex-column justify-content-between ${styles['card-style']} ${styles['backGroundDeficiencia']}`}>
                                <p className={`${styles['font-title']} text-light fs-5`}>Deficiência Chefes de Família</p>
                                <GraficosDeficienciasChefesFamiliares deficienciaChefes={deficienciaChefes} />
                            </div>
                        </div>

                        <div className={`col-12 col-md-6 p-1 ${styles['card-style']}`}>
                            <div className={`rounded text-light bg-light p-2 shadow d-flex flex-column justify-content-between ${styles['card-style']} ${styles['backGroundSeguro']}`}>
                                <p className={`${styles['font-title']} text-light fs-5`}>Benefícios Chefes de Família</p>
                                <GraficosSegurosChefesFamiliares seguroChefes={seguroChefes} />
                            </div>
                        </div>

                        <div className={`col-12 col-md-6 p-1 ${styles['card-style']}`}>
                            <div className={`rounded text-light bg-light p-2 shadow d-flex flex-column justify-content-between ${styles['card-style']} ${styles['backGroundTrabalhista']}`}>
                                <p className={`${styles['font-title']} text-light fs-5`}>Situação Trabalhista Chefe de Família</p>
                                <GraficosTrabalhosChefe trabalhoChefes={trabalhoChefes} />
                            </div>
                        </div>

                        <div className='d-flex justify-content-between align-items-center mt-5'>
                            <h2 className={`${styles['font-title']} fs-4`}>Dados Domiciliares</h2>
                            <div className={styles.horizontalRow}></div>
                        </div>

                        <div className={`col-12 col-md-6 p-1 ${styles['card-style']}`}>
                            <div className={`rounded text-light bg-light p-2 shadow d-flex flex-column justify-content-between ${styles['card-style']} ${styles['backGroundLocalidade']}`}>
                                <p className={`${styles['font-title']} text-light fs-5`}>Localidade Domicíliar</p>
                                <GraficosTiposLocalidades tipo={tipo} />
                            </div>
                        </div>

                        <div className={`col-12 col-md-6 p-1 ${styles['card-style']}`}>
                            <div className={`rounded text-light bg-light p-2 shadow d-flex flex-column justify-content-between ${styles['card-style']} ${styles['backGroundCondicao']}`}>
                                <p className={`${styles['font-title']} text-light fs-5`}>Condição Domicíliar</p>
                                <GraficosCondicoesMoradia condicoes={condicoes} />
                            </div>
                        </div>

                        <div className={`col-12 col-md-6 p-1 ${styles['card-style']}`}>
                            <div className={`rounded text-light bg-light p-2 shadow d-flex flex-column justify-content-between ${styles['card-style']} ${styles['backGroundCoabitacao']}`}>
                                <p className={`${styles['font-title']} text-light fs-5`}>Coabitação Familiar</p>
                                <GraficosCoabitacaoFamiliar coabitacao={coabitacao} />
                            </div>
                        </div>

                        <div className={`col-12 col-md-6 p-1 ${styles['card-style']}`}>
                            <div className={`rounded text-light bg-light p-2 shadow d-flex flex-column justify-content-between ${styles['card-style']} ${styles['backGroundTipoConstrucao']}`}>
                                <p className={`${styles['font-title']} text-light fs-5`}>Tipos de Construção</p>
                                <GraficosTipoConstrucao construcao={construcao} />
                            </div>
                        </div>

                        <div className={`col-12 col-md-6 p-1 ${styles['card-style']}`}>
                            <div className={`rounded text-light bg-light p-2 shadow d-flex flex-column justify-content-between ${styles['card-style']} ${styles['backGroundPsf']}`}>
                                <p className={`${styles['font-title']} text-light fs-5`}>Coberto por PSF</p>
                                <GraficosPsfProximo psf={psf} />
                            </div>
                        </div>

                        <div className={`col-12 col-md-6 p-1 ${styles['card-style']}`}>
                            <div className={`rounded text-light bg-light p-2 shadow d-flex flex-column justify-content-between ${styles['card-style']} ${styles['backGroundPolicial']}`}>
                                <p className={`${styles['font-title']} text-light fs-5`}>Coberto por Posto Policial</p>
                                <GraficosPostoPolicialProximo policial={policial} />
                            </div>
                        </div>

                        <div className={`col-12 col-md-6 p-1 ${styles['card-style']}`}>
                            <div className={`rounded text-light bg-light p-2 shadow d-flex flex-column justify-content-between ${styles['card-style']} ${styles['backGroundCreche']}`}>
                                <p className={`${styles['font-title']} text-light fs-5`}>Coberto por Creche</p>
                                <GraficosCrecheProximo creche={creche} />
                            </div>
                        </div>

                        <div className={`col-12 col-md-6 p-1 ${styles['card-style']}`}>
                            <div className={`rounded text-light bg-light p-2 shadow d-flex flex-column justify-content-between ${styles['card-style']} ${styles['backGroundPraca']}`}>
                                <p className={`${styles['font-title']} text-light fs-5`}>Coberto por Praça</p>
                                <GraficosPracaProximo praca={praca} />
                            </div>
                        </div>

                        <div className={`col-12 col-md-6 p-1 ${styles['card-style']}`}>
                            <div className={`rounded text-light bg-light p-2 shadow d-flex flex-column justify-content-between ${styles['card-style']} ${styles['backGroundAgua']}`}>
                                <p className={`${styles['font-title']} text-light fs-5`}>Abastecimento de Água</p>
                                <GraficosAbastecimentoAgua agua={agua} />
                            </div>
                        </div>

                        <div className={`col-12 col-md-6 p-1 ${styles['card-style']}`}>
                            <div className={`rounded text-light bg-light p-2 shadow d-flex flex-column justify-content-between ${styles['card-style']} ${styles['backGroundEnergia']}`}>
                                <p className={`${styles['font-title']} text-light fs-5`}>Abastecimento de Energia Elétrica</p>
                                <GraficosAbastecimentoEnergia energia={energia} />
                            </div>
                        </div>

                        <div className={`col-12 col-md-6 p-1 ${styles['card-style']}`}>
                            <div className={`rounded text-light bg-light p-2 shadow d-flex flex-column justify-content-between ${styles['card-style']} ${styles['backGroundLixo']}`}>
                                <p className={`${styles['font-title']} text-light fs-5`}>Coleta de Lixo</p>
                                <GraficosColetaLixo lixo={lixo} />
                            </div>
                        </div>

                        <div className={`col-12 col-md-6 p-1 ${styles['card-style']}`}>
                            <div className={`rounded text-light bg-light p-2 shadow d-flex flex-column justify-content-between ${styles['card-style']} ${styles['backGroundEsgoto']}`}>
                                <p className={`${styles['font-title']} text-light fs-5`}>Esgotamento Sanitário</p>
                                <GraficosEsgotamentoSanitario esgoto={esgoto} />
                            </div>
                        </div>


                    </div>
                </div>
            )}

        </>
    )
}