<template>
  <main>
    <div>

      <h1>Tasks Search view</h1>
      <div class="mt-60 d-flex">
        <form @submit.prevent="search">
          <input name="keywords" placeholder="Search" class="p-5" v-model="payload.keywords">
          <button>Search</button>
          <br>
          <select name="platforms" class="p-5" v-model="payload.platforms">
            <option value="INSTAGRAM">INSTAGRAM</option>
            <option value="FACEBOOK">FACEBOOK</option>
            <option value="YOUTUBE">YOUTUBE</option>
            <option value="TWITCH">TWITCH</option>
          </select>
          <input name="budgetGreaterEqual" placeholder="Budget Greater Equal" type="number" class="p-5" v-model="payload.budgetGreaterEqual">
          <input name="budgetLowerEqual" placeholder="Budget Lower Equal" type="number" class="p-5" v-model="payload.budgetLowerEqual">
          </form>
      </div>
      <table class="mt-40">
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Budget</th>
          <th>Proposal Count</th>
          <th>Platforms</th>
          <th>Created At</th>
        </tr>
        <tr v-for="(row, index) in tasks" :key="index" >
            <td>{{row.title}}</td>
            <td>{{row.description}}</td>
            <td>{{row.budget.value+' '+row.budget.currency}}</td>
            <td>{{row.proposalCount}}</td>
            <td>
              <p v-for="(platform, i) in row.platforms" :key="i">
                {{platform}}
              </p>
            </td>
            <td>{{formatTime(row.addedTime)}}</td>
        </tr>
      </table>
      <v-pagination
          v-model="page"
          :pages="pageCount"
          :rangeSize="1"
          active-color="#DCEDFF"
          :hideFirstButton = true
          :hideLastButton = true
      />
    </div>

  </main>
</template>

<script lang="ts">
import {defineComponent, onMounted, watch} from 'vue'
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import useTaskSearch from '@/components/taskSearch/taskSearch'

export default defineComponent({
  name: 'TasksSearch',
  components: {
    VPagination
  },
  setup() {
    const { payload, search, result, nextPage, page, pageCount, tasks, loadData, formatTime } = useTaskSearch()
    onMounted(() => {
      loadData()
    })
    watch(
        () => page.value,
        (newVal, oldVal) => {
          nextPage(newVal, oldVal)
        }
    )
    return {
      payload,
      search,
      result,
      nextPage,
      page,
      pageCount,
      tasks,
      formatTime
    }
  },
})
</script>
