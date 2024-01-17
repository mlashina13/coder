/* eslint-disable no-param-reassign */
import { createSlice, AnyAction, PayloadAction } from '@reduxjs/toolkit';
import {
  addComment,
  createTopic,
  deleteComment,
  deleteTopic,
  getAllTopics,
  getTopicById,
  updateComment,
  updateTopic,
} from '../../services';
import { Comment, Topic } from '../../types/common';

/**
 * Action для состояния загрузки
 */
const isLoading = (action: AnyAction) => action.type.endsWith('pending');

/**
 * Action для состояния ошибки
 */
const isError = (action: AnyAction) => action.type.endsWith('rejected');

/**
 * Имя среза
 */
const NAME = 'topics';

/**
 * Внутренний срез топиков
 */
interface TopicsState {
  topics?: Topic[];
  topic?: Topic;
  loading: boolean;
  topicError?: string;
  topicMessagesCount?: number;
  comments?: Comment[];
}

/**
 * Начальные значения стейта
 */
const initialState: TopicsState = {
  topics: [],
  topic: undefined,
  loading: false,
  topicError: undefined,
  topicMessagesCount: undefined,
  comments: undefined,
};

/**
 * Срез топиков
 */
const topicsSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTopics.pending, (state) => {
        state.loading = true;
        state.topicError = undefined;
      })
      .addCase(getAllTopics.fulfilled, (state, action) => {
        state.loading = false;
        state.topics = action.payload;
      })
      .addCase(getAllTopics.rejected, (state, action) => {
        state.loading = false;
        state.topicError = action.payload as string;
      })
      .addCase(getTopicById.fulfilled, (state, action) => {
        const { topic, topicMessagesCount, comments } = action.payload;
        state.loading = false;
        state.topic = topic;
        state.topicMessagesCount = topicMessagesCount;
        state.comments = comments;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(createTopic.fulfilled, (state, action) => {
        state.loading = false;
        state.topics = action.payload;
      })
      .addCase(updateTopic.fulfilled, (state, action) => {
        state.loading = false;
        state.topics = action.payload;
      })
      .addCase(deleteTopic.fulfilled, (state, action) => {
        state.loading = false;
        state.topics = action.payload;
      })
      .addMatcher(isLoading, (state) => {
        state.loading = true;
        state.topicError = undefined;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.topicError = action.payload;
      });
  },
});

/**
 * Редьюсер для топиков
 */
export const topicsReducer = topicsSlice.reducer;
