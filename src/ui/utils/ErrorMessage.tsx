import type { ReactNode } from "react";

function ErrorMessage(errMsg: ReactNode, disabledStyle: boolean = false) {
  if (errMsg) {
    if (disabledStyle) return errMsg;

    return (
      <div className="text-red-500 flex flex-row gap-1 items-center">
        <i className="fa-solid fa-circle-exclamation text-xs" />
        <span className="text-xs">{errMsg}</span>
      </div>
    );
  }

  return undefined;
}

export { ErrorMessage };
