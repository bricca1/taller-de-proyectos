'use client';

import { useState } from 'react';
import { useTaskContext } from '@/lib/task-context';
import type { Task } from '@/types/task';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Pencil } from 'lucide-react';

const collaborators = ['Lucía Gómez', 'Tomás Herrera', 'Micaela Sosa', 'Juan Pérez'];

interface EditTaskDialogProps {
  task: Task;
}

export function EditTaskDialog({ task }: EditTaskDialogProps) {
  const { updateTask } = useTaskContext();
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [deadline, setDeadline] = useState(task.deadline);
  const [assignee, setAssignee] = useState(task.assignee);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateTask(task.id, {
      title,
      description,
      deadline,
      assignee,
    });

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar tarea</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-title">Título</Label>
            <Input
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-description">Descripción</Label>
            <Textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-deadline">Fecha límite</Label>
            <Input
              id="edit-deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-assignee">Colaborador</Label>
            <Select value={assignee} onValueChange={setAssignee} required>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar colaborador" />
              </SelectTrigger>
              <SelectContent>
                {collaborators.map((name) => (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full">
            Guardar cambios
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
