import { USER_KEY_INVALID } from "../config";

// In this case we have computed string, which is not supported by current ts.
// Waiting for ts 5.0.0 :)

// TODO: Change API messages to actual server messages
const EAPIErrors = {
  NON_EXISING_ON_SERVER_ERROR: `The Resource Key '${USER_KEY_INVALID}' was not found. See http://51degrees.com/documentation/_info__error_messages.html#Resource_key_not_recognized for more information.`,
  INTERNAL_SERVER_ERROR: "Internal server error",
  REQUEST_LIMIT_REACHED_ERROR:
    "Rate limiting for the resource key",
  MISSING_USER_AGENT_ERROR: "User-Agent was not provided",
};

export { EAPIErrors };
