const validate = (val, rules, comparedValue) => {
  isValid = true;
  for (let rule in rules) {
    switch (rule) {
      case 'isEmail':
        isValid = isValid && emailValidator(val);
        break;
      // isValid ** emailValidator poniewaz za kazdym razem gdy bedziemy sprawdzac czy isValid ma wartosc true a w przyszlosci moga byc tez inne aspekty do sprawdzenia to chcemy, żeby je tez uznano i sprawdzono razem z emailValidator, wszystkie wymagania musza byc spelnione zeby isValid bylo true
      case 'minLength':
        isValid = isValid && minLengthValidator(val, rules[rule]);
        break;

      case 'equalTo':
        isValid = isValid && equalToValidator(val, comparedValue[rule]);
        break;
      case 'notEmpty':
        isValid = isValid && notEmptyValidator(val);
        break;
      default:
        isValid = true;
    }
  }
  return isValid;
};

const emailValidator = val => {
  return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
    val
  );
};

const minLengthValidator = (val, minLength) => {
  return val.length >= minLength;
};

const equalToValidator = (val, checkValue) => {
  return val === checkValue;
};

const notEmptyValidator = val => {
  return val.trim() !== '';
};

export default validate;
