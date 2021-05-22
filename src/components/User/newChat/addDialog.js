import React from 'react';

const AddDialog = (props) => {

    const showModal = () =>{
        let yourId = prompt('Введите id');
        props.addDialog(yourId);
    }

    return (
        <div>
            <button onClick={showModal}>+</button>
        </div>
    )
}

export default AddDialog;