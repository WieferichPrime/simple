import {loginUser} from '/Controllers/UserController.js';
import sequelize from '/connection.js';

sequelize.sync();

export default loginUser;