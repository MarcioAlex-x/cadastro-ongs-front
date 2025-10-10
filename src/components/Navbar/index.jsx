import { useAuth } from '../../context/AuthContext'
import { FaRegUser } from "react-icons/fa6"
import styles from './navbar.module.css'
import { Link } from 'react-router-dom'

export const Navbar = ({ className }) => {
    const { user } = useAuth()
    return (
        <nav className={`align-items-center ${className} ${styles['bg-owner']}`}>

            {user &&
                <div className='d-flex align-items-center justify-content-end  px-4 py-2'>
                    <FaRegUser color={'white'} />
                    <p className='text-light my-0 ms-2'> <Link className={`${styles['link']}`} to={`/dashboard/usuario/${user.id}`}>{user.nome}</Link></p>
                    {
                        user.isAdmin ? (
                            <p className='text-light ms-3 my-0'><Link className={`${styles['link']}`} to='/dashboard/administrador' >Administrador</Link></p>
                        ) : (
                            <p className='text-light ms-3 my-0'>
                                Usuário
                            </p>
                        )
                    }
                </div>
            }
        </nav>
    )
}