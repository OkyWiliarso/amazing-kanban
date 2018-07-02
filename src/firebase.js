import { initializeApp } from 'firebase'

const app = initializeApp({
  apiKey: "AIzaSyDDZXVz3nsVCmnTPzAm21MIubiT09Vt2sU",
  authDomain: "amazing-kanban-7c654.firebaseapp.com",
  databaseURL: "https://amazing-kanban-7c654.firebaseio.com",
  projectId: "amazing-kanban-7c654",
  storageBucket: "amazing-kanban-7c654.appspot.com",
  messagingSenderId: "775711718152"
})

export const db = app.database()
export const tasksRef = db.ref('tasks')