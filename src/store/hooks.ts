import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './index';

// Custom hook for dispatching actions with correct types
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Custom hook for selecting state with correct types
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 