import { Button, Drawer, Tab, Tabs } from '@mui/material';
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
      <Button sx={{ padding: '8px 16px' }} variant='contained' size='large'>
        Historial
      </Button>
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
