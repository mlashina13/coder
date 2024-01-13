import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { CommentModel, ReplyModel, TopicModel, EmojiModel, ReactionModel } from './models';

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } = process.env;

/**
 * Настройки подключения
 */
const sequelizeOptions: SequelizeOptions = {
  host: 'localhost',
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres',
};

// Создаем инстанс Sequelize
const sequelize = new Sequelize(sequelizeOptions);
sequelize.addModels([CommentModel, ReplyModel, TopicModel, EmojiModel, ReactionModel]);

/**
 * Инстанс Sequelize
 */
export default sequelize;

/**
 * Подключение к БД
 */
export async function dbConnect() {
  try {
    await sequelize.authenticate(); // Проверка аутентификации в БД
    await sequelize.sync(); // Синхронизация базы данных
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
