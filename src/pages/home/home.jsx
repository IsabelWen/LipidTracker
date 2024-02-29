// Import scss
import "./home.scss"

// Import components
import Sidebar from "../../components/sidebar/sidebar";
import Target from "../../components/target/target";
import Chart from "../../components/chart/chart";

// Main
const Home = () => {
    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <div className="homeTitle">Dashboard</div>
                <div className="homeContent">
                    <Target />
                    <Chart />
                </div>
            </div>
        </div>
    );
};

export default Home;