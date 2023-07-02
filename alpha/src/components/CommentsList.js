import { BsPersonCircle } from 'react-icons/bs';

const CommentsList = ({ comments }) => (
    <div className="mx-20">

        <h1 className="mt-10 mb-5 font-bold text-xl">
            Comments:
        </h1>

        {comments.map(comment => (
            <div className="my-5 flex-col" 
                key={comment.postedBy + ': ' + comment.text}>

                <div className="flex">
                    <BsPersonCircle className="mr-1" />
                    <h2 className="mr-5 text-xs font-semibold">
                        {comment.postedBy}
                    </h2>

                </div>

                <p className="ml-7 py-2 border-b">
                    {comment.text}
                </p>
            
            </div>
        ))}
    </div>
)

export default CommentsList;