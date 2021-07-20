import {computed, reactive, ref, Ref} from 'vue'
import moment from 'moment'
import {TaskToList, TasksResponsive} from '@/models/task.model'
import useTaskController from '@/middleware/controllers/useTaskController'

export default function useTaskSearch() {
  const taskController = useTaskController()

  const result: Ref<TasksResponsive> = ref({
    tasks: [],
    count: 0
  })
  const page: Ref<number> = ref(1)
  const pageCount: Ref<number> = ref(1)
  const payload = reactive<TaskToList>({
      platforms: 'INSTAGRAM',
      skip: 0,
      limit: 6,
  })
  const storeData = () => {
    const data = {
      page: page.value,
      page_count: pageCount.value,
      tasks: result.value.tasks
    }
    localStorage.setItem('currentData', JSON.stringify(data));
  }
  const loadData = () => {
    const current_data = localStorage.getItem('currentData')
    if (current_data) {
      const data = JSON.parse(current_data)
      result.value.tasks = data.tasks
      pageCount.value = data.page_count
      page.value = data.page

      console.log(page.value)
    }
  }
  const formatTime = (val: string) => {
    const duration = moment.duration(moment().diff(val))
    const years = duration.years() > 0 ? duration.years() + ' years ' : ''
    const months = duration.months() > 0 ? duration.months() + ' months ' : ''
    const days = duration.days() > 0 ? duration.days() + ' days ' : ''
    const hours = duration.hours() > 0 ? duration.hours() + ' hours ' : ''
    const minuets = duration.minutes() > 0 ? duration.minutes() + ' minuets ' : ''
    return `added ${years + months + days + hours + minuets}ago.`
  }
  const search = () => {
    payload.skip = 0
    payload.limit = 6
    taskController.search(payload)
      .then((response) => {
        result.value = response.data
        pageCount.value = Math.ceil(response.data.count / 3)
        page.value = 1
        storeData()
      }).catch((error) => console.log(error))
  }
  const nextPage = (newVal: number, oldVal: number) => {
    if (newVal >= oldVal){
      payload.skip = newVal - oldVal === 1 ? newVal * 3 : (newVal - 1) * 3
      payload.limit = newVal - oldVal === 1 ? 3 : 6

      taskController.search(payload)
        .then((response) => {
          result.value.tasks = [...result.value.tasks, ...response.data.tasks]
          storeData()
        }).catch((error) => console.log(error))
    }
  }

  const tasks = computed(() => result.value.tasks.filter((task, index) => {
    return index >= 3 * (page.value - 1) && index <3 * (page.value - 1) + 3
  } ))

  return {
    result,
    payload,
    page,
    pageCount,
    loadData,
    search,
    nextPage,
    tasks,
    formatTime
  }
}
