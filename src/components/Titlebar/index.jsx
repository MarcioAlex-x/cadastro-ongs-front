import styles from './titlebar.module.css'
export const Titlebar = ({className}) =>{
    return(
        <div className={`d-flex align-items-center text-light justify-content-center ${className} ${styles['owner-bg']}`}>
            <h2>Dashboard</h2>
        </div>
    )
}