import { useEffect, useRef } from "react";

export function useOutsideClick(handler, captureEvent) {
  const ref = useRef();
  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) handler();
      }
      document.addEventListener("click", handleClick, captureEvent);
      return () =>
        document.removeEventListener("click", handleClick, captureEvent);
    },
    [handler]
  );
  return ref;
}
