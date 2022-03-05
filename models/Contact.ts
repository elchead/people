export interface Contact {
  key: string;
  name: string;
  last: string;
  [k: string]: string | string[] | undefined;
}
