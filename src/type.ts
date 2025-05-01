
// types.ts
import { store } from './store/store'; // Fixed import - removed RootState import and imported store

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
