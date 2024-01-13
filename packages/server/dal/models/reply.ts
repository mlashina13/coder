/* eslint-disable no-use-before-define */
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import type { Reply } from '../../bll';
import { CommentModel } from './comment';

/**
 * Модель данных ответа на коммент
 */
@Table({
  tableName: 'replies',
  timestamps: true,
})
export class ReplyModel extends Model<Reply> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  override id!: number;

  @ForeignKey(() => CommentModel)
  @Column({
    type: DataType.INTEGER,
    field: 'comment_id',
  })
  commentId!: number;

  @BelongsTo(() => CommentModel, { onDelete: 'CASCADE' })
  comment!: CommentModel;

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
