import HeroSection from './sections/HeroSection';
import MarqueeSection from './sections/MarqueeSection';
import AboutSection from './sections/AboutSection';
import ServicesSection from './sections/ServicesSection';
import LessonsSection from './sections/LessonsSection';
import Footer from './sections/Footer';

export default function App() {
  return (
    <main className="dot-grid bg-canvas text-ink" style={{ overflowX: 'clip' }}>
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <LessonsSection />
      <Footer />
    </main>
  );
}
