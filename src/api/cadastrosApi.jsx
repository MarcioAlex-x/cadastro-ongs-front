const url = import.meta.env.VITE_API_URL
const fethcCadastro = async () => {
    try {

        const response = await fetch(`${url}/cadastro`, {
            credentials: 'include'
        })
        const data = await response.json()
        return data
        
    } catch (err) {
        return err.message
    }
}
console.log(url)
export const cadastroShowAll = async () => await fethcCadastro()

export const cadastrosMesAnterior = async () => {
    const cadastros = await fethcCadastro()

    const hoje = new Date()
    let mesAnterior = hoje.getMonth()
    let anoAnterior = hoje.getFullYear()

    if (mesAnterior === 0) {
        mesAnterior = 11
        anoAnterior -= 1
    } else {
        mesAnterior -= 1
    }

    return cadastros.filter(el => {
        const data = new Date(el.createdAt)
        return data.getMonth() === mesAnterior && data.getFullYear() === anoAnterior
    })
}

export const ultimosCadastros = async () => {

    const cadastros = await fethcCadastro()
    const hoje = new Date()
    const mesAtual = hoje.getMonth()
    const anoAtual = hoje.getFullYear()
     
    return cadastros.filter(el =>{
        const data = new Date(el.createdAt)
        return data.getMonth() === mesAtual && data.getFullYear() === anoAtual
    })
}

export const cadastrosAno = async () =>{
    const cadastros = await fethcCadastro()
    const hoje = new Date()
    const anoAtual = hoje.getFullYear()

    return cadastros.filter(el =>{
        const data = new Date(el.createdAt)
        return data.getFullYear() === anoAtual
    })
}

