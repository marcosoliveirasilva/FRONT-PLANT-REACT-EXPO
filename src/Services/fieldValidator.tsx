const validateEmail = (email: string) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/.test(email);
}

const validateNome = (nomeCompleto: string) => {
  if (nomeCompleto.length > 4) {
    return true;
  } else {
    return  false;
  }
};

const validateCPF = (cpf: string) => {
  const cpfRegexNumber = /^\d+$/.test(cpf);

  if (cpfRegexNumber && cpf.length === 11) {
    return cpfRegexNumber;
  } else {
    return  /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf);
  }
};

const validateCelular = (celular: string) => {
  const cpfRegexNumber = /^\d+$/.test(celular);

  if (cpfRegexNumber && celular.length === 11) {
    return cpfRegexNumber;
  } else {
    return  /^\(\d{2}\) \d{5}\-\d{4}$/.test(celular);
  }
};

const validateTelefone = (telefoneFixo: string) => {
  const cpfRegexNumber = /^\d+$/.test(telefoneFixo);

  if (cpfRegexNumber && telefoneFixo.length === 10) {
    return cpfRegexNumber;
  } else {
    return  /^\(\d{2}\) \d{4}\-\d{4}$/.test(telefoneFixo);
  }
};

const onlyNumbers = (variable: string) => {
  const numsStr = variable.replace(/[^0-9]/g,'');
  return numsStr;
};

export { validateEmail, validateNome, validateCPF, validateCelular, validateTelefone, onlyNumbers };
