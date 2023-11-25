// models/index.js
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'data.db',
});

const Courses = sequelize.define('Courses', {
  CourseCode: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  CourseName: {
    type: DataTypes.STRING,
  },
  LecturerName: {
    type: DataTypes.STRING,
  },
});

const TimetableSlots = sequelize.define('TimetableSlots', {
  SlotID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Day: {
    type: DataTypes.STRING,
  },
  TimeStart: {
    type: DataTypes.STRING,
  },
  TimeEnd: {
    type: DataTypes.STRING,
  },
  CourseCode: {
    type: DataTypes.STRING,
    references: {
      model: 'Courses',
      key: 'CourseCode',
    },
  },
  Location: {
    type: DataTypes.STRING,
  },
});

const Students = sequelize.define('Students', {
  StudentID: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  Name: {
    type: DataTypes.STRING,
  },
  Email: {
    type: DataTypes.STRING,
  },
  Hostel: {
    type: DataTypes.STRING,
  },
  PhoneNumber: {
    type: DataTypes.STRING,
  },
  TelegramID: {
    type: DataTypes.STRING,
  },
});

// Define associations
Courses.hasMany(TimetableSlots, { foreignKey: 'CourseCode' });
TimetableSlots.belongsTo(Courses, { foreignKey: 'CourseCode' });

// ...

// Connection logic
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    console.log('Models synchronized with the database.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = { sequelize, Courses, TimetableSlots, Students };

