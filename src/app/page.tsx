"use client";
import React, { ChangeEvent, useState } from 'react';
//import css
import './home.css'


// Define the type of the json data
type JsonData = { [key: string]: any };


const Page = () => {

  // Create a state to store the json data
  const [jsonData, setJsonData] = useState<JsonData>({});
  const [originalJsonData, setOriginalJsonData] = useState<JsonData>({});
  const [expandedKey, setExpandedKey] = useState<string | null>(null);

  const toggleExpansion = (key: string) => {
    setExpandedKey(expandedKey === key ? null : key);
  };
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
          const isChanged = jsonData[key] !== originalJsonData[key];
          // Check if the value is an object to render it as a nested object or as a simple input
          if(typeof jsonData[key] === 'object'){
            return (
              <div key={key}>
                <div>
                <h2 className="font-bold cursor-pointer" onClick={() => toggleExpansion(key)}>
                  {key}:
                </h2>
                </div>
                <div className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
                    expandedKey === key ? 'max-h-96' : 'max-h-0'
                  }`}> 
                {Object.keys(jsonData[key]).map((subKey) => (
                  <div key={subKey} className="flex flex-wrap justify-center">
                    <h3 className="font-bold">{subKey + ":"}</h3>
                    <input className="text-black border-2 border-gray-300 rounded-lg w-1/2 p-2 m-2"
                      type="text"
                      value={jsonData[key][subKey]}
                      onChange={(e) => setJsonData({ ...jsonData, [key]: { ...jsonData[key], [subKey]: e.target.value } })}
                    />
                    {isChanged ? (
                      <span className="text-red-500 font-bold">Modified</span>
                    ) : null }
                  </div>
                ))}
                </div>
              </div>
            )
          }
          // return (<div key={key}>
          return (<div key={key} className="flex flex-col justify-center">
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
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type='button'
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