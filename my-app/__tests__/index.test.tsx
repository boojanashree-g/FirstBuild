import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../app/page"; // Adjust the import path based on your project structure

  test("renders the heading", () => {
    render(<Home />);
    const heading = screen.getByText(/Our Features/i);
    expect(heading).toBeInTheDocument();
  });

  test("renders all feature titles", () => {
    render(<Home />);
    const features = [
      "AI Course Builder",
      "Video Generate AI",
      "Live Event",
      "AI Knowledge Center",
      "Quizzes",
      "Build Scenario",
      "AI Podcast",
      "MetaMAZE"
    ];
    
    features.forEach(feature => {
      expect(screen.getByText(feature)).toBeInTheDocument();
    });
  });

  test("renders the Request a DEMO button", () => {
    render(<Home />);
    const button = screen.getByText(/Request a DEMO/i);
    expect(button).toBeInTheDocument();
  });
