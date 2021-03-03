import { IconNames } from '../icons';
import { ITimelineEntry } from './TimelineEntry';

export interface ITimelineGroup {
  title: string;
  iconName: IconNames;
  entries: ITimelineEntry[];
}
