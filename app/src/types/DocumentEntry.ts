export interface DocumentFolderEntry {
  type: 'folder';
  name: string;
  lastModified: Date;
}

export interface DocumentFileEntry {
  type: 'file';
  name: string;
  content: string;
  lastModified: Date;
}

export interface DocumentMissingEntry {
  type: 'missing';
}

export type DocumentValidEntry = DocumentFileEntry | DocumentFolderEntry;

export type DocumentEntry = DocumentValidEntry | DocumentMissingEntry;
