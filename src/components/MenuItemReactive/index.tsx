import { MenuItem } from "@mui/material";
import { useCallback } from "react";

type Value = string | number | boolean;

interface MenuItemReactive {
  value?: Value;
  label: JSX.Element | string;
  reactiveCb: (value?: Value) => void;
}

export const MenuItemReactive = ({
  value,
  label,
  reactiveCb,
}: MenuItemReactive) => {
  const _handleClick = useCallback(() => {
    reactiveCb(value);
  }, [reactiveCb, value]);

  return <MenuItem onClick={_handleClick}>{label}</MenuItem>;
};
