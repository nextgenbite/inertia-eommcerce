<template>
    <button type="button" @click="show = true" class="relative">
        <slot />
        <teleport v-if="show" to="#dropdown">
            <div>
                <!-- Overlay -->
                <div
                    class="fixed inset-0 z-[99998] bg-black/20"
                    @click="show = false"
                />
                <!-- Dropdown -->
                <div
                    ref="dropdown"
                    class="absolute z-[99999]"
                    @click.stop="show = !autoClose"
                >
                    <slot name="dropdown" />
                </div>
            </div>
        </teleport>
    </button>
</template>

<script setup>
import { ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { createPopper } from '@popperjs/core'

const props = defineProps({
    placement: {
        type: String,
        default: 'bottom-end',
    },
    autoClose: {
        type: Boolean,
        default: true,
    },
})

const show = ref(false)
const dropdown = ref(null)
let popper = null

watch(show, async (val) => {
    if (val) {
        await nextTick()
        popper = createPopper(
            // The button element
            dropdown.value?.parentElement?.parentElement || dropdown.value,
            dropdown.value,
            {
                placement: props.placement,
                modifiers: [
                    {
                        name: 'preventOverflow',
                        options: { altBoundary: true },
                    },
                ],
            }
        )
    } else if (popper) {
        setTimeout(() => {
            popper.destroy()
            popper = null
        }, 100)
    }
})

function handleKeydown(e) {
    if (e.key === 'Escape') show.value = false
}

onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
    document.removeEventListener('keydown', handleKeydown)
})
</script>
