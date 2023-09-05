import {
  collection,
  addDoc,
  query,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./api";

const COLLECTION_LIST_NAME = "TodoList";
const COLLECTION_TASK_NAME = "task";
const COLLECTION_USERS_NAME = "users";

export const addTask = async (body) => {
  return await addDoc(collection(db, COLLECTION_LIST_NAME), body);
};

export const addUsersToList = async (listId, body) => {
  return await updateDoc(doc(db, COLLECTION_LIST_NAME, listId), body);
};

export const deleteTask = async (listId, taskId) => {
  return await deleteDoc(
    doc(db, COLLECTION_LIST_NAME, listId, COLLECTION_TASK_NAME, taskId)
  );
};

export const getAllTasks = () => {
  return query(collection(db, COLLECTION_LIST_NAME));
};

export const removeTask = async (taskId) => {
  return await deleteDoc(doc(db, COLLECTION_LIST_NAME, taskId));
};

export const editTask = async (taskId, body) => {
  return await updateDoc(doc(db, COLLECTION_LIST_NAME, taskId), body);
};

export const addUser = async (body) => {
  return await addDoc(collection(db, COLLECTION_USERS_NAME), body);
};

export const getAllUsers = () => {
  return query(collection(db, COLLECTION_USERS_NAME));
};
