const fetchApi = async () => {
    try {

        const response = await fetch('http://localhost:3000/cadastro', {
            credentials: 'include'
        })
        const data = await response.json()
        return data

    } catch (err) {
        return err.message
    }
}

export const cadastroShowAll = async () => {
    return await fetchApi()
}

export const CadastrosMesAnterior = async () => {
    try {
        const cadastros = await fetchApi()
        const mesAtual = new Date().getMonth() + 1
        const anoAtual = new Date().getFullYear()

        const cadastrosMesPassado = cadastros.filter(el =>{
            const dataCadastro = new Date(el.createdAt)
            const mesCadastro = dataCadastro.getMonth()
            const anoCadastro = dataCadastro.getFullYear()

            return mesCadastro === mesAtual && anoCadastro === anoAtual
        })

        return cadastrosMesPassado
    } catch (err) {
        console.log(err.message)
    }
}

export const ultimosCadastros = async () => {
    try {
        const cadastros = await fetchApi()
        const mesAtual = new Date().getMonth() + 1
        const anoAtual = new Date().getFullYear()

        const cadastrosMesAtual = cadastros.filter(el => {
            const dataCadastro = new Date(el.createdAt)
            const mesCadatro = dataCadastro.getMonth() + 1
            const anoCadastro = dataCadastro.getFullYear()

            return mesCadatro === mesAtual && anoCadastro === anoAtual
        })

        return cadastrosMesAtual
    } catch (err) {
        console.log(err)
    }
}