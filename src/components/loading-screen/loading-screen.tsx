import { memo } from 'react';

function LoadingScreen(): JSX.Element {
  return (
    <p>Loading ...</p>
  );
}

const MemoLoadingScreen = memo(LoadingScreen);
MemoLoadingScreen.displayName = 'LoadingScreen';

export default MemoLoadingScreen;
