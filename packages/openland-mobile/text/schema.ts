// import { AddSuffixes, FilterNotTypeRecursive, FilterTypeRecursive, FlattenForIntellisense, Paths, ReplaceTypeRecurcive } from "./utils";
// import en from './extractedLangs/en.json';

// type Plural = number;

// export type LocalizationSchema = typeof en;

// export type LocalizedResources = Paths<LocalizationSchema, string>;
// export type LocalizedPluralsResources = Paths<LocalizationSchema, Plural>;

// export type Pluralize<T, P extends string> = AddSuffixes<ReplaceTypeRecurcive<FilterTypeRecursive<T, Plural>, Plural, string>, P>;
// export type PrepareSchema<T, P extends string> = FlattenForIntellisense<FilterNotTypeRecursive<T, Plural> & Pluralize<LocalizationSchema, P>>;
