import * as React from "react";
import { storiesOf } from "@storybook/react";

import useBreakpoint from "./index";

storiesOf("use-breakpoint", module).add("useBreakpoint", () => {
  const CurrentBreakpoint = () => {
    const { breakpoint, minWidth, maxWidth } = useBreakpoint(
      { mobile: 0, tablet: 768, desktop: 1280 },
      "mobile"
    );
    return (
      <p>
        The current breakpoint is <strong>{breakpoint}</strong> with{" "}
        <em>min-width</em> of{" "}
        <strong>
          {minWidth}
          px
        </strong>
        {maxWidth ? (
          <>
            {" "}
            and a <em>max-width</em> of <strong>{maxWidth}px</strong>
          </>
        ) : (
          ""
        )}
        !
      </p>
    );
  };

  return <CurrentBreakpoint />;
});
