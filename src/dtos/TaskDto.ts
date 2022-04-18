import TaskListDto from "./TaskListDto";

export default interface TaskDto {
  id: number;
  title: string;
  description: string;
  lists?: TaskListDto[];
  createdAt: Date;
  updatedAt: Date;
}
