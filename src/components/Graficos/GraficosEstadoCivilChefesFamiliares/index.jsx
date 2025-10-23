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
            <ResponsiveContainer width='100%' height={240}>
                <PieChart>
                    <Pie
                    data={data}
                    dataKey='value'
                    nameKey='name'
                    outerRadius={60}
                    innerRadius={40}
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
                    iconSize={6}
                    iconType="circle"
                    wrapperStyle={{
                        fontSize:'11px',
                        fontWeight:'bold',

                    }}/>
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}
