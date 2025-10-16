import { Pie, PieChart, Legend, ResponsiveContainer, Cell, Tooltip } from "recharts"

export const GraficosEtniasChefesFamiliares = ({ etniaChefes }) => {

    if (!etniaChefes) return null

    const data = [
        { name: 'Pardo', value: etniaChefes['Pardo'] || 0 },
        { name: 'Preto', value: etniaChefes['Preto'] || 0 },
        { name: 'Branco', value: etniaChefes['Branco'] || 0 },
        { name: 'Indígena', value: etniaChefes['Indígena'] || 0 },
        { name: 'Outro', value: etniaChefes['Outro'] || 0 },
    ]

    const COLORS = [
        '#FF005C',
        '#00C2FF',
        '#FFD500',
        '#00E676',
        '#9D00FF',
    ]

    return (
        <div>
            <ResponsiveContainer width='100%' height={240} >
                <PieChart>
                    <Pie
                        data={data}
                        dataKey='value'
                        nameKey='name'
                        outerRadius={80}
                        innerRadius={60}
                        label>
                        {data.map((entry, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
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