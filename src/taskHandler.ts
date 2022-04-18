import { Handler, Context } from "aws-lambda";
import { TaskController } from "./controllers/TaskController";
const ServerlessClient = require("serverless-postgres");

const client = new ServerlessClient({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
  debug: true,
  delayMs: 3000,
});

const taskController = new TaskController();

export const createTask: Handler = async (event: any, context: Context) => {
  try {
    await client.connect();
    const result = await taskController.createTask(client, event);

    await client.clean();
    return {
      body: JSON.stringify({ message: result }),
      statusCode: 200,
    };
  } catch (error) {
    // send to sentry|datadog
    console.log(error);
    await client.clean();
  }
};

export const updateTask: Handler = async (event: any, context: Context) => {
  try {
    await client.connect();
    const result = await taskController.updateTask(client, event);

    await client.clean();
    return {
      body: JSON.stringify({ result }),
      statusCode: 200,
    };
  } catch (error) {
    // send to sentry|datadog
    console.log(error);
    await client.clean();
  }
};

export const listTasks: Handler = async (event: any, context: Context) => {
  try {
    await client.connect();
    const result = await taskController.listTasks(client);

    await client.clean();
    return {
      body: JSON.stringify({ result }),
      statusCode: 200,
    };
  } catch (error) {
    // send to sentry|datadog
    console.log(error);
    await client.clean();
  }
};

export const deleteTask: Handler = async (event: any, context: Context) => {
  try {
    await client.connect();
    const result = await taskController.deleteTask(client, event);

    await client.clean();
    return {
      body: JSON.stringify({ result }),
      statusCode: 200,
    };
  } catch (error) {
    // send to sentry|datadog
    console.log(error);
    await client.clean();
  }
};

export const addTaskToList: Handler = async (event: any, context: Context) => {
  try {
    await client.connect();
    await taskController.addTaskToList(client, event);

    await client.clean();
    return {
      body: JSON.stringify({ message: "Task added to list successfully" }),
      statusCode: 200,
    };
  } catch (error) {
    // send to sentry|datadog
    console.log(error);
    await client.clean();
  }
};

export const removeTaskFromList: Handler = async (
  event: any,
  context: Context
) => {
  try {
    await client.connect();
    const result = await taskController.removeTaskFromList(client, event);

    await client.clean();
    return {
      body: JSON.stringify({ result }),
      statusCode: 200,
    };
  } catch (error) {
    // send to sentry|datadog
    console.log(error);
    await client.clean();
  }
};
