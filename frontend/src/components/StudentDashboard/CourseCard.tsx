// Author: Yatrik Pravinbhai Amrutiya
import React from "react";
import Card from "react-bootstrap/Card";
import {course} from "../model/course.model";
import {Link, useNavigate} from "react-router-dom";

interface CourseCardProps {
    course: course;
}

function CourseCard({course}: CourseCardProps) {
    const navigate = useNavigate();

    function handleViewDetails(_id: string | undefined) {
        localStorage.setItem('course_id', _id as string);
        navigate('/course');
    }

    return (
        <div>
            <Card style={{width: "100%"}}>
                <Card.Body>
                    <Card.Title>{course.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                        Course Code: {course.courseID}
                    </Card.Subtitle>
                    <Card.Text>{course.description}</Card.Text>
                    <Card.Link href="/content" style={{color: "blue"}}>Content page</Card.Link> &nbsp;&nbsp;
                    {/* <Link to={`/course`}>
                        <button onClick={() => handleViewDetails(course._id)}>Course Dashboard</button>
                    </Link> */}
                </Card.Body>
            </Card>
        </div>
    );
}

export default CourseCard;
