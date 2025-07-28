import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Menu from '@/components/Menu';
import LoginSection from '@/components/LoginSection';
import About from '@/components/About';
import Contact from '@/components/Contact';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Menu />
        <LoginSection />
        <About />
        <Contact />
      </main>
    </div>
  );
};

export default Index;
