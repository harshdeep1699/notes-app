import { Link, Redirect } from "react-router-dom"
import './WelcomePage.css'
import welcomePic from './welcome.jpg'
const WelcomePage=()=>{
    return(
        <div className="welcomePage">
            <img className='pic' src={welcomePic}></img>
            {/* <p className='welcomeText'>Welcome to notes.</p> */}
            <Link className='link' to='/login'>Go to Notes</Link>
        </div>
    )
}

export default WelcomePage