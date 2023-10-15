import { useCallback, useEffect, useRef, useState } from "react";

const App = () => {
  const [length, setLength] = useState(8);
  const [num, setNum] = useState(false);
  const [char, setChar] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef();

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (num) str += "0123456789";
    if (char) str += "!@#$%&*";
    for (let i = 1; i <= length; i++) {
      let newChar = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(newChar);
    }
    setPassword(pass);
  }, [length, num, char, setPassword]);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, num, char, passwordGenerator]);

  return (
    <>
      <div className=" h-screen bg-black flex justify-center">
        <div className="my-10 text-white">
          <h1 className=" text-3xl md:text-5xl text-center italic">
            Generate Random Password{" "}
          </h1>
          <div className="flex flex-col md:flex-row md:justify-center items-center my-10 mx-7">
            <input
              type="text"
              placeholder="Generate Password..."
              className=" w-full md:w-96 h-14 text-xl outline-none border-2 border-blue-600 px-6 py-2 text-black my-5"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              ref={passwordRef}
              readOnly
            />
            <button
              type="submit"
              className=" w-28 md:w-40 h-10 md:h-14 self-end md:self-center md:ml-5 text-xl rounded-sm bg-blue-400 cursor-pointer hover:bg-green-400"
              onClick={copyPassword}
            >
              Copy
            </button>
          </div>
          <div className="flex flex-col md:flex-row md:justify-center md:items-center mx-7 ">
            <p className="flex items-center my-2 md:mr-10">
              <input
                type="range"
                id="Characters"
                className=" w-28 cursor-pointer "
                defaultValue={length}
                min={8}
                max={20}
                onChange={(e) => setLength(e.target.value)}
              />
              <label htmlFor="Characters" className=" ml-3 text-lg">
                Characters ( {length} )
              </label>
            </p>
            <p className="flex items-center my-2 md:mr-10">
              <input
                type="checkbox"
                id="Numbers"
                className=" w-6 h-6 cursor-pointer"
                onChange={() => setNum((pre) => !pre)}
              />
              <label htmlFor="Numbers" className=" ml-3 text-lg">
                Numbers
              </label>
            </p>
            <p className="flex items-center">
              <input
                type="checkbox"
                id="Symbols"
                className=" w-6 h-6 cursor-pointer"
                onChange={() => setChar((pre) => !pre)}
              />
              <label htmlFor="Symbols" className=" ml-3 text-lg">
                Symbols
              </label>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
