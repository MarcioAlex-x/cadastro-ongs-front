import styles from './GraficosPessoais.module.css'
import { GraficosIdadesFamiliares } from '../../components/Graficos/GraficosIdadesFamiliares';
import { GraficosOrientacaoSexualChefesFamiliares } from '../../components/Graficos/GraficosOrientacaoSexualChefesFamiliares';
import { GraficosEstadoCivilChefesFamiliares } from '../../components/Graficos/GraficosEstadoCivilChefesFamiliares';
import { GraficosEtniasChefesFamiliares } from '../../components/Graficos/GraficosEtniasChefesFamiliares';
import { GraficosDeficienciasChefesFamiliares } from '../../components/Graficos/GraficoDeficienciasChefesFamiliares';
import { GraficosSegurosChefesFamiliares } from '../../components/Graficos/GraficosSegurosChefesFamiliares';
import { GraficosTrabalhosChefe } from '../../components/Graficos/GraficosTrabalhosChefes';
import spinner from '../../assets/spinner.gif'
import { useCadastro } from '../../hooks/useCadastros';
import { FaChartPie } from 'react-icons/fa';

export const ListaGraficosPessoais = () => {

    const { loading, idadesChefes, orientacaoChefes, estadoCivilChefes, etniaChefes, deficienciaChefes, seguroChefes, trabalhoChefes, } = useCadastro()

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
                    </div >
                </div>
            )
            }
        </>
    )
}