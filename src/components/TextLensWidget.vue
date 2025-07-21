<template>
  <div v-if="visible" :style="popupStyle">
    <button @click="translate">Translate</button>
    <button @click="aiSearch">AI Search</button>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'

const visible = ref(false)
const selectedText = ref('')
const popupStyle = reactive({ position: 'absolute', top: '0px', left: '0px', zIndex: 9999 })

onMounted(() => {
  document.addEventListener('mouseup', () => {
    const selection = window.getSelection()
    const text = selection.toString().trim()
    if (text && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0).getBoundingClientRect()
      popupStyle.top = `${range.top + window.scrollY - 40}px`
      popupStyle.left = `${range.left + window.scrollX}px`
      selectedText.value = text
      visible.value = true
    } else {
      visible.value = false
    }
  })

  // Kullanıcı sayfada boş bir yere tıklarsa gizle
  document.addEventListener('mousedown', (e) => {
    if (!e.target.closest('#textlens-root')) {
      visible.value = false
    }
  })
})

function translate() {
  alert(`Translate: ${selectedText.value}`)
}

function aiSearch() {
  alert(`AI Search: ${selectedText.value}`)
}
</script>

<style scoped>
div {
  background: white;
  border: 1px solid black;
  padding: 6px;
  border-radius: 6px;
  display: flex;
  gap: 8px;
}
button {
  background-color: #e3e3e3;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}
button:hover {
  background-color: #d0d0d0;
}
</style>
