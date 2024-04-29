// Import scss
import "./footer.scss";

// Import PDF file
import Impressum from "../../files/Impressum.pdf";

// Main
const Footer = () => {
    return (
        <div className="footer">
            <a href={Impressum} rel="noreferrer" target="_blank">Impressum</a>
        </div>
    );
};

export default Footer;