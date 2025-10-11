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
                        verticalAlign="bottom"
                        height={36}
                        wrapperStyle={{
                            fontSize: '12px',
                            fontWeight: 'bold'
                        }} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}
