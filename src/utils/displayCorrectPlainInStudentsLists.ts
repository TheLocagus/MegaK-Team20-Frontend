export const showExpectedContractType = (contractType: string) => {
  console.log(contractType)
  let contract = '';
  switch (contractType) {
    case 'noPreference':
      contract = 'Każdy';
      break;
    case 'contractOfMandate':
      contract = 'Umowa zlecenie';
      break;
    case 'contractWork':
      contract = 'Umowa o dzieło'
      break;
    case 'b2b':
      contract = 'B2B';
      break;
    case 'contractOfEmployment':
      contract = 'Umowa o pracę';
      break;
    default:
      throw new Error('Something went wrong');
  }

  return contract
}

export const showExpectedTypeWork = (typeWork: string) => {
  let work = '';

  switch (typeWork) {
    case 'stationary':
      work = 'Stacjonarny';
      break;
    case 'readyToMove':
      work = 'Gotowość do przeprowadzki';
      break;
    case 'remotely':
      work = 'Zdalny'
      break;
    case 'hybrid':
      work = 'Hybrydowy';
      break;
    case 'noPreference':
      work = 'Każdy';
      break;
    default:
      throw new Error('Something went wrong');
  }

  return work;
}