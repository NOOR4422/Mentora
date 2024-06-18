import React, { useState } from "react";

const OneTimeSession = ({
  selectedDate,
  selectedTimeFrom,
  selectedTimeTo,
  mentorshipReasons,
  minSalary,
  maxSalary,
  dateError,
  timeFromError,
  timeToError,
  mentorshipReasonError,
  minSalaryError,
  maxSalaryError,
  handleDateSelection,
  handleTimeFromSelection,
  handleTimeToSelection,
  handleMentorshipReasonChange,
  handleMinSalaryChange,
  handleMaxSalaryChange,
  handleSubmit,
}) => {
  return (
    <div className="one-time-session">
      <form onSubmit={handleSubmit}>
        <div>
          <h3>Date:</h3>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => handleDateSelection(e.target.value)}
          />
        </div>
        {dateError && <p className="error-message">{dateError}</p>}
        <div className="time-range">
          <h3>Time:</h3>
          <label>From:</label>
          <input
            type="time"
            value={selectedTimeFrom}
            onChange={(e) => handleTimeFromSelection(e.target.value)}
          />
          {timeFromError && <p className="error-message">{timeFromError}</p>}
          <label>To:</label>
          <input
            type="time"
            value={selectedTimeTo}
            onChange={(e) => handleTimeToSelection(e.target.value)}
          />
          {timeToError && <p className="error-message">{timeToError}</p>}
        </div>
        <div>
          <h3>Why do you want a mentor for?</h3>
          <label>
            <input
              type="checkbox"
              checked={mentorshipReasons.debug}
              onChange={() => handleMentorshipReasonChange("debug")}
            />
            Debug
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              checked={mentorshipReasons.codeReview}
              onChange={() => handleMentorshipReasonChange("codeReview")}
            />
            Code Review
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              checked={mentorshipReasons.consultation}
              onChange={() => handleMentorshipReasonChange("consultation")}
            />
            Consultation
          </label>
          {mentorshipReasonError && (
            <p className="error-message">{mentorshipReasonError}</p>
          )}
        </div>
        <div className="salaryRange">
          <h3>Salary Range:</h3>
          <span>
            <label>Min Salary:</label>
            <input
              type="number"
              value={minSalary}
              onChange={handleMinSalaryChange}
              min="0"
              step="50"
            />
          </span>
          {minSalaryError && <p className="error-message">{minSalaryError}</p>}
          <span>
            <label>Max Salary:</label>
            <input
              type="number"
              value={maxSalary}
              onChange={handleMaxSalaryChange}
              min={parseInt(minSalary) + 50}
              step="50"
            />
          </span>
          {maxSalaryError && <p className="error-message">{maxSalaryError}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default OneTimeSession;
