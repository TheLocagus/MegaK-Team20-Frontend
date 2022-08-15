import { NavLink } from 'react-router-dom';

import './ButtonLink.scss';

//template do przycisków (button, a, NavLink, Link, submit button itp)

interface Props {
    customClass?: string;
    label?: string;
    type?: string;
    target?: string;
    icon?: React.SVGProps<SVGSVGElement>;
    img?: string;
    name?: string;
    aria?: string;
    onClick?: () => void;
}


const ButtonLink: React.FC<Props> = ({ customClass, label, type, target, icon, img, name, aria, onClick }) => {


    return (
        type === 'button' || type === 'submit' ? 
            <button className={`btn ${customClass || ''}`} type={type} name={name} aria-label={aria} onClick={onClick}>
                <>
                    {label}
                    {icon}
                    {img && <span>{img}</span>}
                </>
            </button> : 
            <NavLink to={target || '/'} className={customClass || ''} aria-label={aria} >
                <>
                    {label && <p>{label}</p>}
                    {icon}
                </>
            </NavLink>
    )
}

export default ButtonLink;