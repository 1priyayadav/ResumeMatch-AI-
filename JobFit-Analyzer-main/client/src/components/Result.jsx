import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Result = ({ onGoBack, matchRate }) => {
  const [, setShowForm] = useState(false);

  const handleGoBack = () => {
    setShowForm(true);
    onGoBack();
  };

  const getColorClass = () => {
    if (matchRate >= 50) {
      return "text-success";
    } else if (matchRate >= 30) {
      return "text-warning";
    } else {
      return "text-danger";
    }
  };

  const suggestionsData = [
    {
      range: [0, 30],
      title: "Suggestions to Improve Your Resume:",
      suggestions: [
        "Skill up in areas where your match rate is low.",
        "Highlight relevant experiences and achievements.",
        "Customize your resume to match the job requirements.",
      ],
    },
    {
      range: [30, 50],
      title: "Suggestions to Enhance Your Resume:",
      suggestions: [
        "Focus on optimizing your skills and qualifications.",
        "Showcase your achievements and results prominently.",
        "Tailor your resume to highlight relevant keywords.",
      ],
    },
    {
      range: [50, 100],
      title: "Suggestions to Maximize Your Resume Match:",
      suggestions: [
        "Continuously update your resume with new skills and experiences.",
        "Highlight your most relevant qualifications and accomplishments.",
        "Showcase your unique selling points and strengths.",
      ],
    },
  ];

  const getMatchingSuggestions = () => {
    for (const { range, title, suggestions } of suggestionsData) {
      if (matchRate >= range[0] && matchRate <= range[1]) {
        return (
          <div className="text-start mt-2">
            <h4 className="text-white mb-3 d-flex align-items-center gap-2">
              <i className="bi bi-lightbulb-fill text-warning"></i>
              {title}
            </h4>
            <ul className="text-light opacity-75 fs-5 lh-lg mb-0">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="mb-2">{suggestion}</li>
              ))}
            </ul>
          </div>
        );
      }
    }
    return null;
  };

  return (
    <Container className="py-5 fade-in-up">
      <Row className="justify-content-center">
        <Col xs={12} sm={8} lg={6}>
          <div className="glass-card p-5 text-center">
            <h3 className="mb-4 font-weight-bold text-white">
              Result - Match Rate:
            </h3>
            <div className="p-4 rounded glass-input d-inline-block mb-4">
              <h1
                className={`mb-0 display-4 font-weight-bold ${getColorClass()}`}
                style={{ textShadow: "0 0 10px rgba(255,255,255,0.2)" }}
              >
                {matchRate}%
              </h1>
            </div>
            <hr className="border-light opacity-25 mb-4" />
            <div className="text-start">
              {getMatchingSuggestions()}
            </div>
          </div>
        </Col>
      </Row>
      <Row className="mt-4 justify-content-center">
        <Col xs="auto">
          <Button variant="outline-light" className="btn-glass-ghost px-4 py-2 d-flex align-items-center gap-2" onClick={handleGoBack}>
            <FontAwesomeIcon icon={faArrowLeft} />
            Go Back
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Result;
