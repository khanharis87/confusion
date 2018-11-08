import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

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

const DishDetail = ({ dish }) => {
  if (dish !== undefined) {
    return (
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          <RenderDish dish={dish} />
        </div>
        <div className="col-12 col-md-5 m-1">
          <RenderComments comments={dish.comments} />
        </div>
      </div>
    );
  } else {
    return <div />;
  }
};

export default DishDetail;
