// Import scss
import "./faq.scss"

// Import components
import Sidebar from "../../components/sidebar/sidebar";
import Questions from "../../components/questions/questions";
import Footer from "../../components/footer/footer";

// Main
const FAQ = () => {
    return (
        <>
            <div className="faq">
                <Sidebar className="sidebar"/>
                <div className="faqContainer">
                    <Questions />
                </div>
            </div>
            <Footer></Footer>
        </>
    );
};

export default FAQ;