import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import { MeetingProvider } from "../../../data/contexts/MeetingContext";
import MeetingForm from "../MeetingForm";

let page;

beforeEach(() => {
  page = render(
    <Router>
      <MeetingProvider>
        <MeetingForm />
      </MeetingProvider>
    </Router>
  );
});

describe("MeetingForm", () => {
  test("Should renders form fields", () => {
    const objectiveField = screen.getByLabelText("Objective");
    const startDateTimeField = screen.getByLabelText("Start Date and Time");
    const endDateTimeField = screen.getByLabelText("End Date and Time");
    const submitButton = screen.getByText("Submit");

    expect(objectiveField).toBeInTheDocument();
    expect(startDateTimeField).toBeInTheDocument();
    expect(endDateTimeField).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test("Should validate objective field", () => {
    const objectiveInput = page.getByLabelText("Objective");

    fireEvent.change(objectiveInput, { target: { value: "New objective" } });

    expect(objectiveInput.value).toBe("New objective");
  });

  test("Should not validate objective field", () => {
    const objectiveInput = page.getByLabelText("Objective");

    fireEvent.change(objectiveInput, {
      target: { value: "[[[[[New objective]]]]]" },
    });

    expect(objectiveInput.value).not.toBe("[[[[[New objective]]]]]");
  });
});
