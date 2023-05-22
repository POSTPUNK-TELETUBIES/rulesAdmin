import { SelectChangeEvent } from "@mui/material";
import { useCallback, useEffect } from "react";
import { setLanguageFilter } from "../../lib/observers";

import { useTour } from "@reactour/tour";
import { LanguageGenericFilter } from "./LanguageGenericFilter";
import { DOMHideOverflow, visitHandler } from "../../tools";

export const LanguageFilter = () => {
  const { setIsOpen, isOpen } = useTour();

  const _handleChange = useCallback((event: SelectChangeEvent) => {
    setLanguageFilter(event.target.value);
  }, []);

  // TODO: consider doing this side effect in other place and using a controller
  useEffect(() => {
    const shouldOpen = visitHandler();

    setIsOpen(shouldOpen);
  }, [setIsOpen]);

  useEffect(() => {
    DOMHideOverflow("body", isOpen.valueOf());
  }, [isOpen]);

  return (
    <LanguageGenericFilter
      className="language"
      handleChange={_handleChange}
      displayEmpty
    />
  );
};
