import { useState } from 'react';
import axios from 'axios';
import { AiOutlineDoubleRight } from 'react-icons/ai';
import { BsPerson, BsSendPlus } from 'react-icons/bs';

const AddCommentForm = ({ articleName, onArticleUpdated }) => {
    const [name, setName] = useState('');
    const [commentText, setCommentText] = useState('');

    const addComment = async () => {
        const response = await axios.post(`/api/articles/${articleName}/comment`, {
            postedBy: name,
            text: commentText,
        });
        const updatedArticle = response.data;
        onArticleUpdated(updatedArticle);
        setName('');
        setCommentText('');
    }

    return (
        <div className="flex-col w-96 mx-20">

            {/* ADD NAME */}
            <div className="flex mb-1">
                <label className="mr-6 ml-2 mt-1">
                    <BsPerson />
                </label>

                <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    type="text" 
                    placeholder="Name..."           
                    className="w-96 border-b outline-none placeholder:text-black"
                />
            </div>
     
            {/* ADD COMMENT */}
            <div className="flex mb-3">
                <label className="mr-6 ml-2 mt-1">
                    <AiOutlineDoubleRight />
                </label>

                <textarea
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    placeholder="Comment..."
                    className="w-96 border-b outline-none placeholder:text-black"
                />
            </div>

            {/* SUMBIT COMMIT BUTTON */}
            <div className="grid justify-items-end mb-10">
                <button className="flex bg-gray-200 hover:bg-gray-400 hover:text-white p-1 px-2"
                    type="submit"
                    onClick={addComment}>
                    <BsSendPlus className="mt-1 mr-1" />
                    Send
                </button>
            </div>

        </div>
    )
}

export default AddCommentForm;