import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import envVariables from "../../../importenv";
import { announcements } from "../../model/announcements.model";
import { Modal, Button, Form } from "react-bootstrap"; // Import the Modal components from react-bootstrap

function ProfAnnouncement() {
  const [announcements, setAnnouncements] = useState<announcements[]>([]);
  const [show, setShow] = useState(false); // State to control form visibility
  const [newAnnouncement, setNewAnnouncement] = useState<announcements>({
    title: "",
    type: "",
    date: "",
    description: "",
  }); // State to hold form data

  const mongoURI = envVariables.mongoURI;

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = () => {
    fetchAnnouncementsFromBackend().then((announcements) => {
      if (announcements.length > 0) {
        setAnnouncements(announcements);
      } else {
        setAnnouncements([]); // If no announcements, set empty array
      }
    });
  };

  function fetchAnnouncementsFromBackend(): Promise<announcements[]> {
    const backendURL = envVariables.backendURL;

    return fetch(`${backendURL}/announcements`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.announcements)) {
          return data.announcements as announcements[]; // Explicitly cast to announcements[]
        } else {
          return []; // If no announcements or invalid data, return empty array
        }
      })
      .catch((error) => {
        console.error(error);
        return [];
      });
  }

  // Method to add an announcement to the backend
  const addAnnouncementToBackend = async (announcement: announcements) => {
    const backendURL = envVariables.backendURL;

    try {
      const response = await fetch(`${backendURL}/announcements`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(announcement),
      });

      if (response.ok) {
        // Announcement added successfully, fetch updated announcements
        fetchAnnouncements();
        setShow(false); // Hide the form after successful submission
        setNewAnnouncement({ title: "", type: "", date: "", description: "" }); // Reset form data
      } else {
        console.error("Failed to add announcement to the backend.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addAnnouncementToBackend(newAnnouncement);
  };

  return (
    
    <div style={{ marginLeft: "10%", marginRight: "10%" }}>
      <div className="Headers">Announcements</div>
      {/* Show the form when the button is clicked */}
      <Button onClick={() => setShow(true)}>Create Announcement</Button>
      {/* Wrap the form inside the Modal */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Announcement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={newAnnouncement.title}
                onChange={(e) =>
                  setNewAnnouncement({
                    ...newAnnouncement,
                    title: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formType">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter type"
                value={newAnnouncement.type}
                onChange={(e) =>
                  setNewAnnouncement({
                    ...newAnnouncement,
                    type: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter date"
                value={newAnnouncement.date}
                onChange={(e) =>
                  setNewAnnouncement({
                    ...newAnnouncement,
                    date: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                value={newAnnouncement.description}
                onChange={(e) =>
                  setNewAnnouncement({
                    ...newAnnouncement,
                    description: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShow(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Create
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      <Accordion className="mt-5">
        {announcements.length > 0 ? (
          announcements.map((announcement, index) => (
            <Accordion.Item eventKey={index.toString()} key={index}>
              <Accordion.Header>
                <div>
                  <div>{announcement.title}</div>
                  <div style={{ fontSize: "14px", color: "#777" }}>
                    Announcement Type: {announcement.type}
                  </div>
                  <div style={{ fontSize: "14px", color: "#777" }}>
                    Announcement Date: {announcement.date}
                  </div>
                </div>
              </Accordion.Header>
              <Accordion.Body>{announcement.description}</Accordion.Body>
            </Accordion.Item>
          ))
        ) : (
          <div>No announcements found.</div>
        )}
      </Accordion>
    </div>
  );
}

export default ProfAnnouncement;