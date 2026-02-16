import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SkipToContent from './components/SkipToContent';
import CommandPalette from './components/CommandPalette';
import CustomCursor from './components/CustomCursor';
import PageTransition from './animation/PageTransition';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Clients = lazy(() => import('./pages/Clients'));
const Hospitality = lazy(() => import('./pages/Hospitality'));
const Retail = lazy(() => import('./pages/Retail'));
const Dispatching = lazy(() => import('./pages/Dispatching'));
const OfficeSupport = lazy(() => import('./pages/OfficeSupport'));
const DedicatedResources = lazy(() => import('./pages/DedicatedResources'));
const Contact = lazy(() => import('./pages/Contact'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const NotFound = lazy(() => import('./pages/NotFound'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <SkipToContent />
      <Header />
      <CommandPalette />
      <main id="main-content">
        <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
          <PageTransition>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/solutions/hospitality" element={<Hospitality />} />
              <Route path="/solutions/retail" element={<Retail />} />
              <Route path="/solutions/nationwide-dispatching" element={<Dispatching />} />
              <Route path="/solutions/office-support" element={<OfficeSupport />} />
              <Route path="/solutions/dedicated-resources" element={<DedicatedResources />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PageTransition>
        </Suspense>
      </main>
      <Footer />
      <CustomCursor />
    </>
  );
}
