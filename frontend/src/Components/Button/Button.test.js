import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import Button from "./Button";

describe("Button tests: ", () => {
  test("should be clickable and have text", () => {
    const btn = render(<Button btnName={"Click me"} />);

    expect(btn).toMatchSnapshot();
  });
});
