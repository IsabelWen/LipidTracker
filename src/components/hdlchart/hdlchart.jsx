// Imports
import "./hdlchart.scss"
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase"
import { useEffect, useState } from "react";

// Main
const HDLChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "results"), (snapShot) => {
            let list = [];
            snapShot.docs.forEach((doc) => {
                const { hdl } = doc.data();
                if (hdl !== null && hdl !== undefined) {
                    list.push({ id: doc.id, ...doc.data() });
                }
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
        <div className="hdlchart">
            <div className="top">
                <h1 className="title">HDL Bar Chart</h1>
            </div>
            <hr />
            <ResponsiveContainer width="100%" aspect={2.5 / 1}>
                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 0,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
                    <XAxis dataKey="date" stroke="gray" />
                    <YAxis type="number" domain={[0, 80]} stroke="gray" />
                    <Tooltip />
                    <Legend />
                        <Bar dataKey="hdl" 
                        fill="#82C272" 
                        barSize={70}
                        activeBar={<Rectangle fill="#689b5b" />}
                         />     
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default HDLChart;