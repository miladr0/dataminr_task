import TaskDto from "../dtos/TaskDto";
import TasksListsDto from "../dtos/TasksListsDto";
import TaskListsDto from "../dtos/TasksListsDto";
import {
  TaskCreation,
  TaskUpdate,
  TaskDelete,
  TaskModel,
} from "../models/TaskModel";
import {
  TasksListsCreation,
  TasksListsDelete,
} from "../models/TasksListsModel";

export default class TaskConverter {
  static toDto(val: TaskModel): TaskDto {
    return {
      id: val.id,
      title: val.title,
      description: val.description,
      lists: val?.lists ?? [],
      createdAt: val.createdAt,
      updatedAt: val.updatedAt,
    };
  }

  static toDtoList(val: TaskModel[]): TaskDto[] {
    return val.map((element) => {
      return {
        id: element.id,
        title: element.title,
        description: element.description,
        lists: element?.lists ?? [],
        createdAt: element.createdAt,
        updatedAt: element.updatedAt,
      };
    });
  }

  static toModel(val: TaskDto): TaskCreation {
    return {
      title: val.title,
      description: val.description,
    };
  }

  static toModelUpdate(val: TaskDto): TaskUpdate {
    return {
      id: val.id,
      title: val.title,
      description: val.description,
      updatedAt: new Date(),
    };
  }

  static toModelDelete(val: TaskDto): TaskDelete {
    return {
      id: val.id,
    };
  }

  static toTasksListsModel(val: TaskListsDto): TasksListsCreation {
    return {
      taskId: val.taskId,
      listId: val.listId,
    };
  }

  static toTaskListDelete(val: TasksListsDto): TasksListsDelete {
    return {
      taskId: val.taskId,
      listId: val.listId,
    };
  }
}
