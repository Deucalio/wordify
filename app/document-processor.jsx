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

    // formData = {
    //     "firstName": "John",
    //     "lastName": "Doe",
    //     "dateOfBirth": "15-05-1985",
    //     "jobTitle": "Security Officer",
    //     "positionAppliedFor": "Senior Security Officer",
    //     "proofOfAddress": "Utility Bill",
    //     "shirtsSize": "L",
    //     "trouserSize": "34",
    //     "nationality": "British",
    //     "dateOfEntryToUK": "01-01-2010",
    //     "placeOfEntryToUK": "Heathrow",
    //     "workPermit": "Yes",
    //     "niNumber": "AB123456C",
    //     "passportNumber": "123456789",
    //     "siaLicenseSector": "Door Supervision",
    //     "siaLicenceNumber": "SIA12345678",
    //     "email": "john.doe@example.com",
    //     "mobile": "07700900123",
    //     "permanentAddress": "123 Main Street, London",
    //     "permanentPostCode": "SW1A 1AA",
    //     "permanentFrom": "01-06-2018",
    //     "permanentTo": "Till Now",
    //     "previousAddress": "45 Park Avenue, Manchester",
    //     "previousPostCode": "M1 1AA",
    //     "previousFrom": "15-03-2015",
    //     "previousTo": "31-05-2018",
    //     "nextOfKinRelationship": "Spouse",
    //     "nextOfKinName": "Jane Doe",
    //     "nextOfKinMobile": "07700900124",
    //     "nextOfKinAddress": "123 Main Street, London",
    //     "nextOfKinPostCode": "SW1A 1AA",
    //     "drivingLicenseType": "Full UK",
    //     "ownTransport": true,
    //     "drivingLicenseNumber": "DOEXX123456AB9CD",
    //     "uniName": "University of London",
    //     "uniAddress": "Senate House, Malet Street, London",
    //     "uniFrom": "01-09-2005",
    //     "uniTo": "30-06-2008",
    //     "uniGrades": "2:1 Honours",
    //     "collegeName": "London College",
    //     "collegeAddress": "10 College Road, London",
    //     "collegeFrom": "01-09-2003",
    //     "collegeTo": "30-06-2005",
    //     "collegeGrades": "A, B, B",
    //     "schoolClgFrom": "01-09-2001",
    //     "schoolClgTo": "30-06-2003",
    //     "attendedAs": "Student",
    //     "commentsOrObservations": "None",
    //     "signedAsName": "John Doe",
    //     "schoolClgDate": "01-09-2001",
    //     "schoolClgPosition": "Head Boy",
    //     "emailDate1": "Wednesday, 22/01/2025 15:29",
    //     "emailReply1": "I confirm that John Doe worked for our company from 2018 to 2020 as a Security Officer. He was reliable and professional.",
    //     "emailDate2": "Mon 09/12/2024 11:11",
    //     "emailReply2": "Reference confirmation for John Doe",
    //     "emailRe": "Employment Reference Request",
    //     "bankName": "Barclays",
    //     "sortCode": "20-00-00",
    //     "accountNumber": "12345678",
    //     "job1CompanyName": "SecureGuard Ltd",
    //     "job1Address": "1 Security House, Birmingham",
    //     "job1PostCode": "B1 1AA",
    //     "job1Tel": "0121 123 4567",
    //     "job1Position": "Security Officer",
    //     "job1Manager": "Sarah Johnson",
    //     "job1From": "01-06-2020",
    //     "job1To": "31-05-2023",
    //     "job1ReasonForLeaving": "Career progression",
    //     "job2CompanyName": "SafetyFirst Security",
    //     "job2Address": "5 Protection Road, Manchester",
    //     "job2PostCode": "M2 2BB",
    //     "job2Tel": "0161 987 6543",
    //     "job2Position": "Security Guard",
    //     "job2Manager": "Michael Brown",
    //     "job2From": "15-03-2018",
    //     "job2To": "31-05-2020",
    //     "job2ReasonForLeaving": "Relocation",
    //     "interviewDate": "10-03-2024",
    //     "telephoneScreeningDate": "05-03-2024",
    //     "employmentContractDate": "20-03-2024",
    //     "screeningProgressDate1": "12-03-2024",
    //     "screeningProgressDate2": "18-03-2024",
    //     "screeningPeriodFrom": "01-03-2024",
    //     "screeningPeriodTo": "31-03-2024",
    //     "environmentalTrainingDate": "02-04-2024",
    //     "medicalQuestionnaireDate": "25-03-2024"
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
