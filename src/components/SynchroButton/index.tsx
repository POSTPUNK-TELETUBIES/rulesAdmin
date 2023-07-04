import {
  Dialog,
  DialogTitle,
  DialogContent,
  TableRow,
  TableCell,
  Checkbox,
  DialogActions,
} from '@mui/material';
import { useSynchro } from '../../hooks';
import { ChangeEvent, useCallback, useRef, useState } from 'react';
import { fetchClient } from '../../lib/modules/fetchClient';

import GenericTable from '../../layout/GenericTable';

import synchroDb, { LocalRulesStatus } from '../../lib/service/dexie';
import { columns } from './config';
import Button from '../Button/Button';

export const SynchroButton = () => {
  const [_handleClickSynchro] = useSynchro();
  const [open, setOpen] = useState(false);
  const [conflictedData, setConflictedData] = useState<LocalRulesStatus[]>([]);

  const selectedRef = useRef({});

  const [isSelectedAll, setIsSelectedAll] = useState(false);

  const handleCloseModal = useCallback(() => {
    setOpen(false);
  }, []);

  const handleSynchro = useCallback(() => {
    const { current } = selectedRef;

    const idsBy = Object.values(current).length ? current : undefined;

    _handleClickSynchro(idsBy);
    handleCloseModal();
  }, [_handleClickSynchro, handleCloseModal]);

  const handleOpenModal = useCallback(async () => {
    const dataFromIndexedDb = await synchroDb.getRulesToUpdate();
    const conflictedData = await fetchClient.getConflicts(dataFromIndexedDb);

    setConflictedData(conflictedData);

    if (conflictedData?.length) return setOpen(true);

    handleSynchro();
  }, [handleSynchro]);

  const _handleAtomicChange = useCallback(
    (id: number, event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) return (selectedRef.current[id] = true);

      delete selectedRef.current[id];
    },
    []
  );

  const _handleMolecularChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setIsSelectedAll(event.target.checked);
    },
    []
  );

  return (
    <>
      <Button text='Sincronizar' iconType='update' onClik={handleOpenModal} />

      <Dialog onClose={handleCloseModal} open={open}>
        <DialogTitle>Hay conflictos</DialogTitle>
        <DialogContent>
          <GenericTable
            header={
              <TableRow>
                <TableCell>
                  <Checkbox
                    checked={isSelectedAll}
                    onChange={_handleMolecularChange}
                  />
                </TableCell>
                {columns.map(({ label }) => (
                  <TableCell key={label}>{label}</TableCell>
                ))}
              </TableRow>
            }
            body={
              <>
                {conflictedData?.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell>
                      <Checkbox
                        disabled={isSelectedAll}
                        onChange={(event) =>
                          _handleAtomicChange(result.id, event)
                        }
                      />
                    </TableCell>
                    {columns.map((config) => (
                      <TableCell id={`${result.id}-${config.label}`}>
                        {typeof result[config.resource] === 'boolean'
                          ? result[config.resource]
                            ? 'Activo'
                            : 'Inactivo'
                          : result[config.resource]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </>
            }
          />
          <DialogActions>
            <Button
              text='Sincronizar'
              iconType='update'
              onClik={handleSynchro}
            />
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};
