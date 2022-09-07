import RecordContoller from '/Controllers/RecordController.js';
import sequelize from '/connection.js';

sequelize.sync();

export default RecordContoller.getTimesByDate;