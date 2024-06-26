export const CONTENT_TYPES = {
  CONTACT: 'CONTACT',
  HEADER: 'HEADER',
  EXPERIENCE: 'EXPERIENCE',
  PARAGRAPH: 'PARAGRAPH',
  ANY_LIST: 'ANY_LIST',
} as const;

export const LAYOUTS = {
  SINGLE: 'SINGLE',
  DOUBLE: 'DOUBLE',
  DOUBLE_LEFT: 'DOUBLE_LEFT',
  DOUBLE_RIGHT: 'DOUBLE_RIGHT',
} as const;

export const EDITOR_MODES = {
  IN_EDITOR_MANAGER: 'IN_EDITOR_MANAGER',
  IN_LAYOUT_MANAGER: 'IN_LAYOUT_MANAGER',
} as const;

export const noop = () => {};
