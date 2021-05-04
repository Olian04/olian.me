import { useEffect } from 'react';
import { useRecoilStateLoadable } from 'recoil';

import { currentFolderIDState } from '../state/folder';
import { currentFileIDState } from '../state/file';

export const NavProvider = () => {
  const [loadableCurrentFolderID, setCurrentFolderID] = useRecoilStateLoadable(
    currentFolderIDState
  );
  const [loadableCurrentFileID, setCurrentFileID] = useRecoilStateLoadable(
    currentFileIDState
  );

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    if (query.has('fi')) {
      const fileID = query.get('fi');
      if (fileID !== null) {
        setCurrentFileID(fileID);
      }
    }
    if (query.has('fo')) {
      const folderID = query.get('fo');
      if (folderID !== null) {
        setCurrentFolderID(folderID);
      }
    }
  }, []);

  useEffect(() => {
    const url = new URL(location.href);
    if (loadableCurrentFileID.state === 'hasValue') {
      url.searchParams.set('fi', loadableCurrentFileID.contents);
    } else {
      url.searchParams.delete('fi');
    }
    if (loadableCurrentFolderID.state === 'hasValue') {
      url.searchParams.set('fo', loadableCurrentFolderID.contents);
    } else {
      url.searchParams.delete('fo');
    }
    history.pushState({}, '', url.toString());
  }, [loadableCurrentFolderID.contents, loadableCurrentFileID.contents]);

  return null;
};
