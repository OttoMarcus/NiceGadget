import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders App component", () => {
  const { container } = render(<App />);
  expect(container.firstChild).toMatchSnapshot();
});
