import React, {useState} from 'react'
import { Link } from 'react-router-dom';

const Modal = (props) => {

    const [show, setShow] = useState(false);

    const handleShowModal=()=>{
        setShow(show => !show);
    }

    const handleDeleteClick=()=>{
        props.deleteAction();
        handleShowModal();
    }


    const handleCancelClick=()=>{
        handleShowModal();
    }

    return (
        <div>
            {
                show ? 
                <div id="modal">
                    <div>
                        <h3>{props.title}</h3>
                        <p>{props.message}</p>
                        <div className='btn'>
                            <button id="cancel" onClick={handleCancelClick}>Cancel</button>
                            <button id="delete" onClick={handleDeleteClick}>Delete</button>
                        </div>
                    </div>
                    
                </div>
                :
                <div className='options'>
                    
                    {
                        props.urlView && <Link to={props.urlView} className="btn-show">  View </Link>
                    }
                    {
                        props.urlUpdate &&  <Link to={props.urlUpdate} className="btn-update"> Update </Link>
                    }
                   
                    <span  className="btn-delete" onClick={handleShowModal}>{props.title}</span>
                    
                </div>
            }

        </div>
    )
}

export default Modal
