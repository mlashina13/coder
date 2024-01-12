import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { CommentModel, ReplyModel, TopicModel } from './models';

// TODO: Вернуть переменные окружения
// const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } = process.env;

const sequelizeOptions: SequelizeOptions = {
  host: 'localhost',
  port: 5432, // Number(POSTGRES_PORT),
  username: 'postgres', // POSTGRES_USER,
  password: '1qaz!QAZ', // POSTGRES_PASSWORD,
  database: 'coder', // POSTGRES_DB,
  dialect: 'postgres',
};

// Создаем инстанс Sequelize
const sequelize = new Sequelize(sequelizeOptions);
sequelize.addModels([CommentModel, ReplyModel, TopicModel]);
export default sequelize;

export async function dbConnect() {
  try {
    await sequelize.authenticate(); // Проверка аутентификации в БД
    await sequelize.sync(); // Синхронизация базы данных
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
