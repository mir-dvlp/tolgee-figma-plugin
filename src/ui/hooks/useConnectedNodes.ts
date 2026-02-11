import {
  ConnectedNodesProps,
  getConnectedNodesEndpoint,
} from "@/main/endpoints/getConnectedNodes";
import { delayed } from "@/main/utils/delayed";
import { SelectionChangeHandler } from "@/types";
import { on } from "@create-figma-plugin/utilities";
import { useEffect } from "preact/hooks";
import { useQuery } from "react-query";

export const useConnectedNodes = (props: ConnectedNodesProps) => {
  const result = useQuery(
    [getConnectedNodesEndpoint.name, props.ignoreSelection],
    delayed(() => getConnectedNodesEndpoint.call(props)),
    {
      select: (data) => ({ ...data, items: data.items.filter((n) => n.key) }),
      keepPreviousData: true,
      staleTime: props.ignoreSelection ? 5 * 60 * 1000 : 0,
      cacheTime: props.ignoreSelection ? 5 * 60 * 1000 : 0,
    }
  );

  useEffect(() => {
    if (props.ignoreSelection) {
      return;
    }
    return on<SelectionChangeHandler>("SELECTION_CHANGE", () => {
      result.refetch();
    });
  }, [props.ignoreSelection, result.refetch]);

  return { ...result };
};
