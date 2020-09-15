import React from "react";
import { render } from "@testing-library/react";
import Books from "./books.component";

describe("Root component", () => {
  it("should be in the document", () => {
    const { getByText } = render(<Books name="Testapp" />);
    expect(getByText(/Testapp is mounted!/i)).toBeInTheDocument();
  });
});
