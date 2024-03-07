// Import scss
import "./faq.scss"

// Import components
import Sidebar from "../../components/sidebar/sidebar";
import Questions from "../../components/questions/questions";

// Main
const FAQ = () => {
    return (
        <div className="faq">
            <Sidebar />
            <div className="faqContainer">
                <Questions />
            </div>
        </div>
    );
};

export default FAQ;