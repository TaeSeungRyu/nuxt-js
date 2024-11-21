import { defineStore } from 'pinia'

export const useComponentState = defineStore('useComponentState', {
  state: () => {
    return {
      select: '',
      datePicker: '',
      monthPicker: ''
    }
  },
  actions: {
    setComponentState(value: string) {
      this.select = value
    },
    getComponentState() {
      return this.select
    },
    setDatePickerState(value: string) {
      this.datePicker = value
    },
    getDatePickerState() {
      return this.datePicker
    },
    setMonthPickerState(value: string) {
      this.monthPicker = value
    },
    getMonthPickerState() {
      return this.monthPicker
    }
  },
  getters: {}
})
