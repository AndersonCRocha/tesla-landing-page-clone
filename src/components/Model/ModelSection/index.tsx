import { useEffect } from "react";
import { useRef } from "react";
import { HTMLAttributes, ReactNode } from "react";
import useModel from "../useModel";

import { Container } from "./styles";

interface ModelSectionProps extends HTMLAttributes<HTMLDivElement> {
  modelName: string;
  overlayNode: ReactNode;
}

function ModelSection({
  modelName,
  overlayNode,
  children,
  ...props
}: ModelSectionProps) {
  const { registerModel } = useModel(modelName);

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      registerModel({ modelName, overlayNode, sectionRef });
    }
  }, [modelName, overlayNode, registerModel]);

  return (
    <Container ref={sectionRef} {...props}>
      {children}
    </Container>
  );
}

export default ModelSection;
