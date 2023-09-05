import React from "react";
import Cards from "./Cards";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "../context/authContext";

describe("<Cards />", () => {
  const cardMock = {
    id: "Qkh5ZhADmEeVzudtZTHb",
    data: {
      blocked: false,
      completed: false,
      title: "tarefa 1",
      description: "description 1",
      createBy: "fernando.ocrim@gmail.com",
    },
  };

  const userMock = { email: "fernando.ocrim@gamil.com" };
  beforeEach(() => {
    cy.mount(
      <BrowserRouter>
        <AuthContextProvider>
          <Cards task={cardMock} user={userMock} />
        </AuthContextProvider>
      </BrowserRouter>
    );
  });
  it("should render card", () => {
    cy.contains("tarefa 1").should("exist");
  });
  it("should complete task", () => {
    cy.get('[data-testid="complete-button"]').click();
  });
});
