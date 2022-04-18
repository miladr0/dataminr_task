import TaskDto from "./TaskDto";

export default interface TaskListDto {
  id: number;
  title: string;
  tasks?: Array<TaskDto>;
  createdAt: Date;
  updatedAt: Date;
}
