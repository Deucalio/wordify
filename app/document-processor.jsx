"use client";

import { FileText, Download, Check } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

// List of files in the public directory
const documentFiles = [
  "/files/1. Interview.docx",
  "files/2. Application Form.docx",
  "files/3. Telephone Screening.docx",
  "files/4. Competence Form.docx",
  "files/6. Employment Contract.docx",
  "files/8. Induction Training.docx",
  "files/09. Screening progress sheet.docx",
  "files/10. Email Reference university.docx",
  "files/12. Uniform Issue record form.docx",
  "files/13. Environmental training.docx",
  "files/14. WTR 48 hour opt out agreement.docx",
  "files/15. Medical Questionnaire.docx",
];

export default function DocumentProcessor({ formData }) {
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [fileReplacements, setFileReplacements] = useState({});
  const [logs, addLog] = useState([]);

  function formatDate_(dateStr) {
    console.log(dateStr);
    dateStr = dateStr.split(" ")[0];
    console.log("s: ", dateStr);
    // Split the input date string into day, month, and year
    const [day, month, year] = dateStr.split("/");

    // Define an array of month names
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Convert month (which is 01-12) to the full month name
    const monthName = months[parseInt(month) - 1];

    // Return the formatted date
    return `${day}-${monthName}-${year}`;
  }

  function formatDate__(dateStr) {
    // Parse the input date string to a JavaScript Date object
    const date = new Date(dateStr);

    // Get the day, month, and year
    const day = String(date.getDate()).padStart(2, "0"); // Ensures two digits for the day
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month (0-indexed)
    const year = date.getFullYear();

    // Return the formatted date as DD-MM-YYYY
    return `${day}-${month}-${year}`;
  }

  // Format dates for document use
  const formatDate = (date, format = "standard") => {
    if (!date) return "";

    // If date is already a string in the expected format, return it
    if (typeof date === "string") {
      // Try to parse the string date if needed for formatting
      try {
        // Check if it's in DD-MM-YYYY format
        if (/^\d{1,2}-\d{1,2}-\d{4}$/.test(date)) {
          const [day, month, year] = date.split("-").map(Number);
          const d = new Date(year, month - 1, day);

          if (format === "long") {
            const options = {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            };
            return d.toLocaleDateString("en-US", options);
          } else if (format === "ordinal") {
            const suffix = getOrdinalSuffix(day);
            const monthNames = [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ];
            return `${day}${suffix} of ${monthNames[month - 1]} ${year}`;
          }

          // If no special formatting needed, return the original string
          return date;
        }

        // If it's already in a different format, just return it
        return date;
      } catch (e) {
        console.error("Error parsing date string:", e);
        return date; // Return the original string if parsing fails
      }
    }

    // Handle Date objects (legacy support)
    if (date instanceof Date) {
      if (format === "standard") {
        return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
      } else if (format === "long") {
        const options = {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        };
        return date.toLocaleDateString("en-US", options);
      } else if (format === "ordinal") {
        const day = date.getDate();
        const suffix = getOrdinalSuffix(day);
        const month = date.toLocaleString("default", { month: "long" });
        return `${day}${suffix} of ${month} ${date.getFullYear()}`;
      }

      return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    }

    return "";
  };

  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

//   Prepare form data for document replacements
  useEffect(() => {
    if (!formData) return;

    // form Data = {
    //     "firstName": "my first name",
    //     "lastName": "my last name",
    //     "dateOfBirth": "1971",
    //     "jobTitle": "Mr.",
    //     "positionAppliedFor": "my last name",
    //     "proofOfAddress": "full street address",
    //     "shirtsSize": "my last name",
    //     "trouserSize": "my last name",
    //     "nationality": "me@mydomain.com",
    //     "dateOfEntryToUK": "1971",
    //     "placeOfEntryToUK": "me@mydomain.com",
    //     "workPermit": "me@mydomain.com",
    //     "niNumber": "me@mydomain.com",
    //     "passportNumber": "me@mydomain.com",
    //     "siaLicenseSector": "me@mydomain.com",
    //     "siaLicenceNumber": "me@mydomain.com",
    //     "email": "me@mydomain.com",
    //     "mobile": "me@mydomain.com",
    //     "permanentAddress": "full street address",
    //     "permanentPostCode": "zip code or postal code",
    //     "permanentFrom": "1971",
    //     "permanentTo": "1971",
    //     "previousAddress": "full street address",
    //     "previousPostCode": "zip code or postal code",
    //     "previousFrom": "1971",
    //     "previousTo": "1971",
    //     "nextOfKinRelationship": "zip code or postal code",
    //     "nextOfKinName": "my full name",
    //     "nextOfKinMobile": "zip code or postal code",
    //     "nextOfKinAddress": "full street address",
    //     "nextOfKinPostCode": "zip code or postal code",
    //     "drivingLicenseType": "fd",
    //     "ownTransport": true,
    //     "drivingLicenseNumber": "gdfgdfg",
    //     "uniName": "my full name",
    //     "uniAddress": "full street address",
    //     "uniFrom": "1971",
    //     "uniTo": "1971",
    //     "uniGrades": "my full name",
    //     "collegeName": "my full name",
    //     "collegeAddress": "full street address",
    //     "collegeFrom": "1971",
    //     "collegeTo": "1971",
    //     "collegeGrades": "my full name",
    //     "emailDate1": "me@mydomain.com",
    //     "emailReply1": "me@mydomain.com",
    //     "emailDate2": "me@mydomain.com",
    //     "emailRe": "me@mydomain.com",
    //     "bankName": "my full name",
    //     "sortCode": "my full name",
    //     "accountNumber": "my full name",
    //     "job1CompanyName": "company name",
    //     "job1Address": "full street address",
    //     "job1PostCode": "zip code or postal code",
    //     "job1Tel": "(123) 456-7890",
    //     "job1Position": "occupation",
    //     "job1Manager": "occupation",
    //     "job1From": "occupation",
    //     "job1To": "occupation",
    //     "job1ReasonForLeaving": "occupation",
    //     "job2CompanyName": "company name",
    //     "job2Address": "full street address",
    //     "job2PostCode": "zip code or postal code",
    //     "job2Tel": "(123) 456-7890",
    //     "job2Position": "occupation",
    //     "job2Manager": "occupation",
    //     "job2From": "occupation",
    //     "job2To": "occupation",
    //     "job2ReasonForLeaving": "occupation",
    //     "telephoneScreeningDate": "(123) 456-7890",
    //     "employmentContractDate": "1971",
    //     "screeningProgressDate1": "1971",
    //     "screeningProgressDate2": "1971",
    //     "screeningPeriodFrom": "1971",
    //     "screeningPeriodTo": "1971",
    //     "environmentalTrainingDate": "1971"
    // }

  
    const fullName = `${formData.firstName} ${formData.lastName}`;
    const surName = formData.lastName;

    // Define replacements for each file
    const hardCodedInitials = {
        "1. Interview.docx": [
            {
              search: "ALI RAZA",
              replace: fullName,
              useRegex: true,
            },
          ],
    };

    // "files/2. Application Form.docx",
    // "files/3. Telephone Screening.docx",
    // "files/4. Competence Form.docx",
    // "files/6. Employment Contract.docx",
    // "files/8. Induction Training.docx",
    // "files/09. Screening progress sheet.docx",
    // "files/10. Email Reference university.docx",
    // "files/12. Uniform Issue record form.docx",
    // "files/13. Environmental training.docx",
    // "files/14. WTR 48 hour opt out agreement.docx",
    // "files/15. Medical Questionnaire.docx",

    setFileReplacements(hardCodedInitials);
  }, [formData]);

  const processDocuments = async () => {
    try {
      setProcessing(true);
      setProgress(0);
      setIsComplete(false);

      // Create a new zip file to store all modified documents
      const outputZip = new JSZip();

      // Process each document
      for (let i = 0; i < documentFiles.length; i++) {
        const filePath = documentFiles[i];
        const fileName = filePath.split("/").pop() || `file${i}`;
        const fileExtension = fileName.split(".").pop()?.toLowerCase();

        // Skip if no replacements for this file
        if (
          !fileReplacements[fileName] ||
          fileReplacements[fileName].length === 0
        ) {
          console.log(`Skipping ${fileName} - no replacements defined`);
          setProgress(Math.round(((i + 1) / documentFiles.length) * 100));
          continue;
        }

        // Fetch the document from the public directory
        const response = await fetch(filePath);
        if (!response.ok) {
          console.error(`Failed to fetch ${filePath}`);
          continue;
        }

        const fileBuffer = await response.arrayBuffer();

        // Process based on file type
        if (fileExtension === "docx") {
          await processDocxFile(fileBuffer, fileName, outputZip);
        } else if (fileExtension === "xlsx") {
          await processXlsxFile(fileBuffer, fileName, outputZip);
        } else {
          console.warn(`Unsupported file type: ${fileExtension}`);
          continue;
        }

        // Update progress
        setProgress(Math.round(((i + 1) / documentFiles.length) * 100));
      }

      // Generate the final zip file with all modified documents
      const content = await outputZip.generateAsync({ type: "blob" });

      // Download the zip file
      saveAs(content, "application-documents.zip");
      setIsComplete(true);
    } catch (error) {
      console.error("Error processing documents:", error);
      alert("Error processing documents. See console for details.");
    } finally {
      setProcessing(false);
    }
  };

  const processDocxFile = async (fileBuffer, fileName, outputZip) => {
    try {
      // Get replacements for this file
      const replacements = fileReplacements[fileName] || [];
      if (replacements.length === 0) return;

      // Load the document using mammoth or similar library that handles DOCX properly
      const docxZip = await JSZip.loadAsync(fileBuffer);

      // Get all the document parts that might contain content
      const contentParts = [
        "word/document.xml",
        "word/header1.xml",
        "word/header2.xml",
        "word/header3.xml",
        "word/footer1.xml",
        "word/footer2.xml",
        "word/footer3.xml",
      ];

      // Process each content part if it exists
      for (const contentPartPath of contentParts) {
        const contentPart = docxZip.file(contentPartPath);
        if (!contentPart) continue;

        let xmlContent = await contentPart.async("text");
        let modifiedXml = xmlContent;

        for (const { search, replace, useRegex } of replacements) {
          if (!search) continue;

          // Create a safe version of the replacement text with XML entities
          let safeReplacement = replace
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&apos;");

          // For newlines, we'll use a more conservative approach
          // Instead of trying to insert XML tags directly, we'll use Word's built-in line break character
          // This is more likely to maintain formatting
          safeReplacement = safeReplacement.replace(
            /\n/g,
            "</w:t><w:br/><w:t>"
          );

          if (useRegex) {
            try {
              const regex = new RegExp(search, "g");
              modifiedXml = modifiedXml.replace(regex, safeReplacement);
            } catch (error) {
              console.error(`Invalid regex pattern: ${search}`, error);
            }
          } else {
            // For plain text search, properly escape the search string
            // First escape regex special characters
            const escapedSearch = search
              .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
              // Then escape XML special characters
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&apos;");

            // Replace all occurrences
            modifiedXml = modifiedXml.replace(
              new RegExp(escapedSearch, "g"),
              safeReplacement
            );
          }
        }

        // Update the content part in the zip
        docxZip.file(contentPartPath, modifiedXml);
      }

      // Generate the modified document
      const modifiedContent = await docxZip.generateAsync({ type: "blob" });

      // Add the modified document to the output zip
      outputZip.file(`${fileName}`, modifiedContent);
    } catch (error) {
      console.error(`Error processing DOCX file ${fileName}:`, error);
    }
  };

  const processXlsxFile = async (fileBuffer, fileName, outputZip) => {
    try {
      const replacements = fileReplacements[fileName] || [];
      if (replacements.length === 0) {
        console.log(`No replacements defined for ${fileName}, skipping.`);
        outputZip.file(fileName, fileBuffer);
        return;
      }

      // Read the workbook
      const workbook = XLSX.read(fileBuffer, {
        type: "array",
        cellStyles: true, // Preserve styles during reading
        cellDates: true,
        sheetStubs: true,
        bookVBA: true,
        dense: false,
      });

      console.log(`Processing ${fileName} with replacements:`, replacements);

      // Process each sheet
      workbook.SheetNames.forEach((sheetName) => {
        const worksheet = workbook.Sheets[sheetName];
        const range = XLSX.utils.decode_range(worksheet["!ref"] || "A1");

        for (let r = range.s.r; r <= range.e.r; r++) {
          for (let c = range.s.c; c <= range.e.c; c++) {
            const address = XLSX.utils.encode_cell({ r, c });
            const cell = worksheet[address];
            if (!cell || cell.t !== "s" || !cell.v) continue; // Only process string cells with values

            console.log(`Cell ${address} before:`, {
              v: cell.v,
              r: cell.r,
              w: cell.w,
              s: cell.s,
            });

            if (Array.isArray(cell.r)) {
              // Handle rich text cells
              cell.r = cell.r.map((run) => {
                let text = run.t;
                for (const { search, replace, useRegex } of replacements) {
                  if (!search || typeof replace === "undefined") continue;
                  const pattern = useRegex ? search : escapeRegExp(search);
                  const regex = new RegExp(pattern, "g");
                  text = text.replace(regex, replace);
                }
                return { ...run, t: text };
              });
              const newValue = cell.r.map((run) => run.t).join("");
              if (newValue !== cell.v) {
                cell.v = newValue;
                if (cell.w) cell.w = newValue;
              }
            } else {
              // Handle plain text cells
              let newValue = cell.v;
              for (const { search, replace, useRegex } of replacements) {
                if (!search || typeof replace === "undefined") continue;
                const pattern = useRegex ? search : escapeRegExp(search);
                const regex = new RegExp(pattern, "g");
                newValue = newValue.replace(regex, replace);
              }
              if (newValue !== cell.v) {
                cell.v = newValue;
                if (cell.w) cell.w = newValue;
              }
            }

            console.log(`Cell ${address} after:`, {
              v: cell.v,
              rнез: cell.r,
              w: cell.w,
              s: cell.s,
            });
          }
        }
      });

      // Write the workbook with corrected options
      const wbout = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
        bookVBA: true, // Preserve VBA if present
      });

      outputZip.file(fileName, wbout);
      console.log(`Successfully processed ${fileName}`);
    } catch (error) {
      console.error(`Error processing XLSX file ${fileName}:`, error);
      outputZip.file(fileName, fileBuffer); // Add original file on error
      throw error; // Re-throw to allow higher-level handling
    }
  };

  // Helper function to escape regex special characters
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  // Helper function to escape regex special characters
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  return (
    <div className="space-y-6">
      <div className="bg-white border rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Document Generator</h2>
        <p className="text-gray-600 mb-6">
          Click the button below to generate all your application documents with
          your information filled in. The documents will be downloaded as a zip
          file.
        </p>

        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            {documentFiles.map((filePath, index) => {
              const fileName = filePath.split("/").pop() || "";
              return (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4 text-green-500" />
                  <span className="text-gray-800">{fileName}</span>
                  {isComplete && (
                    <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                      Processed
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {processing && (
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-green-600 h-2.5 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
              <p className="text-sm text-gray-500 mt-1">
                Processing: {progress}%
              </p>
            </div>
          )}

          <button
            onClick={processDocuments}
            disabled={processing || isComplete}
            className={`px-4 py-2 rounded flex items-center gap-2 ${
              isComplete
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-300"
            }`}
          >
            {isComplete ? (
              <>
                <Check className="h-5 w-5" />
                Documents Generated
              </>
            ) : processing ? (
              "Processing..."
            ) : (
              <>
                <Download className="h-5 w-5" />
                Generate Documents
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
