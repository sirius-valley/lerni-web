import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { counterActions } from "../redux/slices/counter.slice";

const useCounter = () => {

  const dispatch = useDispatch();

  const counter = useSelector((state:RootState) => state.counter.value);
  const increment = () => dispatch(counterActions.increment());

  return {
    counter,
    increment,
  }
}

export default useCounter;