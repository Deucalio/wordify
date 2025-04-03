"use client"

import { useState } from "react"
import ApplicationForm from "./application-form"
import DocumentProcessor from "./document-processor"

export default function Home() {
  const [formData, setFormData] = useState(null)
  const [showDocumentProcessor, setShowDocumentProcessor] = useState(false)

  const handleFormSubmit = (data) => {
    setFormData(data)
    setShowDocumentProcessor(true)
  }

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-8 text-center">Application Form & Document Generator</h1>

      {!showDocumentProcessor ? (
        <ApplicationForm onSubmitSuccess={handleFormSubmit} initialData={formData} />
      ) : (
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <h2 className="text-green-800 font-semibold text-lg">Application Submitted Successfully!</h2>
            <p className="text-green-700">Your application has been processed. You can now download your documents.</p>
          </div>

          <DocumentProcessor formData={formData} />

          <div className="flex justify-center mt-8">
            <button
              onClick={() => setShowDocumentProcessor(false)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Back to Form
            </button>
          </div>
        </div>
      )}
    </main>
  )
}

