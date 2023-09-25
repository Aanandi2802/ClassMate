import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import envVariables from "../../../importenv";
import { announcements } from "../../model/announcements.model";

function StudentAnnouncement() {
  const [announcements, setAnnouncements] = useState<announcements[]>([]);

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

  return (
    <div style={{ marginLeft: "10%", marginRight: "10%" }}>
      <div className="Headers">Announcements</div>
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

export default StudentAnnouncement;
