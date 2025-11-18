'use client';

import { useState } from 'react';
import { useTaskContext } from '@/lib/task-context';
import { v4 as uuidv4 } from 'uuid';
import type { Task } from '@/types/task';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const collaborators = ['Lucía Gómez', 'Tomás Herrera', 'Micaela Sosa', 'Juan Pérez'];

export default function TaskForm() {
  const { addTask } = useTaskContext();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [assignee, setAssignee] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !deadline || !assignee) return;

    const newTask: Task = {
      id: uuidv4(),
      title,
      description,
      deadline,
      assignee,
    };

    addTask(newTask);
    setTitle('');
    setDescription('');
    setDeadline('');
    setAssignee('');
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">📝 Asignar tarea</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="deadline">Fecha límite</Label>
            <Input
              id="deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="assignee">Colaborador</Label>
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
            Asignar tarea
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
