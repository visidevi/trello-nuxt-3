<template>
    <div class="task-wrapper">
        <div class="task-view">
            <section v-if="task">
                <UFormGroup label="Name" class="mb-4 w-full">
                    <UInput v-model="task.name" type="text" />
                </UFormGroup>
                <UFormGroup label="Description" class="w-full mb-4">
                    <UTextarea v-model="task.description" type="text" />
                </UFormGroup>
                <UButton icon="i-heroicons-trash" color="red" @click="deleteTask">Delete Task</UButton>
                <UButton color="green" @click="updateTask">Save</UButton>
            </section>
            <section v-else>
                <p>Task not found.</p>
            </section>
        </div>
    </div>
</template>

<script setup>
import { useBoardStore } from '~/stores/boardStore'
const route = useRoute()
const router = useRouter()
const boardStore = useBoardStore()
const taskId = computed(() => route.params.id)
const task = computed(() => boardStore.getTask(taskId.value) || undefined)
const updateTask = () => {
    console.log(task.value)
    // boardStore.updateTask(task.value)
    // router.push({ name: 'index' })
}
const deleteTask = () => {
    boardStore.deleteTask(taskId.value)
    router.push({ name: 'index' })
} 
</script>