// Import scss
import "./faq.scss"

// Import components
import Sidebar from "../../components/sidebar/sidebar";

// Main
const FAQ = () => {
    return (
        <div className="faq">
            <Sidebar />
            <div className="faqContainer">
                FAQ
            </div>
        </div>
    );
};

export default FAQ;