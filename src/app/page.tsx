"use client";
import { useState } from "react";
import readXlsxFile from "read-excel-file";

export default function Home() {
  const [displayResult, setDisplayResult] = useState([]);

  return (
    <>
      <input
        type="file"
        id="input"
        onChange={(e) => {
          if (e.target.files) {
            let result: any = [];

            readXlsxFile(e.target.files[0]).then((rows) => {
              rows.forEach((row) => {
                if (!row[1]) {
                  return;
                }

                const newElement = {
                  number: row[0],

                  apps: [
                    {
                      name: "DialPhone",
                      params: {
                        number: row[1] || "",
                        timeout: "",
                        options: "",
                        msgForOperator: "",
                      },
                    },
                  ],
                  comment: "",
                };
                result.push(newElement);
              });

              setDisplayResult(result);
            });
          }
        }}
      />
      <div>Result: {JSON.stringify(displayResult)}</div>
    </>
  );
}
