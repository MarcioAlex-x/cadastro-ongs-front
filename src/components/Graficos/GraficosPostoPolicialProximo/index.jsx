import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

export const GraficosPostoPolicialProximo = ({ policial }) => {

    const data = [
        { name: 'Sim', value: policial['Sim'] },
        { name: 'Não', value: policial['Não'] }
    ]

    const COLORS = [
        '#FF005C', // Rosa neon
        '#00C2FF', // Azul neon
        '#FFD500', // Amarelo neon
        '#00E676', // Verde neon
        '#9D00FF', // Roxo neon
        '#FF6D00', // Laranja neon

        // Novas cores neon adicionadas
        '#FF00FF', // Magenta neon forte
        '#39FF14', // Verde limão neon
        '#00FFFD', // Ciano neon
        '#FF073A', // Vermelho neon intenso
        '#FE019A', // Pink neon
        '#F5F500', // Amarelo neon mais claro
        '#7DF9FF', // Azul bebê neon
        '#FF1493', // Rosa choque neon
        '#B026FF', // Roxo neon elétrico
        '#FFDC00'  // Amarelo ouro neon
    ]

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