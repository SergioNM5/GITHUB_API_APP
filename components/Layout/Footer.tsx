import React from 'react';
import classes from '../../styles/Footer.module.css'

const Footer = () => {
    return (
        <footer className={classes.footer}>
            <div className={classes.footer__container}>
                <div>
                    <h4>SERVICES</h4>
                    <p>Software Development</p>
                    <p>Quality Assurance</p>
                </div>
                <div>
                    <h4>COMPANY</h4>
                    <p>about</p>
                </div>
                <div>
                    <h4>LEGAL</h4>
                    <p>Terms & Conditions</p>
                    <p>Privacy Policy</p>
                </div>
                <div>
                    <h4>RESOURCES</h4>
                    <p>FAQ</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
