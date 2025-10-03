<template>
  <div class="contributors">
    <div v-if="isLoading" class="state">Loading contributors…</div>
    <div v-else-if="errorMessage" class="state error">{{ errorMessage }}</div>
    <div v-else class="grid">
      <a
        v-for="contributor in visibleContributors"
        :key="contributor.id"
        class="card"
        :href="contributor.html_url"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="`Open ${contributor.login} on GitHub`"
      >
        <img :src="contributor.avatar_url" :alt="contributor.login" class="avatar" />
        <div class="meta">
          <div class="login">{{ contributor.login }}</div>
          <div class="count" v-if="contributor.contributions != null">
            {{ contributor.contributions }} contributions
          </div>
        </div>
      </a>
    </div>
  </div>
  
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Contributor {
  id: number
  login: string
  html_url: string
  avatar_url: string
  contributions?: number
}

const props = defineProps<{
  owner?: string
  repo?: string
  perPage?: number
  topN?: number
}>()

const owner = computed(() => props.owner || 'evgskv')
const repo = computed(() => props.repo || 'logica')
const perPage = computed(() => props.perPage || 100)
const topN = computed(() => props.topN || 0)

const isLoading = ref(true)
const errorMessage = ref('')
const contributors = ref<Contributor[]>([])

const visibleContributors = computed(() => {
  if (!contributors.value) return []
  const list = [...contributors.value]
  // Keep original order (GitHub API returns by contributions desc)
  if (topN.value && topN.value > 0) {
    return list.slice(0, topN.value)
  }
  return list
})

async function fetchContributors() {
  try {
    isLoading.value = true
    errorMessage.value = ''

    const endpoint = `https://api.github.com/repos/${owner.value}/${repo.value}/contributors?per_page=${perPage.value}`
    const res = await fetch(endpoint, { headers: { 'Accept': 'application/vnd.github+json' } })
    if (!res.ok) {
      throw new Error(`GitHub API error ${res.status}`)
    }
    const data: Contributor[] = await res.json()
    contributors.value = Array.isArray(data) ? data : []
  } catch (err: any) {
    errorMessage.value = err?.message || 'Failed to load contributors.'
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchContributors)
</script>

<style scoped>
.contributors {
  display: block;
}
.state {
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
}
.state.error {
  color: var(--vp-c-danger-1);
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 12px;
  margin-top: 12px;
}
.card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  text-decoration: none;
  color: inherit;
  transition: border-color .15s ease, background .15s ease;
}
.card:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg);
}
.avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
}
.meta {
  display: flex;
  flex-direction: column;
}
.login {
  font-weight: 600;
}
.count {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}
</style>


