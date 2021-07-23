import React,{Component} from 'react';
import {Modal,Row,Col,Form,Button} from 'react-bootstrap';



export class EditDepModel extends Component{
  
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

   handleSubmit(event){
     event.preventDefault();
     fetch('http://127.0.0.1:8000/'+'department/',{
        method:'PUT',
        headers:{
           'Accept':'application/json',
           'Content-type':'application/json'
        },
       body:JSON.stringify({
          DepartmentId:event.target.DepartmentId.value,
          DepartmentName:event.target.DepartmentName.value
       })
     })
     .then(res=>res.json())
     .then((result)=>{
       alert(result);
     },
     (error)=>{
       alert('Failed To Update');
     })
   }

  render(){
      return(
   <div className="container">
  <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
   <Modal.Header closeButton>
    <Modal.Title id="contained-modal-title-vcenter">
      Edit Department
    </Modal.Title>  
   </Modal.Header>    
   <Modal.Body>
     <Row>
       <Col sm={6}>
         <Form onSubmit={this.handleSubmit}>
           <Form.Group controlId="DepartmentId">
             <Form.Label>Department ID</Form.Label>
             <Form.Control type="text" name="DepartmentId" required disabled defaultValue={this.props.depid}/>
           </Form.Group>
           <Form.Group controlId="DepartmentName">
             <Form.Label>Department Name</Form.Label>
             <Form.Control type="text" name="DepartmentName" required defaultValue={this.props.depname} placeholder="Enter Department Name"/>
           </Form.Group>
           <Form.Group>
             <Button variant="primary" type="submit" className="mt-2">
               Update Department
             </Button>
           </Form.Group>
         </Form>
       </Col>
     </Row>
   </Modal.Body>    
   <Modal.Footer>
     <Button variant="danger" onClick={this.props.onHide}>Close</Button>
   </Modal.Footer> 
  </Modal>
   </div>
    )
  }
}
