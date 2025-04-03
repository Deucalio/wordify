"use client"

import { useState } from "react"
import { FileText, Download, Check } from "lucide-react"

// List of files in the public directory
const documentFiles = [
  "/files/1.Generic Employment Contract - NMW.docx",
  "/files/2.QBC.03 New Employee Form.xlsx",
  "/files/3.QBC.06 Telephone Screening Form.docx",
  "/files/4.QBC.03 Application Form.docx",
  "/files/5.QBC.Job_Description.docx",
  "/files/6.QBC.11 Environmental Training.docx",
  "/files/7.QBC.17 Working Time Regulations.docx",
  "/files/8.QBC. 18 Medical Questionnaire.docx",
  "/files/9.QBC.14 Competence Training Test.docx",
  "/files/12. ACT e-learning Blue.docx",
  "/files/12. ACT e-learning Orange.docx",
  "/files/13 email screening.docx",
  "/files/13.Employment Reference.docx",
  "/files/14 email screening.docx",
  "/files/14.Employment Reference.docx",
]

export default function DocumentProcessor({ formData }) {
  const [processing, setProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  // Format dates for document use
  const formatDate = (date, format = "standard") => {
    if (!date) return ""

    // If date is already a string in the expected format, return it
    if (typeof date === "string") {
      // Try to parse the string date if needed for formatting
      try {
        // Check if it's in DD-MM-YYYY format
        if (/^\d{1,2}-\d{1,2}-\d{4}$/.test(date)) {
          const [day, month, year] = date.split("-").map(Number)
          const d = new Date(year, month - 1, day)

          if (format === "long") {
            const options = {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            }
            return d.toLocaleDateString("en-US", options)
          } else if (format === "ordinal") {
            const suffix = getOrdinalSuffix(day)
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
            ]
            return `${day}${suffix} of ${monthNames[month - 1]} ${year}`
          }

          // If no special formatting needed, return the original string
          return date
        }

        // If it's already in a different format, just return it
        return date
      } catch (e) {
        console.error("Error parsing date string:", e)
        return date // Return the original string if parsing fails
      }
    }

    return ""
  }

  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return "th"
    switch (day % 10) {
      case 1:
        return "st"
      case 2:
        return "nd"
      case 3:
        return "rd"
      default:
        return "th"
    }
  }

  const processDocuments = async () => {
    try {
      setProcessing(true)
      setProgress(0)
      setIsComplete(false)

      // In a real implementation, this would process the documents with the form data
      // For this demo, we'll simulate the processing with a delay
      for (let i = 0; i < documentFiles.length; i++) {
        // Simulate processing each file
        await new Promise((resolve) => setTimeout(resolve, 300))
        setProgress(Math.round(((i + 1) / documentFiles.length) * 100))
      }

      // Simulate a final processing step
      await new Promise((resolve) => setTimeout(resolve, 500))

      // In a real implementation, this would download a zip file with all processed documents
      console.log("Documents processed with form data:", formData)

      setIsComplete(true)
    } catch (error) {
      console.error("Error processing documents:", error)
      alert("Error processing documents. See console for details.")
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white border rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Document Generator</h2>
        <p className="text-gray-600 mb-6">
          Click the button below to generate all your application documents with your information filled in. The
          documents will be downloaded as a zip file.
        </p>

        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            {documentFiles.map((filePath, index) => {
              const fileName = filePath.split("/").pop() || ""
              return (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4 text-green-500" />
                  <span className="text-gray-800">{fileName}</span>
                  {isComplete && (
                    <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Processed</span>
                  )}
                </div>
              )
            })}
          </div>

          {processing && (
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
              <p className="text-sm text-gray-500 mt-1">Processing: {progress}%</p>
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
  )
}

