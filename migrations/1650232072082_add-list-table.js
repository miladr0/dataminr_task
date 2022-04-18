/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("lists", {
    id: "id",
    title: { type: "varchar(1000)", notNull: true },
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    updatedAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  pgm.createTable("tasks_lists", {
    taskId: {
      type: "integer",
      notNull: true,
      references: '"tasks"',
      onDelete: "cascade",
    },
    listId: {
      type: "integer",
      notNull: true,
      references: '"lists"',
      onDelete: "cascade",
    },
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
  pgm.createIndex("tasks_lists", ["taskId", "listId"], { unique: true });
};

exports.down = (pgm) => {};
