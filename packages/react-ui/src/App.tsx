import { Route, Routes } from 'react-router-dom';
import { MainNavigation } from './components/main-navigation/MainNavigation';
import { SkipToContent } from './components/SkipToContent';
import Home from './views/Home';
import iconSprite from '@private/design-system/icons.svg?raw';
import '@private/design-system/index.css';

function App() {
  return (
    <main>
      <SkipToContent />
      <MainNavigation />
      <div id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      <div className="hidden" dangerouslySetInnerHTML={{ __html: iconSprite }} />
    </main>
  );
}

export default App;
