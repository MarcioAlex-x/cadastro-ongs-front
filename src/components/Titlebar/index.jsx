import { Link } from 'react-router-dom'
import styles from './titlebar.module.css'
import { RiDashboardHorizontalLine } from "react-icons/ri";


export const Titlebar = ({ className }) => {
    return (
        <div className={`d-flex align-items-center text-light justify-content-center 
            ${className} 
            ${styles['owner-bg']}`}
        >
            {/* <Link 
                to='/dashboard/inicio'
                className={` text-light ${styles['icon-link']} ${styles['title']}`}>
                <RiDashboardHorizontalLine />

            </Link>
            <Link 
                to='/dashboard/inicio'
                className={` text-light ${styles['text-link']} ${styles['title']}`}>
                Dashboard
            </Link> */}
            <span className='fs-4'><b>ADM</b>OSCS</span>
        </div>
    )
}