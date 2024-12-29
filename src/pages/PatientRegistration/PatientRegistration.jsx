import React, { useState } from "react";
import axios from "axios";
import "./PatientRegistration.css";
import Navbar from "../../component/Navbar/Navbar";
import Navibar from "../../component/Navibar/Navibar";

const PatientRegistration = () => {
  const [name, setName] = useState("");
  const [patientId, setPatientId] = useState("");
  const [reasonForVisit, setReasonForVisit] = useState("");
  const [customReason, setCustomReason] = useState(""); // New state for custom reason
  const [loading, setLoading] = useState(false); // State for loader
  const [error, setError] = useState(""); // State for error message
  const [response, setResponse] = useState("");

  const reasonsForVisit = [
    "---General Practioner---",
    "Routine check-ups and physical exams",
    "Common illnesses (e.g., colds, flu, infections)",
    "Chronic disease management (e.g., diabetes, hypertension)",
    "Preventive care and vaccinations",

    "----Cardiology----",
    "Heart disease and conditions",
    "Hypertension (high blood pressure)",
    "Chest pain and angina",
    "Arrhythmias",
    "Follow-up after heart surgery or procedures",

    "----Dermatology----",
    "Skin conditions (e.g., acne, eczema, psoriasis)",
    "Skin infections (e.g., fungal infections, impetigo)",
    "Skin cancer screenings",
    "Cosmetic procedures (e.g., Botox, laser treatments)",
    "Hair and nail disorders",

    "---Gynecology/Obstetrics (OB-GYN)------",
    "Pregnancy care and childbirth",
    "Menstrual disorders (e.g., irregular periods, heavy bleeding)",
    "Contraception and family planning",
    "Menopause management",
    "Screening for reproductive system cancers ",

    "-----Orthopedics----",
    "Bone and joint conditions",
    "Sports injuries ",
    "Back pain and spinal disorders",
    "Joint replacement surgeries",
    "Pediatric orthopedic conditions",

    "----Psychiatry----",
    "Mental health conditions (e.g., depression, anxiety, bipolar disorder)",
    "Substance abuse and addiction treatment",
    "Schizophrenia and psychosis",
    "Stress and trauma-related disorders",
    "Therapy and counseling services",

    "----Neurology----",
    "Neurological disorders (e.g., epilepsy, Parkinson's disease)",
    "Headaches and migraines",
    "Stroke and cerebrovascular diseases",
    "Multiple sclerosis",
    "Peripheral neuropathy",

    "----Gastroenterology----",
    "Digestive system disorders (e.g., irritable bowel syndrome, Crohn's disease)",
    "Liver conditions (e.g., hepatitis, fatty liver disease)",
    "Acid reflux and GERD",
    "Colon cancer screening (e.g., colonoscopy)",
    "Gallbladder and pancreatic issues",

    "----Pulmonology----",
    "Respiratory conditions (e.g., asthma, COPD)",
    "Lung infections (e.g., pneumonia, tuberculosis)",
    "Sleep apnea and sleep disorders",
    "Chronic cough and breathing difficulties",
    "Pulmonary hypertension",

    "----Endocrinology----",
    "Diabetes management",
    "Thyroid disorders (e.g., hypothyroidism, hyperthyroidism)",
    "Hormonal imbalances (e.g., adrenal disorders, pituitary disorders)",
    "Osteoporosis and bone metabolism disorders",
    "Obesity and metabolic syndrome",

    "---Urology---",
    "Urinary tract infections (UTIs)",
    "Kidney stones and kidney disease",
    "Male reproductive issues (e.g., erectile dysfunction, infertility)",
    "Prostate health and prostate cancer screening",
    "Incontinence and bladder control issues",

    "----Oncology----",
    "Cancer diagnosis and treatment",
    "Chemotherapy and radiation therapy management",
    "Palliative care for cancer patients",
    "Cancer screenings and preventive care",
    "Genetic counseling for cancer risk",

    "----Ophthalmology---",
    "Vision problems and eye exams",
    "Eye infections and injuries",
    "Cataracts and glaucoma management",
    "Diabetic eye disease monitoring",
    "LASIK and other vision correction surgeries",

    "----Otolaryngology (ENT)----",
    "Ear infections and hearing loss",
    "Sinusitis and nasal problems",
    "Throat and voice disorders",
    "Tonsillitis and adenoid issues",
    "Head and neck surgery",

    "----Rheumatology----",
    "Autoimmune disorders (e.g., lupus, rheumatoid arthritis)",
    "Chronic joint pain and inflammation",
    "Osteoarthritis and other degenerative joint diseases",
    "Gout and other crystal-induced arthropathies",
    "Fibromyalgia and chronic pain management",

    "----Nephrology----",
    "Chronic kidney disease (CKD)",
    "Dialysis management",
    "Hypertension related to kidney problems",
    "Kidney transplant follow-up",
    "Electrolyte imbalances",

    "----Infectious Disease----",
    "Complex infections (e.g., HIV/AIDS, tuberculosis)",
    "Travel medicine and vaccination",
    "Hospital-acquired infections",
    "Antibiotic-resistant infections",
    "Immune system disorders related to infections",

    "----Emergency Medicine----",
    "Acute injuries (e.g., fractures, burns, wounds)",
    "Heart attack and stroke",
    "Severe allergic reactions (anaphylaxis)",
    "Poisoning and overdose",
    "Trauma and accidents",

    "----Surgery (General Surgery)---",
    "Appendicitis and gallbladder surgery",
    "Hernia repair",
    "Abdominal and digestive tract surgery",
    "Breast surgery (e.g., mastectomy)",
    "Wound care and surgical follow-up",
    "---------",
    "Referrals to specialists",
    "General Consultation",

    "----Pediatrics----",
    "Child wellness check-ups",
    "Growth and development monitoring",
    "Common childhood illnesses",
    "Developmental disorders ",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalReason = customReason || reasonForVisit; // Use custom reason if provided
    setLoading(true); // Show loader
    setResponse("");
    setError(""); // Clear previous errors
    try {
      const response = await axios.post(
        "https://hospital-queue.onrender.com/patient/register",
        {
          name,
          patientId,
          reasonForVisit: finalReason,
        }
      );
      console.log("Patient Registered:", response.data);
      setResponse("Patient Registered Successfully");
      setName("");
      setPatientId("");
      setReasonForVisit("");
      setCustomReason("");
    } catch (error) {
      console.error("Error registering patient:", error);
      setError("Failed to register patient. Please try again."); // Set error message
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <div>
      <Navbar />
      <Navibar />
      <div className="PatientRegistrationPage">
        {loading && <div className="loader"></div>}
        {response && <div className="success-message">{response}</div>}

        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <h2>Register Patient</h2>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Patient ID"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            required
          />
          <select
            value={reasonForVisit}
            onChange={(e) => setReasonForVisit(e.target.value)}
            required
            disabled={customReason !== ""} // Disable dropdown if custom reason is typed
          >
            <option value="">Select Reason for Visit</option>
            {reasonsForVisit.map((reason, index) => (
              <option key={index} value={reason}>
                {reason}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Or type reason for visit"
            value={customReason}
            onChange={(e) => setCustomReason(e.target.value)}
          />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default PatientRegistration;
