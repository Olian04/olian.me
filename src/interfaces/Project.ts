export interface IProject {
  id: number;
  title: string;
  description: string;
  imageURL: string;
  options: {
    imageContainsTitle: boolean;
  }
}
