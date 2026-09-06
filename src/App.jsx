import { EditModeProvider } from './context/EditModeContext';
import MenuCard from './components/MenuCard';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import EditControls from './components/EditControls';

export default function App() {
  return (
    <EditModeProvider>
      <div className="min-h-screen bg-base text-textPrimary selection:bg-amberAccent selection:text-base relative overflow-x-hidden font-body">
        {/* Persistent Elevated Menu Card with Edit toggle */}
        <MenuCard />

        {/* Main Content Flow */}
        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Contact />
        </main>

        <Footer />

        {/* Floating Save Pill & Password Gate Modal */}
        <EditControls />
      </div>
    </EditModeProvider>
  );
}
