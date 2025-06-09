export default function UnAuthorized() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1 style={{ textAlign: "center", textTransform: "uppercase" }}>
        You are not authorized to access this page
      </h1>
    </div>
  );
}
