import HubHero from '@/components/hub/HubHero';
import PathwayCards from '@/components/hub/PathwayCards';

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hub Hero */}
      <HubHero />

      {/* Pathway Cards */}
      <PathwayCards />
    </div>
  );
}
