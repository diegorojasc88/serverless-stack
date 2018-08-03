import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./NewNote.css";
import { API } from "aws-amplify";

export default class NewNote extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      isLoading: null,
      content: ""
    };
  }

  validateForm() {
    return this.state.content.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleFileChange = event => {
    this.file = event.target.files[0];
  }

	 handleSubmit = async event => {
	  event.preventDefault();

	  if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
		alert("Please pick a file smaller than 5MB");
		return;
	  }

	  this.setState({ isLoading: true });

	  try {
		await this.createNote({
		  content: this.state.content
		});
		this.props.history.push("/");
	  } catch (e) {
		alert(e);
		this.setState({ isLoading: false });
	  }
	}



createNote(note) {
/*
  {
  var myInit = {
      body: {note}, // replace this with attributes you need
      headers: {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'} // OPTIONAL
  };
*/
  return API.post("notes", "/notes", {
    body: note,
	  header: "Access-Control-Allow-Origin: *; Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS; Access-Control-Allow-Headers: Content-Type, Authorization;",
  });
  /*const result = fetch (https://vipey07lij.execute-api.us-east-2.amazonaws.com/prod
    {
      "POST",
      {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'}, // OPTIONAL,
      {note}
    }
  );

  console.log(result);

  return result;*/
};

  render() {
    return (
      <div className="NewNote">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="content">
            <FormControl
              onChange={this.handleChange}
              value={this.state.content}
              componentClass="textarea"
            />
          </FormGroup>
          <FormGroup controlId="file">
            <ControlLabel>Attachment</ControlLabel>
            <FormControl onChange={this.handleFileChange} type="file" />
          </FormGroup>
          <LoaderButton
            block
            bsStyle="primary"
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Create"
            loadingText="Creating…"
          />
        </form>
      </div>
    );
  }
}
