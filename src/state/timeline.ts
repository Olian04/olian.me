import { selector } from 'recoil';

import { ITimelineGroup } from '../interfaces/TimelineGroup';

import { mockTimelineGroup } from '../mock/mockTimelineGroup';
import { randomNumberBetween } from '../helpers/random';

export const timelineGroups = selector<ITimelineGroup[]>({
  key: 'TIMELINE_GROUPS',
  get: () => {
    // TODO: Fetch timeline data from firebase
    return Array(randomNumberBetween(5, 10)).fill(0).map(mockTimelineGroup);
  },
});
