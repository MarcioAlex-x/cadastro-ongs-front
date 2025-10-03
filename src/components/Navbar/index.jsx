import { useAuth } from '../../context/AuthContext'
import { FaRegUser } from "react-icons/fa6"
import styles from './navbar.module.css'

export const Navbar = ({ className }) => {
    const { user } = useAuth()
    return (
        <nav className={`align-items-center ${className} ${styles['bg-owner']}`}>

            {user &&
                <div className='d-flex align-items-center justify-content-end  px-4 py-2'>
                    <FaRegUser color={'white'} />
                    <p className='text-light my-0 ms-2'> {user.nome}</p>
                    {
                        user.isAdmin ? (
                            <p className='text-light ms-3 my-0'>Administrador</p>
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