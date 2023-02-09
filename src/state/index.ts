import { atom } from 'jotai'

export const todosAtom = atom<any[]>([])
export const todosId = atom<string>('')