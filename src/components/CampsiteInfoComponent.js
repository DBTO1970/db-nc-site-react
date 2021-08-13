import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Modal, ModalBody, ModalHeader, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);


function RenderCampsite({campsite}) {

        return (
            <div className="col-md-5 m-1">
                    <FadeTransform 
                        in
                        transformProps={{
                            exitTransform: 'scale(0.5) translateY(-50%)'
                        }}>
                        <Card>
                            <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
                            <CardBody>                        
                                <CardText>{campsite.description}</CardText>
                            </CardBody>
                        </Card>
                    </FadeTransform>
            </div>
        );
    }

function RenderComments({comments, postComment, campsiteId}) {
    if(comments) {
        return (
            <div className="col-md-5 m-1">
                <h4>Comments</h4>
                <Stagger in>
                    {comments.map((comment) => {
                        return (
                            <Fade in key={comment.id}>
                                <div > 
                                    <p>{comment.text} 
                                        <br />
                                        - {comment.author}, 
                                        {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                                    </p>
                                </div>
                            </Fade>);})
                    }
                 </Stagger>
                <CommentForm campsiteId={campsiteId} postComment={postComment} />
            </div>
        );
    }
    return (<div></div>);
}

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        }
        );
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.campsiteId, values.rating, values.author, values.text);
        
    }

    render() {
        return(
            <React.Fragment>
                <Button className="fa-lg" outline onClick={this.toggleModal}><i className="fa fa-pencil" ></i>Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={values => this.handleSubmit(values)}>
                            <div className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" name="rating" id="rating" className="form-control"
                                >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </div>

                            <div className="form-group">
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text model=".author" name="author" id="author" className="form-control" 
                                    validators={{
                                    minLength: minLength(2), 
                                    maxLength: maxLength(15)
                                }}
                                />
                                <Errors
                                        className= "text-danger"
                                        model=".author"
                                        show='touched'
                                        component='div'
                                        messages={{
                                            minLength: 'Must be at least 2 characters.',
                                            maxLength: 'Must be 15 characters or less.'
                                        }}
                                        />
                            </div>

                            <div className="form-group">
                                <Label htmlFor="text">Comments</Label>
                                <Control.textarea model=".text" name="text" id="text" rows="6" className='form-control' />
                            </div>
                            <div className="form-group">
                                <Button type="submit" color="primary">
                                            Send Feedback
                                        </Button>
                            </div>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
        
    }

}

function CampsiteInfo(props) {
        if (props.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }

        if(props.ErrMess) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h4>{props.errMess}</h4>
                        </div>
                    </div>
                </div>

            );
        }

        if (props.campsite) {
            return (
                <div className= 'container'>
                    <div className="row">
                        <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/directory/'>Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                            <h2>{props.campsite.name}</h2>
                            <hr />
                        </div>
                    </div>
                    <div className='row'>
                        <RenderCampsite campsite={props.campsite} />
                        <RenderComments 
                        comments={props.comments}
                        addComment={props.addComment}
                        campsiteId={props.campsite.id}

                        />
                    </div>
                </div>
            );
            } else {
                return(
                <div></div>
                );
            }
    
}

export default CampsiteInfo;


