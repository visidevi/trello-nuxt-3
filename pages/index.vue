<script setup lang="ts">
import { useBoardStore } from '~/store/boardStore';

const boardStore = useBoardStore();
</script>

<template>
    <div>
       <pre> {{ boardStore.boards }}</pre>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero porro repellendus recusandae ullam quia laudantium beatae, delectus quis aut et a omnis enim, voluptas sunt, ea possimus facilis temporibus praesentium.
    </div>
</template>