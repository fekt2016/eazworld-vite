import { Link } from "react-router-dom";
import { FaFacebook, FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";

export default function Register() {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    number: "",
    passwordConfirm: "",
    check: false,
  });

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(state);
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="name">name</label>
          <input
            type="name"
            id="name"
            name="name"
            value={state.name}
            onChange={(e) => setState({ ...state, name: e.target.value })}
            required
          />
        </div>
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
        <div>
          <label htmlFor="passwordConfirm">passwordConfirm</label>
          <input
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            value={state.passwordConfirm}
            onChange={(e) =>
              setState({ ...state, passwordConfirm: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label htmlFor="Number">phone Number</label>
          <input
            type="Number"
            id="Number"
            name="Number"
            value={state.number}
            onChange={(e) => setState({ ...state, number: e.target.value })}
            required
          />
        </div>
        <div>
          <input
            type="checkbox"
            id="check"
            name="check"
            onChange={(e) => setState({ ...state, check: e.target.checked })}
            required
          />
          <label htmlFor="check">I agree with the privacy policy & terms</label>
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an Account <Link to="/login">Click here</Link> to login
      </p>
      <div>
        <div></div>
        <p>or</p>
        <div></div>
      </div>
      <div>
        <FaFacebook />
        <FcGoogle />
        <FaApple />
      </div>
    </div>
  );
}
