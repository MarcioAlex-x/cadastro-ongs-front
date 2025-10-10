export const fetchApi = async (endpoint, method = 'GET', body = null) =>{
    try {
        const options = {
            method,
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            }
        }

        if(body){
            options.body = JSON.stringify(body)
        }

        const response = await fetch(`http://localhost:3000${endpoint}`, options)

        if(!response.ok){
            throw new Error(`Erro: ${response.status} - ${response.statusText}`)
        }

        if(response.status === 204) return []

        const data = await response.json()
        return data || []
    } catch (err) {
        console.error(`Erro na requisição para ${endpoint}`, err)
        return []
    }
}