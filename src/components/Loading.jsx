const Loading = () => {
  return (
    <center style={{ marginTop: "10rem" }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <h2>There are no posts yet.</h2>
    </center>
  );
};

export default Loading;
