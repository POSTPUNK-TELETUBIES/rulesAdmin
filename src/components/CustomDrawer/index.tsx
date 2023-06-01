import { Box, Button, Divider, Drawer } from '@mui/material';
import { PopOverDetails } from '../PopOverDetails';

export const CustomDrawer = ({
  isDrawerOpen,
  handleToggleDrawer,
  handleDrawerClick,
  handleToggleDescription,
  showDescription,
  result,
  handleToggleHistory,
}) => {
  return (
    <Drawer
      anchor='right'
      open={isDrawerOpen}
      onClose={handleToggleDrawer}
      onClick={handleDrawerClick}
      PaperProps={{ style: { width: '42.5%' } }}
    >
      <Box padding={2}>
        <Button
          onClick={handleToggleDescription}
          variant='contained'
          size='large'
        >
          Descripción
        </Button>
        {showDescription && (
          <PopOverDetails
            tags={[result.severity, result.type]}
            isActive={result.isActive}
            ruleTitle={result.name}
            ruleDescription={result.htmlDesc}
          />
        )}
      </Box>
      <Divider />
      <Box padding={2}>
        <Button
          sx={{ padding: '8px 16px' }}
          variant='contained'
          size='large'
          onClick={handleToggleHistory}
        >
          Historial
        </Button>
      </Box>
    </Drawer>
  );
};
