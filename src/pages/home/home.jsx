// Import scss
import "./home.scss"

// Import components
import Sidebar from "../../components/sidebar/sidebar";
import Target from "../../components/target/target";
import Chart from "../../components/chart/chart";
import HDLChart from "../../components/hdlchart/hdlchart";

// Main
const Home = () => {
    return (
        <div className="home">
            <Sidebar className="sidebar"/>
            <div className="homeContainer">
                <div className="homeContent">
                    <Target />
                    <HDLChart />
                </div>
                <div className="homeContent">
                    <Chart />
                </div>
            </div>
        </div>
    );
};

export default Home;