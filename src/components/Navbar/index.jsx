import { useAuth } from '../../context/AuthContext'
import { FaRegUser } from "react-icons/fa6"
import styles from './navbar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { HiLogout, HiOutlineLogout } from 'react-icons/hi'

export const Navbar = ({ className }) => {
    const { user } = useAuth()
    const { logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () =>{

        try {
            await logout()
            Swal.fire({
                title:'Sucesso',
                text:'Logout realizado com sucesso',
                icon:'success',
                showCancelButton: false
            })

            navigate(`/login`)
        } catch (err) {
            console.error(err)
        }
    }

    console.log('Usuário: ',user)
    
    return (
        <nav className={`align-items-center ${className} ${styles['bg-owner']}`}>

            {user &&
                <div className='d-flex align-items-center justify-content-end  px-4 py-2'>
                    <FaRegUser color={'white'} />
                    <p className='text-light my-0 ms-2'> <Link className={`${styles['link']}`} to={`/dashboard/usuario/${user.id}`}>{user.nome}</Link></p>
                    {
                        user.isAdmin && (
                            <p className='text-light ms-3 my-0'><Link className={`${styles['link']}`} to='/dashboard/administrador' >Administrador</Link></p>
                        )
                    }
                    {
                        user.isCoordenador && (
                            <p className='text-light ms-3 my-0'><Link className={`${styles['link']}`} to='/dashboard/administrador' >Coordenador</Link></p>
                        )
                    }
                    {
                        user.isDocente && (
                            <p className='text-light ms-3 my-0'><Link className={`${styles['link']}`} to='/dashboard/administrador' >Professor</Link></p>
                        )
                    }
                    {
                        user.isFinanceiro && (
                            <p className='text-light ms-3 my-0'><Link className={`${styles['link']}`} to='/dashboard/administrador' >Financeiro</Link></p>
                        )
                    }
                    {
                        user.isSocial && (
                            <p className='text-light ms-3 my-0'><Link className={`${styles['link']}`} to='/dashboard/administrador' >Assistente Social</Link></p>
                        )
                    }
                    <HiOutlineLogout 
                    className='text-light ms-2 ' 
                    style={{cursor:'pointer'}} 
                    size={20} 
                    onClick={()=>{handleLogout()}}/>
                </div>
            }
        </nav>
    )
}