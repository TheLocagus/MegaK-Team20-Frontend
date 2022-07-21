import { NavLink } from 'react-router-dom';
import './ButtonLink.scss';

//template do przycisków (button, a, NavLink, Link, submit button itp)

interface Props {
    customClass?: string;
    label?: string;
    type?: string;
    target?: string;
    onClick?: () => void;
}


const ButtonLink: React.FC<Props> = ({customClass, label, type, target, onClick}) => {


    return (
        type === 'button' || type === 'submit' ? 
            <button className={`btn ${customClass}`} type={type} onClick={onClick}>{label}</button> : 
            <NavLink to={target || '/'} >{label}</NavLink>
    )
}

export default ButtonLink;