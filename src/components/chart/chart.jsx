// Imports
import "./chart.scss"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase"
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";

// Main
const Chart = () => {
    const [data, setData] = useState([]);
    const {currentUser} = useContext(AuthContext)
    const user = currentUser;
    const userUID = user.uid;

    useEffect(() => {
        const unsub = onSnapshot(
            query(collection(db, "results"), where("userID", "==", userUID)), (snapShot) => {
            let list = [];
            snapShot.docs.forEach((doc) => {
                list.push({ id: doc.id, ...doc.data() });
            });

            // Sort the list array by date
            list.sort((a, b) => new Date(a.date) - new Date(b.date));

            // Convert date format to DD/MM/YYYY
            list.forEach((item) => {
                item.date = new Date(item.date).toLocaleDateString('en-GB');
            });

            setData(list);
        }, (error) => {
            console.log(error);
        });

        return () => {
            unsub();
        };
    }, []);

    // Extracting the highest values of all
    const highestCholesterol = Math.max(...data.map(item => item.cholesterol).filter(value => value!== undefined));
    const highestLdl = Math.max(...data.map(item => item.ldl).filter(value => value!== undefined));
    const highestTriglycerides = Math.max(...data.map(item => item.triglycerides));
    const highestCholLdl = Math.max(highestLdl, highestCholesterol)
    const highestValue = Math.max(highestTriglycerides, highestCholLdl);

    return (
        <div className="chart">
            <div className="top">
                <h1 className="title">Cholesterol Line Chart</h1>
            </div>
            <hr />
            <ResponsiveContainer width="100%" height='85%'>
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
                        <YAxis type="number" domain={[0, highestValue]} stroke="gray" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone"
                        name="Cholesterol"
                        connectNulls
                        dataKey="cholesterol"
                        stroke="#619ED6"
                        strokeWidth="2"
                        activeDot={{ r: 8 }} />
                        <Line type="monotone"
                        name="LDL-Cholesterol"
                        connectNulls
                        dataKey="ldl"
                        stroke="#E48F1B"
                        strokeWidth="2"
                        activeDot={{ r: 8 }} />
                        <Line type="monotone"
                        name="Triglycerides"
                        connectNulls
                        dataKey="triglycerides"
                        stroke="#E64345"
                        strokeWidth="2"
                        activeDot={{ r: 8 }} />
                        <Line
                        name="Note" 
                        dataKey="note"
                        stroke="gray"
                        legendType="none"
                        />
                    </LineChart>
                </ResponsiveContainer>
        </div>
    );
};

export default Chart;