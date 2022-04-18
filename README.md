## serverless API Task management

We need to develop a feature for users to create tasks and task lists. Tasks can then be
added to different task lists.

1. Design a db schema for the relevant entities.
2. Develop a Rest API with CRUD endpoints for tasks and task lists as well as endpoints to
   add/remove a task to/from a task list.

<br/>
<br/>

### Requirements:

- Use Postgres or MySQL.
- For simplicity, a file with DDL scripts is enough to create the db schema.
- Tasks and task lists must have at least “title” and “updatedAt” columns.
- The same task can be added to multiple task lists.
- Implement the app with TypeScript.
- Write tests for at least 2 endpoints using Jest or Mocha.
- Add instructions to run the application.
- Docker config to start up DB.
- Preferably do not use any ORM framework.
- API implemented as Lambda functions using Serverless framework.

### Project setup

<hr/>


- Run `yarn` and install all the necessary dependencies.

- open `package.json` and update `migrate:up` command with USERNAME, PASSWORD and DB_NAME values with your local postgres credentials.

```
"migrate:up": "DATABASE_URL=postgres://[UsErNaMe]:[PaSsWoRd]@localhost:5432/[Db_NaMe] node-pg-migrate up"
```

- Run `yarn migrate:up` to create the db schema.

- rename `example.env` to `.env` and update the values with your local postgres credentials.

- Run `yarn dev` to start the offline server.

<br/>
<br/>

### Task API

<hr/>

create a task:

```
POST http://localhost:8080/tasks
{
  "title": "task title",
  "description": "task description"
}
```

get all tasks:

```
GET http://localhost:8080/tasks
```

update a task:

```
PUT http://localhost:8080/tasks
{
  "id": "taskId",
  "title": "task title",
  "description": "task description"
}
```

delete a task:

```
DELETE http://localhost:8080/tasks
{
  "id": "taskId"
}
```

add a task to a list:

```
POST http://localhost:8080/tasks/add-task-to-list
{
  "taskId": "taskId",
  "listId": "taskListId"
}
```

remove a task from a list:

```
POST http://localhost:8080/tasks/remove-task-from-list
{
  "taskId": "taskId",
  "listId": "taskListId"
}
```

### Task List API

<hr/>

create a list:

```
POST http://localhost:8080/lists
{
  "title": "list title",
}
```

get all lists:

```
GET http://localhost:8080/lists
```

update a list:

```
PUT http://localhost:8080/lists
{
  "id": "listId",
  "title": "task title",
}
```

delete a task:

```
DELETE http://localhost:8080/tasks
{
  "id": "listId"
}
```