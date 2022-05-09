<script setup>
import ImageText from './ImageText.vue'
import { createWorker } from 'tesseract.js'
import { ref } from 'vue';

// Image info
const imgInfo = ref('No file selected')
let imageURL = ref(null)
let imageData = ref(null)

// Get worker
const worker = createWorker()
let isReady = false

// Get user image
function getImage(e) {
    const imgData = e.target.files[0]

    imgInfo.value = imgData.name
    imageURL.value = URL.createObjectURL(imgData);
}

// Extract data from image
async function extract() {
    if (isReady && imageURL.value) {
        const { data: { text } } = await worker.recognize(imageURL.value)

        imageData.value = text;
    }
}

// Prepare worker
async function prepareWorker() {
    await worker.load()
    await worker.loadLanguage('eng')
    await worker.initialize('eng')
    isReady = true
}

prepareWorker()
</script>

<template>
    <h2 class='title'>Extract data from Images</h2>
    <div>
        <input type="file" id="file" @change="getImage" hidden>
        <label for="file" class="input-label">Choose File</label>
        <span class="img-info">{{ imgInfo }}</span>
    </div>
    <button class="button-primary process" @click="extract">Get Data</button>
    <image-text is="ImageText" :data=imageData></image-text>
    <img :src='imageURL' alt="">
</template>


