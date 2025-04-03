"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CheckCircle2, AlertCircle, ChevronRight, ChevronLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { cn } from "@/lib/utils"

import PersonalInfoForm from "./forms/personal-info-form"
import AddressHistoryForm from "./forms/address-history-form"
import NextOfKinForm from "./forms/next-of-kin-form"
import DrivingInfoForm from "./forms/driving-info-form"
import EducationForm from "./forms/education-form"
import BankDetailsForm from "./forms/bank-details-form"
import EmploymentHistoryForm from "./forms/employment-history-form"
import ImportantDatesForm from "./forms/important-dates-form"

// Form schema with all required fields
const formSchema = z.object({
  // Personal Info
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  positionAppliedFor: z.string().min(1, "Position applied for is required"),
  proofOfAddress: z.string().optional(),
  shirtsSize: z.string().optional(),
  trouserSize: z.string().optional(),
  nationality: z.string().min(1, "Nationality is required"),
  dateOfEntryToUK: z.string().optional(),
  placeOfEntryToUK: z.string().optional(),
  workPermit: z.string().optional(),
  niNumber: z.string().optional(),
  passportNumber: z.string().optional(),
  siaLicenseSector: z.string().optional(),
  siaLicenceNumber: z.string().optional(),
  email: z.string().email("Invalid email address"),
  mobile: z.string().min(1, "Mobile number is required"),

  // Address History
  permanentAddress: z.string().min(1, "Permanent address is required"),
  permanentPostCode: z.string().min(1, "Post code is required"),
  permanentFrom: z.string().min(1, "From date is required"),
  permanentTo: z.string().optional(),
  previousAddress: z.string().optional(),
  previousPostCode: z.string().optional(),
  previousFrom: z.string().optional(),
  previousTo: z.string().optional(),

  // Next of Kin
  nextOfKinRelationship: z.string().min(1, "Relationship is required"),
  nextOfKinName: z.string().min(1, "Next of kin name is required"),
  nextOfKinMobile: z.string().min(1, "Mobile number is required"),
  nextOfKinAddress: z.string().min(1, "Address is required"),
  nextOfKinPostCode: z.string().min(1, "Post code is required"),

  // Driving
  drivingLicenseType: z.string().optional(),
  ownTransport: z.boolean().optional(),
  drivingLicenseNumber: z.string().optional(),

  // Education (Optional)
  uniName: z.string().optional(),
  uniAddress: z.string().optional(),
  uniFrom: z.string().optional(),
  uniTo: z.string().optional(),
  uniGrades: z.string().optional(),
  collegeName: z.string().optional(),
  collegeAddress: z.string().optional(),
  collegeFrom: z.string().optional(),
  collegeTo: z.string().optional(),
  collegeGrades: z.string().optional(),

  // Email Reference
  emailDate1: z.string().optional(),
  emailReply1: z.string().optional(),
  emailDate2: z.string().optional(),
  emailReply2: z.string().optional(),
  emailRe: z.string().optional(),

  // Bank Details
  bankName: z.string().min(1, "Bank name is required"),
  sortCode: z.string().min(1, "Sort code is required"),
  accountNumber: z.string().min(1, "Account number is required"),

  // Previous Employment
  job1CompanyName: z.string().optional(),
  job1Address: z.string().optional(),
  job1PostCode: z.string().optional(),
  job1Tel: z.string().optional(),
  job1Position: z.string().optional(),
  job1Manager: z.string().optional(),
  job1From: z.string().optional(),
  job1To: z.string().optional(),
  job1ReasonForLeaving: z.string().optional(),

  job2CompanyName: z.string().optional(),
  job2Address: z.string().optional(),
  job2PostCode: z.string().optional(),
  job2Tel: z.string().optional(),
  job2Position: z.string().optional(),
  job2Manager: z.string().optional(),
  job2From: z.string().optional(),
  job2To: z.string().optional(),
  job2ReasonForLeaving: z.string().optional(),

  // Important Dates
  interviewDate: z.string().optional(),
  applicationDate: z.string().optional(),
  competenceFormDate: z.string().optional(),
  telephoneScreeningDate: z.string().optional(),
  employmentContractDate: z.string().optional(),
  inductionTrainingDate: z.string().optional(),
  uniformIssueDate: z.string().optional(),
  wtr48Date: z.string().optional(),
  screeningProgressDate1: z.string().optional(),
  screeningProgressDate2: z.string().optional(),
  screeningPeriodFrom: z.string().optional(),
  screeningPeriodTo: z.string().optional(),
  environmentalTrainingDate: z.string().optional(),
  medicalQuestionnaireDate: z.string().optional(),
})

