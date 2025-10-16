import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

export const GraficosTrabalhosChefe = ({ trabalhoChefes }) => {

    const data = [
        { name: 'Epregado', value: trabalhoChefes['Empregado'] || 0 },
        { name: 'Desempregado', value: trabalhoChefes['Desempregado'] || 0 },
        { name: 'Autônomo', value: trabalhoChefes['Autônomo'] || 0 },
        { name: 'Subemprego', value: trabalhoChefes['Subemprego'] || 0 },
        { name: 'Estudante', value: trabalhoChefes['Estudante'] || 0 },
        { name: 'Estágio Remunerado', value: trabalhoChefes['Estágio Remunerado'] || 0 }
    ]

    const COLORS = [
        '#FF005C', // Rosa neon
        '#00C2FF', // Azul neon
        '#FFD500', // Amarelo neon
        '#00E676', // Verde neon
        '#9D00FF', // Roxo neon
        '#FF6D00', // Laranja neon
    ]
    return (
        <div>
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
                            fontSize: '12px',
                            fontWeight: 'bold'
                        }} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}