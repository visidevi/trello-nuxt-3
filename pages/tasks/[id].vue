<template>
    <div class="task-wrapper">
        <div class="task-view">
            <p>{{ task.name }}</p>
            <p>{{ task.description }}</p>
        </div>
    </div>
</template>

<script setup>
import { useBoardStore } from '~/stores/boardStore'
const route = useRoute()
const boardStore = useBoardStore()
const taskId = ref(route.params.id)
const task = boardStore.getTask(taskId.value)
</script>