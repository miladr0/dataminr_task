import { Handler, Context } from "aws-lambda";
import { TaskListController } from "./controllers/TaskListController";
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

const taskListController = new TaskListController();

export const createList: Handler = async (event: any) => {
  try {
    await client.connect();
    const result = await taskListController.createList(client, event);

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

export const updateList: Handler = async (event: any) => {
  try {
    await client.connect();
    const result = await taskListController.updateList(client, event);

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

export const listLists: Handler = async (event: any, context: Context) => {
  try {
    await client.connect();
    const result = await taskListController.listLists(client);

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

export const deleteList: Handler = async (event: any, context: Context) => {
  try {
    await client.connect();
    const result = await taskListController.deleteList(client, event);

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
