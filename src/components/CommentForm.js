import React, { Component } from 'react';
import { Button, Modal, Container, ModalHeader, ModalBody, Label, Row } from "reactstrap";
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        }
    }

    toggleModal = () =>  {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit = (values) => {
        this.toggleModal();
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        // event.preventDefault();
    }


    render() {
        return (
            <>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <Container>
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Label htmlFor="rating">Rating</Label>
                                    <Control.select model=".rating" id="rating" name="rating"
                                        className="form-control"> 
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="name">Your Name</Label>
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder="Your Name" 
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                        />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="comment">Comment</Label>
                                    <Control.textarea model=".comment" rows="6" id="comment" name="comment"
                                        className="form-control"> 
                                    </Control.textarea>
                                </Row>
                                <Row className="form-group">
                                        <Button type="submit" color="primary">
                                        Submit
                                        </Button>
                                </Row>
                            </LocalForm>
                        </Container>
                    </ModalBody>
                </Modal>
                <Button onClick={this.toggleModal}><span className="fa fa-pencil"></span>{'  '}
                    Submit Comment</Button>
            </>
        )
    }
}

export default CommentForm;