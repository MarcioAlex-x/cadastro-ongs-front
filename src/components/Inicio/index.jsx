import { useAuth } from '../../context/AuthContext';
import { InicioAdministrativo } from './InicioAdministrativo';
import { InicioCoordenador } from './InicioCoordenador';
import { InicioDocente } from './InicioDocente';
import { InicioFinanceiro } from './InicioFinanceiro';
import { InicioSocial } from './inicioSocial';

export const Inicio = () => {   
    const { user } = useAuth()

    return (
        <>
            {user.isAdmin && <InicioAdministrativo />}
            {user.isCoordenador && <InicioCoordenador />}
            {user.isDocente && <InicioDocente />}
            {user.isFinanceiro && <InicioFinanceiro />}
            {user.isSocial && <InicioSocial />}

        </>
    )
}