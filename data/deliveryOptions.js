import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const deliveryOptions = [
  { 
    id: '1',
    deliveryDays: 7,
    priceCents: 0
  }, {
    id: '2',
    deliveryDays: 3,
    priceCents: 499
  }, {
    id: '3',
    deliveryDays: 1,
    priceCents: 999
  }
];

 export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;

    deliveryOptions.forEach((option) => {
    if (deliveryOptionId === option.id) {
      deliveryOption = option
    }
  });

  return deliveryOption || deliveryOptions[0]
}

export function calculateDeliveryDate(deliveryOption) {
  const today = dayjs();
  let deliveryDate = today.add(
    deliveryOption.deliveryDays, 
    'days'
  );

  while (today.format('dddd') === 'Friday') {
    deliveryDate = today.add(
      deliveryOption.deliveryDays + 2, 
      'days'
    );
  }
  // const dayString = deliveryDate.format('dddd')

  // console.log(dayString)

  // if (dayString === 'Saturday') {
  //   deliveryDate =  today.add(
  //     deliveryOption.deliveryDays + 2, 
  //     'days'
  //   );
  // } else if (dayString === 'Sunday') {
  //   deliveryDate =  today.add(
  //     deliveryOption.deliveryDays + 1, 
  //     'days'
  //   );
  // } else {
  //   deliveryDate = deliveryDate;
  // }

  const dateString = deliveryDate.format(
    'dddd, MMMM D'
  );

  return dateString
}