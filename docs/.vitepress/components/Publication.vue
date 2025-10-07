<template>
  <div class="publication-item" ref="pubItem">
    <div class="pub-header">
      <span class="pub-venue">[<slot name="venue"></slot>]</span>
      <span class="pub-title"><slot name="title"></slot></span>
    </div>
    <div class="pub-authors">
      <slot name="authors"></slot>
    </div>
    <div class="pub-actions">
      <div class="btn-row">
        <span class="btn-publisher"><slot name="publisher"></slot></span>
        <span v-if="hasLinks" class="btn-links"><slot name="link"></slot></span>
        <button @click="showBibtex = !showBibtex" class="btn-bibtex">BibTeX</button>
      </div>
      <div v-if="showBibtex" class="bibtex-content">
        <slot name="bibtex"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, useSlots, computed, onMounted } from 'vue'

const slots = useSlots()
const showBibtex = ref(false)
const pubItem = ref<HTMLElement | null>(null)

// Check if link slot has content
const hasLinks = computed(() => {
  if (!slots.link) return false
  const content = slots.link()
  return content.some(node => {
    if (typeof node.children === 'string') {
      return node.children.trim().length > 0
    }
    if (Array.isArray(node.children)) {
      return node.children.length > 0
    }
    return node.children !== null && node.children !== undefined
  })
})

// Set target="_blank" on all links after component mounts
onMounted(() => {
  if (pubItem.value) {
    const links = pubItem.value.querySelectorAll('.btn-publisher a, .btn-links a')
    links.forEach(link => {
      link.setAttribute('target', '_blank')
      link.setAttribute('rel', 'noopener noreferrer')
    })
  }
})
</script>

<style scoped>
.publication-item {
  margin-bottom: 40px;
}

.pub-header {
  line-height: 1.6;
}

.pub-venue {
  font-weight: 400;
  color: #333;
}

.pub-title {
  font-weight: 700;
  color: #333;
  margin-left: 12px;
  font-size: 1.1em;
}

.pub-authors {
  color: #666;
  margin-top: 4px;
  line-height: 1.5;
}

.pub-actions {
  margin-top: 8px;
}

.btn-row {
  display: flex;
  gap: 8px;
  align-items: center;
}

.btn-publisher :deep(a),
.btn-links :deep(a),
.btn-bibtex {
  padding: 4px 12px;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 4px;
  font-size: 0.9em;
  color: var(--vp-c-brand-1);
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  background: transparent;
  display: inline-block;
}

.btn-links {
  display: inline-flex;
  gap: 8px;
  align-items: center;
}

.btn-publisher :deep(a):hover,
.btn-links :deep(a):hover,
.btn-bibtex:hover {
  background: var(--vp-c-brand-1);
  color: white;
}

.bibtex-content {
  margin-top: 8px;
  padding: 12px;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  max-width: 800px;
}

.bibtex-content :deep(pre) {
  margin: 0;
  padding: 0;
  background: transparent;
  font-size: 0.85em;
  line-height: 1.5;
}

.bibtex-content :deep(code) {
  font-family: 'Monaco', 'Menlo', monospace;
  background: transparent;
  padding: 0;
}
</style>
