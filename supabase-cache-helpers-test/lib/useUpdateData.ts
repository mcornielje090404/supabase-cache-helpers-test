import {
  QueryWithoutWildcard,
  UsePostgrestSWRMutationOpts,
  useUpdateMutation,
} from "@supabase-cache-helpers/postgrest-swr";
import { PostgrestQueryBuilder } from "@supabase/postgrest-js";
import { GetResult } from "@supabase/postgrest-js/dist/module/select-query-parser";
import {
  GenericSchema,
  GenericTable,
} from "@supabase/postgrest-js/dist/module/types";
import { SWRMutationConfiguration } from "swr/mutation";

export const useUpdateData = <
  S extends GenericSchema,
  T extends GenericTable,
  Re = T extends { Relationships: infer R } ? R : unknown,
  Q extends string = "*",
  R = GetResult<S, T["Row"], Re, Q extends "*" ? "*" : Q>
>(
  qb: PostgrestQueryBuilder<S, T>,
  primaryKeys: (keyof T["Row"])[],
  query?: QueryWithoutWildcard<Q> | null,
  updateOpts?: UsePostgrestSWRMutationOpts<S, T, Re, "UpdateOne", Q, R>
) => {
  const { trigger: update } = useUpdateMutation(
    qb,
    primaryKeys,
    query,
    updateOpts
  );

  const updateMutation = async (
    data: T["Update"],
    callbacks?: Pick<
      SWRMutationConfiguration<any, any>,
      "onSuccess" | "onError"
    >
  ) => {
    await update(data, callbacks);
  };

  return { trigger: updateMutation };
};
