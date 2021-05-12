import { useState } from "react";
import useSWR from "swr";
import fetch from "isomorphic-unfetch";

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  // const { data, revalidate } = useSWR("/api/me", async function (args) {
  //   const res = await fetch(args);
  //   return res.json();
  // });

  function toggle() {
    setIsShowing(!isShowing);
  }

  return {
    isShowing,
    toggle,
    // revalidate,
  };
};

export default useModal;
