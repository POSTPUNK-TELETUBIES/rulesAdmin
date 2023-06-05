import { Button, Divider, Drawer, Tab, Tabs, TextField } from '@mui/material';
import { PopOverDetails } from '../PopOverDetails';

import { RuleDTO, RulesStatus } from '../../types/supabase';
import { useState } from 'react';

interface CustomDrawerProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  result: RulesStatus & RuleDTO & { isActiveOriginal: boolean };
}

const renderOptions = [
  {
    tab: 'description',
    content: ({ result }) => (
      <PopOverDetails
        tags={[result.severity, result.type]}
        isActive={result.isActive}
        ruleTitle={result.name}
        ruleDescription={result.htmlDesc}
      />
    ),
  },
  {
    tab: 'history',
    content: () => (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1 }}>
          <Button sx={{ padding: '8px 16px' }} variant='contained' size='large'>
            Historial
          </Button>
        </div>
        <div style={{ height: '25%', overflowY: 'auto', padding: '8px' }}>
          <TextField
            fullWidth
            placeholder='Agregar observación'
            multiline
            variant='outlined'
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>
    ),
  },
];

export const CustomDrawer = ({
  isDrawerOpen,
  setIsDrawerOpen,
  result,
}: CustomDrawerProps) => {
  const [activeTab, setActiveTab] = useState('');

  const handleToggleDrawer = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsDrawerOpen(!isDrawerOpen);
    if (activeTab === 'description') {
      setActiveTab('');
    }
  };

  const handleTabChange = (_: React.ChangeEvent<object>, newValue: string) => {
    setActiveTab(newValue);
  };

  const handleDrawerClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const renderContent = renderOptions.find(
    (option) => option.tab === activeTab
  );

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
      {renderContent && renderContent.content({ result })}
    </Drawer>
  );
};
