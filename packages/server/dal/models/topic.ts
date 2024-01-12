/* eslint-disable no-use-before-define */
import { Column, DataType, Model, Table } from 'sequelize-typescript';
import type { Topic } from '../../bll';

/**
 * Модель данных топика
 */
@Table({
  tableName: 'topics',
  timestamps: true,
})
export class TopicModel extends Model<Topic> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  override id!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'author_id',
  })
  authorId!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  messagesCount!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  viewsCount!: number;
}
