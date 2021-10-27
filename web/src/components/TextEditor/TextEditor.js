import React, { useRef} from 'react';
import JoditEditor from "jodit-react"; // https://www.npmjs.com/package/jodit-react

const TextEditor = ({action}) => {

	const editor = useRef(null)
	const config = {
		readonly: false
	}
	
	return (
        <JoditEditor
            ref={editor}
            config={config}
            tabIndex={1} 
            onBlur={newContent => action(newContent)} 
        />
    );
}

export default TextEditor
