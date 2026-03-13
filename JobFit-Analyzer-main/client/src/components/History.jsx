import React, { useEffect, useState } from "react";
import { Button, ListGroup, Spinner } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import "../index.css";
import axios from "axios";

const History = () => {
  useEffect(() => {
    document.title = "JobFit Analyzer | History";
  }, []);

  const [histories, setHistories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClearing, setIsClearing] = useState(false);
  const [isDeleting, setIsDeleting] = useState({});

  const truncateQuery = (query, maxLength) => {
    if (query.length <= maxLength) {
      return query;
    } else {
      return query.substring(0, maxLength - 3) + "...";
    }
  };

  useEffect(() => {
    const getResumes = async () => {
      try {
        const res = await axios.get("resumes");
        setHistories(res.data.resumes);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getResumes();
  }, []);

  const handleDelete = async (_id) => {
    try {
      setIsDeleting((prevState) => ({
        ...prevState,
        [_id]: true,
      }));

      const res = await axios.delete(`resumes/${_id}`);
      console.log(res.data);
      setHistories((prevHistories) =>
        prevHistories.filter((obj) => obj._id !== _id)
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting((prevState) => ({
        ...prevState,
        [_id]: false,
      }));
    }
  };

  const handleClearAll = async () => {
    try {
      setIsClearing(true);
      const res = await axios.delete("resumes");
      console.log(res.data.message);
      setHistories([]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsClearing(false);
    }
  };

  const getFormattedDate = (date) => {
    const formateDate = new Date(date);
    const time = formateDate.toLocaleString("en-US", { timeStyle: "medium" });

    return <span className="formatted-date">{time}</span>;
  };

  return (
    <>
      {isLoading ? (
        <div className="loading-overlay position-fixed top-0 start-0 h-100 w-100 d-flex align-items-center justify-content-center">
          <Spinner animation="border" variant="primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <div className="history-container mt-5 fade-in-up">
          <div className="glass-card history-box">
            <div className="history-header d-flex justify-content-between align-items-center mb-4">
              <h2 className="history-title font-weight-bold mb-0">Analysis History</h2>
              {histories.length !== 0 && (
                <Button
                  variant="outline-danger"
                  className="history-clear-button d-flex align-items-center gap-2"
                  onClick={handleClearAll}
                  disabled={isClearing}
                >
                  {isClearing ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Clearing...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-trash3"></i>
                      Clear All
                    </>
                  )}
                </Button>
              )}
            </div>
            <div className="history-items">
              {histories.length === 0 ? (
                <div className="text-center p-5 text-light opacity-75">
                  <i className="bi bi-clock-history fs-1 mb-3 d-block"></i>
                  <p className="fs-5">No analysis history available yet</p>
                </div>
              ) : (
                <div className="history-scroll pe-2">
                  <ListGroup variant="flush">
                    {histories.map(({ fileName, _id, createdAt }) => (
                      <ListGroup.Item
                        key={_id}
                        className="d-flex justify-content-between align-items-center history-item px-4 py-3 border-0 mb-3"
                      >
                        <div className="item-container text-light d-flex align-items-center gap-3">
                          <div className="bg-primary bg-opacity-25 p-2 rounded text-primary">
                            <i className="bi bi-file-earmark-text fs-5"></i>
                          </div>
                          <div>
                            <div className="fw-semibold mb-1 text-white">{truncateQuery(fileName, 50)}</div>
                            <small className="opacity-75">{getFormattedDate(createdAt)}</small>
                          </div>
                        </div>
                        <div>
                          <Button
                            variant="outline-light"
                            className="delete-button border-0 opacity-75 hover-opacity-100"
                            onClick={() => handleDelete(_id)}
                            disabled={isDeleting[_id]}
                          >
                            {isDeleting[_id] ? (
                              <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                              ></span>
                            ) : (
                              <FaTimes />
                            )}
                          </Button>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default History;
