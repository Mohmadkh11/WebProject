import React, { useState } from 'react';
import { Form, Container, Table, Button } from 'react-bootstrap';

const Schedule = () => {
  const [month, setMonth] = useState(new Date().getMonth());
  const [week, setWeek] = useState(0);
  const [schedule, setSchedule] = useState({});

  // Simulated list of workers
  const workerList = ['Worker 1', 'Worker 2', 'Worker 3', 'Worker 4'];

  const daysInMonth = new Date(new Date().getFullYear(), month + 1, 0).getDate();

  const handleWorkerChange = (day, shift, event) => {
    setSchedule({
      ...schedule,
      [day]: {
        ...schedule[day],
        [shift]: event.target.value
      }
    });
  };

  const handleWeekChange = (direction) => {
    setWeek(week + direction);
  };

  return (
    <Container>
      <Form.Group className="mb-3">
        <Form.Label>Month: </Form.Label>
        <Form.Control type="number" min="1" max="12" value={month + 1} onChange={(e) => setMonth(Number(e.target.value) - 1)} />
      </Form.Group>

      <Button onClick={() => handleWeekChange(-1)} disabled={week <= 0}>Previous Week</Button>
      <Button onClick={() => handleWeekChange(1)} disabled={(week + 1) * 7 >= daysInMonth}>Next Week</Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Day</th>
            <th>Shift 1</th>
            <th>Shift 2</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(7)].map((_, day) => {
            const currentDay = week * 7 + day;
            if (currentDay >= daysInMonth) {
              return null; // Don't render rows for days outside the current month
            }
            return (
              <tr key={currentDay}>
                <td>{currentDay + 1}</td>
                <td>
                  <Form.Select value={schedule[currentDay]?.shift1 || ''} onChange={(e) => handleWorkerChange(currentDay, 'shift1', e)}>
                    <option value="">Select Worker</option>
                    {workerList.map(worker => (
                      <option key={worker} value={worker}>{worker}</option>
                    ))}
                  </Form.Select>
                </td>
                <td>
                  <Form.Select value={schedule[currentDay]?.shift2 || ''} onChange={(e) => handleWorkerChange(currentDay, 'shift2', e)}>
                    <option value="">Select Worker</option>
                    {workerList.map(worker => (
                      <option key={worker} value={worker}>{worker}</option>
                    ))}
                  </Form.Select>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Button variant="primary" type="submit">Save Schedule</Button>
    </Container>
  );
};

export default Schedule;
