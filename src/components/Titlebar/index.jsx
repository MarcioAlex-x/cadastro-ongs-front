import { Link } from 'react-router-dom'
import styles from './titlebar.module.css'
export const Titlebar = ({ className }) => {
    return (
        <div className={`d-flex align-items-center text-light justify-content-center 
            ${className} 
            ${styles['owner-bg']}`}
        >
            <Link
                to='/dashboard/inicio'
                className={`text-light ${styles['title']}`}>
                Dashboard
            </Link>
        </div>
    )
}