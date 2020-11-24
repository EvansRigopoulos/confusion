import React, {Component} from 'react';
import { Card, CardImg, CardText,Breadcrumb,BreadcrumbItem, CardBody,
    CardTitle ,Button,Modal,ModalHeader,ModalBody} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control,Errors,LocalForm} from 'react-redux-form';
import {Label,Row,Col} from 'reactstrap';
import {Loading} from './LoadingComponent';
import {baseUrl} from'../shared/baseUrl';
const required = (val) => val &&  val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


class CommentForm extends Component{

constructor(props){
    super(props);
    this.state={
        isModalOpen:false
    }

    this.toggleModal = this.toggleModal.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);

     }
     toggleModal(){
        this.setState({
          isModalOpen : !this.state.isModalOpen
        });
    }
  
    handleSubmit(values) {
     
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

        render(){
            return(
            <div className= "container">
               <Button outline onClick={this.toggleModal} >
            
            <span className="fa fa-pencil fa-lg">

            </span> Submit Comment
          </Button>
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
         <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
         <ModalBody>
         <LocalForm  onSubmit={this.handleSubmit}>
                            <Row className= "form-group" >  
                            <Col md={12}>   
                            <Label htmlFor="Rating">Rating</Label>
                            <Control.select model=".Rating" name="Rating"
                                            className = "form-control">
                                            
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                     </Control.select>  
                                     </Col>
                                     </Row>
                            <Row className= "form-group">
                                <Col md={12}>
                            <Label htmlFor="Your name">Your Name</Label>
                           
                                    <Control.text model =".firstname" id="firstname" name="firstname"
                                        placeholder=""
                                        className="form-control"
                                        validators ={{
                                            required , minLength : minLength(3), maxLength : maxLength(15)
                                        }} />
                                    <Errors 
                                    className = "text-danger"
                                    model = ".firstname"
                                    show = "touched"
                                    messages = {
                                        {
                                            required :'Required',
                                            minLength:'Must be greater than 2 characters',
                                            maxLength:'Must be 15 characters or less'
                                        }
                                    }
                                    />
                                   
                                   </Col>
                                </Row>
                          
                                    
                            <Row className= "form-group">
                                <Col md={12}>
                            <Label htmlFor="message" >Comment</Label>
                              
                                    <Control.textarea model = ".message" id="message" name="message"
                                        rows="6"
                                       className="form-control "></Control.textarea>
                            </Col>
                            </Row>
                           
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                        
         </ModalBody>
       </Modal>
          </div>
          
            );
        }

}

        
        function RenderDish({dish}){
            if(dish!=null){
                return(
                    <Card>
                          <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                            <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>
                                {dish.description}
                            </CardText>
                            </CardBody>
                    </Card>
                );
            }else return (
            <div></div>
            );
        }
      
        function RenderComments({comments,addComment,dishId}){
            
            if(comments!=null ){
               return(
                         <div >
                           <h4>Comments</h4>
                                <ul className = "list-unstyled " >
                                        {comments.map((comment) => {
                                            return (
                                        <li key={comment.id}>
                                        <p>{comment.comment}</p><br></br>
                                        <p>--{comment.author},{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))} </p>
                                            
                                        </li>
                                         
                                        );
                                    })}
                                    <CommentForm dishId={dishId} addComment={addComment}/>
                                </ul>
                     
                            </div>
                
                  
                    );}else return <div></div>
            
        }  
              

            
        
        
        const  DishDetail = (props) => {
            if(props.isLoading) {
                return(
                    <div className="container">
                        <div className="row">
                          <Loading />
                          </div>  
                    </div>
                );
            }
            else if(props.errMess){
                return(
                    <div className="container">
                        <div className="row">
                        <h4>{props.errMess}
                        </h4>
                        </div>
                    </div>
                );  
            }
          if(props.dish !=null)
          return(
            <div className = "container">
                <div className="row">
                        <Breadcrumb>
                       
                        <BreadcrumbItem>
                        <Link to = '/menu'>Menu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                           {props.dish.name}
                        </BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>
                            {props.dish.name}
                            </h3>
                        </div>
                    </div>
                <div className ="row">
                    <div className = "col-12 col-md-5 m-1">
                        <RenderDish dish = {props.dish} />
                    </div>
                    <div className = "col-12 col-md-5 m-1">
                        
                    <RenderComments comments={props.comments}
                addComment={props.addComment}
                dishId={props.dish.id}
          />
                    
                  </div>
                </div>
            </div>
                ) ;   
    }
export default  DishDetail;




        
     



