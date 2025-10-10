import { PieChart, Pie, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts'

export const GraficosCadastrosDesteUsuarios = ({cadastrosDesteUsuario, outrosCadastros}) =>{
    const data = [
        {name: 'Cadastros deste usuário', value: cadastrosDesteUsuario },
        {name: 'Outros cadastros', value: outrosCadastros}
    ]

    const COLORS = ['#dc3545', '#0d6efd']

    return(
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
                        <Cell key={index} fill={COLORS[index % COLORS.length]}/>
                    ))}
                </Pie>
                <Tooltip/>
                <Legend  verticalAlign='bottom' height={36} />
            </PieChart>
        </ResponsiveContainer>
    )
}