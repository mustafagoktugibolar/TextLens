<template>
  <div :style="popupStyle" v-if="visible" id="textlens-root">
    <div v-if="mode === 'translate'" class="translate-box">
      <div class="translate-selection-panel">
        <select v-model="targetLang" class="lang-select">
          <option disabled value="">Select language</option>
          <option value="en">English</option>
          <option value="tr">Turkish</option>
          <option value="de">German</option>
          <option value="fr">French</option>
        </select>
        <button @click="copyTranslatedText">Copy</button>
      </div>

      <div class="translate-content">
        <textarea v-model="selectedText" class="input-text" />
        <div class="arrow"></div>
        <textarea readonly class="translated-text" :value="popupText" />
      </div>
    </div>

    <div v-else-if="mode === 'ai'" class="ai-box">
      <div class="ai-message">Searching AI for:<br /><strong>{{ selectedText }}</strong></div>
    </div>

    <div v-if="mode === ''" class="button-row">
      <button @click="translate">Translate</button>
      <button @click="aiSearch">AI Search</button>
    </div>
  </div>

  <transition name="fade">
    <div v-if="copied" class="copied-popup">✔ Copied!</div>
  </transition>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'

const visible = ref(false)
const selectedText = ref('')
let translatedText = ref('')
const popupText = ref('')
const targetLang = ref('tr')
const mode = ref('')
const copied = ref(false)

const popupStyle = reactive({
  position: 'absolute',
  top: '0px',
  left: '0px',
  zIndex: 9999
})

onMounted(() => {
  document.addEventListener('mouseup', () => {
    const selection = window.getSelection()
    const text = selection.toString().trim()
    if (text && selection.rangeCount > 0 && mode.value === '') {
      const range = selection.getRangeAt(0).getBoundingClientRect()
      popupStyle.top = `${range.top + window.scrollY - 50}px`
      popupStyle.left = `${range.left + window.scrollX}px`
      selectedText.value = text
      visible.value = true
    }
  })

  document.addEventListener('mousedown', (e) => {
    const popupEl = document.getElementById('textlens-root')
    if (popupEl && !popupEl.contains(e.target)) {
      visible.value = false
      mode.value = ''
    }
  })
})

function translate() {
  translatedText = `Translated: ${selectedText.value}`
  popupText.value = translatedText
  mode.value = 'translate'
}

function aiSearch() {
  mode.value = 'ai'
}

function copyTranslatedText() {
  navigator.clipboard.writeText(popupText.value)
      .then(() => {
        copied.value = true
        setTimeout(() => copied.value = false, 1500)
      })
      .catch(err => {
        console.error('Failed to copy text: ', err)
      })
}
</script>

<style scoped>
#textlens-root {
  background: white;
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 8px;
  width: 200px;
  resize: both;
  overflow: auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  font-family: sans-serif;
}

.button-row {
  display: flex;
  justify-content: space-between;
  gap: 8px;
}

button {
  flex: 1;
  background-color: #e3e3e3;
  border: none;
  padding: 6px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
}
button:hover {
  background-color: #d0d0d0;
}

.translate-box {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.translate-selection-panel {
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
}

.lang-select {
  width: 100%;
  padding: 4px;
  font-size: 13px;
  border-radius: 4px;
}

.translate-content {
  display: flex;
  gap: 6px;
}

.input-text, .translated-text {
  width: 50%;
  height: 80px;
  font-size: 13px;
  padding: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}

.arrow {
  position: absolute;
  top: 85px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 18px;
}

.ai-box {
  padding: 6px;
  font-size: 13px;
}
.ai-message {
  background-color: #f6f6f6;
  padding: 10px;
  border-radius: 6px;
  font-family: monospace;
}

.copied-popup {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #4caf50;
  color: white;
  padding: 8px 14px;
  border-radius: 6px;
  font-size: 14px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  z-index: 99999;
}

/* Fade animation */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
