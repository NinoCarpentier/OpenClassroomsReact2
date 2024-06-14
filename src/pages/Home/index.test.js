import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import Home from "./";
import { ThemeProvider } from "../../utils/context";

describe("The home component", () => {
  it("should render component whithout crash", () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <Home />
        </ThemeProvider>
      </MemoryRouter>
    );
  });
  it("should render title", () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <Home />
        </ThemeProvider>
      </MemoryRouter>
    );
    screen.getByRole("heading", {
      level: 2,
      text: "Repérez vos besoins, on s’occupe du reste, avec les meilleurs talents",
    });
  });
});
