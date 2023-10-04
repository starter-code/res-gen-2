export const CONTENT_TYPES = {
  CONTACT: 'CONTACT',
  HEADER: 'HEADER',
  EXPERIENCE: 'EXPERIENCE',
  PARAGRAPH: 'PARAGRAPH',
} as const;

export const LAYOUTS = {
  SINGLE: 'SINGLE',
  DOUBLE: 'DOUBLE',
  DOUBLE_LEFT: 'DOUBLE_LEFT',
  DOUBLE_RIGHT: 'DOUBLE_RIGHT',
} as const;

export const EDITOR_MODES = {
  DRAG_AND_DROP: 'DRAG_AND_DROP',
  POPOVER: 'POPOVER',
} as const;

export const noop = () => {};
