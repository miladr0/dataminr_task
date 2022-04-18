import {
  TaskListDelete,
  TaskListCreation,
  TaskListUpdate,
} from "../models/TaskListModel";
import { updateQuery } from "../utils/queries";
import { TABLES } from "../config/constants";

export default class TaskListService {
  public static async createList(client, taskData: TaskListCreation) {
    try {
      const query = {
        text: `INSERT INTO ${TABLES.LIST}(title) VALUES($1)`,
        values: [taskData.title],
      };
      return await client.query(query);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  public static async updateList(client, taskData: TaskListUpdate) {
    try {
      const { id, ...data } = taskData;
      const conditions = { id };
      const query = updateQuery(TABLES.LIST, conditions, data);

      return await client.query(query);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  public static async listLists(client) {
    try {
      return await client.query(
        `SELECT l.id,l.title, l."createdAt", l."updatedAt", jsonb_agg(
          jsonb_build_object(
              'id', t.id,
              'title', t.title 
          )
      ) tasks FROM ${TABLES.LIST} l left join ${TABLES.TASKS_LISTS} tl on l.id = tl."listId" left join ${TABLES.TASK} t on t.id = tl."taskId" group by l.id`
      );
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  public static async deleteList(client, taskData: TaskListDelete) {
    try {
      const { id } = taskData;

      return await client.query({
        text: `Delete FROM ${TABLES.LIST} where id = $1`,
        values: [id],
      });
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
