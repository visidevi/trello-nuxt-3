<script setup>
import { useBoardStore } from '../stores/boardStore'
const router = useRouter()
const props = defineProps({
  column: {
    type: Object,
    required: true
  },
  columnIndex: {
    type: Number,
    required: true
  }
})

const boardStore = useBoardStore()

const editNameState = ref(false)

function deleteColumn(columnIndex) {
  boardStore.deleteColumn(columnIndex)
}
function goToTask(taskId) {
  router.push(`/tasks/${taskId}`)
}
const newtaskName = ref('')
const addTask = () => {
  boardStore.addTask({ columnIndex: props.columnIndex, name: newtaskName.value })
  newtaskName.value = ''
}
function pickupTask(event, { fromColumnIndex, fromTaskIndex }) {
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.dropEffect = 'move'
  event.dataTransfer.setData('from-column-index', fromColumnIndex)
  event.dataTransfer.setData('from-task-index', fromTaskIndex)
  console.log('dragStart', event)
}
function dropTask(event, toColumnIndex) {
  const fromColumnIndex = event.dataTransfer.getData('from-column-index')
  const fromTaskIndex = event.dataTransfer.getData('from-task-index')
  boardStore.moveTask({ fromColumnIndex, taskIndex: fromTaskIndex, toColumnIndex })

}
</script>

<template>
  <UContainer class="column" @drop.stop="dropTask($event, columnIndex)" @dragover.prevent @dragenter.prevent>
    <div class="column-header mb-4">
      <div>
        <UInput v-if="editNameState" type="text" v-model="column.name" />
        <h2 v-else>{{ column.name }}</h2>
      </div>
      <div>
        <UButton icon="i-heroicons-pencil-square" class="mr-2" @click="editNameState = !editNameState" />
        <UButton icon="i-heroicons-trash" color="red" @click="deleteColumn(columnIndex)" />
      </div>
    </div>
    <ul>
      <li v-for="(task, taskIndex) in column.tasks" :key="task.id">
        <UCard class="mb-4" @click="goToTask(task.id)" draggable="true" @dragstart="pickupTask($event, {
          fromColumnIndex: props.columnIndex,
          fromTaskIndex: taskIndex,
        })">
          <strong>{{ task.name }}</strong>
          <p>{{ task.description }}</p>
        </UCard>
      </li>
    </ul>
    <UInput v-model="newtaskName" type="text" placeholder="Create new task" icon="i-heroicons-plus-circle-solid"
      @keyup.enter="addTask" />
  </UContainer>
</template>