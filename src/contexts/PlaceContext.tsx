import {
    Dispatch,
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useReducer,
} from "react";
import { fetchPlacesAction } from "./PlaceActions";
import type { Action, PlaceReducer } from "./PlaceReducer";
import placeReducer from "./PlaceReducer";

type PlaceContext = PlaceReducer & {
    dispatch: Dispatch<Action>;
};

const PlaceContext = createContext<PlaceContext | null>(null);

const PlaceProvider = ({ children }: { children: ReactNode }) => {
    const [placeContext, dispatch] = useReducer(placeReducer, {
        places: [],
        loading: false,
        error: undefined,
    });

    useEffect(() => {
        fetchPlacesAction(dispatch);
    }, []);

    const contextVal = { ...placeContext, dispatch };

    return (
        <PlaceContext.Provider value={contextVal}>
            {children}
        </PlaceContext.Provider>
    );
};

export const usePlaceContext = () => {
    const ctx = useContext(PlaceContext);
    if (!ctx)
        throw new Error("usePlaceContext must be used within PlaceProvider");
    return ctx;
};

export default PlaceProvider;
