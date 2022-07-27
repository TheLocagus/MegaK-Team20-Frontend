import './FiltersModal.scss';

//modal pojawiający się po wciśnieciu przycisku Filtrowanie


interface Props {
    onClick: () => void;
}


const FiltersModal: React.FC<Props> = ({ onClick }) => {


    return (
        <div className='filters-modal'>
            <div>
                <button onClick={onClick}>Anuluj</button>
            </div>
        </div>
    )
}

export default FiltersModal;