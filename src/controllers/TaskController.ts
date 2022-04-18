import { Controller, Delete, Get, Post, Put, Route, Tags } from "tsoa";
import TaskDto from "../dtos/TaskDto";
import TaskService from "../services/TaskService";
import TaskConverter from "../converters/TaskConverter";

@Tags("Task")
@Route("task")
export class TaskController extends Controller {
  @Post("/")
  public async createTask(client, event: any) {
    const taskData = JSON.parse(event.body);

    const result = await TaskService.createTask(
      client,
      TaskConverter.toModel(taskData)
    );

    if (result?.rowCount === 1) {
      return "Task inserted successfully";
    }

    return "Task failed to insert";
  }

  @Get("/")
  public async listTasks(client): Promise<TaskDto[]> {
    const result = await TaskService.listTasks(client);
    return result?.rows?.map((task) => TaskConverter.toDto(task));
  }

  @Put("/")
  public async updateTask(client, event: any) {
    const taskData = JSON.parse(event.body);

    const result = await TaskService.updateTask(
      client,
      TaskConverter.toModelUpdate(taskData)
    );

    return TaskConverter.toDto(result?.rows[0]);
  }

  @Delete("/")
  public async deleteTask(client, event: any): Promise<string> {
    const taskData = JSON.parse(event.body);

    const result = await TaskService.deleteTask(client, taskData);
    if (result.rowCount === 0) {
      return "Task not found";
    }

    return "Task deleted";
  }

  @Post("/add-task-to-list")
  public async addTaskToList(client, event: any): Promise<string> {
    const taskData = JSON.parse(event.body);

    return await TaskService.addTaskToList(
      client,
      TaskConverter.toTasksListsModel(taskData)
    );
  }

  @Put("/remove-task-from-list")
  public async removeTaskFromList(client, event: any): Promise<string> {
    const taskData = JSON.parse(event.body);

    const result = await TaskService.removeTaskFromList(
      client,
      TaskConverter.toTasksListsModel(taskData)
    );
    if (result.rowCount === 0) {
      return "Task not removed from the list";
    }

    return "Task removed from the list";
  }
}
