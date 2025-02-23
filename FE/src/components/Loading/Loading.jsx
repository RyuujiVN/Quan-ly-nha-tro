import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading">
      <div className="loading-inner">
        <div className="spinner-1"></div>
        <span className="loading-text">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
