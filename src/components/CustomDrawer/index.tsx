import { Button, Drawer, Tab, Tabs } from '@mui/material';
import { PopOverDetails } from '../PopOverDetails';

export const CustomDrawer = ({
  isDrawerOpen,
  handleToggleDrawer,
  handleDrawerClick,
  activeTab,
  setActiveTab,
  result,
  handleToggleHistory,
}) => {
  const handleTabChange = (_, newValue) => {
    setActiveTab(newValue === activeTab ? null : newValue);
  };

  return (
    <Drawer
      anchor='right'
      open={isDrawerOpen}
      onClose={handleToggleDrawer}
      onClick={handleDrawerClick}
      PaperProps={{ style: { width: '42.5%' } }}
    >
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant='fullWidth'
        aria-label='Drawer tabs'
      >
        <Tab label='Descripción de Reglas' value='description' />
        <Tab label='Historial de Cambios' value='history' />
      </Tabs>
      {activeTab === 'description' && (
        <PopOverDetails
          tags={[result.severity, result.type]}
          isActive={result.isActive}
          ruleTitle={result.name}
          ruleDescription={result.htmlDesc}
        />
      )}
      {activeTab === 'history' && (
        <Button
          sx={{ padding: '8px 16px' }}
          variant='contained'
          size='large'
          onClick={handleToggleHistory}
        >
          Historial
        </Button>
      )}
    </Drawer>
  );
};
