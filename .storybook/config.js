import { configure } from "@storybook/react";

import "@storybook/addon-console";

configure(() => require("../story.tsx"), module);
