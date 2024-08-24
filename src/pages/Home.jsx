import img from "../assets/sky.gif";

const Home = () => {
  return (
    <>
      <div className="relative">
        <div className="px-10 md:px-20 flex mt-20 flex-col md:flex-row relative">
          {/* Left-side */}
          <div className="w-full md:w-5/5 flex flex-col gap-9 z-10">
            <h1 className="text-4xl md:text-6xl font-bold">
              <span className="typing-effect line-1">
                Welcome to <span className="text-blue-400">Daily's</span>
              </span>
              <br />
              <span className="typing-effect line-2">
                <span className="text-blue-400">Routine</span> Website
              </span>
            </h1>
            <p>
              Build a better day every day by embracing positive habits and
              making intentional choices that lead you to continuous improvement
              and lasting fulfillment.
            </p>
          </div>

          {/* Image */}
          <div className="w-full md:w-2/3 md:ml-40 md:mt-[-100px]">
            <img
              src={img}
              alt=""
              className="w-2/3 mx-auto md:w-full" // Adjust width for mobile and larger screens
            />
          </div>
        </div>
      </div>
      <div className="w-72 h-24 bg-blue-400 absolute left-20 top-28 blur-3xl z-0"></div>
      
      {/* Scrolling Text */}
      <div className="mt-4 pl-25">
        <h4 className="text-xl font-medium text-center text-blue-400 italic md:text-2xl">
          "Success is the sum of small efforts, repeated day in and day out."
        </h4>
      </div>
    </>
  );
};

export default Home;
