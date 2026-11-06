import { USER_KEY_INVALID } from "../config";

// In this case we have computed string, which is not supported by current ts.
// Waiting for ts 5.0.0 :)

// TODO: Change API messages to actual server messages
const EAPIErrors = {
  // The start of the cloud's message for a resource key it cannot find.
  NON_EXISING_ON_SERVER_ERROR: `The resource key '${USER_KEY_INVALID}' could not be found.`,
  INTERNAL_SERVER_ERROR: "Internal server error",
  REQUEST_LIMIT_REACHED_ERROR:
    "Rate limiting for the resource key",
  MISSING_USER_AGENT_ERROR: "User-Agent was not provided",
};

export { EAPIErrors };
