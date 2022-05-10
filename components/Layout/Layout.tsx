import React, {Fragment} from 'react';
import Header from "./Header";
import {Container} from "@mui/material";
import Footer from "./Footer";

type Props = {
    children: JSX.Element
}

const Layout: React.FC<Props> = ({children}) => {
    return (
        <Fragment>
            <Header/>
            <main>
                {children}
            </main>
            <Footer/>
        </Fragment>
    );
};

export default Layout;
