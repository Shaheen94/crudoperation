import React, { Component } from 'react'
import axios from 'axios';
import "./App.css";

 class App extends Component {
   constructor(props){
     super(props)
     this.state={
          title:'Simple crud operation',
          act:0,
          index:'',
          posts:[],
          datas: [],
          fields: {},
          errors: {}
       }

          this.handleChange = this.handleChange.bind(this);
          this.fsubmit = this.fsubmit.bind(this);
    }

      handleChange(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
          fields
        });
  
      }

      //componentDidMount(){
        //this.refs.name.focus();
      //}

      componentDidMount(){
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(responce => {
          this.setState({posts: responce.data});
         // console.log (responce);
        });
      }



      validateForm() {

        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!fields["mobileno"]) {
          formIsValid = false;
          errors["mobileno"] = "*Please enter your mobile no.";
        }
  
        if (typeof fields["mobileno"] !== "undefined") {
          if (!fields["mobileno"].match(/^[0-9]{10}$/)) {
            formIsValid = false;
            errors["mobileno"] = "*Please enter valid mobile no.";
          }
        }
        
        if (!fields["email"]) {
          formIsValid = false;
          errors["email"] = "*Please enter your email-ID.";
        }
  
        if (typeof fields["email"] !== "undefined") {
          //regular expression for email validation
          var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
          if (!pattern.test(fields["email"])) {
            formIsValid = false;
            errors["email"] = "*Please enter valid email-ID.";
          }
        }
        this.setState({
          errors: errors
        });
        return formIsValid;

      }
      
  
 
  
 
fsubmit =(e) =>{
   e.preventDefault();
   let datas = this.state.datas;
   let name= this.refs.name.value;
   let address = this.refs.address.value;
   let mobileno = this.refs.mobileno.value;
   let email = this.refs.email.value;
   
   if (this.validateForm()) {
    let fields = {};
    
    fields["email"] = "";
    fields["mobileno"] = "";
    
    this.setState({fields:fields});
    alert("Form submitted");
  }
 
  if(this.state.act===0){  
    let data ={
    name,address,email,mobileno
   }
   datas.push(data);
   }else{                
  let index=this.state.index;
  datas[index].name= name;
  datas[index].address=address;
  datas[index].mobileno = mobileno;
  datas[index].email = email;
 }
  this.setState({ 
      datas:datas,
      act:0
    });
    this.refs.myForm.reset();
    this.refs.name.focus();
    
  }

  fRemove= (i) => {
    let datas =this.state.datas;
    datas.splice(i,1);
    this.setState({
    });
    this.refs.myForm.reset();
    this.refs.name.focus();
    
     
}
fEdit=(i)=>{
  let data =this.state.datas[i];
  this.refs.name.value=data.name;
  this.refs.address.value=data.address;
  this.refs.mobileno.value = data.mobileno;
  this.refs.email.value=data.email;
  
  this.setState({
    act:0,
    
    index:i
  })
  this.refs.name.focus();
}

render() {
    let datas=this.state.datas;

    


    return (
      <div className="App">
        <h1>{this.state.title}</h1>
        <form ref="myForm" className="myForm" onSubmit={this.fsubmit}>
          <input type="text" ref="name" placeholder="Your Name" className="formField" />
          <input type="text" ref="address" placeholder="Your Address" className="formField" />
          <input type="text" ref="mobileno" placeholder="Mob No." className="formField" />
          <input type="email" ref="email" placeholder="Email" className="formField" value={this.state.fields.emailid} onChange={this.handleChange} />
          <div className="errorMsg">{this.state.errors.emailid}</div>
                
          <button className="myButton">Submit</button>

        </form>

        <pre>
            {datas.map((data,i) =>
            <li key={i}className="myList">
              {i+1}. {data.name}, {data.address},{data.mobileno},{data.email}
              <button onClick={()=>this.fRemove(i)} className="myListButton">Delete</button>
              <button onClick={()=>this.fEdit(i)} className="myListButton">Edit</button>
              
              </li>
              )}
        </pre>
      </div>
    )
  }
}
export default App;
