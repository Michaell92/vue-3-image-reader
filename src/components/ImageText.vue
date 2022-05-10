<script setup>
import { copyToClipboard, filterData } from '../helpers.js'
import { ref, watch } from 'vue';

const props = defineProps({
    data: String
})

const buttonId = ref('1');
const filteredData = ref(props.data)

watch(() => props.data, () => {
    filterResults(buttonId.value)
})

function filter(e) {
    const id = e.target.id
    buttonId.value = id

    if (props.data) {
        filterResults(id)
    }
}

function filterResults(id) {
    let regEx = ''
    switch (id) {
        case '1':
            filteredData.value = props.data
            break;
        case '2':
            regEx = /[0-9]+/g
            filteredData.value = filterData(props.data, regEx)
            break;
        case '3':
            regEx = /[A-Za-z]+/g
            filteredData.value = filterData(props.data, regEx)

    }
}

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
        <transition name="fade">
            <span v-if="showConfirmation" class="confirmation">Copied to clipboard!</span>
        </transition>
        <div class="filter" @click="filter">
            <button :class="['filter-button', { active: buttonId === '1' }]" id="1">All</button>
            <button :class="['filter-button', { active: buttonId === '2' }]" id="2">Letters</button>
            <button :class="['filter-button', { active: buttonId === '3' }]" id="3">Numbers</button>
        </div>

        <div class="results-container">
            <button @click="copyText">copy</button>
            <span>{{ filteredData }}</span>
        </div>

    </div>
</template>