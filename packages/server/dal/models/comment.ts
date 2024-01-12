/* eslint-disable no-use-before-define */
import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import type { Comment } from '../../bll';
import { TopicModel } from './topic';

/**
 * Модель данных комментария
 */
@Table({
  tableName: 'comments',
  timestamps: true,
})
export class CommentModel extends Model<Comment> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  override id!: number;

  @ForeignKey(() => TopicModel)
  @Column({
    type: DataType.INTEGER,
    field: 'topic_id',
  })
  topicId!: number;

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
  text!: string;
}
