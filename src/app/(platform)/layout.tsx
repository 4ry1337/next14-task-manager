import { Toaster } from '@/components/ui/toaster';
import AuthContext from '@/context/AuthContext';
import ToasterContext from '@/context/ToasterContext';

const PlatformLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <AuthContext>
      {children}
      <Toaster />
    </AuthContext>
  );
};

export default PlatformLayout;
