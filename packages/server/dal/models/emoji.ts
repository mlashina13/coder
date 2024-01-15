/* eslint-disable no-use-before-define */
import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import type { Emoji } from '../../bll';

/**
 * Модель данных эмодзи
 */
@Table({
  tableName: 'emoji',
  timestamps: false,
})
export class EmojiModel extends Model<Emoji> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  override id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  code!: string;
}
