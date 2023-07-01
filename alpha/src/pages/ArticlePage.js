import { useParams } from 'react-router-dom';
import articles from './article-content';

const ArticlePage = () => {
    const { articleId } = useParams();

    const article = articles.find(
        article => article.name === articleId
    )

    return (
        <div className="space-y-4 mt-5">

            {/* ARTICLE HEADER */}
            <h1 className="grid place-content-center text-3xl px-10 text-center mb-10">
                {article.title}
            </h1>

                {/* ARTICLE BODY */}
                {article.content.map(
                    (paragraph, i) => (
                     <p key={i} className="px-10 indent-8">
                        {paragraph}
                    </p>
                    )
                )}

        </div>
    )
}

export default ArticlePage;