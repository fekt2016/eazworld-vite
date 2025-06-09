import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// import SpinnerMini from "../../ui/SpinnerMini";

export default function Login() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();
    // loginUser(state, {
    //   onSuccess: () => {
    //     setState({ email: "", password: "" });
    //   },
    // });

    navigate("/");
  };

  return (
    <div>
      <h1>Login</h1>
      {/* {error && <p>{error.response.data.message}</p>} */}
      <p>Enter your email and password to login</p>
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
        {/* <button type="submit">{isLoading ? <SpinnerMini /> : "Submit"}</button> */}
      </form>
      <p>
        Click <Link to="/register">here</Link> to register
      </p>
    </div>
  );
}
