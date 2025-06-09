import Nav from "../../features/home/Nav";
import styled from "styled-components";
import ImageSlider from "../components/ImageSlide";
// import { Link } from "react-router-dom";
// import { Navigate } from "react-router-dom";
// import { useUser } from "../hooks/useUser";

const Main = styled.div`
  /* padding: 2px;
  position: relative;
  height: 89vh;
  background-image: url("/qqq.png");
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column; */
`;

// const Timer = styled.div`
//   display: flex;
//   justify-content: center;
// `;

// const Box = styled.div`
//   width: 100px;
//   padding: 2rem;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   backdrop-filter: blur(100px);
//   margin: 1rem;
//   border-radius: 10px;
//   color: white;
//   border: 2px solid white;
// `;

// const H2 = styled.h2`
//   font-size: 3rem;
//   text-transform: capitalize;
//   text-align: center;
// `;
// const Img = styled.img`
//   height: 100%;
//   position: absolute;
// `;
// const TextBox = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
// `;

// const Form = styled.form`
//   display: flex;
//   padding: 2rem;
//   gap: 5px;
// `;

export default function Home() {
  // const { user, isLoading } = useUser();

  // const [days, setDays] = useState(0);
  // const [hours, setHours] = useState(0);
  // const [munites, setMunites] = useState(0);
  // const [seconds, setSeconds] = useState(0);

  // useEffect(() => {
  //   const countDown = new Date("May 30, 2025").getTime();
  //   const interval = setInterval(() => {
  //     const now = new Date().getTime();
  //     const distance = countDown - now;

  //     const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  //     const hours = Math.floor(
  //       (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  //     );
  //     const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  //     const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  //     setDays(days);
  //     setHours(hours);
  //     setMunites(minutes);
  //     setSeconds(seconds);

  //     return () => clearInterval(interval);
  //   }, 1000);
  // }, []);

  // if (isLoading) return <h1>Loading...</h1>;

  // const currentUser = user?.data.data.data;

  // if (currentUser?.role === "admin")
  //   return <Navigate to="/admin/dashboard" replace />;
  // if (currentUser?.role === "seller")
  //   return <Navigate to="/seller/dashboard" replace />;

  return (
    <div style={{ height: "100vh" }}>
      <Nav />
      <Main>
        <ImageSlider />
        {/* <div>
          <Link to="/admin/login">admin login</Link>
          <Link to="/seller/login">seller login</Link>
          <Link to="/login">user login</Link>
        </div>

        <h1
          style={{
            textAlign: "center",
            textTransform: "uppercase",
            color: "gold",
          }}
        >
          We are coming soon!!!
        </h1>
        <Timer>
          <Box>
            <span>{days}</span>
            <span>Days</span>
          </Box>
          <Box>
            <span>{hours}</span>
            <span>Hours</span>
          </Box>
          <Box>
            <span>{munites}</span>
            <span>Munites</span>
          </Box>
          <Box>
            <span>{seconds}</span>
            <span>Seconds</span>
          </Box>
        </Timer>
        <TextBox>
          <H2>experinces the best shopping in Accra and the whole of Ghana</H2>
          <p>
            Upgrade is on the way.you the submit your email for newsLetter
            below:
          </p>
          <Form style={{ backgroundColor: "red", width: "40%" }}>
            <div>
              <label> Email address</label>
              <input
                name="email"
                type="email"
                htmlFor="email"
                placeholder="Enter your email address..."
              />
            </div>
            <button>Submit</button>
          </Form>
        </TextBox> */}
      </Main>
    </div>
  );
}
