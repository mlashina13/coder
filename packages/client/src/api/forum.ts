import { AxiosRequestConfig } from 'axios';
import { COMMENT, COMMENTS, MESSAGES_COUNT, TOPIC, TOPICS } from '../constants';
import { Comment, Topic } from '../types/common';
import { axiosInstance } from './axiosInstance';

/** получение топиков */
const getAllTopics = (opts?: AxiosRequestConfig) =>
  axiosInstance.get<{ data: Topic[] }>(TOPICS, opts).then((resp) => resp.data?.data);

/** получение топика по id */
const getTopicById = (id: number, opts?: AxiosRequestConfig) =>
  axiosInstance.get<{ data: Topic }>(`${TOPICS}${id}`, opts).then((resp) => resp.data.data);

/** добавление комментария */
const addComment = (data: { text: string; topicId: number }, opts?: AxiosRequestConfig) =>
  axiosInstance.post(COMMENT, data, opts).then((resp) => resp.data?.data);

/** обновление комментария */
const updateComment = (data: { text: string; id: number }, opts?: AxiosRequestConfig) =>
  axiosInstance.patch(COMMENT, data, opts).then((resp) => resp.data?.data);

/** удаление комментария */
const deleteComment = (id: number) =>
  axiosInstance.delete(COMMENT, { data: { id } }).then((resp) => resp.data);

/** создание топика */
const createTopic = (data: { title: string }, opts?: AxiosRequestConfig) =>
  axiosInstance.post(TOPIC, data, opts).then((resp) => resp.data);

/** обновление топика */
const updateTopic = (data: { title: string; id: number }, opts?: AxiosRequestConfig) =>
  axiosInstance.patch(TOPIC, data, opts).then((resp) => resp.data);

/** удаление топика */
const deleteTopic = (id: number) =>
  axiosInstance.delete(TOPIC, { data: { id } }).then((resp) => resp.data);

/** Получить кол-во сообщений в топике */
const getTopicMessagesCount = (id: string, opts?: AxiosRequestConfig) =>
  axiosInstance
    .get<{ data: number }>(`${MESSAGES_COUNT}${id}`, opts)
    .then((resp) => resp.data.data);

/** Получить список комментариев топика */
const getTopicComments = (id: number, opts?: AxiosRequestConfig) =>
  axiosInstance.get<{ data: Comment[] }>(`${COMMENTS}${id}`, opts).then((resp) => resp.data.data);

export const Forum = {
  getAllTopics,
  getTopicById,
  addComment,
  createTopic,
  updateTopic,
  deleteTopic,
  getTopicMessagesCount,
  getTopicComments,
  updateComment,
  deleteComment,
};
