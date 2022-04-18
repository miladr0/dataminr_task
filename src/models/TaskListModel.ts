import { TaskModel } from "./TaskModel";

export type TaskListModel = {
  id: number;
  title: string;
  tasks: TaskModel[];
  createdAt: Date;
  updatedAt: Date;
};

export type TaskListCreation = Pick<TaskListModel, "title">;

export type TaskListUpdate = Pick<TaskListModel, "id" | "title" | "updatedAt">;

export type TaskListDelete = Pick<TaskListModel, "id">;
