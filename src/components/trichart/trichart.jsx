// Imports
import "./trichart.scss"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase"
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";

// Main
const TriChart = () => {
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

    // Extracting the highest triglycerides value from the data
    const highestTriglycerides = Math.max(...data.map(item => item.triglycerides));

    return (
        <div className="chart">
            <div className="top">
                <h1 className="title">Triglycerides Line Chart</h1>
            </div>
            <hr />
            <ResponsiveContainer width="100%" height='90%'>
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
                    <YAxis type="number" domain={[0, highestTriglycerides+5]} stroke="gray" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone"
                    name="Triglycerides"
                    connectNulls
                    dataKey="triglycerides"
                    stroke="#D5255E"
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

export default TriChart;