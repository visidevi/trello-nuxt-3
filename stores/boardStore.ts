import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import boardData from '~/data/board.json'

export const useBoardStore = defineStore('boardStore', () => {
    const board = useStorage('board', boardData)

    function addColumn(columnName) {
        board.value.columns.push({
            name: columnName,
            id: Date.now().toString(),
            tasks: []
        })
    }

    function deleteColumn(columnIndex) {
        board.value.columns.splice(columnIndex, 1)
    }
    const getTask = computed(() => {
        return taskId => {
            const columns = board.value.columns
            for (const column of columns) {
                const task = column.tasks.find(task => task.id === taskId)
                if (task) {
                    return task
                }
            }
        }
    })

    return {
        board,
        addColumn,
        deleteColumn,
        getTask
    }
})