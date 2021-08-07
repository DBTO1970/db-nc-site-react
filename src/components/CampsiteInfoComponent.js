import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Modal, ModalBody, ModalHeader, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

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
        console.log('Current state is: ' + JSON.stringify(values));
        alert('Current state is: ' + JSON.stringify(values));
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
                                    <option value= "1">1</option>
                                    <option value = "2">2</option>
                                    <option value = "3">3</option>
                                    <option value = "4">4</option>
                                    <option value = "5">5</option>
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
                                <Button type="submit" color="primary" onClick={this.toggleModal}>
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
function RenderCampsite({campsite}) {

        return (
            <div className="col-md-5 m-1">
                <Card>
                    <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>                        
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }

function RenderComments({comments}) {
    if(comments) {
        return (
            <div className="col-md-5 m-1">
                <h4>Comments</h4>
                {comments.map((comment) => {
                    return (
                    <div key={comment.id}> 
                        <p>{comment.text} 
                            <br />
                            - {comment.author}, 
                            {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                        </p>
                    </div>);})
                }
                <CommentForm/>
            </div>
        );
    }
    return (<div></div>);
}


    function CampsiteInfo(props) {

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
                        <RenderComments comments={props.comments} />
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


