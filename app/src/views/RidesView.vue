<script setup lang="ts">
import VehicleCard from '@/components/VehicleCard.vue'
import SuccessMessageContainer from '@/components/SuccessMessageContainer.vue'
import type { Car } from '@/interfaces/Car'
import { inject, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const apiUrl = inject('apiUrl')
const isAddingCar = ref(false)
const cars: Car[] = reactive([])
const errors: { type: string; message: string }[] = reactive([])
const showSuccessMessage = ref('')
let token: string

onMounted(async () => {
  token = localStorage.getItem('token') || ''

  const response = await fetch(`${apiUrl}/rides`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    }
  })

  const status = response.status
  const body = await response.json()

  if (status === 401) {
    await router.push({ name: 'login', query: { error: body.code } })
  }

  if (status !== 200) {
    return
  }

  cars.push(...body.cars.reverse())
})

const logout = async () => {
  localStorage.removeItem('token')
  await router.push({ name: 'login' })
}

const addCar = () => {
  isAddingCar.value = !isAddingCar.value
}

const closeSuccess = () => {
  showSuccessMessage.value = ''
}

const saveNewCar = async (formData: any) => {
  const { brand, model, plate, color, status } = formData
  const response = await fetch(`${apiUrl}/rides`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify({
      brand,
      model,
      plate,
      color,
      status
    })
  })

  const responseStatus = response.status
  const body = await response.json()
  if (responseStatus === 401) {
    await router.push({ name: 'login', query: { error: body.code } })
  }
  if (responseStatus === 400) {
    const requestError = body.errors.map((err: any) => {
      return {
        type: err.msg,
        message: err.path
      }
    })
    errors.push(...requestError)
  }
  cars.unshift(body.car)

  showSuccessMessage.value = body.message
  isAddingCar.value = false
}

const saveEditedCar = async (formData: any, carId: string) => {
  const { brand, model, plate, color, status } = formData

  const response = await fetch(`${apiUrl}/rides/${carId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify({
      brand,
      model,
      plate,
      color,
      status
    })
  })
  const responseStatus = response.status
  const body = responseStatus === 204 ? null : await response.json()

  if (responseStatus === 400) {
    const requestError = body.errors.map((err: any) => {
      return {
        type: err.msg,
        message: err.path
      }
    })
    errors.push(...requestError)
  }
  if (responseStatus === 401) {
    await router.push({ name: 'login', query: { error: body.code } })
  }
  if (responseStatus === 404) {
    errors.push({
      type: 'NOT_FOUND',
      message: body.message
    })
  }

  showSuccessMessage.value = 'Successfully edited car info'
  let editedCarIndex = cars.findIndex((car) => car._id === carId)
  cars.splice(editedCarIndex, 1, {
    ...cars[editedCarIndex],
    brand,
    model,
    plate,
    color,
    status
  })
}

const deleteCar = async (carId: string) => {
  const response = await fetch(`${apiUrl}/rides/${carId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    }
  })

  const status = response.status
  const body = status === 200 ? null : await response.json()
  if (status === 401) {
    await router.push({ name: 'login', query: { error: body.code } })
  }
  if (status === 404) {
    errors.push({
      type: 'NOT_FOUND',
      message: body.message
    })
  }

  let editedCarIndex = cars.findIndex((car) => car._id === carId)
  showSuccessMessage.value = `Successfully removed Car ${cars[editedCarIndex].brand}`
  cars.splice(editedCarIndex, 1)
}
</script>

<template>
  <div class="flex justify-between">
    <div class="flex">
      <h1 class="content-center text-black dark:text-white text-xl text-2xl">
        Welcome to your account
      </h1>
      <button
        class="bg-black dark:bg-white text-white dark:text-black p-2 rounded ml-3"
        @click="addCar"
      >
        {{ isAddingCar ? 'Hide new car' : 'Add new car' }}
      </button>
    </div>
    <button
      class="bg-black dark:bg-white text-white dark:text-black p-2 rounded ml-3"
      @click="logout"
    >
      Logout
    </button>
  </div>
  <div v-if="showSuccessMessage" class="mt-3">
    <SuccessMessageContainer :message="showSuccessMessage" @close="closeSuccess" />
  </div>
  <div class="flex flex-wrap" :class="cars.length === 0 && !isAddingCar && 'justify-center'">
    <div v-if="isAddingCar" class="w-full md:w-1/2 xl:w-1/3">
      <VehicleCard
        key="new"
        brand=""
        model=""
        plate=""
        color=""
        status="ACTIVE"
        :editable="true"
        :is-new="true"
        @save="saveNewCar"
      />
    </div>
    <div v-for="car in cars" :key="car._id" class="w-full md:w-1/2 xl:w-1/3">
      <VehicleCard
        :key="car._id"
        :brand="car.brand"
        :model="car.model"
        :plate="car.plate"
        :color="car.color"
        :status="car.status"
        @save="saveEditedCar($event, car._id)"
        @delete="deleteCar(car._id)"
      />
    </div>
    <div
      v-if="cars.length === 0 && !isAddingCar"
      class="mt-4 text-black dark:text-white text-xl text-2xl"
    >
      You don't have a car associated
    </div>
  </div>
</template>

<style lang="postcss" scoped></style>
