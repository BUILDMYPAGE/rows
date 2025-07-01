const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <span className="loading-text">{message}</span>
    </div>
  );
};

export default LoadingSpinner;
