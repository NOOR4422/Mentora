import React, { useState } from "react";

const LongTermSession = ({
  sessionType,
  showSessionDetails,
  selectedDateRange,
  minSalary,
  maxSalary,
  sessionTypeError,
  minSalaryError,
  maxSalaryError,
  timeFromError,
  timeToError,
  handleSessionTypeSelect,
  handleDateRangeSelect,
  handleMinSalaryChange,
  handleMaxSalaryChange,
  handleSubmit,
}) => {
  return (
    <div className="long-term-session">
      <div className="session-type-options">
        <h3>What do you prefer to be in?</h3>
        <label>
          <input
            type="radio"
            value="individual"
            checked={sessionType === "individual"}
            onChange={() => handleSessionTypeSelect("individual")}
          />
          Individual
        </label>
        <label>
          <input
            type="radio"
            value="group"
            checked={sessionType === "group"}
            onChange={() => handleSessionTypeSelect("group")}
          />
          Group
        </label>
      </div>
      {showSessionDetails && (
        <div>
          {sessionType === "individual" && (
            <div>
              <h3>Type the mentorship you prefer to be in?</h3>
              <label>
                <input type="radio" name="sessionType" value="One-to-one" />
                One-to-one
              </label>
              <label>
                <input type="radio" name="sessionType" value="training-group" />
                Group
              </label>
              <h3>Duration</h3>
              <div className="duration-inputs">
                <label>From:</label>
                <input
                  type="date"
                  value={selectedDateRange.startDate}
                  onChange={(e) =>
                    handleDateRangeSelect("startDate", e.target.value)
                  }
                />
                {timeToError && (
                  <p className="error-message">{timeFromError}</p>
                )}
                <label>To:</label>
                <input
                  type="date"
                  value={selectedDateRange.endDate}
                  onChange={(e) =>
                    handleDateRangeSelect("endDate", e.target.value)
                  }
                />
                {timeToError && <p className="error-message">{timeToError}</p>}
              </div>
              <div className="salaryRange">
                <h3>Salary Range:</h3>
                {minSalaryError && (
                  <p className="error-message">{minSalaryError}</p>
                )}
                <span>
                  <label>Min Salary:</label>
                  <input type="number" min="0" step="50" />
                </span>
                {minSalaryError && (
                  <p className="error-message">{minSalaryError}</p>
                )}
                <span>
                  <label>Max Salary:</label>
                  <input type="number" min="0" step="50" />
                </span>
              </div>
              <button type="submit">Submit</button>
            </div>
          )}
          {sessionType === "group" && (
            <div>
              <div className="trainee-range">
                <h3>How Many Trainees Will be in the group?:</h3>
                <span>
                  <input type="number" />
                </span>
              </div>
              <h3>Duration</h3>
              <div className="duration-inputs">
                <label>From:</label>
                <input
                  type="date"
                  value={selectedDateRange.startDate}
                  onChange={(e) =>
                    handleDateRangeSelect("startDate", e.target.value)
                  }
                />
                {timeFromError && (
                  <p className="error-message">{timeFromError}</p>
                )}
                <label>To:</label>
                <input
                  type="date"
                  value={selectedDateRange.endDate}
                  onChange={(e) =>
                    handleDateRangeSelect("endDate", e.target.value)
                  }
                />
                {timeToError && <p className="error-message">{timeToError}</p>}
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
                {minSalaryError && (
                  <p className="error-message">{minSalaryError}</p>
                )}
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
                {maxSalaryError && (
                  <p className="error-message">{maxSalaryError}</p>
                )}
              </div>
              <button type="submit">Submit</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LongTermSession;
