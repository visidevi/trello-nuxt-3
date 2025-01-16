import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import boardData from '~/data/board.json'
import { v4 as uuid } from 'uuid'
export const useBoardStore = defineStore('boardStore', () => {
    const board = useStorage('board', boardData)
    /** 
     * Tasks
     */
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
    const addTask = ({
        columnIndex, name
    }) => {
        board.value.columns[columnIndex].tasks.push({
            name,
            id: uuid(),
            description: '',
        })
    }
    const deleteTask = (taskId) => {
        const columns = board.value.columns
        for (const column of columns) {
            const taskIndex = column.tasks.findIndex(task => task.id === taskId)
            if (taskIndex !== -1) {
                column.tasks.splice(taskIndex, 1)
                return
            }
        }

    }
    function moveTask({
        fromColumnIndex, toColumnIndex, taskIndex
    }) {
        const task = board.value.columns[fromColumnIndex].tasks.splice(taskIndex, 1)[0]
        board.value.columns[toColumnIndex].tasks.push(task)

    }
    const updateTask = (task) => {
        const columns = board.value.columns
        for (const column of columns) {
            const taskIndex = column.tasks.findIndex(task => task.id === task.id)
            if (taskIndex !== -1) {
                column.tasks[taskIndex] = task
                return
            }
        }
    }
    /**
     * Columns
     */
    function addColumn(columnName) {
        board.value.columns.push({
            name: columnName,
            id: uuid(),
            tasks: []
        })
    }

    function deleteColumn(columnIndex) {
        board.value.columns.splice(columnIndex, 1)
    }
    function moveColumn({
        fromColumnIndex, toColumnIndex
    }) {
        const column = board.value.columns.splice(fromColumnIndex, 1)[0]
        board.value.columns.splice(toColumnIndex, 0, column)
    }

    return {
        addColumn,
        addTask,
        board,
        deleteColumn,
        getTask,
        deleteTask,
        updateTask,
        moveTask,
        moveColumn
    }
})