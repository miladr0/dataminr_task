import TaskListDto from "../dtos/TaskListDto";
import {
  TaskListModel,
  TaskListCreation,
  TaskListUpdate,
  TaskListDelete,
} from "../models/TaskListModel";

export default class TaskListConverter {
  static toDto(val: TaskListModel): TaskListDto {
    return {
      id: val.id,
      title: val.title,
      tasks: val?.tasks ?? [],
      createdAt: val.createdAt,
      updatedAt: val.updatedAt,
    };
  }

  static toDtoList(val: TaskListModel[]): TaskListDto[] {
    return val.map((element) => {
      return {
        id: element.id,
        title: element.title,
        tasks: element?.tasks ?? [],
        createdAt: element.createdAt,
        updatedAt: element.updatedAt,
      };
    });
  }

  static toModel(val: TaskListDto): TaskListCreation {
    return {
      title: val.title,
    };
  }

  static toModelUpdate(val: TaskListDto): TaskListUpdate {
    return {
      id: val.id,
      title: val.title,
      updatedAt: new Date(),
    };
  }

  static toModelDelete(val: TaskListDto): TaskListDelete {
    return {
      id: val.id,
    };
  }
}
