import { Body, Controller, Delete, Get, Post, Put, Route, Tags } from "tsoa";
import TaskListDto from "../dtos/TaskListDto";
import TaskListService from "../services/TaskListService";
import TaskListConverter from "../converters/TaskListConverter";

@Tags("List")
@Route("list")
export class TaskListController extends Controller {
  @Post("")
  public async createList(client, event: any) {
    const taskData = JSON.parse(event.body);

    const result = await TaskListService.createList(
      client,
      TaskListConverter.toModel(taskData)
    );
    if (result?.rowCount === 1) {
      return "List inserted successfully";
    }

    return "List failed to insert";
  }

  @Get("/")
  public async listLists(client): Promise<TaskListDto[]> {
    const result = await TaskListService.listLists(client);
    return result?.rows.map((task) => TaskListConverter.toDto(task));
  }

  @Put("/")
  public async updateList(client, event: any) {
    const taskData = JSON.parse(event.body);

    const result = await TaskListService.updateList(
      client,
      TaskListConverter.toModelUpdate(taskData)
    );

    return TaskListConverter.toDto(result?.rows[0]);
  }

  @Delete("/")
  public async deleteList(client, event: any): Promise<string> {
    const taskData = JSON.parse(event.body);

    const result = await TaskListService.deleteList(client, taskData);
    if (result.rowCount === 0) {
      return "List not found";
    }

    return "List deleted";
  }
}
