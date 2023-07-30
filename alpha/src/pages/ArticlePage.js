import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import articles from './article-content';
import axios from 'axios';
import NotFoundPage from '../pages/NotFoundPage';
import CommentsList from '../components/CommentsList';
import { BiLike } from 'react-icons/bi';
import AddCommentForm from '../components/AddCommentForm';
import { BsSendPlus } from 'react-icons/bs';

const ArticlePage = () => {
    const { articleId } = useParams();
    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: []})

    useEffect(() => {
        const loadArticleInfo = async () => {
            const response = await axios.get(`/api/articles/${articleId}`);
            const newArticleInfo = response.data;
            setArticleInfo(newArticleInfo);
        }

        loadArticleInfo();
    }, []);

    const article = articles.find(
        article => article.name === articleId
    )

    const addUpvote = async () => {
        const response = await axios.put(`/api/articles/${articleId}/upvote`);
        const updatedArticle = response.data;
        setArticleInfo(updatedArticle);
    }

    if (!article) {
        return <NotFoundPage />
    }

    return (
        <div className="space-y-4 mt-5">

            {/* ARTICLE HEADER */}
            <h1 className="grid place-content-center text-3xl px-10 text-center mb-5">
                {article.title}
            </h1>

             {/* UPVOTE SECTION */}
            <div className="flex place-content-end px-10 text-center mb-10 mr-10">

                {/* UPVOTE BUTTON */}
                <button onClick={addUpvote}>
                    <BiLike className="mr-1 hover:text-sky-400" />
                </button>

                <p className="text-xs">
                    ({articleInfo.upvotes})
                </p>
            </div>

            {/* ARTICLE BODY */}
            {article.content.map(
                (paragraph, i) => (
                    <p key={i} className="px-20 indent-8">
                        {paragraph}
                    </p>
                )
            )}

            {/* COMMENTS SECTION */}
            <div className="flex-col">

                {/* COMMENTS HEADER SECTION */}
                <div className="flex w-9 ">
                    <div>
                        <h1 className="mt-10 mb-5 mx-20 font-bold text-xl">
                            Comments
                        </h1>
                    </div>
                </div>

                {/* ADD COMMENT FORM */}
                    <AddCommentForm
                        articleName={articleId}
                        onArticleUpdated={updatedArticle => setArticleInfo(updatedArticle)} 
                    />

                {/* LIST COMMENTS SECTION */}
                <div className="flex-col">
                    <CommentsList comments={articleInfo.comments} />  
                </div>

            </div>  

        </div>
    )
}

export default ArticlePage;