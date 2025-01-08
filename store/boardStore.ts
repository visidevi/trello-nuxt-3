import { defineStore } from "pinia";
import data from "@/data/board.json";


export const useBoardStore = defineStore('boardStore', () => {
    const boards = ref(data);

    return {
        boards
    }




});