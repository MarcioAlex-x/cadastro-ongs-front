const url = import.meta.env.VITE_API_URL
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
import { useEffect, useState } from 'react';

export const Sidebar = () => {
    const { user } = useAuth()
    const [inst, setInst] = useState([])

    const administrador = user.isAdmin
    const coordenador = user.isCoordenador
    const docente = user.isDocente
    const financeiro = user.isFinanceiro
    const social = user.isSocial

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const response = await fetch(`${url}/instituicao`)

                const data = await response.json()
                setInst(data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchApi()
    }, [])

    return (
        <div className={`p-2 ${styles['owner-bg']}`}
            style={{
                backgroundImage: `
                      linear-gradient(rgba(17, 22, 24, 0.95), rgba(26, 34, 38, 0.9)),
                      url(${inst[0]?.imagemInstituicao})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center bottom',
                backgroundRepeat: 'no-repeat',
            }}>


            {administrador && <Administrador />}
            {social && <Social />}
            {coordenador && <Coordenador />}
            {docente && <Docente />}
            {financeiro && <Financeiro />}


        </div >
    )
}