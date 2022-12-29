import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from "../components/navigations/navbar";
import { Footer } from "../components/navigations/footer";

import { check_authenticated, load_user, refresh } from '../redux/actions/auth';
import { connect } from 'react-redux';
import { useEffect } from 'react';

const Layout = (props) => {
    useEffect(()=>{
        props.refresh()
        props.check_authenticated()
        props.load_user()
    }, []);
    
    return (
        <div>
            <Navbar />
            <ToastContainer autoClose={5000} />
            {props.children}
            <Footer />
        </div>
    )
}

export default connect(null, {
    check_authenticated,
    load_user,
    refresh,
}) (Layout)