import { useOS } from '@/hooks/useOS';
import { WindowsLayout } from '@/components/windows/WindowsLayout';
import { PixelLayout } from '@/components/pixel/PixelLayout';

const Index = () => {
  const os = useOS();

  return (
    <div className="min-h-screen w-screen overflow-hidden">
      {os === 'windows' ? <WindowsLayout /> : <PixelLayout />}
    </div>
  );
};

export default Index;
