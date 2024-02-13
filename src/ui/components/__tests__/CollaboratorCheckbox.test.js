import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CollaboratorCheckbox from "../CollaboratorCheckbox";

describe("CollaboratorCheckbox component", () => {
  test("renders with correct collaborator name and toggles checked state", () => {
    const collaboratorName = "John Doe";
    const onChangeMock = jest.fn();
    const { getByLabelText } = render(
      <CollaboratorCheckbox
        collaborator={collaboratorName}
        checked={false}
        onChange={onChangeMock}
      />
    );

    expect(getByLabelText(collaboratorName)).toBeInTheDocument();

    fireEvent.click(getByLabelText(collaboratorName));

    expect(onChangeMock).toHaveBeenCalled();
  });
});
