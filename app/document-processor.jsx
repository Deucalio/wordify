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
  "files/10. School College University Confirmation UNIVERSITY.docx",
  "files/11 . email screening - 1.docx",
  "files/11 . email screening - 2.docx",
  "files/11. Employment reference - 1.docx",
  "files/11. Employment reference - 2.docx",
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

  //   Prepare form data for document replacements
  useEffect(() => {
    if (!formData) return;

    // let formData = {
    //     "firstName": "John",
    //     "lastName": "Doe",
    //     "dateOfBirth": "15/05/1985",
    //     "jobTitle": "Security Officer",
    //     "positionAppliedFor": "Senior Security Officer",
    //     "proofOfAddress": "Utility Bill",
    //     "shirtsSize": "L",
    //     "trouserSize": "34",
    //     "nationality": "British",
    //     "dateOfEntryToUK": "01/01/2010",
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
    //     "permanentFrom": "01/06/2018",
    //     "permanentTo": "Till Now",
    //     "previousAddress": "45 Park Avenue, Manchester",
    //     "previousPostCode": "M1 1AA",
    //     "previousFrom": "15/03/2015",
    //     "previousTo": "31/05/2018",
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
    //     "uniFrom": "01/09/2005",
    //     "uniTo": "30/06/2008",
    //     "uniGrades": "2:1 Honours",
    //     "collegeName": "London College",
    //     "collegeAddress": "10 College Road, London",
    //     "collegeFrom": "01/09/2003",
    //     "collegeTo": "30/06/2005",
    //     "collegeGrades": "A, B, B",
    //     "schoolClgFrom": "01/09/2001",
    //     "schoolClgTo": "30/06/2003",
    //     "attendedAs": "Student",
    //     "commentsOrObservations": "None",
    //     "signedAsName": "John Doe",
    //     "schoolClgDate": "01/09/2001",
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
    //     "job1From": "01/06/2020",
    //     "job1To": "31/05/2023",
    //     "job1ReasonForLeaving": "Career progression",
    //     "job2CompanyName": "SafetyFirst Security",
    //     "job2Address": "5 Protection Road, Manchester",
    //     "job2PostCode": "M2 2BB",
    //     "job2Tel": "0161 987 6543",
    //     "job2Position": "Security Guard",
    //     "job2Manager": "Michael Brown",
    //     "job2From": "15/03/2018",
    //     "job2To": "31/05/2020",
    //     "job2ReasonForLeaving": "Relocation",
    //     "interviewDate": "10/03/2024",
    //     "telephoneScreeningDate": "05/03/2024",
    //     "employmentContractDate": "20/03/2024",
    //     "screeningProgressDate1": "12/03/2024",
    //     "screeningProgressDate2": "18/03/2024",
    //     "screeningPeriodFrom": "01/03/2024",
    //     "screeningPeriodTo": "31/03/2024",
    //     "environmentalTrainingDate": "02/04/2024",
    //     "medicalQuestionnaireDate": "25/03/2024"
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
        {
          search: "SECURITY OFFICER",
          replace: formData.jobTitle,
          useRegex: true,
        },
        {
          search: "28/11/2024",
          replace: formData.interviewDate,
          useRegex: true,
        },
      ],
      "2. Application Form.docx": [
        {
          search: "DOG HANDLER",
          replace: formData.positionAppliedFor,
          useRegex: true,
        },
        {
          search: "surName",
          replace: surName,
          useRegex: false,
        },
        {
          search: "forName",
          replace: formData.firstName,
          useRegex: false,
        },
        // Last 5 years History
        {
          search: "permAddress",
          replace: formData.permanentAddress,
          useRegex: true,
        },
        {
          search: "postCode",
          replace: formData.permanentPostCode,
          useRegex: true,
        },
        {
          search: "from1",
          replace: formData.permanentFrom,
          useRegex: true,
        },
        {
          search: "to1",
          replace: formData.permanentTo,
          useRegex: true,
        },
        {
          search: "prevAddress",
          replace: formData.previousAddress,
          useRegex: true,
        },
        {
          search: "postCode2",
          replace: formData.previousPostCode,
          useRegex: true,
        },
        {
          search: "from2",
          replace: formData.previousFrom,
          useRegex: true,
        },
        {
          search: "to2",
          replace: formData.previousTo,
          useRegex: true,
        },
        {
          search: "email1",
          replace: formData.email,
          useRegex: true,
        },
        {
          search: "mobilEE",
          replace: formData.mobile,
          useRegex: true,
        },
        {
          search: "PAKISTANI",
          replace: formData.nationality,
          useRegex: true,
        },
        {
          search: "dateUK",
          replace: formData.dateOfEntryToUK,
          useRegex: true,
        },
        {
          search: "PSW",
          replace: formData.workPermit,
          useRegex: true,
        },
        {
          search: "niNumber",
          replace: formData.niNumber,
          useRegex: true,
        },
        {
          search: "UZ",
          replace: formData.passportNumber,
          useRegex: true,
        },
        {
          search: "siaSection",
          replace: formData.siaLicenseSector,
          useRegex: true,
        },
        {
          search: "siaNumber",
          replace: formData.siaLicenceNumber,
          useRegex: true,
        },
        {
          search: "kinRel",
          replace: formData.nextOfKinRelationship,
          useRegex: true,
        },
        {
          search: "kinName",
          replace: formData.nextOfKinName,
          useRegex: true,
        },
        {
          search: "kinPhone",
          replace: formData.nextOfKinMobile,
          useRegex: true,
        },
        {
          search: "kinAddress",
          replace: formData.nextOfKinAddress,
          useRegex: true,
        },
        {
          search: "kinpostCode",
          replace: formData.nextOfKinPostCode,
          useRegex: true,
        },
        {
          search: "dlType",
          replace: formData.drivingLicenseType,
          useRegex: true,
        },
        {
          search: "oT",
          replace: formData.ownTransport ? "YES" : "NO",
          useRegex: true,
        },
        {
          search: "dlNumber",
          replace: formData.drivingLicenseNumber,
          useRegex: true,
        },
        {
          search: "uniName",
          replace: formData.uniName,
          useRegex: true,
        },
        {
          search: "uniAdd",
          replace: formData.uniAddress,
          useRegex: true,
        },
        {
          search: "uniFrom",
          replace: formData.uniFrom,
          useRegex: true,
        },
        {
          search: "uniTo",
          replace: formData.uniTo,
          useRegex: true,
        },
        {
          search: "uniGrade",
          replace: formData.uniGrades,
          useRegex: true,
        },
        {
          search: "clgName",
          replace: formData.collegeName,
          useRegex: true,
        },
        {
          search: "clgAdd",
          replace: formData.collegeAddress,
          useRegex: true,
        },
        {
          search: "clgFrom",
          replace: formData.collegeFrom,
          useRegex: true,
        },
        {
          search: "clgTo",
          replace: formData.collegeTo,
          useRegex: true,
        },
        {
          search: "clgGrade",
          replace: formData.collegeGrades,
          useRegex: true,
        },
        {
          search: "bankName",
          replace: formData.bankName,
          useRegex: true,
        },
        {
          search: "fullName",
          replace: fullName,
          useRegex: true,
        },
        {
          search: "sortCode",
          replace: formData.sortCode,
          useRegex: true,
        },
        {
          search: "accountNo",
          replace: formData.accountNumber,
          useRegex: true,
        },
        {
          search: "job1Nam",
          replace: formData.job1CompanyName,
          useRegex: true,
        },
        {
          search: "job1Position",
          replace: formData.job1Position,
          useRegex: true,
        },
        {
          search: "Job1From",
          replace: formData.job1From,
          useRegex: true,
        },
        {
          search: "Job1To",
          replace: formData.job1To,
          useRegex: true,
        },
        {
          search: "Job1Reasons",
          replace: formData.job1ReasonForLeaving,
          useRegex: true,
        },
        {
          search: "job1Address",
          replace: formData.job1Address,
          useRegex: true,
        },
        {
          search: "job11Tell",
          replace: formData.job1Tel,
          useRegex: false,
        },
        {
          search: "job1Manager",
          replace: formData.job1Manager,
          useRegex: true,
        },
        {
          search: "job2Nam",
          replace: formData.job2CompanyName,
          useRegex: true,
        },
        {
          search: "job2Position",
          replace: formData.job2Position,
          useRegex: true,
        },
        {
          search: "Job2From",
          replace: formData.job2From,
          useRegex: true,
        },
        {
          search: "Job2To",
          replace: formData.job2To,
          useRegex: true,
        },
        {
          search: "Job2Reasons",
          replace: formData.job2ReasonForLeaving,
          useRegex: true,
        },
        {
          search: "job2Address",
          replace: formData.job2Address,
          useRegex: true,
        },
        {
          search: "job2Tel",
          replace: formData.job2Tel,
          useRegex: true,
        },
        {
          search: "job2Manager",
          replace: formData.job2Manager,
          useRegex: true,
        },
        {
          search: "fullName",
          replace: fullName,
          useRegex: true,
        },
        {
          search: "niNumber",
          replace: formData.niNumber,
          useRegex: true,
        },
        {
          search: "endingDate",
          replace: formData.interviewDate,
          useRegex: true,
        },
      ],
      "3. Telephone Screening.docx": [
        {
          search: "fullName",
          replace: fullName,
          useRegex: true,
        },
        {
          search: "job1Name",
          replace: formData.job1CompanyName,
          useRegex: true,
        },
        {
          search: "jobOneTell",
          replace: formData.job1Tel,
          useRegex: true,
        },
        {
          search: "job1Manager",
          replace: formData.job1Manager,
          useRegex: true,
        },
        {
          search: "job1From",
          replace: formData.job1From,
          useRegex: true,
        },
        {
          search: "job1To",
          replace: formData.job1To,
          useRegex: true,
        },
        {
          search: "job2Name",
          replace: formData.job2CompanyName,
          useRegex: true,
        },
        {
          search: "job2Tel",
          replace: formData.job2Tel,
          useRegex: true,
        },
        {
          search: "job2Manager",
          replace: formData.job2Manager,
          useRegex: true,
        },
        {
          search: "job2From",
          replace: formData.job2From,
          useRegex: true,
        },
        {
          search: "job2To",
          replace: formData.job2To,
          useRegex: true,
        },
        {
          search: "ddDate",
          replace: formData.telephoneScreeningDate.split(" ")[1],
          useRegex: true,
        },
      ],
      "4. Competence Form.docx": [
        {
          search: "interviewDate",
          replace: formData.interviewDate,
          useRegex: true,
        },
        {
          search: "fullName",
          replace: fullName,
          useRegex: true,
        },
      ],
      "6. Employment Contract.docx": [
        {
          search: "fullName",
          replace: fullName,
          useRegex: true,
        },
        {
          search: "empDate",
          replace: formData.employmentContractDate,
          useRegex: true,
        },
        {
          search: "jobTitle",
          replace: formData.jobTitle,
          useRegex: true,
        },
      ],
      "8. Induction Training.docx": [
        {
          search: "fullName",
          replace: fullName,
          useRegex: true,
        },
        {
          search: "empDate",
          replace: formData.employmentContractDate,
          useRegex: true,
        },
      ],
      "09. Screening progress sheet.docx": [
        {
          search: "surName",
          replace: surName,
          useRegex: true,
        },
        {
          search: "firstName",
          replace: formData.firstName,
          useRegex: true,
        },
        {
          search: "dateofBirth",
          replace: formData.dateOfBirth,
          useRegex: true,
        },
        {
          search: "niNumber",
          replace: formData.niNumber,
          useRegex: true,
        },
        {
          search: "speriodFrom",
          replace: formData.screeningPeriodFrom,
          useRegex: true,
        },
        {
          search: "speriodTo",
          replace: formData.screeningPeriodTo,
          useRegex: true,
        },
        {
          search: "job1CompanyName",
          replace: formData.job1CompanyName,
          useRegex: true,
        },
        {
          search: "job1Manager",
          replace: formData.job1Manager,
          useRegex: true,
        },
        {
          search: "28/02/2024 - 07/12/2024",
          replace: `${formData.job1From} - ${formData.job1To}`,
          useRegex: true,
        },
        {
          search: "job2CompanyName",
          replace: formData.job2CompanyName,
          useRegex: true,
        },
        {
          search: "job2Manager",
          replace: formData.job2Manager,
          useRegex: true,
        },
        {
          search: "08/09/2019 - 08/01/2024",
          replace: `${formData.job2From} - ${formData.job2To}`,
          useRegex: true,
        },
        {
          search: "job1From",
          replace: formData.job1From,
          useRegex: true,
        },
        {
          search: "job1To",
          replace: formData.job1To,
          useRegex: true,
        },
        {
          search: "job2From",
          replace: formData.job2From,
          useRegex: true,
        },
        {
          search: "job2To",
          replace: formData.job2To,
          useRegex: true,
        },
        {
          search: "passportNo",
          replace: formData.passportNumber,
          useRegex: true,
        },
        {
          search: "siaLic",
          replace: formData.siaLicenceNumber,
          useRegex: true,
        },
        {
          search: "proofofAdd",
          replace: formData.proofOfAddress,
          useRegex: true,
        },
        {
          search: "drivingLic",
          replace: formData.drivingLicenseNumber,
          useRegex: true,
        },
        {
          search: "sigdate1",
          replace: formData.screeningProgressDate1,
          useRegex: true,
        },
        {
          search: "sigdate2",
          replace: formData.screeningProgressDate2,
          useRegex: true,
        },
      ],
      "10. Email Reference university.docx": [
        {
          search: "dateoneFormat",
          replace: formData.emailDate1
            ? formData.emailDate1.split(" ").slice(1).join(", ")
            : "",
          useRegex: true,
        },
        {
          search: "date1",
          replace: formData.emailDate1,
          useRegex: true,
        },
        {
          search: "email1Reply",
          replace: formData.emailReply1,
          useRegex: true,
        },
        {
          search: "date2",
          replace: formData.emailDate2,
          useRegex: true,
        },
        {
          search: "fullName",
          replace: fullName,
          useRegex: true,
        },
        {
          search: "niNumber",
          replace: formData.niNumber,
          useRegex: true,
        },
        {
          search: "secondSad",
          replace: formData.emailDate2
            ? formData.emailDate2.split(" ").slice(1).join(", ")
            : "",
          useRegex: true,
        },
      ],
      "10. School College University Confirmation UNIVERSITY.docx": [
        {
          search: "fullName",
          replace: fullName,
          useRegex: true,
        },
        {
          search: "doB",
          replace: formData.dateOfBirth,
          useRegex: true,
        },
        {
          search: "address",
          replace: formData.permanentAddress,
          useRegex: true,
        },
        {
          search: "datesFrom",
          replace: formData.schoolClgFrom,
          useRegex: true,
        },
        {
          search: "datesTo",
          replace: formData.schoolClgTo,
          useRegex: true,
        },
        {
          search: "attendedAs",
          replace: formData.attendedAs,
          useRegex: true,
        },
        {
          search: "cmntsorObserv",
          replace: formData.commentsOrObservations,
          useRegex: true,
        },
        {
          search: "signedAs",
          replace: formData.signedAsName,
          useRegex: true,
        },
        {
          search: "endingDate",
          replace: formData.schoolClgDate,
          useRegex: true,
        },
        {
          search: "positioN",
          replace: formData.schoolClgPosition,
          useRegex: true,
        },
      ],
      "11 . email screening - 1.docx": [
        {
          search: "dateFormatted",
          replace: formData.job1EmailReplyDate.split(" ").slice(1,).join(", "),
          useRegex: true,
        },
        {
          search: "jobEmail",
          replace: formData.job1Email,
          useRegex: true,
        },
        {
          search: "Mail",
          replace: formData.job1Email,
          useRegex: true,
        },
        {
          search: "dateOne",
          replace: formData.job1EmailReplyDate,
          useRegex: true,
        },
        {
          search: "job1ScreenReply",
          replace: formData.job1EmailReply,
          useRegex: true,
        },
        {
          search: "telScreen",
          replace: formData.telephoneScreeningDate,
          useRegex: true,
        },
        {
          search: "fullName",
          replace: fullName,
          useRegex: true,
        },
        {
          search: "niNumber",
          replace: formData.niNumber,
          useRegex: true,
        },
        {
          search: "dateSecond",
          replace: formData.telephoneScreeningDate.split(" ").slice(1).join(", "),
          useRegex: true,
        }
      ],
      "11 . email screening - 2.docx": [
        {
          search: "dateFormatted",
          replace: formData.job2EmailReplyDate.split(" ").slice(1,).join(", "),
          useRegex: true,
        },
        {
          search: "_jobEmail",
          replace: formData.job2Email,
          useRegex: true,
        },
        {
          search: "__",
          replace: formData.job2Email,
          useRegex: true,
        },
        {
          search: "jobEmail",
          replace: formData.job2Email,
          useRegex: true,
        },
        {
          search: "dateOne",
          replace: formData.job2EmailReplyDate,
          useRegex: true,
        },
        {
          search: "job1ScreenReply",
          replace: formData.job2EmailReply,
          useRegex: true,
        },
        {
          search: "telScreen",
          replace: formData.telephoneScreeningDateTwo,
          useRegex: true,
        },
        {
          search: "fullName",
          replace: fullName,
          useRegex: true,
        },
        {
          search: "niNumber",
          replace: formData.niNumber,
          useRegex: true,
        },
        {
          search: "dateSecond",
          replace: formData.telephoneScreeningDateTwo.split(" ").slice(1).join(", "),
          useRegex: true,
        }
      ],
      "11. Employment reference - 1.docx": [
        {
          search: "fullName",
          replace: fullName,
          useRegex: true,
        },
        {
          search: "permAdd",
          replace: formData.permanentAddress,
          useRegex: true,
        },
        {
          search: "dob",
          replace: formData.dateOfBirth,
          useRegex: true,
        },
        {
          search: "niNumber",
          replace: formData.niNumber,
          useRegex: true,
        },
        {
          search: "jobName",
          replace: formData.job1CompanyName,
          useRegex: true,
        },
        {
          search: "jobPosition",
          replace: formData.job1Position,
          useRegex: true,
        },
        {
          search: "jobFrom",
          replace: formData.job1From,
          useRegex: true,
        },
        {
          search: "jobTo",
          replace: formData.job1To,
          useRegex: true,
        },
        {
          search: "jobManager",
          replace: formData.job1Manager,
          useRegex: true,
        },
        {
          search: "emailDate",
          replace: formData.job1EmailReplyDate.split(" ")[1],
          useRegex: true,
        }
      ],
      "11. Employment reference - 2.docx": [
        {
          search: "fullName",
          replace: fullName,
          useRegex: true,
        },
        {
          search: "permAdd",
          replace: formData.permanentAddress,
          useRegex: true,
        },
        {
          search: "dob",
          replace: formData.dateOfBirth,
          useRegex: true,
        },
        {
          search: "niNumber",
          replace: formData.niNumber,
          useRegex: true,
        },
        {
          search: "jobName",
          replace: formData.job2CompanyName,
          useRegex: true,
        },
        {
          search: "jobPosition",
          replace: formData.job2Position,
          useRegex: true,
        },
        {
          search: "jobFrom",
          replace: formData.job2From,
          useRegex: true,
        },
        {
          search: "jobTo",
          replace: formData.job2To,
          useRegex: true,
        },
        {
          search: "jobManager",
          replace: formData.job2Manager,
          useRegex: true,
        },
        {
          search: "emailDate",
          replace: formData.job2EmailReplyDate.split(" ")[1],
          useRegex: true,
        }
      ],
      "12. Uniform Issue record form.docx": [
        {
          search: "fullName",
          replace: fullName,
          useRegex: true,
        },
        {
          search: "fullNAME",
          replace: fullName,
          useRegex: true,
        },
        {
          search: "empDate",
          replace: formData.employmentContractDate,
          useRegex: true,
        },
        {
          search: "shirtSize",
          replace: formData.shirtsSize,
          useRegex: true,
        },
        {
          search: "trousSize",
          replace: formData.trouserSize,
          useRegex: true,
        },
      ],
      "13. Environmental training.docx": [
        {
          search: "fullName",
          replace: fullName,
          useRegex: true,
        },
        {
          search: "envDate",
          replace: formData.environmentalTrainingDate,
          useRegex: true,
        },
      ],
      "14. WTR 48 hour opt out agreement.docx": [
        {
          search: "fullName",
          replace: fullName,
          useRegex: true,
        },
        {
          search: "empDate",
          replace: formData.employmentContractDate,
          useRegex: true,
        },
      ],
      "15. Medical Questionnaire.docx": [
        {
            search: "jobTitle",
            replace: formData.jobTitle,
            useRegex: true
        },
        {
            search: "fullName",
            replace: fullName,
            useRegex: true
        },
        {
            search: "dob",
            replace: formData.dateOfBirth,
            useRegex: true
        },
        {
            search: "envDate",
            replace: formData.environmentalTrainingDate,
            useRegex: true
        }
      ]
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

              if (fileName.startsWith("10.") && search === "secondSad") {
              }

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
