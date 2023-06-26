import { Link } from 'react-router-dom';
import { GrArticle, GrCircleInformation } from 'react-icons/gr';
import { AiOutlineHome } from 'react-icons/ai';
import { BiPin } from 'react-icons/bi';


const NavBar = () => {

    return (

        /* NAVBAR SECTION */
        <nav className="grid place-content-center space-y-4">
            <ul className="flex space-x-4 mt-2">

                {/* HOME MENU ITEM */}
                <li className="p-2 hover:border-b-2">
                    <Link to="/" className="flex-col flex-wrap">
                        <AiOutlineHome className="ml-1.5 text-2xl" />
                        <p className="text-sm">Home</p>
                    </Link>
                </li>

                {/* ARTICLES MENU ITEM */}
                <li className="p-2 hover:border-b-2">
                    <Link to="/articles" className="flex-col flex-wrap">
                        <GrArticle className="ml-3 text-2xl" />
                        <p className="text-sm">Articles</p>
                    </Link>
                </li>

                {/* NOTES MENU ITEM */}
                <li className="p-2 hover:border-b-2">
                    <Link to="/pins" className="flex-col flex-wrap">
                        <BiPin className="ml-2 text-2xl" />
                        <p className="text-sm">Notes</p>
                    </Link>
                </li>

                {/* ABOUT MENU ITEM */}
                <li className="p-2 hover:border-b-2">
                    <Link to="/about" className="flex-col flex-wrap" >
                        <GrCircleInformation className="ml-2 text-2xl" />
                        <p className="text-sm">About</p>
                    </Link>
                </li>

            </ul>
        </nav>
    );
}

export default NavBar;