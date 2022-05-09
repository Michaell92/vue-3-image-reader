<script setup>
import { copyToClipboard } from '../helpers.js'
import { ref } from 'vue';
const props = defineProps({
    data: String
})

const showConfirmation = ref(false)

function copyText() {
    copyToClipboard(props.data)

    showConfirmation.value = true

    setTimeout(() => {
        showConfirmation.value = false
    }, 1000)
}
</script>

<template>
    <div class="results">
        <span v-show="showConfirmation" class="confirmation">Copied to clipboard!</span>
        <h2>Results:</h2>
        <div>
            <button @click="copyText">copy</button>
            <span>{{ props.data }}</span>
        </div>

    </div>
</template>