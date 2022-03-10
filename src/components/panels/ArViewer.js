import { useContext } from 'react';
import { AppContext } from '../../App';

const ArViewer = () => {
  const {
    sceneTitles
  } = useContext(AppContext);

  return (
    <>
      <div>hello</div>
    </>
  )
}

export default ArViewer; 