// types.ts
import { RootState } from './store/store'; // Assurez-vous que le chemin est correct

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;