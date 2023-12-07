import { useContext } from "react";
import Context from "./Context";

function useGetTitle(){
    const [state, dispatch] = useContext(Context);
    return [state, dispatch];
}
export {useGetTitle};