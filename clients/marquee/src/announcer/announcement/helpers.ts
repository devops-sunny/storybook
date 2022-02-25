import { AnnouncementData } from './types';
import { SnackbarOrigin } from '@material-ui/core';

export function announcementDataFactory(
  message: string | undefined,
): AnnouncementData {
  return {
    message,
    key: new Date().getTime().toString(),
  };
}

export function randomSnackbarOrigin(): SnackbarOrigin {
  type Pluck<T, K extends keyof T> = T[K];
  type Position = Pluck<SnackbarOrigin, 'horizontal'>;
  const positions: Position[] = ['left', 'center', 'right'];
  const randomIndex = Math.floor(Math.random() * 3);
  const value: Position = positions[randomIndex] || 'left';
  return {
    vertical: 'bottom',
    horizontal: value,
  };
}

// ramdomize the viewport height units offset from the bottom
export function randomMarginBottom(): number {
  const maxOffset = 75;
  const minOffset = 5;
  return Math.floor(Math.random() * (maxOffset - minOffset) + minOffset);
}
