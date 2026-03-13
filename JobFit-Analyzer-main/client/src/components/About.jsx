import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    document.title = "JobFit Analyzer | About";
  }, []);

  return (
    <div className="container mt-5 mb-5 fade-in-up">
      <div className="row">
        <div className="col-lg-10 offset-lg-1">
          <div className="glass-card p-4 p-md-5">
            <div className="text-center mb-5">
              <h1 className="font-weight-bold mb-3">About JobFit Analyzer</h1>
              <div className="bg-primary mx-auto" style={{ height: "4px", width: "60px", borderRadius: "2px" }}></div>
            </div>
            
            <div className="text-light opacity-75 fs-5 mb-4 text-start px-md-4">
              <p>
                The Resume Matcher and Recommendation System is an innovative web application designed to assist job seekers in enhancing their resume and evaluating its compatibility with specific job positions. 
              </p>
              <p>
                Our goal is to increase job seekers' chances of securing interviews by optimizing their resumes and ensuring they align with the desired qualifications of employers.
              </p>
            </div>

            <div className="row mb-5">
              <div className="col-12">
                <h2 className="h3 mb-4 text-white d-flex align-items-center gap-3">
                  <i className="bi bi-star-fill text-warning"></i> 
                  Key Features
                </h2>
                <div className="d-flex flex-column gap-3">
                  <div className="glass-input p-4 rounded text-light d-flex gap-3 align-items-start">
                     <i className="bi bi-file-earmark-check fs-3 text-primary mt-1"></i>
                     <div>
                       <h5 className="text-white mb-2">Resume Matching</h5>
                       <p className="mb-0 opacity-75">Upload your resume and enter a job description to compare qualifications and calculate a match rate.</p>
                     </div>
                  </div>
                  <div className="glass-input p-4 rounded text-light d-flex gap-3 align-items-start">
                     <i className="bi bi-lightbulb fs-3 text-warning mt-1"></i>
                     <div>
                       <h5 className="text-white mb-2">Improvement Suggestions</h5>
                       <p className="mb-0 opacity-75">Receive personalized suggestions to enhance your resume based on the comparison results.</p>
                     </div>
                  </div>
                  <div className="glass-input p-4 rounded text-light d-flex gap-3 align-items-start">
                     <i className="bi bi-person-circle fs-3 text-info mt-1"></i>
                     <div>
                       <h5 className="text-white mb-2">User Account</h5>
                       <p className="mb-0 opacity-75">Create an account to save and access your previous resume history for easy reference.</p>
                     </div>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="h3 mt-3 mb-4 text-white d-flex align-items-center gap-3">
              <i className="bi bi-gear-fill text-secondary"></i>
              How It Works
            </h2>
            <div className="text-light opacity-75">
              <ol className="mb-0 ps-3 fs-5 text-start">
                <li className="mb-3">Sign up or log in to your account (Optional).</li>
                <li className="mb-3">Upload your resume and enter a job description.</li>
                <li className="mb-3">Click on the "Start JobFit Analysis" button to see the match rate and resume improvement suggestions.</li>
                <li className="mb-3">Review the suggestions and make appropriate changes to your resume.</li>
                <li className="mb-3">
                  Optionally, view your previous resume history by clicking on the "History" tab.
                  <div className="mt-4 text-white-50 p-4 rounded glass-input fs-6">
                    <div className="d-flex align-items-start gap-3 mb-3">
                      <i className="bi bi-info-circle-fill text-info mt-1"></i>
                      <div><strong>Note:</strong> To access the History log, please try logging in with a supported browser such as Google Chrome or Mozilla Firefox.</div>
                    </div>
                    <div className="d-flex align-items-start gap-3">
                      <i className="bi bi-exclamation-triangle-fill text-warning mt-1"></i>
                      <div>Safari users may experience issues due to its default cookie settings, which can prevent access to certain features of the application. For the best experience, we recommend using Google Chrome or Mozilla Firefox.</div>
                    </div>
                  </div>
                </li>
              </ol>
            </div>
            
            <hr className="my-5 border-light opacity-25" />
            <p className="text-center text-light opacity-50 mb-0">
              &copy; 2025, Priya Yadav (Software Developer). All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
