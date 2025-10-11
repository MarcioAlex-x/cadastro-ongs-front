
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

const calcularIdade = (dataNascimento) => {
    const hoje = new Date()
    const nascimento = new Date(dataNascimento)
    let idade = hoje.getFullYear() - nascimento.getFullYear()
    const mes = hoje.getMonth() - nascimento.getMonth

    if(mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())){
        idade --
    }
    return idade
}

export const idadeChefesFamiliares = async () => {
    try {
        const cadastros = await fethcCadastro()
        const todasPessoas = cadastros.flatMap(c => c.pessoas)
        const idades = todasPessoas.map(p => calcularIdade(p.data_nascimento))

        const faixaEtaria = {
            menor20: idades.filter(i => i < 20).length,
            menor30: idades.filter(i => i >= 20 && i < 30).length,
            menor40: idades.filter(i => i >= 30 && i < 40).length,
            menor50: idades.filter(i => i >= 40 && i < 50).length,
            menor60: idades.filter(i => i >= 50 && i < 60).length,
            sessentaMais: idades.filter(i => i >= 60).length
        }

        return faixaEtaria

    } catch (err) {
        console.error(err)
        return {}
    }
}

export const etniaChefesFamiliares = async () =>{
    try {
        const cadastros = await fethcCadastro()
        const todasPessoas = cadastros.flatMap(c => c.pessoas)
        const etnias = todasPessoas.map(e => e.etnia)

        const contagem = {
            Preto: 0,
            Branco: 0,
            Pardo: 0,
            Indígena: 0,
            Outro: 0
        }

        etnias.forEach(u => {
            if(contagem[u] !== undefined){
                contagem[u]++
            }
        })

        return contagem
        
    } catch (err) {
        console.error(err)
        return {}
    }
}

export const orientacaoSexualChefesFamiliares = async () =>{
    try {
        const cadastros = await fethcCadastro()
        const todasPessoas = cadastros.flatMap(c => c.pessoas)
        const orientacoes = todasPessoas.map(p => p.orientacao_sexual)
        
        const contagem = {
            Hétero: 0,
            Gay: 0,
            Lésbica: 0,
            Bissexual: 0,
            Assexual: 0,
            Pansexual: 0
        }

        orientacoes.forEach(o => {
            if(contagem[o] !== undefined){
                contagem[o]++
            }
        })

        return contagem
        
    } catch (err) {
        console.error(err)
        return {}
    }
}

export const estadoCivilChefesFamiliares = async () =>{
    try {
        const cadastros = await fethcCadastro()
        const todasPessoas = cadastros.flatMap(c => c.pessoas)
        const estadoCivil = todasPessoas.map(p => p.estado_civil)

        const contagem = {
            Casado:0,
            Solteiro:0,
            Divorciado:0,
            Viúvo:0
        }

        estadoCivil.forEach(e =>{
            if(contagem[e] !== undefined){
                contagem[e]++
            }
        })

        return contagem
        
    } catch (err) {
        console.error(err)
        return {}
    }
}

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

