import {
  BaseSlashMenuItem,
  BlockSchema,
  DefaultBlockSchema,
} from "bocknoate-core";

export type ReactSlashMenuItem<
  BSchema extends BlockSchema = DefaultBlockSchema
> = BaseSlashMenuItem<BSchema> & {
  group: string;
  icon: JSX.Element;
  hint?: string;
  shortcut?: string;
};
