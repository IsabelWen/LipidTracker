// Imports
import "./hdlchart.scss"
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { collection, onSnapshot, where, query } from "firebase/firestore";
import { db, auth } from "../../firebase"
import { useEffect, useState } from "react";

// Main
const HDLChart = () => {
    const [data, setData] = useState([]);
    const user = auth.currentUser;
    const userUID = user.uid;

    useEffect(() => {
        const unsub = onSnapshot(
            query(collection(db, "results"), where("userID", "==", userUID)), (snapShot) => {
            let list = [];
            snapShot.docs.forEach((doc) => {
                const { hdl } = doc.data();
                if (hdl !== null && hdl !== undefined) {
                    list.push({ id: doc.id, ...doc.data() });
                }
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
                    <Tooltip cursor={{fill: 'transparent'}}/>
                    <Legend />
                        <Bar dataKey="hdl" 
                        name="HDL"
                        fill="#82C272" 
                        barSize={70}
                        activeBar={<Rectangle fill="#689b5b" />}
                         />  
                        <Bar dataKey="note"
                        name="Note"
                        fill="gray"
                        barSize={0}
                        legendType="none"
                        />   
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default HDLChart;