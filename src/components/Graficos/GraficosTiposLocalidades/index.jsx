import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

export const GraficosTiposLocalidades = ({ tipo }) => {
    const data = [
        { name: 'Rural', value: tipo['Rural'] },
        { name: 'Urbana', value: tipo['Urbana'] }
    ]

    const COLORS = [
        '#FF005C',
        '#00C2FF',
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