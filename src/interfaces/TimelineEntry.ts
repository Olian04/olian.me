import { ILinkData } from './LinkData';

export interface ITimelineEntry {
  date: Date;
  primaryLink: ILinkData;
  secondaryLink: ILinkData;
}
