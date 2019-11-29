import { isSome, none, fromPredicate, mapNullable, Option } from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";
import { NOT_MODIFIED_ENV } from "./constants";

export const getShellCmd = (internalCommand: "env", attr: Option<string> = none) => (path: string) => {
  const toOption = fromPredicate<string>(
    configPath => configPath !== NOT_MODIFIED_ENV
  );

  if (isSome(attr)) {
    return pipe(
      path,
      toOption,
      mapNullable(path => `nix-shell -A ${attr.value} ${path} --run ${internalCommand}`)
    );
  } else {
    return pipe(
      path,
      toOption,
      mapNullable(path => `nix-shell ${path} --run ${internalCommand}`)
    );
  }
};

export const toUndefined = (..._: any) => undefined;
