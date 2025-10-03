import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'
import styles from './sidebar.module.css'

export const Sidebar = () => {
    const { user } = useAuth()
    return (
        <div className={`d-flex flex-column  ${styles['owner-bg']}`}>
            {user &&
                <p className='text-light pt-4 ps-4'>
                    
                    Bem-Vindo {user.nome}
                </p>
            }

            <ul>
                <li><Link to='/dashboard/cadastro' className={`text-light ${styles['link']} `}>Novo Beneficiário</Link></li>
                <li><Link to='/dashboard/cadastros' className={`text-light ${styles['link']}`}>Beneficiários</Link></li>
            </ul>
            
            
        </div>
    )
}