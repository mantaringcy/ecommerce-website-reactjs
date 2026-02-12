import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        gap: "12px",
      }}
    >
      <h1 style={{ color: "crimson" }}>404 Not Found</h1>

      <Link to="/">
        <button
          className="btn"
          style={{
            background: "crimson",
            color: "white",
            borderRadius: "100px",
          }}
        >
          Go to home
        </button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