const formSections = [
  { id: "personal", label: "Personal Info" },
  { id: "addressHistory", label: "Address History" },
  { id: "nextOfKin", label: "Next of Kin" },
  { id: "driving", label: "Driving Info" },
  { id: "education", label: "Education" },
  { id: "bankDetails", label: "Bank Details" },
  { id: "employment", label: "Employment" },
  { id: "importantDates", label: "Important Dates" },
]

export default function ApplicationForm({ onSubmitSuccess, initialData }) {
  const [activeTab, setActiveTab] = useState("personal")
  const [completedSections, setCompletedSections] = useState([])
  const [formError, setFormError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      jobTitle: "",
      positionAppliedFor: "",
      nationality: "",
      mobile: "",
      email: "",
      permanentAddress: "",
      permanentPostCode: "",
      permanentFrom: "",
      nextOfKinRelationship: "",
      nextOfKinName: "",
      nextOfKinMobile: "",
      nextOfKinAddress: "",
      nextOfKinPostCode: "",
      bankName: "",
      sortCode: "",
      accountNumber: "",
      ownTransport: false,
    },
    mode: "onChange",
  })

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true)
      setFormError(null)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log("Form data submitted:", data)

      // Call the onSubmitSuccess callback with the form data
      if (onSubmitSuccess) {
        onSubmitSuccess(data)
      }

      setIsSubmitting(false)
    } catch (error) {
      setFormError("There was an error submitting your application. Please try again.")
      setIsSubmitting(false)
    }
  }

  const onError = (errors) => {
    console.log("Form validation errors:", errors)
    setFormError("Please fix the errors in the form before submitting.")

    // Find the first section with errors and navigate to it
    const errorFields = Object.keys(errors)

    if (
      errorFields.some((field) =>
        [
          "firstName",
          "lastName",
          "dateOfBirth",
          "jobTitle",
          "positionAppliedFor",
          "nationality",
          "mobile",
          "email",
        ].includes(field),
      )
    ) {
      setActiveTab("personal")
    } else if (
      errorFields.some((field) => ["permanentAddress", "permanentPostCode", "permanentFrom"].includes(field))
    ) {
      setActiveTab("addressHistory")
    } else if (
      errorFields.some((field) =>
        ["nextOfKinRelationship", "nextOfKinName", "nextOfKinMobile", "nextOfKinAddress", "nextOfKinPostCode"].includes(
          field,
        ),
      )
    ) {
      setActiveTab("nextOfKin")
    } else if (errorFields.some((field) => ["bankName", "sortCode", "accountNumber"].includes(field))) {
      setActiveTab("bankDetails")
    }
  }

  const markSectionComplete = (sectionId) => {
    if (!completedSections.includes(sectionId)) {
      setCompletedSections([...completedSections, sectionId])
    }
  }

  const goToNextSection = async () => {
    const currentIndex = formSections.findIndex((section) => section.id === activeTab)

    // Validate the current section
    let isValid = true

    if (activeTab === "personal") {
      const result = await form.trigger([
        "firstName",
        "lastName",
        "dateOfBirth",
        "jobTitle",
        "positionAppliedFor",
        "nationality",
        "mobile",
        "email",
      ])
      isValid = result
    } else if (activeTab === "addressHistory") {
      const result = await form.trigger(["permanentAddress", "permanentPostCode", "permanentFrom"])
      isValid = result
    } else if (activeTab === "nextOfKin") {
      const result = await form.trigger([
        "nextOfKinRelationship",
        "nextOfKinName",
        "nextOfKinMobile",
        "nextOfKinAddress",
        "nextOfKinPostCode",
      ])
      isValid = result
    } else if (activeTab === "bankDetails") {
      const result = await form.trigger(["bankName", "sortCode", "accountNumber"])
      isValid = result
    }

    if (isValid && currentIndex < formSections.length - 1) {
      markSectionComplete(activeTab)
      setActiveTab(formSections[currentIndex + 1].id)
    }
  }

  const goToPreviousSection = () => {
    const currentIndex = formSections.findIndex((section) => section.id === activeTab)
    if (currentIndex > 0) {
      setActiveTab(formSections[currentIndex - 1].id)
    }
  }

  return (
    <div className="mx-auto max-w-4xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onError)}>
          <div className="mb-8 flex flex-wrap justify-center gap-2 md:gap-4">
            {formSections.map((section, index) => (
              <Button
                key={section.id}
                type="button"
                variant="outline"
                className={cn(
                  "relative h-auto min-w-24 flex-col gap-1 px-3 py-2 transition-all duration-200 border border-gray-200",
                  activeTab === section.id &&
                    !completedSections.includes(section.id) &&
                    "bg-green-600 text-white border-green-600 hover:bg-green-700 hover:border-green-700",
                  completedSections.includes(section.id) &&
                    "border-green-200 bg-green-50 text-green-700 hover:bg-green-100",
                  activeTab !== section.id &&
                    !completedSections.includes(section.id) &&
                    "hover:border-green-200 hover:bg-green-50",
                )}
                onClick={() => setActiveTab(section.id)}
              >
                <span className="text-xs font-normal">Step {index + 1}</span>
                <span>{section.label}</span>
                {completedSections.includes(section.id) && (
                  <CheckCircle2 className="absolute -right-1 -top-1 h-5 w-5 text-green-500 bg-white rounded-full" />
                )}
              </Button>
            ))}
          </div>

          {formError && (
            <Alert className="mb-6 border-red-200 bg-red-50 text-red-800">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertTitle className="text-red-600">Error</AlertTitle>
              <AlertDescription>{formError}</AlertDescription>
            </Alert>
          )}

          <Card className="border border-gray-200 bg-white shadow-lg rounded-xl overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-green-600 to-green-500 py-4 px-6">
                <h2 className="text-xl font-semibold text-white">
                  {formSections.find((section) => section.id === activeTab)?.label}
                </h2>
                <p className="text-green-100 text-sm mt-1">
                  {activeTab === "personal" && "Tell us about yourself"}
                  {activeTab === "addressHistory" && "Your address history for the last 5 years"}
                  {activeTab === "nextOfKin" && "Who should we contact in case of emergency?"}
                  {activeTab === "driving" && "Your driving information"}
                  {activeTab === "education" && "Your educational background"}
                  {activeTab === "bankDetails" && "Your banking information"}
                  {activeTab === "employment" && "Your work history"}
                  {activeTab === "importantDates" && "Important dates for your application"}
                </p>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="p-6">
                <TabsContent value="personal" className="mt-0 space-y-6 py-4">
                  <PersonalInfoForm form={form} />
                </TabsContent>

                <TabsContent value="addressHistory" className="mt-0 space-y-6 py-4">
                  <AddressHistoryForm form={form} />
                </TabsContent>

                <TabsContent value="nextOfKin" className="mt-0 space-y-6 py-4">
                  <NextOfKinForm form={form} />
                </TabsContent>

                <TabsContent value="driving" className="mt-0 space-y-6 py-4">
                  <DrivingInfoForm form={form} />
                </TabsContent>

                <TabsContent value="education" className="mt-0 space-y-6 py-4">
                  <EducationForm form={form} />
                </TabsContent>

                <TabsContent value="bankDetails" className="mt-0 space-y-6 py-4">
                  <BankDetailsForm form={form} />
                </TabsContent>

                <TabsContent value="employment" className="mt-0 space-y-6 py-4">
                  <EmploymentHistoryForm form={form} />
                </TabsContent>

                <TabsContent value="importantDates" className="mt-0 space-y-6 py-4">
                  <ImportantDatesForm form={form} />
                </TabsContent>
              </Tabs>

              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={goToPreviousSection}
                  disabled={activeTab === formSections[0].id}
                  className="border-gray-300 bg-white text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>

                {activeTab === formSections[formSections.length - 1].id ? (
                  <Button
                    type="submit"
                    className="bg-green-600 text-white hover:bg-green-700 flex items-center gap-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={goToNextSection}
                    className="bg-green-600 text-white hover:bg-green-700 flex items-center gap-2"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  )
}

