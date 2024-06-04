<script lang="ts">
export default {
  name: 'SuccessMessageContainer',
  props: {
    message: {
      type: String,
      required: true
    }
  },
  methods: {
    closePopup() {
      this.$emit('close')
    }
  }
}
</script>

<template>
  <div class="errors bg-green-500/20 text-green-900 dark:text-green-500 text-right p-2 rounded-lg">
    <button type="button" class="px-2 font-bold hover:bg-green-500/20" @click.prevent="closePopup">
      x
    </button>
    <ul class="text-left ml-4">
      {{
        message
      }}
    </ul>
  </div>
</template>
