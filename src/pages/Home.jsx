import { useNavigate } from "react-router-dom";
import { AiFillFileText, AiFillBulb } from "react-icons/ai";
import { BsStarFill } from "react-icons/bs";
import { RiLeafLine } from "react-icons/ri";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-white text-black">


      <nav className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-8 py-4 shadow gap-3 sm:gap-0">
        <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
          📚 Summarist
        </h1>

        <ul className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm sm:text-base">
          <li onClick={() => navigate("/for-you")} className="cursor-pointer hover:text-green-500">
            Login
          </li>
          <li className="cursor-pointer">About</li>
          <li className="cursor-pointer">Contact</li>
          <li className="cursor-pointer">Help</li>
        </ul>
      </nav>


      <section className="flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 md:px-10 py-10 md:py-16 gap-6">

        <div className="max-w-lg text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            Gain more knowledge <br />
            in less time
          </h1>

          <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
            Great summaries for busy people who barely have time to read.
          </p>

          <button
            onClick={() => navigate("/for-you")}
            className="bg-green-500 text-white px-5 py-2 sm:px-6 sm:py-3 rounded-lg text-sm sm:text-lg"
          >
            Login
          </button>
        </div>

        <img
          src="https://images.unsplash.com/photo-1512820790803-83ca734da794"
          className="w-full max-w-[280px] sm:max-w-[350px] md:w-[400px]"
        />
      </section>


      <section className="text-center py-10 sm:py-16 px-4">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-10">
          Understand books in few minutes
        </h2>

        <div className="flex flex-col md:flex-row justify-center gap-8 sm:gap-12">

          <div>
            <AiFillFileText size={36} className="mx-auto mb-3" />
            <h3 className="font-bold">Read or listen</h3>
            <p className="text-gray-500 text-sm">
              Save time by getting the core ideas
            </p>
          </div>

          <div>
            <AiFillBulb size={36} className="mx-auto mb-3" />
            <h3 className="font-bold">Find your next read</h3>
            <p className="text-gray-500 text-sm">
              Explore personalized recommendations
            </p>
          </div>

          <div>
            <RiLeafLine size={36} className="mx-auto mb-3" />
            <h3 className="font-bold">Briefcasts</h3>
            <p className="text-gray-500 text-sm">
              Learn faster with audio summaries
            </p>
          </div>

        </div>
      </section>


      <section className="py-12 sm:py-20 px-4 sm:px-6 md:px-10 bg-gray-50">

        <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-center mb-12 md:mb-16">

          <div className="space-y-2 text-base sm:text-lg md:text-xl font-semibold text-center md:text-left">
            <p className="text-green-500">Enhance your knowledge</p>
            <p>Achieve greater success</p>
            <p>Improve your health</p>
            <p>Develop better parenting skills</p>
            <p>Increase happiness</p>
            <p>Be the best version of yourself!</p>
          </div>

          <div className="space-y-4 sm:space-y-6 bg-gray-100 p-4 sm:p-6 rounded-lg text-sm sm:text-base">
            <div>
              <span className="text-blue-600 font-bold text-lg sm:text-xl">93%</span>
              <p className="text-gray-700">increase reading frequency.</p>
            </div>
            <div>
              <span className="text-blue-600 font-bold text-lg sm:text-xl">96%</span>
              <p className="text-gray-700">build better habits.</p>
            </div>
            <div>
              <span className="text-blue-600 font-bold text-lg sm:text-xl">90%</span>
              <p className="text-gray-700">make positive changes.</p>
            </div>
          </div>
        </div>

      </section>


      <section className="py-12 sm:py-20 px-4 sm:px-6 md:px-10 bg-white">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 sm:mb-12">
          What our members say
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {[1, 2, 3, 4].map((_, i) => (
            <div key={i} className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow-sm">
              <div className="flex justify-between mb-2">
                <p className="font-semibold text-sm sm:text-base">User</p>
                <div className="flex text-yellow-400">
                  <BsStarFill /><BsStarFill /><BsStarFill /><BsStarFill /><BsStarFill />
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                Great app for saving time and learning fast.
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <button
            onClick={() => navigate("/for-you")}
            className="bg-green-500 text-white px-5 py-2 sm:px-6 sm:py-3 rounded-lg"
          >
            Login
          </button>
        </div>
      </section>


      <section className="bg-gray-900 text-white py-10 sm:py-16 px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 text-sm">

          <div>
            <h3 className="font-semibold mb-3">Actions</h3>
            <ul className="space-y-1 text-gray-400">
              <li>Help</li>
              <li>Contact</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Links</h3>
            <ul className="space-y-1 text-gray-400">
              <li>Pricing</li>
              <li>Business</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Company</h3>
            <ul className="space-y-1 text-gray-400">
              <li>About</li>
              <li>Careers</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Legal</h3>
            <ul className="space-y-1 text-gray-400">
              <li>Terms</li>
              <li>Privacy</li>
            </ul>
          </div>

        </div>

        <div className="text-center text-gray-500 text-xs sm:text-sm border-t border-gray-700 pt-4 mt-6">
          © 2026 Summarist
        </div>
      </section>

    </div>
  );
}

export default Home;