import React from "react";
import { render, fireEvent } from "@testing-library/react";
import DateTimePicker from "../DateTimePicker";

describe("DateTimePicker component", () => {
  test("renders with correct label and calls onChange handler", () => {
    const label = "Start Date and Time";
    const name = "start-datetime";
    const value = "2022-02-15T12:00";
    const onChangeMock = jest.fn();
    const { getByLabelText } = render(
      <DateTimePicker
        label={label}
        name={name}
        value={value}
        onChange={onChangeMock}
      />
    );

    expect(getByLabelText(label)).toBeInTheDocument();

    const input = getByLabelText(label);
    fireEvent.change(input, { target: { value: "2022-02-15T13:00" } });

    expect(onChangeMock).toHaveBeenCalledWith(expect.any(Object));
  });
});
