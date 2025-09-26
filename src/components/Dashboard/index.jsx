import { useEffect } from "react"
import { Navbar } from "../Navbar"
import { Sidebar } from "../Sidebar"
import { Titlebar } from "../Titlebar"
import styles from './dashboard.module.css'
import { Outlet } from "react-router-dom"

export const Dashboard = () => {


    useEffect(() => {

    }, [])

    return (

        <div className={styles.margin}>

            <div className='row g-0'>
                <div className='col-2'>
                    <Titlebar className={styles.rowHeight} />
                </div>
                <div className='col-10'>
                    <Navbar className={styles.rowHeight} />
                </div>
            </div>
            <div className="row g-0">
                <div className="col-2">
                    <Sidebar />
                </div>
                <div className="col-10 p-3">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}