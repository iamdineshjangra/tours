module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "Din@app@22",
    DB: "toursdb",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };