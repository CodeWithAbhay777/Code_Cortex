import React from 'react';
import JoditEditor from 'jodit-react';


const RichTextEditor = ({input, setInput , editor}) => {

    const handleChange = (content) => {
        setInput({...input, description:content});
    }
   
  return <JoditEditor value={input.description} onChange={handleChange} ref={editor}/>;
}
export default RichTextEditor