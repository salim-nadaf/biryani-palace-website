import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Menu from '@/components/Menu';
import LoginSection from '@/components/LoginSection';
import About from '@/components/About';
import Contact from '@/components/Contact';
import WelcomeSection from '@/components/WelcomeSection';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <WelcomeSection />
        <Menu />
        <LoginSection />
        <About />
        <Contact />
      </main>
    </div>
  );
};

export default Index;
