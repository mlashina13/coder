/* eslint-disable no-use-before-define */
import { Column, DataType, Model, Table } from 'sequelize-typescript';
import type { Theme } from '../../bll';

/**
 * Модель данных темы
 */
@Table({
  tableName: 'theme',
  timestamps: true,
})
export class ThemeModel extends Model<Theme> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  override id!: number;

  @Column({
    type: DataType.INTEGER,
    unique: true,
    allowNull: false,
  })
  userId!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 'light',
  })
  theme!: string;
}
