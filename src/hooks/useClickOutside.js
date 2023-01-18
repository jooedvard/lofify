import { useEffect, useRef } from "react";

export function useClickOutside(callback) {

    const fn = useRef(callback);
    const innerRef = useRef();

    useEffect(() => {
        fn.current = callback;
    }, [callback])

    useEffect(() => {
        const windowClick = (e) => {
            let {current} = innerRef;
            if(!e.path.includes(current)){
                fn.current();
            }
        }
        window.addEventListener("click", windowClick);

        return () => { window.removeEventListener("click", windowClick) }
    })

    return innerRef;
}

