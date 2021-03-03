export type IconConstructor = (props: IIconProps) => JSX.Element;

export interface IIconProps {
  width: number;
  height: number;
  overrideColor?: string;
}
