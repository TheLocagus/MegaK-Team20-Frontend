import { NavLink } from 'react-router-dom';
import './ButtonLink.scss';

//template do przycisków (button, a, NavLink, Link, submit button itp)

interface Props {
    customClass?: string;
    label?: string;
    type?: string;
    target?: string;
    icon?: React.SVGProps<SVGSVGElement>;
    onClick?: () => void;
}


const ButtonLink: React.FC<Props> = ({ customClass, label, type, target, icon, onClick }) => {


    return (
        type === 'button' || type === 'submit' ? 
            <button className={`btn ${customClass}`} type={type} onClick={onClick}>
                <>{label}{icon}</>
            </button> : 
            <NavLink to={target || '/'} className={customClass}>
                <>{label}{icon}</>
            </NavLink>
    )
}

export default ButtonLink;