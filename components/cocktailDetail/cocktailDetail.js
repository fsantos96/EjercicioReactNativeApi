import React, { Component } from 'react';
import { Image, ScrollView } from 'react-native';
import * as apiService from '../../services/apiService';
import { Spinner, Card, CardItem, Text, Body, ListItem, Content } from 'native-base';
export default class CocktailDetail extends Component {
    constructor(props) {
        super(props);
        this.state= {
            cocktailData: "",
            isLoading: true
        }
    }
    componentDidMount = () => {
        if(this.props.cocktailId) {
            apiService.getCocktailById(this.props.cocktailId).then(data => {
            this.setState({ isLoading: false, cocktailData: data[0] })
            }).catch(error => {
        
            })
        } else {
            Actions.home();
        }
    }

    renderCocktailIngredients = () => {
        return  this.state.cocktailData.ingredients.map(ingredient => {
            return (
            <ListItem key={ingredient}>
                <Text>{ingredient}</Text>
            </ListItem>
            );
        })
    }
    
    render() {
        if(this.state.isLoading) {
        return <Spinner color='blue' />
        }
        let ingredients = this.renderCocktailIngredients();
        return (
            <ScrollView>

                <Card>
                    <CardItem cardBody>
                        <Image style={{height: 200, width: 200, flex: 1}} source={{uri: this.state.cocktailData.picture}} />
                    </CardItem>
                    <CardItem>
                        <Body>
                        <Text>
                            Nombre: {this.state.cocktailData.name}
                        </Text>
                        <Text>
                            Es alcoholica? {this.state.cocktailData.isAlcoholic ? 'Si' : 'No'}
                        </Text>
                        <Text>
                            Categoria {this.state.cocktailData.category}
                        </Text>
                        </Body>
                    </CardItem>
                    <CardItem>
                        <Text>
                            Ingredientes
                        </Text>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Content>
                            {ingredients}
                            </Content>
                        </Body>
                    </CardItem>
                    <CardItem>
                        <Text>
                            Preparacion
                        </Text>
                    </CardItem>
                    <CardItem>
                        <Text>
                            {this.state.cocktailData.instructions}
                        </Text>
                    </CardItem>
                </Card>
            </ScrollView>
        );
    }
}