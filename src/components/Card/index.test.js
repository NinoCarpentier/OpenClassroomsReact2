import { fireEvent, render, screen } from "@testing-library/react";

import Card from "./";
import { ThemeProvider } from "../../utils/context";
import profile from "../../assets/profile.png";

describe("The Card component", () => {
  it("should render the right picture", () => {
    render(
      <ThemeProvider>
        <Card
          label={"Développeur backend"}
          picture={profile}
          title={"Henry MacBird"}
        />
      </ThemeProvider>
    );
    const profileImage = screen.getByRole("img");
    expect(profileImage.src).toBe("http://localhost/profile.png");
  });

  it("should render the right title", () => {
    render(
      <ThemeProvider>
        <Card
          label={"Développeur backend"}
          picture={profile}
          title={"Henry MacBird"}
        />
      </ThemeProvider>
    );
    const title = screen.getByText(/Henry/i);
    expect(title.textContent).toBe(" Henry MacBird ");
  });

  it("should render a favorite title", () => {
    render(
      <ThemeProvider>
        <Card
          label={"Développeur backend"}
          picture={profile}
          title={"Henry MacBird"}
        />
      </ThemeProvider>
    );
    const element = screen.getByText("Développeur backend");
    // eslint-disable-next-line testing-library/no-node-access
    const closestDiv = element.closest("div");
    fireEvent.click(closestDiv);
    const favoriteTitle = screen.getByText("⭐️ Henry MacBird ⭐️");
    expect(favoriteTitle).toBeTruthy();
  });
});
