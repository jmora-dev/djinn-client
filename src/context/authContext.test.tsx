import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useContext } from "react";
import { AuthContext, AuthContextProvider } from "./authContext";

const TestComponent = () => {
  const { isAuthenticated, user, login, logout } = useContext(AuthContext);
  return (
    <div>
      <p>IsAuthenticated: {isAuthenticated.toString()}</p>
      {user ? <p>User name: {user.name}</p> : <p>User undefined</p>}
      <button onClick={() => login({ name: "testUser" })}>Login</button>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

describe("Given auth context", () => {
  describe("When use login and logout actions", () => {
    test("In login should display user name and in logout should display user undefined", async () => {
      render(
        <AuthContextProvider>
          <TestComponent />
        </AuthContextProvider>
      );
      screen.getByText("IsAuthenticated: false");
      screen.getByText("User undefined");
      const loginButton = screen.getByText("Login");
      userEvent.click(loginButton);
      await screen.findByText("IsAuthenticated: true");
      await screen.findByText("User name: testUser");
      const logoutButton = screen.getByText("Logout");
      userEvent.click(logoutButton);
      await screen.findByText("IsAuthenticated: false");
      await screen.findByText("User undefined");
    });
  });
});
