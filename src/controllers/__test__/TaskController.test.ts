import { TaskController } from "../TaskController";
import TaskService from "../../services/TaskService";

afterEach(() => {
  jest.resetAllMocks();
});

const client = jest.fn();

describe("TaskController", () => {
  describe("createTask", () => {
    test("create a new task", async () => {
      const data = { body: '{"title":"ok","description":"okk"}' };

      const spy = jest
        .spyOn(TaskService, "createTask")
        .mockResolvedValueOnce({ rowCount: 1 });

      const controller = new TaskController();
      const tasks = await controller.createTask(client, data);

      expect(tasks).toEqual("Task inserted successfully");
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe("listTasks", () => {
    test("should return an array of tasks", async () => {
      const data = {
        rows: [
          {
            id: 3,
            title: "list2",
            description: "do it",
            createdAt: "2022-04-18T17:40:34.507Z",
            updatedAt: "2022-04-18T17:40:34.507Z",
            lists: [],
          },
        ],
      };
      const spy = jest
        .spyOn(TaskService, "listTasks")
        .mockResolvedValueOnce(data);

      const controller = new TaskController();
      const tasks = await controller.listTasks(client);

      expect(tasks).toEqual(data.rows);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test("should return an array of empty", async () => {
      const spy = jest
        .spyOn(TaskService, "listTasks")
        .mockResolvedValueOnce({ rows: [] });

      const controller = new TaskController();
      const tasks = await controller.listTasks(client);

      expect(tasks).toEqual([]);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
