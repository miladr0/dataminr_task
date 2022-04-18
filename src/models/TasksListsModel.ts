export type TasksListsModel = {
  taskId: number;
  listId: number;
  createdAt: Date;
};

export type TasksListsCreation = Pick<TasksListsModel, "taskId" | "listId">;

export type TasksListsDelete = Pick<TasksListsModel, "taskId" | "listId">;
