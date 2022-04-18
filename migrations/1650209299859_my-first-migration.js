/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("tasks", {
    id: "id",
    title: { type: "varchar(1000)", notNull: true },
    description: { type: "text" },
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
};

exports.down = (pgm) => {};
