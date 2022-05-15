import {Title, Card as PaperCard, Colors} from 'react-native-paper';
import React from 'react';
import {Props} from '.';

const Card = (props: Props) => {
  return (
    <PaperCard
      style={{
        backgroundColor: Colors.blue200,
        marginBottom: 16,
      }}>
      <PaperCard.Title title={props.billing.id} />
      <PaperCard.Content>
        <Title>{props.billing.name}</Title>
      </PaperCard.Content>
    </PaperCard>
  );
};

export default Card;
