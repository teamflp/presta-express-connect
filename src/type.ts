
// types.ts
import { store } from './store/store';

// Export type definitions
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
