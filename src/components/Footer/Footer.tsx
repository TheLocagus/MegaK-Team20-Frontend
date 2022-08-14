import './Footer.scss';

//stopka


const Footer = () => {
    
    const year: number = new Date().getFullYear()

    return (
        <footer>
            <p>{`Copyright \u00A9 ${year} MegaK students. All Rights Reserved`}</p>
        </footer>
    )
}

export default Footer;