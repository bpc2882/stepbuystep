import { Link } from "react-router-dom";
import robots from "./assets/teamrobot.png";

export default function About() {
  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold mb-6">About Us</h1>
      <p className="text-xl mb-6">Coming soon...</p>
      <img src={robots} alt="Zany robots at work" className="mx-auto mb-8 rounded-xl shadow-lg" />

      <Link
        to="/"
        className="inline-block mt-6 bg-[#3E5C3A] text-white px-6 py-3 rounded-lg shadow-md hover:scale-105 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}