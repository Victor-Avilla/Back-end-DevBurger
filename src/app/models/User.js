import Sequelize, { Model } from 'sequelize';

// Herda heranca de Model
class User extends Model {
  static init(sequelize) {
    Model.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        admin: Sequelize.BOOLEAN,
      },
      {
        sequelize,
        tableName: 'users',
      },
    );
  }
}
export default User;
