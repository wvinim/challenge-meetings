import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TextInput from "../TextInput";

describe("TextInput component", () => {
  test("renders with correct label and calls onChange handler", () => {
    const label = "Objective";
    const name = "objective";
    const value = "";
    const onChangeMock = jest.fn();
    const { getByLabelText } = render(
      <TextInput
        label={label}
        name={name}
        value={value}
        onChange={onChangeMock}
      />
    );

    const input = getByLabelText(label);
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "New objective" } });

    expect(onChangeMock).toHaveBeenCalledWith(expect.any(Object));
  });
});
