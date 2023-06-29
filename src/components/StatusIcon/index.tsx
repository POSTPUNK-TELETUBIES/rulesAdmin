import { CheckCircleOutline, Close } from '@mui/icons-material';

export function StatusIcon({ isActive }: { isActive: boolean }) {
  return isActive ? (
    <CheckCircleOutline color='success' />
  ) : (
    <Close color='error' />
  );
}
