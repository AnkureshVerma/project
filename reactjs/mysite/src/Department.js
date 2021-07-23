import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddDepModel} from './AddDepModel';
import {EditDepModel} from './EditDepModel';

export class Department extends Component{

    constructor(props){
        super(props);
        this.state={deps:[],AddModalShow:false,EditModalShow:false}
    }

    refreshList(){
         fetch('http://127.0.0.1:8000/'+'department')
        .then(response=>response.json())
        .then(data=>{
            this.setState({deps:data});
        });
    }

   componentDidMount(){
      this.refreshList();
    }

   componentDidUpdate(){
      this.refreshList();
    }

    DeleteDep(depid){
      if(window.confirm('Are You Sure?'+ depid)){
        fetch('http://127.0.0.1:8000/'+'department/'+depid,{
          method:'DELETE',
          headers:{'Accept':'application/json',
                   'content-type':'application/json'}
        })
    }
  }


    render(){
         const {deps,depid,depname}=this.state;
         let addModalClose = ()=>this.setState({AddModalShow:false});
         let editModalClose = ()=>this.setState({EditModalShow:false});
        return(
            <div className="container">
              <Table className="mt-4" striped bordered hover size="sm">
                 <thead>
                    <tr>
                      <th>Department</th>
                      <th>Department Name</th>
                      <th>Options</th>
                    </tr>
                  </thead>
               <tbody>
                   {deps.map(dep =>
                     <tr key={dep.DepartmentId}>
                         <td>{dep.DepartmentId}</td>
                         <td>{dep.DepartmentName}</td>
                         <td>
                           <ButtonToolbar>
                             <Button className="mr-2" variant="info" onClick={()=>this.setState({EditModalShow:true,depid:dep.DepartmentId,depname:dep.DepartmentName})}>
                                Edit
                             </Button>
                             <Button className="mr-2" variant="danger" onClick={()=>this.DeleteDep(dep.DepartmentId)}>
                                Delete
                             </Button>
                             <EditDepModel show={this.state.EditModalShow} onHide={editModalClose} depid={depid} depname={depname}/>
                           </ButtonToolbar>
                         </td>
                     </tr>)}
               </tbody>
              </Table>
            <ButtonToolbar>
              <Button variant="primary" onClick={()=>this.setState({AddModalShow:true})}>
                Add Department
              </Button>

              <AddDepModel show={this.state.AddModalShow} onHide={addModalClose}/>
            </ButtonToolbar>
            </div>
        );
    }
}