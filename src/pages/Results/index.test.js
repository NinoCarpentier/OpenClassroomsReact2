import { rest } from "msw";
import { setupServer } from "msw/node";
import { waitForElementToBeRemoved, screen } from "@testing-library/react";

import { formatJobList, formatQueryParams } from "./";
import Results from "./";
import { render } from "../../utils/tests";

describe("Function formatJobList", () => {
  it("Should add a comma to a word", () => {
    const expectedState = "item2,";
    expect(formatJobList("item2", 3, 1)).toEqual(expectedState);
  });

  it("Should not add a comma to the last element of the list", () => {
    const expectedState = "item3";
    expect(formatJobList("item3", 3, 2)).toEqual(expectedState);
  });
});

describe("Function formatQueryParams", () => {
  it("Should return the right params", () => {
    const answers = {
      1: false,
      2: true,
      3: false,
      4: true,
      5: false,
      6: true,
    };
    const queryParams = formatQueryParams(answers);
    expect(queryParams).toEqual(
      "a1=false&a2=true&a3=false&a4=true&a5=false&a6=true"
    );
  });

  it("Should return the right question numbers with the right responses", () => {
    const answers = {
      2: true,
      3: false,
      4: true,
      6: true,
    };
    const queryParams = formatQueryParams(answers);
    expect(queryParams).toEqual("a2=true&a3=false&a4=true&a6=true");
  });

  it("Should use the right format for param", () => {
    const expectedState = "a1=answer1";
    expect(formatQueryParams({ 1: "answer1" })).toEqual(expectedState);
  });

  it("Should concatenate params with an &", () => {
    const expectedState = "a1=answer1&a2=answer2";
    expect(formatQueryParams({ 1: "answer1", 2: "answer2" })).toEqual(
      expectedState
    );
  });
});

const resultsMockedData = [
  {
    title: "seo",
    description: `Le SEO est en charge du référencement web d'une page`,
  },
  {
    title: "frontend",
    description: `Le développeur ou la développeuse frontend se charge de l'interface : interactions avec l'utilisateur, style, etc.`,
  },
];

const server = setupServer(
  rest.get(`http://localhost:8000/results`, (req, res, ctx) => {
    return res(ctx.json({ resultsData: resultsMockedData }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("The Results component", () => {
  it("Should return the right result", async () => {
    render(<Results />);

    await waitForElementToBeRemoved(() => {
      screen.getByTestId("loader").toBeTruthy();
    });
    const jobTitleElements = screen.getAllByTestId("job-title");
    expect(jobTitleElements[0].textContent).toBe("seo");
    expect(jobTitleElements.length).toBe(2);
    const jobDescriptionElements = screen.getAllByTestId("job-description");
    expect(jobDescriptionElements[1].textContent).toBe(
      resultsMockedData[1].description
    );
    expect(jobDescriptionElements.length).toBe(2);
  });
});
