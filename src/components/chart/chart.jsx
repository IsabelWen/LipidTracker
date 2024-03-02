// Imports
import "./chart.scss"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase"
import { useEffect, useState } from "react";

// Main
const Chart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "results"), (snapShot) => {
            let list = [];
            snapShot.docs.forEach((doc) => {
                list.push({ id: doc.id, ...doc.data() });
            });
            setData(list);
        }, (error) => {
            console.log(error);
        });

        return () => {
            unsub();
        };
    }, []);

    return (
        <div className="chart">
            <div className="top">
                <h1 className="title">Cholesterol and LDL-Cholesterol Line Chart</h1>
            </div>
            <hr />
            <ResponsiveContainer width="100%" aspect={4 / 1}>
                    <LineChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date"/>
                        <YAxis type="number" domain={[0, 400]}/>
                        <Tooltip />
                        <Legend />
                        <Line type="monotone"
                        name="Cholesterol"
                        connectNulls
                        dataKey="cholesterol"
                        stroke="#1578CF"
                        strokeWidth="2"
                        activeDot={{ r: 8 }} />
                        <Line type="monotone"
                        name="LDL-Cholesterol"
                        connectNulls
                        dataKey="ldl"
                        stroke="#077368"
                        strokeWidth="2"
                        activeDot={{ r: 8 }} />
                        <Line type="monotone"
                        name="HDL-Cholesterol"
                        connectNulls
                        dataKey="hdl"
                        stroke="#4A5596"
                        strokeWidth="2"
                        activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
        </div>
    );
};

export default Chart;