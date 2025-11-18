'use client';

import { useTaskContext } from '@/lib/task-context';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { EditTaskDialog } from '@/components/edit-task-dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function TaskList() {
  const { tasks, deleteTask } = useTaskContext();

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-xl font-semibold mb-4">📌 Tareas asignadas</h2>

      {tasks.length === 0 ? (
        <p className="text-muted-foreground">No hay tareas asignadas aún.</p>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <Card key={task.id}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{task.title}</h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      {task.description}
                    </p>
                  </div>
                  <div className="text-sm text-primary ml-4">
                    👤 {task.assignee}
                  </div>
                </div>
                <Separator className="my-3" />
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">
                    📅 {task.deadline}
                  </p>
                  <div className="flex gap-2">
                    <EditTaskDialog task={task} />
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="destructive"
                          size="icon"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta acción no se puede deshacer. Esto eliminará permanentemente la tarea "{task.title}".
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => deleteTask(task.id)}>Eliminar</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
