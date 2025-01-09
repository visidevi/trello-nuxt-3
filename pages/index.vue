<script setup>
import { useBoardStore } from '~/stores/boardStore'

const boardStore = useBoardStore()
const newColumnName = ref('')
const addColumn = () => {
    boardStore.addColumn(newColumnName.value)
    newColumnName.value = ''
}

</script>

<template>
    <div class="board-wrapper">
        <main class="board">
            <BoardColumn v-for="(column, columnIndex) in boardStore.board.columns" :key="column.id" :column="column"
                :columnIndex="columnIndex">
            </BoardColumn>
            <UContainer class="column">
                <UInput v-model="newColumnName" type="text" placeholder="Create new column"
                    icon="i-heroicons-plus-circle-solid" @keyup.enter="addColumn" />
            </UContainer>
        </main>
        <div class="task-bg">
            task modal
            <NuxtPage />
        </div>
    </div>
</template>