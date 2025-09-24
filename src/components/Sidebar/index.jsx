import { useAuth } from '../../context/AuthContext'
import styles from './sidebar.module.css'
import { FaCircle } from "react-icons/fa";

export const Sidebar = () => {
    const { user } = useAuth()
    return (
        <div className={`${styles['owner-bg']}`}>
            {user &&
                <p className='text-light fs-5 text-center pt-2 mb-0'>
                    <FaCircle size={10} className='me-1 text-success' />
                    {user.nome}
                </p>
            }
        </div>
    )
}