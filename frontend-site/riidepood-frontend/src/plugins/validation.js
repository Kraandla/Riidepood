//import the components and defineRule function from vee-validate
import {
    Form as VeeForm,
    Field as VeeField,
    ErrorMessage,
    defineRule,
  } from "vee-validate";

// import the validation rules from vee-validate/rules package
import {
    required,
    min,
    max,
    email,
    confirmed,
    not_one_of as excluded,
    min_value,
  } from "@vee-validate/rules";

export default {
    install(app) {
      // Make components available globally in the Vue application using the app.component() method. 
     // The function takes the arguments: app.component("registered name", implementation)

      app.component("VeeForm", VeeForm);
      app.component("VeeField", VeeField);
      app.component("ErrorMessage", ErrorMessage);
 
      // Define the rules. The defineRule function accepts a rule name that acts as an identifier 
     // for that validation rule, the second argument is the validator function that will verify the field value.

      defineRule("required", required);
      defineRule("min_value", min_value);
      defineRule("min", min);
      defineRule("max", max);
      defineRule("email", email);
      defineRule("passwords_mismatch", confirmed);
      defineRule("excluded", excluded);
    },
  };
