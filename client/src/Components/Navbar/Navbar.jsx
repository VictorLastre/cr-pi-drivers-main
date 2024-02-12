import {Link} from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
    return (
        <div className='container'>
            <div className='button_container'>
                <Link to={"/home"}>
                    <button className='navbar_button'>Home</button>
                </Link>
            </div>
        </div>
    )
}

export default Navbar