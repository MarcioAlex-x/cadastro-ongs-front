import { PieChart, Pie, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts'

export const GraficosUsuarios = ({ admins, comuns }) => {

    const data = [
        { name: 'Adminitradores', value: admins },
        { name: 'Usuários Comuns', value: comuns }
    ]

    const COLORS = ['#dc3545', '#0d6efd']
    return (
        <ResponsiveContainer width='100%' height={300}>
            <PieChart>
                <Pie 
                data={data}
                dataKey='value'
                nameKey='name'
                outerRadius={80}
                innerRadius={50}
                label>
                    {data.map((el, index)=>(
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign='bottom' height={36} />
            </PieChart>
        </ResponsiveContainer>
    )

}