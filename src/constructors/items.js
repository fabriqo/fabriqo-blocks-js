import { buildFieldDefinition } from "./fields";

export function buildItemDefinition(data) {
  const { displayName, name, fieldDefinitions } = data;

  return {
    displayName,
    fieldDefinitions: Array.isArray(fieldDefinitions) ? fieldDefinitions.map(buildFieldDefinition) : [],
    name,
  };
}
