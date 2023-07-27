export const SCREEN_W = 80;
export const SCREEN_H = 24;

export const HEXVIEW_W = 80;
export const HEXVIEW_H = SCREEN_H - 3;

export const BYTES_PER_LINE = 16;

export const toHex = (n: number, p: number = 2) =>
	n.toString(16).padStart(p, '0');
