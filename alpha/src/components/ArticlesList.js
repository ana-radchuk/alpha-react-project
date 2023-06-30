import { Link } from 'react-router-dom';

const ArticlesList = ({ articles }) => {
    return (
        <>
        {
            articles.map(article => (
                <div key={article.name} className="px-10">
                    <Link to={`/articles/${article.name}`}>
        
                        {/* ARTICLE HEADER */}
                        <h2 className="font-bold mb-2 hover:underline hover:underline-offset-4">
                            {article.title}
                        </h2>
        
                        {/* ARTICLE PARAGRAPH */}
                        <p className="mb-10">
                            {article.content[0].substring(0,150)}...
                        </p>
        
                    </Link>
                </div>
            ))
        }        
        </>
    );
}

export default ArticlesList;