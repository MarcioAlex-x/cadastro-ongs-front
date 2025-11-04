import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'
import styles from './sidebar.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { LuUserRoundPlus } from "react-icons/lu";
import { PiUsersThree } from "react-icons/pi";
import { RiHome2Fill } from 'react-icons/ri';

export const Administrador = () => {
    const { user } = useAuth()

    const administrador = user.isAdmin

    return (
        <div className={`p-2 ${styles['owner-bg']} `}>

                       
            {administrador && <ul className={`${styles['listaNaoOrdenada']} mt-5`}>
                <li className={`${styles['listItem']} d-flex ps-1`}>
                    <Link to='/dashboard/inicio' className={`text-light ${styles['link']} ${styles['icon-link']} `}><RiHome2Fill  size={25} /></Link>
                    <Link to='/dashboard/inicio' className={`text-light ${styles['link']}  ${styles['text-link']} `}>Painel</Link>
                </li>

                <li className={`${styles['listItem']} d-flex ps-1`} >
                    <Link to='/dashboard/cadastro' className={` text-light ${styles['link']} ${styles['icon-link']}`}><LuUserRoundPlus size={25} /></Link>
                    <Link to='/dashboard/cadastro' className={` text-light ${styles['link']} ${styles['text-link']} `}>Novo Usuário</Link>
                </li>

                <li className={`${styles['listItem']} d-flex ps-1`}>
                    <Link to='/dashboard/cadastros' className={`text-light ${styles['link']} ${styles['icon-link']} `}><PiUsersThree size={25} /></Link>
                    <Link to='/dashboard/cadastros' className={`text-light ${styles['link']}  ${styles['text-link']} `}>Usuários</Link>
                </li>

                <li className="dropdown">
                    <button className={`btn dropdown-toggle text-light ps-1`} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Gráficos
                    </button>
                    <ul className="dropdown-menu dropdown-menu-dark">
                        <Link to='graficos-pessoais'  className="dropdown-item">Chefes de Família</Link>
                        <Link to='graficos-domiciliares'  className="dropdown-item">Dados Domiciliares</Link>
                        <Link to='graficos-vulnerabilidade'  className="dropdown-item">Dados Vulnerabilidade</Link>
                    </ul>
                </li>

            </ul>}
            

        </div>
    )
}