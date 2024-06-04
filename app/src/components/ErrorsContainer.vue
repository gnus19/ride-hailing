<script lang="ts">
export default {
  name: 'ErrorsContainer',
  props: {
    errors: {
      type: Array<{ type: string; message?: string }>,
      required: true
    }
  },
  data() {
    return {
      IS_EMPTY: 'IS_EMPTY',
      INVALID_EMAIL: 'INVALID_EMAIL',
      MIN_LENGTH: 'MIN_LENGTH',
      INVALID_CAR_STATUS: 'INVALID_CAR_STATUS',
      MISSING_TOKEN: 'MISSING_TOKEN',
      INVALID_TOKEN: 'INVALID_TOKEN'
    }
  },
  methods: {
    closeErrors() {
      this.$emit('close')
    }
  }
}
</script>

<template>
  <div class="errors bg-red-500/20 text-red-500 text-right p-2">
    <button type="button" class="px-2 font-bold hover:bg-red-500/20" @click.prevent="closeErrors">
      x
    </button>
    <ul class="list-disc text-left ml-4">
      <li v-for="error in errors" :key="error.type">
        <template v-if="error.type === IS_EMPTY">
          {{ `The field ${error.message} cannot be empty` }}
        </template>
        <template v-else-if="error.type === INVALID_EMAIL"> The email is invalid </template>
        <template v-else-if="error.type === MIN_LENGTH">
          {{ `The minumun length of the field is ${error.message} ` }}
        </template>
        <template v-else-if="error.type === INVALID_CAR_STATUS">
          {{ `The car status ${error.message} is invalid` }}
        </template>
        <template v-else-if="error.type === MISSING_TOKEN"> Login to continue </template>
        <template v-else-if="error.type === INVALID_TOKEN">
          Your session expired, please login to continue
        </template>
        <template v-else>
          {{ error.message }}
        </template>
      </li>
    </ul>
  </div>
</template>
