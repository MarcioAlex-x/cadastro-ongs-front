import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell, Legend } from "recharts";

export const GraficosEstadoCivilChefesFamiliares = ({ estadoCivilChefes }) => {

    const data = [
        { name: 'Casado(a)', value: estadoCivilChefes['Casado'] },
        { name: 'Solteiro(a)', value: estadoCivilChefes['Solteiro'] },
        { name: 'Divorciado(a)', value: estadoCivilChefes['Divorciado'] },
        { name: 'Viúvo(a)', value: estadoCivilChefes['Viúvo'] },
    ]

    const COLORS = [
        '#FF005C',
        '#00C2FF',
        '#FFD500',
        '#00E676',
    ]

    return (
        <div >
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
                        layout="horizontal"
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
