import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import styles from './inicio.module.css'

export const InicioCoordenador = () => {
    const { user } = useAuth()
    return (
        <div>
            {user.isAdmin &&
                <Link
                    to='/dashboard/inicio-administrativo'
                    className={` ${styles['link']}`}><button className={`btn btn-primary btn-sm mb-3`}
                    >Voltar ao Administrativo
                    </button>
                </Link>
            }
            Início Coordenador
        </div>
    )
}