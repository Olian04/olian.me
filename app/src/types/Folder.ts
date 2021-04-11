export interface Folder {
  id: string;
  name: string;
  parent: string;
  files: string[];
  folders: string[];
}
