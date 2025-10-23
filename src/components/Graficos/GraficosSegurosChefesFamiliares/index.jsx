import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

export const GraficosSegurosChefesFamiliares = ({ seguroChefes }) => {
    const data = [
        { name: "Licença Médica", value: seguroChefes['Licença Médica'] },
        { name: 'Aposentadoria', value: seguroChefes['Aposentadoria'] },
        { name: 'Pensão Alimentícia', value: seguroChefes['Pensão Alimentícia'] },
        { name: 'Seguro Desemprego', value: seguroChefes['Seguro Desemprego'] },
        { name: 'Bolsa Família', value: seguroChefes['Bolsa Família'] },
        { name: 'BPC', value: seguroChefes['BPC'] },
        { name: 'Nenhum', value: seguroChefes['Nenhum'] }
    ]

    const COLORS = [
        '#FF005C',
        '#00C2FF',
        '#FFD500',
        '#00E676',
        '#9D00FF',
        '#FF6D00',
        '#FF00FF'
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