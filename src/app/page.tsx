import Textarea from '@/components/Textarea';
import Logout from '@/components/Logout';
import { Card, CardContent } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <Logout />
      <Card className="flex flex-col items-center justify-center p-6 bg-gray-900 border-slate-700">
        <CardContent className="px-0">
          <div className="mb-4 text-start text-2xl font-semibold text-white">
            <h1>Crear post</h1>
          </div>
          <Textarea />
        </CardContent>
      </Card>
    </div>
  );
}
