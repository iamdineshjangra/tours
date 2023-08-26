const tables = ["tours"];
exports.createTables = (db) => {
  tables.forEach((table) => {
    db[table] = require(`${__dirname}/../models/${table}Model.js`)(
      db.sequelize,
      db.Sequelize,
      db.DataTypes
    );
  });
};
