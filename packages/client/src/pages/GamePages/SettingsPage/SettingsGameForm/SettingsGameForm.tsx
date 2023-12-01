import './SettingsGameForm.scss';
import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { Button, Input } from '../../../../components';
import { StartIcon } from '../../../../assets/icons/StartIcon';
import { DialogLayout } from '../../../../components/common/DialogLayout/DialogLayout';
import { Title } from '../../../../components/common/Title/Title';
import { SettingGame } from '../SettingsProvider';
import { SettingsGameProviderState } from '../SettingsGameProviderTypes';

/**
 * Форма настроек игры*
 * */
const MESSAGE = 'Поле обязательно для заполнения';

const validationSchema = yup.object().shape({
  colorsCount: yup.string().required(MESSAGE),
  stepsCount: yup.string().required(MESSAGE),
});

export const SettingsGameForm = () => {
  /** Параметры переданные из контекста c данными  для настройки игры */
  const { settings, startGame } = SettingGame();

  const formik = useFormik({
    initialValues: settings,
    validationSchema,
    onSubmit: (values: SettingsGameProviderState) => {
      /** Передаем параметры настроект при старте игры * */
      startGame(values);
    },
  });
  return (
    <DialogLayout contentClassName='settings-game-content'>
      <Title className='settings-game-content__title' component='h2' align='center'>
        Настройки
      </Title>
      <StartIcon className='settings-game-content__icon' />
      <form onSubmit={formik.handleSubmit} className='settings-game__form'>
        <FormControl className='settings-game-form__radio-group'>
          <FormLabel>Выберите уровень сложности: </FormLabel>
          <RadioGroup defaultValue='1' name='isColorsMayBeRepeated'>
            <FormControlLabel
              disabled={settings.visible}
              onChange={formik.handleChange}
              value='0'
              control={<Radio size='small' />}
              label='фишки с уникальными цветами'
            />
            <FormControlLabel
              disabled={settings.visible}
              onChange={formik.handleChange}
              value='1'
              control={<Radio size='small' />}
              label='фишки с повторяющимися цветами'
            />
          </RadioGroup>
        </FormControl>
        <Input
          variant='filled'
          disabled={settings.visible}
          className='requiredField'
          label='Количестов цветов'
          size='small'
          name='colorsCount'
          helperText={formik.touched.colorsCount && formik.errors.colorsCount}
          onChange={formik.handleChange}
          value={formik.values.colorsCount}
        />
        <Input
          variant='filled'
          label='Размер поля'
          disabled={settings.visible}
          size='small'
          name='stepsCount'
          className='requiredField'
          helperText={formik.touched.stepsCount && formik.errors.stepsCount}
          onChange={formik.handleChange}
          value={formik.values.stepsCount}
        />
        <Input
          variant='filled'
          disabled={settings.visible}
          label='Время выполнения (мин)'
          size='small'
          name='time'
          onChange={formik.handleChange}
          value={formik.values.time}
        />
        <Button label='Старт' type='submit' disabled={settings.visible} />
      </form>
    </DialogLayout>
  );
};
