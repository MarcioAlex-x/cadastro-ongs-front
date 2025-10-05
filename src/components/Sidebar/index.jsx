import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'
import styles from './sidebar.module.css'

import { LuUserRoundPlus } from "react-icons/lu";
import { PiUsersThree } from "react-icons/pi";

export const Sidebar = () => {
    const { user } = useAuth()
    return (
        <div className={`p-2 ${styles['owner-bg']}`}>
            {user &&
                <p className={`text-light pt-4 ${styles['title-sidebar']}`}>

                    Bem-Vindo {user.nome}
                </p>
            }

            <ul className={styles.listaNaoOrdenada}>
                <li className={`${styles['listItem']} d-flex justify-content-center ps-0`} >
                    <Link to='/dashboard/cadastro' className={` text-light ${styles['link']} ${styles['icon-link']}`}><LuUserRoundPlus /></Link>
                    <Link to='/dashboard/cadastro' className={` text-light ${styles['link']} ${styles['text-link']} `}>Novo Beneficiário</Link>
                </li>
                <li className={`${styles['listItem']} d-flex justify-content-center ps-0`}>
                    <Link to='/dashboard/cadastros' className={`text-light ${styles['link']} ${styles['icon-link']} `}><PiUsersThree /></Link>
                    <Link to='/dashboard/cadastros' className={`text-light ${styles['link']}  ${styles['text-link']} `}>Beneficiários</Link>
                </li>
                
            </ul>

        </div>
    )
}