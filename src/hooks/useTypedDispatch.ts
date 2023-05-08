import { useDispatch } from "react-redux";
import { TRootDispatch } from "../services/store";

export const useTypedDispatch = () => useDispatch<TRootDispatch>();
