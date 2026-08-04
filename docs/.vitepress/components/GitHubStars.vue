<template>
  <a
    class="gh-stars"
    href="https://github.com/evgskv/logica"
    target="_blank"
    rel="noopener noreferrer"
    :aria-label="`evgskv/logica on GitHub${count !== null ? ` — ${count.toLocaleString()} stars` : ''}`"
  >
    <svg class="gh-icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
      <path
        fill="currentColor"
        d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"
      />
    </svg>
    <span class="gh-divider"></span>
    <svg class="star-icon" viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
      <path
        fill="currentColor"
        d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"
      />
    </svg>
    <span v-if="count !== null" class="star-count">{{ formattedCount }}</span>
    <span v-else class="star-count skeleton">&nbsp;</span>
  </a>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const count = ref<number | null>(null)

const formattedCount = computed(() => {
  if (count.value === null) return ''
  if (count.value >= 1000) {
    return (count.value / 1000).toFixed(1).replace(/\.0$/, '') + 'k'
  }
  return String(count.value)
})

onMounted(async () => {
  try {
    const cached = sessionStorage.getItem('logica-gh-stars')
    if (cached) {
      count.value = Number(cached)
    }
    const res = await fetch('https://api.github.com/repos/evgskv/logica')
    if (!res.ok) return
    const data = await res.json()
    if (typeof data.stargazers_count === 'number') {
      count.value = data.stargazers_count
      sessionStorage.setItem('logica-gh-stars', String(data.stargazers_count))
    }
  } catch {
    // Silently ignore; the star count is a nice-to-have, not critical.
  }
})
</script>

<style scoped>
.gh-stars {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: 8px;
  padding: 3px 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  color: var(--vp-c-text-2);
  font-size: 12px;
  font-weight: 600;
  transition: border-color 0.25s, color 0.25s;
}

.gh-stars:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.gh-icon {
  flex-shrink: 0;
}

.gh-divider {
  width: 1px;
  height: 12px;
  background: var(--vp-c-divider);
  flex-shrink: 0;
}

.star-icon {
  flex-shrink: 0;
  color: #e3b341;
}

.star-count {
  min-width: 1.5em;
  text-align: left;
}

.star-count.skeleton {
  min-width: 1.5em;
  border-radius: 4px;
  background: var(--vp-c-divider);
  opacity: 0.5;
}
</style>
