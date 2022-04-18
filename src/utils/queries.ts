const isObject = (x) => x !== null && typeof x === "object";
const isObjEmpty = (obj) => isObject(obj) && Object.keys(obj).length === 0;

export const updateQuery = (tableName, conditions = {}, data = {}) => {
  const dKeys = Object.keys(data);
  const dataTuples = dKeys.map((k, index) => `"${k}" = $${index + 1}`);
  const updates = dataTuples.join(", ");
  const len = Object.keys(data).length;

  let text = `UPDATE ${tableName} SET ${updates} `;

  if (!isObjEmpty(conditions)) {
    const keys = Object.keys(conditions);
    const condTuples = keys.map((k, index) => `${k} = $${index + 1 + len} `);
    const condPlaceholders = condTuples.join(" AND ");

    text += ` WHERE ${condPlaceholders} RETURNING *`;
  }

  const values = [];
  Object.keys(data).forEach((key) => {
    values.push(data[key]);
  });
  Object.keys(conditions).forEach((key) => {
    values.push(conditions[key]);
  });

  return { text, values };
};
