import styles from './GraficosVulnerabilidade.module.css'

import { GraficosTiposLocalidades } from '../../components/Graficos/GraficosTiposLocalidades';
import spinner from '../../assets/spinner.gif'
import { useCadastro } from '../../hooks/useCadastros';
import { FaChartPie } from 'react-icons/fa';
import { GraficosDiscriminacaoRejeicaoFamiliar } from '../Graficos/GraficosDiscriminacaoRejeicaoFamiliar';
import { GraficoDiscriminacaoSocial } from '../Graficos/GraficoDiscriminacaoSocial';
import { GraficosMausTratos } from '../Graficos/GraficosMausTrato';
import { GraficosViolenciaDomestica } from '../Graficos/GraficoViolenciaDomestica';
import { ListaGraficosCultura } from '../Graficos/GraficosAcessoCultura';
import { ListaGraficosSaude } from '../Graficos/GraficosAcessoSaude';

export const ListaGraficosVulnerabilidade = () => {

    const { loading, mausTratosU, violenciaDomesticaU, discriminacaoSocialU, discriminacaoRejeicaoFamiliarU, saude, cultura } = useCadastro()

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
                        <h2 className={`${styles['font-title']} fs-4`}><b>Dados Cadastrais</b> de Vulnerabilidade e Acesso</h2>
                        <div className={styles.horizontalRow}></div>
                    </div>
                    <div className='row justify-content-evenly'>
                        <div className={`col-12 col-md-4 p-1 ${styles['card-style']}`}>
                            <div className={`rounded text-light bg-light p-2 shadow d-flex flex-column justify-content-between ${styles['card-style']} ${styles['backGroundLocalidade']}`}>
                                <p className={`${styles['font-title']} text-light`}>Discriminação/Rejeição Familiar</p>
                                <GraficosDiscriminacaoRejeicaoFamiliar discriminacaoRejeicaoFamiliarU={discriminacaoRejeicaoFamiliarU} />
                            </div>
                        </div>
                        <div className={`col-12 col-md-4 p-1 ${styles['card-style']}`}>
                            <div className={`rounded text-light bg-light p-2 shadow d-flex flex-column justify-content-between ${styles['card-style']} ${styles['backGroundLocalidade']}`}>
                                <p className={`${styles['font-title']} text-light`}>Discriminação Sócio, Étnico, Racial e/ou Sexual </p>
                                <GraficoDiscriminacaoSocial discriminacaoSocialU={discriminacaoSocialU} />
                            </div>
                        </div>
                        <div className={`col-12 col-md-4 p-1 ${styles['card-style']}`}>
                            <div className={`rounded text-light bg-light p-2 shadow d-flex flex-column justify-content-between ${styles['card-style']} ${styles['backGroundLocalidade']}`}>
                                <p className={`${styles['font-title']} text-light`}>Violência Doméstica</p>
                                <GraficosViolenciaDomestica violenciaDomesticaU={violenciaDomesticaU} />
                            </div>
                        </div>

                    </div >

                    <div className='row justify-content-evenly'>
                        <div className={`col-12 col-md-4 p-1 ${styles['card-style']}`}>
                            <div className={`rounded text-light bg-light p-2 shadow d-flex flex-column justify-content-between ${styles['card-style']} ${styles['backGroundLocalidade']}`}>
                                <p className={`${styles['font-title']} text-light`}>Maus Tratos</p>
                                <GraficosMausTratos mausTratosU={mausTratosU} />
                            </div>
                        </div>

                        <div className={`col-12 col-md-4 p-1 ${styles['card-style']}`}>
                            <div className={`rounded text-light bg-light p-2 shadow d-flex flex-column justify-content-between ${styles['card-style']} ${styles['backGroundLocalidade']}`}>
                                <p className={`${styles['font-title']} text-light`}>Acesso a Cultura</p>
                                <ListaGraficosCultura cultura={cultura} />
                            </div>
                        </div>
                        
                        <div className={`col-12 col-md-4 p-1 ${styles['card-style']}`}>
                            <div className={`rounded text-light bg-light p-2 shadow d-flex flex-column justify-content-between ${styles['card-style']} ${styles['backGroundLocalidade']}`}>
                                <p className={`${styles['font-title']} text-light`}>Acesso a Saúde</p>
                                <ListaGraficosSaude saude={saude} />
                            </div>
                        </div>
                    </div>
                </div>
            )
            }
        </>
    )
}