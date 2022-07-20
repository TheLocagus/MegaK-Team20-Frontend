import './List.scss';

//uniwersalny komponent mapujący elementy dla list

interface Props {

}


const List: React.FC<Props> = () => {

    const list = 'jakaś lista'

    return (
        <ul>
            {list}
        </ul>
    )
}

export default List;