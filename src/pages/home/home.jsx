// Import scss
import "./home.scss"

// Import components
import Sidebar from "../../components/sidebar/sidebar";
import Target from "../../components/target/target";
import Chart from "../../components/chart/chart";
import TriChart from "../../components/trichart/trichart";
import HDLChart from "../../components/hdlchart/hdlchart";

// Main
const Home = () => {
    return (
        <div className="home">
            <Sidebar className="sidebar"/>
            <div className="homeContainer">
                <div className="homeTitle">Dashboard</div>
                <div className="homeContent">
                    <Target />
                    <HDLChart />
                </div>
                <div className="homeContent">
                    <Chart />
                </div>
                <div className="homeContent">
                    <TriChart />
                </div>
            </div>
        </div>
    );
};

export default Home;