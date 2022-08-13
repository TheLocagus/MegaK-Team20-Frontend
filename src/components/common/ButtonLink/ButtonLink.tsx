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
    onClick?: () => void;
}


const ButtonLink: React.FC<Props> = ({ customClass, label, type, target, icon, img, name, onClick }) => {


    return (
        type === 'button' || type === 'submit' ? 
            <button className={`btn ${customClass || ''}`} type={type} name={name} onClick={onClick}>
                <>
                    {label}
                    {icon}
                    {img && <span>{img}</span>}
                </>
            </button> : 
            <NavLink to={target || '/'} className={customClass || ''}>
                <>
                    {label}
                    {icon}
                </>
            </NavLink>
    )
}

export default ButtonLink;