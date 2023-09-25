import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import envVariables from "../../../importenv";
import { news } from "../../model/news.model";
import { Modal, Button, Form } from "react-bootstrap"; // Import the Modal components from react-bootstrap

import AdminNavBar from "../../Admin/adminNavigationBar";
import {
  Box,
  ChakraProvider,
  Text,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";

function AdminNews() {
  const [newsItems, setNewsItems] = useState<news[]>([]);
  const [show, setShow] = useState(false);
  const [newNews, setNewNews] = useState<news>({
    title: "",
    date: "",
    description: "",
  });

  const mongoURI = envVariables.mongoURI;

  useEffect(() => {
    console.log("I was called")
    fetchNews();
  }, []);

  

  const fetchNews = () => {
    fetchNewsFromBackend().then((newsItems) => {
      if (newsItems.length > 0) {
        setNewsItems(newsItems);
      } else {
        setNewsItems([]);
      }
    });
  };

  function fetchNewsFromBackend(): Promise<news[]> {
    const backendURL = envVariables.backendURL;

    return fetch(`${backendURL}/get-news`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.newsItems)) {
          return data.newsItems as news[];
        } else {
          return [];
        }
      })
      .catch((error) => {
        console.error(error);
        return [];
      });
  }

  const addNewsToBackend = async (newsItem: news) => {
    const backendURL = envVariables.backendURL;

    try {
      const response = await fetch(`${backendURL}/create-news`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newsItem),
      });

      if (response.ok) {
        fetchNews();
        setShow(false);
        setNewNews({ title: "", date: "", description: "" });
      } else {
        console.error("Failed to add news to the backend.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addNewsToBackend(newNews);
  };

  return (
    <ChakraProvider>
      <Box>
        <AdminNavBar />
      </Box>
    <div style={{ marginLeft: "10%", marginRight: "10%" }}>
      <div className="Headers">News</div>
      <Button onClick={() => setShow(true)}>Create News</Button>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create News</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={newNews.title}
                onChange={(e) =>
                  setNewNews({
                    ...newNews,
                    title: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter date"
                value={newNews.date}
                onChange={(e) =>
                  setNewNews({
                    ...newNews,
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
                value={newNews.description}
                onChange={(e) =>
                  setNewNews({
                    ...newNews,
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
        {newsItems.length > 0 ? (
          newsItems.map((newsItem, index) => (
            <Accordion.Item eventKey={index.toString()} key={index}>
              <Accordion.Header>
                <div>
                  <div>{newsItem.title}</div>
                  <div style={{ fontSize: "14px", color: "#777" }}>
                    News Date: {newsItem.date}
                  </div>
                </div>
              </Accordion.Header>
              <Accordion.Body>{newsItem.description}</Accordion.Body>
            </Accordion.Item>
          ))
        ) : (
          <div>No news found.</div>
        )}
      </Accordion>
    </div>
    </ChakraProvider>
  );
}

export default AdminNews;
