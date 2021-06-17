import { useRef, useState, useCallback, ReactNode } from "react";

import ModelsContext, { CarModel } from "../ModelsContext";
import ModelOverlay from "../ModelOverlay";

import { Container, OverlaysRoot } from "./styles";

interface ModelsWrapperProps {
  children: ReactNode;
}

function ModelsWrapper({ children }: ModelsWrapperProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [registeredModels, setRegisteredModels] = useState<CarModel[]>([]);

  const registerModel = useCallback((model: CarModel) => {
    setRegisteredModels((previousState) => [...previousState, model]);
  }, []);

  const unregisterModel = useCallback((modelName: string) => {
    setRegisteredModels((previousState) =>
      previousState.filter((model) => model.modelName !== modelName)
    );
  }, []);

  const getModelByName = useCallback(
    (modelName: string) =>
      registeredModels.find((model) => model.modelName === modelName) || null,
    [registeredModels]
  );

  return (
    <ModelsContext.Provider
      value={{
        wrapperRef,
        registeredModels,
        registerModel,
        unregisterModel,
        getModelByName,
      }}
    >
      <Container ref={wrapperRef}>
        <OverlaysRoot>
          {registeredModels.map((model) => (
            <ModelOverlay key={model.modelName} model={model}>
              {model.overlayNode}
            </ModelOverlay>
          ))}
        </OverlaysRoot>

        {children}
      </Container>
    </ModelsContext.Provider>
  );
}

export default ModelsWrapper;
