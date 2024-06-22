"use client";
import React, { ChangeEvent, useState } from 'react';


// Define the type of the json data
type JsonData = { [key: string]: any };

const Page = () => {

  // Create a state to store the json data
  const [jsonData, setJsonData] = useState<JsonData>({});
  const [originalJsonData, setOriginalJsonData] = useState<JsonData>({});

  // Handle the file change event
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      //clear the previous data
      setJsonData({});
      setOriginalJsonData({});
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const result = JSON.parse(e.target!.result as string);
        setJsonData(result);
        setOriginalJsonData(result);
      };
      reader.readAsText(file);
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center">
      <h1 className="text-3xl font-bold">Import your json file</h1>
      <input type="file" accept=".json" onChange={handleFileChange} />
      <div>
        {Object.keys(jsonData).map((key) => {
          const value = jsonData[key];
          const isChanged = value !== originalJsonData[key];
          return (<div key={key} className="flex flex-wrap justify-center">
            <h2 className="font-bold">{key + ":"}</h2>
            <input className="text-black border-2 border-gray-300 rounded-lg w-1/2 p-2 m-2"
              type="text"
              value={jsonData[key]}
              onChange={(e) => setJsonData({ ...jsonData, [key]: e.target.value })}
              />
              {isChanged ? (
                <span className="text-red-500 font-bold">Modified</span>
              ) : null }
          </div>)
})}
        <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            const element = document.createElement("a");
            const file = new Blob([JSON.stringify(jsonData)], { type: 'application/json' });
            element.href = URL.createObjectURL(file);
            element.download = "modified.json";
            document.body.appendChild(element);
            element.click();
          }}
        >
          Export modified json
        </button>
      </div>
    </main>
  );
};

export default Page;