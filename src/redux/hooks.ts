import { AppDispatch, RootState } from '../redux/store';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const useLDispatch: () => AppDispatch = useDispatch;
export const useLSelector: TypedUseSelectorHook<RootState> = useSelector;
