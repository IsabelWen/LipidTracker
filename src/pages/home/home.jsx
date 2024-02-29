// Import scss
import "./home.scss"

// Import components
import Sidebar from "../../components/sidebar/sidebar";

// Main
const Home = () => {
    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <div className="homeTitle">Dashboard</div>
                <div className="charts">


                </div>
            </div>
        </div>
    );
};

export default Home;