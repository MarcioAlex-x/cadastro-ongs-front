import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'
import styles from './sidebar.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { LuUserRoundPlus } from "react-icons/lu";
import { PiUsersThree } from "react-icons/pi";
import { Administrador } from './Administrador';
import { Social } from './Social';
import { Coordenador } from './Coordenador';
import { Docente } from './Docente';
import { Financeiro } from './Financeiro';

export const Sidebar = () => {
    const { user } = useAuth()

    const administrador = user.isAdmin
    const coordenador = user.isCoordenador
    const docente = user.isDocente
    const financeiro = user.isFinanceiro
    const social = user.isSocial

    return (
        <div className={`p-2 ${styles['owner-bg']}`}>

                       
            {administrador && <Administrador />}
            {social && <Social />}
            {coordenador && <Coordenador />}
            {docente && <Docente />}
            {financeiro && <Financeiro />}
            

        </div>
    )
}