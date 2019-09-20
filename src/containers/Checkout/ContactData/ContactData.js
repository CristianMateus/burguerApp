import React, { Component } from "react";
import axios from "../../../axios-order";

// Components
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";

// Styles
import classes from "./ContactData.css";
import Input from "../../../components/UI/Input/Input";

import { connect } from 'react-redux'

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip code"
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your email"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      delivaryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "Fastest", displayValue: "Fastest" },
            { value: "Cheapest", displayValue: "Cheapest" }
          ]
        },
        value: "Fastest",
        validation: {},
        valid: true
      }
    },
    formIsValid: false,
    loading: false
  };

  orderHandler = event => {
    // 1. Prevent page reload
    event.preventDefault();
    // 2. Set loading state
    this.setState({ loading: true });
    // 3. Build form data object
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      // 3.1 This builds the form data object automatically without the use of push
      //     it gets the key and sets it's value
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }
    // 4. Build my order object
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
    };
    // 5. Consume the service
    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };

  checkValidity(value, rules) {
    let isValid = true;

    if(!rules){
      return true
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (e, inputIdentifier) => {
    // 1. Clone the form object from the state
    const updatedOrderForm = {
      ...this.state.orderForm
    };

    // 2. Clone the element that was updated in order to not mutate the original form
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };

    // 3. Change the value of the cloned element and check if the value is correct
    updatedFormElement.value = e.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;

    // 4. Check if the form overall is valid
    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    // 5. Update the original element from the original form
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    // 6. Update the original form
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  render() {
    const formElementsArry = [];
    for (let key in this.state.orderForm) {
      formElementsArry.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArry.map(formElement => {
          return (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              changed={event => this.inputChangedHandler(event, formElement.id)}
            />
          );
        })}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    price: state.totalPrice
  }
}

export default connect(mapStateToProps)(ContactData) 