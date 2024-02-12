import React from 'react';
import Style  from './Footer.module.scss'
import Logo from "../Icons/Logo";
import UpArrow from "../Icons/UpArrow";
const Footer = () => {
    const handelUp = ()=>{
        window.scrollTo({top: 0, left: 0, behavior: `smooth`});
    }
    return (
        <footer>
<Logo/>
            <ul>
                <li><a href={`#`}>Github</a></li>
                <li><a href={`#`}>Contacts</a></li>
                <li><a href={`#`}>rights</a></li>
            </ul>
            <div className={Style.footerUpArrow}>
                <p>Back to top</p>
                <UpArrow handelUp={handelUp} />
            </div>

        </footer>
    );
};

export default Footer;