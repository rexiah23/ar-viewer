import { useEffect, useRef, useState, createContext } from 'react';
import ArViewer from './components/panels/ArViewer';
import styled from 'styled-components';
import config from './config';
import { initializeScene } from './threejs';

const WebGLContainer = styled.div`

`;
export const AppContext = createContext({});

const App = () => {
  const webGLContainerRef = useRef(null);
  const contextRef = useRef({
    primaryDirectionalLightContainer: {},
  });
  const context = contextRef.current;

  // Put Global Context states here
  const [sceneTitles, setSceneTitles] = useState(config.defaults.sceneTitles);

  // To share variables with threejs, add them as a key/value to this object
  context.sceneTitles = sceneTitles; 

  useEffect(() => {
    initializeScene({
      webGLContainerRef, 
      params: config.params,
      context, 
  }); 
  }, []);

  return (
    <AppContext.Provider value={{
      sceneTitles, setSceneTitles
    }}>
      <ArViewer/> 
      <WebGLContainer
        ref={webGLContainerRef}
      />
    </AppContext.Provider>
  );
}

export default App;
