import { useState } from "react";
import { useEffect } from "react";
import "./index.css";

const App = () => {
  const [text, setText] = useState("");
  const [status, setStatus] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const maxLength = 300;

  const handleChange = (e) => {
    setText(e.target.value);
    setStatus("Not saved");
  };
  //Auto-load the notes from the localStorage, if there's a note
  useEffect(() => {
    const savedNote = localStorage.getItem("notes");
    if (savedNote) setText(savedNote);
  }, []);

  //when change happens, this Timeout gives a bit buffering, and then saved the input to localStorage
  useEffect(() => {
    setTimeout(() => {
      setStatus("✅Saved!");
      localStorage.setItem("notes", text);
    }, 1500);
  }, [text]);

  //clearbutton function
  const clearNote = () => {
    setText("");
    setStatus("Cleared");
    localStorage.removeItem("notes", text);
  };

  const darkModeToggle = () => {
    setDarkMode((prev) => !prev);
  };
  const styles = darkMode ? "text-white" : "text-black";
  return (
    <div
      className={`mx-auto w-full h-[100vh] p-8 flex justify-center items-center
         ${darkMode ? "bg-blue-700" : "bg-white"}`}
    >
      <div
        className={`w-xl mx-auto 
           p-6 shadow rounded ${darkMode ? "bg-white" : "bg-yellow-50"}`}
      >
        <div className="flex flex-row justify-between">
          <h1 className={`text-2xl font-bold mb-4 text-blue-700`}>
            📝 Your Note
          </h1>
          <label>
            <input
              type="checkbox"
              onChange={darkModeToggle}
              className="w-4 h-4"
            />
            Dark Mode
          </label>
        </div>
        <textarea
          value={text}
          onChange={handleChange}
          className="w-full h-40 p-3 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="Type something interesting..."
        ></textarea>
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>
            Characters:
            <span
              className={`${
                text.length >= 200 ? "text-yellow-600" : "text-gray-600"
              }`}
            >
              {text.length}
            </span>
            /{maxLength}
          </span>
          <span
            className={`font-medium ${
              status === "Saved"
                ? "text-green-600"
                : status === "Cleared"
                ? "text-yellow-600"
                : "text-red-600"
            }`}
          >
            {status}
          </span>
        </div>
        <button
          onClick={clearNote}
          className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition-all"
        >
          Clear Note
        </button>
      </div>
    </div>
  );
};

export default App;
