import { randomNumberBetween } from '../helpers/random';
import { IconNames } from '../icons';
import { ITimelineEntry } from '../interfaces/TimelineEntry';
import { ITimelineGroup } from '../interfaces/TimelineGroup';

let nextMockGroupID = 1;
let nextMockEntryID = 1;

const icons: IconNames[] = ['box', 'exclamation', 'flame', 'kanban'];

const mockTimelineEntry = (): ITimelineEntry => {
  const entryID = nextMockEntryID;
  nextMockEntryID += 1;
  return {
    date: new Date(Date.now() - entryID * 10000),
    primaryLink: {
      type: 'internal',
      title: `Timeline entry number ${entryID}`,
      path: `/details`,
    },
    secondaryLink: {
      type: 'external',
      title: `${randomNumberBetween(1, 10)} things`,
      path: 'https://www.google.com',
    },
  };
};

export const mockTimelineGroup = (): ITimelineGroup => {
  nextMockEntryID = 1;
  return {
    title: `Test number ${nextMockGroupID++}`,
    iconName: icons[randomNumberBetween(0, icons.length - 1)],
    entries: Array(10).fill(0).map(mockTimelineEntry),
  };
};
