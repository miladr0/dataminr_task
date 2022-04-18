import { TaskCreation, TaskUpdate } from "../models/TaskModel";
import { updateQuery } from "../utils/queries";
import {
  TasksListsCreation,
  TasksListsDelete,
} from "../models/TasksListsModel";
import { TABLES } from "../config/constants";

export default class TaskService {
  public static async createTask(client, taskData: TaskCreation) {
    try {
      const query = {
        text: `INSERT INTO ${TABLES.TASK}(title, description) VALUES($1, $2)`,
        values: [taskData.title, taskData.description],
      };
      return await client.query(query);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  public static async updateTask(client, taskData: TaskUpdate) {
    try {
      const { id, ...data } = taskData;
      const conditions = { id };
      const query = updateQuery(TABLES.TASK, conditions, data);

      return await client.query(query);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  public static async listTasks(client) {
    try {
      return await client.query(
        `SELECT t.id,t.title,t.description, t."createdAt", t."updatedAt", jsonb_agg(
          jsonb_build_object(
              'id', l.id,
              'title', l.title 
          )
      ) lists FROM ${TABLES.TASK} t left join ${TABLES.TASKS_LISTS} tl on t.id = tl."taskId" left join ${TABLES.LIST} l on l.id = tl."listId" group by t.id`
      );
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  public static async deleteTask(client, taskData: TaskUpdate) {
    try {
      const { id } = taskData;

      return await client.query({
        text: `Delete FROM ${TABLES.TASK} where id = $1`,
        values: [id],
      });
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  public static async addTaskToList(client, taskData: TasksListsCreation) {
    try {
      const query = {
        text: `INSERT INTO ${TABLES.TASKS_LISTS}("taskId", "listId") VALUES($1, $2)`,
        values: [taskData.taskId, taskData.listId],
      };
      return await client.query(query);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  public static async removeTaskFromList(client, taskData: TasksListsDelete) {
    try {
      const query = {
        text: `DELETE FROM ${TABLES.TASKS_LISTS} where "taskId" = $1 AND "listId" = $2`,
        values: [taskData.taskId, taskData.listId],
      };
      return await client.query(query);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
