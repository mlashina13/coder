import { 
  BelongsTo, 
  Column, 
  DataType, 
  ForeignKey, 
  Index, 
  Model, 
  Table 
} from 'sequelize-typescript';
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
  })
  @Index
  topicId!: number;

  @BelongsTo(() => TopicModel, { onDelete: 'CASCADE' })
  topic!: TopicModel;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  authorId!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  text!: string;
}
