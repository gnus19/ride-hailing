export enum CarStatus {
  ACTIVE = 'ACTIVE',
  MAINTENANCE = 'MAINTENANCE',
  ON_SERVICE = 'ON_SERVICE'
}

export interface Car {
  _id: string
  brand: string
  model: string
  plate: string
  color: string
  status: CarStatus
}
