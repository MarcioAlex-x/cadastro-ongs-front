import { PieChart, Pie, Tooltip, Legend, Cell, ResponsiveContainer } from "recharts";

export const GraficosIdadesFamiliares = ({ idades }) => {
    const data = [
        { name: 'Até 20 anos', value: idades.menor20 || 0 },
        { name: '21 até 30 anos', value: idades.menor30 || 0 },
        { name: '31 até 40 anos', value: idades.menor40 || 0 },
        { name: '41 até 50 anos', value: idades.menor50 || 0 },
        { name: '51 até 60 anos', value: idades.menor60 || 0 },
        { name: '60+', value: idades.sessentaMais || 0 },
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

