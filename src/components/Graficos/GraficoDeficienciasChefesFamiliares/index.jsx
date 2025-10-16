import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

export const GraficosDeficienciasChefesFamiliares = ({ deficienciaChefes }) => {

    const data = [
        { name: 'Possui deficiência', value: deficienciaChefes['Sim'] },
        { name: 'Não possui deficiência', value: deficienciaChefes['Não'] }
    ]

    const COLORS = ['#dc3545', '#0d6efd']

    return (
        <div>
            <ResponsiveContainer width='100%' height={240}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey='value'
                        nameKey="name"
                        outerRadius={80}
                        innerRadius={60}
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
                        wrapperStyle={{
                            fontSize: '12px',
                            fontWeight: 'bold'
                        }} />
                    </PieChart>
            </ResponsiveContainer>
        </div>
    )
}