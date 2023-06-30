import articles from './article-content';
import ArticlesList from '../components/ArticlesList';

const ArticleListPage = () => {
    return (
        <div className="space-y-4 mt-5">
            <h1 className="grid place-content-center text-3xl px-10 text-center mb-7">
                Articles
            </h1>

            <ArticlesList articles={articles} />
        </div>
    )
}

export default ArticleListPage;