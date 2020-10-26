import React from 'react';
import { Image} from 'react-native';
import { Card, CardItem, Text, Body } from 'native-base';
const CardCocktail = (props) =>  {
    return (
       
            <Card>
            <CardItem cardBody>
              <Image style={{height: 200, width: 200, flex: 1}} source={{uri: props.cocktail.picture}} />
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                   Nombre: {props.cocktail.name}
                </Text>
                <Text>
                   Es alcoholica? {props.cocktail.isAlcoholic ? 'Si' : 'No'}
                </Text>
                <Text>
                  Categoria {props.cocktail.category}
                </Text>

              </Body>
            </CardItem>
          </Card>
    );
}

export default CardCocktail;
