import { useState } from "react";

import { PropagateLoader } from "react-spinners";
import useSellerAuth from "../../hooks/auth/useSellerAuth";
import { useNavigate } from "react-router-dom";

export default function SellerLogin() {
  const { login } = useSellerAuth();
  const Navigate = useNavigate();

  const [state, setState] = useState({
    email: "fekt20004@gmail.com",
    password: "12345678",
  });
  const submitHandler = async (e) => {
    e.preventDefault();
    await login.mutateAsync(state);
    Navigate("/seller/dashboard");
  };

  const override = {
    display: "flex",
    margin: "0 auto",
    height: "24px",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <div>
      <h1>seller Login</h1>
      {login.error && <p>{login.error.response.data.message}</p>}
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={state.email}
            onChange={(e) => setState({ ...state, email: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={state.password}
            onChange={(e) => setState({ ...state, password: e.target.value })}
            required
          />
        </div>
        <button type="submit" disabled={login.isLoading}>
          {login.isLoading ? (
            <PropagateLoader cssOverride={override} />
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
}
