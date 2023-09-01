const tables = ["Tour", "User"];
exports.createTables = (db) => {
  tables.forEach((table) => {
    db[table] = require(`${__dirname}/../models/${table.toLowerCase()}sModel.js`)(
      db.sequelize,
      db.Sequelize,
      db.DataTypes
    );
  });
};
