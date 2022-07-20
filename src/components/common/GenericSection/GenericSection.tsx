import './GenericSection.scss';

//uniwersalny komponent dla sekcji na stronie

interface Props {
    children: React.ReactNode;
    customClass?: string;
}

const GenericSection: React.FC<Props> = ({ children, customClass }) => {
    
    
    return (
        <section className={customClass}>
            {children}
        </section>
    )
}

export default GenericSection;