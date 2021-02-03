export class validationMessage {
  message = {
    name : {
      required : '*Name is required',
      pattern : '*Name accept only characters'
    },
    email : {
      required : '*Email is required.',
      invalid : '*Invalid email id.'
    },
    address : {
      required : '*Address is required'
    },
    varificationCode : {
      required : '*Verification code is required'
    },
    contactNumber : {
      required : '*Contact number is required',
      invalid : '*Accepts only numbers',
      minlength : '*Minimum length should be 10',
      maxlength : '*Maximum length should not greater than 16',
    },
    countryCode : {
      required : '*Please select country code'
    },
    password : {
      required : '*Password is required.',
      minlength : '*Minimum length must be 8.',
      maxlength : '*Maximum length should not greater than 256.'
    },
    confirmPassword : {
      required : '*Confirm password is required.',
      minlength : '*Minimum length must be 8.',
      maxlength : '*Maximum length should not greater than 256.',
      mismatch : '*Password mismatched'
    },
    question : {
      required : '*Answer is required.',
      maxlength : '*Maximum length should not greater than 256.'
    },
    staticContent : {
      title : {
        required : '*Please Enter title',
        invalid : '*White Spaces are not allowed'
      },
      content : {
        required : '*Please Enter content',
      },
      question : {
        required : '*Question is required'
      }
    },
    verificationCode : {
      required : '*Please enter verification code.',
      invalid : '*Accepts only numbers.'
    },
    permission : {
      required : '*Please give at least one permission'
    }
  };
}
