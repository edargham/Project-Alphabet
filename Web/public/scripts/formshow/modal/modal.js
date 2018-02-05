import React, { Component } from 'react';
import FormBox from '../formbox';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';


class ModalForm extends Component{
    
    constructor(props, context) {
        super(props, context);
    
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    
        this.state = {
          show: false
        };
      }
    
      handleClose(event) {
        console.log("hiding");
        this.setState({ show: false });
      }
    
      handleShow(event) {
        console.log("showing");
        this.setState({ show: true });
      }

      render() {
    
        return (
          <div>

            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add A Skill</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormBox url = "api/skills" handleClose = {this.handleClose}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
          </div>
        );
      }
    }

export default ModalForm;