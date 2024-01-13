/* eslint-disable no-use-before-define */
import { Column, DataType, ForeignKey, Index, Model, Table } from 'sequelize-typescript';
import type { Reaction } from '../../bll';
import { EmojiModel } from './emoji';
import { TopicModel } from './topic';

/**
 * Модель данных эмодзи
 */
@Table({
  tableName: 'reactions',
  timestamps: false,
})
export class ReactionModel extends Model<Reaction> {
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
  })
  @Index
  topicId!: number;

  @ForeignKey(() => EmojiModel)
  @Column({
    type: DataType.INTEGER,
  })
  emojiId!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId!: number;
}
