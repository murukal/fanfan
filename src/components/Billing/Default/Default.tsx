import React from 'react';
import {useSelector} from 'react-redux';
import {BillingCard} from '..';
import {State} from '../../../redux';
import {Billing} from '../../../typings/billing';

const Default = () => {
  const defaultBilling = useSelector<State, Billing | undefined>(
    state => state.userProfile.user?.moneyProfile.defaultBilling,
  );

  if (!defaultBilling) {
    return null;
  }

  return (
    <BillingCard
      billing={defaultBilling}
      style={{
        marginBottom: 16,
      }}
    />
  );
};

export default Default;
