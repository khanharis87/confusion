import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem
} from "reactstrap";

function RenderDish({ dish }) {
  return (
    <Card>
      <CardImg top width="100%" src={dish.image} alt={dish.name} />
      <CardBody>
        <CardTitle>{dish.name}</CardTitle>
        <CardText>{dish.description}</CardText>
      </CardBody>
    </Card>
  );
}

function RenderComments({ comments }) {
  const comment = comments.map(commentList => {
    return (
      <ul key={commentList.id} className="col-12 list-unstyled ">
        <li>{commentList.comment}</li>
        <li>
          {commentList.author},{" "}
          {new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit"
          }).format(new Date(Date.parse(commentList.date)))}
        </li>
      </ul>
    );
  });
  return (
    <div className="container">
      <h4>Comments</h4>
      <div className="row">{comment}</div>
    </div>
  );
}

const DishDetail = props => {
  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/menu">Menu</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{props.dish.name}</h3>
          <hr />
        </div>
        <div className="col-12 col-md-5 m-1">
          <RenderDish dish={props.dish} />
        </div>
        <div className="col-12 col-md-5 m-1">
          <RenderComments comments={props.comments} />
        </div>
      </div>
    </div>
  );
};

export default DishDetail;
