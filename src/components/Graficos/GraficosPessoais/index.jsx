import styles from './GraficosPessoais.module.css'
import { GraficosIdadesFamiliares } from '../GraficosIdadesFamiliares';
import { GraficosOrientacaoSexualChefesFamiliares } from '../GraficosOrientacaoSexualChefesFamiliares';
import { GraficosEstadoCivilChefesFamiliares } from '../GraficosEstadoCivilChefesFamiliares';
import { GraficosEtniasChefesFamiliares } from '../GraficosEtniasChefesFamiliares';
import { GraficosDeficienciasChefesFamiliares } from '../GraficoDeficienciasChefesFamiliares';
import { GraficosSegurosChefesFamiliares } from '../GraficosSegurosChefesFamiliares';
import { GraficosTiposLocalidades } from '../GraficosTiposLocalidades';
import { GraficosTrabalhosChefe } from '../GraficosTrabalhosChefes';
import { GraficosCondicoesMoradia } from '../GraficosCondicoesMoradia';
import { GraficosCoabitacaoFamiliar } from '../GraficoCoabitacaoFamiliar';
import { GraficosTipoConstrucao } from '../GraficosTipoConstrucao';
import { GraficosPsfProximo } from '../GraficosPsfProximo';
import { GraficosPostoPolicialProximo } from '../GraficosPostoPolicialProximo';
import { GraficosCrecheProximo } from '../GraficosCrecheProximo';
import { GraficosPracaProximo } from '../GraficosPracaProximo';
import { GraficosAbastecimentoAgua } from '../GraficosAbasecimentoAgua';
import { GraficosAbastecimentoEnergia } from '../GraficosAbastecimentoEnergia';
import { GraficosColetaLixo } from '../GraficosColetaLixo';
import { GraficosEsgotamentoSanitario } from '../GraficosEsgotamentoSanitario';
import spinner from '../../../assets/spinner.gif'
import { useCadastro } from '../../../hooks/useCadastros';
import { FaChartPie } from 'react-icons/fa';

export const GraficosPessoais = () => {

    const {loading, idadesChefes, orientacaoChefes, estadoCivilChefes, etniaChefes, deficienciaChefes, seguroChefes, trabalhoChefes, tipo, condicoes, coabitacao, construcao, psf, policial, creche, praca, agua, energia, lixo, esgoto, } = useCadastro()

    return (
        <>
            {loading ? (
                <div className=' w-100 d-flex justify-content-center align-items-center h-100'>
                    <img
                        src={spinner} />
                </div>
            ) : (

                <div className={`${styles['scroll']} w-100 p-2`}>
                    <h2  className={`${styles['font-title']} display-4 text-center mt-2 d-flex align-items-center justify-content-center`}><FaChartPie />  <b>Gráficos</b></h2>
                    < div className='d-flex justify-content-between align-items-center mt-5' >
                        <h2 className={`${styles['font-title']} fs-4`}><b>Dados Cadastrais</b> dos Chefes de Família</h2>
                        <div className={styles.horizontalRow}></div>
                    </div >

                    < div className="row justify-content-evenly" >
                        <div className={`col-12 col-md-4 p-1 ${styles['card-style']} `}>
                            <div className={`rounded text-light bg-light p-2 shadow d-flex flex-column justify-content-between ${styles['card-style']}  ${styles['backGroundEtariedade']} `}>
                                <p className={`${styles['font-title']} text-light`}>Faixa Etária Chefes de Família</p>
                                <GraficosIdadesFamiliares idades={idadesChefes || {}} />
                            </div>
                        </div>
                        <div className={`col-12 col-md-4 p-1 ${styles['card-style']}`}>
                            <div className={`rounded text-light bg-light p-2 shadow d-flex flex-column justify-content-between ${styles['card-style']} ${styles['backGroundDiversidade']}`}>
                                <p className={`${styles['font-title']} text-light`}>Orientação Sexual Chefes de Família</p>
                                <GraficosOrientacaoSexualChefesFamiliares orientacaoChefe={orientacaoChefes} />
                            </div>
                        </div>
                        <div className={`col-12 col-md-4 p-1 ${styles['card-style']}`}>
                            <div className={`rounded text-light bg-light p-2 shadow d-flex flex-column justify-content-between ${styles['card-style']} ${styles['backGroundCasal']}`}>
                                <p className={`${styles['font-title']} text-light`}>Estado Civil Chefes de Família</p>
                                <GraficosEstadoCivilChefesFamiliares estadoCivilChefes={estadoCivilChefes} />
                            </div>
                        </div>
                        <div className={`col-12 col-md-4 p-1 ${styles['card-style']}`}>
                            <div className={`rounded text-light bg-light p-2 shadow d-flex flex-column justify-content-between ${styles['card-style']} ${styles['backGroundEtnia']}`}>
                                <p className={`${styles['font-title']} text-light`}>Etnia Chefes de Família</p>
                                <GraficosEtniasChefesFamiliares etniaChefes={etniaChefes} />
                            </div>
                        </div>
                        <div className={`col-12 col-md-4 p-1 ${styles['card-style']}`}>
                            <div className={`rounded text-light bg-light p-2 shadow d-flex flex-column justify-content-between ${styles['card-style']} ${styles['backGroundDeficiencia']}`}>
                                <p className={`${styles['font-title']} text-light`}>Deficiência Chefes de Família</p>
                                <GraficosDeficienciasChefesFamiliares deficienciaChefes={deficienciaChefes} />
                            </div>
                        </div>
                        <div className={`col-12 col-md-4 p-1 ${styles['card-style']}`}>
                            <div className={`rounded text-light bg-light p-2 shadow d-flex flex-column justify-content-between ${styles['card-style']} ${styles['backGroundSeguro']}`}>
                                <p className={`${styles['font-title']} text-light`}>Benefícios Chefes de Família</p>
                                <GraficosSegurosChefesFamiliares seguroChefes={seguroChefes} />
                            </div>
                        </div>
                        <div className={`col-12 col-md-4 p-1 ${styles['card-style']}`}>
                            <div className={`rounded text-light bg-light p-2 shadow d-flex flex-column justify-content-between ${styles['card-style']} ${styles['backGroundTrabalhista']}`}>
                                <p className={`${styles['font-title']} text-light`}>Situação Trabalhista Chefe de Família</p>
                                <GraficosTrabalhosChefe trabalhoChefes={trabalhoChefes} />
                            </div>
                        </div>
                        <div className='d-flex justify-content-between align-items-center mt-5'>
                            <h2 className={`${styles['font-title']} fs-4`}>Dados Domiciliares</h2>
                            <div className={styles.horizontalRow}></div>
                        </div>
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