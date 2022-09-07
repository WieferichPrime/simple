import {registerUser} from '/Controllers/UserController.js';
import sequelize from '/connection.js';

sequelize.sync();

export default registerUser;