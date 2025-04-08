"use client"

import { useState } from "react"
import ApplicationForm from "./application-form"
import DocumentProcessor from "./document-processor"

export default function Home() {
  const [formData, setFormData] = useState(null)
  const [showDocumentProcessor, setShowDocumentProcessor] = useState(false)

  const s = {
    firstName: 'INAM ',
    lastName: 'ULLAH',
    dateOfBirth: '16/04/1996',
    jobTitle: 'DOOR SUPERVISOR',
    positionAppliedFor: 'DOOR SUPERVISOR',
    proofOfAddress: '20 CLARK STREET BRISTOL AVON BS5 0TA',
    shirtsSize: 'Large',
    trouserSize: 'Large',
    nationality: 'PAKISTANI',
    dateOfEntryToUK: '08/09/2021',
    workPermit: 'FULL TIME ALLOWED',
    niNumber: 'NJ438109B',
    passportNumber: 'DS1750572',
    siaLicenseSector: 'DOOR SUPERVISOR',
    siaLicenceNumber: '1016 2013 3148 6466',
    email: 'inamullah4724@gmail.com',
    mobile: '07949012241',
    permanentAddress: '20 CLARK STREET BRISTOL AVON BS5 0TA',
    permanentPostCode: 'BS5 0TA',
    permanentFrom: '04/11/2023',
    permanentTo: 'TILL NOW',
    previousAddress: 'FLAT 87 TWINNELL HOUSE STAPLETON ROAD EASTON BS5 0AQ',
    previousPostCode: 'BS5 0AQ',
    previousFrom: '08/09/2021',
    previousTo: '03/11/2023',
    nextOfKinRelationship: 'FRIEND',
    nextOfKinName: 'ADNAN ANJUM',
    nextOfKinMobile: '07443787012',
    nextOfKinAddress: '20 CLARK STREET BRISTOL AVON BS5 0TA',
    nextOfKinPostCode: 'BS5 0TA',
    drivingLicenseType: 'N/A',
    ownTransport: false,
    drivingLicenseNumber: 'N/A',
    bankName: 'HALIFAX',
    sortCode: '11-00-98',
    accountNumber: '14783563',
    accTitle: 'INAM ULLAH',
    job1CompanyName: 'TAURUS SECURITIES LIMITED',
    job1Address: '115 EASTBOURNE MEWS, LONDON, UNITED KINGDOM, W2 6LQ',
    job1PostCode: 'W2 6LQ',
    job1Tel: '0161 273 6600',
    job1Position: 'STEWARD',
    job1Manager: 'GILL LAMBERT',
    job1From: '25/09/2021',
    job1To: '31/12/2024',
    job1ReasonForLeaving: 'BETTER WORKIING HOURS',
    job1Email: 'info@taurus-group.co.uk',
    job1EmailReplyDate: 'Friday, 07/02/2025 14:23',
    job1EmailReply: 'Thank you for reaching out regarding Inam Ullah reference. Inam Ullah joined our team on September 25th, 2021 and worked diligently until 31 December 2024. During his tenure, he consistently demonstrated a strong work ethic, exceptional dedication, and a keen ability to collaborate with colleagues.\n' +
      '\n' +
      'I appreciate your time and assistance in this matter.',
    job2CompanyName: 'MARDAN MEGA MART ',
    job2Address: 'NOWSHERA MARDAN RD, MARDAN, 23200 ',
    job2PostCode: '23200 ',
    job2Tel: '0312 5700009',
    job2Position: 'CASHIER',
    job2Manager: 'HASSAN SHABBIR',
    job2From: '03/05/2019',
    job2To: '02/09/2021',
    job2ReasonForLeaving: 'MOVED TO UK FOR FURTHER STUDIES',
    job2Email: 'megamart-mardan@gmail.com',
    job2EmailReplyDate: 'Tuesday, 18/02/2025 10:42',
    job2EmailReply: 'I am writing to confirm the employment of Mr. INAM ULLAH as a Cashier at MARDAN MEGA MART , from 03 May 2019 to 02 September 2021.\n' +
      '\n' +
      'Inam was responsible for processing customer transactions, handling cash and credit card payments, and ensuring the accuracy of the register. He consistently demonstrated strong attention to detail, excellent customer service, and a reliable work ethic.\n' +
      '\n' +
      'I confirm the accuracy of this information. Please feel free to contact me if you need further details.',
    interviewDate: '23/12/2024',
    telephoneScreeningDate: 'Tuesday, 31/12/2024 09:53',
    telephoneScreeningDateTwo: 'Tuesday, 31/12/2024 10:04',
    employmentContractDate: '09/01/2025',
    screeningProgressDate1: '18/02/2025',
    screeningProgressDate2: '20/02/2025',
    screeningPeriodFrom: '24/12/2024',
    screeningPeriodTo: '24/03/2025',
    environmentalTrainingDate: '15/01/2025'
  }
  const handleFormSubmit = (data) => {
    setFormData(data)
    // setFormData(s)
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

