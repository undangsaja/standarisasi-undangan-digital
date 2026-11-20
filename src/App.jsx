import React, { useCallback, useState } from 'react';
import OrnamentDefs from './components/ornaments/OrnamentDefs';
import { PageAtmosphere } from './components/layout/SiteChrome';
import HomePage from './pages/HomePage';
import TemplatesPage from './pages/TemplatesPage';
import CreatePage from './pages/CreatePage';
import InvitationPage from './pages/InvitationPage';
import RedElegantInvitation from './pages/RedElegantInvitation';
import { DEFAULT_DRAFT, TEMPLATES, loadDraft, saveDraft, isRedElegants } from './data/templates';

function resolveRoute() {
  if (typeof window === 'undefined') return 'home';
  const h = (window.location.hash || '#home').replace('#', '').trim();
  if (['home', 'templates', 'create', 'invitation'].includes(h)) return h;
  return 'home';
}

export default function App() {
  const [route, setRoute] = useState(() => resolveRoute());
  const [selectedTemplate, setSelectedTemplate] = useState(
    () => TEMPLATES.find((t) => t.status === 'active')?.id || TEMPLATES[0].id
  );
  const [draft, setDraft] = useState(() => {
    const loaded = loadDraft();
    return loaded || { ...DEFAULT_DRAFT };
  });

  const navigate = useCallback((next) => {
    setRoute(next);
    if (typeof window !== 'undefined') {
      window.location.hash = next;
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, []);

  const handleDraftChange = useCallback((next) => {
    setDraft(next);
    saveDraft(next);
  }, []);

  React.useEffect(() => {
    const onHash = () => setRoute(resolveRoute());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // Keep body background clean for marketing + invitation
  React.useEffect(() => {
    document.body.style.backgroundColor = '';
    document.body.classList.remove('locked');
  }, [route]);

  let page;
  switch (route) {
    case 'templates':
      page = (
        <TemplatesPage
          onNavigate={navigate}
          selectedTemplate={selectedTemplate}
          onSelectTemplate={setSelectedTemplate}
        />
      );
      break;
    case 'create':
      page = (
        <CreatePage
          onNavigate={navigate}
          draft={draft}
          onDraftChange={handleDraftChange}
          selectedTemplate={selectedTemplate}
        />
      );
      break;
    case 'invitation':
      page = isRedElegants(selectedTemplate) ? (
        <RedElegantInvitation onNavigate={navigate} draft={draft} />
      ) : (
        <InvitationPage onNavigate={navigate} draft={draft} />
      );
      break;
    case 'home':
    default:
      page = <HomePage onNavigate={navigate} />;
  }

  return (
    <div className="relative min-h-dvh">
      <OrnamentDefs />
      <PageAtmosphere />
      {page}
    </div>
  );
}
