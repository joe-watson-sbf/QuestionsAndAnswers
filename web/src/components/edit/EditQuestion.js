import React, {useState} from 'react'

const EditQuestion = ({answer}) => {

    const [show, setShow] = useState(false);
    
    useEffect(() => {
        effect
        return () => {
            cleanup
        }
    }, [input])


    return (
        
        <div>
            {answer && 
                <div className='btn'>
                    <button id="cancel" onClick={handleCancelClick}>Cancel</button>
                    <button id="delete" onClick={handleDeleteClick}>Delete</button>
                </div>
            }
        </div>
    )
}

export default EditQuestion
