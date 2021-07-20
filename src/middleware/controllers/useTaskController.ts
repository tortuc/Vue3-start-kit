import api from '@/services/api'
import { TaskToList, TasksResponsive } from '@/models/task.model'

const search = async (payload: TaskToList) => {
  let keywords = ''
  payload.keywords?.split(" ").forEach((val) => {
    keywords += `&keywords=${val}`
  })
  const budgetGreaterEqual = payload.budgetGreaterEqual ? `&budgetGreaterEqual=${payload.budgetGreaterEqual}` : ''
  const budgetLowerEqual = payload.budgetLowerEqual ? `&budgetLowerEqual=${payload.budgetLowerEqual}` : ''
  const url = `platforms=${payload.platforms}${keywords + budgetGreaterEqual + budgetLowerEqual}&skip=${payload.skip}&limit=${payload.limit}`

  return await api.get<TasksResponsive>(`tasks?${url}`)
    .then((response) => {
      return response
    })
}

export default function useTaskController () {
  return {
    search
  }
}
