<script lang="ts">
import type { Car, CarStatus } from '@/interfaces/Car'
import ErrorsContainer from './ErrorsContainer.vue'

export default {
  name: 'VehicleCard',
  props: {
    brand: {
      type: String,
      required: true
    },
    model: {
      type: String,
      required: true
    },
    plate: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    editable: {
      type: Boolean,
      required: false
    },
    isNew: {
      type: Boolean,
      required: false
    }
  },
  components: {
    ErrorsContainer
  },
  data(): {
    errors: { type: string; message: string }[]
    isEditable: boolean
    deleteConfirmation: boolean
    formData: Partial<Car>
    statusDict: { [key: string]: { text: string; color: string } }
  } {
    return {
      errors: [],
      isEditable: this.editable || false,
      deleteConfirmation: false,
      formData: {
        brand: this.brand,
        model: this.model,
        plate: this.plate,
        color: this.color,
        status: this.status as CarStatus
      },
      statusDict: {
        ACTIVE: {
          text: 'Active',
          color: 'green'
        },
        MAINTENANCE: {
          text: 'Maintenance',
          color: 'yellow'
        },
        ON_SERVICE: {
          text: 'On service',
          color: 'blue'
        }
      }
    }
  },
  emits: {
    save(_: Partial<Car>) {
      return true
    },
    delete() {
      return true
    }
  },
  methods: {
    toggleEdit() {
      if (this.isEditable) {
        this.errors = []
        const { brand, model, plate, color, status } = this.formData
        if (!brand) {
          this.errors.push({
            type: 'IS_EMPTY_BRAND',
            message: 'The brand cannot be empty'
          })
        }
        if (!model) {
          this.errors.push({
            type: 'IS_EMPTY_MODEL',
            message: 'The model cannot be empty'
          })
        }
        if (!plate) {
          this.errors.push({
            type: 'IS_EMPTY_PLATE',
            message: 'The plate cannot be empty'
          })
        }
        if (!color) {
          this.errors.push({
            type: 'IS_EMPTY_COLOR',
            message: 'The color cannot be empty'
          })
        }
        if (!status) {
          this.errors.push({
            type: 'IS_EMPTY_STATUS',
            message: 'The status cannot be empty'
          })
        }
        if (this.errors.length !== 0) return
        this.$emit('save', this.formData)
      }
      this.isEditable = !this.isEditable
    },
    deleteCar() {
      this.$emit('delete')
    },
    toggleDelete() {
      this.deleteConfirmation = !this.deleteConfirmation
    },
    closeDeleteConfirmation() {
      this.deleteConfirmation = false
    },
    closeErrors() {
      this.errors = []
    }
  }
}
</script>
<template>
  <div
    class="flex flex-col m-2 p-4 border rounded-lg shadow-lg shadow-slate-500 bg-green-400 dark:bg-green-900"
  >
    <div class="flex justify-end w-full mb-3">
      <button
        class="bg-black dark:bg-white text-white dark:text-black px-2 rounded mr-2"
        @click.prevent="toggleEdit"
      >
        {{ isEditable ? 'Save' : ' Edit' }}
      </button>
      <button
        v-if="!isNew"
        class="bg-red-700 text-white px-2 rounded"
        @click.prevent="toggleDelete"
      >
        Delete
      </button>
    </div>
    <div v-if="!isEditable" class="flex">
      <div class="w-2/3 text-xl leading-none">
        <p class="font-bold">
          {{ brand }}
          <br />
          <span class="text-lg">{{ model }}</span>
          <br />
          <span class="text-base">{{ plate }}</span>
          <br />
          <span class="text-base">{{ color }}</span>
        </p>
      </div>
      <div class="w-1/3">
        <label
          class="px-1 rounded text-xl font-bold w-full"
          :class="`text-${statusDict[status].color}-900 dark:text-${statusDict[status].color}-300 bg-${statusDict[status].color}-900/20 dark:bg-${statusDict[status].color}-300/20`"
          >{{ statusDict[status].text }}</label
        >
      </div>
    </div>
    <div v-else class="flex justify-between flex-wrap">
      <div class="w-2/3 text-xl leading-none">
        <div class="input-field">
          <input type="text" name="brand" id="brand" placeholder="Brand" v-model="formData.brand" />
          <br />
          <input type="text" name="model" id="model" placeholder="Model" v-model="formData.model" />
          <br />
          <input type="text" name="plate" id="plate" placeholder="Plate" v-model="formData.plate" />
          <br />
          <input type="text" name="color" id="color" placeholder="Color" v-model="formData.color" />
        </div>
      </div>
      <div class="w-1/3 pl-3">
        <div>
          <input
            type="radio"
            id="active"
            name="active"
            class="mr-1"
            value="ACTIVE"
            v-model="formData.status"
          />
          <label
            class="px-1 rounded text-green-900 dark:text-green-300 bg-green-900/20 dark:bg-green-300/20"
            for="active"
            >Active</label
          >
        </div>
        <div>
          <input
            type="radio"
            id="maintenance"
            name="maintenance"
            class="mr-1"
            value="MAINTENANCE"
            v-model="formData.status"
          />
          <label
            class="px-1 rounded text-yellow-900 dark:text-yellow-300 bg-yellow-900/20 dark:bg-yellow-300/20"
            for="maintenance"
            >Maintenance</label
          >
        </div>
        <div>
          <input
            type="radio"
            id="onService"
            name="onService"
            class="mr-1"
            value="ON_SERVICE"
            v-model="formData.status"
          />
          <label
            class="px-1 rounded text-blue-900 dark:text-blue-300 bg-blue-900/20 dark:bg-blue-300/20"
            for="onService"
            >On service</label
          >
        </div>
      </div>
      <div v-if="errors.length > 0" class="w-full mt-3">
        <ErrorsContainer :errors="errors" @close="closeErrors" />
      </div>
    </div>
    <div v-if="deleteConfirmation" class="w-full mt-3 bg-red-500/20 text-red-500 text-center p-2">
      <p class="mb-2">Are you sure do you want to delete this car?</p>
      <button class="bg-red-700 text-white px-2 mr-3 rounded" @click.prevent="deleteCar">
        Yes
      </button>
      <button
        class="bg-black dark:bg-white text-white dark:text-black px-2 rounded"
        @click.prevent="closeDeleteConfirmation"
      >
        No
      </button>
    </div>
  </div>
</template>
