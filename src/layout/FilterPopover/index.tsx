import { FilterList } from '@mui/icons-material';
import { Badge, IconButton, Menu } from '@mui/material';
import { MouseEvent, useCallback, useState } from 'react';
import { MenuItemReactive } from '../../components/MenuItemReactive';

interface FilterConfig {
  value: string;
  label: string;
}

interface FilterPopoeverProps {
  reactiveCallback: (value: unknown) => void;
  filterConfig: FilterConfig[];
  isClosingRecursive?: boolean;
}

export const FilterPopover = ({
  filterConfig,
  reactiveCallback,
  isClosingRecursive,
}: FilterPopoeverProps) => {
  const [menuRef, setMenuRef] = useState(null);
  const [invisible, setInvisible] = useState(true);

  const _handleReactive = useCallback(
    (value: unknown) => {
      reactiveCallback(value);
      setInvisible(value === 'all');
      isClosingRecursive && setMenuRef(null);
    },
    [isClosingRecursive, reactiveCallback]
  );

  const _handleClose = useCallback(() => {
    setMenuRef(null);
  }, []);

  const _handleClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setMenuRef(event.currentTarget);
  }, []);

  return (
    <>
      <IconButton onClick={_handleClick} sx={{ padding: '1px !important' }}>
        <Badge variant='dot' invisible={invisible} color='secondary'>
          <FilterList sx={{ color: '#e4a010' }} />
        </Badge>
      </IconButton>
      <Menu anchorEl={menuRef} onClose={_handleClose} open={Boolean(menuRef)}>
        {filterConfig.map(({ value, label }) => (
          <MenuItemReactive
            label={label}
            value={value}
            reactiveCb={_handleReactive}
            key={value}
          />
        ))}
      </Menu>
    </>
  );
};
