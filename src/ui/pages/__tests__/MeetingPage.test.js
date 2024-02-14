import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import { MeetingProvider } from "../../../data/contexts/MeetingContext";
import MeetingPage from "../MeetingPage";

let page;

beforeEach(() => {
  page = render(
    <Router>
      <MeetingProvider>
        <MeetingPage />
      </MeetingProvider>
    </Router>
  );
});

describe("MeetingPage", () => {
  test("Should show error on try to register past meeting", () => {
    const objectiveInput = page.getByRole("textbox", { name: /objective/i });

    fireEvent.change(objectiveInput, {
      target: { value: "New objective" },
    });
    expect(objectiveInput.value).toBe("New objective");

    const startDatetimeInput = page.getByLabelText("Start Date and Time");

    fireEvent.change(startDatetimeInput, {
      target: { value: "2001-03-15T13:00" },
    });
    expect(startDatetimeInput.value).toBe("2001-03-15T13:00");

    const endDatetimeInput = page.getByLabelText("End Date and Time");

    fireEvent.change(endDatetimeInput, {
      target: { value: "2001-01-15T13:01" },
    });
    expect(endDatetimeInput.value).toBe("2001-01-15T13:01");

    const submitButton = page.getByRole("button", { type: "submit" });

    const colaboratorCheckbox = page.getByLabelText("John Wick");

    fireEvent.click(colaboratorCheckbox);
    expect(colaboratorCheckbox.value).toBe("on");

    fireEvent.click(submitButton);

    const errorModal = page.getByTestId("errorModal");
    expect(errorModal).toBeInTheDocument();
  });

  test("Should show error when endtime > starttime", () => {
    const objectiveInput = page.getByRole("textbox", { name: /objective/i });

    fireEvent.change(objectiveInput, {
      target: { value: "New objective" },
    });
    expect(objectiveInput.value).toBe("New objective");

    const startDatetimeInput = page.getByLabelText("Start Date and Time");

    fireEvent.change(startDatetimeInput, {
      target: { value: "2034-03-15T13:00" },
    });
    expect(startDatetimeInput.value).toBe("2034-03-15T13:00");

    const endDatetimeInput = page.getByLabelText("End Date and Time");

    fireEvent.change(endDatetimeInput, {
      target: { value: "2034-01-15T13:01" },
    });
    expect(endDatetimeInput.value).toBe("2034-01-15T13:01");

    const submitButton = page.getByRole("button", { type: "submit" });

    const colaboratorCheckbox = page.getByLabelText("John Wick");

    fireEvent.click(colaboratorCheckbox);
    expect(colaboratorCheckbox.value).toBe("on");

    fireEvent.click(submitButton);

    const errorModal = page.getByTestId("errorModal");
    expect(errorModal).toBeInTheDocument();
  });
});
