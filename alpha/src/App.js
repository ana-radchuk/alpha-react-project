import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ArticleListPage from './pages/ArticleListPage';
import ArticlePage from './pages/ArticlePage';
import ItemsPage from './pages/ItemsPage';
import NavBar from './components/NavBar';

function App() {
 
  return (
    <BrowserRouter>
      <div className="grid place-content-center space-y-4">

        {/* NAVBAR SECTION */}
        <NavBar />

        {/* BODY SECTION */}
        <div className="grid place-content-center">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/articles" element={<ArticleListPage />} />
              <Route path="/articles/:articleId" element={<ArticlePage />} />
              <Route path="/notes" element={<ItemsPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
        </div>
      
      </div> 
    </BrowserRouter>
  );
}

export default App;