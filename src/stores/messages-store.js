import { create } from 'zustand'

export const useMessagesStore = create((set) => ({
  dialogs: {},
  currentDialogId: null,
}))

