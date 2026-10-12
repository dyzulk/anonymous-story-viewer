import { Header } from './components/Header';
import { Body } from './components/Body';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="w-[350px] min-h-[420px] max-w-full flex flex-col bg-background text-foreground">
      <Header />
      <Body />
      <Footer />
    </div>
  );
}
