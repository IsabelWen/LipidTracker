// Import scss
import "./home.scss"

// Import components
import Sidebar from "../../components/sidebar/sidebar";
import Target from "../../components/target/target";
import Chart from "../../components/chart/chart";
import HDLChart from "../../components/hdlchart/hdlchart";
import Footer from "../../components/footer/footer";

// Main
const Home = () => {
    return (
        <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
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
            <Footer></Footer>
        </div>
    );
};

export default Home;