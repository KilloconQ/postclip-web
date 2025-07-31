import Textarea from '@/components/Textarea';
import Logout from '@/components/Logout';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <Logout />
      <Textarea />
    </div>
  );
}
