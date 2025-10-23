import { PieChart, Pie, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts'
import styles from './GraficosCadastrosDesteUsuario.module.css'

export const GraficosCadastrosDesteUsuarios = ({ cadastrosDesteUsuario, outrosCadastros }) => {
    const data = [
        { name: 'Cadastros deste usuário', value: cadastrosDesteUsuario },
        { name: 'Outros cadastros', value: outrosCadastros }
    ]

    const COLORS = ['#dc3545', '#0d6efd']

    return (
        <div className={styles.backGroundGraficos}>
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