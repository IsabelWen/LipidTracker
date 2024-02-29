// Import scss
import "./login.scss"

// Import components


// Main
const Login = () => {
    return (
        <div className="login">
            <form>
            <input type="email" placeholder="Email"/>
            <input type="password" placeholder="Password"/>
            <button type="submit">Login</button>
            <span>Wrong email or password!</span>
        </form>
        </div>
    );
};

export default Login;