import React, { useEffect } from 'react';

import { currentFolderIDState } from '../state/folder';
import { currentFileIDState } from '../state/file';
import { useRecoilState } from 'recoil';

export const NavProvider = () => {
  const [currentFolderID, setCurrentFolderID] = useRecoilState(
    currentFolderIDState
  );
  const [currentFileID, setCurrentFileID] = useRecoilState(currentFileIDState);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    if (query.has('fi')) {
      setCurrentFileID(query.get('fi'));
    }
    if (query.has('fo')) {
      setCurrentFolderID(query.get('fo'));
    }
  }, []);

  useEffect(() => {
    const url = new URL(location.href);
    if (currentFileID) {
      url.searchParams.set('fi', currentFileID);
    } else {
      url.searchParams.delete('fi');
    }
    if (currentFolderID) {
      url.searchParams.set('fo', currentFolderID);
    } else {
      url.searchParams.delete('fo');
    }
    history.pushState({}, '', url.toString());
  }, [currentFolderID, currentFileID]);

  return null;
};
