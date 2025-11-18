import Header from '@/components/header';
import TaskForm from '@/components/task-form';
import TaskList from '@/components/task-list';
import { TaskProvider } from '@/lib/task-context';

export default function Home() {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <TaskForm />
          <TaskList />
        </main>
      </div>
    </TaskProvider>
  );
}
