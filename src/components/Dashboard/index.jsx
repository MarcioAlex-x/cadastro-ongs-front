import { useEffect, useState } from "react"
import { Navbar } from "../Navbar"
import { Sidebar } from "../Sidebar"
import { Titlebar } from "../Titlebar"
import styles from './dashboard.module.css'
import { cadastroShowAll, ultimosCadastros, CadastrosMesAnterior } from "../../api/cadastrosApi"

export const Dashboard = () => {

    const [totalCadastros, setTotalCadastros] = useState(0)
    const [cadastrosMesAtual, setCadastrosMesAtual] = useState(0)
    const [cadastrosMesPassado, setCadastrosMesPassado] = useState(0)

    useEffect(() => {
        cadastroShowAll()
            .then(cadastros => setTotalCadastros(cadastros.length))
            .catch((err) => console.log(err.message))

        ultimosCadastros()
            .then(ultimosCadastros => setCadastrosMesAtual(ultimosCadastros.length))
            .catch((err)=>err.message)

        CadastrosMesAnterior()
            .then(ultimossCadastros => setCadastrosMesPassado(ultimossCadastros.length))
            .catch(err => console.log(err.message))
    }, [])

    return (
        
        <div className={styles.margin}>

            <div className='row g-0'>
                <div className='col-2'>
                    <Titlebar className={styles.rowHeight} />
                </div>
                <div className='col-10'>
                    <Navbar className={styles.rowHeight} />
                </div>
            </div>
            <div className="row g-0">
                <div className="col-2">
                    <Sidebar />
                </div>
                <div className="col-10 p-3">
                    <h2 className="fs-4">Cadastros Beneficiários</h2>
                    <div className="row justify-content-evenly">
                        <div className="col-6 col-lg-2 rounded text-light bg-success p-2 shadow">
                            <p>Beneficiários Cadastrados</p>
                            <p className="fs-2 text-end align-self-end">{totalCadastros}</p>
                        </div>

                        <div className="col-6 col-lg-2 rounded text-light bg-danger p-2 shadow">
                            <p >Cadastros Neste Mês</p>
                            <p className="fs-2 text-end ">{cadastrosMesAtual}</p>
                        </div>

                        <div className="col-6 col-lg-2 rounded text-light bg-warning p-2 shadow">
                            <p >Cadastros Mês Passado</p>
                            <p className="fs-2 text-end">{cadastrosMesPassado}</p>
                        </div>

                        <div className="col-6 col-lg-2 rounded text-light bg-primary p-2 shadow">
                            <p >Beneficiários Cadastrados</p>
                            <p className="fs-2 text-end">{totalCadastros}</p>
                        </div>
                    </div>
                    


                </div>
            </div>
        </div>
    )
}