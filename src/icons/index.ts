import { BoxIcon } from './timeline/box';
import { ExclamationIcon } from './timeline/exclamation';
import { FlameIcon } from './timeline/flame';
import { KanbanIcon } from './timeline/kanban';

export const iconNameMap = {
  box: BoxIcon,
  exclamation: ExclamationIcon,
  flame: FlameIcon,
  kanban: KanbanIcon,
};

export type IconNames = keyof typeof iconNameMap;
