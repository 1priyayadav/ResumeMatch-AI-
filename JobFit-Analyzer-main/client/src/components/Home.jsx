import { useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Result from "./Result";
import axios from "axios";

const Home = () => {
  useEffect(() => {
    document.title = "JobFit Analyzer";
  }, []);

  const acceptedFileFormats = [".docx", ".pdf"];
  const maxFileSizeInMB = 10;
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [matchRate, setMatchRate] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Helper function to convert file size to MB
  const convertToMB = (sizeInBytes) => {
    return (sizeInBytes / (1024 * 1024)).toFixed(3);
  };

  // Form submission handler
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!resumeFile) {
      setError("Please select a resume file.");
      return;
    }

    const fileName = resumeFile.name.toLowerCase();
    let typeOfFile = acceptedFileFormats.find((format) =>
      fileName.endsWith(format)
    );

    if (!typeOfFile) {
      setError("Invalid file format. Accepted formats: PDF, DOCX");
      return;
    }

    const fileSize = convertToMB(resumeFile.size);

    if (fileSize > maxFileSizeInMB) {
      setError(`File size must be less than ${maxFileSizeInMB}MB`);
      return;
    }

    setError("");
    setIsLoading(true);

    let formData = new FormData();
    formData.append("resumeFile", resumeFile);
    formData.append("jobDescription", jobDescription);
    formData.append("fileSize", fileSize);
    formData.append("fileType", typeOfFile);

    try {
      const response = await axios.post("resumes/scan", formData);
      const data = response.data;
      setMatchRate(data.matchRate);
      setShowResult(true);
    } catch (error) {
      setError("Error processing the request. Please try again later.");
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // File input change handler
  const handleResumeFileChange = (event) => {
    const file = event.target.files[0];
    setResumeFile(file);
  };

  // Job description input change handler
  const handleJobDescriptionChange = (event) => {
    const value = event.target.value;
    setJobDescription(value);
  };

  // Go back to the input form
  const handleGoBack = () => {
    setMatchRate("");
    setShowResult(false);
  };

  return (
    <>
      {showResult ? (
        <div className="fade-in-up">
          <Result onGoBack={handleGoBack} matchRate={matchRate} />
        </div>
      ) : (
        <Row className="m-0 mt-5 d-flex align-items-center justify-content-center fade-in-up">
          <Col xs={12} sm={10} md={8} lg={6}>
            <Form className="glass-card p-5" onSubmit={handleSubmit}>
              <div className="text-center mb-5">
                <h2 className="font-weight-bold mb-2">JobFit Analysis</h2>
                <p className="text-light opacity-75">Upload your resume and the job description to see your match rate.</p>
              </div>
              
              <Form.Group>
                <Form.Label className="font-weight-bold mb-3 fs-5">
                  1. Resume Upload
                </Form.Label>
                <div className="glass-container p-3 mb-2 rounded text-center">
                  <Form.Control
                    type="file"
                    id="customFile"
                    className="text-center glass-input w-100"
                    name="uploadFile"
                    onChange={handleResumeFileChange}
                    required
                  />
                </div>
                <div className="d-flex justify-content-between text-light opacity-75 fs-6 mb-4 px-2">
                  <small>Formats: PDF, DOCX</small>
                  <small>Max size: {maxFileSizeInMB}MB</small>
                </div>
                
                <hr className="border-secondary opacity-25 my-4" />
                
                <Form.Label className="font-weight-bold mb-3 fs-5">
                  2. Job Description
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  className="glass-input mb-2"
                  placeholder="Paste the detailed job description here..."
                  value={jobDescription}
                  onChange={handleJobDescriptionChange}
                  required
                />
              </Form.Group>
              
              {error && (
                <div className="alert alert-danger mt-3 bg-danger bg-opacity-25 border-danger text-white backdrop-blur">
                  {error}
                </div>
              )}
              
              <Button
                size="lg"
                className="btn-glass-primary w-100 mt-4 p-3 d-flex align-items-center justify-content-center gap-2"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    <span>Analyzing Match Rate...</span>
                  </>
                ) : (
                  <>
                    <span>Start Analysis</span>
                    <i className="bi bi-arrow-right"></i>
                  </>
                )}
              </Button>
            </Form>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Home;
