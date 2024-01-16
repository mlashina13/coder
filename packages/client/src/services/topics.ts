/* eslint-disable no-param-reassign */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosRequestConfig } from 'axios';
import { Comment, Topic, UserData } from '../types/common';
import { Auth, Forum, User, YandexAuth } from '../api';
import { errorToString } from '../utils';
import { AsyncThunkOptions } from '../types/reduxToolkit';
import { setError } from '../store/slices/errorSlice';

/**
 * Пространство имен
 */
const NAMESPACE = 'topics';

/**
 * Запрос на топики
 */
export const getAllTopics = createAsyncThunk<
  Topic[] | undefined,
  AxiosRequestConfig | undefined,
  AsyncThunkOptions
>(`${NAMESPACE}/getAllTopics`, async (opts, { dispatch, rejectWithValue }) => {
  try {
    const topics = await Forum.getAllTopics(opts);
    return topics;
  } catch (error) {
    dispatch(setError(errorToString(error as Error)));
    return rejectWithValue(errorToString(error as Error));
  }
});

/**
 * Запрос топика по id
 */
export const getTopicById = createAsyncThunk<
  { topic: Topic; topicMessagesCount: number; comments: Comment[] },
  number,
  AsyncThunkOptions
>(`${NAMESPACE}/getTopicById`, async (id, { dispatch, rejectWithValue }) => {
  try {
    const topic = await Forum.getTopicById(id);
    const topicMessagesCount = await Forum.getTopicMessagesCount(topic.id);
    const comments = await Forum.getTopicComments(parseInt(topic.id, 10));
    return { topic, topicMessagesCount, comments };
  } catch (error) {
    dispatch(setError(errorToString(error as Error)));
    return rejectWithValue(errorToString(error as Error));
  }
});

export const addComment = createAsyncThunk<
  Comment[],
  { text: string; topicId: number },
  AsyncThunkOptions
>(`${NAMESPACE}/addComment`, async (data, { dispatch, rejectWithValue }) => {
  try {
    await Forum.addComment(data);
    const comments = await Forum.getTopicComments(data.topicId);
    return comments;
  } catch (error) {
    dispatch(setError(errorToString(error as Error)));
    return rejectWithValue(errorToString(error as Error));
  }
});

export const updateComment = createAsyncThunk<
  Comment[],
  { text: string; id: number; topicId: number },
  AsyncThunkOptions
>(`${NAMESPACE}/updateComment`, async ({ topicId, ...data }, { dispatch, rejectWithValue }) => {
  try {
    await Forum.updateComment(data);
    const comments = await Forum.getTopicComments(topicId);
    return comments;
  } catch (error) {
    dispatch(setError(errorToString(error as Error)));
    return rejectWithValue(errorToString(error as Error));
  }
});

export const deleteComment = createAsyncThunk<
  Comment[],
  { id: number; topicId: number },
  AsyncThunkOptions
>(`${NAMESPACE}/deleteComment`, async (data, { dispatch, rejectWithValue }) => {
  try {
    await Forum.deleteComment(data.id);
    const comments = await Forum.getTopicComments(data.topicId);
    return comments;
  } catch (error) {
    dispatch(setError(errorToString(error as Error)));
    return rejectWithValue(errorToString(error as Error));
  }
});

export const createTopic = createAsyncThunk<Topic[], { title: string }, AsyncThunkOptions>(
  `${NAMESPACE}/createTopic`,
  async (data, { dispatch, rejectWithValue }) => {
    try {
      await Forum.createTopic(data);
      const topics = await Forum.getAllTopics();
      return topics;
    } catch (error) {
      dispatch(setError(errorToString(error as Error)));
      return rejectWithValue(errorToString(error as Error));
    }
  }
);

export const updateTopic = createAsyncThunk<
  Topic[],
  { title: string; id: number },
  AsyncThunkOptions
>(`${NAMESPACE}/updateTopic`, async (data, { dispatch, rejectWithValue }) => {
  try {
    await Forum.updateTopic(data);
    const topics = await Forum.getAllTopics();
    return topics;
  } catch (error) {
    dispatch(setError(errorToString(error as Error)));
    return rejectWithValue(errorToString(error as Error));
  }
});

export const deleteTopic = createAsyncThunk<Topic[], number, AsyncThunkOptions>(
  `${NAMESPACE}/deleteTopic`,
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await Forum.deleteTopic(id);
      const topics = await Forum.getAllTopics();
      return topics;
    } catch (error) {
      dispatch(setError(errorToString(error as Error)));
      return rejectWithValue(errorToString(error as Error));
    }
  }
);
