import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Navbar } from "../components/navigations/navbar";
import { Footer } from "../components/navigations/footer";

const Layout = (props) => {
    return (
        <div>
            <Navbar />
            <ToastContainer autoClose={5000} />
            {props.children}
            <Footer />
        </div>
    )
}

export default Layout