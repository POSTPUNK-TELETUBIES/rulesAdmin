import { Menu as MenuIcon, Sync } from "@mui/icons-material";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { useSyncro } from "../../hooks";
import { DownloadButton } from "../ActionButtons";
import { useSetOpenMenu } from "../../lib/observers";

// TODO: menu ref observable should pipe to be a toggle
export const DraggableMenu = () => {
  const [refMenu, setRefMenu] = useState(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const isMenuOpen = useSetOpenMenu();

  const [_handleClickSyncro] = useSyncro();

  const _handleClose = useCallback(() => {
    setRefMenu(null);
  }, []);

  useEffect(() => {
    if (isMenuOpen) setRefMenu(menuRef.current);
    else setRefMenu(null);
  }, [isMenuOpen]);

  const _handleClick = useCallback(
    ({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
      setRefMenu(currentTarget);
    },
    []
  );

  return (
    <>
      <Draggable>
        <IconButton
          ref={menuRef}
          onClick={_handleClick}
          sx={{
            background: ({ palette }) => palette.secondary.main,
            zIndex: 500,
          }}
          className="dragableMenu"
        >
          <MenuIcon fontSize="large" />
        </IconButton>
      </Draggable>
      <Menu
        className="menuDragable"
        anchorEl={refMenu}
        open={!!refMenu}
        onClose={_handleClose}
      >
        <MenuItem onClick={_handleClickSyncro}>
          <ListItemIcon>
            <Sync fontSize="small" />
          </ListItemIcon>
          <ListItemText>Sincronizar</ListItemText>
        </MenuItem>
        <DownloadButton cb={_handleClickSyncro} />
      </Menu>
    </>
  );
};
