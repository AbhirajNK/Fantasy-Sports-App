const LoadingScreen = () => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-purple-900">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-pink-500 mx-auto mb-4"></div>
      <p className="text-white text-lg">Loading matches...</p>
    </div>
  </div>
);

export default LoadingScreen;