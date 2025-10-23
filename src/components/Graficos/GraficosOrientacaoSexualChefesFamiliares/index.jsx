import { Pie, PieChart, Label, ResponsiveContainer, Tooltip, Cell, Legend } from "recharts";

export const GraficosOrientacaoSexualChefesFamiliares = ({ orientacaoChefe }) => {

    const data = [
        { name: 'Hétero', value: orientacaoChefe['Hétero'] },
        { name: 'Gay', value: orientacaoChefe['Gay'] },
        { name: 'Lésbica', value: orientacaoChefe['Lésbica'] },
        { name: 'Bisexual', value: orientacaoChefe['Bisexual'] },
        { name: 'Assexual', value: orientacaoChefe['Assexual'] },
        { name: 'Pansexual', value: orientacaoChefe['Pansexual'] },
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
