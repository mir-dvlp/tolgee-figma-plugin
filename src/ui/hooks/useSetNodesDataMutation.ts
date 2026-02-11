import {
  SetNodesDataProps,
  setNodesDataEndpoint,
} from "@/main/endpoints/setNodesData";
import { getConnectedNodesEndpoint } from "@/main/endpoints/getConnectedNodes";
import { delayed } from "@/main/utils/delayed";
import { useMutation, useQueryClient } from "react-query";

type Options = {
  invalidateConnectedNodes?: boolean;
};

export const useSetNodesDataMutation = (options?: Options) => {
  const queryClient = useQueryClient();
  const shouldInvalidate = options?.invalidateConnectedNodes ?? true;
  const result = useMutation<void, unknown, SetNodesDataProps>(
    [setNodesDataEndpoint.name],
    delayed((props: SetNodesDataProps) => setNodesDataEndpoint.call(props)),
    {
      onSuccess: () => {
        if (shouldInvalidate) {
          // Invalidate connected nodes query to ensure fresh data is fetched
          queryClient.invalidateQueries([getConnectedNodesEndpoint.name]);
        }
      },
    }
  );
  return { ...result };
};
