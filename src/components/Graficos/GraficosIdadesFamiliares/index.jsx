import { PieChart, Pie, Tooltip, Legend, Cell, ResponsiveContainer } from "recharts";

export const GraficosIdadesFamiliares = ({ idades }) => {
    const data = [
        { name: 'Crianças', value: idades.infantil || 0 },
        { name: 'Adolescentes', value: idades.adolescente || 0 },
        { name: 'Jovens adultos', value: idades.jovem_adulto || 0 },
        { name: 'Adultos', value: idades.adulto || 0 },
        { name: 'Meia-idade', value: idades.meia_idade || 0 },
        { name: 'Idosos', value: idades.idoso || 0 },
    ]

    const COLORS = [
        '#FF005C',
        '#00C2FF',
        '#FFD500',
        '#00E676',
        '#9D00FF',
        '#FF6D00'
    ]

    return (
        <div>
            <ResponsiveContainer width='100%' height={240}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey='value'
                        nameKey='name'
                        outerRadius={60}
                        innerRadius={40}
                        label>
                        {data.map((el, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend
                        layout="column"
                        verticalAlign="bottom"
                        align="center"
                        iconSize={6}
                        iconType="circle"
                        wrapperStyle={{
                            fontSize: '11px',
                            fontWeight: 'bold',

                        }} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

