import { Menu as MenuIcon } from "@mui/icons-material";
import { IconButton, Menu } from "@mui/material";
import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { useSynchro } from "../../hooks";
import { DownloadButton } from "../ActionButtons";
import { useSetOpenMenu } from "../../lib/observers";
import { SynchroButton } from "../SynchroButton";

// TODO: menu ref observable should pipe to be a toggle
export const DraggableMenu = () => {
  const [refMenu, setRefMenu] = useState(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const isMenuOpen = useSetOpenMenu();

  const [_handleClickSyncro] = useSynchro();

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
        <SynchroButton />
        <DownloadButton cb={_handleClickSyncro} />
      </Menu>
    </>
  );
};
