import { buildMeta } from "./constructors";

const BLOCK_FIELDS = [

];

const TRANSFORM_FIELDS = [

];

export function buildBlock(data = {}) {
  return buildMeta(BLOCK_FIELDS, data);
}


export function buildTransform(data = {}) {
  return buildMeta(TRANSFORM_FIELDS, data);
}
