import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

export const GraficosCondicoesMoradia = ({ condicoes }) => {
    const data = [
        { name: 'Própria', value: condicoes['Própria'] },
        { name: 'Alugada', value: condicoes['Alugada'] },
        { name: 'Cedido', value: condicoes['Cedido'] },
        { name: 'Invadido', value: condicoes['Invadido'] },
        { name: 'República', value: condicoes['República'] },
        { name: 'Residência Estudantil', value: condicoes['Residência Estudantil'] },
        { name: 'Moradia Compartilhada', value: condicoes['Moradia Compartilhada'] },
        { name: 'Outro', value: condicoes['Outro'] }
    ]

    const COLORS = [
        '#FF005C', // Rosa neon
        '#00C2FF', // Azul neon
        '#FFD500', // Amarelo neon
        '#00E676', // Verde neon
        '#9D00FF', // Roxo neon
        '#FF6D00', // Laranja neon

        // Novas cores neon adicionadas
        '#FF00FF', // Magenta neon forte
        '#39FF14', // Verde limão neon
    ]
    return (

        < div >
            <ResponsiveContainer width='100%' height={240}>
                <PieChart>
                    <Pie
                    data={data}
                    dataKey='value'
                    nameKey='name'
                    outerRadius={80}
                    innerRadius={60}
                    label>
                        {data.map((el, index)=>(
                            <Cell key={index} fill={COLORS[index % COLORS.length]}/>
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend 
                    layout="column"
                    verticalAlign="bottom"
                    align="center"
                    wrapperStyle={{
                        fontSize:'12px',
                        fontWeight:'bold'
                    }}/>
                </PieChart>
            </ResponsiveContainer>
        </div >
    )
}