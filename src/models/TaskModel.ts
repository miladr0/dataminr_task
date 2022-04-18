import { TaskListModel } from "./TaskListModel";

export type TaskModel = {
  id: number;
  title: string;
  description: string;
  lists?: TaskListModel[];
  createdAt: Date;
  updatedAt: Date;
};

export type TaskCreation = Pick<TaskModel, "title" | "description">;

export type TaskUpdate = Pick<
  TaskModel,
  "id" | "title" | "description" | "updatedAt"
>;

export type TaskDelete = Pick<TaskModel, "id">;


export type TaskListDelete = Pick<TaskModel, "id">;
