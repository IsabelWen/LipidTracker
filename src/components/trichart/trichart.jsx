// Imports
import "./trichart.scss"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase"
import { useEffect, useState } from "react";

// Main
const TriChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "results"), (snapShot) => {
            let list = [];
            snapShot.docs.forEach((doc) => {
                list.push({ id: doc.id, ...doc.data() });
            });

            // Sort the list array by date
            list.sort((a, b) => new Date(a.date) - new Date(b.date));
            
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
                <h1 className="title">Triglycerides Line Chart</h1>
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
                    <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
                    <XAxis dataKey="date" stroke="gray" />
                    <YAxis type="number" domain={[0, 1000]} stroke="gray" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone"
                    name="Triglycerides"
                    connectNulls
                    dataKey="triglycerides"
                    stroke="#D5255E"
                    strokeWidth="2"
                    activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TriChart;