import { screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import App from "../App";

it("renders correctly", () => {
  const component = renderer.create(<App />);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});